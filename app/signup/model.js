define(function(require, exports, module) {
    'use strict';
  module.exports =  Backbone.Model.extend({
        urlRoot: "http://127.0.0.1:3000/user",
        defaults:  {
            firstname: null,
            lastname: null,
            username: null,
            password: null,
            role: null
        }
    })
})