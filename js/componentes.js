componentes.getNavegacionButton = function(){
    
    var navegacionButon = new GeoExt.Action({
        control: new OpenLayers.Control.Navigation(),
        map: app.map,
        icon: "img/move2.png",
        toggleGroup: "nav",
        tooltip: "Navegación",
        checked: true
    });
    
    return navegacionButon;
            
};

componentes.getZoomToMaxExtentButton = function(){
    
    var zoomToMaxExtentButton = new GeoExt.Action({
        control: new OpenLayers.Control.ZoomToMaxExtent(),
        map: app.map,
        icon: "img/magnifier-zoom-fit.png",
        tooltip: 'Zoom a la máxima extensión'
    });
    
    return zoomToMaxExtentButton;
    
};

componentes.getZoomInButton = function (){
    
    var zoomInButton = new GeoExt.Action({
        control: new OpenLayers.Control.ZoomBox(),
        map: app.map,
        icon: "img/magnifier-zoom-in.png",
        toggleGroup: "nav",
        tooltip: "Zoom in"
    });
    
    return zoomInButton;
    
};