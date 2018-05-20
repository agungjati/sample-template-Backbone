define(function(require, exports, module) {
    'use strict';
    
    var template = require('text!./template.html')

    return Backbone.View.extend({
        className: 'container',
        template:_.template(template),
        render : function() {
            this.$el.html(this.template())
        }
    })
})