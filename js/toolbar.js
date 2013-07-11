/**
 *  @file js/toolbar.js
 *  @author Bruno José Vecchietti <bruno88tw@gmial.com>
 *  @fileOverview Se definen las funciones para la construcción y acceso a las barras de herramientas de la aplicacón.
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
 * Namespace acceso a las barras de herramientas.
 * @namespace
 */
var toolbar = {};

/**
 * 
 * @returns {Array}
 */
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

/**
 * 
 * @returns {Array}
 */
toolbar.mapPanelBottomBar = function(){
    
    var mapPanelBottomBar = [
        componentes.scaleComboBox(),
        componentes.separador(),
        componentes.div("position")
    ];

    return mapPanelBottomBar;
    
};

/**
 * 
 * @returns {Array}
 */
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

/**
 * 
 * @returns {Array}
 */
toolbar.treePanelBottomBar = function(){
    
    var treePanelBottomBar = [ 
        componentes.mapaBaseMenuButton(),
        componentes.separador(),
        componentes.importarCapasButton(),
        componentes.exportarCapasButton()
    ];
    
    return treePanelBottomBar;
    
};

/**
 * 
 * @returns {Array}
 */
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