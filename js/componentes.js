/**
 *  @file js/componentes.js
 *  @author Bruno José Vecchietti <bruno88tw@gmial.com>
 *  @fileOverview Se definen las funciones para la construcción y acceso a los componentes de la aplicacón.
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
 * Namespace de acceso a los componentes.
 * @namespace
 */
var componentes = {};

/**
 * Devuelve un separador.
 * @returns {String}
 */
componentes.separador = function(){
    
    return "->";
    
};

/**
 * 
 * @returns {String}
 */
componentes.blankSpace = function(){
    
    return "&nbsp";
    
};

/**
 * 
 * @param {type} id
 * @returns {String}
 */
componentes.div = function(id){
    
    return "<div id='"+id+"'></div>";
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.navegacionButton = function(){
    
    var navegacionButon = new GeoExt.Action({
        control: new OpenLayers.Control.Navigation(),
        map: app.map,
        icon: "img/move2.png",
        toggleGroup: "nav",
        tooltip: "Navegación",
        checked: true
    });
    
    return navegacionButon;
            
};

/**
 * 
 * @returns {unresolved}
 */
componentes.zoomToMaxExtentButton = function(){
    
    var zoomToMaxExtentButton = new GeoExt.Action({
        control: new OpenLayers.Control.ZoomToMaxExtent(),
        map: app.map,
        icon: "img/magnifier-zoom-fit.png",
        tooltip: 'Zoom a la máxima extensión'
    });
    
    return zoomToMaxExtentButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.zoomInButton = function (){
    
    var zoomInButton = new GeoExt.Action({
        control: new OpenLayers.Control.ZoomBox(),
        map: app.map,
        icon: "img/magnifier-zoom-in.png",
        toggleGroup: "nav",
        tooltip: "Zoom in"
    });
    
    return zoomInButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.zoomOutButton = function(){
    
    var zoomOutButton = new GeoExt.Action({
        control: new OpenLayers.Control.ZoomBox({out: true}),
        map: app.map,
        icon: "img/magnifier-zoom-out.png",
        toggleGroup: "nav",
        tooltip: "Zoom out"
    });
    
    return zoomOutButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.zoomAnteriorButton = function(){
    
    var zoomAnteriorButton = new GeoExt.Action({
        icon: "img/history-zoom-left.png",
        control: app.map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0].previous,
        disabled: true,
        tooltip: "Zoom anterior"
    });
    
    return zoomAnteriorButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.zoomPosteriorButton = function(){
    
    var zoomPosteriorButton = new GeoExt.Action({
        icon: "img/history-zoom-right.png",
        control: app.map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0].next,
        disabled: true,
        tooltip: "Zoom posterior"
    });
    
    return zoomPosteriorButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.distanciaButton = function(){
    
    var distanciaButton = new GeoExt.Action({
        control: new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
            eventListeners: {
                measure: function(evt) {
                    new Ext.Window({
                        title: "Herramienta de medición de distancia",
                        iconCls: "distanciaIcon",
                        width: 300,
                        layout: "fit",
                        autoScroll:true,
                        maximizable :true,
                        collapsible : true,
                        bodyStyle:'background-color:white',                                        
                        html:'<div align="center" style="font-size:14px; padding:15px">La distancia es de ' + Math.round(evt.measure*100)/100 + ' ' + evt.units + '</div>'
                    }).show();
                }
            }
        }),
        map: app.map,
        toggleGroup: "nav",
        icon: 'img/rulerline.png',
        tooltip: "Medidor de distancias"
    });
    
    return distanciaButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.superficieButton = function(){
    
    var superficieButton = new GeoExt.Action({
        control: new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
            eventListeners: {
                measure: function(evt) {
                    new Ext.Window({
                        title: "Herramienta de medición de superficie",
                        iconCls: "superficieIcon",
                        width: 300,
                        layout: "fit",
                        autoScroll:true,
                        maximizable :true,
                        collapsible : true,
                        bodyStyle:'background-color:white',
                        html:'<div align="center" style="font-size:14px; padding:15px">La superficie es de ' + Math.round(evt.measure*100)/100 + ' ' + evt.units + '<sup>2</sup></div>'
                    }).show();
                }
            }
        }),
        map: app.map,
        toggleGroup: "nav",
        icon: 'img/rulerarea.png',
        tooltip: "Medidor de superficie"
    });
    
    return superficieButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.informacionButton = function(){
    
    var informacionButton = new GeoExt.Action({
            control: app.map.getControlsByClass('OpenLayers.Control.WMSGetFeatureInfo')[0],
            map: app.map,
            icon: "img/cursor-info.png",
            toggleGroup: "nav",
            tooltip: "Obtener información"
    });
    
    return informacionButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.geocoderComboBox = function(){
    
    var geocoderComboBox = new GeoExt.form.GeocoderComboBox({       
        layer: app.map.getLayersByName("Location")[0],
        emptyText: "Buscar un lugar ..",
        map: app.map,                
        bounds: app.max_bounds,
        border: false,
        width: 246,
        heigh:100,
        boxMaxHeight: 100,
        boxMinHeight: 100
    });
    
    return geocoderComboBox;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.configuracionButton = function(){
    
    var configuracionButton = new Ext.Button({
        icon: 'img/gear.png',
        tooltip: 'Configuración',
        menu: new Ext.menu.Menu({
            id: 'mainMenu',
            style: {
                overflow: 'visible'     // For the Combo popup
            },
            items: [
                componentes.configuracionTituloCheckbox(), 
                componentes.configuracionCambiarTituloButton(),
                componentes.configuracionSubtituloCheckbox(), 
                componentes.configuracionCambiarSubtituloButton(),
                componentes.configuracionLeyendaCheckbox(),                          
                componentes.configuracionNavegadorCheckbox(),                             
                componentes.configuracionEscalaCheckbox(),
                componentes.configuracionMinimapaCheckbox(),
                componentes.configuracionNorteCheckbox(),
                componentes.configuracionGrillaCheckbox()                                                         
            ]
        })
    });
    
    return configuracionButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.configuracionTituloCheckbox = function(){
    
    var configuracionTituloCheckbox = new Ext.menu.CheckItem({
        text: 'Título',
        checked: false,
        checkHandler: handler.onConfiguracionTituloCheckbox
    });
    
    return configuracionTituloCheckbox;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.configuracionCambiarTituloButton = function(){
    
    var configuracionCambiarTituloButton = new Ext.Button({
        text: "Cambiar título",
        width: 105,
        handler: handler.onConfiguracionCambiarTituloButton
     });
     
     return configuracionCambiarTituloButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.configuracionSubtituloCheckbox = function(){
    
    var configuracionSubtituloCheckbox = new Ext.menu.CheckItem({
        text: 'Subtítulo',
        checked: false,
        checkHandler: handler.onConfiguracionSubtituloCheckbox
    });
    
    return configuracionSubtituloCheckbox;
        
};

/**
 * 
 * @returns {unresolved}
 */
componentes.configuracionCambiarSubtituloButton = function(){
    
    var configuracionCambiarSubtituloButton = new Ext.Toolbar.Button({
        text: "Cambiar subtítulo",
        width: 105,
        handler: handler.onConfiguracionCambiarSubtituloButton
     });
    
    return configuracionCambiarSubtituloButton;
        
};

/**
 * 
 * @returns {unresolved}
 */
componentes.configuracionLeyendaCheckbox = function(){
    
    var configuracionLeyendaCheckbox = new Ext.menu.CheckItem({
        text: 'Leyenda',
        checked: false,
        checkHandler: handler.onConfiguracionLeyendaCheckbox
    });
    
    return configuracionLeyendaCheckbox;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.configuracionNavegadorCheckbox = function(){
    
    var configuracionNavegadorCheckbox = new Ext.menu.CheckItem({
        text: 'Navegador',
        checked: true,
        checkHandler: handler.onConfiguracionNavegadorCheckbox
    });
    
    return configuracionNavegadorCheckbox;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.configuracionEscalaCheckbox = function(){
    
    var configuracionEscalaCheckbox = new Ext.menu.CheckItem({
        text: 'Escala',
        checked: true,
        checkHandler: handler.onConfiguracionEscalaCheckbox
    });
    
    return configuracionEscalaCheckbox;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.configuracionMinimapaCheckbox = function(){
    
    var configuracionMinimapaCheckbox = new Ext.menu.CheckItem({
        text: 'Minimapa',
        checked: true,
        checkHandler: handler.ConfiguracionMinimapaCheckbox
    });
    
    return configuracionMinimapaCheckbox;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.configuracionNorteCheckbox = function(){
    
    var configuracionNorteCheckbox = new Ext.menu.CheckItem({
        text: 'Norte',
        checked: true,
        checkHandler: handler.ConfiguracionNorteCheckbox
    });
    
    return configuracionNorteCheckbox;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.configuracionGrillaCheckbox = function(){
    
    var configuracionGrillaCheckbox = new Ext.menu.CheckItem({
        text: 'Grilla',
        checked: false,
        checkHandler: handler.ConfiguracionGrillaCheckbox
    });
    
    return configuracionGrillaCheckbox;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.imprimirButton = function(){
    
    var imprimirButton = new Ext.Button({
        tooltip: 'Imprimir',
        icon: 'img/printer.png',
        handler: handler.onImprimirButton
    });
    
    return imprimirButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.ayudaButton = function(){
    
    var ayudaButton = new Ext.Button({
        tooltip: 'Ayuda',
        icon: 'img/question.png',
        handler: handler.onAyudaButton
    });
    
    return ayudaButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.acercaDeButton = function(){
    
    var acercaDeButton = new Ext.Toolbar.Button({
        tooltip: 'Acerca de',
        icon: 'img/star.png',
        handler: handler.onAcercaDeButton
    });
    
    return acercaDeButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.scaleComboBox = function(){
    
    var scaleComboBox = new Ext.form.ComboBox({
        id: "scaleCombo",
        width: 130,
        mode: "local", // keep the combo box from forcing a lot of unneeded data refreshes
        emptyText: "Scale",
        triggerAction: "all", // needed so that the combo box doesn't filter by its current content
        displayField: "scale",
        editable: false,
        tpl: '<tpl for="."><div class="x-combo-list-item">1 : {[parseInt(values.scale)]}</div></tpl>',
        store: new GeoExt.data.ScaleStore({map: app.map}),
        listeners: {
            select: function(combo, record) {
                Ext.getCmp("mapPanel").map.zoomTo(record.get("level"));
                Ext.getCmp("scaleCombo").setValue("1 : " + parseInt(app.map.getScale()));
            }
        }
    });
    
    // Reescribe el contenido del combobox de resolución para darle un determinado formato
    Ext.getCmp("scaleCombo").setValue("1 : " + parseInt(app.map.getScale()));      
    
    // Agrega un manejador al evento cambio de zoom del mapa de modo que reescriba el contenido del combobox de resolución
    app.map.events.register("zoomend", this, function() {
        Ext.getCmp("scaleCombo").setValue("1 : " + parseInt(app.map.getScale()));
    });     
    
    return scaleComboBox;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.agregarCapasButton = function(){
    
    var agregarCapasButton = new Ext.Button({
        tooltip: 'Agregar capa',
        icon: 'img/map-plus.png',
        id: "treePanelTopbarAgregar",
        handler: function(){handler.onAgregarCapas(null);}
    });
    
    return agregarCapasButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.ordenDeCapasButton = function(){
    
    var ordenDeCapasButton = new Ext.Button({
        tooltip: 'Orden',
        icon: 'img/maps-stack.png',
        enableToggle: true,
        allowDepress: true,
        handler: handler.onOrdenDeCapasButton
    });
    
    return ordenDeCapasButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.agregarCarpetaButton = function(){
    
    var agregarCarpetaButton = new Ext.Button({
        tooltip: 'Agregar carpeta',
        icon: 'img/folder-add.png',
        id: "treePanelTopbarAgregarCarpeta",
        handler: handler.onAgregarCarpetaButton
    });
    
    return agregarCarpetaButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.expandirTodoButton = function(){
    
    var expandirTodoButton = new Ext.Button({
        tooltip: 'Expandir todo',
        icon: 'img/list-add.png',
        id: "treePanelTopbarExpandir",
        handler: handler.onExpandirTodoButton
    });
    
    return expandirTodoButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.colapsarTodoButton = function(){
    
    var colapsarTodoButton = new Ext.Toolbar.Button({
        tooltip: 'Colapsar todo',
        icon: 'img/list-remove.png',
        id: "treePanelTopbarColapsar", 
        handler: handler.onColapsarTodoButton
    });
    
    return colapsarTodoButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.mapaBaseMenuButton = function(){
    
    var mapaBaseMenuButton = new Ext.Button({
        icon: "img/map.png",
        text: "Mapa Base",
        menu: new Ext.menu.Menu({
            items: [
                new Ext.menu.Item({
                    text: "Google Streets",
                    iconCls: "googleIcon",
                    handler: handler.onGoogleStreets
                }),
                new Ext.menu.Item({
                    text: "Google Terrain",
                    iconCls: "googleIcon",
                    handler: handler.onGoogleTerrain
                }),
                new Ext.menu.Item({
                    text: "Google Satellite",
                    iconCls: "googleIcon",
                    handler: handler.onGoogleSatellite
                }),
                new Ext.menu.Item({
                    text: "Google Hybrid",
                    iconCls: "googleIcon",
                    handler: handler.onGoogleHibryd
                }),
                new Ext.menu.Item({
                    text: "OpenStreetMap",
                    iconCls: "osmIcon",
                    handler: handler.onOpenStreetMap
                }),                                
                new Ext.menu.Item({
                    text: "Bing Road",
                    iconCls: "bingIcon",
                    handler: handler.onBingRoad
                }),
                new Ext.menu.Item({
                    text: "Bing Aerial",
                    iconCls: "bingIcon",
                    handler: handler.onBingAerial
                }),
                new Ext.menu.Item({
                    text: "Bing Hybrid",
                    iconCls: "bingIcon",
                    handler: handler.onBingHibryd
                }),
                new Ext.menu.Item({
                    text: "mapquest",
                    iconCls: "mapQuestIcon",
                    handler: handler.onMapQuest
                }),
                new Ext.menu.Item({
                    text: "mapquestAerial",
                    iconCls: "mapQuestIcon",
                    handler: handler.onMapQuestAerial
                })                       
            ]
        })
    });
    
    return mapaBaseMenuButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.importarCapasButton = function(){
    
    var importarCapasButton = new Ext.Button({
        tooltip: 'Importar capas',
        icon: 'img/folder-open.png',
        id: "treePanelBottombarImportar",
        handler: handler.onImportarCapasButton
    });
    
    return importarCapasButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.exportarCapasButton = function(){
    
    var exportarCapasButton = new Ext.Button({
        tooltip: 'Guardar capas',
        icon: 'img/folder-save.png',
        id: "treePanelBottombarExportar",
        handler: handler.onExportarCapasButton
    });
    
    return exportarCapasButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.wfsReconocerButton = function(){
    
    var wfsReconocerButton = new Ext.Button({
        id: "wfsReconocerButton",
        tooltip: 'Reconocer',
        text:"Reconocer",
        icon: 'img/cursor-question.png',
        toggleGroup: "nav", 
        allowDepress: true,
        listeners: {
           toggle: handler.onWfsReconocerButton
        }
    });
    
    return wfsReconocerButton;
    
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.wfsSeleccionarButton = function(){
   
   var wfsSeleccionarButton = new Ext.Button({
        id: "wfsSeleccionarButton",
        tooltip: 'Seleccionar',
        text:"Seleccionar",
        icon: 'img/cursor.png',
        toggleGroup: "nav", 
        allowDepress: true,
        listeners: {
           toggle: handler.onWfsSeleccionarButton
        }
    });
    
    return wfsSeleccionarButton;
   
};

/**
 * 
 * @returns {unresolved}
 */
componentes.wfsLimpiarButton = function(){
   
   var wfsLimpiarButton = new Ext.Button({
        tooltip: 'Limpiar',
        text:"Limpiar",
        icon: 'img/broom.png',
        handler: handler.onWfsLimpiarButton
    });
    
    return wfsLimpiarButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.wfsExportarAExcelLink = function(){
    
    var wfsExportarAExcelLink = new Ext.ux.Exporter.Button({
        store: app.wfsStoreExport
    });
    
    return wfsExportarAExcelLink;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.capabilitiesStore = function(){

    var capabilitiesStore = new GeoExt.data.WMSCapabilitiesStore({  
        url: "asdf",
        autoLoad: false
    });
    
    return capabilitiesStore;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.rowExpander = function(){
    
    var rowExpander = new Ext.ux.grid.RowExpander({
        tpl : new Ext.Template(
            '<HR><p><b>Resumen:</b> {abstract}</p><HR>'
        )
    }); 
    
    return rowExpander;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.confirmarAgregarCapasButton = function(){
    
    var confirmarAgregarCapasButton = new Ext.Button({
        tooltip: 'Agregar capas',
        text: "Agregar",
        icon: 'img/mas.png'
    });
    
    return confirmarAgregarCapasButton;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.capabilitiesCombo = function(){
    
    var capabilitiesCombo = new Ext.form.ComboBox({
        store: app.wmsServerStore,
        width: 455,
        valueField: 'url',
        displayField: 'nombre', 
        emptyText: "Servidores WMS",
        editable: false,
        triggerAction: 'all', // needed so that the combo box doesn't filter by its current content
        mode: 'local' // keep the combo box from forcing a lot of unneeded data refreshes
    });
    
    return capabilitiesCombo;
    
};

/**
 * 
 * @param {type} node
 * @returns {componentes.capabilitiesGridPanel.capabilitiesGridPanel}
 */
componentes.capabilitiesGridPanel = function(node){
    
    var mask;
    var capabilitiesStore = componentes.capabilitiesStore();
    var capabilitiesCombo = componentes.capabilitiesCombo();
    var agregarCapasButton = componentes.confirmarAgregarCapasButton();
    
    var capabilitiesGridPanel = new Ext.grid.GridPanel({
        border: false,
        viewConfig: {forceFit: true},
        store: capabilitiesStore,
        columnLines: true,
        columns: [
            componentes.rowExpander(),
            {header: "Título", dataIndex: "title", sortable: true},
            {header: "Nombre", dataIndex: "name", sortable: true}            
        ],
        plugins: componentes.rowExpander(),
        tbar: [                  
            componentes.servidoresWmsButton(),
            componentes.separador(),
            capabilitiesCombo
        ],
        bbar: [
            componentes.separador(),
            agregarCapasButton
        ]        
    });

    capabilitiesStore.on("beforeload",function(){
        mask = new Ext.LoadMask(capabilitiesGridPanel.getEl(), {msg:"Conectando..."});
        mask.show();        
    });
    capabilitiesStore.on("load",function(){
        mask.hide();
    });
    capabilitiesStore.on("exception",function(){
        mask.hide();
        Ext.MessageBox.alert('Error', 'Ha ocurrido un error en la conexión con el servidor indicado.');        
    });
    
    capabilitiesCombo.on("select",function(){
        capabilitiesStore.proxy.conn.url = getCapabilitiesUrl(capabilitiesCombo.getValue());
        capabilitiesStore.load();        
    });
    
    agregarCapasButton.setHandler(function(){handler.onAgregarCapasButton(node, capabilitiesGridPanel, capabilitiesCombo)});
    
    return capabilitiesGridPanel;
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.servidoresWmsButton = function(){
    
    var servidoresWmsButton = new Ext.Button({
        tooltip: 'Servidores WMS',
        icon: 'img/server.png',
        handler: handler.onServidoresWmsButton
    });
    
    return servidoresWmsButton;
    
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.wmsServersGridPanel = function(){
   
   var wmsServersInformationButton = componentes.wmsServersInformationButton();
   var agregarServidorWmsButton = componentes.agregarServidorWmsButton();
   var eliminarServidorWmsButton = componentes.eliminarServidorWmsButton();
   
   var wmsServersGridPanel = new Ext.grid.GridPanel({
        border: false,
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
        viewConfig: {
          forceFit: false
        },
        store: app.wmsServerStore,
        columns: [
            {
              header: "Nombre",
              dataIndex: "nombre",
              sortable: true,
              width: 150
            },
            {
              header: "Url",
              dataIndex: "url",
              sortable: true,
              width: 334
            } 
        ],
        bbar: [
            componentes.separador(),
            wmsServersInformationButton,                            
            agregarServidorWmsButton,
            eliminarServidorWmsButton
        ]               
    }); 
    
    wmsServersInformationButton.setHandler(function(){handler.onWmsServersInformationButton(wmsServersGridPanel);});    
    agregarServidorWmsButton.setHandler(function(){handler.onAgregarServidorWmsButton();});    
    eliminarServidorWmsButton.setHandler(function(){handler.onEliminarServidorWmsButton(wmsServersGridPanel);});
           
    return wmsServersGridPanel;        
   
};

/**
 * 
 * @returns {unresolved}
 */
componentes.wmsServersInformationButton = function(){
    
    var wmsServersInformationButton = new Ext.Button({
        text:"Información",
        tooltip: 'Información',
        icon: 'img/information.png'
    });
            
    return wmsServersInformationButton;        
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.agregarServidorWmsButton = function(){
    
    var agregarServidorWmsButton = new Ext.Button({
        tooltip: 'Agregar servidor WMS',
        text: "Agregar",
        icon: 'img/server-plus.png'
    });
    
    return agregarServidorWmsButton;
        
};

/**
 * 
 * @returns {unresolved}
 */
componentes.eliminarServidorWmsButton = function(){
    
    var eliminarServidorWmsButton = new Ext.Button({
        tooltip: 'Eliminar servidor WMS',
        text: "Eliminar",
        icon: 'img/server-minus.png'
    });
    
    return eliminarServidorWmsButton;
    
};
