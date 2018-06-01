define(function(require, exports, module) {
    'use strict';
    let Cookies = require('cookie')

    let template = require('text!./template.html'),
        Model = require('./model')      
    require('costumFunction')

    return Backbone.View.extend({
        template:_.template(template),
        render : function() {
            this.model = new Model()
            $("body").addClass("modal-open")
            this.$el.html(this.template())
        },
        events:{
            'click .close' : 'closeMe',
            'submit form' : 'login'
        },
        closeMe : function () {
            $("body").removeClass("modal-open")
            this.$(".modal").css("display","none")
            this.$(".modal-backdrop").hide()
        },
        login : function (e) {
            e.preventDefault()
            let data = JSON.parse(commonFunction.uritoObj(this.$(e.currentTarget).serialize()))
            this.model.save(data, {method:'POST'}).done(function(response){
                Cookies.set('Username', response.username);
                Cookies.set('role', response.role)
                console.log(response.message)
                window.location.hash = "dashboard"
            })
            
        }
    })
})