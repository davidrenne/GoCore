import { OpaqueToken, Provider } from 'angular2/src/core/di';
import { CONST_EXPR, Math, StringWrapper } from 'angular2/src/facade/lang';
/**
 *  @internal
 */
export const APP_COMPONENT_REF_PROMISE = CONST_EXPR(new OpaqueToken('Promise<ComponentRef>'));
/**
 * An {@link angular2/di/OpaqueToken} representing the application root type in the {@link
 * Injector}.
 *
 * ```
 * @Component(...)
 * class MyApp {
 *   ...
 * }
 *
 * bootstrap(MyApp).then((appRef:ApplicationRef) {
 *   expect(appRef.injector.get(appComponentTypeToken)).toEqual(MyApp);
 * });
 *
 * ```
 */
export const APP_COMPONENT = CONST_EXPR(new OpaqueToken('AppComponent'));
/**
 * A DI Token representing a unique string id assigned to the application by Angular and used
 * primarily for prefixing application attributes and CSS styles when
 * {@link ViewEncapsulation#Emulated} is being used.
 *
 * If you need to avoid randomly generated value to be used as an application id, you can provide
 * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
 * using this token.
 */
export const APP_ID = CONST_EXPR(new OpaqueToken('AppId'));
function _appIdRandomProviderFactory() {
    return `${_randomChar()}${_randomChar()}${_randomChar()}`;
}
/**
 * Providers that will generate a random APP_ID_TOKEN.
 */
export const APP_ID_RANDOM_PROVIDER = CONST_EXPR(new Provider(APP_ID, { useFactory: _appIdRandomProviderFactory, deps: [] }));
function _randomChar() {
    return StringWrapper.fromCharCode(97 + Math.floor(Math.random() * 25));
}
/**
 * A function that will be executed when a platform is initialized.
 */
export const PLATFORM_INITIALIZER = CONST_EXPR(new OpaqueToken("Platform Initializer"));
/**
 * A function that will be executed when an application is initialized.
 */
export const APP_INITIALIZER = CONST_EXPR(new OpaqueToken("Application Initializer"));
/**
 * A token which indicates the root directory of the application
 */
export const PACKAGE_ROOT_URL = CONST_EXPR(new OpaqueToken("Application Packages Root URL"));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25fdG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvcmUvYXBwbGljYXRpb25fdG9rZW5zLnRzIl0sIm5hbWVzIjpbIl9hcHBJZFJhbmRvbVByb3ZpZGVyRmFjdG9yeSIsIl9yYW5kb21DaGFyIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUMsTUFBTSxzQkFBc0I7T0FDbkQsRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBQyxNQUFNLDBCQUEwQjtBQUV4RTs7R0FFRztBQUNILGFBQWEseUJBQXlCLEdBQUcsVUFBVSxDQUFDLElBQUksV0FBVyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztBQUU5Rjs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxhQUFhLGFBQWEsR0FBZ0IsVUFBVSxDQUFDLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFFdEY7Ozs7Ozs7O0dBUUc7QUFDSCxhQUFhLE1BQU0sR0FBZ0IsVUFBVSxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFFeEU7SUFDRUEsTUFBTUEsQ0FBQ0EsR0FBR0EsV0FBV0EsRUFBRUEsR0FBR0EsV0FBV0EsRUFBRUEsR0FBR0EsV0FBV0EsRUFBRUEsRUFBRUEsQ0FBQ0E7QUFDNURBLENBQUNBO0FBRUQ7O0dBRUc7QUFDSCxhQUFhLHNCQUFzQixHQUMvQixVQUFVLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUMsVUFBVSxFQUFFLDJCQUEyQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFFMUY7SUFDRUMsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7QUFDekVBLENBQUNBO0FBRUQ7O0dBRUc7QUFDSCxhQUFhLG9CQUFvQixHQUM3QixVQUFVLENBQUMsSUFBSSxXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO0FBRXhEOztHQUVHO0FBQ0gsYUFBYSxlQUFlLEdBQWdCLFVBQVUsQ0FBQyxJQUFJLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7QUFFbkc7O0dBRUc7QUFDSCxhQUFhLGdCQUFnQixHQUN6QixVQUFVLENBQUMsSUFBSSxXQUFXLENBQUMsK0JBQStCLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPcGFxdWVUb2tlbiwgUHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7Q09OU1RfRVhQUiwgTWF0aCwgU3RyaW5nV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiAgQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBBUFBfQ09NUE9ORU5UX1JFRl9QUk9NSVNFID0gQ09OU1RfRVhQUihuZXcgT3BhcXVlVG9rZW4oJ1Byb21pc2U8Q29tcG9uZW50UmVmPicpKTtcblxuLyoqXG4gKiBBbiB7QGxpbmsgYW5ndWxhcjIvZGkvT3BhcXVlVG9rZW59IHJlcHJlc2VudGluZyB0aGUgYXBwbGljYXRpb24gcm9vdCB0eXBlIGluIHRoZSB7QGxpbmtcbiAqIEluamVjdG9yfS5cbiAqXG4gKiBgYGBcbiAqIEBDb21wb25lbnQoLi4uKVxuICogY2xhc3MgTXlBcHAge1xuICogICAuLi5cbiAqIH1cbiAqXG4gKiBib290c3RyYXAoTXlBcHApLnRoZW4oKGFwcFJlZjpBcHBsaWNhdGlvblJlZikge1xuICogICBleHBlY3QoYXBwUmVmLmluamVjdG9yLmdldChhcHBDb21wb25lbnRUeXBlVG9rZW4pKS50b0VxdWFsKE15QXBwKTtcbiAqIH0pO1xuICpcbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgQVBQX0NPTVBPTkVOVDogT3BhcXVlVG9rZW4gPSBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbignQXBwQ29tcG9uZW50JykpO1xuXG4vKipcbiAqIEEgREkgVG9rZW4gcmVwcmVzZW50aW5nIGEgdW5pcXVlIHN0cmluZyBpZCBhc3NpZ25lZCB0byB0aGUgYXBwbGljYXRpb24gYnkgQW5ndWxhciBhbmQgdXNlZFxuICogcHJpbWFyaWx5IGZvciBwcmVmaXhpbmcgYXBwbGljYXRpb24gYXR0cmlidXRlcyBhbmQgQ1NTIHN0eWxlcyB3aGVuXG4gKiB7QGxpbmsgVmlld0VuY2Fwc3VsYXRpb24jRW11bGF0ZWR9IGlzIGJlaW5nIHVzZWQuXG4gKlxuICogSWYgeW91IG5lZWQgdG8gYXZvaWQgcmFuZG9tbHkgZ2VuZXJhdGVkIHZhbHVlIHRvIGJlIHVzZWQgYXMgYW4gYXBwbGljYXRpb24gaWQsIHlvdSBjYW4gcHJvdmlkZVxuICogYSBjdXN0b20gdmFsdWUgdmlhIGEgREkgcHJvdmlkZXIgPCEtLSBUT0RPOiBwcm92aWRlciAtLT4gY29uZmlndXJpbmcgdGhlIHJvb3Qge0BsaW5rIEluamVjdG9yfVxuICogdXNpbmcgdGhpcyB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IEFQUF9JRDogT3BhcXVlVG9rZW4gPSBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbignQXBwSWQnKSk7XG5cbmZ1bmN0aW9uIF9hcHBJZFJhbmRvbVByb3ZpZGVyRmFjdG9yeSgpIHtcbiAgcmV0dXJuIGAke19yYW5kb21DaGFyKCl9JHtfcmFuZG9tQ2hhcigpfSR7X3JhbmRvbUNoYXIoKX1gO1xufVxuXG4vKipcbiAqIFByb3ZpZGVycyB0aGF0IHdpbGwgZ2VuZXJhdGUgYSByYW5kb20gQVBQX0lEX1RPS0VOLlxuICovXG5leHBvcnQgY29uc3QgQVBQX0lEX1JBTkRPTV9QUk9WSURFUjogUHJvdmlkZXIgPVxuICAgIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKEFQUF9JRCwge3VzZUZhY3Rvcnk6IF9hcHBJZFJhbmRvbVByb3ZpZGVyRmFjdG9yeSwgZGVwczogW119KSk7XG5cbmZ1bmN0aW9uIF9yYW5kb21DaGFyKCk6IHN0cmluZyB7XG4gIHJldHVybiBTdHJpbmdXcmFwcGVyLmZyb21DaGFyQ29kZSg5NyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1KSk7XG59XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiBhIHBsYXRmb3JtIGlzIGluaXRpYWxpemVkLlxuICovXG5leHBvcnQgY29uc3QgUExBVEZPUk1fSU5JVElBTElaRVI6IE9wYXF1ZVRva2VuID1cbiAgICBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbihcIlBsYXRmb3JtIEluaXRpYWxpemVyXCIpKTtcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBleGVjdXRlZCB3aGVuIGFuIGFwcGxpY2F0aW9uIGlzIGluaXRpYWxpemVkLlxuICovXG5leHBvcnQgY29uc3QgQVBQX0lOSVRJQUxJWkVSOiBPcGFxdWVUb2tlbiA9IENPTlNUX0VYUFIobmV3IE9wYXF1ZVRva2VuKFwiQXBwbGljYXRpb24gSW5pdGlhbGl6ZXJcIikpO1xuXG4vKipcbiAqIEEgdG9rZW4gd2hpY2ggaW5kaWNhdGVzIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGUgYXBwbGljYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IFBBQ0tBR0VfUk9PVF9VUkw6IE9wYXF1ZVRva2VuID1cbiAgICBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbihcIkFwcGxpY2F0aW9uIFBhY2thZ2VzIFJvb3QgVVJMXCIpKTtcbiJdfQ==