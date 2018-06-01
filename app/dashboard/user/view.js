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
            
            let Table =  commonFunction.dataTable({
                url : this.model.urlRoot,
                header : ["Firstname", "Lastname", "Username"],
                content : ["firstname", "lastname", "username"],
                element : [
                    { tag:"<span>", field:"firstname" },
                    { tag:"<span>", field:"lastname" },
                    { tag:"<span>", field:"username" }
                ],
                edit: {
                    delete: true
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
            'submit .form' : 'evSave'
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
            })
        }
    })
})

