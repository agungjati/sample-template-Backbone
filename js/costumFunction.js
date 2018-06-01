let commonFunction = {
    uritoObj : function (param) {
        let uri = decodeURI(param)
        let chunks = uri.split('&')
        let params = {}
    
        for (let i = 0; i < chunks.length; i++) {
            var chunk = chunks[i].split("=")
            let name = chunk[0].replace(/\[\]$/, '')
            if (chunk[0].search("\\[\\]") == -1) {
                params[name] = chunk[1]
            } else {
                if (typeof params[name] == 'undefined') {
                    params[name] = [chunk[1]]
                } else {
                    params[name].push(chunk[1])
                }
            }
        }
        return JSON.stringify(params)
    },
    toCapital : function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    },
    sortByAbjad : function (str) {
        return str.sort(function(a, b) {
            if(a > b) return 1
            if(b > a) return -1
            return 0
        }) 
    },
    dataTable : ({ url=null, header=null, content=null, element=null, edit=null }) => {
        let Model = Backbone.Model.extend({
            id: null,
            urlRoot: url
        })

        return Backbone.View.extend({
            template: _.template(`<div class="table-responsive"></div>`),
            initialize: function () {
                let self = this
                this.model = new Model()
                self.$el.html(this.template())
                // this.render = _.wrap(this.render, function (render) {
                //     this.beforeRender();
                //     render();
                //     this.afterRender();
                // });
                // this.render();
                let table,thead = "", tbody = "", td="", button="", thedit="";
                if(edit) thedit = "<th>Edit</th>"
                header.forEach((e, idx, array) => {
                    thead += `<th>${e}</th>`
                    if(idx == array.length - 1) thead = `<thead><tr>${thead + thedit}</tr></thead>`
                });

                this.model.fetch().done(res => {
                    res.forEach( e => {
                        content.forEach(elem => {
                            if(e[elem]){
                                if(element){
                                    element.forEach(tag => {
                                        if(tag.field == elem){
                                            if(tag.tag == "<img>") { td += $("<td>").html($(tag.tag).attr("src", "http://127.0.0.1:3000/book/img/"+ e["_id"]).attr("width","100")[0])[0].outerHTML }
                                            else { td += $("<td>").html($(tag.tag).html(e[tag.field])[0])[0].outerHTML }   
                                        }
                                    })
                                }else{  td += `<td>${e[elem]}</td>`}
                            }
                            
                        })
                        if(edit && edit.delete) 
                            button = `<td><button class="btn btn-danger btn-sm" value="${e["_id"]}" deleteOnTable><i class="fa fa-minus-circle"></i></button></td>`
                        if(edit && edit.update) 
                            button = `<td><button class="btn btn-warning btn-sm" value="${e["_id"]}" updateOnTable><i class="fa fa-pencil-square-o"></i></button></td>`
                        if(edit && edit.update && edit.delete) 
                            button = `<td><button class="btn btn-danger btn-sm" value="${e["_id"]}" deleteOnTable><i class="fa fa-minus-circle"></i></button> <button class="btn btn-warning btn-sm" value="${e["_id"]}" updateOnTable><i class="fa fa-pencil-square-o"></i></button></td>`
                        if(td!="") tbody += `<tr> ${td + button}</tr>`;  
                        td = ""
                    })
                    if(tbody!="") 
                    {
                        tbody = `<tbody>${tbody}</tbody>`
                        table = `<table class="table table-striped table-sm">${thead + tbody}</table>`
                        this.$(".table-responsive").html(table)
                    }
                })      
            },
            events: {
                'click [deleteOnTable]' : 'deleteCmd',
                'click [updateOntable]' : 'updateCmd'
            },
            deleteCmd (e) {
                let self = this
                e.preventDefault()
                let value = this.$(e.currentTarget).attr("value");
                this.model.save({ id : value }, { method: 'DELETE'}).done(function(data){
                    self.$(e.currentTarget).parent().parent().remove()
                    console.log(data.message)
                })
            },
            updateCmd(e) {
                let self = this
                e.preventDefault()
                let value = this.$(e.currentTarget).attr("value");
                window.location.hash = window.location.hash +"/"+value
            }
        })
    }
}

// (function($) {
//     $.fn.serializeFiles = function () {
//         var form = $(this),
//             formData = new FormData(),
//             formParams = form.serializeArray();
        
//         $.each(form.find('input[type="file"]'), function (i, tag) {
//             $.each($(tag)[0].files, function(i, file) {
//                 formData.append(tag.name, file)
//             })
//         })

//         $.each(formParams, function (i, val) {
//             formData.append(val.name, val.value);
//         })

//         return formData
//     }
// })(jQuery)

 // let data = this.$(e.currentTarget).serialize()
            // this.model.save(uritoObj(data)) 
            // .replace(/^[\"]+|[\"]+$/g, "")
            // let strJSON = commonFunction.uritoObj(data)
            // this.model.save(JSON.parse(strJSON), {method:"POST"}) 