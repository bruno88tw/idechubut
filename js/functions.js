//  File        : js/functions.js
//  Project     : Mapviewer
//  Author      : Bruno José Vecchietti
//  Year        : 2012  
//  Description : Se definen funciones de variada utilidad.
//  
//  Copyright (C) 2012  Bruno José Vecchietti
//  
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

/*
 * Dada una url de un servidor wms devuelve la url del getCapabilities
 * 
 * @param {type} wms_url: url del servidor wms
 * @returns {String}
 */
function getCapabilitiesUrl(wms_url){

    var cap_url;

    if (wms_url.indexOf("?") == -1){
        cap_url = wms_url + "?service=wms&request=GetCapabilities";
    }else{
        cap_url = wms_url + "&service=wms&request=GetCapabilities";
    }    
    
    return cap_url;
    
}

/*
 * Dado un nombre de capa corrobora si existe o no en el mapa
 * 
 * @param {type} nombre: nombre de la capa
 * @returns {Boolean}: verdadero si existe el nombre de capa, falso si no existe
 */
function existeNombreCapa(nombre){
    
    if (app.map.getLayersByName(nombre)[0] == null){
        return false;
    }else{
        return true;
    }    
    
}

/*
 * Dado un nombre de capa lo numera en caso de que ya exista una capa con el mismo nombre
 * 
 * @param {type} nombre: nombre de capa
 * @returns {Number}
 */
function numerarNombre(nombre){
    
    var nombrecapa = nombre;
    var i = 1;    
    
    while(existeNombreCapa(nombrecapa)){
        nombrecapa = nombre + i;
        i++;
    }
    
    return nombrecapa;
    
}

/*
 * Gestiona el control de agregar nuevas capas
 * 
 * @param {type} node: nodo sobre el que se agregarán las nuevas capas. Si es null, las nuevas capas se agregarán al raíz
 * @returns {undefined}
 */


/*
 * Da formato a la información obtenida del control mouseposition 
 * 
 * @param {type} coordinate
 * @param {type} type
 * @returns {String}
 */
function convertDMS(coordinate, type) {
    var coords;

    abscoordinate = Math.abs(coordinate)
    coordinatedegrees = Math.floor(abscoordinate);

    coordinateminutes = (abscoordinate - coordinatedegrees)/(1/60);
    tempcoordinateminutes = coordinateminutes;
    coordinateminutes = Math.floor(coordinateminutes);
    coordinateseconds = (tempcoordinateminutes - coordinateminutes)/(1/60);
    coordinateseconds =  Math.round(coordinateseconds*10);
    coordinateseconds /= 10;
    coordinateseconds = Math.round(coordinateseconds);

    if( coordinatedegrees < 10 )
      coordinatedegrees = "0" + coordinatedegrees;

    if( coordinateminutes < 10 )
      coordinateminutes = "0" + coordinateminutes;

    if( coordinateseconds < 10 )
      coordinateseconds = "0" + coordinateseconds;

      if(type == "LAT"){
          coords = "<b>lat: </b>"+coordinatedegrees+"º "+coordinateminutes+"' "+coordinateseconds+"'' "+this.getHemi(coordinate, type)+"&nbsp&nbsp";
      }else{
          coords = "<b>lon: </b>"+coordinatedegrees+"º "+coordinateminutes+"' "+coordinateseconds+"'' "+this.getHemi(coordinate, type);
      }            

    return coords;
}

/*
 * Devuelve la abreviación de hemisferio para una coordenada dada
 */
function getHemi(coordinate, type) {
    var coordinatehemi = "";
    if (type == 'LAT') {
      if (coordinate >= 0) {
        coordinatehemi = "N";
      }
      else {
        coordinatehemi = "S";
      }
    }
    else if (type == 'LON') {
      if (coordinate >= 0) {
        coordinatehemi = "E";
      } else {
        coordinatehemi = "O";
      }
    }

    return coordinatehemi;
}

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
     
    
};

/*
 * crea el archivo de exportación del árbol de capas 
 */
function saveLayerTree(father, children){
    
    for(var i = 0; i < children.length; i++){
        if(children[i].isLeaf()){
            var layer = app.map.getLayersByName(children[i].attributes.layer)[0];
            father.push({"type":"leaf", "title":children[i].attributes.text, "server":layer.url, "options":layer.options, "params":layer.params});
        }else{
            var grandchildren = [];
            saveLayerTree(grandchildren,children[i].childNodes);
            father.push({"type":"folder","name":children[i].attributes.text,"children":grandchildren});
            
        }
    }    
    
}

/*
 * crea el archivo de exportación del índice de las capas 
 */
function saveLayerIndex(){
    
    var index = [];
    
    for(var i = 0; i < app.map.layers.length; i++){
        index[i] = app.map.layers[i].name;
    }    
    
    return index;
    
}

/*
 * restaura el índice de las capas dado un archivo de resguardo
 */
function restoreIndex(index){
    
    var layer;
    for(var i = 0; i < index.length; i++){
        layer = app.map.getLayersByName(index[i])[0];
        app.map.setLayerIndex(layer,i);
    }      
    
}

/*
 * Dado un archivo de resguardo de árbol de capas, agrega la descendencia a un nodo padre dado
 */
function restoreTree(father,children){
    
    var newNode;
    
    for(var x = 0; x < children.length;x++){
        if(children[x].type == "folder"){
            newNode = createNode(children[x].name);
            father.appendChild(newNode);
            restoreTree(newNode,children[x].children);
        }else{
            newNode = createLeaf(children[x].title,children[x].server,children[x].params,children[x].options);
            father.appendChild(newNode);
        }          
    }
    
}

/*
 * Dado un nodo, expande todos sus nodos hijos
 */
function expandAll(node){
    if (!node.isLeaf()){
        node.expand();
        node.eachChild(function(childnode){
            expandAll(childnode);
        });
    }
}

/*
 * Dado un nodo, colapsa todos sus nodos hijos
 */
function collapseAll(node){
    if (!node.isLeaf()){
        node.collapse();
        node.eachChild(function(childnode){
            collapseAll(childnode);
        });
    }    
}

/*
 * Dado un nodo, elimina todos sus nodos hijos y a sí mismo
 */
function removeLayers(node){
    
    node.eachChild(function(childnode){
        if (childnode.isLeaf()){
            app.map.removeLayer(app.map.getLayersByName(childnode.attributes.layer)[0]);        
        }else{
            removeLayers(childnode);
        } 
    });
    
}

/*
 * Dado un nodo, le asigna un nombre
 */
function setFolderName(e){       
    
    var folder = e;
    
    Ext.MessageBox.prompt('Nombre de carpeta', '', function(btn, text){
        if (btn == "ok"){
            folder.setText(text);
        }
    });
        
}

/*
 * Crea una instancia de un nodo que no es hoja
 */
function createNode(text){
    
    var node = new Ext.tree.TreeNode({
        text: text,
        expanded: false,
        icon: "img/folder.png",
        leaf: false,
        listeners:{
            contextmenu: function(nodo, event){handler.onNodeContextMenu(nodo, event);}
        }
    });

    return node;
    
}

/*
 * Crea una instancia de un nodo hoja
 */
function createLeaf(titulo, servidor, params, options){    
    
    app.map.addLayer(new OpenLayers.Layer.WMS(
        titulo, 
        servidor, 
        params, 
        options
    ));          
    
    var leaf = new GeoExt.tree.LayerNode({
        text: titulo,
        layer: titulo,   
        icon: "img/layers3.png",
        leaf:true,
        listeners:{
            contextmenu: function(leaf, event){handler.onLeafContextMenu(leaf, event, titulo, params)},
            checkchange: function(leaf){leaf.select();}
        },
        map: app.map
    });
    
    return leaf;
 
}




