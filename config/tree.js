/**
 *  @file config/tree.js
 *  @author Bruno José Vecchietti <bruno88tw@gmial.com>
 *  @fileOverview Archivo que contiene la configuración del árbol de capas y la configuración del orden de capas a cargar en el inicio de la aplicación.
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
 * Contiene la configuración del árbol de capas y la configuración del orden de las capas.
 * @namespace
 */
var config = {};

/**
 * Árbol de capas. Si no se usa se debe fijar en null.
 * @type Array
 */
config.tree = [    
//    {"type":"folder","name":"DGEyC","children":[               
//            {"type":"leaf", "title":"Departamentos", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:Departamentos", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//            {"type":"leaf", "title":"Fracciones", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_fracciones", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//            {"type":"leaf", "title":"Radios", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_radios", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//            {"type":"leaf", "title":"Localidades", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_localidades", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//            {"type":"folder", "name":"Urbano", "children":[
//                    {"type":"leaf", "title":"Calles", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "urbano:calles", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false, displayInLayerSwitcher: false}},
//                    {"type":"leaf", "title":"Manzanas", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "urbano:manzanas", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//            ]},
//            {"type":"folder", "name":"Rural", "children":[
//                    {"type":"leaf", "title":"Censo Nac. Agropecuario 2002", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:parcelas", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//                    {"type":"leaf", "title":"Censo Nac. Agropecuario 2008", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_parcelas_cna2008", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
//            ]},
//            {"type":"folder", "name":"Mapas temáticos", "children":[
//                    {"type":"leaf", "title":"Población total 2010", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_departamentos3pob2010", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//                    {"type":"leaf", "title":"Índice de debilidad social", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_debilidad_social", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//                    {"type":"leaf", "title":"Índice de delincuencia", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_delincuencia", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//                    {"type":"leaf", "title":"Porcentaje de población extranjera", "server":"http://eycchubut.sytes.net/geoserver/wms", "params":{layers: "rural:v_poblacion_extranjera", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
//            ]}            
//    ]},
    {"type":"folder","name":"DGEyC","children":[               
            {"type":"leaf", "title":"Comarcas", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "rural:comarcas", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Departamentos", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "rural:departamentos", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Fracciones", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "rural:fracciones", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Radios", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "rural:radios", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Localidades", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "rural:localidades", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Ejidos", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "urbano:ejidos_catastro_completos", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"folder", "name":"Urbano", "children":[
                    {"type":"leaf", "title":"Calles", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "urbano:calles", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false, displayInLayerSwitcher: false}},
                    {"type":"leaf", "title":"Manzanas", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "urbano:manzanas", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
                    {"type":"leaf", "title":"Barrios", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "urbano:barrios", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
            ]},
            {"type":"folder", "name":"Rural", "children":[
                    {"type":"leaf", "title":"Censo Nac. Agropecuario 2002", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "rural:cna2002", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
                    {"type":"leaf", "title":"Censo Nac. Agropecuario 2008", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "rural:cna2008", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
            ]},
            {"type":"folder", "name":"Mapas temáticos", "children":[
                    {"type":"leaf", "title":"Población total 2010", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "rural:poblacion_2010", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
                    {"type":"leaf", "title":"Índice de debilidad social", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "rural:debilidad_social", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
                    {"type":"leaf", "title":"Índice de delincuencia", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "rural:delincuencia", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
                    {"type":"leaf", "title":"Porcentaje de población extranjera", "server":"http://192.168.0.61/geoserver/wms", "params":{layers: "rural:poblacion_extranjera", transparent: 'true', format: 'image/png'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
            ]}            
    ]} 
];

/**
 * Orden de las capas.
 * @type Array
 */
config.index = [
    "OpenStreetMap","Google Streets","Google Terrain",
    "Google Satellite","Google Hybrid","Bing Road",
    "Bing Aerial","Bing Hybrid","MapQuest",
    "MapQuest Aerial","Población total 2010","Índice de debilidad social",
    "Índice de delincuencia","Porcentaje de población extranjera","Censo Nac. Agropecuario 2002",
    "Censo Nac. Agropecuario 2008","Radios","Fracciones",
    "Departamentos","Manzanas","Calles","Localidades"
];        
