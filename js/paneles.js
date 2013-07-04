panel.banner = function(){
    
    var banner = {
        region: 'north',
        id:"banner",
        height: 30,
        bodyStyle:'background-color:black',
        border:false,
        html: '<img src="img/banner-dgeyc.jpg" alt="banner" style="height: 100%">'
    };
    
    return banner;
    
};

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

panel.layerTreePanel = function(){
    
    var layerTreePanel = new Ext.tree.TreePanel({
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
        root: app.rootnode,
        rootVisible: false,
        enableDD: true,
        tbar: toolbar.treePanelTopBar(),
        bbar: toolbar.treePanelBottomBar()
    }); 
    
    return layerTreePanel;
    
};

panel.legendPanel = function(){
    
    var legendPanel = new GeoExt.LegendPanel({        
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
    
    return legendPanel;
    
};

panel.featureGridPanel = function(){
    
    var featureGridPanel = new Ext.grid.GridPanel({
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
        tbar: toolbar.featureGridPanelTopBar()    
    });  
    
    return featureGridPanel;
    
};

