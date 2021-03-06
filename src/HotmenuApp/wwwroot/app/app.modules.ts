﻿module HotmenuApp {

    var orderHub = $.connection.orderHub;
    $(function () {
        $.connection.hub.logging = true;
        $.connection.hub.start();
    });

    var app = angular.module("hotmenuApp", ['ngRoute', 'ng-bootstrap-datepicker']);
    app.value("orderHub", orderHub);
    app.config(Routes.configureRoutes);
}