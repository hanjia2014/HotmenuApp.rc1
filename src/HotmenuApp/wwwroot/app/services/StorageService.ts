module HotmenuApp.Services {
    export class StorageService implements HotmenuApp.Interfaces.IStorageService {
        public get<T>(key: string): T {
            return <T>JSON.parse(localStorage.getItem(key) || '""');
        }
        public set<T>(key: string, value: T): void {
            localStorage.setItem(key, JSON.stringify(value));
        }

        public remove = (key: string) => {
            localStorage.removeItem(key);
        }
    }

    angular.module("hotmenuApp").service("HotmenuApp.Services.StorageService", StorageService);
}