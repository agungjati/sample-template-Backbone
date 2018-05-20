define(function(require, exports, module) {
    'use strict';
    
    var template = require('text!./template.html')

    return Backbone.View.extend({
        tagName: 'nav',
        className: 'navbar navbar-expand-sm navbar-light bg-light',
        attributes: {"style":"background: gradient;background: linear-gradient(30deg, #ffffff , #e9ecef, #cecece)!important;"},
        template:_.template(template),
        render : function() {
            this.$el.html(this.template())
        }
    })
})