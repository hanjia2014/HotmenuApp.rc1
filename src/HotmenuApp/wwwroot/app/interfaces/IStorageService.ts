module HotmenuApp.Interfaces {
    export interface IStorageService {
        get: <T>(string) => T;
        set: <T>(string, T) => void;
        remove: (string) => void;
    }
}