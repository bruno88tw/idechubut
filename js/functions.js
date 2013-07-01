/*
 * IDE Chubut
 * 
 * Escrito por Bruno J. Vecchietti
 * 
 * functions.js
 * 
 * Contiene funciones
 * 
 */

function getCapabilitiesUrl(wms_url){

    var cap_url;

    if (wms_url.indexOf("?") == -1){
        cap_url = wms_url + "?service=wms&request=GetCapabilities";
    }else{
        cap_url = wms_url + "&service=wms&request=GetCapabilities";
    }    
    
    return cap_url;ge
    
}


function saveLayerTree(father, children){
    
    for(var i = 0; i < children.length; i++){
        if(children[i].isLeaf()){
            var layer = map.getLayersByName(children[i].attributes.layer)[0];
            father.push({"type":"leaf", "title":children[i].attributes.text, "server":layer.url, "options":layer.options, "params":layer.params});
        }else{
            var grandchildren = [];
            saveLayerTree(grandchildren,children[i].childNodes);
            father.push({"type":"folder","name":children[i].attributes.text,"children":grandchildren});
            
        }
    }    
    
}

function saveLayerIndex(){
    
    var index = [];
    
    for(var i = 0; i < map.layers.length; i++){
        index[i] = map.layers[i].name;
    }    
    
    return index;
    
}

function restoreIndex(index){
    
    var layer;
    for(var i = 0; i < index.length; i++){
        layer = map.getLayersByName(index[i])[0];
        map.setLayerIndex(layer,i);
    }      
    
}

function existeNombreCapa(nombre){
    
    if (map.getLayersByName(nombre)[0] == null){
        return false;
    }else{
        return true;
    }    
    
}

function numerarNombre(nombre){
    
    var nombrecapa = nombre;
    var i = 1;    
    
    while(existeNombreCapa(nombrecapa)){
        nombrecapa = nombre + i;
        i++;
    }
    
    return nombrecapa;
    
}

function agregarCapas(node){

   var mask, capStore, capabilitiesGrid, capabilitiesCombo, window;
    
   capStore = new GeoExt.data.WMSCapabilitiesStore({  
        url: "asdf",
        autoLoad: false,
        listeners:{
            beforeload: function(){
                mask = new Ext.LoadMask(window.el, {msg:"Conectando..."});
                mask.show();
            },
            load: function(){
                mask.hide();
            },
            exception: function(){
                mask.hide();
                Ext.MessageBox.alert('Error', 'Ha ocurrido un error en la conexión con el servidor indicado.');
            }
        }
    });    
    
   var expander = new Ext.ux.grid.RowExpander({
        tpl : new Ext.Template(
            '<HR><p><b>Resumen:</b> {abstract}</p><HR>'
        )
    }); 

   capabilitiesGrid = new Ext.grid.GridPanel({
        border: false,
        viewConfig: {
          forceFit: true
        },
        store: capStore,
        columnLines: true,
        columns: [
            expander,
            {
              header: "Título",
              dataIndex: "title",
              sortable: true
            },
            {
              header: "Nombre",
              dataIndex: "name",
              sortable: true
            }            
        ],
        plugins: expander
    });


    capabilitiesCombo = new Ext.form.ComboBox({
        store: wmsServerStore,
        width: 455,
        valueField: 'url',
        displayField: 'nombre', 
        emptyText: "Servidores WMS",
        editable: false,
        triggerAction: 'all', // needed so that the combo box doesn't filter by its current content
        mode: 'local', // keep the combo box from forcing a lot of unneeded data refreshes
        listeners: {
            select: function() {  
                var store = capabilitiesGrid.getStore();
                store.proxy.conn.url = getCapabilitiesUrl(capabilitiesCombo.getValue());
                store.load();
            }
        }
    });
     
    window = new Ext.Window({
        title: "Agregar nuevas capas",
        iconCls: 'layerIcon',
        layout: "fit",
        width: 500,
        height:300,
        resizable: false,
        autoScroll: true,
        shadow: false,
        tbar: [            
//            {html: "&nbspServidores WMS&nbsp&nbsp"},
            
//            "->",            
            new Ext.Toolbar.Button({
                 tooltip: 'Servidores WMS',
                 icon: 'img/server.png',
                 handler: function(){

                    var wmsServersGridPanel = new Ext.grid.GridPanel({
                        border: false,
                        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
                        viewConfig: {
                          forceFit: false
                        },
                        store: wmsServerStore,
                        columns: [
                            {
                              header: "Nombre",
                              dataIndex: "nombre",
                              sortable: true,
                              width: 150
                            },
                            {
                              header: "Url",
                              dataIndex: "url",
                              sortable: true,
                              width: 334
                            } 
                        ]
                    }); 
                    
                    var informationButton = new Ext.Toolbar.Button({
                        text:"Información",
                        tooltip: 'Información',
                        icon: 'img/information.png',
                        handler: function(){
                            
                           var url = wmsServersGridPanel.getSelectionModel().getSelected().data.url;                            
                            
                           var service, name, title, abstract, contactPerson, contactOrganization, contactPosition;
                           var addressType, address, city, stateOrProvince, postCode, country, contactVoiceTelephone;
                           var contactFacsimileTelephone, contactElectronicMailAddress;

                           var infomask = new Ext.LoadMask(servidoresWindow.el, {msg:"Conectando..."});
                           infomask.show();
                          
                           Ext.Ajax.request({
                               url : getCapabilitiesUrl(url), 
                               method: 'GET',
                               success: function ( result, request )
                               { 
                                   infomask.hide();
                                   
                                   var parser = new DOMParser();
                                   var xmlDoc = parser.parseFromString(result.responseText,"text/xml");
                                   
                                   try{service = xmlDoc.getElementsByTagName("Service")[0];}catch(e){};
                                   try{name = service.getElementsByTagName("Name")[0].textContent;}catch(e){};
                                   try{title = service.getElementsByTagName("Title")[0].textContent;}catch(e){};
                                   try{abstract = service.getElementsByTagName("Abstract")[0].textContent;}catch(e){};
                                   try{contactPerson = service.getElementsByTagName("ContactPerson")[0].textContent;}catch(e){};
                                   try{contactOrganization = service.getElementsByTagName("ContactOrganization")[0].textContent;}catch(e){};
                                   try{contactPosition = service.getElementsByTagName("ContactPosition")[0].textContent;}catch(e){};
                                   try{addressType = service.getElementsByTagName("AddressType")[0].textContent;}catch(e){};
                                   try{address = service.getElementsByTagName("Address")[0].textContent;}catch(e){};
                                   try{city = service.getElementsByTagName("City")[0].textContent;}catch(e){};
                                   try{stateOrProvince = service.getElementsByTagName("StateOrProvince")[0].textContent;}catch(e){};
                                   try{postCode = service.getElementsByTagName("PostCode")[0].textContent;}catch(e){};
                                   try{country = service.getElementsByTagName("Country")[0].textContent;}catch(e){};
                                   try{contactVoiceTelephone = service.getElementsByTagName("ContactVoiceTelephone")[0].textContent;}catch(e){};
                                   try{contactFacsimileTelephone = service.getElementsByTagName("ContactFacsimileTelephone")[0].textContent;}catch(e){};
                                   try{contactElectronicMailAddress = service.getElementsByTagName("ContactElectronicMailAddress")[0].textContent;}catch(e){};

                                   new Ext.Window({
                                       title: wmsServersGridPanel.getSelectionModel().getSelected().data.nombre,
                                       iconCls: 'configuracionIcon',
                                       layout: "anchor",
                                       resizable: false,   
                                       items: [
                                           new Ext.Panel({
                                               border: false,
                                               autoScroll: true,
                                               width: "100%",
                                               heigth: "100%",
                                               items: new Ext.FormPanel({
                                                    labelWidth: 85, // label settings here cascade unless overridden
                                                    frame:true,
                                                    border: false,
                                                    width: 380,
                                                    items: [
                                                        new Ext.form.FieldSet({
                                                           title: "WMS",
                                                           items: [
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Nombre',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: name
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Título',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: title
                                                               }),   
                                                               new Ext.form.TextArea({
                                                                   fieldLabel: 'Descripción',
                                                                   width: 255,
                                                                   readOnly: true,
                                                                   value: abstract
                                                               })                                                 
                                                           ]
                                                        }),
                                                        new Ext.form.FieldSet({
                                                           title: "Contacto",
                                                           items: [
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Nombre',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: contactPerson
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Organización',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: contactOrganization
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Posición',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: contactPosition
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Tipo de dirección',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: addressType
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Dirección',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: address
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Ciudad',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: city
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Provincia o estado',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: stateOrProvince
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Código Postal',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: postCode
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'País',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: country
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Teléfono',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: contactVoiceTelephone
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Fax',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: contactFacsimileTelephone
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Email',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: contactElectronicMailAddress
                                                               })
                                                           ]
                                                        })                                         
                                                    ]
                                                })
                                           })

                                       ]                                            
                                   }).show();
                               },
                               failure: function(){
                                   infomask.hide();
                                   Ext.MessageBox.alert('Error', 'Ha ocurrido un error en la conexión con el servidor indicado.');
                               },
                               listeners: {
                                    requestexception: function(){
                                         infomask.hide();
                                         Ext.MessageBox.alert('Error', 'Ha ocurrido un error en la conexión con el servidor indicado.');
                                    }
                               }
                           });

                        }
                    });

                    var servidoresWindow = new Ext.Window({
                        title: "Servidores WMS",
                        iconCls: 'serverIcon',
                        layout: "fit",
                        width: 500,
                        height:300,
                        resizable: false,
                        autoScroll: true,
                        shadow: false,
                        bbar: [
                            "->",
                            informationButton,                            
                            new Ext.Toolbar.Button({
                                tooltip: 'Agregar servidor WMS',
                                text: "Agregar",
                                icon: 'img/server-plus.png',
                                handler: function(){

                                    var nombre, wms_url;
                                    Ext.MessageBox.prompt('Agregar servidor WMS', 'Nombre del servidor', function(btn, text){
                                        if (btn == "ok"){
                                            nombre = text;
                                            if(wmsServerStore.getById(nombre) == null){
                                                Ext.MessageBox.prompt('Agregar servidor WMS', 'URL del servidor', function(btn, text){
                                                    if (btn == "ok"){
                                                        wms_url = text;
                                                        wmsServerStore.loadData([[nombre,wms_url]],true);
                                                    }
                                                })
                                            }else{
                                                Ext.MessageBox.alert('Error', 'Ya existe un servido con ese nombre');
                                            }
                                        }
                                    });                            

                                }
                            }),
                            new Ext.Toolbar.Button({
                                tooltip: 'Eliminar servidor WMS',
                                text: "Eliminar",
                                icon: 'img/server-minus.png',
                                handler: function(){

                                    wmsServersGridPanel.getSelectionModel().each(function(record){

                                            wmsServerStore.remove(wmsServerStore.getById(record.id));

                                    });                            

                                }
                            })
                        ],
                        items: [wmsServersGridPanel]                
                    }).show();
                 }
             }),
             "->",
             capabilitiesCombo
        ],
        bbar: [
            "->",
            new Ext.Toolbar.Button({
                tooltip: 'Agregar capas',
                text: "Agregar",
                icon: 'img/mas.png',
                handler: function(){

                    capabilitiesGrid.getSelectionModel().each(function(record){

                            var nombrecapa = record.data.title;
                            var servidorWMS = capabilitiesCombo.getValue();

                            if (existeNombreCapa(nombrecapa) == true){
                                nombrecapa = numerarNombre(nombrecapa)                            
                            }
                            
                            var newLeaf = createLeaf(nombrecapa, servidorWMS, {layers: record.data.name, transparent: 'true', format: 'image/png'},{isBaseLayer: false, visibility: false, singleTile: false});
                            if (node == null){
                                Ext.getCmp("myTreePanel").getRootNode().appendChild(newLeaf);  
                            }else{
                                Ext.getCmp("myTreePanel").getRootNode().findChild("id",node.attributes.id,true).appendChild(newLeaf);  
                            }    
                            
                            map.raiseLayer(wfsLayer,1);
                            map.raiseLayer(locationLayer,1);
                            
                    });
                }
            })
        ],
        items: [capabilitiesGrid]
    }).show(); 
 }

function expandAll(node){
    if (!node.isLeaf()){
        node.expand();
        node.eachChild(function(childnode){
            expandAll(childnode);
        });
    }
}

function collapseAll(node){
    if (!node.isLeaf()){
        node.collapse();
        node.eachChild(function(childnode){
            collapseAll(childnode);
        });
    }    
}

function removeLayers(node){
    
    node.eachChild(function(childnode){
        if (childnode.isLeaf()){
            map.removeLayer(map.getLayersByName(childnode.attributes.layer)[0]);        
        }else{
            removeLayers(childnode);
        } 
    });
    
}

function setFolderName(e){       
    
    var folder = e;
    
    Ext.MessageBox.prompt('Nombre de carpeta', '', function(btn, text){
        if (btn == "ok"){
            folder.setText(text);
        }
    });
        
}

function createNode(text){
    
    var node = new Ext.tree.TreeNode({
        text: text,
        expanded: false,
        icon: "img/folder.png",
        leaf: false,
        listeners:{
            contextmenu: function(e, event){
                Ext.getCmp("myTreePanel").getRootNode().findChild("id",e.attributes.id,true).select();
                var menu = new Ext.menu.Menu({
                    items: [{
                        text: 'Agregar capa',
                        icon: "img/map-plus.png",
                        handler: function(){
                            agregarCapas(e);
                        },
                        listeners:{
                            beforerender: function(){
                                if (disableAgregar){
                                    this.disable();
                                }else{
                                    this.enable();
                                }
                            }
                        }
                    },{
                        text: 'Renombrar carpeta',
                        icon: "img/folder-edit.png",
                        handler: function(){
                            setFolderName(e);
                        }
                    },{
                        text: 'Nueva carpeta',
                        icon: "img/folder-add.png",
                        handler: function(){
                            var newFolder = createNode("Nueva carpeta");
                            Ext.getCmp("myTreePanel").getRootNode().findChild("id",e.attributes.id,true).appendChild(newFolder);
                            setFolderName(newFolder);
                        }
                    },{
                        text: 'Eliminar carpeta',
                        icon: "img/folder-delete.png",
                        handler: function(){
                            removeLayers(e);
                            e.remove();
                        }
                    },{
                        text: 'Expandir todo',
                        icon: "img/list-add.png",
                        handler: function(){
                            expandAll(e);
                        }
                    },{
                        text: 'Colapsar todo',
                        icon: "img/list-remove.png",
                        handler: function(){
                            collapseAll(e);
                        }
                    }]
                });

                menu.showAt([event.browserEvent.clientX,event.browserEvent.clientY]);

                menu.on('hide', function() {
                    menu.destroy();
                }); 
                
            }
        }
    });
    
    return node;
    
}

function createLeaf(titulo, servidor, params, options){    
    
    map.addLayer(new OpenLayers.Layer.WMS(
        titulo, 
        servidor, 
        params, 
        options
    ));          
    
    var leaf = new GeoExt.tree.LayerNode({
        text: titulo,
        layer: titulo,   
        icon: "img/layers3.png",
        leaf:true,
        listeners:{
            contextmenu: function(e, event){
                e.select();
                var menu = new Ext.menu.Menu({
                    items: [{
                        text: 'Zoom a la capa',
                        icon: "img/zoom-to-map.png",                        
                        handler: function(){     
                            var capurl;
                            var layer = map.getLayersByName(e.attributes.layer)[0];
                            var url = layer.url;
                            
                            if (url.indexOf("?") == -1){
                                capurl = url + "?service=wms&request=GetCapabilities";
                            }else{
                                capurl = url + "&service=wms&request=GetCapabilities";
                            }
                            
                            var capStore = new GeoExt.data.WMSCapabilitiesStore({  
                                url: capurl,
                                autoLoad: true,
                                listeners:{
                                    load: function(){
//                                        var item = this.find('title', params.layers);
                                        var item;
                                        for(var x = 0; x < this.data.items.length; x++){
                                            if(this.data.items[x].data.name == params.layers){
                                                item = x;
                                                break;
                                            }
                                        }
                                        var west = this.data.items[item].data.llbbox[0];
                                        var south = this.data.items[item].data.llbbox[1];
                                        var east = this.data.items[item].data.llbbox[2];
                                        var north = this.data.items[item].data.llbbox[3];
                                        var bounds = new OpenLayers.Bounds(west, south, east, north);
                                        map.zoomToExtent(bounds.clone().transform(projection4326, projectionMercator));
                                    }
                                }
                            });
                            
                            
                            var layer = map.getLayersByName(e.attributes.layer)[0];
                            map.zoomToExtent(layer.maxExtent,true);
                        }
                    },{
                        text: 'Eliminar capa',
                        icon: "img/map-minus.png",
                        handler: function(){
                            e.remove();
                            map.removeLayer(map.getLayersByName(e.attributes.layer)[0]);   
                        }
                    },{
                        text: 'Subir capa',
                        icon: "img/subir-capa.png",
                        handler: function(){
                            map.raiseLayer(map.getLayersByName(e.attributes.layer)[0],1);   
                        }
                    },{
                        text: 'Bajar capa',
                        icon: "img/bajar-capa.png",
                        handler: function(){
                            map.raiseLayer(map.getLayersByName(e.attributes.layer)[0],-1);   
                        }
                    },{
                        text: 'Propiedades',
                        icon: "img/map-properties.png",
                        handler: function(){
                            var descripcionEstiloField;
                            var styleCombo;
                            var indiceField;
                            var propiedades;
                            var estilos;
                            var styledata = [];
                            var styleabstract = {};
                            var capurl;
                            var layer = map.getLayersByName(e.attributes.layer)[0];
                            var url = layer.url;
                            
                            if (url.indexOf("?") == -1){
                                capurl = url + "?service=wms&request=GetCapabilities";
                            }else{
                                capurl = url + "&service=wms&request=GetCapabilities";
                            }
                            
                            new GeoExt.data.WMSCapabilitiesStore({  
                                url: capurl,
                                autoLoad: true,
                                listeners:{
                                    beforeload: function(){
                                        mask = new Ext.LoadMask(Ext.getBody(), {msg:"Conectando..."});
                                        mask.show();
                                    },
                                    load: function(){
                                        mask.hide();
                                        var item = this.find('name', params.layers);
                                        propiedades = this.data.items[item].data;
                                        estilos = propiedades.styles;
                                        for(var x = 0; x < estilos.length; x++){
                                            styledata.push([estilos[x].title,estilos[x].name]);
                                            styleabstract[estilos[x].name] = estilos[x].abstract;
                                        }                                       
                                        
                                        new Ext.Window({
                                            title: titulo,
                                            iconCls: 'configuracionIcon',
                                            layout: "anchor",
                                            resizable: false,   
                                            items: [
                                                new Ext.Panel({
                                                    border: false,
                                                    autoScroll: true,
                                                    width: "100%",
                                                    heigth: "100%",
                                                    items: new Ext.FormPanel({
                                                         labelWidth: 85, // label settings here cascade unless overridden
                                                         frame:true,
                                                         border: false,
                                                         width: 335,
                                                         items: [
                                                             new Ext.form.TextField({
                                                                 fieldLabel: 'Título',
                                                                 width: 230,
                                                                 readOnly: true,
                                                                 value: propiedades.title
                                                             }),                                                
                                                             new Ext.form.TextField({
                                                                 fieldLabel: 'Nombre',
                                                                 width: 230,
                                                                 readOnly: true,
                                                                 value: propiedades.name
                                                             }),
                                                             new Ext.form.TextArea({
                                                                 fieldLabel: 'Descripción',
                                                                 width: 230,
                                                                 readOnly: true,
                                                                 value: propiedades.abstract
                                                             }),
                                                             styleCombo = new Ext.form.ComboBox({
                                                                 fieldLabel: 'Estilos',
                                                                 width: 230,
                                                                 typeAhead: true,
                                                                 triggerAction: 'all',
                                                                 lazyRender:true,
                                                                 mode: 'local',
                                                                 store: new Ext.data.ArrayStore({
                                                                     fields: [
                                                                         'titulo',
                                                                         'name'
                                                                     ],
                                                                     data: styledata
                                                                 }),
                                                                 valueField: 'name',
                                                                 displayField: 'titulo',
                                                                 listeners:{
                                                                     select: function(combo, record, index){
                                                                         layer.mergeNewParams({styles:record.data.name});
                                                                         descripcionEstiloField.setValue(styleabstract[record.data.name]);
                                                                     }
                                                                 }
                                                             }),
                                                             descripcionEstiloField = new Ext.form.TextArea({
                                                                 fieldLabel: 'Descripción',
                                                                 width: 230,
                                                                 readOnly: true
                                                             }),
                                                             new Ext.form.CompositeField({
                                                                 items:[
                                                                     indiceField = new Ext.form.TextField({
                                                                         fieldLabel: 'Índice',
                                                                         value: map.getLayerIndex(layer),
                                                                         width: 175,
                                                                         readOnly: true
                                                                     }),
                                                                     new Ext.Toolbar.Button({
                                                                         tooltip: 'Subir capa',
                                                                         icon: 'img/arrow-up.png',
                                                                         handler: function(){
                                                                             map.raiseLayer(map.getLayersByName(e.attributes.layer)[0],1);   
                                                                             indiceField.setValue(map.getLayerIndex(layer));
                                                                         }
                                                                     }),
                                                                     new Ext.Toolbar.Button({
                                                                         tooltip: 'Bajar capa',
                                                                         icon: 'img/arrow-down.png',
                                                                         handler: function(){
                                                                             map.raiseLayer(map.getLayersByName(e.attributes.layer)[0],-1);  
                                                                             indiceField.setValue(map.getLayerIndex(layer));
                                                                         }
                                                                     })
                                                                 ]
                                                             }),                                                             
                                                             new Ext.form.CompositeField({
                                                                 fieldLabel: 'Transparencia',
                                                                 items: [
                                                                     new Ext.form.Hidden({}),
                                                                     new GeoExt.LayerOpacitySlider({
                                                                         width: 230,
                                                                         layer: layer,
                                                                         plugins: new GeoExt.LayerOpacitySliderTip({template: '<div>Opacidad: {opacity}%</div>'})
                                                                     })                                                        
                                                                 ]
                                                             }),
                                                             new Ext.form.Checkbox({
                                                                fieldLabel: 'Single Tile',
                                                                checked: layer.singleTile,
                                                                listeners:{
                                                                   check: function(){
                                                                       if (layer.singleTile == true){
                                                                            layer.singleTile = false;
                                                                            layer.addOptions({singleTile:false});
                                                                       }else{
                                                                            layer.singleTile = true;
                                                                            layer.addOptions({singleTile:true});
                                                                       }
                                                                       layer.initResolutions();
                                                                       layer.setTileSize();
                                                                       layer.redraw();
                                                                   }
                                                                }
                                                            }),
                                                            new Ext.Toolbar.Button({
                                                                fieldLabel: 'Refrescar',
                                                                tooltip: 'Refrescar',
                                                                icon: 'img/refresh.png',
                                                                handler: function(){
                                                                    layer.redraw();
                                                                }
                                                            })
                                                         ]
                                                     })
                                                })

                                            ]                                            
                                        }).show();
                                        
                                        var stylecombobox = styleCombo;
                                        var stylestore = stylecombobox.getStore();
                                        stylestore.loadData(styledata);
                                        var record = stylestore.getAt(0);
                                        stylecombobox.setValue(record.data.titulo);
                                        descripcionEstiloField.setValue(styleabstract[record.data.name]);                                        
                                        
                                    },
                                    exception: function(){
                                        mask.hide();
                                        Ext.MessageBox.alert('Error', 'Ha ocurrido un error en la conexión con el servidor indicado.');
                                    }
                                }
                            });
                        }
                    },{
                        text: 'Metadatos',
                        icon: "img/book-bookmark.png",
                        handler: function(){

                        }                        
                    },{
                        text: 'Atributos',
                        icon: "img/information-italic.png",
                        handler: function(){


//                            var protocolo = new OpenLayers.Protocol.WFS({
//                                url: e.layer.url,
//                                version: "1.1.0",
//                                featureType: e.layer.params.LAYERS.substr(e.layer.params.LAYERS.indexOf(":") + 1),
//                                srsName: 'EPSG:900913'
//                            });

                            var protocolo = OpenLayers.Protocol.WFS.fromWMSLayer(e.layer);

                            var wfsPanel = Ext.getCmp("wfsPanel");
                            if(!wfsPanel.isVisible()){
                                wfsPanel.expand();
                            }
                            mask = new Ext.LoadMask(Ext.getCmp("wfsPanel").el, {msg:"Conectando..."});
                            mask.show();

                            protocolo.read({
                                readOptions: {output: "object"},
                                maxFeatures: 1,
                                callback: function(resp){

                                    if(resp.error){
                                        mask.hide();
                                        Ext.MessageBox.alert('Error', 'Ha ocurrido un error al tratar de obtener la información solicitada');
                                    }else{
                                        
                                        Ext.getCmp("wfsReconocerButton").toggle(false);
                                        Ext.getCmp("wfsSeleccionarButton").toggle(false);
                                        mask.hide();
                                        var attributesJSON = resp.features[0].attributes;
                                        var columns = [];
                                        var fields = [];

                                        columns.push(new Ext.grid.RowNumberer());
                                        for(attribute in attributesJSON){
                                            columns.push({header: attribute, dataIndex: attribute, sortable: true});
                                            if(isNaN(parseFloat(attributesJSON[attribute]))){
                                                fields.push({name: attribute, type: "string"});
                                            }else{
                                                fields.push({name: attribute, type: "float"});
                                            }

                                        }                                      

//                                        map.removeControl(map.getControlsByClass('OpenLayers.Control.SelectFeature')[0]);
                                                                                                                        
                                        wfsLayer.removeAllFeatures();

//                                        wfsLayer.addFeatures(resp.features); 

                                        wfsStore = new GeoExt.data.FeatureStore({
                                            fields: fields,
                                            layer: wfsLayer
                                        });
                                        
//                                        wfsStore.fields = fields;
//                                        wfsStore.layer = wfsLayer;
//                                        wfsStore.fields.clear();
//                                        for(var x = 3; x < wfsStore.fields.items.length; x++){
//                                            wfsStore.fields.removeAt(x);
//                                        }

                                        var x = 3;
                                        while(x < wfsStoreExport.fields.items.length){
                                            wfsStoreExport.fields.removeAt(x);
                                        }
                                        wfsStoreExport.fields.addAll(fields);
                                        wfsStoreExport.bind(wfsLayer);
                                        
//                                        exportButton.store = wfsStore;

                                        featureGridpanel.reconfigure(
                                            wfsStore,
                                            new Ext.grid.ColumnModel({
                                                columns: columns
                                            })
                                        );  







                                        featureGridpanel.setHeight(171);
                                        featureGridpanel.getSelectionModel().bind(wfsLayer);
                                        
                                        if (wfsReconocerControl != null){
                                            wfsReconocerControl.deactivate();
                                            map.removeControl(wfsReconocerControl);
                                        }
                                            
                                        wfsReconocerControl = new OpenLayers.Control.GetFeature({
                                            protocol: new OpenLayers.Protocol.WFS({
                                                url: e.layer.url,
                                                version: "1.1.0",
                                                featureType: e.layer.params.LAYERS.substr(e.layer.params.LAYERS.indexOf(":") + 1),
                                                srsName: 'EPSG:900913'
                                            }),
                                            box: true,
                                            hover: false,
                                            multipleKey: "shiftKey",
                                            toggleKey: "ctrlKey",
                                            maxFeatures:100
                                        });

                                        wfsReconocerControl.events.register("featureselected", this, function(e) {

                                            wfsLayer.addFeatures([e.feature]);

                                        });

                                        wfsReconocerControl.events.register("featureunselected", this, function(e) {
                                            wfsLayer.removeFeatures([e.feature]);
                                        });

                                        map.addControl(wfsReconocerControl);
                                        wfsReconocerControl.deactivate();                                           
                                        
                                        var selectControls = map.getControlsByClass('OpenLayers.Control.SelectFeature')
                                        for(var i=0; i<selectControls.length; i++){
                                            if(selectControls[i].layer.name == "wfsLayer"){
                                                wfsSelectControl = selectControls[i];
                                                break;
                                            }
                                        }
                                        
                                        wfsSelectControl.deactivate();
                                        
                                        Ext.getCmp("wfsReconocerButton").toggle(true);

                                    }

                                }
                            });

                        }
                    }
//                    ,{
//                        text: 'Información',
//                        icon: "img/information-italic.png",
//                        handler: function(){
//
//                            var layer = map.getLayersByName(e.attributes.layer)[0];
//                            var layerfullname = layer.params.LAYERS;
//                            var layername = layerfullname.substr(layerfullname.indexOf(":") + 1);
//                            var nombre = numerarNombre("wfs" + layer.name);
//                            
//                            var protocolo = new OpenLayers.Protocol.WFS({
//                                url: layer.url,
//                                version: "1.1.0",
//                                featureType: layername,
//                                srsName: 'EPSG:900913',
//                                defaultFilter: new OpenLayers.Filter.Spatial({
//                                    type: OpenLayers.Filter.Spatial.BBOX,
//                                    value: map.getExtent()
//                                })
//                            });
//                            
//                            protocolo.read({
//                                readOptions: {output: "object"},
//                                maxFeatures: 100,
//                                callback: function(resp){
//
//                                    if(resp.error){
//                                        Ext.MessageBox.alert('Error', 'Ha ocurrido un error al tratar de obtener la información solicitada');
//                                    }else{
//                                        
//                                        var attributesJSON = resp.features[0].attributes;
//                                        var columns = [];
//                                        var fields = [];
//
//                                        for(attribute in attributesJSON){
//                                            columns.push({header: attribute, dataIndex: attribute, sortable: true});
//                                            if(isNaN(parseFloat(attributesJSON[attribute]))){
//                                                fields.push({name: attribute, type: Ext.data.Types.STRING});
//                                            }else{
//                                                fields.push({name: attribute, type: Ext.data.Types.FLOAT});
//                                            }
//
//                                        }                                      
//
//                                        var wfslayer = new OpenLayers.Layer.Vector(nombre, {
//                                            displayInLayerSwitcher: false
//                                        });
//
//                                        map.addLayer(wfslayer);  
//
//                                        wfslayer.addFeatures(resp.features);
//
//                                        var grid = new Ext.grid.GridPanel({
//                                            viewConfig: {forceFit: false},
//                                            border: false,
//                                            store: new GeoExt.data.FeatureStore({
//                                                fields: fields,
//                                                layer: wfslayer                                   
//                                            }),
//                                            sm: new GeoExt.grid.FeatureSelectionModel(),
//                                            columns: columns
//                                        });           
//
//                                        var window = new Ext.Window({
//                                            title: layer.name,
//                                            iconCls: 'informacionIcon',
//                                            layout: "fit",
//                                            width: (mapPanel.getWidth()),
//                                            height: (mapPanel.getHeight()) / 4,
//                                            x: mapPanel.getPosition()[0],
//                                            y: mapPanel.getPosition()[1] + ((mapPanel.getHeight()) * 3 / 4),
//                                            resizable: false,
//                                            autoScroll: true,
//                                            tbar:[
//                                                
//                                                new Ext.Toolbar.Button({
//                                                    tooltip: 'Reconocer',
//                                                    icon: 'img/layers6.png',
//                                                    handler: function(){
//                                                        
//                                                    }
//                                                }),
//                                                new Ext.Toolbar.Button({
//                                                    tooltip: 'Seleccionar',
//                                                    icon: 'img/layers6.png',
//                                                    handler: function(){
//                                                        
//                                                    }
//                                                })
//                                                
//                                            ],
//                                            items:[grid]
//                                        }).show();  
//
//                                        window.on('close',function(){
//                                            map.removeLayer(wfslayer);
//                                        });                                        
//
//                                    }
//
//
//
//                                }
//                            });
//
//                        }
//                    }
                ]
                });

                menu.showAt([event.browserEvent.clientX,event.browserEvent.clientY]);

                menu.on('hide', function() {
                    menu.destroy();
                });                 
            },
            checkchange: function(e){
                Ext.getCmp("myTreePanel").getRootNode().findChild("id",e.attributes.id,true).select();
            }
        },
        map: map
    });
    
    return leaf;
 
}

function agregarDescendencia(father,children){
    
    var newNode;
    
    for(var x = 0; x < children.length;x++){
        if(children[x].type == "folder"){
            newNode = createNode(children[x].name);
            father.appendChild(newNode);
            agregarDescendencia(newNode,children[x].children)
        }else{
            newNode = createLeaf(children[x].title,children[x].server,children[x].params,children[x].options);
            father.appendChild(newNode);
        }          
    }
    
}



function convertDMS(coordinate, type) {
    var coords;

    abscoordinate = Math.abs(coordinate)
    coordinatedegrees = Math.floor(abscoordinate);

    coordinateminutes = (abscoordinate - coordinatedegrees)/(1/60);
    tempcoordinateminutes = coordinateminutes;
    coordinateminutes = Math.floor(coordinateminutes);
    coordinateseconds = (tempcoordinateminutes - coordinateminutes)/(1/60);
    coordinateseconds =  Math.round(coordinateseconds*10);
    coordinateseconds /= 10;
    coordinateseconds = Math.round(coordinateseconds);

    if( coordinatedegrees < 10 )
      coordinatedegrees = "0" + coordinatedegrees;

    if( coordinateminutes < 10 )
      coordinateminutes = "0" + coordinateminutes;

    if( coordinateseconds < 10 )
      coordinateseconds = "0" + coordinateseconds;

      if(type == "LAT"){
          coords = "<b>lat: </b>"+coordinatedegrees+"º "+coordinateminutes+"' "+coordinateseconds+"'' "+this.getHemi(coordinate, type)+"&nbsp&nbsp";
      }else{
          coords = "<b>lon: </b>"+coordinatedegrees+"º "+coordinateminutes+"' "+coordinateseconds+"'' "+this.getHemi(coordinate, type);
      }            

    return coords;
}

  /**
   * Return the hemisphere abbreviation for this coordinate.
   */
function getHemi(coordinate, type) {
    var coordinatehemi = "";
    if (type == 'LAT') {
      if (coordinate >= 0) {
        coordinatehemi = "N";
      }
      else {
        coordinatehemi = "S";
      }
    }
    else if (type == 'LON') {
      if (coordinate >= 0) {
        coordinatehemi = "E";
      } else {
        coordinatehemi = "O";
      }
    }

    return coordinatehemi;
}