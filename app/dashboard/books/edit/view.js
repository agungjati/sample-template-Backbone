define(function (require, exports, module) {
    'use strict';

    const template = require('text!./template.html')
    let Model = require('../model')
    require('select2')
    require('costumFunction')

    return Backbone.View.extend({
        tagName: 'div',
        className: 'container-fluid',
        template: _.template(template),
        initialize : function  (){
            let self = this, 
                value = window.location.hash.split("/").pop()
                this.model = new Model()
                this.model.save({id: value}, {method: "GET"}).done(function(){
                    self.render()
                })
            },
        render: function () {  
            this.$el.html(this.template(this.model.attributes))
            this.$('#mySelect2').select2({
                placeholder : 'Search for label',
                allowClear: true,
                width: 300,
                ajax: {
                  url: 'http://127.0.0.1:3000/findLabel',
                  dataType: 'json',
                  data: function (param) {
                      if(!param.term) {param.term = " "}
                    return { search: param.term }
                  },
                  processResults: function (data) {
                    let result = [] 
                      data.forEach(x => {
                        result.push({ "id":x.name, "text": x.name })
                      });
                    return {
                      results: result
                    };
                  },
                  cache: true
                }
              });
        },
        events: {
            'submit .form' : 'evSave',
            'click [addLabel]' : 'addLabel'
        },
        evSave (e) {            
            e.preventDefault()
            let value = window.location.hash.split("/").pop()
            let formdata = new FormData(this.$(e.currentTarget)[0])
            $.ajax({
                method:"PUT",
                url: this.model.urlRoot + '/' +  value,
                data: formdata, 
                processData: false,
                contentType: false,
                dataType: 'json' 
            }).done((data) => {
                if(data) window.location.hash = "#dashboard/books"
            })
        },
        addLabel () {
            let label = this.$('[name="labels"]').val()
            let htmlLabel = `
                <span class="badge badge-primary badge-pill" label> ${label}
                    <input type="hidden" name="label[]" value="${label}"/>
                    <a href="#" class="text-light" deleteME>&times;</a>
                </span>`
            this.$('[list-label]').append(htmlLabel)
        },
    })
})

