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
 * Crea y devuelve el panel sobre el que se visualizará el banner.
 * @returns {Array} Panel del banner.
 */
panel.banner = function(){
    
    var banner = {
        region: 'north',
        id:"banner",
        height: 30,
        bodyStyle:'background-color:#000000',
        border:false,
        html: '<img src="img/banner-dgeyc.jpg" alt="banner" style="height: 100%">'
    };
    
    return banner;
    
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
        tbar: toolbar.mapPanelTopBar(),
        bbar: toolbar.mapPanelBottomBar()
    });
    
    return mapPanel;
    
    
};

/**
 * Instancia y devuelve el panel sobre el que se visualizará el árbol de capas.
 * @returns {Ext.tree.TreePanel} Panel del árbol de capas.
 */
panel.layerTreePanel = function(){
        
    var layerTreePanel = new Ext.tree.TreePanel({
        region: 'west',
//        collapseMode: 'mini',
        split: true,
        width: 255,
        maxWidth: 255,
        minWidth: 255,
        border: false,      
        autoScroll: true,
//        iconCls: "layers-headerIcon",
//        title: 'Capas',
        id: "layerTreePanel",
        root: app.rootnode,
        rootVisible: false,
        enableDD: true,
        tbar: toolbar.treePanelTopBar(),
//        bbar: toolbar.treePanelBottomBar()
    }); 
    
    return layerTreePanel;
    
};

/**
 * Instancia y devuelve el panel sobre el que se visualizarán los atributos de las capas.
 * @returns {Ext.grid.GridPanel} Panel de atributos.
 */
panel.featureGridPanel = function(){
    
    var featureGridPanel = new Ext.grid.GridPanel({
        region: 'south',
//        title: 'Atributos',
//        collapseMode: 'mini',        
//        collapsed: true,
        hidden: true,
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
        tbar: toolbar.featureGridPanelTopBar()    
    });  
    
    return featureGridPanel;
    
};

