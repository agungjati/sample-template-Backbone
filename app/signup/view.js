define(function(require, exports, module) {
    'use strict';
    
    let template = require('text!./template.html'),
        Model = require('./model')
    require('costumFunction')

    return Backbone.View.extend({
        className: 'container',
        template:_.template(template),
        render : function() {
            $('.close').click()
            this.model = new Model()
            this.$el.html(this.template())
        },
        events: {
            'submit form' : 'evSave'
        },
        evSave: function (e) {
            e.preventDefault()
            let data = JSON.parse(commonFunction.uritoObj(this.$(e.currentTarget).serialize()))
            this.model.set("role","customer")
            this.model.save(data, {method:'POST'}).done(function(data) {
                window.location.hash = "signin"
            })
            
        }
    })
})