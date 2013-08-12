/**
 *  @file js/componentes.js
 *  @author Bruno José Vecchietti <bruno88tw@gmial.com>
 *  @fileOverview Archivo en el que se definen las funciones para la construcción y acceso a los componentes de la aplicacón.
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
 * Devuelve un espacio en blanco.
 * @returns {String}
 */
componentes.blankSpace = function(){
    
    return "&nbsp";
    
};

/**
 * Devuelve un div.
 * @param {type} id
 * @returns {String}
 */
componentes.div = function(id){
    
    return "<div id='"+id+"'></div>";
    
};

/**
 * Devuelve el botón de navegación.
 * @returns {GeoExt.Action}
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
 * Devuelve el botón de zoom a la máxima extensión.
 * @returns {GeoExt.Action}
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
 * Devuelve el botón de zoom in.
 * @returns {GeoExt.Action}
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
 * Devuelve el botón de zoom out.
 * @returns {GeoExt.Action}
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
 * Devuelve el botón de zoom anterior.
 * @returns {GeoExt.Action}
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
 * Devuelve el botón de zoom posterior.
 * @returns {GeoExt.Action}
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
 * Devuelve el botón de medición de distancia.
 * @returns {GeoExt.Action}
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
 * Devuelve el botón de medición de superficie.
 * @returns {GeoExt.Action}
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
 * Devuelve el botón de información.
 * @returns {GeoExt.Action}
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
 * Devuelve el combobox del buscador de topónimos.
 * @returns {GeoExt.form.GeocoderComboBox}
 */
componentes.geocoderComboBox = function(){
    
    var geocoderComboBox = new GeoExt.form.GeocoderComboBox({       
        layer: app.map.getLayersByName("Location")[0],
        emptyText: "Buscar un lugar ...",
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
 * Devuelve el botón de configuración.
 * @returns {Ext.Button}
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
 * Devuelve el checkbox de título.
 * @returns {Ext.menu.CheckItem}
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
 * Devuelve el botón para cambiar el texto del título.
 * @returns {Ext.Button}
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
 * Devuelve el checkbox de subtítulo.
 * @returns {Ext.menu.CheckItem}
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
 * Devuelve el botón para cambiar el texto del subtítulo.
 * @returns {Ext.Button}
 */
componentes.configuracionCambiarSubtituloButton = function(){
    
    var configuracionCambiarSubtituloButton = new Ext.Button({
        text: "Cambiar subtítulo",
        width: 105,
        handler: handler.onConfiguracionCambiarSubtituloButton
     });
    
    return configuracionCambiarSubtituloButton;
        
};

/**
 * Devuelve el checkbox de leyenda.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionLeyendaCheckbox = function(){
    
    var configuracionLeyendaCheckbox = new Ext.menu.CheckItem({
        text: 'Leyenda',
        checked: true,
        checkHandler: handler.onConfiguracionLeyendaCheckbox
    });
    
    return configuracionLeyendaCheckbox;
    
};

/**
 * Devuelve el checkbox de navegador.
 * @returns {Ext.menu.CheckItem}
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
 * Devuelve el checkbox de escala.
 * @returns {Ext.menu.CheckItem}
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
 * Devuelve el checkbox de minimapa.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionMinimapaCheckbox = function(){
    
    var configuracionMinimapaCheckbox = new Ext.menu.CheckItem({
        text: 'Localizador',
        checked: true,
        checkHandler: handler.ConfiguracionMinimapaCheckbox
    });
    
    return configuracionMinimapaCheckbox;
    
};

/**
 * Devuelve el checkbox de norte.
 * @returns {Ext.menu.CheckItem}
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
 * Devuelve el checkbox de grilla.
 * @returns {Ext.menu.CheckItem}
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
 * Devuelve el botón de imprimir.
 * @returns {Ext.Button}
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
 * Devuelve el botón de ayuda.
 * @returns {Ext.Button}
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
 * Devuelve el botón de acerca de.
 * @returns {Ext.Button}
 */
componentes.acercaDeButton = function(){
    
    var acercaDeButton = new Ext.Button({
        tooltip: 'Acerca de',
        icon: 'img/star.png',
        handler: handler.onAcercaDeButton
    });
    
    return acercaDeButton;
    
};

/**
 * Devuelve el combobox de resoluciones.
 * @returns {Ext.form.ComboBox}
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
 * Devuelve el botón de agregar capas.
 * @returns {Ext.Button}
 */
componentes.agregarCapasButton = function(){
    
    var agregarCapasButton = new Ext.Button({
        tooltip: 'Agregar capas',
        icon: 'img/map-plus.png',
        id: "treePanelTopbarAgregar",
        handler: function(){handler.onAgregarCapas(null);}
    });
    
    return agregarCapasButton;
    
};

/**
 * Devuelve el botón de orden de capas.
 * @returns {Ext.Button}
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
 * Devuelve el botón de agregar carpeta.
 * @returns {Ext.Button}
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
 * Devuelve el botón de expandir todo.
 * @returns {Ext.Button}
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
 * Devuelve el botón de colapsar todo.
 * @returns {Ext.Button}
 */
componentes.colapsarTodoButton = function(){
    
    var colapsarTodoButton = new Ext.Button({
        tooltip: 'Colapsar todo',
        icon: 'img/list-remove.png',
        id: "treePanelTopbarColapsar", 
        handler: handler.onColapsarTodoButton
    });
    
    return colapsarTodoButton;
    
};

/**
 * Devuelve el botón de mapas base.
 * @returns {Ext.Button}
 */
componentes.mapaBaseMenuButton = function(){
    
    var mapaBaseMenuButton = new Ext.Button({
        icon: "img/map.png",
        text: "Mapa Base",
        menu: new Ext.menu.Menu({
            items: [
                new Ext.menu.Item({
                    text: "IGN",
                    iconCls: "ignIcon",
                    handler: function(){handler.onCambiarCapaBase("IGN");}
                }),
                new Ext.menu.Item({
                    text: "Google Streets",
                    iconCls: "googleIcon",
                    handler: function(){handler.onCambiarCapaBase("Google Streets");}
                }),
                new Ext.menu.Item({
                    text: "Google Terrain",
                    iconCls: "googleIcon",
                    handler: function(){handler.onCambiarCapaBase("Google Terrain");}
                }),
                new Ext.menu.Item({
                    text: "Google Satellite",
                    iconCls: "googleIcon",
                    handler: function(){handler.onCambiarCapaBase("Google Satellite");}
                }),
                new Ext.menu.Item({
                    text: "Google Hybrid",
                    iconCls: "googleIcon",
                    handler: function(){handler.onCambiarCapaBase("Google Hybrid");}
                }),
                new Ext.menu.Item({
                    text: "OpenStreetMap",
                    iconCls: "osmIcon",
                    handler: function(){handler.onCambiarCapaBase("OpenStreetMap");}
                }),                                
                new Ext.menu.Item({
                    text: "Bing Road",
                    iconCls: "bingIcon",
                    handler: function(){handler.onCambiarCapaBase("Bing Road");}
                }),
                new Ext.menu.Item({
                    text: "Bing Aerial",
                    iconCls: "bingIcon",
                    handler: function(){handler.onCambiarCapaBase("Bing Aerial");}
                }),
                new Ext.menu.Item({
                    text: "Bing Hybrid",
                    iconCls: "bingIcon",
                    handler: function(){handler.onCambiarCapaBase("Bing Hybrid");}
                }),
                new Ext.menu.Item({
                    text: "MapQuest",
                    iconCls: "mapQuestIcon",
                    handler: function(){handler.onCambiarCapaBase("MapQuest");}
                }),
                new Ext.menu.Item({
                    text: "MapQuest Aerial",
                    iconCls: "mapQuestIcon",
                    handler: function(){handler.onCambiarCapaBase("MapQuest Aerial");}
                })                       
            ]
        })
    });
    
    return mapaBaseMenuButton;
    
};

/**
 * Devuelve el botón de importar capas.
 * @returns {Ext.Button}
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
 * Devuelve el botón de exportar capas.
 * @returns {Ext.Button}
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
 * Devuelve el botón de reconocer.
 * @returns {Ext.Button}
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
 * Devuelve el botón de seleccionar.
 * @returns {Ext.Button}
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
 * Devuelve el botón de limpiar.
 * @returns {Ext.Button}
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
 * Devuelve el botón de exportar a excel.
 * @returns {Ext.ux.Exporter.Button}
 */
componentes.wfsExportarAExcelLink = function(){
    
    var wfsExportarAExcelLink = new Ext.ux.Exporter.Button({
        store: app.wfsStoreExport
    });
    
    return wfsExportarAExcelLink;
    
};

/**
 * Devuelve el el store de capabilities.
 * @returns {GeoExt.data.WMSCapabilitiesStore}
 */
componentes.capabilitiesStore = function(){

    var capabilitiesStore = new GeoExt.data.WMSCapabilitiesStore({  
        url: "asdf",
        autoLoad: false
    });
    
    return capabilitiesStore;
    
};

/**
 * Devuelve el controlador de expansión de filas para un gridPanel.
 * @returns {Ext.ux.grid.RowExpander}
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
 * Devuelve el botón de confirmar agregar capas.
 * @returns {Ext.Button}
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
 * Devuelve el combobox de servidores WMS.
 * @returns {Ext.form.ComboBox}
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
 * Devuelve el gridPanel de la ventana "Agregar capas".
 * @param {type} node
 * @returns {Ext.grid.GridPanel}
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
 * Devuelve el botón de servidores WMS.
 * @returns {Ext.Button}
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
 * Devuelve el gridPanel de la ventana "Servidores WMS".
 * @returns {Ext.grid.GridPanel}
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
 * Devuelve el botón de información de la ventana "Servidores WMS".
 * @returns {Ext.Button}
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
 * Devuelve el botón de agregar de la ventana "Servidores WMS".
 * @returns {Ext.Button}
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
 * Devuelve el botón de eliminar de la ventana "Servidores WMS".
 * @returns {Ext.Button}
 */
componentes.eliminarServidorWmsButton = function(){
    
    var eliminarServidorWmsButton = new Ext.Button({
        tooltip: 'Eliminar servidor WMS',
        text: "Eliminar",
        icon: 'img/server-minus.png'
    });
    
    return eliminarServidorWmsButton;
    
};
