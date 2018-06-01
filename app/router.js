define(function (require, exports, module) {
    'use strict';
    
    let Backbone = require('backbone'),
        Cookies = require('cookie'),
        viewContent = function (path, option) {
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
            'signup': 'showSignup',
            'dashboard': 'showDashboard',
            'dashboard/books': 'showBooks',
            'dashboard/books/:value': 'editBooks',
            'dashboard/labels': 'showLabel',
            'dashboard/user': 'setuser',
            'signin': 'showSignin',
            'logout': 'logout',
        },
        home() {
            viewContent("home", "main") 
        },
        descBook () {
            viewContent("descBook", "main")
        },
        showDashboard () {
            viewContent("dashboard/home", "body")
        },
        showSignup () {
            viewContent("signup", "main")
        },
        showBooks () {
            this.showDashboard()
            viewContent("dashboard/books", "main");
        },
        editBooks() {
            this.showDashboard()
            viewContent("dashboard/books/edit", "main");
        },
        showLabel () {
            this.showDashboard()
            viewContent("dashboard/label", "main"); 
        },
        setuser () {
            this.showDashboard()
            viewContent("dashboard/user", "main"); 
        },
        showSignin () {
            viewContent("signin")
        },
        logout () {
            Cookies.remove("Username")
            Cookies.remove("role")
            window.location = window.location.origin
        }
    })
})