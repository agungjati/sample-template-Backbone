define(function (require, exports, module) {
    'use strict';

    const template = require('text!./template.html')
    let Model = require('./model')
    require('select2')
    require('costumFunction')

    return Backbone.View.extend({
        tagName: 'div',
        className: 'container-fluid',
        template: _.template(template),
        initialize: function () {
            this.model = new Model()
            this.$el.html(this.template())
            this.render = _.wrap(this.render, function (render) {
                // this.beforeRender();
                render();
                this.afterRender();
            });

            this.render();
        },
        render: function () {
           
        },
        afterRender: function () {
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
            
            let Table =  commonFunction.dataTable({
                url : this.model.urlRoot,
                header : ["Picture", "Title", "Description"],
                content : ["picture", "title", "description"],
                element : [
                    { tag:"<img>", field:"picture" },
                    { tag:"<strong>", field:"title" },
                    { tag:"<span>", field:"description" }
                ],
                edit: {
                    delete: true,
                    update: true
                }
            })
            let viewTable = new Table()
            viewTable.render()
            setTimeout(function(){
                this.$('[content] .table-responsive').remove()
                this.$('[content]').append(viewTable.el)
            }, 1000) 
        },
        events: {
            'submit .form' : 'evSave',
            'click [addLabel]' : 'addLabel',
            'click [deleteMe]' : 'deleteMe'
        },
        evSave (e) {            
            e.preventDefault()
            let formdata = new FormData(this.$(e.currentTarget)[0])
            $.ajax({
                method:"POST",
                url: this.model.urlRoot,
                data: formdata, 
                processData: false,
                contentType: false,
                dataType: 'json' 
            }).done((data) => {
                if(data) window.location.reload()
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
        deleteMe (e) {
            e.preventDefault()
            this.$(e.currentTarget).parent().remove()
        },
    })
})

