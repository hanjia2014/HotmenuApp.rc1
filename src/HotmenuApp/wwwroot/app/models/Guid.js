var Guid = (function () {
    function Guid(id) {
        this.id = id.toLowerCase();
    }
    Guid.empty = function () {
        return Guid.emptyGuid;
    };
    Guid.newGuid = function () {
        return new Guid(Guid.s4() + Guid.s4() + '-' + Guid.s4() + '-' + Guid.s4() + '-' +
            Guid.s4() + '-' + Guid.s4() + Guid.s4() + Guid.s4());
    };
    Guid.regex = function (format) {
        switch (format) {
            case 'x':
            case 'X':
                return (/\{[a-z0-9]{8}(?:-[a-z0-9]{4}){3}-[a-z0-9]{12}\}/i);
            default:
                return (/[a-z0-9]{8}(?:-[a-z0-9]{4}){3}-[a-z0-9]{12}/i);
        }
    };
    Guid.s4 = function () {
        return Math
            .floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    Guid.prototype.toString = function (format) {
        switch (format) {
            case "x":
            case "X":
                return "{" + this.id + "}";
            default:
                return this.id;
        }
    };
    Guid.prototype.valueOf = function () {
        return this.id;
    };
    Guid.generateNewId = function () {
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return guid;
    };
    Guid.emptyGuid = new Guid("00000000-0000-0000-0000-000000000000");
    return Guid;
})();
