var tbar = [];

var toolbar1;

function getTopBar(){        
    
    toolbar1 = [
            new GeoExt.Action({
                control: new OpenLayers.Control.Navigation(),
                map: map,
                icon: "img/move2.png",
                toggleGroup: "nav",
                tooltip: "Navegación",
                checked: true
            }),

            new GeoExt.Action({
                control: new OpenLayers.Control.ZoomToMaxExtent(),
                map: map,
                icon: "img/magnifier-zoom-fit.png",
                tooltip: 'Zoom a la máxima extensión'
            }),

            new GeoExt.Action({
                control: new OpenLayers.Control.ZoomBox(),
                map: map,
                icon: "img/magnifier-zoom-in.png",
                toggleGroup: "nav",
                tooltip: "Zoom in"
            }),

            new GeoExt.Action({
                control: new OpenLayers.Control.ZoomBox({out: true}),
                map: map,
                icon: "img/magnifier-zoom-out.png",
                toggleGroup: "nav",
                tooltip: "Zoom out"
            }),

            new GeoExt.Action({
                icon: "img/history-zoom-left.png",
                control: map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0].previous,
                disabled: true,
                tooltip: "Zoom anterior"
            }),

            new GeoExt.Action({
                icon: "img/history-zoom-right.png",
                control: map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0].next,
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
                 map: map,
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
                 map: map,
                 toggleGroup: "nav",
                 icon: 'img/rulerarea.png',
                 tooltip: "Medidor de superficie"
             }),

             new GeoExt.Action({
                     control: map.getControlsByClass('OpenLayers.Control.WMSGetFeatureInfo')[0],
                     map: map,
                     icon: "img/cursor-info.png",
                     toggleGroup: "nav",
                     tooltip: "Obtener información"
             }),                      
             "->",
//             new Ext.Button({
//                tooltip: "Mostrar/Ocultar capas",
//                icon: "img/panel-left.png",
//                handler: function(){     
//                    var treepanelcss = document.getElementById("layersPanelDiv").style;
//                    if(treepanelcss.display == "block" || treepanelcss.display == ""){
//                        treepanelcss.display = "none";
//                    }else{
//                        treepanelcss.display = "block";                          
//                    }
//                    acomodarNavegador();
//                    acomodarScaleline();
//                    acomodarResolucion(); 
//                    acomodarGeocoder();
//                    acomodarHerramientas();
//                    acomodarStatusBar();
//                }
//             }),
//             new Ext.Button({
//                tooltip: "Mostrar/Ocultar atributos",
//                icon: "img/panel-bottom.png",
//                handler: function(){      
//                    var attributepanelcss = document.getElementById("wfsdiv").style;
//                    if(attributepanelcss.display == "block"){
//                        attributepanelcss.display = "none";
//                    }else{
//                        attributepanelcss.display = "block";
//                    }
//                    acomodarResolucion();
//                    acomodarScaleline();
//                    acomodarPosicion();
//                    acomodarMinimap();                    
//                }
//             }),             
//             new Ext.Button({
//                tooltip: "Mostrar/Ocultar leyenda",
//                icon: "img/panel-right.png",
//                handler: function(){        
//                    var legendpanelcss = document.getElementById("legenddiv").style;
//                    
//                    if(legendpanelcss.marginRight == "0px" || legendpanelcss.marginRight == ""){
//                        legendpanelcss.marginRight = "-280px";
//                    }else{
//                        legendpanelcss.marginRight = "0px";
//                    }                    
//                    acomodarMinimap();
//                    acomodarRosa();    
//                    acomodarHerramientas();
//                    acomodarStatusBar();
//
//                }
//             }),
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
                                }else{
                                    legenddiv.style.display = "none";
                                }
                                Ext.getCmp("legendPanel").setHeight(mapPanel.getHeight() - 20);
                                acomodarScaleline();
                                acomodarResolucion();
                                acomodarGeocoder();
                                acomodarNavegador();
                            }
                        },                          
                        {
                            text: 'Navegador',
                            checked: true,
                            checkHandler: function(){                                          
                                if (this.checked){
                                    map.addControl(new OpenLayers.Control.PanZoomBar(),new OpenLayers.Pixel(134,17)); 
                                }else{
                                    map.removeControl(map.getControlsByClass('OpenLayers.Control.PanZoomBar')[0]); 
                                }
                            }
                        },
                        {
                            text: 'Localizador',
                            checked: true,
                            checkHandler: function(){                                          
                                var geocoderdiv = document.getElementById("geocoderdiv");
                                if (this.checked){
                                    geocoderdiv.style.display = "block";
                                }else{
                                    geocoderdiv.style.display = "none";
                                }
                                acomodarNavegador();
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
                            text: 'Resolucion',
                            checked: true,
                            checkHandler: function(){
                                var scalecombodiv = document.getElementById("scalecombodiv");
                                if (this.checked){
                                    scalecombodiv.style.display = "block";                                    
                                }else{
                                    scalecombodiv.style.display = "none";
                                }
                                acomodarScaleline();
                            }
                        },
                        {
                            text: 'Posición',
                            checked: true,
                            checkHandler: function(){
                                var posicioncontainer = document.getElementById("position");
                                if (this.checked){
                                    posicioncontainer.style.display = "block";
                                }else{
                                    posicioncontainer.style.display = "none";
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
                                    map.addControl(new OpenLayers.Control.Graticule({visible:true, layerName: 'Grilla', displayInLayerSwitcher:false, labelSymbolizer: new OpenLayers.Symbolizer.Text({fontSize:9})}));
                                }else{
                                    map.removeLayer(map.getLayersByName("Grilla")[0]);
                                    map.removeControl(map.getControlsByClass('OpenLayers.Control.Graticule')[0]);
                                }
                            }
                        }                                                          
                    ]
                })
            },

            new Ext.Toolbar.Button({
                 tooltip: 'Imprimir',
        //         text: "Imprimir",
                 icon: 'img/printer.png',
                 handler: function(){

                    var divmap = document.getElementById("mapPanel").parentNode;
                    var mapp = Ext.getCmp("mapPanel");
                    var height = mapp.lastSize.height;
                    var width = mapp.lastSize.width;

                    var mywindow = window.open('', '_blank', 'location=no, scrollbars=no, menubar=no, status=no, titlebar=no, center=1, height='+ height + ',width=' + width);       
                    mywindow.document.write('<html><head><title>Imprimir mapa</title>');
                    mywindow.document.write('<link rel="stylesheet" type="text/css" href="css/style.css">');
                    mywindow.document.write('<link rel="stylesheet" type="text/css" href="js/libs/ext-3.4.0/resources/css/ext-all.css">');
                    mywindow.document.write('<link rel="stylesheet" type="text/css" href="js/libs/ext-3.4.0/resources/css/xtheme-gray.css">');                                                    
                    mywindow.document.write('<link rel="stylesheet" type="text/css" href="js/libs/OpenLayers-2.12/theme/default/style.css">');
        //            mywindow.document.write('<style type="text/css">body {width: 1280px;height: 100px;}</style>');
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
        //         text: "Ayuda",
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

    ]
    
    return toolbar1;
   
}


function acomodarScaleline(){
    
    var legendpanelcss = document.getElementById("legenddiv").style;
    var scalelinecss = document.getElementById("scalelinediv").style;
    var scalecombocss = document.getElementById("scalecombodiv").style;
    var left;
    var bottom;
    if(legendpanelcss.display == "block" || legendpanelcss.display == ""){
        left = "270px";                        
    }else{
        left = "10px";       
    }
    
    if(scalecombocss.display == "block" || scalecombocss.display == ""){
        bottom = "35px";
    }else{
        bottom = "5px";
    }      

    scalelinecss.left = left;
    scalelinecss.bottom = bottom;    
    
}

function acomodarResolucion(){

    var legendpanelcss = document.getElementById("legenddiv").style;
    var scalecombocss = document.getElementById("scalecombodiv").style;
    var left;

    if(legendpanelcss.display == "block" || legendpanelcss.display == ""){
        left = "270px";                        
    }else{
        left = "10px";       
    }

    scalecombocss.left = left;
    
}

function acomodarNavegador(){

    var legendpanelcss = document.getElementById("legenddiv").style;
    var geocodercss = document.getElementById("geocoderdiv").style;
    var existeNavegador = map.getControlsByClass('OpenLayers.Control.PanZoomBar')[0];
    var left;
    var top;
    
    if(existeNavegador != null){
        
        if(legendpanelcss.display == "block" || legendpanelcss.display == ""){
            left = 134;                        
        }else{
            left = 6;       
        }
        
        if(geocodercss.display == "block" || geocodercss.display == ""){
            top = 17;
        }else{
            top = 2;
        }           
        
        map.removeControl(map.getControlsByClass('OpenLayers.Control.PanZoomBar')[0]);   
        map.addControl(new OpenLayers.Control.PanZoomBar(),new OpenLayers.Pixel(left,top));                                             
             
    }
     
    
}

function acomodarGeocoder(){
    
    var legendpanelcss = document.getElementById("legenddiv").style;
    var geocodercss = document.getElementById("geocoderdiv").style;
    var left;
    
    if(legendpanelcss.display == "block" || legendpanelcss.display == ""){
        left = "270px";                        
    }else{
        left = "10px";       
    }
    
    geocodercss.left = left;
        
}