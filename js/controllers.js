'use strict';
/*Controladores*/

var motoAppController = angular.module('motoAppController', []);

motoAppController.controller('listaController', ['$scope', '$http', '$location',
    function($scope, $http, $location){
        $http.get('json/motos.json').success(function(data){
            var listaFabricantes = [],
                totalFabricantes =[],
                listaCategoria = [],
                totalCategoria = [];
            
            for (var i=0; i < data.length;i++){
                totalFabricantes.push(data[i].fabricante);
                totalCategoria.push(data[i].categoria);
            };
            
            listaFabricantes = totalFabricantes.filter(function(item, index, array){
                console.log(index + " " +item)
                return array.indexOf(item) === index
            });

            $scope.filterBrand = function filterBrand(fabricante){
                if(!fabricante){
                    $scope.filtroFabricante = '';
                    return
                }
                $scope.filtroFabricante = fabricante;
            }

            listaCategoria = totalCategoria.filter(function(item, index, array){
                console.log(index + " " +item)
                return array.indexOf(item) === index
            });          

            $scope.filterCategoria = function filterCategoria(categoria){
                if(!categoria){
                    $scope.filtroCategoria = '';
                    return
                }
                $scope.filtroCategoria = categoria;
            }

            $scope.filterBrand = function filterBrand(fabricante, element){
                if(!fabricante){
                    $scope.filtroFabricante = '';
                    return
                }
                $scope.filtroFabricante = fabricante;
            }
            
            $scope.counter = 0;
            $scope.showMenu = false;
            $scope.filtros = false;
            $scope.listaFabricantes = listaFabricantes;
            $scope.listaCategoria = listaCategoria;
            $scope.motos = data;
            $scope.ordenarPor = 'modelo';
            $scope.reverse = false

            if ($location.path() == '/motos'){
                $scope.showMenu = true
            }

        }).error(function(err){
            alert(err)
        });
    }]
);

motoAppController.controller('detalleController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams){
        var id = $routeParams.id;
        $http.get('json/'+id+'.json').success(function(data){
            $scope.moto = data
            $scope.imgPrincipal = data.imagenes[0];

            $scope.cambiarImagen = function(imagen){
                $scope.imgPrincipal = imagen;
            };
        }).error(function(err){
            alert(err)
        });
    }]
);