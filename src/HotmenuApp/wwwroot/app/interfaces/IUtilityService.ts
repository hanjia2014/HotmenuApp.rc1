module HotmenuApp.Interfaces {
    export interface IUtilityService {
        GetParameterByName: <T>(string) => T;
    }
}