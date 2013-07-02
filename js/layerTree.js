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
                Ext.getCmp("layerTreePanel").getRootNode().findChild("id",e.attributes.id,true).select();
                var menu = new Ext.menu.Menu({
                    items: [{
                        text: 'Agregar capa',
                        icon: "img/map-plus.png",
                        handler: function(){
                            agregarCapas(e);
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
                            Ext.getCmp("layerTreePanel").getRootNode().findChild("id",e.attributes.id,true).appendChild(newFolder);
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
                            
                            new GeoExt.data.WMSCapabilitiesStore({  
                                url: capurl,
                                autoLoad: true,
                                listeners:{
                                    load: function(){
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
                                                             })
//                                                             new Ext.form.Checkbox({
//                                                                fieldLabel: 'Single Tile',
//                                                                checked: layer.singleTile,
//                                                                listeners:{
//                                                                   check: function(){
//                                                                       if (layer.singleTile == true){
//                                                                            layer.singleTile = false;
//                                                                            layer.addOptions({singleTile:false});
//                                                                       }else{
//                                                                            layer.singleTile = true;
//                                                                            layer.addOptions({singleTile:true});
//                                                                       }
//                                                                       layer.initResolutions();
//                                                                       layer.setTileSize();
//                                                                       layer.redraw();
//                                                                   }
//                                                                }
//                                                            }),
//                                                            new Ext.Toolbar.Button({
//                                                                fieldLabel: 'Refrescar',
//                                                                tooltip: 'Refrescar',
//                                                                icon: 'img/refresh.png',
//                                                                handler: function(){
//                                                                    layer.redraw();
//                                                                }
//                                                            })
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

                            var protocolo = OpenLayers.Protocol.WFS.fromWMSLayer(e.layer);

                            var wfsPanel = Ext.getCmp("featureGridPanel");
                            if(!wfsPanel.isVisible()){
                                wfsPanel.expand();
                            }
                            mask = new Ext.LoadMask(Ext.getCmp("featureGridPanel").el, {msg:"Conectando..."});
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
                                                       
                                        map.getLayersByName("wfsLayer")[0].removeAllFeatures();

                                        var x = 3;
                                        while(x < wfsStoreExport.fields.items.length){
                                            wfsStoreExport.fields.removeAt(x);
                                        }
                                        wfsStoreExport.fields.addAll(fields);
                                        wfsStoreExport.bind(map.getLayersByName("wfsLayer")[0]);

                                        Ext.getCmp("featureGridPanel").reconfigure(
                                            new GeoExt.data.FeatureStore({
                                                fields: fields,
                                                layer: map.getLayersByName("wfsLayer")[0]
                                            }),
                                            new Ext.grid.ColumnModel({
                                                columns: columns
                                            })
                                        );  

                                        Ext.getCmp("featureGridPanel").getSelectionModel().bind(map.getLayersByName("wfsLayer")[0]);
                                        
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

                                            map.getLayersByName("wfsLayer")[0].addFeatures([e.feature]);

                                        });

                                        wfsReconocerControl.events.register("featureunselected", this, function(e) {
                                            map.getLayersByName("wfsLayer")[0].removeFeatures([e.feature]);
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
                ]
                });

                menu.showAt([event.browserEvent.clientX,event.browserEvent.clientY]);

                menu.on('hide', function() {
                    menu.destroy();
                });                 
            },
            checkchange: function(e){
                Ext.getCmp("layerTreePanel").getRootNode().findChild("id",e.attributes.id,true).select();
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

