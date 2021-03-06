'use strict';var platform_location_1 = require('./platform_location');
var lang_1 = require('angular2/src/facade/lang');
var browser_platform_location_1 = require('angular2/src/router/location/browser_platform_location');
var core_1 = require('angular2/core');
exports.WORKER_RENDER_ROUTER = lang_1.CONST_EXPR([
    platform_location_1.MessageBasedPlatformLocation,
    browser_platform_location_1.BrowserPlatformLocation,
    lang_1.CONST_EXPR(new core_1.Provider(core_1.APP_INITIALIZER, { useFactory: initRouterListeners, multi: true, deps: lang_1.CONST_EXPR([core_1.Injector]) }))
]);
function initRouterListeners(injector) {
    return function () {
        var zone = injector.get(core_1.NgZone);
        zone.run(function () { return injector.get(platform_location_1.MessageBasedPlatformLocation).start(); });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Byb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy91aS9yb3V0ZXJfcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbImluaXRSb3V0ZXJMaXN0ZW5lcnMiXSwibWFwcGluZ3MiOiJBQUFBLGtDQUEyQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQ2pFLHFCQUF5QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3BELDBDQUFzQyx3REFBd0QsQ0FBQyxDQUFBO0FBQy9GLHFCQUEwRCxlQUFlLENBQUMsQ0FBQTtBQUU3RCw0QkFBb0IsR0FBRyxpQkFBVSxDQUFDO0lBQzdDLGdEQUE0QjtJQUM1QixtREFBdUI7SUFDdkIsaUJBQVUsQ0FDTixJQUFJLGVBQVEsQ0FBQyxzQkFBZSxFQUNmLEVBQUMsVUFBVSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGlCQUFVLENBQUMsQ0FBQyxlQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztDQUNoRyxDQUFDLENBQUM7QUFFSCw2QkFBNkIsUUFBa0I7SUFDN0NBLE1BQU1BLENBQUNBO1FBQ0xBLElBQUlBLElBQUlBLEdBQUdBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLGFBQU1BLENBQUNBLENBQUNBO1FBRWhDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxjQUFNQSxPQUFBQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxnREFBNEJBLENBQUNBLENBQUNBLEtBQUtBLEVBQUVBLEVBQWxEQSxDQUFrREEsQ0FBQ0EsQ0FBQ0E7SUFDckVBLENBQUNBLENBQUNBO0FBQ0pBLENBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNZXNzYWdlQmFzZWRQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QnJvd3NlclBsYXRmb3JtTG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb24vYnJvd3Nlcl9wbGF0Zm9ybV9sb2NhdGlvbic7XG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUiwgUHJvdmlkZXIsIEluamVjdG9yLCBOZ1pvbmV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgV09SS0VSX1JFTkRFUl9ST1VURVIgPSBDT05TVF9FWFBSKFtcbiAgTWVzc2FnZUJhc2VkUGxhdGZvcm1Mb2NhdGlvbixcbiAgQnJvd3NlclBsYXRmb3JtTG9jYXRpb24sXG4gIENPTlNUX0VYUFIoXG4gICAgICBuZXcgUHJvdmlkZXIoQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgICAgICAgICAgICAgIHt1c2VGYWN0b3J5OiBpbml0Um91dGVyTGlzdGVuZXJzLCBtdWx0aTogdHJ1ZSwgZGVwczogQ09OU1RfRVhQUihbSW5qZWN0b3JdKX0pKVxuXSk7XG5cbmZ1bmN0aW9uIGluaXRSb3V0ZXJMaXN0ZW5lcnMoaW5qZWN0b3I6IEluamVjdG9yKTogKCkgPT4gdm9pZCB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgbGV0IHpvbmUgPSBpbmplY3Rvci5nZXQoTmdab25lKTtcblxuICAgIHpvbmUucnVuKCgpID0+IGluamVjdG9yLmdldChNZXNzYWdlQmFzZWRQbGF0Zm9ybUxvY2F0aW9uKS5zdGFydCgpKTtcbiAgfTtcbn1cbiJdfQ==