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

OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

/*
 * Función de inicio de aplicación
 */
Ext.onReady(function() {
    
    Ext.QuickTips.init();  //initialize quick tips          
    createMap();    //crea el mapa
    generateViewport(); //crea el viewport   
    finalConfig();  // configuración final
    
});

/*
 * Función que crea el mapa, agrega los controles, capas base y capas de vectores
 * 
 * @returns {undefined}
 */
function createMap(){               

    /*
     * Creo el mapa
     */
    map = new OpenLayers.Map(
        "divMapa",
        {
            controls: [],
            resolutions: resolutions,
            restrictedExtent: global.max_bounds.clone().transform(projection4326, projectionMercator),  
            projection: projectionMercator,
            displayProjection: projection4326, 
            units: 'm'
        }
    );     
        
    /*
     * Agrego los controles al mapa
     */
    map.addControl(new OpenLayers.Control.NavigationHistory());
    map.addControl(new OpenLayers.Control.Navigation());
    map.addControl(new OpenLayers.Control.WMSGetFeatureInfo(featureInfoOptions));
    map.addControl(new OpenLayers.Control.PanZoomBar(),new OpenLayers.Pixel(6,2));            

    /*
     * Agrego capas base al mapa
     */

    map.addLayer(new OpenLayers.Layer.Google("Google Streets",{minZoomLevel: 6, maxZoomLevel: 19}));
    map.addLayer(new OpenLayers.Layer.Google("Google Terrain",{type: google.maps.MapTypeId.TERRAIN, minZoomLevel: 6, maxZoomLevel: 15}));
    map.addLayer(new OpenLayers.Layer.Google("Google Satellite",{type: google.maps.MapTypeId.SATELLITE, minZoomLevel: 6, maxZoomLevel: 19}));
    map.addLayer(new OpenLayers.Layer.Google("Google Hybrid",{type: google.maps.MapTypeId.HYBRID, minZoomLevel: 6, maxZoomLevel: 19}));
    map.addLayer(new OpenLayers.Layer.OSM("OpenStreetMap",null,{zoomOffset: 6, resolutions: resolutions, isBaseLayer:true, sphericalMercator: true}));    
    map.addLayer(new OpenLayers.Layer.Bing({name: "Bing Road", key: global.bingApiKey, type: "Road", zoomOffset: 6, resolutions: resolutions}));
    map.addLayer(new OpenLayers.Layer.Bing({name: "Bing Aerial", key: global.bingApiKey, type: "Aerial", zoomOffset: 6, resolutions: resolutions}));
    map.addLayer(new OpenLayers.Layer.Bing({name: "Bing Hybrid", key: global.bingApiKey, type: "AerialWithLabels", zoomOffset: 6, resolutions: resolutions}));
    map.addLayer(new OpenLayers.Layer.OSM("mapquest",
        ["http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg",
        "http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg",
        "http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg",
        "http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg"],
        {zoomOffset: 6, resolutions: resolutions, isBaseLayer:true, sphericalMercator: true}
    ));  
    map.addLayer(new OpenLayers.Layer.OSM("mapquestAerial",
        ["http://otile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
        "http://otile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
        "http://otile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
        "http://otile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg"],
        {zoomOffset: 6, resolutions: resolutions2, isBaseLayer:true, sphericalMercator: true}
    ));            

    /*
     * Vector layer para las consultas wfs
     */             
    map.addLayer(new OpenLayers.Layer.Vector("wfsLayer", {displayInLayerSwitcher: false}));
    
    /*
     * Vector layer para el localizador
     */
    map.addLayer(new OpenLayers.Layer.Vector("Location", {
        styleMap: new OpenLayers.Style({
            externalGraphic: "http://openlayers.org/api/img/marker.png",
            graphicYOffset: -25,
            graphicHeight: 25,
            graphicTitle: "${name}"
        }),
        displayInLayerSwitcher: false
    }));
    
}

/*
 * Genera el vieport y le incorpora todos los paneles necesarios
 * 
 * @returns {undefined}
 */
function generateViewport(){
    
    /*
     * Raíz del árbol de capas
     */
    global.rootnode = new Ext.tree.TreeNode({
        text: "Capas",
        icon: "img/layers.png",
        leaf:false,
        expanded: true          
    });  
    
    /*
     * Panel del mapa
     */
    new GeoExt.MapPanel({
        region: 'center',
        border:false,
        map: map,  
        center: new OpenLayers.LonLat(-69, -44).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()),
        id: "mapPanel",
        extent: global.max_bounds.clone().transform(projection4326, projectionMercator),
        stateId: "map",
        tbar: getTopBar(),
        bbar: [
            /*
             * Herramienta de resolución
             */
            new Ext.form.ComboBox({
                id: "scaleCombo",
                width: 130,
                mode: "local", // keep the combo box from forcing a lot of unneeded data refreshes
                emptyText: "Scale",
                triggerAction: "all", // needed so that the combo box doesn't filter by its current content
                displayField: "scale",
                editable: false,
                tpl: '<tpl for="."><div class="x-combo-list-item">1 : {[parseInt(values.scale)]}</div></tpl>',
                store: new GeoExt.data.ScaleStore({map: map}),
                listeners: {
                    select: function(combo, record) {
                        Ext.getCmp("mapPanel").map.zoomTo(record.get("level"));
                        Ext.getCmp("scaleCombo").setValue("1 : " + parseInt(map.getScale()));
                    }
                }
            }),
            "->",
            "<div id='position'></div>"
        ]
    });   
    
    /*
     * Reescribe el contenido del combobox de resolución para darle un determinado formato
     */
    Ext.getCmp("scaleCombo").setValue("1 : " + parseInt(map.getScale()));      
    
    /*
     * Agrega un manejador al evento cambio de zoom del mapa de modo que reescriba el contenido del combobox de resolución
     */
    map.events.register("zoomend", this, function() {
        Ext.getCmp("scaleCombo").setValue("1 : " + parseInt(map.getScale()));
    });

    /*
     * Importo las capas definidas en tree y el orden definido en index
     */
    agregarDescendencia(global.rootnode,tree);
    restoreIndex(index);     
    
    /*
     * Panel del árbol de capas
     */
    new Ext.tree.TreePanel({
        region: 'west',
        collapseMode: 'mini',
        split: true,
        width: 255,
        maxWidth: 255,
        minWidth: 255,
        border: false,      
        autoScroll: true,
        iconCls: "layers-headerIcon",
        title: 'Capas',
        id: "layerTreePanel",
        root: global.rootnode,
        rootVisible: false,
        enableDD: true,
        tbar:[ 
            /*
             * Botón para agregar nuevas capas
             */
            new Ext.Toolbar.Button({
                tooltip: 'Agregar capa',
                icon: 'img/map-plus.png',
                id: "treePanelTopbarAgregar",
                handler: function(){
                    agregarCapas(null);
                }
            }),
            /*
             * Botón para visualizar y modificar el orden de las capas
             */
            new Ext.Toolbar.Button({
                tooltip: 'Orden',
                icon: 'img/maps-stack.png',
                enableToggle: true,
                allowDepress: true,
                handler: function(){        
                    if(this.pressed){
                        Ext.getCmp("treePanelTopbarAgregar").disable();
                        Ext.getCmp("treePanelTopbarAgregarCarpeta").disable();
                        Ext.getCmp("treePanelTopbarExpandir").disable();
                        Ext.getCmp("treePanelTopbarColapsar").disable();
                        Ext.getCmp("treePanelBottombarImportar").disable();
                        Ext.getCmp("treePanelBottombarExportar").disable();  
                        Ext.getCmp("layerTreePanel").root = null;
                        Ext.getCmp("layerTreePanel").setRootNode(new GeoExt.tree.OverlayLayerContainer({
                            text: "Solo overlays",
                            icon: "img/layers.png",
                            map: map,
                            expanded: false
                        }));
                    }else{
                        Ext.getCmp("treePanelTopbarAgregar").enable();
                        Ext.getCmp("treePanelTopbarAgregarCarpeta").enable();
                        Ext.getCmp("treePanelTopbarExpandir").enable();
                        Ext.getCmp("treePanelTopbarColapsar").enable();
                        Ext.getCmp("treePanelBottombarImportar").enable();
                        Ext.getCmp("treePanelBottombarExportar").enable();
                        Ext.getCmp("layerTreePanel").setRootNode(global.rootnode);
                    }
                }
            }),
            /*
             * Botón para agregar una nueva carpeta al árbol de capas
             */
            new Ext.Toolbar.Button({
                tooltip: 'Agregar carpeta',
                icon: 'img/folder-add.png',
                id: "treePanelTopbarAgregarCarpeta",
                handler: function(){
                   var newFolder = createNode("Nueva carpeta");
                   Ext.getCmp("layerTreePanel").getRootNode().appendChild(newFolder);
                   setFolderName(newFolder);
                }
            }),  
            /*
             * Botón para expandir todo el árbol de capas
             */
            new Ext.Toolbar.Button({
                tooltip: 'Expandir todo',
                icon: 'img/list-add.png',
                id: "treePanelTopbarExpandir",
                handler: function(){
                   expandAll(Ext.getCmp("layerTreePanel").getRootNode());
                }
            }),
            /*
             * Botón para colapsar todo el árbol de capas
             */
            new Ext.Toolbar.Button({
                tooltip: 'Colapsar todo',
                icon: 'img/list-remove.png',
                id: "treePanelTopbarColapsar", 
                handler: function(){
                   collapseAll(Ext.getCmp("layerTreePanel").getRootNode());
                }
            })
        ],
        bbar: [ 
            /*
             * Menú de selección de capa base
             */
            {
                icon: "img/map.png",
                text: "Mapa Base",
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            text: "Google Streets",
                            iconCls: "googleIcon",
                            handler: function(){map.setBaseLayer(map.getLayersByName("Google Streets")[0]);}
                        },
                        {
                            text: "Google Terrain",
                            iconCls: "googleIcon",
                            handler: function(){map.setBaseLayer(map.getLayersByName("Google Terrain")[0]);}
                        },
                        {
                            text: "Google Satellite",
                            iconCls: "googleIcon",
                            handler: function(){map.setBaseLayer(map.getLayersByName("Google Satellite")[0]);}
                        },
                        {
                            text: "Google Hybrid",
                            iconCls: "googleIcon",
                            handler: function(){map.setBaseLayer(map.getLayersByName("Google Hybrid")[0]);}
                        },
                        {
                            text: "OpenStreetMap",
                            iconCls: "osmIcon",
                            handler: function(){map.setBaseLayer(map.getLayersByName("OpenStreetMap")[0]);}
                        },                                
                        {
                            text: "Bing Road",
                            iconCls: "bingIcon",
                            handler: function(){map.setBaseLayer(map.getLayersByName("Bing Road")[0]);}
                        },
                        {
                            text: "Bing Aerial",
                            iconCls: "bingIcon",
                            handler: function(){map.setBaseLayer(map.getLayersByName("Bing Aerial")[0]);}
                        },
                        {
                            text: "Bing Hybrid",
                            iconCls: "bingIcon",
                            handler: function(){map.setBaseLayer(map.getLayersByName("Bing Hybrid")[0]);}
                        },
                        {
                            text: "mapquest",
                            iconCls: "mapQuestIcon",
                            handler: function(){map.setBaseLayer(map.getLayersByName("mapquest")[0]);}
                        },
                        {
                            text: "mapquestAerial",
                            iconCls: "mapQuestIcon",
                            handler: function(){map.setBaseLayer(map.getLayersByName("mapquestAerial")[0]);}
                        }                       
                    ]
                })
            },
            "->",
            /*
             * Herramienta para importar el árbol de capas
             */
            new Ext.Toolbar.Button({
                tooltip: 'Importar capas',
                icon: 'img/folder-open.png',
                id: "treePanelBottombarImportar",
                handler: onImportarCapas
            }),
            /*
             * Herramientas para exportar el árbol de capas
             */
            new Ext.Toolbar.Button({
                tooltip: 'Guardar capas',
                icon: 'img/folder-save.png',
                id: "treePanelBottombarExportar",
                handler: onGuardarCapas
            })        
        ]
    });     

    /*
     * Panel de leyenda
     */
    new GeoExt.LegendPanel({        
        region: 'east',
        collapseMode: 'mini',
        collapsed: true,
        split: true,
        width: 255,
        maxWidth: 255,
        minWidth: 255,                                      
        title: 'Leyenda',
        id: "legendPanel",
        iconCls: "legendIcon",
        autoScroll: true,
        border: false,
        defaults: {
            style: 'padding:5px',
            baseParams: {
                FORMAT: 'image/png',
                LEGEND_OPTIONS: 'forceLabels:on'
            }
        }
    });      
    
    /*
     *  Panel de atributos 
     */
    new Ext.grid.GridPanel({
        region: 'south',
        collapseMode: 'mini',
        collapsed: true,
        split: true,
        height: 200,
        minHeight: 200,
        maxHeight: 200,        
        id: "featureGridPanel",
        viewConfig: {forceFit: false},
        border: false,
        columnLines: true,
        store: [],
        sm: new GeoExt.grid.FeatureSelectionModel(),
        columns: [],
        tbar: [
            /*
             * Herramienta de reconocimiento
             */
            new Ext.Toolbar.Button({
                id: "wfsReconocerButton",
                tooltip: 'Reconocer',
                text:"Reconocer",
                icon: 'img/cursor-question.png',
                toggleGroup: "nav", 
                allowDepress: true,
                listeners: {
                   toggle: function(){

                       if(wfsReconocerControl != null){
                           if(this.pressed){
                               wfsReconocerControl.activate();
                           }else{
                               wfsReconocerControl.deactivate();
                           }                    
                       }

                   }
                }
            }), 
            /*
             * Herramienta de selección
             */
            new Ext.Toolbar.Button({
                id: "wfsSeleccionarButton",
                tooltip: 'Seleccionar',
                text:"Seleccionar",
                icon: 'img/cursor.png',
                toggleGroup: "nav", 
                allowDepress: true,
                listeners: {
                   toggle: function(){
                       if(wfsSelectControl != null){
                           if(this.pressed){
                               wfsSelectControl.activate();
                           }else{
                               wfsSelectControl.deactivate();
                           }                    
                       }
                   }
                }
            }), 
            /*
             * Herramienta de limpieza
             */
            new Ext.Toolbar.Button({
                tooltip: 'Limpiar',
                text:"Limpiar",
                icon: 'img/broom.png',
                handler: function(){
                   wfsLayer.removeAllFeatures();
                }
            }),
            "->",
            /*
             * Herramienta de exportación a excel
             */
            new Ext.ux.Exporter.Button({store: wfsStoreExport})
        ]     
    });       
    
    /*
     * Layout para los componentes visuales
     */
    new Ext.Viewport({
            layout: "border",  
            border:false,
            items:[
                {region: 'north',
                id:"banner",
                height: 30,
                bodyStyle:'background-color:black',
                border:false,
                html: '<img src="img/banner-dgeyc.jpg" alt="banner" style="height: 100%">'},
                Ext.getCmp("layerTreePanel"),
                Ext.getCmp("legendPanel"),                        
                Ext.getCmp("mapPanel"),
                Ext.getCmp("featureGridPanel")                         
            ]
    });  
    
}

/*
 * Configuración final de la aplicación, agrega elementos al mapPanel y realiza modificaciones sobre el css de algunos componentes
 */
function finalConfig(){

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
    map.addControl(new OpenLayers.Control.MousePosition({
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
    map.addControl(new OpenLayers.Control.ScaleLine({
        div: document.getElementById("scalelinediv")
    }));
    
    /*
     * Agrego el control de minimapa
     */
    map.addControl(new OpenLayers.Control.OverviewMap({
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
       
}

