/*
 * IDE Chubut
 * 
 * Escrito por Bruno J. Vecchietti
 * 
 * functions.js
 * 
 * Contiene funciones
 * 
 */

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
     
    
}