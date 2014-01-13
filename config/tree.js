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

config.capas = [
    {"title":"Población 2010 por localidad", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_localidades_poblacion_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Viviendas de calidad insuficiente por radio 2010", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_viv_insuficientes_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}, 
    {"title":"Viviendas de calidad básica por radio 2010", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_viv_basicas_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Viviendas de calidad satisfactoria por radio 2010", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_viv_satisfactorias_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}, 
    {"title":"Viviendas particulares ocupadas por radio 2010", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_viv_ocupadas_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}, 
    {"title":"Hogares sin gas por radio 2010", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_hogares_sin_gas_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Hogares sin cloacas por radio 2010", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_hogares_sin_cloacas_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Hogares sin agua de red por radio 2010", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_hogares_sin_agua_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Hogares 2010 con NBI por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_algun_nbi_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Promedio de personas por vivienda 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_personas_x_viv_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},  
    {"title":"Promedio de hogares por vivienda 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_hogares_x_viv_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},  
    {"title":"Hogares 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_hogares_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}, 
    {"title":"Tasa de inactividad 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_tasa_inactividad_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}, 
    {"title":"Tasa de actividad 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_tasa_actividad_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},  
    {"title":"Tasa de analfabetismo 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_tasa_analfabetismo_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},  
    {"title":"Población extranjera 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_extranjeros_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},  
    {"title":"Población sin instrucción 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_pob_sin_instrucc_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},   
    {"title":"Población escolarizada 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_escolarizados_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Porcentaje de población de 65 y más años 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_p_65_y_mas_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Porcentaje de población de 0 a 14 años 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_p_0_a_14_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},   
    {"title":"Índice femeneidad 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_femeneidad_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},   
    {"title":"Varones 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_varones_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Mujeres 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_mujeres_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Población 2010 por radio", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_radios_poblacion_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Población extranjera 2010 por departamento", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_departamentos_extranjeros_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Población 2010 por departamento", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:poblacion_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Censo Nac. Agropecuario 2008", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:CNA2008", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Censo Nac. Agropecuario 2002", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:cna2002", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Barrios", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "urbano:barrios", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Manzanas", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "urbano:manzanas", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Calles", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "urbano:calles", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Ejidos", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "urbano:ejidos", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Localidades", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:localidades", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: true}},
    {"title":"Radios", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:radios", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Fracciones", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:fracciones", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Departamentos", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:departamentos", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}},
    {"title":"Comarcas", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:comarcas", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}
];

/**
 * Árbol de capas. Si no se usa se debe fijar en null.
 * @type Array
 */
config.tree = 
[    
    {"type":"folder","name":"DGEyC","children":[               
            {"type":"leaf", "title":"Comarcas"},
            {"type":"leaf", "title":"Departamentos"},
            {"type":"leaf", "title":"Fracciones"},
            {"type":"leaf", "title":"Radios"},
            {"type":"leaf", "title":"Localidades"},
            {"type":"leaf", "title":"Ejidos"},
            {"type":"folder", "name":"Urbano", "children":[
                {"type":"leaf", "title":"Calles"},
                {"type":"leaf", "title":"Manzanas"},
                {"type":"leaf", "title":"Barrios"}
            ]},
            {"type":"folder", "name":"Rural", "children":[
                {"type":"leaf", "title":"Censo Nac. Agropecuario 2002"},
                {"type":"leaf", "title":"Censo Nac. Agropecuario 2008"}
            ]}                        
    ]},
    {"type":"folder", "name":"Mapas temáticos", "children":[
        {"type":"folder","name":"Departamentos","children":[
            {"type":"leaf", "title":"Población 2010 por departamento"},
            {"type":"leaf", "title":"Población extranjera 2010 por departamento", "server":"http://idedgeyc.chubut.gov.ar/geoserver/wms", "params":{layers: "rural:v_departamentos_extranjeros_2010", transparent: 'true', format: 'image/png', tiled: 'true'}, "options":{isBaseLayer: false, visibility: false, singleTile: false}}                           
        ]},   
        {"type":"folder","name":"Radios","children":[
            {"type":"leaf", "title":"Población 2010 por radio"},
            {"type":"leaf", "title":"Mujeres 2010 por radio"},
            {"type":"leaf", "title":"Varones 2010 por radio"},
            {"type":"leaf", "title":"Índice femeneidad 2010 por radio"},
            {"type":"leaf", "title":"Porcentaje de población de 0 a 14 años 2010 por radio"},
            {"type":"leaf", "title":"Porcentaje de población de 65 y más años 2010 por radio"},
            {"type":"leaf", "title":"Población escolarizada 2010 por radio"},
            {"type":"leaf", "title":"Población sin instrucción 2010 por radio"},
            {"type":"leaf", "title":"Población extranjera 2010 por radio"},
            {"type":"leaf", "title":"Tasa de analfabetismo 2010 por radio"},
            {"type":"leaf", "title":"Tasa de actividad 2010 por radio"},
            {"type":"leaf", "title":"Tasa de inactividad 2010 por radio"},
            {"type":"leaf", "title":"Hogares 2010 por radio"},
            {"type":"leaf", "title":"Promedio de hogares por vivienda 2010 por radio"},
            {"type":"leaf", "title":"Promedio de personas por vivienda 2010 por radio"},
            {"type":"leaf", "title":"Hogares 2010 con NBI por radio"},
            {"type":"leaf", "title":"Hogares sin agua de red por radio 2010"},
            {"type":"leaf", "title":"Hogares sin cloacas por radio 2010"},
            {"type":"leaf", "title":"Hogares sin gas por radio 2010"},
            {"type":"leaf", "title":"Viviendas particulares ocupadas por radio 2010"},
            {"type":"leaf", "title":"Viviendas de calidad satisfactoria por radio 2010"},
            {"type":"leaf", "title":"Viviendas de calidad básica por radio 2010"},
            {"type":"leaf", "title":"Viviendas de calidad insuficiente por radio 2010"}
        ]},   
        {"type":"folder","name":"Localidades","children":[
            {"type":"leaf", "title":"Población 2010 por localidad"}
        ]}  
    ]}
];
