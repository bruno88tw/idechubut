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
 * 
 * @returns {undefined}
 */
function loadTree(){    
    
    createCapasBaseNode();
    capaBase("IGN","IGN","img/ign.png");
    capaBase("OpenStreetMap","OpenStreetMap","img/osm.png");
    capaBase("Google Streets","Google Streets","img/google.png");
    capaBase("Google Terrain","Google Terrain","img/google.png");
    capaBase("Google Satellite","Google Satellite","img/google.png");
    capaBase("Google Hybrid","Google Hybrid","img/google.png");
    capaBase("Bing Road","Bing Road","img/bing.png");
    capaBase("Bing Aerial","Bing Aerial","img/bing.png");
    capaBase("Bing Hybrid","Bing Hybrid","img/bing.png");
    capaBase("MapQuest","MapQuest","img/mapQuest.png");
    capaBase("MapQuest Aerial","MapQuest Aerial","img/mapQuest.png");
    capaBase("Sin capa base","Blank","img/prohibition.png");                                             
    restoreTree(app.rootnode,config.tree);     
    
}

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
            newNode = createNode(children[x].name, children[x].cls, father);
            restoreTree(newNode,children[x].children);
        }else{
            newNode = createLeaf(children[x].title, father);
        }          
    }
    
};

/**
 * 
 * @param {type} text
 * @param {type} cls
 * @param {type} father
 * @returns {unresolved}
 */
function createNode(text, cls, father){
    
    var node = new Ext.tree.TreeNode({
        text: text,
        expanded: false,
        icon: "img/folder.png",
        leaf: false,
        cls: cls,
        listeners:{
            click: function(){this.toggle();},
            beforecollapse: function(){this.setIcon("img/folder.png");},
            beforeexpand: function(){this.setIcon("img/folder-open.png");},
            expand: function(node){handler.onNodeExpand(node);}
        }
    });           
    
    father.appendChild(node);   
    
    if(cls != "none"){
        var el = node.getUI().getEl();
        el.childNodes[1].className = app.subCategorias[cls];
    }

    return node;
    
};

/**
 * 
 * @param {type} titulo
 * @param {type} father
 * @returns {unresolved}
 */
function createLeaf(titulo, father){                
    
    var layer = app.map.getLayersByName(titulo)[0];
    
    var store = new GeoExt.data.LayerStore({
        map: app.map,
        layers: app.map.layers
    });          
    
    var layers = app.capabilities[layer.url].data.items;                
    for(var x=0; x < layers.length; x++){
        if( layers[x].data.name == layer.params.LAYERS){
            var item = layers[x].data;
            break;
        }
    }   

    var cmpPanel = new Ext.Panel({
        autoScroll:true,
        border: false,
        hidden: true,
        bodyCfg : { cls:'x-panel-body' , style: {'background':'rgba(255, 255, 255,0.3)'} },
        style: {'padding-top':'5px','padding-bottom':'5px','margin-bottom':'-5px','margin-top':'5px'},  
        items:[            
            {
                border: false,
                bodyCfg : { cls:'x-panel-body' , style: {'background':'rgba(255, 255, 255, 0)'} },
                html: "<div style='font-weight:normal; padding-top:5px; padding-left:5px; padding-right:5px; white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word;'>"+item.abstract+"</div>"
            },
            new GeoExt.WMSLegend({
                layerRecord: store.getByLayer(layer),
                showTitle: false,
                baseParams: {
                    FORMAT: 'image/png',
                    LEGEND_OPTIONS: 'forceLabels:on'
                },                            
                defaults: {
                    style: 'padding-top:3px; padding-left:3px'
                }
             })                
        ]
    });

    var leaf = new GeoExt.tree.LayerNode({
        text: titulo,
        layer: titulo,          
        icon: "img/layers3.png",
        leaf:true,
        checked: false,    
        listeners:{
            checkchange: function(leaf, checked){
                leaf.select();
                if(checked){
                    leaf.component.show();
                }else{
                    leaf.component.hide();
                }      
            }
        },
        uiProvider: Ext.extend(
            GeoExt.tree.LayerNodeUI, 
            new GeoExt.tree.TreeNodeUIEventMixin()
        ),        
        component: cmpPanel,              
        map: app.map
    });        
    
    father.appendChild(leaf);    

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
    
    app.capasbasenode.appendChild(capaBase);
    
    return capaBase;
    
}

/**
 * 
 * @returns {undefined}
 */
function createCapasBaseNode(){
    
    app.capasbasenode = new Ext.tree.TreeNode({
        text: "Capas base",
        icon: "img/folder.png",
        leaf: false,
        cls: 'categoria1',
        listeners:{
            click: function(leaf, event){
                if(this.isExpanded()){
                    this.collapse();
                }else{
                    this.expand();
                }
            },
            beforecollapse: function(leaf, event){
                this.setIcon("img/folder.png");
            },
            beforeexpand: function(leaf, event){
                this.setIcon("img/folder-open.png");
            }
        }        
    }); 
    
    app.rootnode.appendChild(app.capasbasenode);

    app.capasbasenode.getUI().getEl().childNodes[1].className = app.subCategorias["categoria1"];     
    
}