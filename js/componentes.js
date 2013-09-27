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
        id: "buttonNav",
        icon: "img/move2.png",
        toggleGroup: "nav",
        tooltip: "Desplazar mapa",
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
        tooltip: 'Zoom general'
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
        tooltip: "Acercar zoom"
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
        tooltip: "Alejar zoom"
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
        tooltip: "Zoom siguiente"
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
                        resizable: false,
//                        maximizable :true,
//                        collapsible : true,
                        shadow: false,
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
                        resizable: false,
//                        maximizable :true,
//                        collapsible : true,
                        shadow: false,
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
        width: 150,
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
        tooltip: 'Configuración',
        icon: 'img/gear.png',
        id:'configuracionButton',
        handler: function(){
            Ext.getCmp("configuracionButton").disable();
            var window = new Ext.Window({
                title: "Configuración",
                iconCls: 'configuracionIcon',
                layout: "fit",
                shadow: false,
                width: 180,
                height:235,
                resizable: false,
                items: [
                    new Ext.Panel({
                        border: false,
                        width: 185,
                        heigth: 223,
                        items: new Ext.FormPanel({
                             labelWidth: 0, // label settings here cascade unless overridden
                             frame:true,
                             border: false,
                             items: [
                                componentes.configuracionTituloField(),
                                componentes.configuracionSubtituloField(),
                                componentes.configuracionNavegadorCheckbox(),
                                componentes.configuracionLeyendaCheckbox(),
                                componentes.configuracionEscalaCheckbox(),
                                componentes.configuracionMinimapaCheckbox(),
                                componentes.configuracionNorteCheckbox(),
                                componentes.configuracionGrillaCheckbox(),
                             ]
                         })
                    })
                ]
            });
            window.show();   
            window.on('close',function(){Ext.getCmp("configuracionButton").enable();});
        }
    });                                   
    
    return configuracionButton;
    
};

componentes.configuracionTituloField = function(){
    
    var configuracionTituloField = new Ext.form.CompositeField({
        border: false,
        fieldLabel: 'Título',
        items: [
            componentes.configuracionTituloCheckbox(),
            componentes.configuracionCambiarTituloButton()                                      
        ]
    });
    
    return configuracionTituloField;
    
};

/**
 * Devuelve el checkbox de título.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionTituloCheckbox = function(){    
    
    var configuracionTituloCheckbox = new Ext.form.Checkbox({
        checked: app.configuracion.titulo,
        listeners:{check: handler.onConfiguracionTituloCheckbox}
    });
    
    return configuracionTituloCheckbox;
    
};

/**
 * Devuelve el botón para cambiar el texto del título.
 * @returns {Ext.Button}
 */
componentes.configuracionCambiarTituloButton = function(){
    
    var configuracionCambiarTituloButton = new Ext.Button({
        icon: 'img/pencil.png',
        handler: handler.onConfiguracionCambiarTituloButton
     });
     
     return configuracionCambiarTituloButton;
    
};

componentes.configuracionSubtituloField = function(){
    
    var configuracionSubtituloField = new Ext.form.CompositeField({
        border: false,
        fieldLabel: 'Subtítulo',
        items: [
            componentes.configuracionSubtituloCheckbox(),
            componentes.configuracionCambiarSubtituloButton()                                     
        ]
    });
    
    return configuracionSubtituloField;
    
};

/**
 * Devuelve el checkbox de subtítulo.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionSubtituloCheckbox = function(){
    
    var configuracionSubtituloCheckbox = new Ext.form.Checkbox({
        checked: app.configuracion.subtitulo,
        listeners:{check: handler.onConfiguracionSubtituloCheckbox}
    });        
    
    return configuracionSubtituloCheckbox;
        
};

/**
 * Devuelve el botón para cambiar el texto del subtítulo.
 * @returns {Ext.Button}
 */
componentes.configuracionCambiarSubtituloButton = function(){
    
    var configuracionCambiarSubtituloButton = new Ext.Button({
        icon: 'img/pencil.png',
        handler: handler.onConfiguracionCambiarSubtituloButton
     });
    
    return configuracionCambiarSubtituloButton;
        
};

/**
 * Devuelve el checkbox de leyenda.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionNavegadorCheckbox = function(){    
    
    var configuracionNavegadorCheckbox = new Ext.form.Checkbox({
        fieldLabel: 'Navegador',
        checked: app.configuracion.navegador,
        listeners:{check: handler.onConfiguracionNavegadorCheckbox}
    });
    
    return configuracionNavegadorCheckbox;
    
};

/**
 * Devuelve el checkbox de leyenda.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionLeyendaCheckbox = function(){    
    
    var configuracionLeyendaCheckbox = new Ext.form.Checkbox({
        fieldLabel: 'Leyenda',
        checked: app.configuracion.leyenda,
        listeners:{check: handler.onConfiguracionLeyendaCheckbox}
    });
    
    return configuracionLeyendaCheckbox;
    
};

/**
 * Devuelve el checkbox de escala.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionEscalaCheckbox = function(){

    var configuracionEscalaCheckbox = new Ext.form.Checkbox({
        fieldLabel: 'Escala',
        checked: app.configuracion.escala,
        listeners:{check: handler.onConfiguracionEscalaCheckbox}
    });
    
    return configuracionEscalaCheckbox;
    
};

/**
 * Devuelve el checkbox de minimapa.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionMinimapaCheckbox = function(){        
    
    var configuracionMinimapaCheckbox = new Ext.form.Checkbox({
        fieldLabel: 'Localizador',
        checked: app.configuracion.localizador,
        listeners:{check: handler.ConfiguracionMinimapaCheckbox}
    });
    
    return configuracionMinimapaCheckbox;
    
};

/**
 * Devuelve el checkbox de norte.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionNorteCheckbox = function(){

    var configuracionNorteCheckbox = new Ext.form.Checkbox({
        fieldLabel: 'Norte',
        checked: app.configuracion.norte,
        listeners:{check: handler.ConfiguracionNorteCheckbox}
    });
    
    return configuracionNorteCheckbox;
    
};

/**
 * Devuelve el checkbox de grilla.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionGrillaCheckbox = function(){

    var configuracionGrillaCheckbox = new Ext.form.Checkbox({
        fieldLabel: 'Grilla',
        checked: app.configuracion.grilla,
        listeners:{check: handler.ConfiguracionGrillaCheckbox}
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
        width: 150,
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

componentes.bottomBarZoomInButton = function(){
    
    var zoomInButton = new Ext.Button({
        tooltip: 'Zoom In',
        icon: 'img/list-add.png',
        handler: function(){
            app.map.zoomIn();
        }
    });
    
    return zoomInButton;
    
};

componentes.bottomBarZoomOutButton = function(){
    
    var zoomOutButton = new Ext.Button({
        tooltip: 'Zoom Out',
        icon: 'img/list-remove.png',
        handler: function(){
            app.map.zoomOut();
        }
    });
    
    return zoomOutButton;
    
};

componentes.zoomSlider = function(){
    
    var zoomSlider = new GeoExt.ZoomSlider({
        width: 200,
        map: app.map
    });
    
    return zoomSlider;
    
};

/**
 * Devuelve el botón de agregar capas.
 * @returns {Ext.Button}
 */
componentes.agregarCapasButton = function(){
    
    var agregarCapasButton = new Ext.Button({
        tooltip: 'Agregar capas WMS',
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
        tooltip: 'Orden de las capas',
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
        icon: 'img/folder-expandir.png',
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
        icon: 'img/folder-colapsar.png',
        id: "treePanelTopbarColapsar", 
        handler: handler.onColapsarTodoButton
    });
    
    return colapsarTodoButton;
    
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
        tooltip: 'Exportar capas',
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
//        text:"Reconocer",
        icon: 'img/cursor-question.png',
        toggleGroup: "nav", 
        allowDepress: true,
        disabled: true,
        hidden: true,
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
//        text:"Seleccionar",
        icon: 'img/cursor.png',
        toggleGroup: "nav", 
        allowDepress: true,
        disabled: true,
        hidden: true,
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
//        text:"Limpiar",
        icon: 'img/broom.png',
        disabled: true,
        hidden: true,
        id: "wfsLimpiarButton",
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

componentes.wfsCerrarButton = function(){
  
    var wfsCerrarButton = new Ext.Button({
        tooltip: 'Cerrar',
        icon: 'img/close.png',
        disabled: true,
        hidden: true,
        id: "wfsCerrarButton",
        handler: function(){
            app.map.getLayersByName("wfsLayer")[0].removeAllFeatures();
            Ext.getCmp("featureGridPanel").hide();
            Ext.getCmp("viewportPanel").doLayout();   
            app.isAttributesPanelHidden = true;
            Ext.getCmp("buttonNav").toggle(true);
            Ext.getCmp("wfsReconocerButton").setDisabled(true);
            Ext.getCmp("wfsSeleccionarButton").setDisabled(true);
            Ext.getCmp("wfsLimpiarButton").setDisabled(true);
            Ext.getCmp("wfsCerrarButton").setDisabled(true);
            Ext.getCmp("wfsReconocerButton").hide();
            Ext.getCmp("wfsSeleccionarButton").hide();
            Ext.getCmp("wfsLimpiarButton").hide();
            Ext.getCmp("wfsCerrarButton").hide();
        }
    });
            
    return wfsCerrarButton;
    
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
        width: 465,
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
