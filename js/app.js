/**
 *  @file js/app.js
 *  @author Bruno José Vecchietti <bruno88tw@gmial.com>
 *  @fileOverview Archivo javascript de arranque de la aplicación. Contiene el algoritmo de ejecución principal de la aplicación.
 *  @copyright Copyright (C) 2012  Bruno José Vecchietti.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *  <p>
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  <p>
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see {@link http://www.gnu.org/licenses/}. 
 */

/**
 * Namespace de acceso a la aplicación.
 * @namespace
 */
var app = {};

/**
 * Límites para la máxima extensión del mapa. (west, south, east, north).
 * @type OpenLayers.Bounds
 */
app.max_bounds = new OpenLayers.Bounds(-76, -49, -60, -38);
//app.max_bounds = new OpenLayers.Bounds(-180, -80, 180, 80);

/**
 * Proyección EPSG:4326.
 * @type OpenLayers.Projection
 */
app.projection4326 = new OpenLayers.Projection("EPSG:4326");

/**
 * Proyección EPSG:900913 (Google Mercator).
 * @type OpenLayers.Projection
 */
app.projection900913 = new OpenLayers.Projection("EPSG:900913");

/**
 * Resoluciones para los niveles de zoom de las capas base OSM, Bing y MapQuest.
 * @type Array
 */
app.resolutionsOSM = OpenLayers.Layer.Bing.prototype.serverResolutions.slice(6, 19);

/**
 * Resoluciones para los niveles de zoom de la capa base MapQuest Aerial.
 * @type Array
 */
app.resolutionsMapQuestAerial = OpenLayers.Layer.Bing.prototype.serverResolutions.slice(6, 12);

/**
 * Control de reconocimiento WFS.
 * @type OpenLayers.Control.GetFeature
 */
app.wfsReconocerControl = null;

/**
 * Control de selección WFS.
 * @type OpenLayers.Control.SelectFeature
 */
app.wfsSelectControl = null;

/**
 * Nodo raíz del árbol de capas.
 * @type Ext.tree.TreeNode
 */
app.rootnode = new Ext.tree.TreeNode({
   text: "Capas",
   icon: "img/folder.png",
   leaf:false,
   expanded: false
}); 

/**
 * Nodo de capas base.
 * @type Ext.tree.TreeNode
 */
app.capasbasenode = new Ext.tree.TreeNode({
    text: "Capas base",
    icon: "img/folder.png",
    leaf: false,
    cls: 'categoria1',
    listeners:{
        click: function(leaf, event){
            Ext.getCmp("treePanelTopbarEliminar").disable();
            Ext.getCmp("treePanelTopbarPropiedades").disable();
            Ext.getCmp("treePanelTopbarAtributos").disable();  
            Ext.getCmp("treePanelTopbarZoomCapa").disable();  
        },
        beforecollapse: function(leaf, event){
            this.setIcon("img/folder.png");
        },
        beforeexpand: function(leaf, event){
            this.setIcon("img/folder-open.png");
        }
    }        
}); 

/**
 * Nodo de otras capas definidas por el usuario.
 * @type Ext.tree.TreeNode
 */
app.otrosnode = new Ext.tree.TreeNode({
   text: "WMS",
   icon: "img/folder.png",
   leaf:false,
   cls: 'categoria4',
   listeners:{
        click: function(leaf, event){
            Ext.getCmp("treePanelTopbarEliminar").disable();
            Ext.getCmp("treePanelTopbarPropiedades").disable();
            Ext.getCmp("treePanelTopbarAtributos").disable();  
            Ext.getCmp("treePanelTopbarZoomCapa").disable();  
        },
        beforecollapse: function(leaf, event){
            this.setIcon("img/folder.png");
        },
        beforeexpand: function(leaf, event){
            this.setIcon("img/folder-open.png");
        }
   }   
}); 

/**
 * Store para exportar a excel el contenido del gridPanel de atributos.
 * @type GeoExt.data.FeatureStore
 */
app.wfsStoreExport = new GeoExt.data.FeatureStore({
    fields: [],
    layer: Ext.getCmp("wfsLayer")
});

/**
 * Flag de fullscreen
 * @type Boolean
 */
app.fullscreen = false;

/**
 * Configuración del mapPanel
 * @type type
 */
app.configuracion = {
    "titulo":false,
    "subtitulo":false,
    "buscador":false,
    "navegador":false,
    "leyenda":false,
    "escala":true,
    "localizador":false,
    "norte":false,
    "grilla":false,
    "avanzado":false
};

/**
 * Flag del panel de atributos
 * @type Boolean
 */
app.isAttributesPanelHidden = true;

/**
 * Flag del panel de atributos
 * @type Boolean
 */
app.isLayerTreePanelHidden = false;

/**
 * Ubicación del proxy cgi.
 * @type String
 */
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

/**
 * Función de inicio de aplicación. 
 * Declara el algoritmo de ejecución principal de la aplicación.
 */
Ext.onReady(function() {
    
    app.iniciar();   
    
});

app.iniciar = function(){
    
    Ext.QuickTips.init();         
    app.crearMapa();
    app.agregarControles();
    app.agregarCapas();
    app.generarViewport();   
    app.configuracionFinal();    
    
};

/**
 * Crea el mapa de la aplicación. 
 * Inicializa app.map con una instancia de OpenLayers.Map.
 * @returns {undefined} Esta función no devuelve resultados.
 */
app.crearMapa = function(){               
   
    app.map = new OpenLayers.Map(
        "divMapa",
        {
            controls: [],
            projection: app.projection900913,
            displayProjection: app.projection4326, 
            restrictedExtent: app.max_bounds.clone().transform(app.projection4326, app.projection900913),  
            units: 'm'
        }
    );   

};

/**
 * Agrega controles básicos al mapa.
 * @returns {undefined} Esta función no devuelve resultados.
 */
app.agregarControles = function(){
    
    app.map.addControl(new OpenLayers.Control.NavigationHistory());
    app.map.addControl(new OpenLayers.Control.Navigation({mouseWheelOptions: {interval: 100}}));    
    app.map.addControl(new OpenLayers.Control.WMSGetFeatureInfo({
        queryVisible: true,
        drillDown: true,
        infoFormat: "application/vnd.ogc.gml",
        maxFeatures: 20,
        eventListeners: {"getfeatureinfo": function(e){handler.onGetFeatureInfo(e);}}
    })); 
};

/**
 * Agrega capas base y capas vectoriales al mapa. Carga las capas de superposición definidas en la configuración.
 * @returns {undefined} Esta función no devuelve resultados.
 */
app.agregarCapas = function(){
    
    // Capas Base
    //NOTA: para OSM zoomOffset debe ser igual que el zoom menor definido en app.resolutionsOSM
    app.map.addLayer(new OpenLayers.Layer.WMS(
        "IGN", 
        "http://idedgeyc.chubut.gov.ar/geoserver/wms", 
        {layers: "rural:basemap", transparent: 'false', format: 'image/jpeg', tiled: 'true'}, 
        {isBaseLayer: true, visibility: false, singleTile: false, displayInLayerSwitcher: false, zoomOffset: 1, resolutions: app.resolutionsOSM}
    ));   
    app.map.addLayer(new OpenLayers.Layer.OSM("OpenStreetMap",null,{zoomOffset: 6, resolutions: app.resolutionsOSM, isBaseLayer:true, sphericalMercator: true}));    
    app.map.addLayer(new OpenLayers.Layer.Google("Google Streets", {minZoomLevel: 6, maxZoomLevel: 19}));
    app.map.addLayer(new OpenLayers.Layer.Google("Google Terrain",{type: google.maps.MapTypeId.TERRAIN, minZoomLevel: 6, maxZoomLevel: 19}));
    app.map.addLayer(new OpenLayers.Layer.Google("Google Satellite",{type: google.maps.MapTypeId.SATELLITE, minZoomLevel: 6, maxZoomLevel: 19}));
    app.map.addLayer(new OpenLayers.Layer.Google("Google Hybrid",{type: google.maps.MapTypeId.HYBRID, minZoomLevel: 6, maxZoomLevel: 19}));    
    app.map.addLayer(new OpenLayers.Layer.Bing({name: "Bing Road", key: 'An-hnXUInDJCCN2NgVvNDgZh5h7Otc4CxXZi9TEgJcqjuAu3W9MSzXoAqkxhB1C5', type: "Road", zoomOffset: 6, resolutions: app.resolutionsOSM}));
    app.map.addLayer(new OpenLayers.Layer.Bing({name: "Bing Aerial", key: 'An-hnXUInDJCCN2NgVvNDgZh5h7Otc4CxXZi9TEgJcqjuAu3W9MSzXoAqkxhB1C5', type: "Aerial", zoomOffset: 6, resolutions: app.resolutionsOSM}));
    app.map.addLayer(new OpenLayers.Layer.Bing({name: "Bing Hybrid", key: 'An-hnXUInDJCCN2NgVvNDgZh5h7Otc4CxXZi9TEgJcqjuAu3W9MSzXoAqkxhB1C5', type: "AerialWithLabels", zoomOffset: 6, resolutions: app.resolutionsOSM}));
    app.map.addLayer(new OpenLayers.Layer.OSM("MapQuest",["http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg","http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg","http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg","http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg"],{zoomOffset: 6, resolutions: app.resolutionsOSM, isBaseLayer:true, sphericalMercator: true}));  
    app.map.addLayer(new OpenLayers.Layer.OSM("MapQuest Aerial",["http://otile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg","http://otile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg","http://otile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg","http://otile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg"],{zoomOffset: 6, resolutions: app.resolutionsMapQuestAerial, isBaseLayer:true, sphericalMercator: true}));            
    app.map.addLayer(new OpenLayers.Layer("Blank",{isBaseLayer: true}));

    // Vector layer para el localizador
    app.map.addLayer(new OpenLayers.Layer.Vector("Location", {
        styleMap: new OpenLayers.Style({
            externalGraphic: "http://openlayers.org/api/img/marker.png",
            graphicYOffset: -25,
            graphicHeight: 25,
            graphicTitle: "${name}"
        }),
        displayInLayerSwitcher: false
    }));   
            
    var symbolizer = OpenLayers.Util.applyDefaults(
        {
         fillColor: "blue", 
         fillOpacity: 0.2, 
         strokeColor: "blue"
        },
        OpenLayers.Feature.Vector.style["default"]
    );
        
    var select = {
        fillColor: "blue",
        fillOpacity: 0.5
    };
        
    var styleMap = new OpenLayers.StyleMap({
        "default": symbolizer, 
        "select": select
    }); 
    
    // Vector layer para las consultas WFS            
    app.map.addLayer(new OpenLayers.Layer.Vector("wfsLayer", {
        displayInLayerSwitcher: false,
        styleMap: styleMap
    }));

    // Importa las capas definidas en app.tree y el orden definido en app.index
    app.rootnode.appendChild(app.capasbasenode);
    app.capasbasenode.appendChild(capaBase("IGN","IGN","img/ign.png"));
    app.capasbasenode.appendChild(capaBase("OpenStreetMap","OpenStreetMap","img/osm.png"));
    app.capasbasenode.appendChild(capaBase("Google Streets","Google Streets","img/google.png"));
    app.capasbasenode.appendChild(capaBase("Google Terrain","Google Terrain","img/google.png"));
    app.capasbasenode.appendChild(capaBase("Google Satellite","Google Satellite","img/google.png"));
    app.capasbasenode.appendChild(capaBase("Google Hybrid","Google Hybrid","img/google.png"));
    app.capasbasenode.appendChild(capaBase("Bing Road","Bing Road","img/bing.png"));
    app.capasbasenode.appendChild(capaBase("Bing Aerial","Bing Aerial","img/bing.png"));
    app.capasbasenode.appendChild(capaBase("Bing Hybrid","Bing Hybrid","img/bing.png"));
    app.capasbasenode.appendChild(capaBase("MapQuest","MapQuest","img/mapQuest.png"));
    app.capasbasenode.appendChild(capaBase("MapQuest Aerial","MapQuest Aerial","img/mapQuest.png"));
    app.capasbasenode.appendChild(capaBase("Sin capa base","Blank","img/prohibition.png")); 
        
};

/**
 * Genera el vieport y le incorpora todos los paneles necesarios.
 * @returns {undefined} Esta función no devuelve resultados.
 */
app.generarViewport = function(){            
    
    new Ext.Viewport({
            layout: "border",  
            border:false,
            id: "appViewport",
            items: panel.viewportPanel()
    });      
    
};

/**
 * Configuración final de la aplicación. 
 * Agrega elementos al mapPanel y establece el centro y zoom del mapa.
 * @returns {undefined} Esta función no devuelve resultados.
 */
app.configuracionFinal = function(){ 

    var scalelinediv = document.getElementById('scalelinediv');
    document.getElementById('mapPanel').firstChild.firstChild.firstChild.appendChild(scalelinediv);
    var minimapcontainer = document.getElementById('minimapcontainer');
    document.getElementById('mapPanel').firstChild.firstChild.firstChild.appendChild(minimapcontainer);
    var rosa = document.getElementById('rosa');
    document.getElementById('mapPanel').firstChild.firstChild.firstChild.appendChild(rosa);
    var fullscreen = document.getElementById('fullscreen');
    document.getElementById('mapPanel').firstChild.firstChild.firstChild.appendChild(fullscreen);
    var titulodiv = document.getElementById('titulodiv');
    document.getElementById('mapPanel').firstChild.firstChild.firstChild.appendChild(titulodiv);
    var subtitulodiv = document.getElementById('subtitulodiv');
    document.getElementById('mapPanel').firstChild.firstChild.firstChild.appendChild(subtitulodiv);
    var legenddiv = document.getElementById('legenddiv');
    document.getElementById('mapPanel').firstChild.firstChild.firstChild.appendChild(legenddiv);
    var statusbar = document.getElementById('statusbar');
    document.getElementById('mapPanel').firstChild.firstChild.firstChild.appendChild(statusbar);

    // Agrego el control de posición del mouse 
    app.map.addControl(new OpenLayers.Control.MousePosition({
        div: document.getElementById('position'),
        formatOutput: function(lonLat) {
            var markup = convertDMS(lonLat.lat, "LAT");
            markup += " " + convertDMS(lonLat.lon, "LON");
            return markup;
        }
    }));     
    
    // Agrega el control de escala
    app.map.addControl(new OpenLayers.Control.ScaleLine({
        div: document.getElementById("scalelinediv")
    }));
    
    // Agrega el control de minimapa
    app.map.addControl(new OpenLayers.Control.OverviewMap({
        layers:[new OpenLayers.Layer.OSM("OSM",null,null,{isBaseLayer: true, maxZoomLevel: 20})],
        size: new OpenLayers.Size(150, 130),
        div: document.getElementById('minimap')            
    }));        

    // Agrega el panel de leyenda que se visualiza dentro del mapa
    new GeoExt.LegendPanel({
        autoScroll: true,
        border: false,
        renderTo: document.getElementById("legenddiv"),
        style: 'background:#ffffff;',
        defaults: {
            style: 'padding:5px',
            baseParams: {
                FORMAT: 'image/png',
                LEGEND_OPTIONS: 'forceLabels:on'
            }
        }
    });  
    
    //Agrega el botón de fullscreen
    new Ext.Button({
        cls: "fullscreenButton",
        height: "29px",
        width: "29px",
        renderTo: document.getElementById("fullscreen"),
        handler: function(){
            if(app.fullscreen){
                app.fullscreen = false;
                if(!app.isLayerTreePanelHidden){
                    Ext.getCmp("layerTreePanel").show();
                }else{
                    Ext.getCmp("ordenDeCapasTree").show();
                }                
                if(!app.isAttributesPanelHidden){
                    Ext.getCmp("featureGridPanel").show();
                }
                Ext.getCmp("banner").show();
                Ext.getCmp("mapAtributesPanel").getTopToolbar().show();
                if(app.configuracion.avanzado){
                    Ext.getCmp("mapPanel").getBottomToolbar().show();
                }
                Ext.getCmp("viewportPanel").doLayout();                         
            }else{                
                app.fullscreen = true;
                Ext.getCmp("layerTreePanel").hide();
                Ext.getCmp("ordenDeCapasTree").hide();
                Ext.getCmp("featureGridPanel").hide();
                Ext.getCmp("banner").hide();
                Ext.getCmp("mapAtributesPanel").getTopToolbar().hide();
                if(app.configuracion.avanzado){
                    Ext.getCmp("mapPanel").getBottomToolbar().hide();
                }
                Ext.getCmp("viewportPanel").doLayout();                
            }
            
        }
    });        
    
    var nombre = "Dirección General de Estadística y Censos";
    var server = "http://idedgeyc.chubut.gov.ar/geoserver/wms";    
    var initmask = new Ext.LoadMask(Ext.getBody(), {msg:"Cargando..."});
    initmask.show();
    
    new GeoExt.data.WMSCapabilitiesStore({  
        url: getCapabilitiesUrl(server),
        autoLoad: true,
        listeners:{           
            load: function(){                      
                app.capabilities[server] = this;
                app.wmsServerStore.loadData([[nombre,server]],true);
                restoreLayers(config.capas);
                restoreTree(app.rootnode,config.tree);
                
                app.colorTree();
                initmask.hide();
            },
            exception: function(){
                alert("Error al cargar las capas");
                initmask.hide();
            }             
        }
    });  
     
};

app.colorTree = function(){ 
    
    var categorias = new Array("categoria1","categoria2","categoria3","categoria4","categoria5");
    var subCategorias = new Array(" categoria1sub"," categoria2sub"," categoria3sub"," categoria4sub"," categoria5sub");
    
    for(var x = 0; x < app.rootnode.childNodes.length; x++){
       var nodo = app.rootnode.childNodes[x];
       app.rootnode.childNodes[x].setCls(categorias[x]);
    };
    
    for(var j = 0; j < categorias.length; j++){
        
        var categoria = document.querySelectorAll("."+categorias[j]);
        for(var x = 0; x < categoria.length; x++){
            var ct = categoria[x].parentNode.childNodes[1];
            ct.className = ct.className + subCategorias[j];
        }        
                
    }

};