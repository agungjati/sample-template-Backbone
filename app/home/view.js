define(function(require, exports, module) {
    'use strict';
    
    let template = require('text!./template.html'),
        Model = require('./model')

    return Backbone.View.extend({
        template:_.template(template),
        render : function() {
            this.model = new Model()
            this.model.fetch().done( res => {
                let result = {res}
                this.$el.html(this.template(result))
            })
        }
    })
})