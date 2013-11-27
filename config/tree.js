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
config.tree = 
[    
    {"type":"folder","name":"DGEyC","children":[               
            {"type":"leaf", "title":"Comarcas", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:comarcas", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Departamentos", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:departamentos", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Fracciones", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:fracciones", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Radios", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:radios", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
            {"type":"leaf", "title":"Localidades", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:localidades", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: true}},
            {"type":"leaf", "title":"Ejidos", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "urbano:ejidos", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},                      
    ]},
    {"type":"folder", "name":"Urbano", "children":[
        {"type":"leaf", "title":"Calles", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "urbano:calles", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
        {"type":"leaf", "title":"Manzanas", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "urbano:manzanas", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
        {"type":"leaf", "title":"Barrios", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "urbano:barrios", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
    ]},
    {"type":"folder", "name":"Rural", "children":[
        {"type":"leaf", "title":"Censo Nac. Agropecuario 2002", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:cna2002", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
        {"type":"leaf", "title":"Censo Nac. Agropecuario 2008", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:CNA2008", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
    ]},
    {"type":"folder", "name":"Mapas temáticos", "children":[

        {"type":"leaf", "title":"Población 2010 por departamento", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:poblacion_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
        {"type":"leaf", "title":"Población extranjera 2010 por departamento", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_departamentos_extranjeros_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},                            
        {"type":"leaf", "title":"Población 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_poblacion_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
        {"type":"leaf", "title":"Población extranjera 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_extranjeros_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
        {"type":"leaf", "title":"Hogares 2010 con NBI por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_algun_nbi_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
        {"type":"leaf", "title":"Índice femeneidad 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_femeneidad_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
        {"type":"leaf", "title":"Población 2010 por localidad", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_localidades_poblacion_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
 
    ]} ,

];

//config.tree = 
//[    
//    {"type":"folder","name":"DGEyC","children":[               
//            {"type":"leaf", "title":"Comarcas", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:comarcas", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//            {"type":"leaf", "title":"Departamentos", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:departamentos", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//            {"type":"leaf", "title":"Fracciones", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:fracciones", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//            {"type":"leaf", "title":"Radios", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:radios", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//            {"type":"leaf", "title":"Localidades", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:localidades", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: true}},
//            {"type":"leaf", "title":"Ejidos", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "urbano:ejidos", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//            {"type":"folder", "name":"Urbano", "children":[
//                {"type":"leaf", "title":"Calles", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "urbano:calles", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//                {"type":"leaf", "title":"Manzanas", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "urbano:manzanas", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//                {"type":"leaf", "title":"Barrios", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "urbano:barrios", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
//            ]},
//            {"type":"folder", "name":"Rural", "children":[
//                {"type":"leaf", "title":"Censo Nac. Agropecuario 2002", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:cna2002", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//                {"type":"leaf", "title":"Censo Nac. Agropecuario 2008", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:CNA2008", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
//            ]},
//            {"type":"folder", "name":"Mapas temáticos", "children":[
//                {"type":"folder","name":"Departamentos","children":[
//                    {"type":"leaf", "title":"Población 2010 por departamento", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:poblacion_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//                    {"type":"leaf", "title":"Población extranjera 2010 por departamento", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_departamentos_extranjeros_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},                            
//                ]},   
//                {"type":"folder","name":"Radios","children":[
//                    {"type":"leaf", "title":"Población 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_poblacion_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//                    {"type":"leaf", "title":"Población extranjera 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_extranjeros_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//                    {"type":"leaf", "title":"Hogares 2010 con NBI por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_algun_nbi_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//                    {"type":"leaf", "title":"Índice femeneidad 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_femeneidad_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//                ]},   
//                {"type":"folder","name":"Localidades","children":[
//                    {"type":"leaf", "title":"Población 2010 por localidad", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_localidades_poblacion_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
//                ]},   
//            ]}            
//    ]}
//];

/**
 * Orden de las capas.
 * @type Array
 */
config.index = [
    "IGN",
    "OpenStreetMap",
    "Google Streets","Google Terrain",
    "Google Satellite","Google Hybrid","Bing Road",
    "Bing Aerial","Bing Hybrid","MapQuest", "MapQuest Aerial",
    
    "Población 2010 por departamento",
/*  "Población 2010 por fraccion",*/ 
    "Población 2010 por radio","Población 2010 por localidad",
/*"Índice de debilidad social",*/
    "Población extranjera 2010 por departamento","Población extranjera 2010 por radio","Hogares 2010 con NBI por radio",
    "Índice femeneidad 2010 por radio","Censo Nac. Agropecuario 2002",
    "Censo Nac. Agropecuario 2008","Radios","Fracciones",
    "Departamentos","Comarcas","Manzanas","Calles","Localidades","Ejidos","Barrios",
    
    "Location","wfsLayer"
];        