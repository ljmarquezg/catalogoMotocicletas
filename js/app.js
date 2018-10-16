var motoApp = angular.module('motoApp', ['ngRoute', 'motoAppController', 'motoAnimation', 'motoService']);

motoApp.directive('ngMenuNavegacion', function(){
    return{
        restrict: 'E',
        templateUrl: 'vistas/menu-navegacion.html',
        controller: ['$scope','$location',function($scope, $location){
            // $scope.mostrarFiltros = false;
             //Mostrar Menu de filtrado en la barra de navegación
             $scope.showMenu = false;
             //Mostrar Menu de filtrado
             $scope.filtros = false;
            if ($location.path() == '/motos') {
                $scope.showMenu = true
            }
        }]
    }
});

motoApp.config(function($routeProvider) {
    $routeProvider
        .when('/motos', {
            templateUrl: 'vistas/lista.html',
            controller: 'listaController'
        })
        .when('/motos/:id', {
            templateUrl: 'vistas/detalle.html',
            controller: 'detalleController'
        })
        .otherwise({redirectTo: "/motos"});
});
