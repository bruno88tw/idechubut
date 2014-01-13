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
 * Dado un archivo de resguardo de árbol de capas, agrega la descendencia a un nodo padre dado
 * @param {type} father
 * @param {type} children
 * @returns {undefined} Esta función no devuelve resultados.
 */
function restoreTree(father,children){
    
    var newNode;
    
    for(var x = 0; x < children.length; x++){
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
 * 
 * @param {type} capas
 * @returns {undefined}
 */
function restoreLayers(capas){
    
    for(var x = 0; x < capas.length; x++){
        
        app.map.addLayer(new OpenLayers.Layer.WMS(
            capas[x].title, 
            capas[x].server, 
            capas[x].params, 
            capas[x].options
        ));    
        
        app.map.raiseLayer(app.map.getLayersByName("wfsLayer")[0],1);
        app.map.raiseLayer(app.map.getLayersByName("Location")[0],1);
        
    }

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
        style: {'background':'#000000'},
        listeners:{
            click: function(leaf, event){
                Ext.getCmp("treePanelTopbarEliminar").disable();
                Ext.getCmp("treePanelTopbarPropiedades").disable();
                Ext.getCmp("treePanelTopbarAtributos").disable();    
                Ext.getCmp("treePanelTopbarZoomCapa").disable();  
            },
            beforecollapse: function(leaf, event){
                this.setIcon("img/folder.png");
            },
            beforeexpand: function(leaf, event){
                this.setIcon("img/folder-open.png");
            }
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
function createLeaf(titulo){                
    
    var layer = app.map.getLayersByName(titulo)[0];
    var servidor = layer.url;
    var params = layer.params;
    var options = layer.options;
    
    var store = new GeoExt.data.LayerStore({
        map: app.map,
        layers: app.map.layers
    });

    var uiClass = Ext.extend(
            GeoExt.tree.LayerNodeUI, 
            new GeoExt.tree.TreeNodeUIEventMixin()
    );  
        
    var item;    
    var layers = app.capabilities[servidor].data.items;                
    for(var x=0; x < layers.length; x++){
        if( layers[x].data.name == params.LAYERS){
            item = layers[x].data;
            break;
        }
    }        
    
    var leaf = new GeoExt.tree.LayerNode({
        text: titulo,
        layer: titulo,          
        icon: "img/layers3.png",
        leaf:true,
        checked: false,
        listeners:{
            checkchange: function(leaf, checked){
                leaf.select();
                Ext.getCmp("treePanelTopbarEliminar").enable();
                Ext.getCmp("treePanelTopbarPropiedades").enable();
                Ext.getCmp("treePanelTopbarAtributos").enable();  
                Ext.getCmp("treePanelTopbarZoomCapa").enable();  
                if(checked){
                    leaf.component.show();
                }else{
                    leaf.component.hide();
                }
                
            },
            click: function(leaf, event){
                Ext.getCmp("treePanelTopbarEliminar").enable();
                Ext.getCmp("treePanelTopbarPropiedades").enable();
                Ext.getCmp("treePanelTopbarAtributos").enable();  
                Ext.getCmp("treePanelTopbarZoomCapa").enable();  
            }
        },                 
        uiProvider: uiClass,        
        component: new Ext.Panel({
            width: 285,
            hidden:true,
            autoScroll:true,
            border: false,
            bodyCfg : { cls:'x-panel-body your-own-rule' , style: {'background':'rgba(255, 255, 255,0.3)'} },
            style: {'padding-top':'5px','padding-bottom':'5px'},
            items:[      
                {
                    border: false,
                    width: 270,
                    bodyCfg : { cls:'x-panel-body your-own-rule' , style: {'background':'rgba(255, 255, 255, 0)'} },
                    html: "<div style='width:275px; font-weight:normal; padding-top:5px; padding-left:5px; padding-right:5px; white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word;'>"+item.abstract+"</div>"
                },
                new GeoExt.WMSLegend({
                    layerRecord: store.getByLayer(layer),
                    showTitle: false,
                    hidden: true,
                    baseParams: {
                        FORMAT: 'image/png',
                        LEGEND_OPTIONS: 'forceLabels:on'
                    },                            
                    defaults: {
                        style: 'padding-top:3px; padding-left:3px'
                    }
                 })                
            ]
        }),              
        map: app.map
    });  

    return leaf;
 
};

/**
 * 
 * @param {type} text
 * @param {type} layer
 * @param {type} icon
 * @returns {unresolved}
 */
function capaBase(text, layer, icon){    
    
    var capaBase = new GeoExt.tree.LayerNode({
        checkedGroup:"capasBase",
        text: text,
        layer: layer,   
        icon: icon,
        leaf:true,
        map: app.map,
        listeners:{
            click: function(leaf, event){
                Ext.getCmp("treePanelTopbarEliminar").disable();
                Ext.getCmp("treePanelTopbarPropiedades").disable();
                Ext.getCmp("treePanelTopbarAtributos").disable(); 
                Ext.getCmp("treePanelTopbarZoomCapa").disable();  
            }
        }   
    });
    
    return capaBase;
    
}
