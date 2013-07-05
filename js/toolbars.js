//  File        : js/toolbars.js
//  Project     : Mapviewer
//  Author      : Bruno José Vecchietti
//  Year        : 2012  
//  Description : Se definen las funciones para la construcción y acceso 
//  a las barras de herramientas de la aplicacón.
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