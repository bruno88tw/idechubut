/**
 *  @file js/functions.js
 *  @author Bruno José Vecchietti <bruno88tw@gmial.com>
 *  @fileOverview Archivo en el que se definen funciones de variada utilidad.
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
 * Dada una url de un servidor wms devuelve la url del getCapabilities.
 * @param {String} wms_url URL del servidor wms.
 * @returns {String} URL del protocolo WMS getCapabilities del servidor WMS dado.
 */
function getCapabilitiesUrl(wms_url){

    var cap_url;

    if (wms_url.indexOf("?") == -1){
        cap_url = wms_url + "?service=wms&request=GetCapabilities";
    }else{
        cap_url = wms_url + "&service=wms&request=GetCapabilities";
    }    
    
    return cap_url;
    
};

/**
 * Dado un nombre de capa corrobora si existe o no en el mapa.
 * @param {String} nombre nombre de la capa.
 * @returns {Boolean} verdadero si existe el nombre de capa, falso si no existe.
 */
function existeNombreCapa(nombre){
    
    if (app.map.getLayersByName(nombre)[0] == null){
        return false;
    }else{
        return true;
    }    
    
};

/**
 * Dado un nombre de capa lo numera en caso de que ya exista una capa con el mismo nombre.
 * @param {String} nombre nombre de capa
 * @returns {String} El nombre de la capa numerado.
 */
function numerarNombre(nombre){
    
    var nombrecapa = nombre;
    var i = 1;    
    
    while(existeNombreCapa(nombrecapa)){
        nombrecapa = nombre + i;
        i++;
    }
    
    return nombrecapa;
    
};

/**
 * Da formato a la información obtenida del control mouseposition.
 * @param {type} coordinate
 * @param {type} type
 * @returns {String}
 */
function convertDMS(coordinate, type) {
    var coords;

    abscoordinate = Math.abs(coordinate);
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
};

/**
 * Devuelve la abreviación de hemisferio para una coordenada dada.
 * @param {type} coordinate
 * @param {type} type
 * @returns {String}
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
};

/**
 * Crea el archivo de exportación del árbol de capas.
 * @param {type} father
 * @param {type} children
 * @returns {undefined} Esta función no devuelve resultados.
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
    
};

/**
 * Crea el archivo de exportación del índice de las capas.
 * @returns {undefined} Esta función no devuelve resultados.
 */
function saveLayerIndex(){
    
    var index = [];
    
    for(var i = 0; i < app.map.layers.length; i++){
        index[i] = app.map.layers[i].name;
    }    
    
    return index;
    
};

/**
 * Restaura el índice de las capas dado un archivo de resguardo.
 * @param {type} index
 * @returns {undefined} Esta función no devuelve resultados.
 */
function restoreIndex(index){
    
    var layer;
    for(var i = 0; i < index.length; i++){
        layer = app.map.getLayersByName(index[i])[0];
        app.map.setLayerIndex(layer,i);
    }      
    
};

/**
 * Dado un archivo de resguardo de árbol de capas, agrega la descendencia a un nodo padre dado
 * @param {type} father
 * @param {type} children
 * @returns {undefined} Esta función no devuelve resultados.
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
    
};

/**
 * Dado un nodo, expande todos sus nodos hijos.
 * @param {type} node
 * @returns {undefined} Esta función no devuelve resultados.
 */
function expandAll(node){
    if (!node.isLeaf()){
        node.expand();
        node.eachChild(function(childnode){
            expandAll(childnode);
        });
    }
};

/**
 * Dado un nodo, colapsa todos sus nodos hijos.
 * @param {type} node
 * @returns {undefined} Esta función no devuelve resultados.
 */
function collapseAll(node){
    if (!node.isLeaf()){
        node.collapse();
        node.eachChild(function(childnode){
            collapseAll(childnode);
        });
    }    
};

/**
 * Dado un nodo, elimina todos sus nodos hijos y a sí mismo.
 * @param {type} node
 * @returns {undefined} Esta función no devuelve resultados.
 */
function removeLayers(node){
    
    if (node.isLeaf()){
        app.map.removeLayer(app.map.getLayersByName(node.attributes.layer)[0]);        
    }else{
        for(var i = 0; i < node.childNodes.length; i++){
            removeLayers(node.childNodes[i]);
        }
        
    } 
    
//    node.eachChild(function(childnode){
//        if (childnode.isLeaf()){
//            app.map.removeLayer(app.map.getLayersByName(childnode.attributes.layer)[0]);        
//        }else{
//            removeLayers(childnode);
//        } 
//    });
    
};

/**
 * Dado un nodo, le asigna un nombre.
 * @param {type} e
 * @returns {undefined} Esta función no devuelve resultados.
 */
function setFolderName(e){       
    
    var folder = e;
    
    Ext.MessageBox.prompt('Nombre de carpeta', '', function(btn, text){
        if (btn == "ok"){
            folder.setText(text);
        }
    });
        
};

/**
 * Crea una instancia de un nodo que no es hoja.
 * @param {type} text
 * @returns {Ext.tree.TreeNode}
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
    
};

/**
 * Crea una instancia de un nodo hoja.
 * @param {type} titulo
 * @param {type} servidor
 * @param {type} params
 * @param {type} options
 * @returns {GeoExt.tree.LayerNode}
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
 
};