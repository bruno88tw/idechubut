/*
 * IDE Chubut
 * 
 * Escrito por Bruno J. Vecchietti
 * 
 * mapa.js
 * 
 * Script inicial
 * 
 */

/*
 * Variable de acceso global
 * 
 * @type array
 */
var app = {};

/*
 * Variable de acceso global para acceder a los paneles
 * 
 * @type type
 */
var panel = {};

/*
 * Variable de acceso global para acceder a las componentes toolbar de la aplicación
 * 
 * @type type
 */
var toolbar = {};

/*
 * Variable de acceso global para acceder a los componentes de la aplicación
 * 
 * @type type
 */
var componentes = {};

/*
 * Variable de acceso global para acceder a los manejadores
 * 
 * @type type
 */
var handler = {};

/*
 * Variable de acceso global a las ventanas
 * 
 * @type type
 */
var windows = {};

/*
 * Ubicación del proxy cgi
 * 
 * @type String
 */
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

/*
 * Función de inicio de aplicación
 */
Ext.onReady(function() {
    
    Ext.QuickTips.init();  //initialize quick tips          
    app.crearMapa();    //crea el mapa
    app.agregarControles();
    app.agregarCapasBase();
    app.generarViewport(); //crea el viewport   
    app.configuracionFinal();  // configuración final
    
});

/*
 * Función que crea el mapa, agrega los controles, capas base y capas de vectores
 * 
 * @returns {undefined}
 */
app.crearMapa = function(){               

    /*
     * Creo el mapa
     */
    app.map = new OpenLayers.Map(
        "divMapa",
        {
            controls: [],
            resolutions: app.resolutions,
            restrictedExtent: app.max_bounds.clone().transform(app.projection4326, app.projection900913),  
            projection: app.projection900913,
            displayProjection: app.projection4326, 
            units: 'm'
        }
    );   
        
};

/*
 * Agrega controles básicos al mapa
 * 
 * @returns {undefined}
 */
app.agregarControles = function(){
    
    /*
     * Agrego control de historia de navegación
     */
    app.map.addControl(new OpenLayers.Control.NavigationHistory());
    
    /*
     * Agrego el control de navegación
     */
    app.map.addControl(new OpenLayers.Control.Navigation());
    
    /*
     * Agrego el control para consultas a través de WMSGetFeatureInfo
     */
    app.map.addControl(new OpenLayers.Control.WMSGetFeatureInfo(app.featureInfoOptions));
    
    /*
     * Agrego el control de panzoombar
     */
    app.map.addControl(new OpenLayers.Control.PanZoomBar(),new OpenLayers.Pixel(6,2));        
    
};

/*
 * Agrega capas base al mapa y capas vectoriales
 * 
 * @returns {undefined}
 */
app.agregarCapasBase = function(){
    
    /*
     * Agrego capas base al mapa
     */
    app.map.addLayer(new OpenLayers.Layer.Google("Google Streets",{minZoomLevel: 6, maxZoomLevel: 19}));
    app.map.addLayer(new OpenLayers.Layer.Google("Google Terrain",{type: google.maps.MapTypeId.TERRAIN, minZoomLevel: 6, maxZoomLevel: 15}));
    app.map.addLayer(new OpenLayers.Layer.Google("Google Satellite",{type: google.maps.MapTypeId.SATELLITE, minZoomLevel: 6, maxZoomLevel: 19}));
    app.map.addLayer(new OpenLayers.Layer.Google("Google Hybrid",{type: google.maps.MapTypeId.HYBRID, minZoomLevel: 6, maxZoomLevel: 19}));
    app.map.addLayer(new OpenLayers.Layer.OSM("OpenStreetMap",null,{zoomOffset: 6, resolutions: app.resolutions, isBaseLayer:true, sphericalMercator: true}));    
    app.map.addLayer(new OpenLayers.Layer.Bing({name: "Bing Road", key: 'An-hnXUInDJCCN2NgVvNDgZh5h7Otc4CxXZi9TEgJcqjuAu3W9MSzXoAqkxhB1C5', type: "Road", zoomOffset: 6, resolutions: app.resolutions}));
    app.map.addLayer(new OpenLayers.Layer.Bing({name: "Bing Aerial", key: 'An-hnXUInDJCCN2NgVvNDgZh5h7Otc4CxXZi9TEgJcqjuAu3W9MSzXoAqkxhB1C5', type: "Aerial", zoomOffset: 6, resolutions: app.resolutions}));
    app.map.addLayer(new OpenLayers.Layer.Bing({name: "Bing Hybrid", key: 'An-hnXUInDJCCN2NgVvNDgZh5h7Otc4CxXZi9TEgJcqjuAu3W9MSzXoAqkxhB1C5', type: "AerialWithLabels", zoomOffset: 6, resolutions: app.resolutions}));
    app.map.addLayer(new OpenLayers.Layer.OSM("mapquest",["http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg","http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg","http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg","http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg"],{zoomOffset: 6, resolutions: app.resolutions, isBaseLayer:true, sphericalMercator: true}));  
    app.map.addLayer(new OpenLayers.Layer.OSM("mapquestAerial",["http://otile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg","http://otile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg","http://otile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg","http://otile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg"],{zoomOffset: 6, resolutions: app.resolutions2, isBaseLayer:true, sphericalMercator: true}));            

    /*
     * Vector layer para las consultas wfs
     */             
    app.map.addLayer(new OpenLayers.Layer.Vector("wfsLayer", {displayInLayerSwitcher: false}));
    
    /*
     * Vector layer para el localizador
     */
    app.map.addLayer(new OpenLayers.Layer.Vector("Location", {
        styleMap: new OpenLayers.Style({
            externalGraphic: "http://openlayers.org/api/img/marker.png",
            graphicYOffset: -25,
            graphicHeight: 25,
            graphicTitle: "${name}"
        }),
        displayInLayerSwitcher: false
    }));    
    
};

/*
 * Genera el vieport y le incorpora todos los paneles necesarios
 * 
 * @returns {undefined}
 */
app.generarViewport = function(){            
    
    /*
     * Layout para los componentes visuales
     */
    new Ext.Viewport({
            layout: "border",  
            border:false,
            items:[
                panel.banner(),
                panel.layerTreePanel(),
                panel.legendPanel(),                        
                panel.mapPanel(),
                panel.featureGridPanel()                         
            ]
    });  
    
};

/*
 * Configuración final de la aplicación, agrega elementos al mapPanel y realiza modificaciones sobre el css de algunos componentes
 */
app.configuracionFinal = function(){

    /*
     * Importo las capas definidas en app.tree y el orden definido en app.index
     */
    if(app.tree != null){
        restoreTree(app.rootnode,app.tree);
        restoreIndex(app.index);          
    }  

    /*
     * Agrego al mapPanel los div sobre los cuales se renderizarán los siguientes componentes
     */
    document.getElementById('mapPanel').getElementsByClassName('x-panel-body')[0].firstChild.appendChild(document.getElementById('scalelinediv'));
    document.getElementById('mapPanel').getElementsByClassName('x-panel-body')[0].firstChild.appendChild(document.getElementById('minimapcontainer'));
    document.getElementById('mapPanel').getElementsByClassName('x-panel-body')[0].firstChild.appendChild(document.getElementById('rosa'));
    document.getElementById('mapPanel').getElementsByClassName('x-panel-body')[0].firstChild.appendChild(document.getElementById('titulodiv'));
    document.getElementById('mapPanel').getElementsByClassName('x-panel-body')[0].firstChild.appendChild(document.getElementById('subtitulodiv'));
    document.getElementById('mapPanel').getElementsByClassName('x-panel-body')[0].firstChild.appendChild(document.getElementById('legenddiv'));                              

    /*
     * Agrego el control de posición del mouse 
     */
    app.map.addControl(new OpenLayers.Control.MousePosition({
        div: document.getElementById('position'),
        formatOutput: function(lonLat) {
            var markup = convertDMS(lonLat.lat, "LAT");
            markup += " " + convertDMS(lonLat.lon, "LON");
            return markup;
        }
    }));     
    
    /*
     * Agrego el control de escala
     */
    app.map.addControl(new OpenLayers.Control.ScaleLine({
        div: document.getElementById("scalelinediv")
    }));
    
    /*
     * Agrego el control de minimapa
     */
    app.map.addControl(new OpenLayers.Control.OverviewMap({
        layers:[new OpenLayers.Layer.OSM("OSM",null,null,{isBaseLayer: true, maxZoomLevel: 20})],
        size: new OpenLayers.Size(150, 130),
        div: document.getElementById('minimap')            
    }));       

    /*
     * Agrego el legendPanel que se visualiza dentro del mapPanel
     */
    new GeoExt.LegendPanel({
        title: 'Leyenda',
        iconCls: "legendIcon",
        id: "legendPanelOnMap",
        autoScroll: true,
        width: 250,
        collapsible: false,
        collapsed: false,
        border: false,
        renderTo: document.getElementById("legenddiv"),
        bodyCfg : { cls:'x-panel-body your-own-rule' , style: {'background':'rgba(255, 255, 255, 0.6)'} },
        defaults: {
            style: 'padding:5px',
            baseParams: {
                FORMAT: 'image/png',
                LEGEND_OPTIONS: 'forceLabels:on'
            }
        }
    });  

    /*
     * Agrego un manejador sobre el evento de resize del mapPanel para acomodar el tamaño del legendPanelOnMap
     */
    Ext.getCmp("mapPanel").on("bodyresize", function(){
        Ext.getCmp("legendPanelOnMap").setHeight(Ext.getCmp("mapPanel").getHeight() - 73);
    });
    
    /*
     * Modifico las propiedades css de algunos componentes para perfeccionar la estética de la aplicación
     */
    document.getElementById("layerTreePanel").getElementsByClassName('x-panel-bwrap')[0].getElementsByClassName('x-panel-tbar')[0].firstChild.style.backgroundColor = "#BACAE6";
    document.getElementById("layerTreePanel").getElementsByClassName('x-panel-bwrap')[0].getElementsByClassName('x-panel-tbar')[0].firstChild.style.borderBottomColor = "#BACAE6";
    document.getElementById("layerTreePanel").getElementsByClassName('x-panel-bwrap')[0].getElementsByClassName('x-panel-bbar')[0].firstChild.style.backgroundColor = "#BACAE6";
    document.getElementById("layerTreePanel").getElementsByClassName('x-panel-bwrap')[0].getElementsByClassName('x-panel-bbar')[0].firstChild.style.borderTopColor = "#BACAE6";
    document.getElementById("layerTreePanel").getElementsByClassName('x-panel-header')[0].style.height = "17px";
    document.getElementById("legendPanel").getElementsByClassName('x-panel-header')[0].style.height = "17px";
       
};

