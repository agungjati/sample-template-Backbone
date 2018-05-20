define(function(require, exports, module) {
    'use strict';
    
    var template = require('text!./template.html')

    return Backbone.View.extend({
        tagName: 'footer',
        className: 'text-muted',
        template:_.template(template),
        render : function() {
            this.$el.html(this.template())
        }
    })
})