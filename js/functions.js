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

function getTopBar(){           

//    removeFeature = new DeleteFeature(vectors);
//    map.addControl(removeFeature);
//
//    drag = new OpenLayers.Control.DragFeature(vectors);
//    map.addControl(drag);
//    
//    modify = new OpenLayers.Control.ModifyFeature(vectors);
//    map.addControl(modify);
//    
//    resize = new OpenLayers.Control.ModifyFeature(vectors);
//    resize.mode = OpenLayers.Control.ModifyFeature.RESIZE;
//    map.addControl(resize);
//    
//    rotate = new OpenLayers.Control.ModifyFeature(vectors);
//    rotate.mode = OpenLayers.Control.ModifyFeature.ROTATE;
//    map.addControl(rotate);
//    
//    circle = new OpenLayers.Control.DrawFeature(vectors, OpenLayers.Handler.Point);
//    map.addControl(circle);
//    
//    line = new OpenLayers.Control.DrawFeature(vectors, OpenLayers.Handler.Path);
//    map.addControl(line);
//    
//    polygonFree = new OpenLayers.Control.DrawFeature(vectors, OpenLayers.Handler.Polygon);
//    map.addControl(polygonFree);
//    
//    polygonRegular = new OpenLayers.Control.DrawFeature(vectors, OpenLayers.Handler.RegularPolygon, {handlerOptions: {sides: 5}});
//    map.addControl(polygonRegular);
//    
//    isRegular = false;
//    isSimetric = true;
//    sides = 5;
//    
//    select = new OpenLayers.Control.SelectFeature(vectors, 
//        {
//         clickout: true, toggle: false,
//         multiple: false, hover: false,
//         toggleKey: "ctrlKey", // ctrl key removes from selection
//         multipleKey: "shiftKey", // shift key adds to selection
//         box: true
//        }
//    );
//    map.addControl(select);                                          
    
    tbar.push(new GeoExt.Action({
            control: new OpenLayers.Control.Navigation(),
            map: map,
//            text: "Mover",
            icon: "img/arrow-move.png",
            toggleGroup: "nav",
            tooltip: "Navegación",
            checked: true
    }));
            
    tbar.push(new GeoExt.Action({
            control: new OpenLayers.Control.ZoomToMaxExtent(),
            map: map,
//            text:"Zoom",
            icon: "img/magnifier-zoom-fit.png",
            tooltip: 'Zoom a la máxima extensión'
    }));
    
    tbar.push(new GeoExt.Action({
            control: new OpenLayers.Control.ZoomBox(),
            map: map,
//            text:"Acercar",
            icon: "img/magnifier-zoom-in.png",
            toggleGroup: "nav",
            tooltip: "Zoom in"
    }));

    tbar.push(new GeoExt.Action({
             control: new OpenLayers.Control.ZoomBox({out: true}),
             map: map,
//             text:"Alejar",
             icon: "img/magnifier-zoom-out.png",
             toggleGroup: "nav",
             tooltip: "Zoom out"
    }));

    tbar.push(new GeoExt.Action({
             icon: "img/control-right.png",
//             text:"Anterior",
             control: map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0].previous,
             disabled: true,
             tooltip: "Zoom anterior"
     }));

     tbar.push(new GeoExt.Action({
             icon: "img/control-left.png",
//             text:"Siguiente",
             control: map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0].next,
             disabled: true,
             tooltip: "Zoom posterior"
     }));

     tbar.push(new GeoExt.Action({
         control: new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
             eventListeners: {
                 measure: function(evt) {
                     new Ext.Window({
                         title: "Herramienta de medición de distancia",
                         iconCls: "distanciaIcon",
                         width: 300,
                         layout: "fit",
                         autoScroll:true,
                         maximizable :true,
                         collapsible : true,
                         bodyStyle:'background-color:white',                                        
                         html:'<div align="center" style="font-size:14px; padding:15px">La distancia es de ' + Math.round(evt.measure*100)/100 + ' ' + evt.units + '</div>'
                     }).show();
                 }
             }
         }),
         map: map,
//         text:"Distancia",
         toggleGroup: "nav",
         icon: 'img/rulerline.png',
         tooltip: "Medidor de distancias"
     })); 

     tbar.push(new GeoExt.Action({
         control: new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
             eventListeners: {
                 measure: function(evt) {
                     new Ext.Window({
                         title: "Herramienta de medición de superficie",
                         iconCls: "superficieIcon",
                         width: 300,
                         layout: "fit",
                         autoScroll:true,
                         maximizable :true,
                         collapsible : true,
                         bodyStyle:'background-color:white',
                         html:'<div align="center" style="font-size:14px; padding:15px">La superficie es de ' + Math.round(evt.measure*100)/100 + ' ' + evt.units + '<sup>2</sup></div>'
                     }).show();
                 }
             }
         }),
         map: map,
//         text:"Superficie",
         toggleGroup: "nav",
         icon: 'img/rulerarea.png',
         tooltip: "Medidor de superficie"
     }));

     tbar.push(new GeoExt.Action({
             control: map.getControlsByClass('OpenLayers.Control.WMSGetFeatureInfo')[0],
             map: map,
//             text:"Información",
             icon: "img/information-italic.png",
             toggleGroup: "nav",
             tooltip: "Obtener información"
     }));

//     tbar.push(
//     
//        [
//        new Ext.Toolbar.Button({
//             tooltip: 'Puntos',
//             icon: "img/draw_circle.png",                           
//             toggleGroup: "nav",  
//             allowDepress: true,
//             listeners: {
//                 toggle: function(){
//                     if(this.pressed){
//                         circle.activate();          
//                     }else{
//                         circle.deactivate();          
//                     }
//                 }
//             }
//         }),
//        new Ext.Toolbar.Button({
//             tooltip: 'Líneas',
//             icon: "img/draw_line.png",                            
//             toggleGroup: "nav",  
//             allowDepress: true,
//             listeners: {
//                 toggle: function(){
//                     if(this.pressed){
//                         line.activate();          
//                     }else{
//                         line.deactivate();          
//                     }
//                 }
//             }
//         }),
//
//        new Ext.SplitButton({
//             tooltip: 'Polígonos',
//             icon: "img/draw_poly.png",
//             iconCls: 'blist',                           
//             toggleGroup: "nav",  
//             allowDepress: true,
//             listeners: {
//                 toggle: function(){
//                     if(this.pressed){
//                         if(!isRegular){
//                             polygonRegular.deactivate();
//                             polygonFree.activate();
//                         }else{
//                             polygonFree.deactivate();
//                             polygonRegular.activate();
//                         }         
//                     }else{
//                         polygonFree.deactivate();          
//                         polygonRegular.deactivate();
//                     }
//                 }
//             },
//             menu: new Ext.menu.Menu({
//                style: {
//                    overflow: 'visible'     // For the Combo popup
//                },items:[
//
//                    {
//                        id: "polyIsFree",
//                        text: 'Libre',
//                        checked: true,
//                        group: 'poly',
//                        listeners: {
//                            checkchange: function(item, state){
//                              if(state){
//                                isRegular = false;  
//                                Ext.getCmp("polySidesField").disable();
//                                Ext.getCmp("polySimCheck").disable();
//                                polygonRegular.deactivate();
//                                polygonFree.activate();
//                              }
//                            }                                            
//                        }
//
//                    }, {
//                        id: "polyIsRegular",
//                        text: 'Regular',
//                        checked: false,
//                        group: 'poly',
//                        listeners: {
//                            checkchange: function(item, state){
//                              if(state){
//                                isRegular = true;
//                                Ext.getCmp("polySidesField").enable();
//                                Ext.getCmp("polySimCheck").enable();
//                                polygonFree.deactivate();
//                                polygonRegular.activate();
//                              }
//                            }                                            
//                        }
//                    },
//                    new Ext.form.NumberField({
//                        id: "polySidesField",
//                        disabled: true,
//                        emptyText: 'Lados',
//                        width: 50,
//                        iconCls: 'no-icon',
//                        maxLength: 3,
//                        autoCreate: {tag: 'input', type: 'text', size: '20', autocomplete:'off', maxlength: '3'}, //needed torestrict max length
//                        enableKeyEvents: true,
//                        listeners: {
//                            keyup: function(item, e){
//                                polygonRegular.deactivate();  
//                                sides = parseInt(Ext.getCmp("polySidesField").getValue());
//                                if(isNaN(sides)){
//                                    polygonRegular.handler.sides = 3;
//                                }else{
//                                    if(sides < 4){
//                                        polygonRegular.handler.sides = 3;
//                                    }else{
//                                        polygonRegular.handler.sides = sides;
//                                    }
//                                }
//                                polygonRegular.activate();
//                            }
//                        }
//                    }),
//                    {
//                        id: "polySimCheck",
//                        disabled: true,
//                        text: 'Simétrico',
//                        checked: true,
//                        listeners: {
//                            checkchange: function(item, state){
//                              polygonRegular.deactivate(); 
//                              isSimetric = state;
//                              if(isSimetric){
//                                  polygonRegular.handler.irregular = false;
//                              }else{
//                                  polygonRegular.handler.irregular = true;
//                              }
//                              polygonRegular.activate();
//                            }                                            
//                        }
//                    }
//                ]
//
//            })
//         }),                         
//
//         new GeoExt.Action({
//             tooltip: 'Select',
//             icon: "img/cursor.png",                           
//             control: new OpenLayers.Control.SelectFeature(
//                 vectors,
//                 {
//                 clickout: true, toggle: false,
//                 multiple: false, hover: false,
//                 toggleKey: "ctrlKey", // ctrl key removes from selection
//                 multipleKey: "shiftKey", // shift key adds to selection
//                 box: true
//                 }
//             ),
//             map: map,
//             toggleGroup: "nav", 
//             allowDepress: true          
//         }),
//         new Ext.Toolbar.Button({
//             tooltip: 'Mover',
//             icon: "img/hand.png",                            
//             toggleGroup: "nav",  
//             allowDepress: true,
//             control: drag,
//             listeners: {
//                 toggle: function(){
//                     if(this.pressed){
//                         drag.activate();          
//                     }else{
//                         drag.deactivate();          
//                     }
//                 }
//             }
//         }),    
//         new Ext.Toolbar.Button({
//             tooltip: 'Borrar features',
//             icon: "img/eraser.png",                           
//             toggleGroup: "nav",  
//             allowDepress: true,
//             control: removeFeature,
//             listeners: {
//                 toggle: function(){
//                     if(this.pressed){
//                         removeFeature.activate();          
//                     }else{
//                         removeFeature.deactivate();          
//                     }
//                 }
//             }
//         }),
//         new Ext.Toolbar.Button({
//             tooltip: 'Borrar todo features',
//             icon: "img/trash.png",
//             handler: function(){
//                 vectors.destroyFeatures();
//             }
//         }),new Ext.Toolbar.Button({
//             tooltip: 'Cambiar tamaño',
//             icon: "img/resize.png",
//             iconCls: 'blist',
//             toggleGroup: "nav",  
//             allowDepress: true, 
//             listeners: {
//                 toggle: function(){
//                     if(this.pressed){                                     
//                        resize.activate(); 
//                     }else{
//                        resize.deactivate(); 
//                     }
//                 }
//             }
//         }),new Ext.Toolbar.Button({
//             tooltip: 'Rotar',
//             icon: "img/rotate.png",
//             toggleGroup: "nav",  
//             allowDepress: true,
//             listeners: {
//                 toggle: function(){
//                     if(this.pressed){                                        
//                        rotate.activate(); 
//                     }else{
//                        rotate.deactivate(); 
//                     }
//                 }
//             }
//         }),new Ext.Toolbar.Button({
//             tooltip: 'Deshacer',
//             icon: "img/undo.png", 
//             handler: function(){
//
//             }
//         }),new Ext.Toolbar.Button({
//             tooltip: 'Rehacer',
//             icon: "img/redo.png", 
//             handler: function(){
//
//             }
//         }),new Ext.Toolbar.Button({
//             tooltip: 'Modificar',
//             icon: "img/pencil.png",                            
//             toggleGroup: "nav",  
//             allowDepress: true,
//             control: modify,
//             listeners: {
//                 toggle: function(){
//                     if(this.pressed){
//                         modify.activate();          
//                     }else{
//                         modify.deactivate();          
//                     }
//                 }
//             }
//         })      
//         ]     
//             
//     );
//         
//     tbar.push("-");    
     
//     tbar.push(new Ext.Toolbar.Button({
//         id: "dibujo",
//         tooltip: 'Dibujo',
//         icon: 'img/pencil.png',
//         handler: function(){
//             var window = new Ext.Window({
//                 title: "Dibujo",
//                 iconCls: 'dibujoIcon',
//                 layout: "fit",
//                 width: 440,
////                 height:300,
//                 resizable: false,
//                 x: mapPanel.getPosition()[0] + (mapPanel.getWidth()/2) - 237,
//                 y: mapPanel.getPosition()[1] + 5,
////                 shadow: false,
//                 tbar: [
//                        new Ext.Toolbar.Button({
//                             tooltip: 'Puntos',
//                             icon: "img/draw_circle.png",
//                             width: 35,
//                             height: 35,                             
//                             toggleGroup: "nav",  
//                             allowDepress: true,
//                             listeners: {
//                                 toggle: function(){
//                                     if(this.pressed){
//                                         circle.activate();          
//                                     }else{
//                                         circle.deactivate();          
//                                     }
//                                 }
//                             }
//                         }),
//                        new Ext.Toolbar.Button({
//                             tooltip: 'Líneas',
//                             icon: "img/draw_line.png",
//                             width: 35,
//                             height: 35,                             
//                             toggleGroup: "nav",  
//                             allowDepress: true,
//                             listeners: {
//                                 toggle: function(){
//                                     if(this.pressed){
//                                         line.activate();          
//                                     }else{
//                                         line.deactivate();          
//                                     }
//                                 }
//                             }
//                         }),
//                         
//                        new Ext.SplitButton({
//                             tooltip: 'Polígonos',
//                             icon: "img/draw_poly.png",
//                             iconCls: 'blist',
//                             width: 35,
//                             height: 35,                             
//                             toggleGroup: "nav",  
//                             allowDepress: true,
//                             listeners: {
//                                 toggle: function(){
//                                     if(this.pressed){
//                                         if(!isRegular){
//                                             polygonRegular.deactivate();
//                                             polygonFree.activate();
//                                         }else{
//                                             polygonFree.deactivate();
//                                             polygonRegular.activate();
//                                         }         
//                                     }else{
//                                         polygonFree.deactivate();          
//                                         polygonRegular.deactivate();
//                                     }
//                                 }
//                             },
//                             menu: new Ext.menu.Menu({
//                                style: {
//                                    overflow: 'visible'     // For the Combo popup
//                                },items:[
//                                    
//                                    {
//                                        id: "polyIsFree",
//                                        text: 'Libre',
//                                        checked: true,
//                                        group: 'poly',
//                                        listeners: {
//                                            checkchange: function(item, state){
//                                              if(state){
//                                                isRegular = false;  
//                                                Ext.getCmp("polySidesField").disable();
//                                                Ext.getCmp("polySimCheck").disable();
//                                                polygonRegular.deactivate();
//                                                polygonFree.activate();
//                                              }
//                                            }                                            
//                                        }
//
//                                    }, {
//                                        id: "polyIsRegular",
//                                        text: 'Regular',
//                                        checked: false,
//                                        group: 'poly',
//                                        listeners: {
//                                            checkchange: function(item, state){
//                                              if(state){
//                                                isRegular = true;
//                                                Ext.getCmp("polySidesField").enable();
//                                                Ext.getCmp("polySimCheck").enable();
//                                                polygonFree.deactivate();
//                                                polygonRegular.activate();
//                                              }
//                                            }                                            
//                                        }
//                                    },
//                                    new Ext.form.NumberField({
//                                        id: "polySidesField",
//                                        disabled: true,
//                                        emptyText: 'Lados',
//                                        width: 50,
//                                        iconCls: 'no-icon',
//                                        maxLength: 3,
//                                        autoCreate: {tag: 'input', type: 'text', size: '20', autocomplete:'off', maxlength: '3'}, //needed torestrict max length
//                                        enableKeyEvents: true,
//                                        listeners: {
//                                            keyup: function(item, e){
//                                                polygonRegular.deactivate();  
//                                                sides = parseInt(Ext.getCmp("polySidesField").getValue());
//                                                if(isNaN(sides)){
//                                                    polygonRegular.handler.sides = 3;
//                                                }else{
//                                                    if(sides < 4){
//                                                        polygonRegular.handler.sides = 3;
//                                                    }else{
//                                                        polygonRegular.handler.sides = sides;
//                                                    }
//                                                }
//                                                polygonRegular.activate();
//                                            }
//                                        }
//                                    }),
//                                    {
//                                        id: "polySimCheck",
//                                        disabled: true,
//                                        text: 'Simétrico',
//                                        checked: true,
//                                        listeners: {
//                                            checkchange: function(item, state){
//                                              polygonRegular.deactivate(); 
//                                              isSimetric = state;
//                                              if(isSimetric){
//                                                  polygonRegular.handler.irregular = false;
//                                              }else{
//                                                  polygonRegular.handler.irregular = true;
//                                              }
//                                              polygonRegular.activate();
//                                            }                                            
//                                        }
//                                    }
//                                ]
//                                
//                            })
//                         }),                         
//         
//                         new GeoExt.Action({
//                             tooltip: 'Select',
//                             icon: "img/cursor.png",
//                             width: 35,
//                             height: 35,                             
//                             control: new OpenLayers.Control.SelectFeature(
//                                 vectors,
//                                 {
//                                 clickout: true, toggle: false,
//                                 multiple: false, hover: false,
//                                 toggleKey: "ctrlKey", // ctrl key removes from selection
//                                 multipleKey: "shiftKey", // shift key adds to selection
//                                 box: true
//                                 }
//                             ),
//                             map: map,
//                             toggleGroup: "nav", 
//                             allowDepress: true          
//                         }),
//                         new Ext.Toolbar.Button({
//                             tooltip: 'Mover',
//                             icon: "img/hand.png",
//                             width: 35,
//                             height: 35,                             
//                             toggleGroup: "nav",  
//                             allowDepress: true,
//                             control: drag,
//                             listeners: {
//                                 toggle: function(){
//                                     if(this.pressed){
//                                         drag.activate();          
//                                     }else{
//                                         drag.deactivate();          
//                                     }
//                                 }
//                             }
//                         }),    
//                         new Ext.Toolbar.Button({
//                             tooltip: 'Borrar features',
//                             icon: "img/eraser.png",
//                             width: 35,
//                             height: 35,                             
//                             toggleGroup: "nav",  
//                             allowDepress: true,
//                             control: removeFeature,
//                             listeners: {
//                                 toggle: function(){
//                                     if(this.pressed){
//                                         removeFeature.activate();          
//                                     }else{
//                                         removeFeature.deactivate();          
//                                     }
//                                 }
//                             }
//                         }),
//                         new Ext.Toolbar.Button({
//                             tooltip: 'Borrar todo features',
//                             icon: "img/trash.png",
//                             width: 35,
//                             height: 35,  
//                             handler: function(){
//                                 vectors.destroyFeatures();
//                             }
//                         }),new Ext.Toolbar.Button({
//                             tooltip: 'Cambiar tamaño',
//                             icon: "img/resize.png",
//                             iconCls: 'blist',
//                             toggleGroup: "nav",  
//                             allowDepress: true,
//                             width: 35,
//                             height: 35,  
//                             listeners: {
//                                 toggle: function(){
//                                     if(this.pressed){                                     
//                                        resize.activate(); 
//                                     }else{
//                                        resize.deactivate(); 
//                                     }
//                                 }
//                             }
//                         }),new Ext.Toolbar.Button({
//                             tooltip: 'Rotar',
//                             icon: "img/rotate.png",
//                             toggleGroup: "nav",  
//                             allowDepress: true,
//                             width: 35,
//                             height: 35,  
//                             listeners: {
//                                 toggle: function(){
//                                     if(this.pressed){                                        
//                                        rotate.activate(); 
//                                     }else{
//                                        rotate.deactivate(); 
//                                     }
//                                 }
//                             }
//                         }),new Ext.Toolbar.Button({
//                             tooltip: 'Deshacer',
//                             icon: "img/undo.png",
//                             width: 35,
//                             height: 35,  
//                             handler: function(){
//
//                             }
//                         }),new Ext.Toolbar.Button({
//                             tooltip: 'Rehacer',
//                             icon: "img/redo.png",
//                             width: 35,
//                             height: 35,  
//                             handler: function(){
//
//                             }
//                         }),new Ext.Toolbar.Button({
//                             tooltip: 'Modificar',
//                             icon: "img/pencil.png",
//                             width: 35,
//                             height: 35,                             
//                             toggleGroup: "nav",  
//                             allowDepress: true,
//                             control: modify,
//                             listeners: {
//                                 toggle: function(){
//                                     if(this.pressed){
//                                         modify.activate();          
//                                     }else{
//                                         modify.deactivate();          
//                                     }
//                                 }
//                             }
//                         })      
//                 ]
//             });
//             window.show();
//             window.on('close',function(){
//                 
//                 Ext.getCmp("dibujo").enable();
//             });
//             Ext.getCmp("dibujo").disable();
//         }
//     }));     

     tbar.push("->");

     tbar.push({html: "&nbsp&nbsp"});
     
//     tbar.push(new Ext.Toolbar.Button({
//         tooltip: 'Enlace',
//         icon: 'img/chain.png',
//         handler: function(){
//     
//                var inputTextArea = new Ext.form.TextArea({
//                width: 276,
//                height: 231,
//                readOnly: true,
//                emptyText: "Haga click en 'Generar' para generar el enlace permanente, luego haga triple click sobre el contenido y copie y pegue en una nueva ventana."
//            });             
//             
//             var window = new Ext.Window({
//                 title: "Enlace permanente",
//                 iconCls: 'enlaceIcon',
//                 layout: "anchor",
//                 width: 300,
//                 height:300,
//                 resizable: false,
//                 items: [                     
//                     new Ext.Panel({
//                         bodyStyle: 'padding:5px',
//                         border: false,
//                         autoScroll: true,
//                         width: "100%",
//                         heigth: "100%",
//                         items:[inputTextArea]
//                     })
//                 ],
//                 bbar:[
//                    "->", 
//                    new Ext.Toolbar.Button({
//                        tooltip: 'Generar enlace permanente',
//                        text: "Generar",
//                        icon: 'img/chain.png',
//                        handler: function(){                            
//                            
//                            inputTextArea.setValue(permalinkProvider.getLink());
//                            
//                        }
//                    })                  
//                 ]
//             });
//             window.show(); 
//                   
//         }
//     }));

     tbar.push(new Ext.Toolbar.Button({
         id: "configuracion",
//         text: "Configuración",
         tooltip: 'Configuración',
         icon: 'img/gear.png',
         handler: function(){
             var window = new Ext.Window({
                 title: "Configuración",
                 iconCls: 'configuracionIcon',
                 layout: "fit",
                 resizable: false,
                 items:[
                     
                    new Ext.Panel({
                        border: false,
                        autoScroll: true,
                        width: "100%",
                        heigth: "100%",
                        items: new Ext.FormPanel({
                             labelWidth: 85, // label settings here cascade unless overridden
                             frame:true,
                             border: false,
                             items: [
                                 new Ext.form.Checkbox({
                                     fieldLabel: 'Navegador',
                                     checked: navegador,
                                     listeners:{
                                        check: function(){
                                            if (this.getValue() == true){
                                                navegador = true;
                                                map.addControl(new OpenLayers.Control.PanZoomBar());
                                            }else{
                                                navegador = false;
                                                map.removeControl(map.getControlsByClass('OpenLayers.Control.PanZoomBar')[0]);
                                            }
                                        }
                                     }
                                 }),
                                 new Ext.form.Checkbox({
                                     fieldLabel: 'Escala',
                                     checked: escala,
                                     listeners:{
                                        check: function(){
                                            var scalelinediv = document.getElementById("scalelinediv");
                                            var scalecombodiv = document.getElementById("scalecombodiv");
                                            if (this.getValue() == true){
                                                escala = true;
                                                scalelinediv.style.display = "block";
                                                scalecombodiv.style.display = "block";
                                            }else{
                                                escala = false;
                                                scalelinediv.style.display = "none";
                                                scalecombodiv.style.display = "none";
                                            }
                                        }
                                     }
                                 }),
                                 new Ext.form.Checkbox({
                                     fieldLabel: 'Posición',
                                     checked: posicion,
                                     listeners:{
                                        check: function(){
                                            var posicioncontainer = document.getElementById("position");
                                            if (this.getValue() == true){
                                                posicion = true;
                                                posicioncontainer.style.display = "block";
                                            }else{
                                                posicion = false;
                                                posicioncontainer.style.display = "none";
                                            }
                                        }
                                     }
                                 }),
                                 new Ext.form.Checkbox({
                                     fieldLabel: 'Minimapa',
                                     checked: minimapa,
                                     listeners:{
                                        check: function(){
                                            var minimapcontainer = document.getElementById("minimapcontainer");
                                            if (this.getValue() == true){
                                                minimapa = true;
                                                minimapcontainer.style.display = "block";
                                            }else{
                                                minimapa = false;
                                                minimapcontainer.style.display = "none";
                                            }
                                        }
                                     }
                                 }),
                                 new Ext.form.Checkbox({
                                     fieldLabel: 'Norte',
                                     checked: norte,
                                     listeners:{
                                        check: function(){
                                            var rosa = document.getElementById("rosa");;
                                            if (this.getValue() == true){
                                                norte = true;
                                                rosa.style.display = "block";
                                            }else{
                                                norte = false;
                                                rosa.style.display = "none";
                                            }
                                        }
                                     }
                                 }),
                                 new Ext.form.Checkbox({
                                     fieldLabel: 'Grilla',
                                     checked: grilla,
                                     listeners:{
                                        check: function(){
                                            if (this.getValue() == true){
                                                grilla = true;
                                                map.addControl(new OpenLayers.Control.Graticule({visible:true, layerName: 'Grilla', displayInLayerSwitcher:false, labelSymbolizer: new OpenLayers.Symbolizer.Text({fontSize:9})}));
                                            }else{
                                                grilla = false;
                                                map.removeLayer(map.getLayersByName("Grilla")[0]);
                                                map.removeControl(map.getControlsByClass('OpenLayers.Control.Graticule')[0]);
                                            }
                                        }
                                     }
                                 })                                                           
                             ]
                         })
                    })                     
                     
                     
                     
                 ]

             });
             window.show();
             window.on('close',function(){
                 Ext.getCmp("configuracion").enable();
             });
             Ext.getCmp("configuracion").disable();
         }
     }));

     tbar.push(new Ext.Toolbar.Button({
         tooltip: 'Imprimir',
//         text: "Imprimir",
         icon: 'img/printer.png',
         handler: function(){

            var divmap = document.getElementById("mapPanel");
            var mapp = Ext.getCmp("mapPanel");
            var height = mapp.lastSize.height;
            var width = mapp.lastSize.width;

            var mywindow = window.open('', '_blank', 'location=no, scrollbars=no, menubar=no, status=no, titlebar=no, center=1, height='+ height + ',width=' + width);       
            mywindow.document.write('<html><head><title>Imprimir mapa</title>');
            mywindow.document.write('<link rel="stylesheet" type="text/css" href="css/style.css">');
            mywindow.document.write('<link rel="stylesheet" type="text/css" href="js/libs/OpenLayers-2.12/theme/default/style.css">');
            mywindow.document.write('<style type="text/css">body {width: 1280px;height: 100px;}</style>');
            mywindow.document.write('<script type="text/javascript" src="js/libs/OpenLayers-2.12/OpenLayers.js"></script>');
            mywindow.document.write('<script>function load(){window.print();window.close()}</script>');
            mywindow.document.write('</head><body onload="load()" style="margin: 0;padding: 0;">');
            mywindow.document.write(divmap.innerHTML);
            mywindow.document.write('</body></html>');
            mywindow.document.close();
            mywindow.focus();            

         }
     })); 

     tbar.push(new Ext.Toolbar.Button({
         tooltip: 'Ayuda',
//         text: "Ayuda",
         icon: 'img/question.png',
         handler: function(){
             var window = new Ext.Window({
                 title: "Ayuda",
                 iconCls: 'ayudaIcon',
                 layout: "fit",
                 width: 300,
                 height:300,
                 resizable: false,
                 items: [
                     new Ext.Panel({
                         bodyStyle: 'padding:5px',
                         border: false,
                         width: "100%",
                         heigth: "100%",
                         html: "En desarrollo..."
                     })
                 ]
             });
             window.show();
         }
     }));

     tbar.push(new Ext.Toolbar.Button({
         tooltip: 'Acerca de',
//         text:"Acerca de",
         icon: 'img/star.png',
         handler: function(){
             var window = new Ext.Window({
                 title: "Acerca de",
                 iconCls: 'acercaDeIcon',
                 layout: "fit",
                 width: 300,
                 height:300,
                 resizable: false,
                 items: [
                     new Ext.Panel({
                         bodyStyle: 'padding:5px',
                         border: false,
                         width: "100%",
                         heigth: "100%",
                         html: "En desarrollo..."
                     })
                 ]
             });
             window.show();
         }
     }));   
     
       
     
     return tbar;
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
        width: 350,
        valueField: 'url',
        displayField: 'nombre', 
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
        iconCls: 'layersIcon',
        layout: "fit",
        width: 500,
        height:300,
        resizable: false,
        autoScroll: true,
        tbar: [            
            {html: "&nbspServidores WMS&nbsp&nbsp"},
            capabilitiesCombo,
            "->",            
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
             })                        
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
                        icon: "img/map_add.png",
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
                        icon: "img/zoom.png",                        
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
                                        var item = this.find('title', titulo);
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
                        icon: "img/menos.png",
                        handler: function(){
                            e.remove();
                            map.removeLayer(map.getLayersByName(e.attributes.layer)[0]);   
                        }
                    },{
                        text: 'Subir capa',
                        icon: "img/arrow-up.png",
                        handler: function(){
                            map.raiseLayer(map.getLayersByName(e.attributes.layer)[0],1);   
                        }
                    },{
                        text: 'Bajar capa',
                        icon: "img/arrow-down.png",
                        handler: function(){
                            map.raiseLayer(map.getLayersByName(e.attributes.layer)[0],-1);   
                        }
                    },{
                        text: 'Propiedades',
                        icon: "img/gear.png",
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
                        text: 'WFS',
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

                                        featureGridpanel.reconfigure(
                                            new GeoExt.data.FeatureStore({
                                                fields: fields,
                                                layer: wfsLayer
                                            }),
                                            new Ext.grid.ColumnModel({
                                                columns: columns
                                            })
                                        );   

                                        featureGridpanel.setHeight(146);
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