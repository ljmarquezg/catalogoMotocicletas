'use strict';
/*Creacion de servicio para*/

var motoService = angular.module('motoService', ['ngRoute']);
//Servicio para obtener las motos
motoService.factory('Motos', ['$http',
    function ($http) {
        return $http({method: 'GET', url: 'json/motos.json'})
    }
]);