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
function agregarCapas(node){

   var mask, capStore, capabilitiesGrid, capabilitiesCombo, window;
    
   capStore = new GeoExt.data.WMSCapabilitiesStore({  
        url: "asdf",
        autoLoad: false,
        listeners:{
            beforeload: function(){
                mask = new Ext.LoadMask(window.el, {msg:"Conectando..."});
                mask.show();
            },
            load: function(){
                mask.hide();
            },
            exception: function(){
                mask.hide();
                Ext.MessageBox.alert('Error', 'Ha ocurrido un error en la conexión con el servidor indicado.');
            }
        }
    });    
    
   var expander = new Ext.ux.grid.RowExpander({
        tpl : new Ext.Template(
            '<HR><p><b>Resumen:</b> {abstract}</p><HR>'
        )
    }); 

   capabilitiesGrid = new Ext.grid.GridPanel({
        border: false,
        viewConfig: {
          forceFit: true
        },
        store: capStore,
        columnLines: true,
        columns: [
            expander,
            {
              header: "Título",
              dataIndex: "title",
              sortable: true
            },
            {
              header: "Nombre",
              dataIndex: "name",
              sortable: true
            }            
        ],
        plugins: expander
    });


    capabilitiesCombo = new Ext.form.ComboBox({
        store: app.wmsServerStore,
        width: 455,
        valueField: 'url',
        displayField: 'nombre', 
        emptyText: "Servidores WMS",
        editable: false,
        triggerAction: 'all', // needed so that the combo box doesn't filter by its current content
        mode: 'local', // keep the combo box from forcing a lot of unneeded data refreshes
        listeners: {
            select: function() {  
                var store = capabilitiesGrid.getStore();
                store.proxy.conn.url = getCapabilitiesUrl(capabilitiesCombo.getValue());
                store.load();
            }
        }
    });
     
    window = new Ext.Window({
        title: "Agregar nuevas capas",
        iconCls: 'layerIcon',
        layout: "fit",
        width: 500,
        height:300,
        resizable: false,
        autoScroll: true,
        shadow: false,
        tbar: [                  
            new Ext.Toolbar.Button({
                 tooltip: 'Servidores WMS',
                 icon: 'img/server.png',
                 handler: function(){

                    var wmsServersGridPanel = new Ext.grid.GridPanel({
                        border: false,
                        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
                        viewConfig: {
                          forceFit: false
                        },
                        store: app.wmsServerStore,
                        columns: [
                            {
                              header: "Nombre",
                              dataIndex: "nombre",
                              sortable: true,
                              width: 150
                            },
                            {
                              header: "Url",
                              dataIndex: "url",
                              sortable: true,
                              width: 334
                            } 
                        ]
                    }); 
                    
                    var informationButton = new Ext.Toolbar.Button({
                        text:"Información",
                        tooltip: 'Información',
                        icon: 'img/information.png',
                        handler: function(){
                            
                           var url = wmsServersGridPanel.getSelectionModel().getSelected().data.url;                            
                            
                           var service, name, title, abstract, contactPerson, contactOrganization, contactPosition;
                           var addressType, address, city, stateOrProvince, postCode, country, contactVoiceTelephone;
                           var contactFacsimileTelephone, contactElectronicMailAddress;

                           var infomask = new Ext.LoadMask(servidoresWindow.el, {msg:"Conectando..."});
                           infomask.show();
                          
                           Ext.Ajax.request({
                               url : getCapabilitiesUrl(url), 
                               method: 'GET',
                               success: function ( result, request )
                               { 
                                   infomask.hide();
                                   
                                   var parser = new DOMParser();
                                   var xmlDoc = parser.parseFromString(result.responseText,"text/xml");
                                   
                                   try{service = xmlDoc.getElementsByTagName("Service")[0];}catch(e){};
                                   try{name = service.getElementsByTagName("Name")[0].textContent;}catch(e){};
                                   try{title = service.getElementsByTagName("Title")[0].textContent;}catch(e){};
                                   try{abstract = service.getElementsByTagName("Abstract")[0].textContent;}catch(e){};
                                   try{contactPerson = service.getElementsByTagName("ContactPerson")[0].textContent;}catch(e){};
                                   try{contactOrganization = service.getElementsByTagName("ContactOrganization")[0].textContent;}catch(e){};
                                   try{contactPosition = service.getElementsByTagName("ContactPosition")[0].textContent;}catch(e){};
                                   try{addressType = service.getElementsByTagName("AddressType")[0].textContent;}catch(e){};
                                   try{address = service.getElementsByTagName("Address")[0].textContent;}catch(e){};
                                   try{city = service.getElementsByTagName("City")[0].textContent;}catch(e){};
                                   try{stateOrProvince = service.getElementsByTagName("StateOrProvince")[0].textContent;}catch(e){};
                                   try{postCode = service.getElementsByTagName("PostCode")[0].textContent;}catch(e){};
                                   try{country = service.getElementsByTagName("Country")[0].textContent;}catch(e){};
                                   try{contactVoiceTelephone = service.getElementsByTagName("ContactVoiceTelephone")[0].textContent;}catch(e){};
                                   try{contactFacsimileTelephone = service.getElementsByTagName("ContactFacsimileTelephone")[0].textContent;}catch(e){};
                                   try{contactElectronicMailAddress = service.getElementsByTagName("ContactElectronicMailAddress")[0].textContent;}catch(e){};

                                   new Ext.Window({
                                       title: wmsServersGridPanel.getSelectionModel().getSelected().data.nombre,
                                       iconCls: 'configuracionIcon',
                                       layout: "anchor",
                                       resizable: false,   
                                       items: [
                                           new Ext.Panel({
                                               border: false,
                                               autoScroll: true,
                                               width: "100%",
                                               heigth: "100%",
                                               items: new Ext.FormPanel({
                                                    labelWidth: 85, // label settings here cascade unless overridden
                                                    frame:true,
                                                    border: false,
                                                    width: 380,
                                                    items: [
                                                        new Ext.form.FieldSet({
                                                           title: "WMS",
                                                           items: [
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Nombre',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: name
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Título',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: title
                                                               }),   
                                                               new Ext.form.TextArea({
                                                                   fieldLabel: 'Descripción',
                                                                   width: 255,
                                                                   readOnly: true,
                                                                   value: abstract
                                                               })                                                 
                                                           ]
                                                        }),
                                                        new Ext.form.FieldSet({
                                                           title: "Contacto",
                                                           items: [
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Nombre',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: contactPerson
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Organización',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: contactOrganization
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Posición',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: contactPosition
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Tipo de dirección',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: addressType
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Dirección',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: address
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Ciudad',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: city
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Provincia o estado',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: stateOrProvince
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Código Postal',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: postCode
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'País',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: country
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Teléfono',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: contactVoiceTelephone
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Fax',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: contactFacsimileTelephone
                                                               }),  
                                                               new Ext.form.TextField({
                                                                    fieldLabel: 'Email',
                                                                    width: 255,
                                                                    readOnly: true,
                                                                    value: contactElectronicMailAddress
                                                               })
                                                           ]
                                                        })                                         
                                                    ]
                                                })
                                           })

                                       ]                                            
                                   }).show();
                               },
                               failure: function(){
                                   infomask.hide();
                                   Ext.MessageBox.alert('Error', 'Ha ocurrido un error en la conexión con el servidor indicado.');
                               },
                               listeners: {
                                    requestexception: function(){
                                         infomask.hide();
                                         Ext.MessageBox.alert('Error', 'Ha ocurrido un error en la conexión con el servidor indicado.');
                                    }
                               }
                           });

                        }
                    });

                    var servidoresWindow = new Ext.Window({
                        title: "Servidores WMS",
                        iconCls: 'serverIcon',
                        layout: "fit",
                        width: 500,
                        height:300,
                        resizable: false,
                        autoScroll: true,
                        shadow: false,
                        bbar: [
                            "->",
                            informationButton,                            
                            new Ext.Toolbar.Button({
                                tooltip: 'Agregar servidor WMS',
                                text: "Agregar",
                                icon: 'img/server-plus.png',
                                handler: function(){

                                    var nombre, wms_url;
                                    Ext.MessageBox.prompt('Agregar servidor WMS', 'Nombre del servidor', function(btn, text){
                                        if (btn == "ok"){
                                            nombre = text;
                                            if(app.wmsServerStore.getById(nombre) == null){
                                                Ext.MessageBox.prompt('Agregar servidor WMS', 'URL del servidor', function(btn, text){
                                                    if (btn == "ok"){
                                                        wms_url = text;
                                                        app.wmsServerStore.loadData([[nombre,wms_url]],true);
                                                    }
                                                })
                                            }else{
                                                Ext.MessageBox.alert('Error', 'Ya existe un servido con ese nombre');
                                            }
                                        }
                                    });                            

                                }
                            }),
                            new Ext.Toolbar.Button({
                                tooltip: 'Eliminar servidor WMS',
                                text: "Eliminar",
                                icon: 'img/server-minus.png',
                                handler: function(){

                                    wmsServersGridPanel.getSelectionModel().each(function(record){

                                            app.wmsServerStore.remove(app.wmsServerStore.getById(record.id));

                                    });                            

                                }
                            })
                        ],
                        items: [wmsServersGridPanel]                
                    }).show();
                 }
             }),
             "->",
             capabilitiesCombo
        ],
        bbar: [
            "->",
            new Ext.Toolbar.Button({
                tooltip: 'Agregar capas',
                text: "Agregar",
                icon: 'img/mas.png',
                handler: function(){

                    capabilitiesGrid.getSelectionModel().each(function(record){

                            var nombrecapa = record.data.title;
                            var servidorWMS = capabilitiesCombo.getValue();

                            if (existeNombreCapa(nombrecapa) == true){
                                nombrecapa = numerarNombre(nombrecapa)                            
                            }
                            
                            var newLeaf = createLeaf(nombrecapa, servidorWMS, {layers: record.data.name, transparent: 'true', format: 'image/png'},{isBaseLayer: false, visibility: false, singleTile: false});
                            if (node == null){
                                Ext.getCmp("layerTreePanel").getRootNode().appendChild(newLeaf);  
                            }else{
                                Ext.getCmp("layerTreePanel").getRootNode().findChild("id",node.attributes.id,true).appendChild(newLeaf);  
                            }    
                            
                            app.map.raiseLayer(app.map.getLayersByName("wfsLayer")[0],1);
                            app.map.raiseLayer(app.map.getLayersByName("Location")[0],1);
                            
                    });
                }
            })
        ],
        items: [capabilitiesGrid]
    }).show(); 
 }

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