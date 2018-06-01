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
        initialize : function  (){
            let self = this
            this.model = new Model()
            this.model.fetch().done(function(){
                self.render()
            })
        },
        render: function () {  
            this.$el.html(this.template(this.model.attributes))
        },
        events: {
            'submit .form' : 'evSave',
            'click [deleteMe]' : 'deleteMe',
            'click [addLabel]' : 'addLabel',
        },
        evSave (e) {            
            let self = this
            e.preventDefault()
            let data = this.$(e.currentTarget).serialize()
            this.model.set("id", null)
            this.model.save(JSON.parse(commonFunction.uritoObj(data)), { method: 'POST'}).done(function(data){
                window.location.reload()
            })
        },
        deleteMe (e) {
            let self = this
            e.preventDefault()
            let name = this.$(e.currentTarget).attr("value");
            this.model.save({ id : name }, { method: 'DELETE'}).done(function(data){
                self.$(e.currentTarget).parent().remove()
                console.log(data.message)
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
        }
    })
})

