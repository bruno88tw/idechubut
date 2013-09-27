/**
 *  @file js/handler.js
 *  @author Bruno José Vecchietti <bruno88tw@gmial.com>
 *  @fileOverview Archivo en el que se definen los manejadores de los componentes.
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
 * Namespace de acceso a los manejadores.
 * @namespace
 */
var handler = {};

/**
 * Handler para la herramienta importar capas.
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onImportarCapasButton = function(){
    
    var inputTextArea = new Ext.form.TextArea({
        width: "97%",
        heigth: "97%",
        readOnly: false,
        emptyText: "Copie el contenido del archivo de exportación y haga click en 'Importar'"
    });

     var window = new Ext.Window({
         title: "Importar capas",
         iconCls: 'abrirIcon',
         layout: "fit",
         shadow: false,
         width: 300,
         height:300,
         resizable: false,
         items: [                     
             new Ext.Panel({
                 bodyStyle: 'padding:5px',
                 border: false,
                 autoScroll: true,
                 layout: "fit",
                 width: "100%",
                 heigth: "100%",
                 items:[inputTextArea]
             })
         ],
         bbar:[
            componentes.separador(), 
            new Ext.Button({
                tooltip: 'Importar',
                text: "Importar",
                icon: 'img/folder-open.png',
                handler: function(){

                    try {

                        var loadtree = JSON.parse(inputTextArea.getValue());
                        removeLayers(app.rootnode);
                        app.rootnode.removeAll();
//                        for(var i = 0; i < app.rootnode.childNodes.length; i++){
//                            app.rootnode.childNodes[0].remove();
//                        }
                        restoreTree(app.rootnode,loadtree[0]);   
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
        
};

/**
 * Handler para la herramienta exportar capas.
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onExportarCapasButton = function(){
    
    var savetree = [];
    index = [];
    saveLayerTree(savetree,Ext.getCmp("layerTreePanel").getRootNode().childNodes); 
//    savetree.splice(0,1);
    index = saveLayerIndex();
    var jsonobject = JSON.stringify([savetree,index]);

    var inputTextArea = new Ext.form.TextArea({
       width: "97%",
       heigth: "97%",
       readOnly: true,
       emptyText: "Haga click en 'Generar' para generar el archivo de exportación, luego haga triple click sobre el contenido y copie y pegue en un archivo local."
    });             

    var window = new Ext.Window({
        title: "Guardar capas",
        iconCls: 'guardarIcon',
        layout: "fit",
        shadow: false,
        width: 300,
        height:300,
        resizable: false,
        items: [                     
            new Ext.Panel({
                bodyStyle: 'padding:5px',
                border: false,
                layout: "fit",
                autoScroll: true,
                width: "100%",
                heigth: "100%",
                items:[inputTextArea]
            })
        ],
        bbar:[
           componentes.separador(), 
           new Ext.Button({
               tooltip: 'Guardar capas',
               text: "Generar",
               icon: 'img/folder-save.png',
               handler: function(){inputTextArea.setValue(jsonobject);}
           })                  
        ]
    });
    window.show();     
    
};

/**
* Handler correspondiente al evento asociado al checkbox de configuración "Título".
* @returns {undefined} Esta función no devuelve resultados.
*/
handler.onConfiguracionTituloCheckbox = function(){
   
    var titulodiv = document.getElementById("titulodiv");
    if (this.getValue() == true){
        app.configuracion.titulo = true;
        titulodiv.style.display = "block"; 
    }else{
        app.configuracion.titulo = false;
        titulodiv.style.display = "none";
    }
   
};

/**
 * Handler correspondiente al evento asociado al botón de configuración "Cambiar título".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onConfiguracionCambiarTituloButton = function(){
    
    Ext.MessageBox.prompt('Título', 'Ingrese el texto', function(btn, text){
        if (btn == "ok"){
            document.getElementById("titulodiv").innerHTML = text;
        }
    });    
    
};

/**
 * Handler correspondiente al evento asociado al checkbox de configuración "Subtítulo".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onConfiguracionSubtituloCheckbox = function(){    
    
    var subtitulodiv = document.getElementById("subtitulodiv");
    if (this.getValue() == true){
        app.configuracion.subtitulo = true;
        subtitulodiv.style.display = "block"; 
    }else{
        app.configuracion.subtitulo = false;
        subtitulodiv.style.display = "none";
    }
            
};

/**
 * Handler correspondiente al evento asociado al botón de configuración "Cambiar subtítulo".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onConfiguracionCambiarSubtituloButton = function(){
    
    Ext.MessageBox.prompt('Subtítulo', 'Ingrese el texto', function(btn, text){
        if (btn == "ok"){
            document.getElementById("subtitulodiv").innerHTML = text;
        }
    });    
    
};

/**
 * Handler correspondiente al evento asociado al checkbox de configuración "Leyenda".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onConfiguracionNavegadorCheckbox = function(){
    
    if (this.getValue() == true){
        app.configuracion.navegador = true;
        app.map.addControl(new OpenLayers.Control.PanZoomBar(),new OpenLayers.Pixel(6,3)); 
    }else{
        app.configuracion.navegador = false;
        app.map.removeControl(app.map.getControlsByClass('OpenLayers.Control.PanZoomBar')[0]);
    }   
    
};

/**
 * Handler correspondiente al evento asociado al checkbox de configuración "Leyenda".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onConfiguracionLeyendaCheckbox = function(){
    
    var legenddiv = document.getElementById("legenddiv");
    if (this.getValue() == true){
        app.configuracion.leyenda = true;
        legenddiv.style.display = "block";
    }else{
        app.configuracion.leyenda = false;
        legenddiv.style.display = "none";
    } 
    
};

/**
 * Handler correspondiente al evento asociado al checkbox de configuración "Escala".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onConfiguracionEscalaCheckbox = function(){
    
    var scalelinediv = document.getElementById("scalelinediv");
    if (this.getValue() == true){
        app.configuracion.escala = true;
        scalelinediv.style.display = "block";
    }else{
        app.configuracion.escala = false;
        scalelinediv.style.display = "none";
    }    
    
};

/**
 * Handler correspondiente al evento asociado al checkbox de configuración "Minimapa".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.ConfiguracionMinimapaCheckbox = function(){
    
    var minimapcontainer = document.getElementById("minimapcontainer");
    if (this.getValue() == true){
        app.configuracion.localizador = true;
        minimapcontainer.style.display = "block";
    }else{
        app.configuracion.localizador = false;
        minimapcontainer.style.display = "none";
    }    
    
};

/**
 * Handler correspondiente al evento asociado al checkbox de configuración "Norte".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.ConfiguracionNorteCheckbox = function(){
    
    var rosa = document.getElementById("rosa");
    if (this.getValue() == true){
        app.configuracion.norte = true;
        rosa.style.display = "block";
    }else{
        app.configuracion.norte = false;
        rosa.style.display = "none";
    }
    
};

/**
 * Handler correspondiente al evento asociado al checkbox de configuración "Grilla".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.ConfiguracionGrillaCheckbox = function(){
    
    if (this.getValue() == true){
        app.configuracion.grilla = true;
        app.map.addControl(new OpenLayers.Control.Graticule({visible:true, layerName: 'Grilla', displayInLayerSwitcher:false, labelSymbolizer: new OpenLayers.Symbolizer.Text({fontSize:9})}));
    }else{
        app.configuracion.grilla = false;
        app.map.removeLayer(app.map.getLayersByName("Grilla")[0]);
        app.map.removeControl(app.map.getControlsByClass('OpenLayers.Control.Graticule')[0]);
    }    
    
};

/**
 * Handler correspondiente al evento asociado al botón "Imprimir".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onImprimirButton = function(){
    
    Ext.getCmp("layerTreePanel").hide();
    Ext.getCmp("featureGridPanel").hide();
    Ext.getCmp("mapPanel").getTopToolbar().hide();
    Ext.getCmp("mapPanel").getBottomToolbar().hide();
    Ext.getCmp("viewportPanel").doLayout();
//    var divmap = document.getElementById("mapPanel").getElementsByClassName('x-panel-body')[0];
//    var mapp = Ext.getCmp("mapPanel");
//    var height = mapp.lastSize.height - 52;
//    var width = mapp.lastSize.width;
//
//    var mywindow = window.open('', '_blank', 'location=no, scrollbars=no, menubar=no, status=no, titlebar=no, center=1, height='+ height + ',width=' + width);       
//    mywindow.document.write('<html><head><title>Imprimir mapa</title>');
//    mywindow.document.write('<link rel="stylesheet" type="text/css" href="css/style.css">');
//    mywindow.document.write('<link rel="stylesheet" type="text/css" href="js/libs/ExtJS/resources/css/ext-all.css">');
//    mywindow.document.write('<link rel="stylesheet" type="text/css" href="js/libs/ExtJS/resources/css/xtheme-gray.css">');                                                    
//    mywindow.document.write('<link rel="stylesheet" type="text/css" href="js/libs/OpenLayers/theme/default/style.css">');
//    mywindow.document.write('<script type="text/javascript" src="js/libs/HTML2Canvas.js"></script>');    
//    mywindow.document.write('<script type="text/javascript" src="js/libs/OpenLayers/OpenLayers.js" ></script>');
////    mywindow.document.write('<script>function load(){html2canvas(document.body, {onrendered: function(canvas) {var dataUrl = canvas.toDataURL("image/png");console.log(dataUrl);}});}</scrim  imipt>');
////    mywindow.document.write('<script>function load(){window.print();window.close()}</script>');
//    mywindow.document.write('</head><body onload="load()" style="margin: 0;padding: 0;">');
//    mywindow.document.write(divmap.innerHTML);
//    mywindow.document.write('</body></html>');
//    mywindow.document.close();
//    mywindow.focus();    

    

//    html2canvas(divmap, {
//        "proxy":"/cgi-bin/html2canvasproxy.php",
//        "logging":true,
//        onrendered: function(canvas) {
//            var dataUrl = canvas.toDataURL("image/png");
//            console.log(dataUrl);
//        }
//    });

//    html2canvas( [ document.body ], {
//        "proxy":"/cgi-bin/html2canvas2.php",
//        "logging":true,
//        "allowTaint":true,
//        "taintTest":true,
//        "useCORS":true,
//        "onrendered": function(canvas) {
//            var uridata = canvas.toDataURL("image/png");
//            console.log(uridata);
//        }
//    });    
              
}; 

/**
 * Handler correspondiente al evento asociado al botón "Ayuda".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onAyudaButton = function(){   
    
    var window = new Ext.Window({
        title: "Ayuda",
        iconCls: 'ayudaIcon',
        layout: "border",
        shadow: false,
        width: 600,
        height:461,
        resizable: false,
        items: [
            new Ext.Panel({
                bodyStyle: 'padding:5px',
                border: false,
                region: "center",
                autoScroll: true,
                width: "100%",
                heigth: "100%",
                html: '<div style="font-size:small">\n\
                <div align="center" style="color:#333333;font-size:xx-large; background:#548DD4; padding-top:5px; padding-bottom:5px"><b>Ayuda</b></div></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Controles del mapa</b></div></br>\n\
                <img src="img/move2.png" alt="ayuda">&nbsp&nbsp&nbspLa herramienta de paneo permite desplazarse por el mapa. Al hacer doble click sobre un punto del mapa se realiza un acercamiento a dicha zona. Del mismo modo puede utilizarse el scroll del mouse para acercarse o alejarse a una zona del mapa. </br></br>\n\
                <img src="img/magnifier-zoom-fit.png" alt="ayuda">&nbsp&nbsp&nbspAl hacer clikc sobre el botón de zoom a la máxima extensión automáticamente se cambiará el nivel de zoom al menor grado definido por la aplicación.</br></br>\n\
                <img src="img/magnifier-zoom-in.png" alt="ayuda">&nbsp&nbsp&nbspZoom in nos permite realizar acercamientos a un punto o zona en particular. Funciona haciendo click sobre un punto en el mapa o dibujando un cuadro sobre una zona determinada.</br></br>\n\
                <img src="img/magnifier-zoom-out.png" alt="ayuda">&nbsp&nbsp&nbspZoom out nos permite realizar alejamientos en el mapa. </br></br>\n\
                <img src="img/history-zoom-left.png" alt="ayuda">&nbsp&nbsp&nbspZoom anterior nos devuelve al nivel de zoom anterior en el historial de zoom realizados.</br></br>\n\
                <img src="img/history-zoom-right.png" alt="ayuda">&nbsp&nbsp&nbspZoom posterior nos devuelve al nivel de zoom siguiente en el historial de zoom realizados.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Herramientas de medición</b></div></br>\n\
                <img src="img/rulerline.png" alt="ayuda">&nbsp&nbsp&nbspEl medidor de distancias nos permite calcular la distancia comprendida entre dos o mas puntos en el mapa.</br></br>\n\
                <img src="img/rulerarea.png" alt="ayuda">&nbsp&nbsp&nbspEl medidor de superficie nos permite calcular la superficie comprendida dentro de un polígono en el mapa.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Obtener información</b></div></br>\n\
                <img src="img/cursor-info.png" alt="ayuda">&nbsp&nbsp&nbspEsta herramienta nos permite obtener información asociada a capas activas en el mapa. Para ello, el primer paso consiste en activar una capa, luego seleccionar la herramienta "Obtener información" y luego hacer click en algún elemento de la capa. Aparecerá una ventana conteniendo la información correspondiente.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Buscador de topónimos</b></div></br>\n\
                <img src="img/buscador.png" alt="ayuda">&nbsp&nbsp&nbspEl buscador de topónimos permite realizar una consulta por un nombre propio de una ubicación geográfica y devuelve un listado de coincidencias de las cuales al seleccionar alguna ajusta en nivel de zoom y posiciona el visor del mapa en la coordenada asociada a ese topónimo en particular.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Configuración</b></div></br>\n\
                <img src="img/gear.png" alt="ayuda">&nbsp&nbsp&nbspLa herramienta de configuración nos abre una nueva ventana que nos permitirá realizar una configuración sobre los elementos contenidos dentro del mapa. Entre las opciones encontramos:</br></br>\n\
                * Activar / desactivar / cambiar título del mapa</br>\n\
                * Activar / desactivar / cambiar subtítulo del mapa</br>\n\
                * Activar / desactivar leyenda</br>\n\
                * Activar / desactivar escala</br>\n\
                * Activar / desactivar localizador</br>\n\
                * Activar / desactivar norte</br>\n\
                * Activar / desactivar grilla</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Ayuda</b></div></br>\n\
                <img src="img/question.png" alt="ayuda">&nbsp&nbsp&nbspEl botón de ayuda nos muestra una breve descripción de cada uno de los elementos con los que podemos interactuar en la aplicación.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Acerca de</b></div></br>\n\
                <img src="img/star.png" alt="ayuda">&nbsp&nbsp&nbspMuestra información correspondiente al desarrollo de la aplicación.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Herramientas del panel de capas</b></div></br>\n\
                <img src="img/map-plus.png" alt="ayuda">&nbsp&nbsp&nbspLa herramienta "Agregar capas" nos permite conectarnos con servidores de mapas y obtener de ellos nuevas capas de información.</br></br>\n\
                <img src="img/maps-stack.png" alt="ayuda">&nbsp&nbsp&nbspLa herramienta "Orden de capas" cambia la vista por directorios del árbol de capas por una vista según el orden de superposición de las capas. Desde aquí es posible arrastrar una capa más arriba o más abajo que otra para cambiar el orden de superposición de la misma.</br></br>\n\
                <img src="img/folder-add.png" alt="ayuda">&nbsp&nbsp&nbspNos permite agregar una nueva carpeta al árbol de capas.</br></br>\n\
                <img src="img/folder-expandir.png" alt="ayuda">&nbsp&nbsp&nbspExpande todas las carpetas y las subcarpetas correspondientes al árbol de capas.</br></br>\n\
                <img src="img/folder-colapsar.png" alt="ayuda">&nbsp&nbsp&nbspColapsa todas las carpetas y las subcarpetas correspondientes al árbol de capas.</br></br>\n\
                <img src="img/folder-open.png" alt="ayuda">&nbsp&nbsp&nbsp"Importar capas" nos permite restaurar un árbol de capas.</br></br>\n\
                <img src="img/folder-save.png" alt="ayuda">&nbsp&nbsp&nbsp"Guardar capas" nos permite exportar el árbol de capas actual.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Menús desplegables del árbol de capas</b></div></br>\n\
                Estas herramientas pueden encontrarse haciendo click derecho sobre una carpeta o una capa en el árbol de capas</br></br>\n\
                <img src="img/folder-edit.png" alt="ayuda">&nbsp&nbsp&nbspNos permite cambiar el nombre de una carpeta determinada.</br></br>\n\
                <img src="img/zoom-to-map.png" alt="ayuda">&nbsp&nbsp&nbspCambia el zoom del visor de mapas para adaptarse a una capa determinada.</br></br>\n\
                <img src="img/map-minus.png" alt="ayuda">&nbsp&nbsp&nbspElimina una capa del árbol de capas.</br></br>\n\
                <img src="img/map-properties.png" alt="ayuda">&nbsp&nbsp&nbspMuestra las propiedades de la capa.</br></br>\n\
                <img src="img/information-italic.png" alt="ayuda">&nbsp&nbsp&nbspConecta con la información asociada a la capa y despliega el panel de atributos.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Herramientas del panel de atributos</b></div></br>\n\
                <img src="img/cursor-question.png" alt="ayuda">&nbsp&nbsp&nbspPermite reconocer elementos de una capa y obtener información de ellos. Funciona haciendo click sobre puntos en el mapa o dibujando un recuadro sobre el mismo. Las teclas shift y control permiten añadir nuevos elementos al conjunto de elementos reconocidos.</br></br>\n\
                <img src="img/cursor.png" alt="ayuda">&nbsp&nbsp&nbspUna vez hecho el reconocimiento de elementos de una capa, es posible mediante esta herramienta seleccionarlos haciendo click sobre ellos. Los elementos seleccionados serán iluminados de color azul en el mapa y las filas correspondientes a estos elementos serán también seleccionadas en el panel de atributos.</br></br>\n\
                <img src="img/broom.png" alt="ayuda">&nbsp&nbsp&nbspLimpia los elementos reconocidos en el mapa.</br></br>\n\
                <img src="img/close.png" alt="ayuda">&nbsp&nbsp&nbspDesconecta el reconocimiento de elementos de una capa y cierra el panel de atributos.</br></br>\n\
                </div>'
            })
        ]
    });
    window.show();    
    
};

/**
 * Handler correspondiente al evento asociado al botón "Acerca de".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onAcercaDeButton = function(){
    
    var window = new Ext.Window({
        title: "Acerca de",
        iconCls: 'acercaDeIcon',
        layout: "fit",
        shadow: false,
        width: 600,
        height:461,
        resizable: false,
        items: [
            new Ext.Panel({
                bodyStyle: 'padding:5px',
                border: false,
                autoScroll: true,
                width: "100%",
                heigth: "100%",
                html: '<div align="center" style="font-size:small">\n\
                <div align="center" style="color:#333333;font-size:xx-large; background:#548DD4; padding-top:5px; padding-bottom:5px"><b>Visor de mapas</b></div></br>\n\
                Esta aplicación fue desarrollada por <b>Bruno José Vecchietti</b> para la <b>Universidad Nacional de la Patagonia San Juan Bosco</b> como proyecto de Tesina de la carrera de Licenciatura en Informática. </br>\n\
                </br>\n\
                Para su desarrollo se utilizó:</br>\n\
                </br>\n\
                <div align="center"><a href="http://openlayers.org/"><img src="img/OpenLayers.png" alt="ayuda" style="height:30px; width:160px"></a></div></br>\n\
                <div align="center"><a href="http://www.sencha.com/products/extjs3"><img src="img/ExtJS.png" alt="ayuda" style="height:20px; width:70px"></a></div></br>\n\
                <div align="center"><a href="http://www.geoext.org/"><img src="img/GeoExt.png" alt="ayuda" style="height:30px; width:110px"></a></div></br>\n\
                \n\
                <div style="background:#EBEBEB; font-size:xx-small; padding:5px">\n\
                Copyright (C) 2013  Bruno José Vecchietti <a href="bruno88tw@gmail.com">bruno88tw@gmail.com</a>\n\
                </br>\n\
                This program is free software: you can redistribute it and/or modify</br>\n\
                it under the terms of the GNU General Public License as published by</br>\n\
                the Free Software Foundation, either version 3 of the License, or</br>\n\
                (at your option) any later version.</br>\n\
                </br>\n\
                This program is distributed in the hope that it will be useful,</br>\n\
                but WITHOUT ANY WARRANTY; without even the implied warranty of</br>\n\
                MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the</br>\n\
                GNU General Public License for more details.</br>\n\
                </br>\n\
                You should have received a copy of the GNU General Public License</br>\n\
                along with this program.  If not, see <a href="http://www.gnu.org/licenses/">http://www.gnu.org/licenses/</a>.</br>\n\
                </div>\n\
                </div>'
            })
        ]
    });
    window.show();    
    
};

/**
 * Handler correspondiente al evento asociado al botón "Agregar capas".
 * @param {type} node
 * @returns {undefined} Esta función no devuelve resultados.
 */
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
        items: [componentes.capabilitiesGridPanel(node)]
    }).show(); 

};
 
/**
 * Handler correspondiente al evento asociado al botón "Servidores WMS".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onServidoresWmsButton = function(){

   new Ext.Window({
       title: "Servidores WMS",
       iconCls: 'serverIcon',
       layout: "fit",
       width: 500,
       height:300,
       resizable: false,
       autoScroll: true,
       shadow: false,
       items: [componentes.wmsServersGridPanel()]                
   }).show();

};
 
/**
 * Handler correspondiente al evento asociado al botón "Orden de capas".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onOrdenDeCapasButton = function(){

   if(this.pressed){
       Ext.getCmp("treePanelTopbarAgregar").disable();
       Ext.getCmp("treePanelTopbarAgregarCarpeta").disable();
//       Ext.getCmp("treePanelTopbarExpandir").disable();
//       Ext.getCmp("treePanelTopbarColapsar").disable();
       Ext.getCmp("treePanelBottombarImportar").disable();
       Ext.getCmp("treePanelBottombarExportar").disable();  
       Ext.getCmp("layerTreePanel").root = null;
       Ext.getCmp("layerTreePanel").setRootNode(new GeoExt.tree.OverlayLayerContainer({
           text: "Capas",
           icon: "img/layers3.png",
           iconCls: "layerNodeIcon",
           map: app.map,
           expanded: true
       }));
   }else{
       Ext.getCmp("treePanelTopbarAgregar").enable();
       Ext.getCmp("treePanelTopbarAgregarCarpeta").enable();
//       Ext.getCmp("treePanelTopbarExpandir").enable();
//       Ext.getCmp("treePanelTopbarColapsar").enable();
       Ext.getCmp("treePanelBottombarImportar").enable();
       Ext.getCmp("treePanelBottombarExportar").enable();
       Ext.getCmp("layerTreePanel").setRootNode(app.rootnode);
   }     

};

/**
 * Handler correspondiente al evento asociado al botón "Agregar carpeta".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onAgregarCarpetaButton = function(){

   var newFolder = createNode("Nueva carpeta");
   Ext.getCmp("layerTreePanel").getRootNode().appendChild(newFolder);
   setFolderName(newFolder);     

};
 
/**
 * Handler correspondiente al evento asociado al botón "Expandir todo".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onExpandirTodoButton = function(){

   expandAll(Ext.getCmp("layerTreePanel").getRootNode());     

};

/**
 * Handler correspondiente al evento asociado al botón "Colapsar todo".
 * @returns {undefined} Esta función no devuelve resultados.
 */   
handler.onColapsarTodoButton = function(){

   collapseAll(Ext.getCmp("layerTreePanel").getRootNode());

};

/**
 * Handler correspondiente al evento asociado al botón "Reconocer".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onWfsReconocerButton = function(){
    
    if(app.wfsReconocerControl != null){
        if(Ext.getCmp("wfsReconocerButton").pressed){
            app.wfsReconocerControl.activate();
        }else{
            app.wfsReconocerControl.deactivate();
        }                    
    }    
    
};

/**
 * Handler correspondiente al evento asociado al botón "Seleccionar".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onWfsSeleccionarButton = function(){
    
    if(app.wfsSelectControl != null){
        if(Ext.getCmp("wfsSeleccionarButton").pressed){
            app.wfsSelectControl.activate();
        }else{
            app.wfsSelectControl.deactivate();
        }                    
    }    
    
};

/**
 * Handler correspondiente al evento asociado al botón "Limpiar".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onWfsLimpiarButton = function(){
    
    app.map.getLayersByName("wfsLayer")[0].removeAllFeatures();
    
};

/**
 * Handler correspondiente al evento "ContextMenu" de una componente tipo nodo.
 * @param {type} nodo
 * @param {type} event
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onNodeContextMenu = function(nodo, event){
    
    Ext.getCmp("layerTreePanel").getRootNode().findChild("id",nodo.attributes.id,true).select();
    var menu = new Ext.menu.Menu({
        items: [
            {
                text: 'Agregar capa',
                icon: "img/map-plus.png",
                handler: function(){
                    handler.onAgregarCapas(nodo);
                }
            },{
                text: 'Renombrar carpeta',
                icon: "img/folder-edit.png",
                handler: function(){
                    setFolderName(nodo);
                }
            },{
                text: 'Nueva carpeta',
                icon: "img/folder-add.png",
                handler: function(){
                    var newFolder = createNode("Nueva carpeta");
                    Ext.getCmp("layerTreePanel").getRootNode().findChild("id",nodo.attributes.id,true).appendChild(newFolder);
                    setFolderName(newFolder);
                }
            },{
                text: 'Eliminar carpeta',
                icon: "img/folder-delete.png",
                handler: function(){
                    removeLayers(nodo);
                    nodo.remove();
                }
            },{
                text: 'Expandir todo',
                icon: "img/folder-expandir.png",
                handler: function(){
                    expandAll(nodo);
                }
            },{
                text: 'Colapsar todo',
                icon: "img/folder-colapsar.png",
                handler: function(){
                    collapseAll(nodo);
                }
            }
        ]
    });

    menu.showAt([event.browserEvent.clientX,event.browserEvent.clientY]);

    menu.on('hide', function() {
        menu.destroy();
    });     
    
};

/**
 * Handler correspondiente al evento "ContextMenu" de una componente tipo nodo.
 * @param {type} nodo
 * @param {type} event
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onRootNodeContextMenu = function(nodo, event){
    
    Ext.getCmp("layerTreePanel").getRootNode().select();
    var menu = new Ext.menu.Menu({
        items: [
            {
                text: 'Nueva carpeta',
                icon: "img/folder-add.png",
                handler: function(){
                    var newFolder = createNode("Nueva carpeta");
                    Ext.getCmp("layerTreePanel").getRootNode().appendChild(newFolder);
                    setFolderName(newFolder);
                }
            },{
                text: 'Expandir todo',
                icon: "img/folder-expandir.png",
                handler: function(){
                    expandAll(nodo);
                }
            },{
                text: 'Colapsar todo',
                icon: "img/folder-colapsar.png",
                handler: function(){
                    collapseAll(nodo);
                }
            }
        ]
    });

    menu.showAt([event.browserEvent.clientX,event.browserEvent.clientY]);

    menu.on('hide', function() {
        menu.destroy();
    });     
    
};

/**
 * Handler correspondiente al evento "ContextMenu" de una componente tipo leaf.
 * @param {type} leaf
 * @param {type} event
 * @param {type} titulo
 * @param {type} params
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onLeafContextMenu = function(leaf, event, titulo, params){
    
    leaf.select();
    var menu = new Ext.menu.Menu({
        items: [{
            text: 'Zoom a la capa',
            icon: "img/zoom-to-map.png",                        
            handler: function(){handler.onZoomALaCapaButton(leaf,params)     

            }
        },{
            text: 'Eliminar capa',
            icon: "img/map-minus.png",
            handler: function(){
                leaf.remove();
                app.map.removeLayer(app.map.getLayersByName(leaf.attributes.layer)[0]);   
            }
        },{
            text: 'Propiedades',
            icon: "img/map-properties.png",
            handler: function(){handler.onPropiedadesButton(leaf, titulo, params)}
        },{
            text: 'Atributos',
            icon: "img/information-italic.png",
            handler: function(){handler.onAtributosButton(leaf)}
        },{
            text: 'Descargar',
            icon: "img/folder-save.png",
            handler: function(){handler.onDescargarButton(leaf, titulo, params)}
        }
    ]
    });

    menu.showAt([event.browserEvent.clientX,event.browserEvent.clientY]);

    menu.on('hide', function() {
        menu.destroy();
    });     
    
};

/**
 * Handler correspondiente al evento asociado al botón "Zoom a la capa".
 * @param {type} leaf
 * @param {type} params
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onZoomALaCapaButton = function(leaf, params){
    
    var capurl;
    var layer = app.map.getLayersByName(leaf.attributes.layer)[0];
    var url = layer.url;

    if (url.indexOf("?") == -1){
        capurl = url + "?service=wms&request=GetCapabilities";
    }else{
        capurl = url + "&service=wms&request=GetCapabilities";
    }

    new GeoExt.data.WMSCapabilitiesStore({  
        url: capurl,
        autoLoad: true,
        listeners:{
            load: function(){
                var item;
                for(var x = 0; x < this.data.items.length; x++){
                    if(this.data.items[x].data.name == params.layers){
                        item = x;
                        break;
                    }
                }
                var west = this.data.items[item].data.llbbox[0];
                var south = this.data.items[item].data.llbbox[1];
                var east = this.data.items[item].data.llbbox[2];
                var north = this.data.items[item].data.llbbox[3];
                var bounds = new OpenLayers.Bounds(west, south, east, north);
                app.map.zoomToExtent(bounds.clone().transform(app.projection4326, app.projection900913));
            }
        }
    });


    var layer = app.map.getLayersByName(leaf.attributes.layer)[0];
    app.map.zoomToExtent(layer.maxExtent,true);    
    
};

/**
 * Handler correspondiente al evento asociado al botón "Propiedades".
 * @param {type} leaf
 * @param {type} titulo
 * @param {type} params
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onPropiedadesButton = function(leaf, titulo, params){
    
    new GeoExt.data.WMSCapabilitiesStore({  
        url: getCapabilitiesUrl(leaf.layer.url),
        autoLoad: true,
        listeners:{
            beforeload: function(){
                mask = new Ext.LoadMask(Ext.getBody(), {msg:"Conectando..."});
                mask.show();
            },
            load: function(){
                var descripcionEstiloField;
                var styleCombo;
                var styledata = [];
                var styleabstract = {};

                mask.hide();
                var item = this.find('name', params.layers);
                var propiedades = this.data.items[item].data;
                var estilos = propiedades.styles;
                for(var x = 0; x < estilos.length; x++){
                    styledata.push([estilos[x].title,estilos[x].name]);
                    styleabstract[estilos[x].name] = estilos[x].abstract;
                }                                       

                new Ext.Window({
                    title: titulo,
                    iconCls: 'configuracionIcon',
                    layout: "anchor",
                    resizable: false,   
                    shadow: false,
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
                                 width: 335,
                                 items: [
                                     new Ext.form.TextField({
                                         fieldLabel: 'Título',
                                         width: 230,
                                         readOnly: true,
                                         value: propiedades.title
                                     }), 
                                     new Ext.form.TextField({
                                         fieldLabel: 'Nombre',
                                         width: 230,
                                         readOnly: true,
                                         value: propiedades.name
                                     }),
                                     new Ext.form.TextField({
                                         fieldLabel: 'Servidor',
                                         width: 230,
                                         readOnly: true,
                                         value: leaf.layer.url
                                     }),                                                              
                                     new Ext.form.TextArea({
                                         fieldLabel: 'Resumen',
                                         width: 230,
                                         readOnly: true,
                                         value: propiedades.abstract
                                     }),
                                     styleCombo = new Ext.form.ComboBox({
                                         fieldLabel: 'Estilos',
                                         width: 230,
                                         typeAhead: true,
                                         triggerAction: 'all',
                                         lazyRender:true,
                                         mode: 'local',
                                         store: new Ext.data.ArrayStore({
                                             fields: [
                                                 'titulo',
                                                 'name'
                                             ],
                                             data: styledata
                                         }),
                                         valueField: 'name',
                                         displayField: 'titulo',
                                         listeners:{
                                             select: function(combo, record, index){
                                                 leaf.layer.mergeNewParams({styles:record.data.name});
                                                 descripcionEstiloField.setValue(styleabstract[record.data.name]);
                                             }
                                         }
                                     }),
                                     descripcionEstiloField = new Ext.form.TextArea({
                                         fieldLabel: 'Descripción',
                                         width: 230,
                                         readOnly: true
                                     }),                                                            
                                     new Ext.form.CompositeField({
                                         fieldLabel: 'Transparencia',
                                         items: [
                                             new Ext.form.Hidden({}),
                                             new GeoExt.LayerOpacitySlider({
                                                 width: 230,
                                                 layer: leaf.layer,
                                                 plugins: new GeoExt.LayerOpacitySliderTip({template: '<div>Opacidad: {opacity}%</div>'})
                                             })                                                        
                                         ]
                                     })
                                 ]
                             })
                        })

                    ]                                            
                }).show();

                styleCombo.getStore().loadData(styledata);  //carga el store del stylecombo
                styleCombo.setValue(styleCombo.getStore().getAt(0).data.titulo); //selecciona el primer valor
                descripcionEstiloField.setValue(styleabstract[styleCombo.getStore().getAt(0).data.name]); //actualiza la descripción del estilo                                       

            },
            exception: function(){
                mask.hide();
                Ext.MessageBox.alert('Error', 'Ha ocurrido un error en la conexión con el servidor indicado.');
            }
        }
    });    
    
};

/**
 * Handler correspondiente al evento asociado al botón "Atributos".
 * @param {type} leaf
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onAtributosButton = function(leaf){
    
    if(app.isAttributesPanelHidden){
        Ext.getCmp("featureGridPanel").show();
        Ext.getCmp("viewportPanel").doLayout(); 
        app.isAttributesPanelHidden = false;
    }
    var mask = new Ext.LoadMask(Ext.getCmp("featureGridPanel").el, {msg:"Conectando..."});
    mask.show();

    //obtengo el protocolo y ejecuto el metodo read()
    OpenLayers.Protocol.WFS.fromWMSLayer(leaf.layer).read({
        readOptions: {output: "object"},
        maxFeatures: 1,
        callback: function(resp){

            if(resp.error){
                mask.hide();
                Ext.MessageBox.alert('Error', 'Ha ocurrido un error al tratar de obtener la información solicitada');
            }else{
                Ext.getCmp("featureGridPanel").setTitle("Atributos: " + leaf.text);
                Ext.getCmp("wfsReconocerButton").toggle(false);
                Ext.getCmp("wfsSeleccionarButton").toggle(false);
                mask.hide();
                Ext.getCmp("wfsReconocerButton").setDisabled(false);
                Ext.getCmp("wfsSeleccionarButton").setDisabled(false);
                Ext.getCmp("wfsLimpiarButton").setDisabled(false);
                Ext.getCmp("wfsCerrarButton").setDisabled(false);
                Ext.getCmp("wfsReconocerButton").show();
                Ext.getCmp("wfsSeleccionarButton").show();
                Ext.getCmp("wfsLimpiarButton").show();
                Ext.getCmp("wfsCerrarButton").show();
                var attributesJSON = resp.features[0].attributes;
                var columns = [];
                var fields = [];

                columns.push(new Ext.grid.RowNumberer());
                for(attribute in attributesJSON){
                    columns.push({header: attribute, dataIndex: attribute, sortable: true});
                    if(isNaN(parseFloat(attributesJSON[attribute]))){
                        fields.push({name: attribute, type: "string"});
                    }else{
                        fields.push({name: attribute, type: "float"});
                    }

                }                                      

                app.map.getLayersByName("wfsLayer")[0].removeAllFeatures();

                var x = 3;
                while(x < app.wfsStoreExport.fields.items.length){
                    app.wfsStoreExport.fields.removeAt(x);
                }
                app.wfsStoreExport.fields.addAll(fields);
                app.wfsStoreExport.bind(app.map.getLayersByName("wfsLayer")[0]);

                Ext.getCmp("featureGridPanel").reconfigure(
                    new GeoExt.data.FeatureStore({
                        fields: fields,
                        layer: app.map.getLayersByName("wfsLayer")[0]
                    }),
                    new Ext.grid.ColumnModel({
                        columns: columns
                    })
                );  

                Ext.getCmp("featureGridPanel").getSelectionModel().bind(app.map.getLayersByName("wfsLayer")[0]);

                if (app.wfsReconocerControl != null){
                    app.wfsReconocerControl.deactivate();
                    app.map.removeControl(app.wfsReconocerControl);
                }

                app.wfsReconocerControl = new OpenLayers.Control.GetFeature({
                    protocol: new OpenLayers.Protocol.WFS({
                        url: leaf.layer.url,
                        version: "1.1.0",
                        featureType: leaf.layer.params.LAYERS.substr(leaf.layer.params.LAYERS.indexOf(":") + 1),
                        srsName: 'EPSG:900913'
                    }),
                    box: true,
                    hover: false,
                    multipleKey: "shiftKey",
                    toggleKey: "ctrlKey",
                    maxFeatures:1000
                });

                app.wfsReconocerControl.events.register("featureselected", this, function(leaf) {

                    app.map.getLayersByName("wfsLayer")[0].addFeatures([leaf.feature]);

                });

                app.wfsReconocerControl.events.register("featureunselected", this, function(leaf) {
                    app.map.getLayersByName("wfsLayer")[0].removeFeatures([leaf.feature]);
                });

                app.map.addControl(app.wfsReconocerControl);
                app.wfsReconocerControl.deactivate();                                           

                var selectControls = app.map.getControlsByClass('OpenLayers.Control.SelectFeature');
                for(var i=0; i<selectControls.length; i++){
                    if(selectControls[i].layer.name == "wfsLayer"){
                        app.wfsSelectControl = selectControls[i];
                        break;
                    }
                }

                app.wfsSelectControl.deactivate();

                Ext.getCmp("wfsReconocerButton").toggle(true);

            }

        }
    });    
    
};

/**
 * Handler correspondiente al evento asociado al botón "Atributos".
 * @param {type} leaf
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onDescargarButton = function(leaf, titulo, params){
    
    new GeoExt.data.WMSCapabilitiesStore({  
        url: getCapabilitiesUrl(leaf.layer.url),
        autoLoad: true,
        listeners:{
            beforeload: function(){
                mask = new Ext.LoadMask(Ext.getBody(), {msg:"Conectando..."});
                mask.show();
            },
            load: function(){
                var descripcionEstiloField;
                var styleCombo;
                var styledata = [];
                var styleabstract = {};

                mask.hide();
                var item = this.find('name', params.layers);
                var propiedades = this.data.items[item].data;
                var servidor = propiedades.layer.url.split("?")[0];
                var srs;
                for(var key in propiedades.srs) {
                    if(propiedades.srs.hasOwnProperty(key)) {
                        srs = key;
                        break;
                    }
                }
                var url = servidor+'?service=wfs&version=2.0.0&request=GetFeature&typeName='+propiedades.name+'&outputFormat=shape-zip&SRSNAME=EPSG:4326';
//                window.open('?service=wfs&version=2.0.0&request=GetFeature&typeName=rural:departamentos&outputFormat=shape-zip&SRSNAME=EPSG:22172', '_blank', 'location=no, scrollbars=no, menubar=no, status=no, titlebar=no, center=1, height=50, width=50');
                window.open(url, '_blank', 'location=no, scrollbars=no, menubar=no, status=no, titlebar=no, center=1, height=50, width=50');

            },
            exception: function(){
                mask.hide();
                Ext.MessageBox.alert('Error', 'Ha ocurrido un error en la conexión con el servidor indicado.');
            }
        }
    });        
    
    
};

/**
 * Handler correspondiente al evento asociado al botón "Información" de la ventana de servidores WMS.
 * @param {type} wmsServersGridPanel
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onWmsServersInformationButton = function(wmsServersGridPanel){
    
    var url = wmsServersGridPanel.getSelectionModel().getSelected().data.url;                            
    var infomask = new Ext.LoadMask(wmsServersGridPanel.getEl(), {msg:"Conectando..."});
    infomask.show();

    Ext.Ajax.request({
        url : getCapabilitiesUrl(url), 
        method: 'GET',
        success: function ( result, request )
        { 
            infomask.hide();

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(result.responseText,"text/xml");

            try{var service = xmlDoc.getElementsByTagName("Service")[0];}catch(e){};
            try{var name = service.getElementsByTagName("Name")[0].textContent;}catch(e){};
            try{var title = service.getElementsByTagName("Title")[0].textContent;}catch(e){};
            try{var abstract = service.getElementsByTagName("Abstract")[0].textContent;}catch(e){};
            try{var contactPerson = service.getElementsByTagName("ContactPerson")[0].textContent;}catch(e){};
            try{var contactOrganization = service.getElementsByTagName("ContactOrganization")[0].textContent;}catch(e){};
            try{var contactPosition = service.getElementsByTagName("ContactPosition")[0].textContent;}catch(e){};
            try{var addressType = service.getElementsByTagName("AddressType")[0].textContent;}catch(e){};
            try{var address = service.getElementsByTagName("Address")[0].textContent;}catch(e){};
            try{var city = service.getElementsByTagName("City")[0].textContent;}catch(e){};
            try{var stateOrProvince = service.getElementsByTagName("StateOrProvince")[0].textContent;}catch(e){};
            try{var postCode = service.getElementsByTagName("PostCode")[0].textContent;}catch(e){};
            try{var country = service.getElementsByTagName("Country")[0].textContent;}catch(e){};
            try{var contactVoiceTelephone = service.getElementsByTagName("ContactVoiceTelephone")[0].textContent;}catch(e){};
            try{var contactFacsimileTelephone = service.getElementsByTagName("ContactFacsimileTelephone")[0].textContent;}catch(e){};
            try{var contactElectronicMailAddress = service.getElementsByTagName("ContactElectronicMailAddress")[0].textContent;}catch(e){};

            new Ext.Window({
                title: wmsServersGridPanel.getSelectionModel().getSelected().data.nombre,
                iconCls: 'configuracionIcon',
                layout: "anchor",
                resizable: false,  
                shadow: false,
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
    
};

/**
 * Handler correspondiente al evento asociado al botón "Agregar" de la ventana de servidores WMS.
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onAgregarServidorWmsButton = function(){
    
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
        
};

/**
 * Handler correspondiente al evento asociado al botón "Eliminar" de la ventana de servidores WMS.
 * @param {type} wmsServersGridPanel
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onEliminarServidorWmsButton = function(wmsServersGridPanel){
    
    wmsServersGridPanel.getSelectionModel().each(function(record){
        app.wmsServerStore.remove(app.wmsServerStore.getById(record.id));
    });       
        
};

/**
 * Handler correspondiente al evento asociado al botón "Agregar" de la ventana "Agregar capas".
 * @param {type} node
 * @param {type} capabilitiesGridPanel
 * @param {type} capabilitiesCombo
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onAgregarCapasButton = function(node, capabilitiesGridPanel, capabilitiesCombo){
    
    capabilitiesGridPanel.getSelectionModel().each(function(record){

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
    
};

/**
 * Handler correspondiente al evento asociado al control "getFeatureInfo".
 * @param {type} e
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onGetFeatureInfo = function(e){
    
    var info = [];
    Ext.each(e.features, function(feature) {    
        var p;                             
        p = new Ext.grid.PropertyGrid({
            title: feature.gml.featureType
        });    
        delete p.getStore().sortInfo; // Remove default sorting
        p.getColumnModel().getColumnById('name').sortable = false; // set sorting of first column to false
        p.setSource(feature.attributes); // Now load data
        var source = feature.attributes;
        info.push(p); 
    });
    new Ext.Window({
        title: "Información",
        iconCls: "informacionIcon",                    
        width: 340,
        height: (Ext.getCmp("mapPanel").getHeight()) - 56,
        x: Ext.getCmp("mapPanel").getPosition()[0],
//        y: Ext.getCmp("mapPanel").getPosition()[1] + ((Ext.getCmp("mapPanel").getHeight()) / 2) - 30,
        y: Ext.getCmp("mapPanel").getPosition()[1] + 28,
        shadow: false,
        layout: "border",                               
        items: new Ext.TabPanel({
            region: 'center',
            activeTab: 0,
            enableTabScroll:true,
            animScroll: true,
            items: info
        })
    }).show();    
    
};