var pathJs = "../js/";

require.config({
    paths: {
        'jquery': pathJs + 'jquery-3.3.1.slim.min',
        'underscore': pathJs + 'underscore',
        'backbone': pathJs + 'backbone',
        'bootstrap': pathJs + 'bootstrap.min',
        'popper': pathJs + 'popper.min',
        'require': pathJs + 'require',
        'text': pathJs + 'requirejs.text-2.0.12.min'
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