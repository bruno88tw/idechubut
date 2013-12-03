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
            panel.layerTreePanel(),   
            panel.centerPanel(),   
            
        ]
    });
    
    return containerPanel;
    
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
            panel.ordenPanel(),            
            panel.mapAtributesPanel()                                                 
        ]
    });
    
    return centerPanel;
    
};

/**
 * Crea y devuelve el panel sobre el que se visualizará el mapa y el panel de atributos.
 * @returns {Ext.Panel}
 */
panel.mapAtributesPanel = function(){
    
    var centerPanel = new Ext.Panel({
        region:"center",
        layout:"border",
        border:false,
        id: 'mapAtributesPanel',
        items:[                  
            panel.mapPanel(),            
            panel.featureGridPanel()                                                 
        ],
        tbar:toolbar.mapPanelTopBar(),
//        bbar: toolbar.mapPanelBottomBar()
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
        bbar: toolbar.mapPanelBottomBar()
    });
    
    Ext.getCmp("mapPanel").on({
        
    });
    
    return mapPanel;
    
    
};

/**
 * Instancia y devuelve el panel de árbol de capas.
 * @returns {Ext.Panel}
 */
panel.layerTreePanel = function(){                              
        
    var layerTreePanel = new Ext.tree.TreePanel({
        title: "Capas",   
        region: "west",
        width: 300,
        iconCls: 'layerNodeIcon',
        maxWidth: 262,
        minWidth: 262,
        border: false,      
        autoScroll: true,

        plugins: [
            new GeoExt.plugins.TreeNodeComponent(),
        ],         

        bodyCfg : { style: {'background':'#F9F9F9;'} },
        id: "layerTreePanel",
        root: app.rootnode,
        rootVisible: false,
        enableDD: true,
//        tbar: toolbar.treePanelTopBar(),

    });
            
    
    return layerTreePanel;
    
};

/**
 * Crea y devuelve el panel de orden de capas.
 * @returns {Ext.Panel}
 */
panel.ordenPanel = function(){        

    var ordenPanel = new Ext.tree.TreePanel({
        
            title: 'Orden de las capas',
            iconCls: 'layerNodeIcon',
            region: "west",
            id: 'ordenDeCapasTree',
            width: 300,
            autoScroll:true,
            border: false,   
            hidden: true,
            bodyCfg : { style: {'background':'#F9F9F9'} },
            root: new GeoExt.tree.OverlayLayerContainer({
                map: app.map,
                expanded: true,
                border:false,
                loader: {
                    createNode: function(attr) {
                        // add a WMS legend to each node created
                        attr.icon = "img/layers3.png";

                        return GeoExt.tree.LayerLoader.prototype.createNode.call(this, attr);
                    }
                }                           
            }),
            rootVisible: false,
            enableDD: true
        });
    
    return ordenPanel;
    
};

/**
 * Instancia y devuelve el panel sobre el que se visualizarán los atributos de las capas.
 * @returns {Ext.grid.GridPanel}
 */
panel.featureGridPanel = function(){
    
    var featureGridPanel = new Ext.grid.GridPanel({
        region: 'south',
        hidden: true,
        title: 'Atributos',
        iconCls: 'atributosIcon',
        height: 250,     
        id: "featureGridPanel",
        viewConfig: {forceFit: false},
        border: false,
        columnLines: true,
        store: [],
        sm: new GeoExt.grid.FeatureSelectionModel(),
        columns: [],
        tbar: toolbar.featureGridPanelTopBar(),
        bbar: toolbar.featureGridPanelBottomBar()
    });  
    
    return featureGridPanel;
    
};

