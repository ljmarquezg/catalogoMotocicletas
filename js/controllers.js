'use strict';
/*Controladores*/

var motoAppController = angular.module('motoAppController', []);


motoAppController.controller('listaController', ['$scope', '$location', 'Motos',
    function ($scope, $location, Motos) {
            //Obtener todas las motos
            Motos.success(function (data) {
            var listaFabricantes = [],
                totalFabricantes = [],
                listaCategoria = [],
                totalCategoria = [];
            //Crear un arreglo con todos los fabricantes y categorias
            for (var i = 0; i < data.length; i++) {
                totalFabricantes.push(data[i].fabricante);
                totalCategoria.push(data[i].categoria);
            };
            //Identificar y no repetir los fabricantes
            listaFabricantes = totalFabricantes.filter(function (item, index, array) {
                return array.indexOf(item) === index
            });
            // Filtro por fabricantes
            $scope.filterBrand = function filterBrand(fabricante) {
                if (!fabricante) {
                    $scope.filtroFabricante = '';
                    return
                }
                $scope.filtroFabricante = fabricante;
            }
            //Identificar y no repetir los fabricantes
            listaCategoria = totalCategoria.filter(function (item, index, array) {
                return array.indexOf(item) === index
            });
            // Filtro por fabricantes
            $scope.filterCategoria = function filterCategoria(categoria) {
                if (!categoria) {
                    $scope.filtroCategoria = '';
                    return
                }
                $scope.filtroCategoria = categoria;
            }
            //Filtrar por Fabricante
            $scope.listaFabricantes = listaFabricantes;
            //Filtrar por Categoria
            $scope.listaCategoria = listaCategoria;
            //Enviar la data obtenida en la consulta
            $scope.motos = data;
            //Orden predeterminado
            $scope.ordenarPor = 'year';
            //Ordenar de manera inversa
            $scope.reverse = false
            //Verificar si es página de inicio
            //Ocultar el loader
            angular.element(document).ready(function () {
                $('.loader-container').hide();
            });
        }).error(function (err) {
            //En caso de error
            alert(err)
        })
    }
]);

motoAppController.controller('detalleController', ['$scope', '$http','$routeParams','Motos',
    function ($scope, $http,$routeParams, Motos) {
        //obtener el parámetro desde la url
        var id = $routeParams.id,
        //Array para productos relacionados
            relacionados = [];
        //Obtener la moto de acuerdo a su id
        $http.get('json/' + id + '.json').success(function (data) {
            $scope.moto = data
            //Obtener la primera imagen del producto
            $scope.imgPrincipal = data.imagenes[0];
            //Obtener la marca del fabricante
            $scope.marca = data.fabricante.nombreFabricante;
            //Cambiar Imagen principal
            $scope.cambiarImagen = function (imagen) {
                $scope.imgPrincipal = imagen;
            };
            //Obtener todas las motos
            Motos.success(function (data) {
                //Filtrar las motos que coincidan con el fabricante actual y no tengan el mismo id de la moto mostrada
                data.forEach(elemento => {
                    if (elemento.fabricante == $scope.moto.fabricante.nombreFabricante && elemento.id != $scope.moto.id) {
                        relacionados.push(elemento)
                    }
                })
                //Actualizar el scope
                $scope.relacionados = relacionados;
            })
        }).error(function (err) {
            alert(err)
        });
        //Ocultar el loader
         //Ocultar el loader
         angular.element(document).ready(function () {
            $('.loader-container').hide();
        });
    }
]);