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
 * Handler correspondiente al evento asociado al checkbox de configuración "Navegador".
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
 * Handler correspondiente al evento asociado al checkbox de configuración "Avanzado".
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.AvanzadoCheckbox = function(){

    if (this.getValue() == true){
        app.configuracion.avanzado = true;
        Ext.getCmp("treePanelTopbarZoomCapa").show();
        Ext.getCmp("distanciaButton").show();
        Ext.getCmp("superficieButton").show();
        Ext.getCmp("zoomAnterior").show();
        Ext.getCmp("zoomPosterior").show();
        Ext.getCmp("ordenDeCapasButton").show();
        if(!app.fullscreen){
            Ext.getCmp("mapPanel").getBottomToolbar().show();
        }        
        Ext.getCmp("viewportPanel").doLayout();  
    }else{
        app.configuracion.avanzado = false;
        Ext.getCmp("treePanelTopbarZoomCapa").hide();
        Ext.getCmp("distanciaButton").hide();
        Ext.getCmp("superficieButton").hide();
        Ext.getCmp("zoomAnterior").hide();
        Ext.getCmp("zoomPosterior").hide();        
        Ext.getCmp("ordenDeCapasButton").hide();
        Ext.getCmp("mapPanel").getBottomToolbar().hide();
        Ext.getCmp("viewportPanel").doLayout();  
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
                <img src="img/history-zoom-left.png" alt="ayuda">&nbsp&nbsp&nbspZoom anterior nos devuelve al nivel de zoom anterior en el historial de zoom realizados.</br></br>\n\
                <img src="img/history-zoom-right.png" alt="ayuda">&nbsp&nbsp&nbspZoom posterior nos devuelve al nivel de zoom siguiente en el historial de zoom realizados.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Herramientas de medición</b></div></br>\n\
                <img src="img/rulerline.png" alt="ayuda">&nbsp&nbsp&nbspEl medidor de distancias nos permite calcular la distancia comprendida entre dos o mas puntos en el mapa.</br></br>\n\
                <img src="img/rulerarea.png" alt="ayuda">&nbsp&nbsp&nbspEl medidor de superficie nos permite calcular la superficie comprendida dentro de un polígono en el mapa.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Consulta de información</b></div></br>\n\
                <img src="img/information2.png" alt="ayuda">&nbsp&nbsp&nbspEsta herramienta nos permite obtenere la información de las capas activas haciendo click en un punto determinado del mapa.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Orden de las capas</b></div></br>\n\
                <img src="img/layers3.png" alt="ayuda">&nbsp&nbsp&nbspLa herramienta "Orden de capas" cambia la vista por directorios del árbol de capas por una vista según el orden de superposición de las capas. Desde aquí es posible arrastrar una capa más arriba o más abajo que otra para cambiar el orden de superposición de la misma.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Ayuda</b></div></br>\n\
                <img src="img/question.png" alt="ayuda">&nbsp&nbsp&nbspEl botón de ayuda nos muestra una breve descripción de cada uno de los elementos con los que podemos interactuar en la aplicación.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Acerca de</b></div></br>\n\
                <img src="img/information-italic.png" alt="ayuda">&nbsp&nbsp&nbspMuestra información correspondiente al desarrollo de la aplicación.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Configuración</b></div></br>\n\
                <img src="img/equalizer.png" alt="ayuda">&nbsp&nbsp&nbspLa herramienta de configuración nos abre una nueva ventana que nos permitirá realizar una configuración sobre los elementos contenidos dentro del mapa.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Herramientas del panel de capas</b></div></br>\n\
                <img src="img/map-plus3.png" alt="ayuda">&nbsp&nbsp&nbspLa herramienta "Agregar capas" nos permite conectarnos con servidores de mapas y obtener de ellos nuevas capas de información.</br></br>\n\
                <img src="img/minus-circle.png" alt="ayuda">&nbsp&nbsp&nbspElimina una capa del árbol de capas.</br></br>\n\
                <img src="img/gear.png" alt="ayuda">&nbsp&nbsp&nbspMuestra las propiedades de la capa.</br></br>\n\
                <img src="img/magnifier.png" alt="ayuda">&nbsp&nbsp&nbspCambia el zoom del visor de mapas para adaptarse a una capa determinada.</br></br>\n\
                <img src="img/table.png" alt="ayuda">&nbsp&nbsp&nbspConecta con la información asociada a la capa y despliega el panel de atributos.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Herramientas del panel de atributos</b></div></br>\n\
                <img src="img/cursor-question.png" alt="ayuda">&nbsp&nbsp&nbspPermite reconocer elementos de una capa y obtener información de ellos. Funciona haciendo click sobre puntos en el mapa o dibujando un recuadro sobre el mismo. Las teclas shift y control permiten añadir nuevos elementos al conjunto de elementos reconocidos.</br></br>\n\
                <img src="img/cursor.png" alt="ayuda">&nbsp&nbsp&nbspUna vez hecho el reconocimiento de elementos de una capa, es posible mediante esta herramienta seleccionarlos haciendo click sobre ellos. Los elementos seleccionados serán iluminados de color azul en el mapa y las filas correspondientes a estos elementos serán también seleccionadas en el panel de atributos.</br></br>\n\
                <img src="img/broom.png" alt="ayuda">&nbsp&nbsp&nbspLimpia los elementos reconocidos en el mapa.</br></br>\n\
                <img src="img/close.png" alt="ayuda">&nbsp&nbsp&nbspDesconecta el reconocimiento de elementos de una capa y cierra el panel de atributos.</br></br>\n\
                <div style="background:#EBEBEB; padding:5px;"><b>Buscador de topónimos</b></div></br>\n\
                <img src="img/buscador.png" alt="ayuda">&nbsp&nbsp&nbspEl buscador de topónimos permite realizar una consulta por un nombre propio de una ubicación geográfica y devuelve un listado de coincidencias de las cuales al seleccionar alguna ajusta en nivel de zoom y posiciona el visor del mapa en la coordenada asociada a ese topónimo en particular.</br></br>\n\
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
                <div style="font-size:xx-large"><b>Visor de mapas</b></div></br>\n\
                Esta aplicación fue desarrollada por el Departamento de Sistemas Informáticos en conjunto con el Departamento de Cartografía pertenecientes a la Dirección General de Estadística y Censos del Gobierno de la Provincia del Chubut.</br>\n\
                </br>\n\
                Para su desarrollo se utilizó OpenLayers, Ext JS y GeoExt.</br>\n\
                </br>\n\
                <div align="center"><img src="img/OpenLayers.png" alt="ayuda"></div></br></br>\n\
                <div align="center"><img src="img/ExtJS.png" alt="ayuda"></div></br></br>\n\
                <div align="center"><img src="img/GeoExt.png" alt="ayuda"></div></br></br>\n\
                </div>'
            })
        ]
    });
    window.show();    
    
};

/**
 * 
 * @returns {undefined}
 */
handler.onAgregarCapas = function(){

    new Ext.Window({
        title: "Agregar nuevas capas",
        iconCls: 'layerIcon',
        layout: "fit",
        width: 500,
        height:400,
        resizable: false,
        autoScroll: true,
        shadow: false,
        items: [componentes.capabilitiesGridPanel()]
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
       height:400,
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
       app.isLayerTreePanelHidden = true;
       Ext.getCmp("layerTreePanel").hide();
       Ext.getCmp("ordenDeCapasTree").show();
       Ext.getCmp("viewportPanel").doLayout(); 
   }else{
       app.isLayerTreePanelHidden = false;
       Ext.getCmp("ordenDeCapasTree").hide();
       Ext.getCmp("layerTreePanel").show();
       Ext.getCmp("viewportPanel").doLayout(); 
   }     

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
                    if(this.data.items[x].data.name == params.LAYERS){
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

    var item;
    var descripcionEstiloField;
    var styleCombo;
    var styledata = [];
    var styleabstract = {};

    var layers = app.capabilities[leaf.layer.url].data.items;                
    for(var x=0; x < layers.length; x++){
        if( layers[x].data.name == params.LAYERS){
            item = layers[x].data;
            break;
        }
    }

    var estilos = item.styles;
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
                             value: item.title
                         }), 
                         new Ext.form.TextField({
                             fieldLabel: 'Nombre',
                             width: 230,
                             readOnly: true,
                             value: item.name
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
                             value: item.abstract
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
    
};

/**
 * Handler correspondiente al evento asociado al botón "Atributos".
 * @param {type} leaf
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onAtributosButton = function(leaf){
    
    Ext.getCmp("featureGridPanel").setTitle(leaf.text);
    if(app.isAttributesPanelHidden){        
        Ext.getCmp("featureGridPanel").show();
        Ext.getCmp("viewportPanel").doLayout();         
        app.isAttributesPanelHidden = false;
    }
    var mask = new Ext.LoadMask(Ext.getCmp("featureGridPanel").el, {msg:"Conectando..."});
    mask.show();
    
    Ext.getCmp("buttonNav").toggle(true);
    
    OpenLayers.Request.GET({
        url: leaf.layer.url,
        params: {service:"WFS", version:"1.0.0",request:"DescribeFeatureType",typeName:leaf.layer.params.LAYERS},
        callback: handler
    });
    
    function handler(request) {
        
        // the server could report an error
        if(request.status == 500) {
            mask.hide();
            Ext.MessageBox.alert('Error', 'Ha ocurrido un error al tratar de obtener la información solicitada');
        }
        if(request.status == 200) {                       
            
            mask.hide();
            var columns = [];
            var fields = [];
            
            var sequence = null;
            var atributos = null; 
            
            var parser;
            var xmlDoc;
            
            if (window.DOMParser)
            {
                parser=new DOMParser();
                xmlDoc = parser.parseFromString(request.responseText,"text/xml");  
                
                if(navigator.appVersion.indexOf("Chrome") != -1){
                    sequence = xmlDoc.getElementsByTagName("sequence")[0];
                    atributos = sequence.getElementsByTagName("element");
                }else{
                    sequence = xmlDoc.getElementsByTagName("xsd:sequence")[0];
                    atributos = sequence.getElementsByTagName("xsd:element");
                }            
                
                columns.push(new Ext.grid.RowNumberer());
                for(var x = 0; x < atributos.length; x++){
                    if(atributos[x].attributes.name.nodeValue != "the_geom" && atributos[x].attributes.name.nodeValue != "gid"){
                        columns.push({header: atributos[x].attributes.name.nodeValue, dataIndex: atributos[x].attributes.name.nodeValue, sortable: true});
                        if(atributos[x].attributes.type.nodeValue == "xsd:string"){
                            fields.push({name: atributos[x].attributes.name.nodeValue, type: "string"});
                        }else if(atributos[x].attributes.type.nodeValue == "xsd:double" ||
                                 atributos[x].attributes.type.nodeValue == "xsd:float" ||
                                 atributos[x].attributes.type.nodeValue == "xsd:decimal" ||
                                 atributos[x].attributes.type.nodeValue == "xsd:long" ||
                                 atributos[x].attributes.type.nodeValue == "xsd:integer"){
                            fields.push({name: atributos[x].attributes.name.nodeValue, type: "float"});
                        }                    
                    }

                }                 
                
            }
            else // Internet Explorer
            {
                xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async=false;
                xmlDoc.loadXML(request.responseText);    
                
                if(navigator.appVersion.indexOf("Chrome") != -1){
                    sequence = xmlDoc.getElementsByTagName("sequence")[0];
                    atributos = sequence.getElementsByTagName("element");
                }else{
                    sequence = xmlDoc.getElementsByTagName("xsd:sequence")[0];
                    atributos = sequence.getElementsByTagName("xsd:element");
                }  
                
                columns.push(new Ext.grid.RowNumberer());
                for(var x = 0; x < atributos.length; x++){
                    if(atributos[x].attributes[2].text != "the_geom" && atributos[x].attributes[2].text != "gid"){
                        columns.push({header: atributos[x].attributes[2].text, dataIndex: atributos[x].attributes[2].text, sortable: true});
                        if(atributos[x].attributes[4].text == "xsd:string"){
                            fields.push({name: atributos[x].attributes[2].text, type: "string"});
                        }else if(atributos[x].attributes[4].text == "xsd:double" ||
                                 atributos[x].attributes[4].text == "xsd:float" ||
                                 atributos[x].attributes[4].text == "xsd:decimal" ||
                                 atributos[x].attributes[4].text == "xsd:long" ||
                                 atributos[x].attributes[4].text == "xsd:integer"){
                            fields.push({name: atributos[x].attributes[2].text, type: "float"});
                        }                    
                    }

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
                    srsName: 'EPSG:900913',
                    maxFeatures:100
                }),
                box: true,
                hover: false,
                multipleKey: "shiftKey",
                toggleKey: "ctrlKey",
                maxFeatures:100
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
    
};

/**
 * Handler correspondiente al evento asociado al botón "Información" de la ventana de servidores WMS.
 * @param {type} wmsServersGridPanel
 * @returns {undefined} Esta función no devuelve resultados.
 */
handler.onWmsServersInformationButton = function(wmsServersGridPanel){
    
    var selectedItem = wmsServersGridPanel.getSelectionModel().getSelected();
    
    if(selectedItem !== undefined){
        
        var url = selectedItem.data.url;                            
        var infomask = new Ext.LoadMask(wmsServersGridPanel.getEl(), {msg:"Conectando..."});
        infomask.show();

        Ext.Ajax.request({
            url : getCapabilitiesUrl(url), 
            method: 'GET',
            success: function ( result, request )
            { 
                infomask.hide();
                var parser;
                var xmlDoc;
                var service;
                var name;
                var title;
                var abstract;
                var contactPerson;
                var contactOrganization;
                var contactPosition;
                var addressType;
                var address;
                var city;
                var stateOrProvince;
                var postCode;
                var country;
                var contactVoiceTelephone;
                var contactFacsimileTelephone;
                var contactElectronicMailAddress;

                if (window.DOMParser)
                {
                    parser=new DOMParser();
                    xmlDoc = parser.parseFromString(result.responseText,"text/xml");
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
                }
                else // Internet Explorer
                {
                    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async=false;
                    xmlDoc.loadXML(result.responseText); 
                    try{service = xmlDoc.getElementsByTagName("Service")[0];}catch(e){};
                    try{name = service.getElementsByTagName("Name")[0].text;}catch(e){};
                    try{title = service.getElementsByTagName("Title")[0].text;}catch(e){};
                    try{abstract = service.getElementsByTagName("Abstract")[0].text;}catch(e){};
                    try{contactPerson = service.getElementsByTagName("ContactPerson")[0].text;}catch(e){};
                    try{contactOrganization = service.getElementsByTagName("ContactOrganization")[0].text;}catch(e){};
                    try{contactPosition = service.getElementsByTagName("ContactPosition")[0].text;}catch(e){};
                    try{addressType = service.getElementsByTagName("AddressType")[0].text;}catch(e){};
                    try{address = service.getElementsByTagName("Address")[0].text;}catch(e){};
                    try{city = service.getElementsByTagName("City")[0].text;}catch(e){};
                    try{stateOrProvince = service.getElementsByTagName("StateOrProvince")[0].text;}catch(e){};
                    try{postCode = service.getElementsByTagName("PostCode")[0].text;}catch(e){};
                    try{country = service.getElementsByTagName("Country")[0].text;}catch(e){};
                    try{contactVoiceTelephone = service.getElementsByTagName("ContactVoiceTelephone")[0].text;}catch(e){};
                    try{contactFacsimileTelephone = service.getElementsByTagName("ContactFacsimileTelephone")[0].text;}catch(e){};
                    try{contactElectronicMailAddress = service.getElementsByTagName("ContactElectronicMailAddress")[0].text;}catch(e){};                  
                } 

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

    }

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
                        agregarServidor(nombre,wms_url);
                    }
                });
            }else{
                Ext.MessageBox.alert('Error', 'Ya existe un servidor con ese nombre');
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
 * 
 * @param {type} capabilitiesGridPanel
 * @param {type} capabilitiesCombo
 * @returns {undefined}
 */
handler.onAgregarCapasButton = function(capabilitiesGridPanel, capabilitiesCombo){
    
    capabilitiesGridPanel.getSelectionModel().each(function(record){

            var nombrecapa = record.data.title;
            var servidorWMS = capabilitiesCombo.getValue();
            
            if (existeNombreCapa(nombrecapa) == true){
                nombrecapa = numerarNombre(nombrecapa);                            
            } 
            
            app.map.addLayer(new OpenLayers.Layer.WMS(
                nombrecapa, 
                servidorWMS, 
                {layers: record.data.name, transparent: 'true', format: 'image/png'}, 
                {isBaseLayer: false, visibility: false, singleTile: false}
            ));   
                
            if(!app.rootnode.contains(app.otrosnode)){
                app.rootnode.appendChild(app.otrosnode);
                
            var categoria = document.querySelectorAll(".categoria4");
            for(var x = 0; x < categoria.length; x++){
                var ct = categoria[x].parentNode.childNodes[1];
                ct.className = ct.className + " categoria4sub";
            }                  
                
            }    
                
            app.otrosnode.appendChild(createLeaf(nombrecapa));    
            app.otrosnode.expand();

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
        if((feature.gml.featureNS == "http://www.dgeyc.com/rural" && feature.gml.featureType == "batimetria") ||
           (feature.gml.featureNS == "http://www.dgeyc.com/rural" && feature.gml.featureType == "continente") ||    
           (feature.gml.featureNS == "http://www.dgeyc.com/rural" && feature.gml.featureType == "provincias") ||
           (feature.gml.featureNS == null)){
            
        }else{
            
            var p;                             
            p = new Ext.grid.PropertyGrid({
                title: feature.gml.featureType
            });    
            delete p.getStore().sortInfo; // Remove default sorting
            p.getColumnModel().getColumnById('name').sortable = false; // set sorting of first column to false
            p.setSource(feature.attributes); // Now load data
            var source = feature.attributes;
            info.push(p);             
            
        }

    });
    new Ext.Window({
        title: "Información",
        iconCls: "informacionIcon",                    
        width: 350,
        height: (Ext.getCmp("mapPanel").getHeight()) / 2,
        x: Ext.getCmp("mapPanel").getPosition()[0],
        y: Ext.getCmp("mapPanel").getPosition()[1] + ((Ext.getCmp("mapPanel").getHeight()) / 2),
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