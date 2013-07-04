
toolbar.mapPanelTopBar = function(){
    
    var mapPanelToolbar = [
        componentes.navegacionButton(),
        componentes.zoomToMaxExtentButton(),
        componentes.zoomInButton(),
        componentes.zoomOutButton(),
        componentes.zoomAnteriorButton(),
        componentes.zoomPosteriorButton(),
        componentes.distanciaButton(),
        componentes.superficieButton(),
        componentes.informacionButton(),    
        componentes.blankSpace(),
        componentes.geocoderComboBox(),
        componentes.separador(),
        componentes.configuracionButton(),
        componentes.imprimirButton(),
        componentes.ayudaButton(),
        componentes.acercaDeButton()
    ];
    
    return mapPanelToolbar;
    
};

toolbar.mapPanelBottomBar = function(){
    
    var mapPanelBottomBar = [
        componentes.scaleComboBox(),
        componentes.separador(),
        componentes.div("position")
    ];

    return mapPanelBottomBar;
    
};

toolbar.treePanelTopBar = function(){
    
    var treePanelTopBar = [ 
        componentes.agregarCapasButton(),
        componentes.ordenDeCapasButton(),
        componentes.agregarCarpetaButton(),  
        componentes.expandirTodoButton(),
        componentes.colapsarTodoButton()
    ];
    
    return treePanelTopBar;
    
};

toolbar.treePanelBottomBar = function(){
    
    var treePanelBottomBar = [ 
        componentes.mapaBaseMenuButton(),
        componentes.separador(),
        componentes.importarCapasButton(),
        componentes.exportarCapasButton()
    ];
    
    return treePanelBottomBar;
    
};

toolbar.featureGridPanelTopBar = function(){
    
    var featureGridPanelTopBar = [
        componentes.wfsReconocerButton(), 
        componentes.wfsSeleccionarButton(), 
        componentes.wfsLimpiarButton(),
        componentes.separador(),
        componentes.wfsExportarAExcelLink()
    ];
    
    return featureGridPanelTopBar;
    
};