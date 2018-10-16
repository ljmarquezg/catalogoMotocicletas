var motoAnimation = angular.module('motoAnimation', ['ngAnimate']);

motoAnimation.animation('.presentation', function(){
    var animateSalir = function(element, className, done){
        if (className != 'active'){
            return
        }
        element.css({
            position: "absolute",
            left: '-100%',
            top: 0,
            display: 'block'
        });

        jQuery(element).animate({
            left: 0,
        }, done);

        return function(cancel){
            if (cancel){
                element.stop();
            }
        }
    }   

    var animateEntrar = function(element, className, done){
        if (className != 'active'){
            return
        }

        element.css({
            left: 0,
            opacity: 1,
            position:'absolute',
        });

        jQuery(element).animate({
            left: '-100%',
        }, done);
        
        return function(cancel){
            if (cancel){
                element.stop();
            }
        }
    };

    return {
        addClass: animateSalir,
        removeClass: animateEntrar
    }
})