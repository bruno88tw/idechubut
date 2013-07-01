/*
 * IDE Chubut
 * 
 * Escrito por Bruno J. Vecchietti
 * 
 * global.js
 * 
 * Contiene variables y definiciones globales
 * 
 */

var map, permalinkProvider, vectors, removeFeature, tbar = [], bbar = [], drag, disableAgregar;
var savetree = [];
var featureGridpanel;
var isGetFeatureActive = false;
var mapPanel, layerTreePanel, legendPanel;
var leyenda = true, titulo = false, subtitulo = false, buscador = true, navegador = false, escala = true, resolucion = true, minimapa = true, norte = true, posicion = true, grilla = false; 
var max_bounds = new OpenLayers.Bounds(-76, -49, -60, -38); // (west, south, east, north)
var projection4326 = new OpenLayers.Projection("EPSG:4326");
var projectionMercator = new OpenLayers.Projection("EPSG:900913"); 
var resolutions = OpenLayers.Layer.Bing.prototype.serverResolutions.slice(6, 19);
var resolutions2 = OpenLayers.Layer.Bing.prototype.serverResolutions.slice(6, 12);

//WFS
var wfsLayer = null;
var wfsReconocerControl = null;
var wfsSelectControl = null;

var wfsStore = new GeoExt.data.FeatureStore({
    fields: [],
    layer: wfsLayer
});
var wfsStoreExport = new GeoExt.data.FeatureStore({
    fields: [],
    layer: wfsLayer
});

//WMS
var wmsServerStore = new Ext.data.ArrayStore({
    fields: ['nombre', 'url'],
    data: [
        ["Dirección General de Estadística y Censos","http://172.158.1.0/geoserver/wms"],
        ["Instituto Geográfico Nacional 1","http://sdi.ign.gob.ar/geoserver2/wms"],
        ["Instituto Geográfico Nacional 2","http://wms.ign.gob.ar/geoserver/ows"],    
        ["Secretaría de Ciencia Tecnología e Innovación","http://200.63.163.47/geoserver/wms"],
        ["Ministerio de Educación","http://www.chubut.edu.ar:8080/geoserver/wms"],
        ["Secretaría de Energía","http://sig.se.gob.ar/cgi-bin/mapserv6?MAP=/var/www/html/visor/geofiles/map/mapase.map"]
    ],
    idIndex: 0 // id for eache record will be the first element (in this case, 'nombre')
});

var tree = [    
    {"type":"folder","name":"DGEyC","children":[               
//            {"type":"leaf", "title":"Comarcas", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "rural:comarcas", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Departamentos", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "rural:Departamentos", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Fracciones", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "rural:v_fracciones", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Radios", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "rural:v_radios", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Localidades", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "rural:v_localidades", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//            {"type":"leaf", "title":"Ejidos", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "urbano:ejidos_catastro_completos", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"folder", "name":"Urbano", "children":[
                    {"type":"leaf", "title":"Calles", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "urbano:calles", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false, displayInLayerSwitcher: false}},
                    {"type":"leaf", "title":"Manzanas", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "urbano:manzanas", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//                    {"type":"leaf", "title":"Barrios", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "urbano:barrios", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
            ]},
            {"type":"folder", "name":"Rural", "children":[
                    {"type":"leaf", "title":"Censo Nac. Agropecuario 2002", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "rural:parcelas", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
                    {"type":"leaf", "title":"Censo Nac. Agropecuario 2008", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "rural:v_parcelas_cna2008", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
            ]},
            {"type":"folder", "name":"Mapas temáticos", "children":[
                    {"type":"leaf", "title":"Población total 2010", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "rural:v_departamentos3pob2010", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
                    {"type":"leaf", "title":"Índice de debilidad social", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "rural:v_debilidad_social", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
                    {"type":"leaf", "title":"Índice de delincuencia", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "rural:v_delincuencia", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
                    {"type":"leaf", "title":"Porcentaje de población extranjera", "server":"http://172.158.1.0/geoserver/wms", "params":{layers: "rural:v_poblacion_extranjera", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
            ]}            
    ]}    
];

var index = [
//    "IGN",
    "OpenStreetMap",
    "Google Streets",
    "Google Terrain",
    "Google Satellite",
    "Google Hybrid",
    "Bing Road",
    "Bing Aerial",
    "Bing Hybrid",
    "mapquest",
    "mapquestAerial",    
    "Vectores",
    "Población total 2010",
    "Índice de debilidad social",
    "Índice de delincuencia",
    "Porcentaje de población extranjera",
//    "Ejidos",
    "Censo Nac. Agropecuario 2002",
    "Censo Nac. Agropecuario 2008",
    "Radios",
    "Fracciones",
    "Departamentos",
//    "Comarcas",
    "Manzanas",
    "Calles",
//    "Barrios",
    "Localidades"
];

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

var bingApiKey = 'An-hnXUInDJCCN2NgVvNDgZh5h7Otc4CxXZi9TEgJcqjuAu3W9MSzXoAqkxhB1C5';

var resoluciones = [
    0.59716428349367,
    1.19432856698734,
    2.38865713397468,
    4.77731426794937,
    9.55462853563415,
    19.1092570712683,
    38.2185141425366,
    76.4370282850732,
    152.874056570411,
    305.748113140558,
    611.49622628138,
    1222.99245256249,
    2445.98490512499,
    4891.96981024998
];

var locationLayer = new OpenLayers.Layer.Vector("Location", {
    styleMap: new OpenLayers.Style({
        externalGraphic: "http://openlayers.org/api/img/marker.png",
        graphicYOffset: -25,
        graphicHeight: 25,
        graphicTitle: "${name}"
    }),
    displayInLayerSwitcher: false
});