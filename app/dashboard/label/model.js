define(function(require, exports, module) {
    'use strict';

  module.exports =  Backbone.Model.extend({
        id: null,
        urlRoot: "http://127.0.0.1:3000/label",
        defaults:  {
            result : [{
                name: null
            }]
        }
    })
})