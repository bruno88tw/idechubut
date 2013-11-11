/**
 *  @file js/panel.js
 *  @author Bruno José Vecchietti <bruno88tw@gmial.com>
 *  @fileOverview Archivo en el que se definen las funciones para la construcción y acceso a los paneles de la aplicacón.
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
 * Namespace de acceso a los paneles.
 * @namespace
 */
var panel = {};

/**
 * Crea y devuelve el panel principal del viewport.
 * @returns {Ext.Panel}
 */
panel.viewportPanel = function(){
    
    var viewportPanel = new Ext.Panel({
        region:"center",
        layout:"border",
        id:"viewportPanel",
        border:false,
        items:[
            panel.banner(),
            panel.containerPanel(),                         

        ]
    });
    
    return viewportPanel;
    
};

/**
 * Crea y devuelve el panel sobre el que se visualizará el banner.
 * @returns {Array} Panel del banner.
 */
panel.banner = function(){
    
    var banner = {
        region: 'north',
        id:"banner",
        height: 30,
        bodyStyle:"background: #000000",
        border:false,
        html: '<div align=left><img src="img/banner-dgeyc.jpg" alt="banner" style="height: 30px"></div>'
    };
    
    return banner;
    
};

/**
 * Crea y devuelve el panel que contiene todo menos el banner.
 * @returns {Ext.Panel}
 */
panel.containerPanel = function(){
    
    var containerPanel = new Ext.Panel({
        region:"center",
        layout:"border",
        border: false,
        id: "container",
        items:[                  
            panel.westPanel(),                     
            panel.centerPanel()                                              
        ]
    });
    
    return containerPanel;
    
};

/**
 * Crea y devuelve el panel sobre el que se visualizará el tabPanel y el localizador.
 * @returns {Ext.Panel}
 */
panel.westPanel = function(){
    
    var westPanel = new Ext.Panel({
        region:"west",
        layout:"border",
        id: "westPanel",
        width: 230,
        border:false,
        style: 'border-top-color:#BCBCBC; border-top-width:1px;\n\
                border-bottom-color:#BCBCBC; border-bottom-width:1px',
        items:[                  
            panel.tabPanel(),
//            panel.minimapPanel()                                                 
        ],
        bbar:[
            componentes.geocoderComboBox()
        ]
    });
    
    return westPanel;
    
};

/**
 * Crea y devuelve el tabPanel que contiene los paneles de árbol de capas, capas base, leyenda y orden de capa.
 * @returns {Ext.TabPanel}
 */
panel.tabPanel = function(){
    
    var tabPanel = new Ext.TabPanel({
        region:"center",
        activeTab: 0,
        id: "tabPanel",
        border:false,
        bodyCfg : { style: {'background':'#F9F9F9'} },        
        items:[   
            panel.layerTreePanel(),     
            panel.capasBasePanel(),                         
            panel.ordenPanel(),
            panel.legendPanel(),            
        ]
    });
    
    return tabPanel;
    
};

/**
 * Crea y devuelve el panel sobre el que se visualizará el localizador.
 * @returns {Ext.Panel}
 */
panel.minimapPanel = function(){
       
    var minimapPanel = new Ext.Panel({
        region:"south",
        height: 150,
        minHeight: 150,
        maxHeight: 150,
        split:true,
        collapseMode:"mini",
        collapsed: false,
        id: "minimapPanel",
        border:false,
        style: 'background:#BCBCBC;',
        items:[
            {
                border: false,
                html:"<div id='minimapa' style='padding: 5px; background:#F9F9F9'></div>",
            }
        ]
    });        
    
    return minimapPanel;
    
};

/**
 * Crea y devuelve el panel sobre el que se visualizará el mapa y el panel de atributos.
 * @returns {Ext.Panel}
 */
panel.centerPanel = function(){
    
    var centerPanel = new Ext.Panel({
        region:"center",
        layout:"border",
        border:false,
        items:[                  
            panel.mapPanel(),
            panel.featureGridPanel()                                                 
        ]
    });
    
    return centerPanel;
    
};

/**
 * Instancia y devuelve el panel sobre el que se visualizará el mapa.
 * @returns {GeoExt.MapPanel}
 */
panel.mapPanel = function(){
    
    var mapPanel = new GeoExt.MapPanel({
        region: 'center',
        border:false,
        map: app.map,  
        center: new OpenLayers.LonLat(-69, -44).transform(new OpenLayers.Projection("EPSG:4326"), app.map.getProjectionObject()),
        id: "mapPanel",
        extent: app.max_bounds.clone().transform(app.projection4326, app.projection900913),
        stateId: "map",
        style: 'border-width:1px; border-color:#BCBCBC',
        tbar:toolbar.mapPanelTopBar(),
        bbar: toolbar.mapPanelBottomBar()
    });
    
    Ext.getCmp("mapPanel").on({
        
    });
    
    return mapPanel;
    
    
};

/**
 * Crea y devuelve el panel de capas base.
 * @returns {Ext.Panel}
 */
panel.capasBasePanel = function(){
    
    // Cargar las capas base al árbol de capas
    var capasBase = new Ext.tree.TreeNode({
        text: "Capas base",
        expanded: false,
        icon: "img/folder.png",
        leaf: false,
    });    
    capasBase.appendChild(
        new GeoExt.tree.LayerNode({
            checkedGroup:"capasBase",
            text: "IGN",
            layer: "IGN",   
            icon: "img/ign.png",
            leaf:true,
            map: app.map
        })
    );
    capasBase.appendChild(
        new GeoExt.tree.LayerNode({
            checkedGroup:"capasBase",
            text: "OpenStreetMap",
            layer: "OpenStreetMap",   
            icon: "img/osm.png",
            leaf:true,
            map: app.map
        })
    );
    capasBase.appendChild(
        new GeoExt.tree.LayerNode({
            checkedGroup:"capasBase",
            text: "Google Streets",
            layer: "Google Streets",   
            icon: "img/google.png",
            leaf:true,
            map: app.map
        })
    );
    capasBase.appendChild(
        new GeoExt.tree.LayerNode({
            checkedGroup:"capasBase",
            text: "Google Terrain",
            layer: "Google Terrain",   
            icon: "img/google.png",
            leaf:true,
            map: app.map
        })
    );
    capasBase.appendChild(
        new GeoExt.tree.LayerNode({
            checkedGroup:"capasBase",
            text: "Google Satellite",
            layer: "Google Satellite",   
            icon: "img/google.png",
            leaf:true,
            map: app.map
        })
    );
    capasBase.appendChild(
        new GeoExt.tree.LayerNode({
            checkedGroup:"capasBase",
            text: "Google Hybrid",
            layer: "Google Hybrid",   
            icon: "img/google.png",
            leaf:true,
            map: app.map
        })
    );
    capasBase.appendChild(
        new GeoExt.tree.LayerNode({
            checkedGroup:"capasBase",
            text: "Bing Road",
            layer: "Bing Road",   
            icon: "img/bing.png",
            leaf:true,
            map: app.map
        })
    );
    capasBase.appendChild(
        new GeoExt.tree.LayerNode({
            checkedGroup:"capasBase",
            text: "Bing Aerial",
            layer: "Bing Aerial",   
            icon: "img/bing.png",
            leaf:true,
            map: app.map
        })
    );
    capasBase.appendChild(
        new GeoExt.tree.LayerNode({
            checkedGroup:"capasBase",
            text: "Bing Hybrid",
            layer: "Bing Hybrid",   
            icon: "img/bing.png",
            leaf:true,
            map: app.map
        })
    );
    capasBase.appendChild(
        new GeoExt.tree.LayerNode({
            checkedGroup:"capasBase",
            text: "MapQuest",
            layer: "MapQuest",   
            icon: "img/mapQuest.png",
            leaf:true,
            map: app.map
        })
    );
    capasBase.appendChild(
        new GeoExt.tree.LayerNode({
            checkedGroup:"capasBase",
            text: "MapQuest Aerial",
            layer: "MapQuest Aerial",   
            icon: "img/mapQuest.png",
            leaf:true,
            map: app.map
        })
    );     
    capasBase.appendChild(
        new GeoExt.tree.LayerNode({
            checkedGroup:"capasBase",
            text: "Sin capa base",
            layer: "Blank",   
            icon: "img/prohibition.png",
            leaf:true,
            map: app.map
        })
    );    
    
    var capasBasePanel = new Ext.Panel({
        tabTip: "Capas base",
        iconCls: "baseLayers-headerIcon",
        layout:"border",
        items: new Ext.tree.TreePanel({
            title: "Capas base",  
            region: "center",
            width: 262,
            border: false,      
            autoScroll: true,
//            useArrows: true,
            lines: true,
            bodyCfg : { style: {'background':'#F9F9F9; padding-top:5px'} },
            root: capasBase,
            rootVisible: false,
//            enableDD: true
        })
    });
    
    return capasBasePanel;
    
};

/**
 * Instancia y devuelve el panel de árbol de capas.
 * @returns {Ext.Panel}
 */
panel.layerTreePanel = function(){              
        
    var layerTreePanel = new Ext.Panel({
        iconCls: "treeLayers-headerIcon",
        tabTip: "Árbol de capas",
        layout:"border",        
        items: new Ext.tree.TreePanel({
            title: "Árbol de capas",   
//            plugins: [
//                new GeoExt.plugins.TreeNodeComponent(),
//            ],
            region: "center",
            width: 262,
            maxWidth: 262,
            minWidth: 262,
            border: false,      
            autoScroll: true,
//            lines: false,
            bodyCfg : { style: {'background':'#F9F9F9; padding-top:5px'} },
            id: "layerTreePanel",
            root: app.rootnode,
            rootVisible: false,
            enableDD: true,
            tbar: toolbar.treePanelTopBar()
        })
    });
            
    
    return layerTreePanel;
    
};

/**
 * Crea y devuelve el panel de orden de capas.
 * @returns {Ext.Panel}
 */
panel.ordenPanel = function(){
    
//    var LayerNodeUI = Ext.extend(
//        GeoExt.tree.LayerNodeUI,
//        new GeoExt.tree.TreeNodeUIEventMixin()
//    );    
//        
//    var store = new GeoExt.data.LayerStore({
//        map: app.map,
//        layers: app.map.layers
//    });        
//    
    var ordenPanel = new Ext.Panel({
        tabTip: "Orden de capas",
        iconCls: "ordenLayers-headerIcon",
        layout:"border",
        items: new Ext.tree.TreePanel({
            title: "Orden de capas",
//            plugins: [
//                new GeoExt.plugins.TreeNodeComponent(),
//            ],
//            loader: {
//                applyLoader: false,
//                uiProviders: {
//                    "custom_ui": LayerNodeUI
//                }
//            },
            region: "center",
            width: 262,
            border: false,      
            autoScroll: true,
//            useArrows: true,
            bodyCfg : { style: {'background':'#F9F9F9; padding-top:5px'} },
//            bodyCfg : { cls:'x-tree-node-cb' , style: {'display':'none'} },
            root: new GeoExt.tree.OverlayLayerContainer({
                map: app.map,
                expanded: false,
                loader: {
                    createNode: function(attr) {
                        // add a WMS legend to each node created
                        attr.icon = "img/layers3.png";
//                        attr.checked = false;
//                        attr.uiProvider = "custom_ui";
//                        attr.component = new GeoExt.WMSLegend({
//                            layerRecord: store.getByLayer(attr.layer),
//                            showTitle: false,
//                            hidden: true,
//                            baseParams: {
//                                FORMAT: 'image/png',
//                                LEGEND_OPTIONS: 'forceLabels:on'
//                            },                            
//                            defaults: {
//                                style: 'padding-left:30px',
//                            }
//                        });                        
                        return GeoExt.tree.LayerLoader.prototype.createNode.call(this, attr);
                    }
                }                           
            }),
            rootVisible: false,
            enableDD: true
        })
    });
    
    return ordenPanel;
    
};

/**
 * Crea y devuelve el panel de leyenda.
 * @returns {Ext.Panel}
 */
panel.legendPanel = function(){
    
    var legendPanel = new Ext.Panel({
        tabTip: "Leyenda",
        iconCls: "legendIcon",
        layout:"border",
        items: new GeoExt.LegendPanel({
            title: "Leyenda",
            region: "center",
            autoScroll: true,
            collapsible: false,
            collapsed: false,
            border: false,
            bodyCfg : { style: {'background':'#F9F9F9; padding-top:5px'} },
            defaults: {
                style: 'padding:5px',
                baseParams: {
                    FORMAT: 'image/png',
                    LEGEND_OPTIONS: 'forceLabels:on'
                }
            }
        })
    });
    
    return legendPanel;
    
};

/**
 * Instancia y devuelve el panel sobre el que se visualizarán los atributos de las capas.
 * @returns {Ext.grid.GridPanel}
 */
panel.featureGridPanel = function(){
    
    var featureGridPanel = new Ext.grid.GridPanel({
        region: 'south',
        hidden: true,
        style: 'border-right-color:#BCBCBC; border-right-width:1px;\n\
        border-left-color:#BCBCBC; border-left-width:1px;\n\
        border-bottom-color:#BCBCBC; border-bottom-width:1px',
        height: 155,     
        id: "featureGridPanel",
        viewConfig: {forceFit: false},
        border: false,
        columnLines: true,
        store: [],
        sm: new GeoExt.grid.FeatureSelectionModel(),
        columns: [],
        bbar: toolbar.featureGridPanelBottomBar()
    });  
    
    return featureGridPanel;
    
};

