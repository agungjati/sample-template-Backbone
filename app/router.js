define(function (require, exports, module) {
    'use strict';

    var Backbone = require('backbone')
    var viewContent = function (path, option) {
        require([`./` + path + `/view`], function (View) {
            var view = new View()
            view.render()
            if (!option)
                $("body").prepend(view.el)
            else
                $(option).html(view.el)
        })
    }
    require('bootstrap')

    module.exports = Backbone.Router.extend({
        initialize: function () {
            this.app = {};
        },
        routes: {
            '': 'home',
            'book/:title': 'descBook',
            'login': 'showLogin'
        },
        home: function () {
            viewContent("footer", "body")
            if($("footer")){ viewContent("home") }
            if($("main")){ viewContent("navbar") }
        },
        descBook: function () {
            // this.showLogin()
            if($("footer").length == 0 ){ viewContent("footer", "body") }
            if($("main").length == 0){ viewContent("home") }
            if($("nav").length == 0){ viewContent("navbar") }
            viewContent("descBook", "main")
        },
        showLogin: function() {
            viewContent("login", "body")
        }
    })
})