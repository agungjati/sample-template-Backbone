var pathJs = "../js/";

require.config({
    paths: {
        'jquery': pathJs + 'jquery-3.2.1.min',
        // 'jquery': pathJs + 'jquery-3.3.1.slim.min',
        'underscore': pathJs + 'underscore',
        'backbone': pathJs + 'backbone',
        'bootstrap': pathJs + 'bootstrap.min',
        'popper': pathJs + 'popper.min',
        'require': pathJs + 'require',
        'text': pathJs + 'requirejs.text-2.0.12.min',
        'select2': pathJs + 'select2.min',
        'costumFunction': pathJs + 'costumFunction',
        'cookie': pathJs + 'js.cookie-2.1.3.min'
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },
        bootstrap: {
            deps: ['jquery']
        },
        backbone:{
            exports: 'Backbone'
        },
        select2 : {
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        },
        text: {
            deps: ['require']
        }
    },
    callback: function(){
        requirejs(['router'], function(Router) {
            var router = new Router();
            Backbone.history.start();
        });
    }
})
