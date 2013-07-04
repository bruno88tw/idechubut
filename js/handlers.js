/*
 * IDE Chubut
 * 
 * Escrito por Bruno J. Vecchietti
 * 
 * handlers.js
 * 
 * Contiene los handlers utilizados en los distintos componentes
 * 
 */

/*
 * Handler para la herramienta importar capas
 */
handler.onImportarCapasButton = function(){
    
    var inputTextArea = new Ext.form.TextArea({
        width: 276,
        height: 231,
        readOnly: false,
        emptyText: "Copie el contenido del archivo de exportación y haga click en 'Importar'"
    });

     var window = new Ext.Window({
         title: "Importar capas",
         iconCls: 'abrirIcon',
         layout: "anchor",
         width: 300,
         height:300,
         resizable: false,
         items: [                     
             new Ext.Panel({
                 bodyStyle: 'padding:5px',
                 border: false,
                 autoScroll: true,
                 width: "100%",
                 heigth: "100%",
                 items:[inputTextArea]
             })
         ],
         bbar:[
            "->", 
            new Ext.Toolbar.Button({
                tooltip: 'Importar',
                text: "Importar",
                icon: 'img/folder-open.png',
                handler: function(){

                    try {

                        var loadtree = JSON.parse(inputTextArea.getValue());

                        removeLayers(Ext.getCmp("layerTreePanel").getRootNode());
                        for(var i = 0; i < Ext.getCmp("layerTreePanel").getRootNode().childNodes.length; i++){
                            Ext.getCmp("layerTreePanel").getRootNode().childNodes[i].remove();
                        }
                        agregarDescendencia(Ext.getCmp("layerTreePanel").getRootNode(),loadtree[0]);   
                        restoreIndex(loadtree[1]);
                        window.close();

                    }catch (e){
                        Ext.MessageBox.alert('Error', 'Ha ocurrido un error. Compruebe que el archivo no esté vacío ni corrupto.');
                    }


                }
            })                  
         ]
     });
     window.show();      
        
}

/*
 * Handler para la herramienta exportar capas
 */
handler.onExportarCapasButton = function(){
    
    var savetree = [];
    index = [];
    saveLayerTree(savetree,Ext.getCmp("layerTreePanel").getRootNode().childNodes); 
    index = saveLayerIndex();
    var jsonobject = JSON.stringify([savetree,index]);

    var inputTextArea = new Ext.form.TextArea({
       width: 276,
       height: 231,
       readOnly: true,
       emptyText: "Haga click en 'Generar' para generar el archivo de exportación, luego haga triple click sobre el contenido y copie y pegue en un archivo local."
    });             

    var window = new Ext.Window({
        title: "Guardar capas",
        iconCls: 'guardarIcon',
        layout: "anchor",
        width: 300,
        height:300,
        resizable: false,
        items: [                     
            new Ext.Panel({
                bodyStyle: 'padding:5px',
                border: false,
                autoScroll: true,
                width: "100%",
                heigth: "100%",
                items:[inputTextArea]
            })
        ],
        bbar:[
           "->", 
           new Ext.Toolbar.Button({
               tooltip: 'Guardar capas',
               text: "Generar",
               icon: 'img/folder-save.png',
               handler: function(){                            

                   inputTextArea.setValue(jsonobject);

               }
           })                  
        ]
    });
    window.show();     
    
};

handler.onConfiguracionTituloCheckbox = function(){
   
    var titulodiv = document.getElementById("titulodiv");
    if (this.checked){
        titulodiv.style.display = "block"; 
    }else{
        titulodiv.style.display = "none";
    }   
   
};

handler.onConfiguracionCambiarTituloButton = function(){
    
    Ext.MessageBox.prompt('Título', 'Ingrese el texto', function(btn, text){
        if (btn == "ok"){
            document.getElementById("titulodiv").innerHTML = text;
        }
    });    
    
};

handler.onConfiguracionSubtituloCheckbox = function(){
    
    var subtitulodiv = document.getElementById("subtitulodiv");
    if (this.checked){
        subtitulodiv.style.display = "block"; 
    }else{
        subtitulodiv.style.display = "none";
    }
            
};

handler.onConfiguracionCambiarSubtituloButton = function(){
    
    Ext.MessageBox.prompt('Subtítulo', 'Ingrese el texto', function(btn, text){
        if (btn == "ok"){
            document.getElementById("subtitulodiv").innerHTML = text;
        }
    });    
    
};

handler.onConfiguracionLeyendaCheckbox = function(){
    
    var legenddiv = document.getElementById("legenddiv");
    if (this.checked){
        legenddiv.style.display = "block";
        Ext.getCmp("legendPanelOnMap").setHeight(Ext.getCmp("mapPanel").getHeight() - 74);
    }else{
        legenddiv.style.display = "none";
    }
    acomodarScaleline();
    acomodarNavegador();    
    
};

handler.onConfiguracionNavegadorCheckbox = function(){
    
    if (this.checked){
        app.map.addControl(new OpenLayers.Control.PanZoomBar(),new OpenLayers.Pixel(134,17)); 
    }else{
        app.map.removeControl(app.map.getControlsByClass('OpenLayers.Control.PanZoomBar')[0]); 
    }    
    
};

handler.onConfiguracionEscalaCheckbox = function(){
    
    var scalelinediv = document.getElementById("scalelinediv");
    if (this.checked){
        scalelinediv.style.display = "block";
    }else{
        scalelinediv.style.display = "none";
    }    
    
};

handler.ConfiguracionMinimapaCheckbox = function(){
    
    var minimapcontainer = document.getElementById("minimapcontainer");
    if (this.checked){
        minimapcontainer.style.display = "block";
    }else{
        minimapcontainer.style.display = "none";
    }    
    
};

handler.ConfiguracionNorteCheckbox = function(){
    
    var rosa = document.getElementById("rosa");
    if (this.checked){
        rosa.style.display = "block";
    }else{
        rosa.style.display = "none";
    }
    
};

handler.ConfiguracionGrillaCheckbox = function(){
    
    if (this.checked){
        app.map.addControl(new OpenLayers.Control.Graticule({visible:true, layerName: 'Grilla', displayInLayerSwitcher:false, labelSymbolizer: new OpenLayers.Symbolizer.Text({fontSize:9})}));
    }else{
        app.map.removeLayer(app.map.getLayersByName("Grilla")[0]);
        app.map.removeControl(app.map.getControlsByClass('OpenLayers.Control.Graticule')[0]);
    }    
    
};

handler.onImprimirButton = function(){
    
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
           
};

handler.onAyudaButton = function(){
    
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
    
};

handler.onAcercaDeButton = function(){
    
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
    
};

handler.onAgregarCapas = function(node){

    new Ext.Window({
        title: "Agregar nuevas capas",
        iconCls: 'layerIcon',
        layout: "fit",
        width: 500,
        height:300,
        resizable: false,
        autoScroll: true,
        shadow: false,
        items: [componentes.capabilitiesGridPanel()]
    }).show(); 
    
 };
 
handler.onOrdenDeCapasButton = function(){
     
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
     
};
 
handler.onAgregarCarpetaButton = function(){
     
    var newFolder = createNode("Nueva carpeta");
    Ext.getCmp("layerTreePanel").getRootNode().appendChild(newFolder);
    setFolderName(newFolder);     
     
};
 
handler.onExpandirTodoButton = function(){
     
    expandAll(Ext.getCmp("layerTreePanel").getRootNode());     
     
};

handler.onColapsarTodoButton = function(){
    
    collapseAll(Ext.getCmp("layerTreePanel").getRootNode());
    
};

handler.onGoogleStreets = function(){
    
    app.map.setBaseLayer(app.map.getLayersByName("Google Streets")[0]);
    
};

handler.onGoogleTerrain = function(){
    
    app.map.setBaseLayer(app.map.getLayersByName("Google Terrain")[0]);
    
};

handler.onGoogleSatellite = function(){
    
    map.setBaseLayer(map.getLayersByName("Google Satellite")[0]);
    
};

handler.onGoogleHibryd = function(){
    
    app.map.setBaseLayer(app.map.getLayersByName("Google Hybrid")[0]);
    
};

handler.onOpenStreetMap = function(){
    
    app.map.setBaseLayer(app.map.getLayersByName("OpenStreetMap")[0]);
    
};

handler.onBingRoad = function(){
    
    app.map.setBaseLayer(app.map.getLayersByName("Bing Road")[0]);
    
};

handler.onBingAerial = function(){
    
    app.map.setBaseLayer(app.map.getLayersByName("Bing Aerial")[0]);
    
};

handler.onBingHibryd = function(){
    
    app.map.setBaseLayer(app.map.getLayersByName("Bing Hybrid")[0]);
    
};

handler.onMapQuest = function(){
    
    app.map.setBaseLayer(app.map.getLayersByName("mapquest")[0]);
    
};

handler.onMapQuestAerial = function(){
    
    app.map.setBaseLayer(app.map.getLayersByName("mapquestAerial")[0]);
    
};

handler.onWfsReconocerButton = function(){
    
    if(app.wfsReconocerControl != null){
        if(Ext.getCmp("wfsReconocerButton").pressed){
            app.wfsReconocerControl.activate();
        }else{
            app.wfsReconocerControl.deactivate();
        }                    
    }    
    
};

handler.onWfsSeleccionarButton = function(){
    
    if(app.wfsSelectControl != null){
        if(Ext.getCmp("wfsSeleccionarButton").pressed){
            app.wfsSelectControl.activate();
        }else{
            app.wfsSelectControl.deactivate();
        }                    
    }    
    
};

handler.onWfsLimpiarButton = function(){
    
    app.map.getLayersByName("wfsLayer")[0].removeAllFeatures();
    
};