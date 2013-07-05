//  File        : js/global.js
//  Project     : Mapviewer
//  Author      : Bruno José Vecchietti
//  Year        : 2012  
//  Description : Se definen variables utilizadas en ámbito global.
//  
//  Copyright (C) 2012  Bruno José Vecchietti
//  
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Boundaries para la máxima extensión del mapa. (west, south, east, north).
app.max_bounds = new OpenLayers.Bounds(-76, -49, -60, -38);

// Proyección EPSG:4326.
app.projection4326 = new OpenLayers.Projection("EPSG:4326");

// Proyección EPSG:900913 (Google Mercator).
app.projection900913 = new OpenLayers.Projection("EPSG:900913");

// Resoluciones para los niveles de zoom de las capas base.
app.resolutions = OpenLayers.Layer.Bing.prototype.serverResolutions.slice(6, 19);

// Resoluciones para los niveles de zoom de la capa base MapQuest Aerial.
app.resolutions2 = OpenLayers.Layer.Bing.prototype.serverResolutions.slice(6, 12);

// Control de reconocimiento WFS.
app.wfsReconocerControl = null;

// Control de selección WFS.
app.wfsSelectControl = null;

// Nodo raíz del árbol de capas.
app.rootnode = new Ext.tree.TreeNode({
   text: "Capas",
   icon: "img/layers.png",
   leaf:false,
   expanded: true          
}); 

// Store para exportar a excel el contenido del gridPanel de atributos.
app.wfsStoreExport = new GeoExt.data.FeatureStore({
    fields: [],
    layer: Ext.getCmp("wfsLayer")
});

// Store de servidores WMS.
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

// Opciones para el control WMSGetFeatureInfo        
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

// Árbol de capas que se carga en el inicio de la aplicación. Si no se usa se debe fijar en null.
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

// Índice del orden de las capas cargada al inicio de la aplicación.
app.index = [
    "OpenStreetMap","Google Streets","Google Terrain",
    "Google Satellite","Google Hybrid","Bing Road",
    "Bing Aerial","Bing Hybrid","mapquest",
    "mapquestAerial","Población total 2010","Índice de debilidad social",
    "Índice de delincuencia","Porcentaje de población extranjera","Censo Nac. Agropecuario 2002",
    "Censo Nac. Agropecuario 2008","Radios","Fracciones",
    "Departamentos","Manzanas","Calles","Localidades"
];        
