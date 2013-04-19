/*
 * IDE Chubut
 * 
 * Escrito por Bruno J. Vecchietti
 * 
 */

var map, permalinkProvider, vectors, removeFeature, tbar = [], bbar = [], drag, disableAgregar;
var savetree;
var mapPanel, layerTreePanel, legendPanel;
var navegador = true, escala = true, minimapa = true, norte = true, posicion = true, grilla = false; 
var max_bounds = new OpenLayers.Bounds(-76, -49, -60, -38); // (west, south, east, north)
var projection4326 = new OpenLayers.Projection("EPSG:4326");
var projectionMercator = new OpenLayers.Projection("EPSG:900913"); 
//var servidoresWMS = {
//    "Local":"/geoserver/wms",
//    "OpenGeo":"http://suite.opengeo.org/geoserver/wms",
//    "IGN":"http://sdi.ign.gob.ar/geoserver2/ows?version=1.1.1",
//    "SCTeI":"http://200.63.163.47/geoserver/wms",
//    "Secretaría de Energía":"http://sig.se.gob.ar/cgi-bin/mapserv6?MAP=/var/www/html/visor/geofiles/map/mapase.map"    
//};

var servidoresWMS = [
    ["Local","/geoserver/wms"],
    ["OpenGeo","http://suite.opengeo.org/geoserver/wms"],
    ["IGN","http://sdi.ign.gob.ar/geoserver2/ows?version=1.1.1"],
    ["Secretaría de Energía","http://sig.se.gob.ar/cgi-bin/mapserv6?MAP=/var/www/html/visor/geofiles/map/mapase.map"]
];

var wmsServerStore = new Ext.data.ArrayStore({
    fields: ['nombre', 'url'],
    idIndex: 0 // id for each record will be the first element (in this case, 'nombre')
});

var tree = [    
    {"type":"folder","name":"DGEyC","children":[               
            {"type":"leaf","server":"/geoserver/wms", "name":"rural:Comarcas","title":"Comarcas"},
            {"type":"leaf","server":"/geoserver/wms", "name":"rural:Departamentos","title":"Departamentos"},
            {"type":"leaf","server":"/geoserver/wms", "name":"rural:v_fracciones","title":"Fracciones"},
            {"type":"leaf","server":"/geoserver/wms", "name":"rural:v_radios","title":"Radios"},
            {"type":"leaf","server":"/geoserver/wms", "name":"rural:v_localidades","title":"Localidades"},
            {"type":"leaf","server":"/geoserver/wms", "name":"urbano:ejidos_catastro_completos","title":"Ejidos"},
            {"type":"folder","name":"Urbano","children":[
                    {"type":"leaf","server":"/geoserver/wms", "name":"urbano:calles","title":"Calles"},
                    {"type":"leaf","server":"/geoserver/wms", "name":"urbano:manzanas","title":"Manzanas"},
                    {"type":"leaf","server":"/geoserver/wms", "name":"urbano:Barrios","title":"Barrios"}
            ]},
            {"type":"folder","name":"Rural","children":[
                    {"type":"leaf","server":"/geoserver/wms", "name":"rural:parcelas","title":"Censo Nac. Agropecuario 2002"},
                    {"type":"leaf","server":"/geoserver/wms", "name":"rural:v_parcelas_cna2008","title":"Censo Nac. Agropecuario 2008"}
            ]},
            {"type":"folder","name":"Mapas temáticos","children":[
                    {"type":"leaf","server":"/geoserver/wms", "name":"rural:v_departamentos3pob2010","title":"Población total 2010"},
                    {"type":"leaf","server":"/geoserver/wms", "name":"rural:v_debilidad_social","title":"Índice de debilidad social"},
                    {"type":"leaf","server":"/geoserver/wms", "name":"rural:v_delincuencia","title":"Índice de delincuencia"},
                    {"type":"leaf","server":"/geoserver/wms", "name":"rural:v_poblacion_extranjera","title":"Porcentaje de población extranjera"}
            ]}            
    ]}    
];

OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

function getCapabilitiesUrl(wms_url){

    var cap_url;

    if (wms_url.indexOf("?") == -1){
        cap_url = wms_url + "?service=wms&request=GetCapabilities";
    }else{
        cap_url = wms_url + "&service=wms&request=GetCapabilities";
    }    
    
    return cap_url;
    
}

Ext.onReady(function() {
    
    wmsServerStore.loadData(servidoresWMS);           
    Ext.QuickTips.init();  //initialize quick tips      
    createMap();      
    generateViewport();   
    finalConfig();
    
});

function createMap(){
    
    //this are the options applied to WMSGetFeatureInfo control
    var featureInfoOptions = {
        queryVisible: true,
        drillDown: true,
        infoFormat: "application/vnd.ogc.gml",
        maxFeatures: 20,
        eventListeners: {
            "getfeatureinfo": function(e) {
                var info = [];
                Ext.each(e.features, function(feature) {    
                    var p;                             
                    p = new Ext.grid.PropertyGrid({title: feature.gml.featureType});    
                    delete p.getStore().sortInfo; // Remove default sorting
                    p.getColumnModel().getColumnById('name').sortable = false; // set sorting of first column to false
                    p.setSource(feature.attributes); // Now load data
                    info.push(p); 
                });
                new Ext.Window({
                    title: "Información",
                    iconCls: "informacionIcon",                    
                    width: 350,
                    height: (mapPanel.getHeight()) / 2,
                    x: mapPanel.getPosition()[0],
                    y: mapPanel.getPosition()[1] + ((mapPanel.getHeight()) / 2),
                    shadow: false,
                    layout: "border",                               
                    items: new Ext.TabPanel({
                        region: 'center',
                        activeTab: 0,
                        enableTabScroll:true,
                        animScroll: true,
                        items: info
                    })
                }).show();
            }
        }
    };
    
    var controls = 
    [
        new OpenLayers.Control.NavigationHistory(),
        new OpenLayers.Control.PanZoomBar(),
        new OpenLayers.Control.Navigation(),       
        new OpenLayers.Control.KeyboardDefaults(),              
        new OpenLayers.Control.WMSGetFeatureInfo(featureInfoOptions)
    ];    

    map = new OpenLayers.Map(
        "divMapa",
        {
            controls: controls,
            restrictedExtent: max_bounds.clone().transform(projection4326, projectionMercator),  
            projection: projectionMercator,
            displayProjection: projection4326, 
            units: 'm'
        }
    );    
        
    map.addLayer(new OpenLayers.Layer.CloudMade(
        'Cloudmade', 
        {key: 'f4f58cc6030c410388fc3de3e13af3e1', styleId: '83569'},
        {useCanvas: OpenLayers.Layer.Grid.ONECANVASPERLAYER}
    ));  

//    map.addLayer(new OpenLayers.Layer("Blank", {isBaseLayer: true}));
//    
//    map.addLayer(new OpenLayers.Layer.Google("Google Geography",{type: google.maps.MapTypeId.TERRAIN}));
//    map.addLayer(new OpenLayers.Layer.Google("Google Streets",{numZoomLevels: 20}));
//    map.addLayer(new OpenLayers.Layer.Google("Google Hybrid",{type: google.maps.MapTypeId.HYBRID}));
//    map.addLayer(new OpenLayers.Layer.Google("Google Satellite",{type: google.maps.MapTypeId.SATELLITE}));       
//    map.addLayer(new OpenLayers.Layer.OSM("OpenStreetMap",null,null,{isBaseLayer: true, maxZoomLevel: 20}));
    
    // create a vector layer that will contain features
    vectors = new OpenLayers.Layer.Vector("Vectores", {displayInLayerSwitcher: false});  
            
    map.addLayer(vectors);    
    
}

function getTopBar(){           

    removeFeature = new DeleteFeature(vectors);
    map.addControl(removeFeature);

    drag = new OpenLayers.Control.DragFeature(vectors);
    map.addControl(drag);
    
    modify = new OpenLayers.Control.ModifyFeature(vectors);
    map.addControl(modify);
    
    resize = new OpenLayers.Control.ModifyFeature(vectors);
    resize.mode = OpenLayers.Control.ModifyFeature.RESIZE;
    map.addControl(resize);
    
    rotate = new OpenLayers.Control.ModifyFeature(vectors);
    rotate.mode = OpenLayers.Control.ModifyFeature.ROTATE;
    map.addControl(rotate);
    
    circle = new OpenLayers.Control.DrawFeature(vectors, OpenLayers.Handler.Point);
    map.addControl(circle);
    
    line = new OpenLayers.Control.DrawFeature(vectors, OpenLayers.Handler.Path);
    map.addControl(line);
    
    polygonFree = new OpenLayers.Control.DrawFeature(vectors, OpenLayers.Handler.Polygon);
    map.addControl(polygonFree);
    
    polygonRegular = new OpenLayers.Control.DrawFeature(vectors, OpenLayers.Handler.RegularPolygon, {handlerOptions: {sides: 5}});
    map.addControl(polygonRegular);
    
    isRegular = false;
    isSimetric = true;
    sides = 5;
    
    select = new OpenLayers.Control.SelectFeature(vectors, 
        {
         clickout: true, toggle: false,
         multiple: false, hover: false,
         toggleKey: "ctrlKey", // ctrl key removes from selection
         multipleKey: "shiftKey", // shift key adds to selection
         box: true
        }
    );
    map.addControl(select);
    
     tbar.push(new Ext.Toolbar.Button({
         tooltip: 'Abrir',
         icon: 'img/open.png',
         handler: function(){

             var rootnode = Ext.getCmp("myTreePanel").getRootNode();
             alert("root");
             
         }
     }));
     
     tbar.push(new Ext.Toolbar.Button({
         tooltip: 'Guardar',
         icon: 'img/disk.png',
         handler: function(){

             var rootnode = Ext.getCmp("myTreePanel").getRootNode();
             alert("root");
             
         }
     }));     
     
     tbar.push(new Ext.Toolbar.Button({
         tooltip: 'Agregar capa',
         icon: 'img/mas.png',
         handler: function(){
             agregarCapas(null);
         }
     }));     
     
     tbar.push(new Ext.Toolbar.Button({
         tooltip: 'Agregar carpeta',
         icon: 'img/folder-plus.png',
         handler: function(){
            var newFolder = createNode("Nueva carpeta");
            Ext.getCmp("myTreePanel").getRootNode().appendChild(newFolder);
            setFolderName(newFolder);
         }
     }));
     
     tbar.push(new Ext.Toolbar.Button({
         tooltip: 'Expandir todo',
         icon: 'img/expand.png',
         handler: function(){
            expandAll(Ext.getCmp("myTreePanel").getRootNode());
         }
     }));   
     
     tbar.push(new Ext.Toolbar.Button({
         tooltip: 'Colapsar todo',
         icon: 'img/collapse.png',
         handler: function(){
            collapseAll(Ext.getCmp("myTreePanel").getRootNode());
         }
     }));     
    
    tbar.push(new GeoExt.Action({
            control: new OpenLayers.Control.Navigation(),
            map: map,
            icon: "img/arrow-move.png",
            toggleGroup: "nav",
            tooltip: "Navegación",
            checked: true
    }));
            
    tbar.push(new GeoExt.Action({
            control: new OpenLayers.Control.ZoomToMaxExtent(),
            map: map,
            icon: "img/magnifier-zoom-fit.png",
            tooltip: 'Zoom a la máxima extensión'
    }));
    
    tbar.push(new GeoExt.Action({
            control: new OpenLayers.Control.ZoomBox(),
            map: map,
            icon: "img/magnifier-zoom-in.png",
            toggleGroup: "nav",
            tooltip: "Zoom in"
    }));

    tbar.push(new GeoExt.Action({
             control: new OpenLayers.Control.ZoomBox({out: true}),
             map: map,
             icon: "img/magnifier-zoom-out.png",
             toggleGroup: "nav",
             tooltip: "Zoom out"
    }));

    tbar.push(new GeoExt.Action({
             icon: "img/control-right.png",
             control: map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0].previous,
             disabled: true,
             tooltip: "Zoom anterior"
     }));

     tbar.push(new GeoExt.Action({
             icon: "img/control-left.png",
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
         toggleGroup: "nav",
         icon: 'img/rulerarea.png',
         tooltip: "Medidor de superficie"
     }));

     tbar.push(new GeoExt.Action({
             control: map.getControlsByClass('OpenLayers.Control.WMSGetFeatureInfo')[0],
             map: map,
             icon: "img/information-italic.png",
             toggleGroup: "nav",
             tooltip: "Obtener información"
     }));
     
     tbar.push(new Ext.Toolbar.Button({
         id: "dibujo",
         tooltip: 'Dibujo',
         icon: 'img/pencil.png',
         handler: function(){
             var window = new Ext.Window({
                 title: "Dibujo",
                 iconCls: 'dibujoIcon',
                 layout: "fit",
                 resizable: false,
                 x: mapPanel.getPosition()[0] + 5,
                 y: mapPanel.getPosition()[1] + 32,
                 shadow: false,
                 tbar: [{
                    xtype: 'buttongroup',
                    columns: 3,
                    items: [
                        new Ext.Toolbar.Button({
                             tooltip: 'Puntos',
                             icon: "img/draw_circle.png",
                             width: 35,
                             height: 35,                             
                             toggleGroup: "nav",  
                             allowDepress: true,
                             listeners: {
                                 toggle: function(){
                                     if(this.pressed){
                                         circle.activate();          
                                     }else{
                                         circle.deactivate();          
                                     }
                                 }
                             }
                         }),
                        new Ext.Toolbar.Button({
                             tooltip: 'Líneas',
                             icon: "img/draw_line.png",
                             width: 35,
                             height: 35,                             
                             toggleGroup: "nav",  
                             allowDepress: true,
                             listeners: {
                                 toggle: function(){
                                     if(this.pressed){
                                         line.activate();          
                                     }else{
                                         line.deactivate();          
                                     }
                                 }
                             }
                         }),
                         
                        new Ext.SplitButton({
                             tooltip: 'Polígonos',
                             icon: "img/draw_poly.png",
                             iconCls: 'blist',
                             width: 35,
                             height: 35,                             
                             toggleGroup: "nav",  
                             allowDepress: true,
                             listeners: {
                                 toggle: function(){
                                     if(this.pressed){
                                         if(!isRegular){
                                             polygonRegular.deactivate();
                                             polygonFree.activate();
                                         }else{
                                             polygonFree.deactivate();
                                             polygonRegular.activate();
                                         }         
                                     }else{
                                         polygonFree.deactivate();          
                                         polygonRegular.deactivate();
                                     }
                                 }
                             },
                             menu: new Ext.menu.Menu({
                                style: {
                                    overflow: 'visible'     // For the Combo popup
                                },items:[
                                    
                                    {
                                        id: "polyIsFree",
                                        text: 'Libre',
                                        checked: true,
                                        group: 'poly',
                                        listeners: {
                                            checkchange: function(item, state){
                                              if(state){
                                                isRegular = false;  
                                                Ext.getCmp("polySidesField").disable();
                                                Ext.getCmp("polySimCheck").disable();
                                                polygonRegular.deactivate();
                                                polygonFree.activate();
                                              }
                                            }                                            
                                        }

                                    }, {
                                        id: "polyIsRegular",
                                        text: 'Regular',
                                        checked: false,
                                        group: 'poly',
                                        listeners: {
                                            checkchange: function(item, state){
                                              if(state){
                                                isRegular = true;
                                                Ext.getCmp("polySidesField").enable();
                                                Ext.getCmp("polySimCheck").enable();
                                                polygonFree.deactivate();
                                                polygonRegular.activate();
                                              }
                                            }                                            
                                        }
                                    },
                                    new Ext.form.NumberField({
                                        id: "polySidesField",
                                        disabled: true,
                                        emptyText: 'Lados',
                                        width: 50,
                                        iconCls: 'no-icon',
                                        maxLength: 3,
                                        autoCreate: {tag: 'input', type: 'text', size: '20', autocomplete:'off', maxlength: '3'}, //needed torestrict max length
                                        enableKeyEvents: true,
                                        listeners: {
                                            keyup: function(item, e){
                                                polygonRegular.deactivate();  
                                                sides = parseInt(Ext.getCmp("polySidesField").getValue());
                                                if(isNaN(sides)){
                                                    polygonRegular.handler.sides = 3;
                                                }else{
                                                    if(sides < 4){
                                                        polygonRegular.handler.sides = 3;
                                                    }else{
                                                        polygonRegular.handler.sides = sides;
                                                    }
                                                }
                                                polygonRegular.activate();
                                            }
                                        }
                                    }),
                                    {
                                        id: "polySimCheck",
                                        disabled: true,
                                        text: 'Simétrico',
                                        checked: true,
                                        listeners: {
                                            checkchange: function(item, state){
                                              polygonRegular.deactivate(); 
                                              isSimetric = state;
                                              if(isSimetric){
                                                  polygonRegular.handler.irregular = false;
                                              }else{
                                                  polygonRegular.handler.irregular = true;
                                              }
                                              polygonRegular.activate();
                                            }                                            
                                        }
                                    }
                                ]
                                
                            })
                         }),                         
         
                         new GeoExt.Action({
                             tooltip: 'Select',
                             icon: "img/cursor.png",
                             width: 35,
                             height: 35,                             
                             control: new OpenLayers.Control.SelectFeature(
                                 vectors,
                                 {
                                 clickout: true, toggle: false,
                                 multiple: false, hover: false,
                                 toggleKey: "ctrlKey", // ctrl key removes from selection
                                 multipleKey: "shiftKey", // shift key adds to selection
                                 box: true
                                 }
                             ),
                             map: map,
                             toggleGroup: "nav", 
                             allowDepress: true          
                         }),
                         new Ext.Toolbar.Button({
                             tooltip: 'Mover',
                             icon: "img/hand.png",
                             width: 35,
                             height: 35,                             
                             toggleGroup: "nav",  
                             allowDepress: true,
                             control: drag,
                             listeners: {
                                 toggle: function(){
                                     if(this.pressed){
                                         drag.activate();          
                                     }else{
                                         drag.deactivate();          
                                     }
                                 }
                             }
                         }),    
                         new Ext.Toolbar.Button({
                             tooltip: 'Borrar features',
                             icon: "img/eraser.png",
                             width: 35,
                             height: 35,                             
                             toggleGroup: "nav",  
                             allowDepress: true,
                             control: removeFeature,
                             listeners: {
                                 toggle: function(){
                                     if(this.pressed){
                                         removeFeature.activate();          
                                     }else{
                                         removeFeature.deactivate();          
                                     }
                                 }
                             }
                         }),
                         new Ext.Toolbar.Button({
                             tooltip: 'Borrar todo features',
                             icon: "img/trash.png",
                             width: 35,
                             height: 35,  
                             handler: function(){
                                 vectors.destroyFeatures();
                             }
                         }),new Ext.Toolbar.Button({
                             tooltip: 'Cambiar tamaño',
                             icon: "img/resize.png",
                             iconCls: 'blist',
                             toggleGroup: "nav",  
                             allowDepress: true,
                             width: 35,
                             height: 35,  
                             listeners: {
                                 toggle: function(){
                                     if(this.pressed){                                     
                                        resize.activate(); 
                                     }else{
                                        resize.deactivate(); 
                                     }
                                 }
                             }
                         }),new Ext.Toolbar.Button({
                             tooltip: 'Rotar',
                             icon: "img/rotate.png",
                             toggleGroup: "nav",  
                             allowDepress: true,
                             width: 35,
                             height: 35,  
                             listeners: {
                                 toggle: function(){
                                     if(this.pressed){                                        
                                        rotate.activate(); 
                                     }else{
                                        rotate.deactivate(); 
                                     }
                                 }
                             }
                         }),new Ext.Toolbar.Button({
                             tooltip: 'Deshacer',
                             icon: "img/undo.png",
                             width: 35,
                             height: 35,  
                             handler: function(){

                             }
                         }),new Ext.Toolbar.Button({
                             tooltip: 'Rehacer',
                             icon: "img/redo.png",
                             width: 35,
                             height: 35,  
                             handler: function(){

                             }
                         }),new Ext.Toolbar.Button({
                             tooltip: 'Modificar',
                             icon: "img/pencil.png",
                             width: 35,
                             height: 35,                             
                             toggleGroup: "nav",  
                             allowDepress: true,
                             control: modify,
                             listeners: {
                                 toggle: function(){
                                     if(this.pressed){
                                         modify.activate();          
                                     }else{
                                         modify.deactivate();          
                                     }
                                 }
                             }
                         })      
                    ]
                 }]
             });
             window.show();
             window.on('close',function(){
                 Ext.getCmp("dibujo").enable();
             });
             Ext.getCmp("dibujo").disable();
         }
     }));     

     tbar.push("->");

     tbar.push({html: "&nbsp&nbsp"});
     
     tbar.push(new Ext.Toolbar.Button({
         tooltip: 'Enlace',
         icon: 'img/chain.png',
         handler: function(){
             var window = new Ext.Window({
                 title: "Enlace permanente",
                 iconCls: 'enlaceIcon',
                 layout: "fit",
                 width: 300,
                 height:300,
                 resizable: false,
                 items: [
                     new Ext.Panel({
                         bodyStyle: 'padding:5px',
                         border: false,
                         autoScroll: true,
                         width: "100%",
                         heigth: "100%",
                         html: permalinkProvider.getLink()
                     })
                 ]
             });
             window.show();
         }
     }));

     tbar.push(new Ext.Toolbar.Button({
         id: "configuracion",
         tooltip: 'Configuración',
         icon: 'img/gear.png',
         handler: function(){
             var window = new Ext.Window({
                 title: "Configuración",
                 iconCls: 'configuracionIcon',
                 layout: "fit",
                 resizable: false,
                 tbar: [{
                    xtype: 'buttongroup',
                    columns: 2,
                    defaults: {
                        scale: 'medium'
                    },
                    items: [
                        {
                            xtype:'button',
                            icon: 'img/pan.png',
                            text: 'Navegador',
                            width: 80,
                            height: 50,
                            iconAlign: 'top',
                            scale: 'small',
                            handler: function(){
                                if (!navegador){
                                    navegador = true;
                                    map.addControl(new OpenLayers.Control.PanZoomBar());
                                }else{
                                    navegador = false;
                                    map.removeControl(map.getControlsByClass('OpenLayers.Control.PanZoomBar')[0]);
                                }
                            }
                        },{
                            xtype:'button',
                            icon: 'img/scale.png',
                            text: 'Escala',
                            width: 80,
                            height: 50,
                            iconAlign: 'top',
                            scale: 'small',
                            handler: function(){
                                var scalelinediv = document.getElementById("scalelinediv");
                                var scalecombodiv = document.getElementById("scalecombodiv");
                                if (!escala){
                                    escala = true;
                                    scalelinediv.style.display = "block";
                                    scalecombodiv.style.display = "block";
                                }else{
                                    escala = false;
                                    scalelinediv.style.display = "none";
                                    scalecombodiv.style.display = "none";
                                }
                            }
                        },{
                            xtype:'button',
                            icon: 'img/scale.png',
                            text: 'Posición',
                            width: 80,
                            height: 50,
                            iconAlign: 'top',
                            scale: 'small',
                            handler: function(){
                                var posicioncontainer = document.getElementById("position");
                                if (!posicion){
                                    posicion = true;
                                    posicioncontainer.style.display = "block";
                                }else{
                                    posicion = false;
                                    posicioncontainer.style.display = "none";
                                }
                            }
                        },{
                            xtype:'button',
                            icon: 'img/map.png',
                            text: 'Minimapa',
                            width: 80,
                            height: 50,
                            iconAlign: 'top',
                            scale: 'small',
                            handler: function(){
                                var minimapcontainer = document.getElementById("minimapcontainer");
                                if (!minimapa){
                                    minimapa = true;
                                    minimapcontainer.style.display = "block";
                                }else{
                                    minimapa = false;
                                    minimapcontainer.style.display = "none";
                                }
                            }
                        },{
                            xtype:'button',
                            icon: 'img/north.png',
                            text: 'Norte',
                            width: 80,
                            height: 50,
                            iconAlign: 'top',
                            scale: 'small',
                            handler: function(){
                                var rosa;
                                if (!norte){
                                    norte = true;
                                    rosa = document.getElementById("rosa");
                                    rosa.style.display = "block";
                                }else{
                                    norte = false;
                                    rosa = document.getElementById("rosa");
                                    rosa.style.display = "none";
                                }
                            }
                        },{
                            xtype:'button',
                            icon: 'img/grid.png',
                            text: 'Grilla',
                            width: 80,
                            height: 50,
                            iconAlign: 'top',
                            scale: 'small',
                            handler: function(){
                                if (!grilla){
                                    grilla = true;
                                    map.addControl(new OpenLayers.Control.Graticule({visible:true, layerName: 'Grilla', displayInLayerSwitcher:false}));    
                                }else{
                                    grilla = false;
                                    map.removeLayer(map.getLayersByName("Grilla")[0]);
                                    map.removeControl(map.getControlsByClass('OpenLayers.Control.Graticule')[0]);
                                }
                            }
                        }]
                 }]
             });
             window.show();
             window.on('close',function(){
                 Ext.getCmp("configuracion").enable();
             });
             Ext.getCmp("configuracion").disable();
         }
     }));

     tbar.push(new Ext.Toolbar.Button({
         tooltip: 'Ayuda',
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
                         html: "Información de ayuda para el uso del sistema "
                     })
                 ]
             });
             window.show();
         }
     }));

     tbar.push(new Ext.Toolbar.Button({
         tooltip: 'Acerca de',
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
                         html: "Información acerca del proyecto"
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

   capabilitiesGrid = new Ext.grid.GridPanel({
        border: false,
        viewConfig: {
          forceFit: true
        },
        store: capStore,
        columns: [
        {
          header: "Nombre",
          dataIndex: "name",
          sortable: true},
        {
          header: "Título",
          dataIndex: "title",
          sortable: true},
        {
          header: "Resumen",
          dataIndex: "abstract"}
        ]
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
        iconCls: 'agregarIcon',
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

                    new Ext.Window({
                        title: "Servidores WMS",
                        iconCls: 'serverIcon',
                        layout: "fit",
                        width: 500,
                        height:300,
                        resizable: false,
                        autoScroll: true,  
                        bbar: [
                            "->",
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
                            
                            var newLeaf = createLeaf(nombrecapa, servidorWMS, record.data.name);
                            if (node == null){
                                Ext.getCmp("myTreePanel").getRootNode().appendChild(newLeaf);  
                            }else{
                                Ext.getCmp("myTreePanel").getRootNode().findChild("id",node.attributes.id,true).appendChild(newLeaf);  
                            }                               
                            
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
                        icon: "img/mas.png",
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
                        icon: "img/folder-pencil.png",
                        handler: function(){
                            setFolderName(e);
                        }
                    },{
                        text: 'Nueva carpeta',
                        icon: "img/folder-plus.png",
                        handler: function(){
                            var newFolder = createNode("Nueva carpeta");
                            Ext.getCmp("myTreePanel").getRootNode().findChild("id",e.attributes.id,true).appendChild(newFolder);
                            setFolderName(newFolder);
                        }
                    },{
                        text: 'Eliminar carpeta',
                        icon: "img/folder-minus.png",
                        handler: function(){
                            removeLayers(e);
                            e.remove();
                        }
                    },{
                        text: 'Expandir todo',
                        icon: "img/expand.png",
                        handler: function(){
                            expandAll(e);
                        }
                    },{
                        text: 'Colapsar todo',
                        icon: "img/collapse.png",
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

function createLeaf(titulo, servidor, capa){    
    
    map.addLayer(new OpenLayers.Layer.WMS(
        titulo, 
        servidor, 
        {layers: capa, transparent: 'true', format: 'image/png'}, 
        {isBaseLayer: false, visibility: false, singleTile: false}
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
                                        var item = this.find('name', capa);
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
                    }]
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
            newNode = createLeaf(children[x].title,children[x].server,children[x].name);
            father.appendChild(newNode);
        }          
    }
    
}

function generateViewport(){
    
    var rootnode = new Ext.tree.TreeNode({
        text: "Capas",
        icon: "img/layers.png",
        leaf:false,
        expanded: true          
    });
    
    mapPanel = new GeoExt.MapPanel({
        map: map,   
        extent: max_bounds.clone().transform(projection4326, projectionMercator),
        region: "center",
        html:'<div id="scalelinediv" class="scalebox"></div>\n\
              <div id="scalecombodiv" class="scalecombobox" align:"center" style="padding-top: 3px"></div>\n\
              <div id="position" class="latlong" align:"center"></div>\n\
              <div id="minimapcontainer" class="minimap" align:"center"><div id="minimap"></div></div>\n\
              <div class="mapBackground"></div>\n\
              <div id="rosa" class="rosa"><img src="img/windRose.png" alt="banner" align="rigth" style="height:75px; width:75px"></div>',
        stateId: "map",
        border:false,
        prettyStateKeys: true // for pretty permalinks
    });
    
//    rootnode.appendChild(new GeoExt.tree.BaseLayerContainer({
//        text: "Capas Base",
//        map: map,
//        expanded: false               
//    }));
    
    agregarDescendencia(rootnode,tree);
    
    layerTreePanel = new Ext.tree.TreePanel({
        flex:1,
        autoScroll: true,
        title: 'Capas',
        id: "myTreePanel",
        root: rootnode,
        rootVisible: false,
        border: false,
        enableDD: true,
        useArrows: true                                    
    });
    
    legendPanel = new GeoExt.LegendPanel({
        title: 'Leyenda',
        flex:1,
        autoScroll: true,
        width: 250,
        collapsible: false,
        collapsed: false,
        border: false,
        defaults: {
            style: 'padding:5px',
            baseParams: {
                FORMAT: 'image/png',
                LEGEND_OPTIONS: 'forceLabels:on'
            }
        }
    });
    
    //defino el viewport 
    new Ext.Viewport({
            layout: "border",  
            border:false,
            items:[
                {
                    region: 'north',
                    height: 40,
                    bodyStyle:'background-color:black',
                    border:false,
                    html: '<img src="img/banner.jpg" alt="banner" style="height: 100%">'
                },
                {
                    layout: 'border',
                    region: 'center',
                    border:false,
                    items:[
                        {
                            region: 'north',
                            collapseMode: 'mini',
                            split: true,
                            height: 25,
                            border:false,
                            tbar: getTopBar()
                        },
                        {
                            region: 'west',
                            collapseMode: 'mini',
                            split: true,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            width: 250,
                            items:[layerTreePanel, legendPanel]
                        },
                        {
                            region: 'center',
                            border:false,
                            layout: 'border',
                            items: [mapPanel]
                        }
                    ]
                }
            ]
    });    
    
}

function finalConfig(){

    permalinkProvider = new GeoExt.state.PermalinkProvider({encodeType: false}); // create permalink provider    
    Ext.state.Manager.setProvider(permalinkProvider); // set it in the state manager                   
    
    map.addControl(new OpenLayers.Control.MousePosition({
        div: document.getElementById('position'),
        prefix: '<b>lon:</b> ',
        separator: '&nbsp; <b>lat:</b> ' 
    })); 
    
    new Ext.form.ComboBox({
        store: new GeoExt.data.ScaleStore({ map: map }),
        emptyText: "Escala",
        tpl: '<tpl for="."><div class="x-combo-list-item">1 : {[parseInt(values.scale)]}</div></tpl>',
        editable: false,
        displayField: "scale",
        triggerAction: 'all', // needed so that the combo box doesn't filter by its current content
        mode: 'local', // keep the combo box from forcing a lot of unneeded data refreshes
        renderTo: document.getElementById("scalecombodiv"),
        width: 130,
        listeners: {
            select: function(combo,record) {
                map.zoomTo(record.get("level"));
            }
        }
    });
    
    map.addControl(new OpenLayers.Control.ScaleLine({
        div: document.getElementById("scalelinediv")
    }));
    
    map.addControl(new OpenLayers.Control.OverviewMap({
        layers:[new OpenLayers.Layer.OSM("OSM",null,null,{isBaseLayer: true, maxZoomLevel: 20})],
        size: new OpenLayers.Size(180, 155),
        div: document.getElementById('minimap')            
    }));   
    
}
