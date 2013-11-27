/**
 *  @file js/servidores.js
 *  @author Bruno José Vecchietti <bruno88tw@gmial.com>
 *  @fileOverview Archivo en el que se definen las funciones para la construcción y acceso a los paneles de la aplicacón.
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
 * Store de servidores WMS.
 * @type Ext.data.ArrayStore
 */
app.wmsServerStore = new Ext.data.ArrayStore({
    fields: ['nombre', 'url'],
    data: [
        ["Dirección General de Estadística y Censos","http://idedgeyc.chubut.gov.ar/geoserver/wms"],
        ["Mapa Educativo","http://www.mapaeducativo.edu.ar/geoserver/ogc/ows"],
        ["Instituto Geográfico Nacional","http://wms.ign.gob.ar/geoserver/ows"],    
        ["Secretaría de Ciencia Tecnología e Innovación","http://200.63.163.47/geoserver/wms"],
        ["Ministerio de Educación","http://www.chubut.edu.ar:8080/geoserver/wms"],
        ["Secretaría de Energía","http://sig.se.gob.ar/cgi-bin/mapserv6?MAP=/var/www/html/visor/geofiles/map/mapase.map"]        
    ],
    idIndex: 0 // id for eache record will be the first element (in this case, 'nombre')
});

/**
 * 
 * @type Boolean
 */
app.capabilities = {};

function agregarServidor(nombre, server){
    
    new GeoExt.data.WMSCapabilitiesStore({  
        url: getCapabilitiesUrl(server),
        autoLoad: true,
        listeners:{           
            load: function(){                                   
                app.capabilities[server] = this;
                app.wmsServerStore.loadData([[nombre,server]],true);
            },
            exception: function(){
                Ext.MessageBox.alert('Error', 'Ha ocurrido un error al conectarse con el servidor.');
            }             
                   
        }
    });
    
}

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