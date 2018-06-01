define(function(require, exports, module) {
    'use strict';
    
    let template = require('text!./template.html'),
        Model = require('../home/model')

    return Backbone.View.extend({
        template:_.template(template),
        render : function() {
            let self = this, 
            value = window.location.hash.split("/").pop()
            this.model = new Model()
            this.model.save({id: value}, {method: "GET"}).done(function(res){
                let result = {res}
                self.$el.html(self.template(result))
            })
            
        }
    })
})