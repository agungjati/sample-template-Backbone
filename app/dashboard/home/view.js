define(function(require, exports, module) {
    'use strict';
    
    let template = require('text!./template.html'),
        Cookies = require('cookie')

    return Backbone.View.extend({
        template:_.template(template),
        render : function() {
            if(Cookies.get('Username') && Cookies.get('role')=="admin") {
                this.$el.html(this.template({
                    username : Cookies.get('Username'),
                    role : Cookies.get('role')
                }))
            }else{
                alert('Login dulu ! bukan admin ? gaboleh masuk')
                window.location.hash = ""
                window.location.reload()
            }
        }
    })
})