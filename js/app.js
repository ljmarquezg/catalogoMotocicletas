var motoApp = angular.module('motoApp', ['ngRoute', 'motoAppController', 'motoAnimation']);

motoApp.directive('ngMenuNavegacion', function(){
    return{
        restrict: 'E',
        templateUrl: 'vistas/menu-navegacion.html',
        controller: ['$scope','$location',function($scope, $location){
            $scope.mostrarFiltros = false;
            // Si la pagina actual es homepage muestra el menu de filtros
            if($location.path() == '/motos'){
                $scope.mostrarFiltros = true
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
