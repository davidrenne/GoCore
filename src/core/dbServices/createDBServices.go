package dbServices

import (
	"core/serverSettings"
	"encoding/json"
	"fmt"
	"github.com/fatih/color"
	"io/ioutil"
	"os"
	"os/exec"
	"strings"
)

type fieldDef struct {
	Name      string `json:"name"`
	Primary   bool   `json:"primary"`
	AllowNull bool   `json:"allowNull"`
	FieldType string `json:"fieldType"`
	IsUnique  bool   `json:"isUnique"`
	Check     string `json:"check"`
	Collate   string `json:"collate"`
	Default   string `json:"default"`
}

type tableDef struct {
	Name   string     `json:"name"`
	Fields []fieldDef `json:"fields"`
}

type indexDef struct {
	Name      string   `json:"name"`
	TableName string   `json:"tableName"`
	IsUnique  bool     `json:"isUnique"`
	Fields    []string `json:"fields"`
}

type foreignKeyDef struct {
	Name     string   `json:"name"`
	Fields   []string `json:"fields"`
	FKTable  string   `json:"fkTable"`
	FKFields []string `json:"fkFields"`
	OnDelete bool     `json:"onDelete"`
	OnUpdate bool     `json:"onUpdate"`
}

type foreignKeyTableDef struct {
	Table string          `json:"table"`
	Keys  []foreignKeyDef `json:"keys"`
}

type createObject struct {
	Tables      []tableDef           `json:"tables"`
	Indexes     []indexDef           `json:"indexes"`
	ForeignKeys []foreignKeyTableDef `json:"foreignKeys"`
}

type NOSQLSchemaField struct {
	Name         string      `json:"name"`
	Type         string      `json:"type"`
	Index        string      `json:"index"`
	DefaultValue string      `json:"defaultValue"`
	Schema       NOSQLSchema `json:"schema"`
}

type NOSQLSchema struct {
	Name   string             `json:"name"`
	Fields []NOSQLSchemaField `json"fields"`
}

type NOSQLCollection struct {
	Name   string      `json:"name"`
	Schema NOSQLSchema `json:"schema"`
}

type NOSQLSchemaDB struct {
	Collections []NOSQLCollection `json:"collections"`
}

func RunDBCreate() {

	jsonData, err := ioutil.ReadFile("db/" + serverSettings.WebConfig.DbConnection.AppName + "/create.json")
	if err != nil {
		fmt.Println("Reading of create.json failed:  " + err.Error())
		return
	}

	// if serverSettings.WebConfig.DbConnection.Driver == "sqlite3" {
	// 	var co createObject
	// 	errUnmarshal := json.Unmarshal(jsonData, &co)
	// 	if errUnmarshal != nil {
	// 		color.Red("Parsing / Unmarshaling of create.json failed:  " + errUnmarshal.Error())
	// 		return
	// 	}
	// 	if serverSettings.WebConfig.DbConnection.Driver == "sqlite3" {
	// 		createSQLiteTables(co.Tables)
	// 		createSQLiteIndexes(co.Indexes)
	// 		createSQLiteForeignKeys(co.ForeignKeys, co.Tables)
	// 	}

	// } else {
	var schemaDB NOSQLSchemaDB
	errUnmarshal := json.Unmarshal(jsonData, &schemaDB)
	if errUnmarshal != nil {
		color.Red("Parsing / Unmarshaling of create.json failed:  " + errUnmarshal.Error())
		return
	}

	createNoSQLModel(schemaDB.Collections, serverSettings.WebConfig.DbConnection.AppName, serverSettings.WebConfig.DbConnection.Driver)
	// }

}

func createNoSQLModel(collections []NOSQLCollection, packageName string, driver string) {

	for _, collection := range collections {
		val := generateNoSQLModel(collection.Schema, collection, driver)
		os.Mkdir("src/"+packageName+"/model", 0777)
		writeNoSQLModelCollection(val, "src/"+packageName+"/model/"+collection.Schema.Name+".go", collection)
		color.Green("Created NOSQL Collection " + collection.Name + " successfully.")
	}

}

func generateNoSQLModel(schema NOSQLSchema, collection NOSQLCollection, driver string) string {

	val := ""
	switch driver {
	case "boltDB":
		val += genPackageImport("model", []string{"core/dbServices", "encoding/json", "github.com/asdine/storm"})
	}

	val += genNoSQLCollection(collection)
	val += genNoSQLSchema(schema, driver)
	val += genNoSQLRuntime(collection, schema, driver)
	return val
}

func writeNoSQLModelCollection(value string, path string, collection NOSQLCollection) {

	err := ioutil.WriteFile(path, []byte(value), 0777)
	if err != nil {
		color.Red("Error creating Model for Collection " + collection.Name + ":  " + err.Error())
	}

	cmd := exec.Command("gofmt", "-w", path)
	err = cmd.Start()
	if err != nil {
		color.Red("Failed to gofmt on file " + path + ":  " + err.Error())
	}
}

func genPackageImport(name string, imports []string) string {

	val := "package " + name + "\n\n"
	val += "import(\n"
	for _, imp := range imports {
		val += "\t\"" + imp + "\"\n"
	}
	val += ")\n\n"

	return val
}

func genNoSQLCollection(collection NOSQLCollection) string {
	val := ""
	val += "type " + strings.Title(collection.Name) + " struct{}\n\n"
	return val
}

func genNoSQLSchema(schema NOSQLSchema, driver string) string {

	val := ""
	schemasToCreate := []NOSQLSchema{}

	val += "type " + strings.Title(schema.Name) + " struct{\n"

	for _, field := range schema.Fields {

		if field.Type == "object" || field.Type == "objectArray" {
			schemasToCreate = append(schemasToCreate, field.Schema)
		}

		additionalTags := genNoSQLAdditionalTags(field, driver)

		val += "\n\t" + strings.Replace(strings.Title(field.Name), " ", "_", -1) + "\t" + genNoSQLFieldType(field) + "\t\t`json:\"" + field.Name + "\"" + additionalTags + "`"
	}

	val += "\n}\n\n"

	for _, schemaToCreate := range schemasToCreate {
		val += genNoSQLSchema(schemaToCreate, driver)
	}

	return val
}

func genNoSQLAdditionalTags(field NOSQLSchemaField, driver string) string {
	switch driver {
	case "boltDB":
		{
			switch field.Index {
			case "":
				return ""
			case "primary":
				return " storm:\"id\""
			case "index":
				return " storm:\"index\""
			case "unique":
				return " storm:\"unique\""
			}
		}
	}
	return ""
}

func genNoSQLFieldType(field NOSQLSchemaField) string {

	switch field.Type {
	case "int":
		return "int"
	case "float64":
		return "float64"
	case "string":
		return "string"
	case "bool":
		return "bool"
	case "byteArray":
		return "[]byte"
	case "object":
		return strings.Title(field.Schema.Name)
	case "intArray":
		return "[]int"
	case "floatArray":
		return "[]float64"
	case "stringArray":
		return "[]string"
	case "boolArray":
		return "[]bool"
	case "objectArray":
		return "[]" + strings.Title(field.Schema.Name)
	}
	return ""
}

func genNoSQLRuntime(collection NOSQLCollection, schema NOSQLSchema, driver string) string {
	val := ""
	val += genNoSQLSchemaSingle(collection, schema, driver)
	val += genNoSQLSchemaSearch(collection, schema, driver)
	val += genNoSQLSchemaAll(collection, schema, driver)
	val += genNoSQLSchemaAllByIndex(collection, schema, driver)
	val += genNoSQLSchemaRange(collection, schema, driver)
	val += genNoSQLSchemaSave(schema, driver)
	val += genNoSQLSchemaDelete(schema, driver)
	val += genNoSQLSchemaJSONRuntime(schema)
	return val
}

func genNoSQLSchemaJSONRuntime(schema NOSQLSchema) string {
	val := ""

	val += "func (obj *" + strings.Title(schema.Name) + ") JSONString() (string, error) {\n"
	val += "bytes, err := json.Marshal(obj)\n"
	val += "return string(bytes), err\n"
	val += "}\n\n"

	val += "func (obj *" + strings.Title(schema.Name) + ") JSONBytes() ([]byte, error) {\n"
	val += "	return json.Marshal(obj)\n"
	val += "}\n\n"
	return val
}

func genNoSQLSchemaSave(schema NOSQLSchema, driver string) string {
	val := ""
	val += "func (obj *" + strings.Title(schema.Name) + ") Save() error {\n"
	switch driver {
	case "boltDB":
		{
			val += "return dbServices.BoltDB.Save(obj)\n"
		}
	}
	val += "}\n\n"
	return val
}

func genNoSQLSchemaSingle(collection NOSQLCollection, schema NOSQLSchema, driver string) string {
	val := ""

	val += "func (obj *" + strings.Title(collection.Name) + ") Single(field string, value string) (retObj " + strings.Title(schema.Name) + ") {\n"
	switch driver {
	case "boltDB":
		{
			val += "dbServices.BoltDB.One(field, value, &retObj)\n"
			val += "return\n"
		}
	}
	val += "}\n\n"
	return val
}

func genNoSQLSchemaSearch(collection NOSQLCollection, schema NOSQLSchema, driver string) string {
	val := ""

	val += "func (obj *" + strings.Title(collection.Name) + ") Search(field string, value string) (retObj []" + strings.Title(schema.Name) + ") {\n"
	switch driver {
	case "boltDB":
		{
			val += "dbServices.BoltDB.Find(field, value, &retObj)\n"
			val += "return\n"
		}
	}
	val += "}\n\n"

	val += "func (obj *" + strings.Title(collection.Name) + ") SearchAdvanced(field string, value string, limit int, skip int) (retObj []" + strings.Title(schema.Name) + ") {\n"
	switch driver {
	case "boltDB":
		{
			val += "if limit == 0 && skip == 0{\n"
			val += "	dbServices.BoltDB.Find(field, value, &retObj)\n"
			val += "	return\n"
			val += "}\n"
			val += "if limit > 0 && skip > 0{\n"
			val += "	dbServices.BoltDB.Find(field, value, &retObj, storm.Limit(limit), storm.Skip(skip))\n"
			val += "	return\n"
			val += "}\n"
			val += "if limit > 0{\n"
			val += "	dbServices.BoltDB.Find(field, value, &retObj, storm.Limit(limit))\n"
			val += "	return\n"
			val += "}\n"
			val += "if skip > 0{\n"
			val += "	dbServices.BoltDB.Find(field, value, &retObj, storm.Skip(skip))\n"
			val += "	return\n"
			val += "}\n"
			val += "return\n"
		}
	}
	val += "}\n\n"
	return val
}

func genNoSQLSchemaAll(collection NOSQLCollection, schema NOSQLSchema, driver string) string {
	val := ""

	val += "func (obj *" + strings.Title(collection.Name) + ") All() (retObj []" + strings.Title(schema.Name) + ") {\n"
	switch driver {
	case "boltDB":
		{
			val += "dbServices.BoltDB.All(&retObj)\n"
			val += "return\n"
		}
	}
	val += "}\n\n"

	val += "func (obj *" + strings.Title(collection.Name) + ") AllAdvanced(limit int, skip int) (retObj []" + strings.Title(schema.Name) + ") {\n"
	switch driver {
	case "boltDB":
		{
			val += "if limit == 0 && skip == 0{\n"
			val += "	dbServices.BoltDB.All(&retObj)\n"
			val += "	return\n"
			val += "}\n"
			val += "if limit > 0 && skip > 0{\n"
			val += "	dbServices.BoltDB.All(&retObj, storm.Limit(limit), storm.Skip(skip))\n"
			val += "	return\n"
			val += "}\n"
			val += "if limit > 0{\n"
			val += "	dbServices.BoltDB.All(&retObj, storm.Limit(limit))\n"
			val += "	return\n"
			val += "}\n"
			val += "if skip > 0{\n"
			val += "	dbServices.BoltDB.All(&retObj, storm.Skip(skip))\n"
			val += "	return\n"
			val += "}\n"
			val += "return\n"
		}
	}
	val += "}\n\n"

	return val
}

func genNoSQLSchemaAllByIndex(collection NOSQLCollection, schema NOSQLSchema, driver string) string {
	val := ""

	val += "func (obj *" + strings.Title(collection.Name) + ") AllByIndex(index string) (retObj []" + strings.Title(schema.Name) + ") {\n"
	switch driver {
	case "boltDB":
		{
			val += "dbServices.BoltDB.AllByIndex(index, &retObj)\n"
			val += "return\n"
		}
	}
	val += "}\n\n"

	val += "func (obj *" + strings.Title(collection.Name) + ") AllByIndexAdvanced(index string, limit int, skip int) (retObj []" + strings.Title(schema.Name) + ") {\n"
	switch driver {
	case "boltDB":
		{
			val += "if limit == 0 && skip == 0{\n"
			val += "	dbServices.BoltDB.AllByIndex(index, &retObj)\n"
			val += "	return\n"
			val += "}\n"
			val += "if limit > 0 && skip > 0{\n"
			val += "	dbServices.BoltDB.AllByIndex(index, &retObj, storm.Limit(limit), storm.Skip(skip))\n"
			val += "	return\n"
			val += "}\n"
			val += "if limit > 0{\n"
			val += "	dbServices.BoltDB.AllByIndex(index, &retObj, storm.Limit(limit))\n"
			val += "	return\n"
			val += "}\n"
			val += "if skip > 0{\n"
			val += "	dbServices.BoltDB.AllByIndex(index, &retObj, storm.Skip(skip))\n"
			val += "	return\n"
			val += "}\n"
			val += "return\n"
		}
	}
	val += "}\n\n"

	return val
}

func genNoSQLSchemaRange(collection NOSQLCollection, schema NOSQLSchema, driver string) string {
	val := ""

	val += "func (obj *" + strings.Title(collection.Name) + ") Range(min, max, field string) (retObj []" + strings.Title(schema.Name) + ") {\n"
	switch driver {
	case "boltDB":
		{
			val += "dbServices.BoltDB.Range(field, min, max, &retObj)\n"
			val += "return\n"
		}
	}
	val += "}\n\n"

	val += "func (obj *" + strings.Title(collection.Name) + ") RangeAdvanced(min, max, field string, limit int, skip int) (retObj []" + strings.Title(schema.Name) + ") {\n"
	switch driver {
	case "boltDB":
		{
			val += "if limit == 0 && skip == 0{\n"
			val += "	dbServices.BoltDB.Range(field, min, max, &retObj)\n"
			val += "	return\n"
			val += "}\n"
			val += "if limit > 0 && skip > 0{\n"
			val += "	dbServices.BoltDB.Range(field, min, max, &retObj, storm.Limit(limit), storm.Skip(skip))\n"
			val += "	return\n"
			val += "}\n"
			val += "if limit > 0{\n"
			val += "	dbServices.BoltDB.Range(field, min, max, &retObj, storm.Limit(limit))\n"
			val += "	return\n"
			val += "}\n"
			val += "if skip > 0{\n"
			val += "	dbServices.BoltDB.Range(field, min, max, &retObj, storm.Skip(skip))\n"
			val += "	return\n"
			val += "}\n"
			val += "return\n"
		}
	}
	val += "}\n\n"

	return val
}

func genNoSQLSchemaDelete(schema NOSQLSchema, driver string) string {
	val := ""

	val += "func (obj *" + strings.Title(schema.Name) + ") Delete() error {\n"
	switch driver {
	case "boltDB":
		{
			val += "return dbServices.BoltDB.Remove(&obj)\n"
		}
	}
	val += "}\n\n"
	return val
}
