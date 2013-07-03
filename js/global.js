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

app.max_bounds = new OpenLayers.Bounds(-76, -49, -60, -38); // (west, south, east, north)
app.projection4326 = new OpenLayers.Projection("EPSG:4326");
app.projection900913 = new OpenLayers.Projection("EPSG:900913");
app.resolutions = OpenLayers.Layer.Bing.prototype.serverResolutions.slice(6, 19);
app.resolutions2 = OpenLayers.Layer.Bing.prototype.serverResolutions.slice(6, 12);
app.wfsReconocerControl = null;
app.wfsSelectControl = null;
/*
* Raíz del árbol de capas
*/
app.rootnode = new Ext.tree.TreeNode({
   text: "Capas",
   icon: "img/layers.png",
   leaf:false,
   expanded: true          
}); 
app.wfsStoreExport = new GeoExt.data.FeatureStore({
    fields: [],
    layer: Ext.getCmp("wfsLayer")
});
app.wmsServerStore = new Ext.data.ArrayStore({
    fields: ['nombre', 'url'],
    data: [
        ["Dirección General de Estadística y Censos","http://eycchubut.sytes.net/geoserver/wms"],
        ["Instituto Geográfico Nacional 1","http://sdi.ign.gob.ar/geoserver2/wms"],
        ["Instituto Geográfico Nacional 2","http://wms.ign.gob.ar/geoserver/ows"],    
        ["Secretaría de Ciencia Tecnología e Innovación","http://200.63.163.47/geoserver/wms"],
        ["Ministerio de Educación","http://www.chubut.edu.ar:8080/geoserver/wms"],
        ["Secretaría de Energía","http://sig.se.gob.ar/cgi-bin/mapserv6?MAP=/var/www/html/visor/geofiles/map/mapase.map"]
    ],
    idIndex: 0 // id for eache record will be the first element (in this case, 'nombre')
});
//this are the options applied to WMSGetFeatureInfo control            
app.featureInfoOptions = {
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
                height: (Ext.getCmp("mapPanel").getHeight()) / 2,
                x: Ext.getCmp("mapPanel").getPosition()[0],
                y: Ext.getCmp("mapPanel").getPosition()[1] + ((Ext.getCmp("mapPanel").getHeight()) / 2),
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
app.tree = [    
    {"type":"folder","name":"DGEyC","children":[               
            {"type":"leaf", "title":"Departamentos", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:Departamentos", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Fracciones", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_fracciones", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Radios", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_radios", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Localidades", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_localidades", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"folder", "name":"Urbano", "children":[
                    {"type":"leaf", "title":"Calles", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "urbano:calles", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false, displayInLayerSwitcher: false}},
                    {"type":"leaf", "title":"Manzanas", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "urbano:manzanas", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            ]},
            {"type":"folder", "name":"Rural", "children":[
                    {"type":"leaf", "title":"Censo Nac. Agropecuario 2002", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:parcelas", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
                    {"type":"leaf", "title":"Censo Nac. Agropecuario 2008", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_parcelas_cna2008", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
            ]},
            {"type":"folder", "name":"Mapas temáticos", "children":[
                    {"type":"leaf", "title":"Población total 2010", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_departamentos3pob2010", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
                    {"type":"leaf", "title":"Índice de debilidad social", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_debilidad_social", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
                    {"type":"leaf", "title":"Índice de delincuencia", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_delincuencia", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
                    {"type":"leaf", "title":"Porcentaje de población extranjera", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_poblacion_extranjera", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
            ]}            
    ]}    
];
app.index = [
    "OpenStreetMap","Google Streets","Google Terrain",
    "Google Satellite","Google Hybrid","Bing Road",
    "Bing Aerial","Bing Hybrid","mapquest",
    "mapquestAerial","Población total 2010","Índice de debilidad social",
    "Índice de delincuencia","Porcentaje de población extranjera","Censo Nac. Agropecuario 2002",
    "Censo Nac. Agropecuario 2008","Radios","Fracciones",
    "Departamentos","Manzanas","Calles","Localidades"
];        
