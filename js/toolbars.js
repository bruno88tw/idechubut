
toolbars.getMapPanelTopBar = function(){
    
    var mapPanelToolbar = [
            componentes.getNavegacionButton(),
            componentes.getZoomToMaxExtentButton(),
            componentes.getZoomInButton(),

            new GeoExt.Action({
                control: new OpenLayers.Control.ZoomBox({out: true}),
                map: app.map,
                icon: "img/magnifier-zoom-out.png",
                toggleGroup: "nav",
                tooltip: "Zoom out"
            }),

            new GeoExt.Action({
                icon: "img/history-zoom-left.png",
                control: app.map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0].previous,
                disabled: true,
                tooltip: "Zoom anterior"
            }),

            new GeoExt.Action({
                icon: "img/history-zoom-right.png",
                control: app.map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0].next,
                disabled: true,
                tooltip: "Zoom posterior"
            }),

             new GeoExt.Action({
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
             }),

             new GeoExt.Action({
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
             }),

             new GeoExt.Action({
                     control: app.map.getControlsByClass('OpenLayers.Control.WMSGetFeatureInfo')[0],
                     map: app.map,
                     icon: "img/cursor-info.png",
                     toggleGroup: "nav",
                     tooltip: "Obtener información"
             }),    
             "&nbsp",
             new GeoExt.form.GeocoderComboBox({       
                layer: app.map.getLayersByName("Location")[0],
                emptyText: "Buscar un lugar ..",
                map: app.map,                
                bounds: app.max_bounds,
                border: false,
                width: 246,
                heigh:100,
                boxMaxHeight: 100,
                boxMinHeight: 100
            }),
             "->",
             {
                icon: 'img/gear.png',
                tooltip: 'Configuración',
                menu: new Ext.menu.Menu({
                    id: 'mainMenu',
                    style: {
                        overflow: 'visible'     // For the Combo popup
                    },
                    items: [
                        {
                            text: 'Título',
                            checked: false,
                            checkHandler: function(){
                                var titulodiv = document.getElementById("titulodiv");
                                if (this.checked){
                                    titulodiv.style.display = "block"; 
                                }else{
                                    titulodiv.style.display = "none";
                                }
                            }

                        }, 
                        new Ext.Toolbar.Button({
                           text: "Cambiar título",
                           width: 105,
                           handler: function(){         
                               Ext.MessageBox.prompt('Título', '', function(btn, text){
                                   if (btn == "ok"){
                                       document.getElementById("titulodiv").innerHTML = text;
                                   }
                               });
                           }
                        }),
                        {
                            text: 'Subtítulo',
                            checked: false,
                            checkHandler: function(){
                                var subtitulodiv = document.getElementById("subtitulodiv");
                                if (this.checked){
                                    subtitulodiv.style.display = "block"; 
                                }else{
                                    subtitulodiv.style.display = "none";
                                }
                            }
                        }, 
                        new Ext.Toolbar.Button({
                           text: "Cambiar subtítulo",
                           width: 105,
                           handler: function(){   
                               Ext.MessageBox.prompt('Subtítulo', '', function(btn, text){
                                   if (btn == "ok"){
                                       document.getElementById("subtitulodiv").innerHTML = text;
                                   }
                               });

                           }
                        }),
                        {
                            text: 'Leyenda',
                            checked: false,
                            checkHandler: function(){                                          
                                var legenddiv = document.getElementById("legenddiv");
                                if (this.checked){
                                    legenddiv.style.display = "block";
                                    Ext.getCmp("legendPanelOnMap").setHeight(Ext.getCmp("mapPanel").getHeight() - 74);
                                }else{
                                    legenddiv.style.display = "none";
                                }
                                acomodarScaleline();
                                acomodarNavegador();
                            }
                        },                          
                        {
                            text: 'Navegador',
                            checked: true,
                            checkHandler: function(){                                          
                                if (this.checked){
                                    app.map.addControl(new OpenLayers.Control.PanZoomBar(),new OpenLayers.Pixel(134,17)); 
                                }else{
                                    app.map.removeControl(app.map.getControlsByClass('OpenLayers.Control.PanZoomBar')[0]); 
                                }
                            }
                        },                             
                        {
                            text: 'Escala',
                            checked: true,
                            checkHandler: function(){
                                var scalelinediv = document.getElementById("scalelinediv");
                                if (this.checked){
                                    scalelinediv.style.display = "block";
                                }else{
                                    scalelinediv.style.display = "none";
                                }
                            }
                        },
                        {
                            text: 'Minimapa',
                            checked: true,
                            checkHandler: function(){
                                var minimapcontainer = document.getElementById("minimapcontainer");
                                if (this.checked){
                                    minimapcontainer.style.display = "block";

                                }else{
                                    minimapcontainer.style.display = "none";
                                }

                            }
                        },
                        {
                            text: 'Norte',
                            checked: true,
                            checkHandler: function(){
                                var rosa = document.getElementById("rosa");
                                if (this.checked){
                                    rosa.style.display = "block";
                                }else{
                                    rosa.style.display = "none";
                                }
                            }
                        },
                        {
                            text: 'Grilla',
                            checked: false,
                            checkHandler: function(){
                                if (this.checked){
                                    app.map.addControl(new OpenLayers.Control.Graticule({visible:true, layerName: 'Grilla', displayInLayerSwitcher:false, labelSymbolizer: new OpenLayers.Symbolizer.Text({fontSize:9})}));
                                }else{
                                    app.map.removeLayer(app.map.getLayersByName("Grilla")[0]);
                                    app.map.removeControl(app.map.getControlsByClass('OpenLayers.Control.Graticule')[0]);
                                }
                            }
                        }                                                          
                    ]
                })
            },

            new Ext.Toolbar.Button({
                 tooltip: 'Imprimir',
                 icon: 'img/printer.png',
                 handler: function(){

                    var divmap = document.getElementById("mapPanel").getElementsByClassName('x-panel-body')[0];
                    var mapp = Ext.getCmp("mapPanel");
                    var height = mapp.lastSize.height;
                    var width = mapp.lastSize.width;

                    var mywindow = window.open('', '_blank', 'location=no, scrollbars=no, menubar=no, status=no, titlebar=no, center=1, height='+ height + ',width=' + width);       
                    mywindow.document.write('<html><head><title>Imprimir mapa</title>');
                    mywindow.document.write('<link rel="stylesheet" type="text/css" href="css/style.css">');
                    mywindow.document.write('<link rel="stylesheet" type="text/css" href="js/libs/ext-3.4.0/resources/css/ext-all.css">');
                    mywindow.document.write('<link rel="stylesheet" type="text/css" href="js/libs/ext-3.4.0/resources/css/xtheme-gray.css">');                                                    
                    mywindow.document.write('<link rel="stylesheet" type="text/css" href="js/libs/OpenLayers-2.12/theme/default/style.css">');
                    mywindow.document.write('<script type="text/javascript" src="js/libs/OpenLayers-2.12/OpenLayers.js"></script>');
                    mywindow.document.write('<script>function load(){window.print();window.close()}</script>');
                    mywindow.document.write('</head><body onload="load()" style="margin: 0;padding: 0;">');
                    mywindow.document.write(divmap.innerHTML);
                    mywindow.document.write('</body></html>');
                    mywindow.document.close();
                    mywindow.focus();            

                 }
             }),

             new Ext.Toolbar.Button({
                 tooltip: 'Ayuda',
                 icon: 'img/question.png',
                 handler: function(){
                     var window = new Ext.Window({
                         title: "Ayuda",
                         iconCls: 'ayudaIcon',
                         layout: "fit",
                         width: 300,
                         height:300,
                         resizable: false,
                         items: [
                             new Ext.Panel({
                                 bodyStyle: 'padding:5px',
                                 border: false,
                                 width: "100%",
                                 heigth: "100%",
                                 html: "En desarrollo..."
                             })
                         ]
                     });
                     window.show();
                 }
             }),

             new Ext.Toolbar.Button({
                 tooltip: 'Acerca de',
                 icon: 'img/star.png',
                 handler: function(){
                     var window = new Ext.Window({
                         title: "Acerca de",
                         iconCls: 'acercaDeIcon',
                         layout: "fit",
                         width: 300,
                         height:300,
                         resizable: false,
                         items: [
                             new Ext.Panel({
                                 bodyStyle: 'padding:5px',
                                 border: false,
                                 width: "100%",
                                 heigth: "100%",
                                 html: "En desarrollo..."
                             })
                         ]
                     });
                     window.show();
                 }
             })               

    ];
    
    return mapPanelToolbar;
    
};

toolbars.getMapPanelBottomBar = function(){
    
    var mapPanelBottomBar = [
        /*
         * Herramienta de resolución
         */
        new Ext.form.ComboBox({
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
        }),
        "->",
        "<div id='position'></div>"
    ];
    
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
    
    return mapPanelBottomBar;
    
};

toolbars.getTreePanelTopBar = function(){
    
    var treePanelTopBar = [ 
        /*
         * Botón para agregar nuevas capas
         */
        new Ext.Toolbar.Button({
            tooltip: 'Agregar capa',
            icon: 'img/map-plus.png',
            id: "treePanelTopbarAgregar",
            handler: function(){
                agregarCapas(null);
            }
        }),
        /*
         * Botón para visualizar y modificar el orden de las capas
         */
        new Ext.Toolbar.Button({
            tooltip: 'Orden',
            icon: 'img/maps-stack.png',
            enableToggle: true,
            allowDepress: true,
            handler: function(){        
                if(this.pressed){
                    Ext.getCmp("treePanelTopbarAgregar").disable();
                    Ext.getCmp("treePanelTopbarAgregarCarpeta").disable();
                    Ext.getCmp("treePanelTopbarExpandir").disable();
                    Ext.getCmp("treePanelTopbarColapsar").disable();
                    Ext.getCmp("treePanelBottombarImportar").disable();
                    Ext.getCmp("treePanelBottombarExportar").disable();  
                    Ext.getCmp("layerTreePanel").root = null;
                    Ext.getCmp("layerTreePanel").setRootNode(new GeoExt.tree.OverlayLayerContainer({
                        text: "Solo overlays",
                        icon: "img/layers.png",
                        map: app.map,
                        expanded: false
                    }));
                }else{
                    Ext.getCmp("treePanelTopbarAgregar").enable();
                    Ext.getCmp("treePanelTopbarAgregarCarpeta").enable();
                    Ext.getCmp("treePanelTopbarExpandir").enable();
                    Ext.getCmp("treePanelTopbarColapsar").enable();
                    Ext.getCmp("treePanelBottombarImportar").enable();
                    Ext.getCmp("treePanelBottombarExportar").enable();
                    Ext.getCmp("layerTreePanel").setRootNode(app.rootnode);
                }
            }
        }),
        /*
         * Botón para agregar una nueva carpeta al árbol de capas
         */
        new Ext.Toolbar.Button({
            tooltip: 'Agregar carpeta',
            icon: 'img/folder-add.png',
            id: "treePanelTopbarAgregarCarpeta",
            handler: function(){
               var newFolder = createNode("Nueva carpeta");
               Ext.getCmp("layerTreePanel").getRootNode().appendChild(newFolder);
               setFolderName(newFolder);
            }
        }),  
        /*
         * Botón para expandir todo el árbol de capas
         */
        new Ext.Toolbar.Button({
            tooltip: 'Expandir todo',
            icon: 'img/list-add.png',
            id: "treePanelTopbarExpandir",
            handler: function(){
               expandAll(Ext.getCmp("layerTreePanel").getRootNode());
            }
        }),
        /*
         * Botón para colapsar todo el árbol de capas
         */
        new Ext.Toolbar.Button({
            tooltip: 'Colapsar todo',
            icon: 'img/list-remove.png',
            id: "treePanelTopbarColapsar", 
            handler: function(){
               collapseAll(Ext.getCmp("layerTreePanel").getRootNode());
            }
        })
    ];
    
    return treePanelTopBar;
    
};

toolbars.getTreePanelBottomBar = function(){
    
    var treePanelBottomBar = [ 
        /*
         * Menú de selección de capa base
         */
        {
            icon: "img/map.png",
            text: "Mapa Base",
            menu: new Ext.menu.Menu({
                items: [
                    {
                        text: "Google Streets",
                        iconCls: "googleIcon",
                        handler: function(){app.map.setBaseLayer(app.map.getLayersByName("Google Streets")[0]);}
                    },
                    {
                        text: "Google Terrain",
                        iconCls: "googleIcon",
                        handler: function(){app.map.setBaseLayer(app.map.getLayersByName("Google Terrain")[0]);}
                    },
                    {
                        text: "Google Satellite",
                        iconCls: "googleIcon",
                        handler: function(){map.setBaseLayer(map.getLayersByName("Google Satellite")[0]);}
                    },
                    {
                        text: "Google Hybrid",
                        iconCls: "googleIcon",
                        handler: function(){app.map.setBaseLayer(app.map.getLayersByName("Google Hybrid")[0]);}
                    },
                    {
                        text: "OpenStreetMap",
                        iconCls: "osmIcon",
                        handler: function(){app.map.setBaseLayer(app.map.getLayersByName("OpenStreetMap")[0]);}
                    },                                
                    {
                        text: "Bing Road",
                        iconCls: "bingIcon",
                        handler: function(){app.map.setBaseLayer(app.map.getLayersByName("Bing Road")[0]);}
                    },
                    {
                        text: "Bing Aerial",
                        iconCls: "bingIcon",
                        handler: function(){app.map.setBaseLayer(app.map.getLayersByName("Bing Aerial")[0]);}
                    },
                    {
                        text: "Bing Hybrid",
                        iconCls: "bingIcon",
                        handler: function(){app.map.setBaseLayer(app.map.getLayersByName("Bing Hybrid")[0]);}
                    },
                    {
                        text: "mapquest",
                        iconCls: "mapQuestIcon",
                        handler: function(){app.map.setBaseLayer(app.map.getLayersByName("mapquest")[0]);}
                    },
                    {
                        text: "mapquestAerial",
                        iconCls: "mapQuestIcon",
                        handler: function(){app.map.setBaseLayer(app.map.getLayersByName("mapquestAerial")[0]);}
                    }                       
                ]
            })
        },
        "->",
        /*
         * Herramienta para importar el árbol de capas
         */
        new Ext.Toolbar.Button({
            tooltip: 'Importar capas',
            icon: 'img/folder-open.png',
            id: "treePanelBottombarImportar",
            handler: onImportarCapas
        }),
        /*
         * Herramientas para exportar el árbol de capas
         */
        new Ext.Toolbar.Button({
            tooltip: 'Guardar capas',
            icon: 'img/folder-save.png',
            id: "treePanelBottombarExportar",
            handler: onGuardarCapas
        })        
    ];
    
    return treePanelBottomBar;
    
};

toolbars.getFeatureGridPanelTopBar = function(){
    
    featureGridPanelTopBar = [
        /*
         * Herramienta de reconocimiento
         */
        new Ext.Toolbar.Button({
            id: "wfsReconocerButton",
            tooltip: 'Reconocer',
            text:"Reconocer",
            icon: 'img/cursor-question.png',
            toggleGroup: "nav", 
            allowDepress: true,
            listeners: {
               toggle: function(){

                   if(app.wfsReconocerControl != null){
                       if(this.pressed){
                           app.wfsReconocerControl.activate();
                       }else{
                           app.wfsReconocerControl.deactivate();
                       }                    
                   }

               }
            }
        }), 
        /*
         * Herramienta de selección
         */
        new Ext.Toolbar.Button({
            id: "wfsSeleccionarButton",
            tooltip: 'Seleccionar',
            text:"Seleccionar",
            icon: 'img/cursor.png',
            toggleGroup: "nav", 
            allowDepress: true,
            listeners: {
               toggle: function(){
                   if(app.wfsSelectControl != null){
                       if(this.pressed){
                           app.wfsSelectControl.activate();
                       }else{
                           app.wfsSelectControl.deactivate();
                       }                    
                   }
               }
            }
        }), 
        /*
         * Herramienta de limpieza
         */
        new Ext.Toolbar.Button({
            tooltip: 'Limpiar',
            text:"Limpiar",
            icon: 'img/broom.png',
            handler: function(){
               app.map.getLayersByName("wfsLayer")[0].removeAllFeatures();
            }
        }),
        "->",
        /*
         * Herramienta de exportación a excel
         */
        new Ext.ux.Exporter.Button({store: app.wfsStoreExport})
    ];
    
    return featureGridPanelTopBar;
    
};







/*
 * Posiciona la escala en el mapa de acuerdo a la configuración de componentes actuales
 */
function acomodarScaleline(){
    
    var legendpanelcss = document.getElementById("legenddiv").style;
    var scalelinecss = document.getElementById("scalelinediv").style;
    var left;
    var bottom;
    if(legendpanelcss.display == "block"){
        left = "270px";                        
    }else{
        left = "10px";       
    }
    
    bottom = "5px";      

    scalelinecss.left = left;
    scalelinecss.bottom = bottom;    
    
}

/*
 * Posiciona el navegador en el mapa de acuerdo a la configuración de componentes actuales
 */
function acomodarNavegador(){

    var legendpanelcss = document.getElementById("legenddiv").style;
    var existeNavegador = app.map.getControlsByClass('OpenLayers.Control.PanZoomBar')[0];
    var left;
    var top;
    
    if(existeNavegador != null){
        
        if(legendpanelcss.display == "block"){
            left = 134;                        
        }else{
            left = 6;       
        }
        top = 2;                  
        
        app.map.removeControl(app.map.getControlsByClass('OpenLayers.Control.PanZoomBar')[0]);   
        app.map.addControl(new OpenLayers.Control.PanZoomBar(),new OpenLayers.Pixel(left,top));                                             
             
    }
     
    
}