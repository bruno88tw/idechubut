componentes.separador = function(){
    
    return "->";
    
};

componentes.blankSpace = function(){
    
    return "&nbsp";
    
};

componentes.div = function(id){
    
    return "<div id='"+id+"'></div>";
    
};

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

componentes.zoomToMaxExtentButton = function(){
    
    var zoomToMaxExtentButton = new GeoExt.Action({
        control: new OpenLayers.Control.ZoomToMaxExtent(),
        map: app.map,
        icon: "img/magnifier-zoom-fit.png",
        tooltip: 'Zoom a la máxima extensión'
    });
    
    return zoomToMaxExtentButton;
    
};

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

componentes.zoomAnteriorButton = function(){
    
    var zoomAnteriorButton = new GeoExt.Action({
        icon: "img/history-zoom-left.png",
        control: app.map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0].previous,
        disabled: true,
        tooltip: "Zoom anterior"
    });
    
    return zoomAnteriorButton;
    
};

componentes.zoomPosteriorButton = function(){
    
    var zoomPosteriorButton = new GeoExt.Action({
        icon: "img/history-zoom-right.png",
        control: app.map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0].next,
        disabled: true,
        tooltip: "Zoom posterior"
    });
    
    return zoomPosteriorButton;
    
};

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

componentes.configuracionButton = function(){
    
    var configuracionButton = {
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
    };
    
    return configuracionButton;
    
};

componentes.configuracionTituloCheckbox = function(){
    
    var configuracionTituloCheckbox = {
        text: 'Título',
        checked: false,
        checkHandler: handler.onConfiguracionTituloCheckbox
    };
    
    return configuracionTituloCheckbox;
    
};

componentes.configuracionCambiarTituloButton = function(){
    
    var configuracionCambiarTituloButton = new Ext.Toolbar.Button({
        text: "Cambiar título",
        width: 105,
        handler: handler.onConfiguracionCambiarTituloButton
     });
     
     return configuracionCambiarTituloButton;
    
}

componentes.configuracionSubtituloCheckbox = function(){
    
    var configuracionSubtituloCheckbox = {
        text: 'Subtítulo',
        checked: false,
        checkHandler: handler.onConfiguracionSubtituloCheckbox
    };
    
    return configuracionSubtituloCheckbox;
    
    
};

componentes.configuracionCambiarSubtituloButton = function(){
    
    var configuracionCambiarSubtituloButton = new Ext.Toolbar.Button({
        text: "Cambiar subtítulo",
        width: 105,
        handler: handler.onConfiguracionCambiarSubtituloButton
     });
    
    return configuracionCambiarSubtituloButton;
    
    
};

componentes.configuracionLeyendaCheckbox = function(){
    
    var configuracionLeyendaCheckbox = {
        text: 'Leyenda',
        checked: false,
        checkHandler: handler.onConfiguracionLeyendaCheckbox
    };
    
    return configuracionLeyendaCheckbox;
    
};

componentes.configuracionNavegadorCheckbox = function(){
    
    var configuracionNavegadorCheckbox = {
        text: 'Navegador',
        checked: true,
        checkHandler: handler.onConfiguracionNavegadorCheckbox
    };
    
    return configuracionNavegadorCheckbox;
    
};

componentes.configuracionEscalaCheckbox = function(){
    
    var configuracionEscalaCheckbox = {
        text: 'Escala',
        checked: true,
        checkHandler: handler.onConfiguracionEscalaCheckbox
    };
    
    return configuracionEscalaCheckbox;
    
};

componentes.configuracionMinimapaCheckbox = function(){
    
    var configuracionMinimapaCheckbox = {
        text: 'Minimapa',
        checked: true,
        checkHandler: handler.ConfiguracionMinimapaCheckbox
    };
    
    return configuracionMinimapaCheckbox;
    
};

componentes.configuracionNorteCheckbox = function(){
    
    var configuracionNorteCheckbox = {
        text: 'Norte',
        checked: true,
        checkHandler: handler.ConfiguracionNorteCheckbox
    };
    
    return configuracionNorteCheckbox;
    
};

componentes.configuracionGrillaCheckbox = function(){
    
    var configuracionGrillaCheckbox = {
        text: 'Grilla',
        checked: false,
        checkHandler: handler.ConfiguracionGrillaCheckbox
    };
    
    return configuracionGrillaCheckbox;
    
};

componentes.imprimirButton = function(){
    
    var imprimirButton = new Ext.Toolbar.Button({
        tooltip: 'Imprimir',
        icon: 'img/printer.png',
        handler: handler.onImprimirButton
    });
    
    return imprimirButton;
    
};

componentes.ayudaButton = function(){
    
    var ayudaButton = new Ext.Toolbar.Button({
        tooltip: 'Ayuda',
        icon: 'img/question.png',
        handler: handler.onAyudaButton
    });
    
    return ayudaButton;
    
};

componentes.acercaDeButton = function(){
    
    var acercaDeButton = new Ext.Toolbar.Button({
        tooltip: 'Acerca de',
        icon: 'img/star.png',
        handler: handler.onAcercaDeButton
    });
    
    return acercaDeButton;
    
};

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
    
    /*
     * Reescribe el contenido del combobox de resolución para darle un determinado formato
     */
    Ext.getCmp("scaleCombo").setValue("1 : " + parseInt(app.map.getScale()));      
    
    /*
     * Agrega un manejador al evento cambio de zoom del mapa de modo que reescriba el contenido del combobox de resolución
     */
    app.map.events.register("zoomend", this, function() {
        Ext.getCmp("scaleCombo").setValue("1 : " + parseInt(app.map.getScale()));
    });     
    
    return scaleComboBox;
    
};

componentes.agregarCapasButton = function(){
    
    var agregarCapasButton = new Ext.Toolbar.Button({
        tooltip: 'Agregar capa',
        icon: 'img/map-plus.png',
        id: "treePanelTopbarAgregar",
        handler: function(){handler.onAgregarCapas(null);}
    });
    
    return agregarCapasButton;
    
};

componentes.ordenDeCapasButton = function(){
    
    var ordenDeCapasButton = new Ext.Toolbar.Button({
        tooltip: 'Orden',
        icon: 'img/maps-stack.png',
        enableToggle: true,
        allowDepress: true,
        handler: handler.onOrdenDeCapasButton
    });
    
    return ordenDeCapasButton;
    
};

componentes.agregarCarpetaButton = function(){
    
    var agregarCarpetaButton = new Ext.Toolbar.Button({
        tooltip: 'Agregar carpeta',
        icon: 'img/folder-add.png',
        id: "treePanelTopbarAgregarCarpeta",
        handler: handler.onAgregarCarpetaButton
    });
    
    return agregarCarpetaButton;
    
};

componentes.expandirTodoButton = function(){
    
    var expandirTodoButton = new Ext.Toolbar.Button({
        tooltip: 'Expandir todo',
        icon: 'img/list-add.png',
        id: "treePanelTopbarExpandir",
        handler: handler.onExpandirTodoButton
    });
    
    return expandirTodoButton;
    
};

componentes.colapsarTodoButton = function(){
    
    var colapsarTodoButton = new Ext.Toolbar.Button({
        tooltip: 'Colapsar todo',
        icon: 'img/list-remove.png',
        id: "treePanelTopbarColapsar", 
        handler: handler.onColapsarTodoButton
    });
    
    return colapsarTodoButton;
    
};

componentes.mapaBaseMenuButton = function(){
    
    var mapaBaseMenuButton = {
        icon: "img/map.png",
        text: "Mapa Base",
        menu: new Ext.menu.Menu({
            items: [
                {
                    text: "Google Streets",
                    iconCls: "googleIcon",
                    handler: handler.onGoogleStreets
                },
                {
                    text: "Google Terrain",
                    iconCls: "googleIcon",
                    handler: handler.onGoogleTerrain
                },
                {
                    text: "Google Satellite",
                    iconCls: "googleIcon",
                    handler: handler.onGoogleSatellite
                },
                {
                    text: "Google Hybrid",
                    iconCls: "googleIcon",
                    handler: handler.onGoogleHibryd
                },
                {
                    text: "OpenStreetMap",
                    iconCls: "osmIcon",
                    handler: handler.onOpenStreetMap
                },                                
                {
                    text: "Bing Road",
                    iconCls: "bingIcon",
                    handler: handler.onBingRoad
                },
                {
                    text: "Bing Aerial",
                    iconCls: "bingIcon",
                    handler: handler.onBingAerial
                },
                {
                    text: "Bing Hybrid",
                    iconCls: "bingIcon",
                    handler: handler.onBingHibryd
                },
                {
                    text: "mapquest",
                    iconCls: "mapQuestIcon",
                    handler: handler.onMapQuest
                },
                {
                    text: "mapquestAerial",
                    iconCls: "mapQuestIcon",
                    handler: handler.onMapQuestAerial
                }                       
            ]
        })
    };
    
    return mapaBaseMenuButton;
    
};

componentes.importarCapasButton = function(){
    
    var importarCapasButton = new Ext.Toolbar.Button({
        tooltip: 'Importar capas',
        icon: 'img/folder-open.png',
        id: "treePanelBottombarImportar",
        handler: handler.onImportarCapasButton
    });
    
    return importarCapasButton;
    
};

componentes.exportarCapasButton = function(){
    
    var exportarCapasButton = new Ext.Toolbar.Button({
        tooltip: 'Guardar capas',
        icon: 'img/folder-save.png',
        id: "treePanelBottombarExportar",
        handler: handler.onExportarCapasButton
    });
    
    return exportarCapasButton;
    
};

componentes.wfsReconocerButton = function(){
    
    var wfsReconocerButton = new Ext.Toolbar.Button({
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

componentes.wfsSeleccionarButton = function(){
   
   var wfsSeleccionarButton = new Ext.Toolbar.Button({
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

componentes.wfsLimpiarButton = function(){
   
   var wfsLimpiarButton = new Ext.Toolbar.Button({
        tooltip: 'Limpiar',
        text:"Limpiar",
        icon: 'img/broom.png',
        handler: handler.onWfsLimpiarButton
    });
    
    return wfsLimpiarButton;
    
};

componentes.wfsExportarAExcelLink = function(){
    
    var wfsExportarAExcelLink = new Ext.ux.Exporter.Button({
        store: app.wfsStoreExport
    });
    
    return wfsExportarAExcelLink;
    
};

componentes.capabilitiesStore = function(capabilitiesGridPanel){
    
    var mask;
    var capabilitiesStore = new GeoExt.data.WMSCapabilitiesStore({  
        url: "asdf",
        autoLoad: false,
        listeners:{
            beforeload: function(){
                mask = new Ext.LoadMask(capabilitiesGridPanel.getEl(), {msg:"Conectando..."});
                mask.show();
            },
            load: function(){
                mask.hide();
            },
            exception: function(){
                mask.hide();
                Ext.MessageBox.alert('Error', 'Ha ocurrido un error en la conexión con el servidor indicado.');
            }
        }
    });
    
    return capabilitiesStore;
    
};

componentes.rowExpander = function(){
    
    var rowExpander = new Ext.ux.grid.RowExpander({
        tpl : new Ext.Template(
            '<HR><p><b>Resumen:</b> {abstract}</p><HR>'
        )
    }); 
    
    return rowExpander;
    
};

componentes.capabilitiesGridPanel = function(){
    
    var capabilitiesCombo = componentes.capabilitiesCombo();
    
    var capabilitiesGrid = new Ext.grid.GridPanel({
        border: false,
        viewConfig: {
          forceFit: true
        },
        store: componentes.capabilitiesStore(this),
        columnLines: true,
        columns: [
            componentes.rowExpander(),
            {
              header: "Título",
              dataIndex: "title",
              sortable: true
            },
            {
              header: "Nombre",
              dataIndex: "name",
              sortable: true
            }            
        ],
        plugins: componentes.rowExpander(),
        tbar: [                  
            componentes.servidoresWmsButton(),
            componentes.separador(),
            capabilitiesCombo
        ],
        bbar: [
            componentes.separador(),
            new Ext.Toolbar.Button({
                tooltip: 'Agregar capas',
                text: "Agregar",
                icon: 'img/mas.png',
                handler: function(){

                    capabilitiesGrid.getSelectionModel().each(function(record){

                            var nombrecapa = record.data.title;
                            var servidorWMS = capabilitiesCombo.getValue();

                            if (existeNombreCapa(nombrecapa) == true){
                                nombrecapa = numerarNombre(nombrecapa)                            
                            }

                            var newLeaf = createLeaf(nombrecapa, servidorWMS, {layers: record.data.name, transparent: 'true', format: 'image/png'},{isBaseLayer: false, visibility: false, singleTile: false});
                            if (node == null){
                                Ext.getCmp("layerTreePanel").getRootNode().appendChild(newLeaf);  
                            }else{
                                Ext.getCmp("layerTreePanel").getRootNode().findChild("id",node.attributes.id,true).appendChild(newLeaf);  
                            }    

                            app.map.raiseLayer(app.map.getLayersByName("wfsLayer")[0],1);
                            app.map.raiseLayer(app.map.getLayersByName("Location")[0],1);

                    });
                }
            })
        ]        
    });
    
    return capabilitiesGrid;
    
};

componentes.capabilitiesCombo = function(){
    
    var capabilitiesCombo = new Ext.form.ComboBox({
        store: app.wmsServerStore,
        width: 455,
        valueField: 'url',
        displayField: 'nombre', 
        emptyText: "Servidores WMS",
        editable: false,
        triggerAction: 'all', // needed so that the combo box doesn't filter by its current content
        mode: 'local', // keep the combo box from forcing a lot of unneeded data refreshes
        listeners: {
            select: function() {  
                var store = capabilitiesGrid.getStore();
                store.proxy.conn.url = getCapabilitiesUrl(capabilitiesCombo.getValue());
                store.load();
            }
        }
    });
    
    return capabilitiesCombo;
    
};

componentes.servidoresWmsButton = function(){
    
    var servidoresWmsButton = new Ext.Toolbar.Button({
        tooltip: 'Servidores WMS',
        icon: 'img/server.png',
        handler: function(){

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
               ]
           }); 

           var informationButton = new Ext.Toolbar.Button({
               text:"Información",
               tooltip: 'Información',
               icon: 'img/information.png',
               handler: function(){

                  var url = wmsServersGridPanel.getSelectionModel().getSelected().data.url;                            

                  var service, name, title, abstract, contactPerson, contactOrganization, contactPosition;
                  var addressType, address, city, stateOrProvince, postCode, country, contactVoiceTelephone;
                  var contactFacsimileTelephone, contactElectronicMailAddress;

                  var infomask = new Ext.LoadMask(servidoresWindow.el, {msg:"Conectando..."});
                  infomask.show();

                  Ext.Ajax.request({
                      url : getCapabilitiesUrl(url), 
                      method: 'GET',
                      success: function ( result, request )
                      { 
                          infomask.hide();

                          var parser = new DOMParser();
                          var xmlDoc = parser.parseFromString(result.responseText,"text/xml");

                          try{service = xmlDoc.getElementsByTagName("Service")[0];}catch(e){};
                          try{name = service.getElementsByTagName("Name")[0].textContent;}catch(e){};
                          try{title = service.getElementsByTagName("Title")[0].textContent;}catch(e){};
                          try{abstract = service.getElementsByTagName("Abstract")[0].textContent;}catch(e){};
                          try{contactPerson = service.getElementsByTagName("ContactPerson")[0].textContent;}catch(e){};
                          try{contactOrganization = service.getElementsByTagName("ContactOrganization")[0].textContent;}catch(e){};
                          try{contactPosition = service.getElementsByTagName("ContactPosition")[0].textContent;}catch(e){};
                          try{addressType = service.getElementsByTagName("AddressType")[0].textContent;}catch(e){};
                          try{address = service.getElementsByTagName("Address")[0].textContent;}catch(e){};
                          try{city = service.getElementsByTagName("City")[0].textContent;}catch(e){};
                          try{stateOrProvince = service.getElementsByTagName("StateOrProvince")[0].textContent;}catch(e){};
                          try{postCode = service.getElementsByTagName("PostCode")[0].textContent;}catch(e){};
                          try{country = service.getElementsByTagName("Country")[0].textContent;}catch(e){};
                          try{contactVoiceTelephone = service.getElementsByTagName("ContactVoiceTelephone")[0].textContent;}catch(e){};
                          try{contactFacsimileTelephone = service.getElementsByTagName("ContactFacsimileTelephone")[0].textContent;}catch(e){};
                          try{contactElectronicMailAddress = service.getElementsByTagName("ContactElectronicMailAddress")[0].textContent;}catch(e){};

                          new Ext.Window({
                              title: wmsServersGridPanel.getSelectionModel().getSelected().data.nombre,
                              iconCls: 'configuracionIcon',
                              layout: "anchor",
                              resizable: false,   
                              items: [
                                  new Ext.Panel({
                                      border: false,
                                      autoScroll: true,
                                      width: "100%",
                                      heigth: "100%",
                                      items: new Ext.FormPanel({
                                           labelWidth: 85, // label settings here cascade unless overridden
                                           frame:true,
                                           border: false,
                                           width: 380,
                                           items: [
                                               new Ext.form.FieldSet({
                                                  title: "WMS",
                                                  items: [
                                                      new Ext.form.TextField({
                                                           fieldLabel: 'Nombre',
                                                           width: 255,
                                                           readOnly: true,
                                                           value: name
                                                      }),  
                                                      new Ext.form.TextField({
                                                           fieldLabel: 'Título',
                                                           width: 255,
                                                           readOnly: true,
                                                           value: title
                                                      }),   
                                                      new Ext.form.TextArea({
                                                          fieldLabel: 'Descripción',
                                                          width: 255,
                                                          readOnly: true,
                                                          value: abstract
                                                      })                                                 
                                                  ]
                                               }),
                                               new Ext.form.FieldSet({
                                                  title: "Contacto",
                                                  items: [
                                                      new Ext.form.TextField({
                                                           fieldLabel: 'Nombre',
                                                           width: 255,
                                                           readOnly: true,
                                                           value: contactPerson
                                                      }),  
                                                      new Ext.form.TextField({
                                                           fieldLabel: 'Organización',
                                                           width: 255,
                                                           readOnly: true,
                                                           value: contactOrganization
                                                      }),  
                                                      new Ext.form.TextField({
                                                           fieldLabel: 'Posición',
                                                           width: 255,
                                                           readOnly: true,
                                                           value: contactPosition
                                                      }),  
                                                      new Ext.form.TextField({
                                                           fieldLabel: 'Tipo de dirección',
                                                           width: 255,
                                                           readOnly: true,
                                                           value: addressType
                                                      }),  
                                                      new Ext.form.TextField({
                                                           fieldLabel: 'Dirección',
                                                           width: 255,
                                                           readOnly: true,
                                                           value: address
                                                      }),  
                                                      new Ext.form.TextField({
                                                           fieldLabel: 'Ciudad',
                                                           width: 255,
                                                           readOnly: true,
                                                           value: city
                                                      }),  
                                                      new Ext.form.TextField({
                                                           fieldLabel: 'Provincia o estado',
                                                           width: 255,
                                                           readOnly: true,
                                                           value: stateOrProvince
                                                      }),  
                                                      new Ext.form.TextField({
                                                           fieldLabel: 'Código Postal',
                                                           width: 255,
                                                           readOnly: true,
                                                           value: postCode
                                                      }),  
                                                      new Ext.form.TextField({
                                                           fieldLabel: 'País',
                                                           width: 255,
                                                           readOnly: true,
                                                           value: country
                                                      }),  
                                                      new Ext.form.TextField({
                                                           fieldLabel: 'Teléfono',
                                                           width: 255,
                                                           readOnly: true,
                                                           value: contactVoiceTelephone
                                                      }),  
                                                      new Ext.form.TextField({
                                                           fieldLabel: 'Fax',
                                                           width: 255,
                                                           readOnly: true,
                                                           value: contactFacsimileTelephone
                                                      }),  
                                                      new Ext.form.TextField({
                                                           fieldLabel: 'Email',
                                                           width: 255,
                                                           readOnly: true,
                                                           value: contactElectronicMailAddress
                                                      })
                                                  ]
                                               })                                         
                                           ]
                                       })
                                  })

                              ]                                            
                          }).show();
                      },
                      failure: function(){
                          infomask.hide();
                          Ext.MessageBox.alert('Error', 'Ha ocurrido un error en la conexión con el servidor indicado.');
                      },
                      listeners: {
                           requestexception: function(){
                                infomask.hide();
                                Ext.MessageBox.alert('Error', 'Ha ocurrido un error en la conexión con el servidor indicado.');
                           }
                      }
                  });

               }
           });

           var servidoresWindow = new Ext.Window({
               title: "Servidores WMS",
               iconCls: 'serverIcon',
               layout: "fit",
               width: 500,
               height:300,
               resizable: false,
               autoScroll: true,
               shadow: false,
               bbar: [
                   "->",
                   informationButton,                            
                   new Ext.Toolbar.Button({
                       tooltip: 'Agregar servidor WMS',
                       text: "Agregar",
                       icon: 'img/server-plus.png',
                       handler: function(){

                           var nombre, wms_url;
                           Ext.MessageBox.prompt('Agregar servidor WMS', 'Nombre del servidor', function(btn, text){
                               if (btn == "ok"){
                                   nombre = text;
                                   if(app.wmsServerStore.getById(nombre) == null){
                                       Ext.MessageBox.prompt('Agregar servidor WMS', 'URL del servidor', function(btn, text){
                                           if (btn == "ok"){
                                               wms_url = text;
                                               app.wmsServerStore.loadData([[nombre,wms_url]],true);
                                           }
                                       })
                                   }else{
                                       Ext.MessageBox.alert('Error', 'Ya existe un servido con ese nombre');
                                   }
                               }
                           });                            

                       }
                   }),
                   new Ext.Toolbar.Button({
                       tooltip: 'Eliminar servidor WMS',
                       text: "Eliminar",
                       icon: 'img/server-minus.png',
                       handler: function(){

                           wmsServersGridPanel.getSelectionModel().each(function(record){

                                   app.wmsServerStore.remove(app.wmsServerStore.getById(record.id));

                           });                            

                       }
                   })
               ],
               items: [wmsServersGridPanel]                
           }).show();
        }
    });
    
    return servidoresWmsButton;
    
    
};