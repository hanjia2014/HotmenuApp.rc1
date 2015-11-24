module HotmenuApp.Services {
    import IUtilityService = HotmenuApp.Interfaces.IUtilityService;
    export class UtilityService implements IUtilityService {
        GetParameterByName = <T>(name: string) => {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };
    }

    angular.module("hotmenuApp").service("HotmenuApp.Services.UtilityService", UtilityService);
}