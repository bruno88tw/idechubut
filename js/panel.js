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
 * @returns {Array} Panel del viewport.
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
        height: 60,
        bodyStyle:"background: #7db9e8; background: -moz-linear-gradient(left,  #7db9e8 0%, #2989d8 50%, #207cca 56%, #1e5799 100%); background: -webkit-gradient(linear, left top, right top, color-stop(0%,#7db9e8), color-stop(50%,#2989d8), color-stop(56%,#207cca), color-stop(100%,#1e5799)); background: -webkit-linear-gradient(left,  #7db9e8 0%,#2989d8 50%,#207cca 56%,#1e5799 100%); background: -o-linear-gradient(left,  #7db9e8 0%,#2989d8 50%,#207cca 56%,#1e5799 100%); background: -ms-linear-gradient(left,  #7db9e8 0%,#2989d8 50%,#207cca 56%,#1e5799 100%); background: linear-gradient(to right,  #7db9e8 0%,#2989d8 50%,#207cca 56%,#1e5799 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7db9e8', endColorstr='#1e5799',GradientType=1 ); ",
        border:false,
        html: '<div align=left><img src="img/unpsjb.png" alt="banner" style="height: 60px; width: 400px"></div>'
    };
    
    return banner;
    
};

/**
 * Crea y devuelve el panel que contiene todo menos el banner.
 * @returns {Array} Panel contenedor.
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
        ],
//        tbar:toolbar.mapPanelTopBar(),
//        bbar: toolbar.mapPanelBottomBar()
    });
    
    return containerPanel;
    
};

/**
 * Crea y devuelve el panel sobre el que se visualizará el mapa y el panel de atributos.
 * @returns {Array} Panel central.
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
            panel.accordionPanel(),
            panel.minimapPanel()                                                 
        ]
    });
    
    return westPanel;
    
};

/**
 * Crea y devuelve el panel sobre el que se visualizará el mapa y el panel de atributos.
 * @returns {Array} Panel central.
 */
panel.accordionPanel = function(){
    
    var accordionPanel = new Ext.TabPanel({
        region:"center",
//        layout:"accordion",
        activeTab: 0,
        id: "accordionPanel",
//        layoutConfig: {
//            // layout-specific configs go here
//            titleCollapse: true,
//            animate: false,
//            activeOnTop: true,
//            hideCollapseTool: true
//        },
//        enableTabScroll:true,
//        animScroll: true,
        border:false,
//        unstyled: true,
        bodyCfg : { style: {'background':'#F9F9F9'} },        
//        width: 230,
        items:[   

            panel.layerTreePanel(),     
            panel.capasBasePanel(),             
            panel.legendPanel(),
            panel.ordenPanel()
            
        ]
    });
    
    return accordionPanel;
    
};

/**
 * Crea y devuelve el panel sobre el que se visualizará el mapa y el panel de atributos.
 * @returns {Array} Panel central.
 */
panel.minimapPanel = function(){
       
    var minimapPanel = new Ext.Panel({
        region:"south",
        height: 150,
        minHeight: 150,
        maxHeight: 150,
//        width: 100,
        split:true,
        collapseMode:"mini",
        collapsed: true,
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
 * @returns {Array} Panel central.
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
 * @returns {GeoExt.MapPanel} Panel del mapa.
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
 * Crea y devuelve el panel sobre el que se visualizará el mapa y el panel de atributos.
 * @returns {Array} Panel central.
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
            useArrows: true,
            bodyCfg : { style: {'background':'#F9F9F9; padding-top:5px'} },
            root: capasBase,
            rootVisible: false,
            enableDD: true
        })
    });
    
    return capasBasePanel;
    
};

/**
 * Instancia y devuelve el panel sobre el que se visualizará el árbol de capas.
 * @returns {Ext.tree.TreePanel} Panel del árbol de capas.
 */
panel.layerTreePanel = function(){
        
    var layerTreePanel = new Ext.Panel({
        iconCls: "treeLayers-headerIcon",
        tabTip: "Árbol de capas",
        layout:"border",
        items: new Ext.tree.TreePanel({
            title: "Árbol de capas",     
            region: "center",
            width: 262,
            maxWidth: 262,
            minWidth: 262,
            border: false,      
            autoScroll: true,
            useArrows: true,
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
 * Crea y devuelve el panel sobre el que se visualizará el mapa y el panel de atributos.
 * @returns {Array} Panel central.
 */
panel.ordenPanel = function(){
    
    var ordenPanel = new Ext.Panel({
        tabTip: "Orden de capas",
        iconCls: "ordenLayers-headerIcon",
        layout:"border",
        items: new Ext.tree.TreePanel({
            title: "Orden de capas",
            region: "center",
            width: 262,
            border: false,      
            autoScroll: true,
            useArrows: true,
            bodyCfg : { style: {'background':'#F9F9F9; padding-top:5px'} },
            root: new GeoExt.tree.OverlayLayerContainer({
                text: "Capas",
                icon: "img/layers3.png",
                iconCls: "layerNodeIcon",
                map: app.map,
                expanded: true
            }),
            rootVisible: false,
            enableDD: true
        })
    });
    
    return ordenPanel;
    
};

/**
 * Crea y devuelve el panel sobre el que se visualizará el mapa y el panel de atributos.
 * @returns {Array} Panel central.
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
 * @returns {Ext.grid.GridPanel} Panel de atributos.
 */
panel.featureGridPanel = function(){
    
    var featureGridPanel = new Ext.grid.GridPanel({
        region: 'south',
        hidden: true,
        style: 'border-right-color:#BCBCBC; border-right-width:1px;\n\
        border-left-color:#BCBCBC; border-left-width:1px;\n\
        border-bottom-color:#BCBCBC; border-bottom-width:1px',
        height: 155,
//        minHeight: 210,
//        maxHeight: 210,        
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

