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
    
    return new GeoExt.Action({
        control: new OpenLayers.Control.Navigation(),
        map: app.map,
        id: "buttonNav",
        icon: "img/move2.png",
        toggleGroup: "nav",
        tooltip: "Desplazar mapa",
        height: "29px",
        width: "29px",
        checked: true
    });    
            
};

/**
 * Devuelve el botón de zoom a la máxima extensión.
 * @returns {GeoExt.Action}
 */
componentes.zoomToMaxExtentButton = function(){
    
    return new GeoExt.Action({
        control: new OpenLayers.Control.ZoomToMaxExtent(),
        map: app.map,
        id: "zoomToMaxExtent",
        icon: "img/magnifier-zoom-fit.png",
        height: "29px",
        width: "29px",
        tooltip: 'Zoom general'
    });
    
};

/**
 * Devuelve el botón de zoom in.
 * @returns {GeoExt.Action}
 */
componentes.zoomInButton = function (){
    
    return new GeoExt.Action({
        control: new OpenLayers.Control.ZoomBox(),
        map: app.map,
        id: "zoomIn",
        icon: "img/magnifier-zoom-in.png",
        toggleGroup: "nav",
        height: "29px",
        width: "29px",
        tooltip: "Acercar zoom"
    });
    
};

/**
 * Devuelve el botón de zoom out.
 * @returns {GeoExt.Action}
 */
componentes.zoomOutButton = function(){
    
    return new GeoExt.Action({
        control: new OpenLayers.Control.ZoomBox({out: true}),
        map: app.map,
        id: "zoomOut",
        icon: "img/magnifier-zoom-out.png",
        toggleGroup: "nav",
        height: "29px",
        width: "29px",
        tooltip: "Alejar zoom"
    });
    
};

/**
 * Devuelve el botón de zoom anterior.
 * @returns {GeoExt.Action}
 */
componentes.zoomAnteriorButton = function(){
    
    return new GeoExt.Action({
        icon: "img/history-zoom-left.png",
        control: app.map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0].previous,
        disabled: true,
        id: "zoomAnterior",
        hidden: true,
        height: "29px",
        width: "29px",
        tooltip: "Zoom anterior"
    });
    
};

/**
 * Devuelve el botón de zoom posterior.
 * @returns {GeoExt.Action}
 */
componentes.zoomPosteriorButton = function(){
    
    return new GeoExt.Action({
        icon: "img/history-zoom-right.png",
        control: app.map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0].next,
        disabled: true,
        id: "zoomPosterior",
        hidden: true,
        height: "29px",
        width: "29px",
        tooltip: "Zoom siguiente"
    });
    
};

/**
 * Devuelve el botón de medición de distancia.
 * @returns {GeoExt.Action}
 */
componentes.distanciaButton = function(){
    
    // style the sketch fancy
    var sketchSymbolizers = {
        "Point": {
            pointRadius: 4,
            graphicName: "square",
            fillColor: "white",
            fillOpacity: 1,
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeColor: "#333333"
        },
        "Line": {
            strokeWidth: 3,
            strokeOpacity: 1,
            strokeColor: "#666666",
            strokeDashstyle: "dash"
        }
    }; 
    
    var style = new OpenLayers.Style();
    
    style.addRules([
        new OpenLayers.Rule({symbolizer: sketchSymbolizers})
    ]);

    var styleMap = new OpenLayers.StyleMap({"default": style}); 
    
    return new GeoExt.Action({
        control: new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
            handlerOptions: {
                layerOptions:{
                    styleMap: styleMap
                }                
            },
            eventListeners: {
                measure: function(evt) {
                    new Ext.Window({
                        title: "Herramienta de medición de distancia",
                        iconCls: "distanciaIcon",
                        width: 300,
                        layout: "fit",
                        autoScroll:true,
                        resizable: false,
                        shadow: false,
                        bodyStyle:'background-color:white',                                        
                        html:'<div align="center" style="font-size:14px; padding:15px">La distancia es de ' + Math.round(evt.measure*100)/100 + ' ' + evt.units + '</div>'
                    }).show();
                }
            }
        }),
        map: app.map,
        id: "distanciaButton",
        hidden: true,
        toggleGroup: "nav",
        icon: 'img/rulerline.png',
        height: "29px",
        width: "29px",
        tooltip: "Medidor de distancias"
    });
    
};

/**
 * Devuelve el botón de medición de superficie.
 * @returns {GeoExt.Action}
 */
componentes.superficieButton = function(){
    
    // style the sketch fancy
    var sketchSymbolizers = {
        "Point": {
            pointRadius: 4,
            graphicName: "square",
            fillColor: "white",
            fillOpacity: 1,
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeColor: "#333333"
        },
        "Polygon": {
            strokeWidth: 2,
            strokeOpacity: 1,
            strokeColor: "#666666",
            fillColor: "white",
            fillOpacity: 0.3
        } 
    }; 
    
    var style = new OpenLayers.Style();
    
    style.addRules([
        new OpenLayers.Rule({symbolizer: sketchSymbolizers})
    ]);

    var styleMap = new OpenLayers.StyleMap({"default": style});   
    
    return new GeoExt.Action({
        control: new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
            handlerOptions: {
                layerOptions:{
                    styleMap: styleMap
                }                
            },
            eventListeners: {
                measure: function(evt) {
                    new Ext.Window({
                        title: "Herramienta de medición de superficie",
                        iconCls: "superficieIcon",
                        width: 300,
                        layout: "fit",
                        autoScroll:true,
                        resizable: false,
                        shadow: false,
                        bodyStyle:'background-color:white',
                        html:'<div align="center" style="font-size:14px; padding:15px">La superficie es de ' + Math.round(evt.measure*100)/100 + ' ' + evt.units + '<sup>2</sup></div>'
                    }).show();
                }
            }
        }),
        map: app.map,
        id: "superficieButton",
        hidden: true,
        toggleGroup: "nav",
        icon: 'img/rulerarea.png',
        height: "29px",
        width: "29px",
        tooltip: "Medidor de superficie"
    });
    
};

/**
 * Devuelve el botón de información.
 * @returns {GeoExt.Action}
 */
componentes.informacionButton = function(){
    
    return new GeoExt.Action({
        control: app.map.getControlsByClass('OpenLayers.Control.WMSGetFeatureInfo')[0],
        map: app.map,
        icon: "img/information2.png",
        toggleGroup: "nav",
        height: "29px",
        width: "29px",
        tooltip: "Obtener información"
    });
    
};

/**
 * Devuelve el combobox del buscador de topónimos.
 * @returns {GeoExt.form.GeocoderComboBox}
 */
componentes.geocoderComboBox = function(){
    
    return new GeoExt.form.GeocoderComboBox({       
        layer: app.map.getLayersByName("Location")[0],
        emptyText: "Buscar un lugar ...",
        map: app.map,                
        border: false,
        id: "buscador",
        width: 200
    });
    
};

/**
 * Devuelve el botón de configuración.
 * @returns {Ext.Button}
 */
componentes.configuracionButton = function(){
    
    return new Ext.Button({
        tooltip: 'Configuración',
        icon: 'img/equalizer.png',
        id:'configuracionButton',
        height: "29px",
        width: "29px",
        handler: function(){
            Ext.getCmp("configuracionButton").disable();
            var window = new Ext.Window({
                title: "Configuración",
                iconCls: 'configuracionIcon',
                layout: "fit",
                shadow: false,
                x: Ext.getCmp("mapPanel").getPosition()[0] + ((Ext.getCmp("mapPanel").getWidth())) - 189,
                y: Ext.getCmp("mapPanel").getPosition()[1] + 5,
                width: 185,
                height:265,
                resizable: false,
                items: [
                    new Ext.FormPanel({
                        labelWidth: 0, 
                        padding: 10,
                        items: [
                            componentes.configuracionTituloField(),
                            componentes.configuracionSubtituloField(),
                            componentes.configuracionNavegadorCheckbox(),
                            componentes.configuracionLeyendaCheckbox(),
                            componentes.configuracionEscalaCheckbox(),
                            componentes.configuracionMinimapaCheckbox(),
                            componentes.configuracionNorteCheckbox(),
                            componentes.configuracionGrillaCheckbox(),
                            componentes.configuracionAvanzadoCheckbox()
                         ]
                     })
                ]
            });
            window.show();   
            window.on('close',function(){Ext.getCmp("configuracionButton").enable();});
        }
    });                                   
    
};

/**
 * Devuelve un campo compuesto por el checkbox de título y el botón de título.
 * @returns {Ext.form.CompositeField}
 */
componentes.configuracionTituloField = function(){
    
    return new Ext.form.CompositeField({
        border: false,
        fieldLabel: 'Título',
        items: [
            componentes.configuracionTituloCheckbox(),
            componentes.configuracionCambiarTituloButton()                                      
        ]
    });
    
};

/**
 * Devuelve el checkbox de título.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionTituloCheckbox = function(){    
    
    return new Ext.form.Checkbox({
        checked: app.configuracion.titulo,
        listeners:{check: handler.onConfiguracionTituloCheckbox}
    });
    
};

/**
 * Devuelve el botón para cambiar el texto del título.
 * @returns {Ext.Button}
 */
componentes.configuracionCambiarTituloButton = function(){
    
    return new Ext.Button({
        icon: 'img/pencil.png',
        handler: handler.onConfiguracionCambiarTituloButton
     });
    
};

/**
 * Devuelve un campo compuesto por el checkbox de subtítulo y el botón de subtítulo.
 * @returns {Ext.form.CompositeField}
 */
componentes.configuracionSubtituloField = function(){
    
    return new Ext.form.CompositeField({
        border: false,
        fieldLabel: 'Subtítulo',
        items: [
            componentes.configuracionSubtituloCheckbox(),
            componentes.configuracionCambiarSubtituloButton()                                     
        ]
    });
    
};

/**
 * Devuelve el checkbox de subtítulo.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionSubtituloCheckbox = function(){
    
    return new Ext.form.Checkbox({
        checked: app.configuracion.subtitulo,
        listeners:{check: handler.onConfiguracionSubtituloCheckbox}
    });        
        
};

/**
 * Devuelve el botón para cambiar el texto del subtítulo.
 * @returns {Ext.Button}
 */
componentes.configuracionCambiarSubtituloButton = function(){
    
    return new Ext.Button({
        icon: 'img/pencil.png',
        handler: handler.onConfiguracionCambiarSubtituloButton
     });

};

/**
 * Devuelve el checkbox de navegador.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionNavegadorCheckbox = function(){    
    
    return new Ext.form.Checkbox({
        fieldLabel: 'Navegador',
        checked: app.configuracion.navegador,
        listeners:{check: handler.onConfiguracionNavegadorCheckbox}
    });
    
};

/**
 * Devuelve el checkbox de leyenda.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionLeyendaCheckbox = function(){    
    
    return new Ext.form.Checkbox({
        fieldLabel: 'Leyenda',
        checked: app.configuracion.leyenda,
        listeners:{check: handler.onConfiguracionLeyendaCheckbox}
    });
    
};

/**
 * Devuelve el checkbox de escala.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionEscalaCheckbox = function(){

    return new Ext.form.Checkbox({
        fieldLabel: 'Escala',
        checked: app.configuracion.escala,
        listeners:{check: handler.onConfiguracionEscalaCheckbox}
    });
    
};

/**
 * Devuelve el checkbox de minimapa.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionMinimapaCheckbox = function(){        
    
    return new Ext.form.Checkbox({
        fieldLabel: 'Localizador',
        checked: app.configuracion.localizador,
        listeners:{check: handler.ConfiguracionMinimapaCheckbox}
    });
    
};

/**
 * Devuelve el checkbox de norte.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionNorteCheckbox = function(){

    return new Ext.form.Checkbox({
        fieldLabel: 'Norte',
        checked: app.configuracion.norte,
        listeners:{check: handler.ConfiguracionNorteCheckbox}
    });
    
};

/**
 * Devuelve el checkbox de norte.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionAvanzadoCheckbox = function(){

    return new Ext.form.Checkbox({
        fieldLabel: 'Avanzado',
        checked: app.configuracion.avanzado,
        listeners:{check: handler.AvanzadoCheckbox}
    });
    
};

/**
 * Devuelve el checkbox de grilla.
 * @returns {Ext.menu.CheckItem}
 */
componentes.configuracionGrillaCheckbox = function(){

    return new Ext.form.Checkbox({
        fieldLabel: 'Grilla',
        checked: app.configuracion.grilla,
        listeners:{check: handler.ConfiguracionGrillaCheckbox}
    });
    
};

/**
 * Devuelve el botón de ayuda.
 * @returns {Ext.Button}
 */
componentes.ayudaButton = function(){
    
    return new Ext.Button({
        tooltip: 'Ayuda',
        icon: 'img/question.png',
        height: "29px",
        width: "29px",
        handler: handler.onAyudaButton
    });
    
};

/**
 * Devuelve el botón de acerca de.
 * @returns {Ext.Button}
 */
componentes.acercaDeButton = function(){
    
    return new Ext.Button({
        tooltip: 'Acerca de',
        icon: 'img/information-italic.png',
        height: "29px",
        width: "29px",
        handler: handler.onAcercaDeButton
    });
    
};

/**
 * Devuelve el combobox de resoluciones.
 * @returns {Ext.form.ComboBox}
 */
componentes.scaleComboBox = function(){
    
    var scaleComboBox = new Ext.form.ComboBox({
        id: "scaleCombo",
        width: 130,
        height: "29px",
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
    
    return new Ext.Button({
        tooltip: 'Agregar capas WMS',
        icon: 'img/map-plus3.png',
        id: "treePanelTopbarAgregar",
        height: "29px",
        width: "29px",
        handler: function(){handler.onAgregarCapas();}
    });
    
};

/**
 * Devuelve el botón de agregar capas.
 * @returns {Ext.Button}
 */
componentes.eliminarCapasButton = function(){
    
    return new Ext.Button({
        tooltip: 'Eliminar capa',
        icon: 'img/minus-circle.png',
        id: "treePanelTopbarEliminar",
        height: "29px",
        width: "29px",
        disabled: true,
        handler: function(){
            var leaf = Ext.getCmp("layerTreePanel").getSelectionModel().getSelectedNode();
            leaf.remove();
            app.map.removeLayer(app.map.getLayersByName(leaf.attributes.layer)[0]);
            Ext.getCmp("treePanelTopbarEliminar").disable();
            Ext.getCmp("treePanelTopbarPropiedades").disable();
            Ext.getCmp("treePanelTopbarAtributos").disable(); 
            Ext.getCmp("treePanelTopbarZoomCapa").disable(); 
        }
    });
    
};

/**
 * Devuelve el botón de agregar capas.
 * @returns {Ext.Button}
 */
componentes.zoomCapasButton = function(){
    
    return new Ext.Button({
        tooltip: 'Zoom a la capa',
        icon: 'img/magnifier.png',
        id: "treePanelTopbarZoomCapa",
        height: "29px",
        width: "29px",
        hidden: true,
        disabled: true,
        handler: function(){
            var leaf = Ext.getCmp("layerTreePanel").getSelectionModel().getSelectedNode();
            handler.onZoomALaCapaButton(leaf,leaf.layer.params);
        }
    });
    
};

/**
 * Devuelve el botón de agregar capas.
 * @returns {Ext.Button}
 */
componentes.propiedadesCapasButton = function(){
    
    return new Ext.Button({
        tooltip: 'Propiedades de la capa',
        icon: 'img/gear.png',
        id: "treePanelTopbarPropiedades",
        height: "29px",
        width: "29px",
        disabled: true,
        handler: function(){
            var leaf = Ext.getCmp("layerTreePanel").getSelectionModel().getSelectedNode();
            handler.onPropiedadesButton(leaf, leaf.layer.name, leaf.layer.params);
        }
    });
    
};

/**
 * Devuelve el botón de agregar capas.
 * @returns {Ext.Button}
 */
componentes.atributosCapasButton = function(){
    
    return new Ext.Button({
        tooltip: 'Consultar atributos de la capa',
        icon: 'img/table.png',
        id: "treePanelTopbarAtributos",
        height: "29px",
        width: "29px",
        disabled: true,
        handler: function(){
            var leaf = Ext.getCmp("layerTreePanel").getSelectionModel().getSelectedNode();
            handler.onAtributosButton(leaf);
        }
    });
    
};

/**
 * Devuelve el botón de orden de capas.
 * @returns {Ext.Button}
 */
componentes.ordenDeCapasButton = function(){
    
    return new Ext.Button({
        tooltip: 'Orden de las capas',
        icon: 'img/layers3.png',
        id: "ordenDeCapasButton",
        height: "29px",
        width: "29px",
        hidden: true,
        enableToggle: true,
        allowDepress: true,
        handler: handler.onOrdenDeCapasButton
    });
    
};

/**
 * Devuelve el botón de reconocer.
 * @returns {Ext.Button}
 */
componentes.wfsReconocerButton = function(){
    
    return new Ext.Button({
        id: "wfsReconocerButton",
        tooltip: 'Reconocer',
        text: 'Reconocer',
        icon: 'img/cursor-question.png',
        toggleGroup: "nav", 
        allowDepress: true,
        height: "29px",
        listeners: {
           toggle: handler.onWfsReconocerButton
        }
    });
    
};

/**
 * Devuelve el botón de seleccionar.
 * @returns {Ext.Button}
 */
componentes.wfsSeleccionarButton = function(){
   
   return new Ext.Button({
        id: "wfsSeleccionarButton",
        tooltip: 'Seleccionar',
        text: 'Seleccionar',
        icon: 'img/cursor.png',
        toggleGroup: "nav", 
        allowDepress: true,
        height: "29px",
        listeners: {
           toggle: handler.onWfsSeleccionarButton
        }
    });
   
};

/**
 * Devuelve el botón de limpiar.
 * @returns {Ext.Button}
 */
componentes.wfsLimpiarButton = function(){
   
   return new Ext.Button({
        tooltip: 'Limpiar',
        text: 'Limpiar',
        icon: 'img/broom.png',
        id: "wfsLimpiarButton",
        height: "29px",
        handler: handler.onWfsLimpiarButton
    });
    
};

/**
 * Devuelve el botón de exportar a excel.
 * @returns {Ext.ux.Exporter.Button}
 */
componentes.wfsExportarAExcelLink = function(){
    
    return new Ext.ux.Exporter.Button({
        store: app.wfsStoreExport
    });
    
};

/**
 * Devuelve el botón para cerrar el panel de atributos.
 * @returns {Ext.Button}
 */
componentes.wfsCerrarButton = function(){
  
    return new Ext.Button({
        tooltip: 'Cerrar',
        icon: 'img/close.png',        
        id: "wfsCerrarButton",
        height: "29px",
        width: "29",
        handler: function(){
            app.map.getLayersByName("wfsLayer")[0].removeAllFeatures();
            Ext.getCmp("featureGridPanel").hide();
            Ext.getCmp("viewportPanel").doLayout();   
            app.isAttributesPanelHidden = true;
            Ext.getCmp("buttonNav").toggle(true);
        }
    });
    
};

/**
 * Devuelve el el store de capabilities.
 * @returns {GeoExt.data.WMSCapabilitiesStore}
 */
componentes.capabilitiesStore = function(){

    return new GeoExt.data.WMSCapabilitiesStore({  
        url: "asdf",
        autoLoad: false
    });
    
};

/**
 * Devuelve el controlador de expansión de filas para un gridPanel.
 * @returns {Ext.ux.grid.RowExpander}
 */
componentes.rowExpander = function(){
    
    return new Ext.ux.grid.RowExpander({
        tpl : new Ext.Template(
            '<HR><p><b>Resumen:</b> {abstract}</p><HR>'
        )
    }); 
    
};

/**
 * Devuelve el botón de confirmar agregar capas.
 * @returns {Ext.Button}
 */
componentes.confirmarAgregarCapasButton = function(){
    
    return new Ext.Button({
        tooltip: 'Agregar capas',
        text: "Agregar",
        icon: 'img/mas.png'
    });
    
};

/**
 * Devuelve el combobox de servidores WMS.
 * @returns {Ext.form.ComboBox}
 */
componentes.capabilitiesCombo = function(){
    
    return new Ext.form.ComboBox({
        store: app.wmsServerStore,
        width: 465,
        valueField: 'url',
        displayField: 'nombre', 
        emptyText: "Servidores WMS",
        editable: false,
        triggerAction: 'all', // needed so that the combo box doesn't filter by its current content
        mode: 'local' // keep the combo box from forcing a lot of unneeded data refreshes
    });
    
};

/**
 * 
 * @returns {unresolved}
 */
componentes.capabilitiesGridPanel = function(){
    
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
        app.capabilities[capabilitiesCombo.getValue()] = this;
    });
    capabilitiesStore.on("exception",function(){
        mask.hide();
        Ext.MessageBox.alert('Error', 'Ha ocurrido un error en la conexión con el servidor indicado.');        
    });
    
    capabilitiesCombo.on("select",function(){

        if(app.capabilities[capabilitiesCombo.getValue()] == null){
            capabilitiesStore.proxy.conn.url = getCapabilitiesUrl(capabilitiesCombo.getValue());
            capabilitiesStore.load();            
        }else{
            capabilitiesGridPanel.reconfigure(
                app.capabilities[capabilitiesCombo.getValue()],
                new Ext.grid.ColumnModel({
                    columns: [
                        componentes.rowExpander(),
                        {header: "Título", dataIndex: "title", sortable: true},
                        {header: "Nombre", dataIndex: "name", sortable: true}            
                ]})
            );            
        }

    });
    
    agregarCapasButton.setHandler(function(){handler.onAgregarCapasButton(capabilitiesGridPanel, capabilitiesCombo);});
    
    return capabilitiesGridPanel;
    
};

/**
 * Devuelve el botón de servidores WMS.
 * @returns {Ext.Button}
 */
componentes.servidoresWmsButton = function(){
    
    return new Ext.Button({
        tooltip: 'Servidores WMS',
        icon: 'img/server.png',
        handler: handler.onServidoresWmsButton
    });    
    
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
    
    return new Ext.Button({
        text:"Información",
        tooltip: 'Información',
        icon: 'img/information.png'
    });      
    
};

/**
 * Devuelve el botón de agregar de la ventana "Servidores WMS".
 * @returns {Ext.Button}
 */
componentes.agregarServidorWmsButton = function(){
    
    return new Ext.Button({
        tooltip: 'Agregar servidor WMS',
        text: "Agregar",
        icon: 'img/server-plus.png'
    });
        
};

/**
 * Devuelve el botón de eliminar de la ventana "Servidores WMS".
 * @returns {Ext.Button}
 */
componentes.eliminarServidorWmsButton = function(){
    
    return new Ext.Button({
        tooltip: 'Eliminar servidor WMS',
        text: "Eliminar",
        icon: 'img/server-minus.png'
    });
    
};
