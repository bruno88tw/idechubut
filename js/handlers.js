/*
 * IDE Chubut
 * 
 * Escrito por Bruno J. Vecchietti
 * 
 * handlers.js
 * 
 * Contiene los handlers utilizados en los distintos componentes
 * 
 */

function onImportarCapas(){
    
    var inputTextArea = new Ext.form.TextArea({
        width: 276,
        height: 231,
        readOnly: false,
        emptyText: "Copie el contenido del archivo de exportación y haga click en 'Importar'"
    });

     var window = new Ext.Window({
         title: "Importar capas",
         iconCls: 'abrirIcon',
         layout: "anchor",
         width: 300,
         height:300,
         resizable: false,
         items: [                     
             new Ext.Panel({
                 bodyStyle: 'padding:5px',
                 border: false,
                 autoScroll: true,
                 width: "100%",
                 heigth: "100%",
                 items:[inputTextArea]
             })
         ],
         bbar:[
            "->", 
            new Ext.Toolbar.Button({
                tooltip: 'Importar',
                text: "Importar",
                icon: 'img/folder-open.png',
                handler: function(){

                    try {

                        var loadtree = JSON.parse(inputTextArea.getValue());

                        removeLayers(Ext.getCmp("layerTreePanel").getRootNode());
                        for(var i = 0; i < Ext.getCmp("layerTreePanel").getRootNode().childNodes.length; i++){
                            Ext.getCmp("layerTreePanel").getRootNode().childNodes[i].remove();
                        }
                        agregarDescendencia(Ext.getCmp("layerTreePanel").getRootNode(),loadtree[0]);   
                        restoreIndex(loadtree[1]);
                        window.close();

                    }catch (e){
                        Ext.MessageBox.alert('Error', 'Ha ocurrido un error. Compruebe que el archivo no esté vacío ni corrupto.');
                    }


                }
            })                  
         ]
     });
     window.show();      
        
}

function onGuardarCapas(){
    
    var savetree = [];
    index = [];
    saveLayerTree(savetree,Ext.getCmp("layerTreePanel").getRootNode().childNodes); 
    index = saveLayerIndex();
    var jsonobject = JSON.stringify([savetree,index]);

    var inputTextArea = new Ext.form.TextArea({
       width: 276,
       height: 231,
       readOnly: true,
       emptyText: "Haga click en 'Generar' para generar el archivo de exportación, luego haga triple click sobre el contenido y copie y pegue en un archivo local."
    });             

    var window = new Ext.Window({
        title: "Guardar capas",
        iconCls: 'guardarIcon',
        layout: "anchor",
        width: 300,
        height:300,
        resizable: false,
        items: [                     
            new Ext.Panel({
                bodyStyle: 'padding:5px',
                border: false,
                autoScroll: true,
                width: "100%",
                heigth: "100%",
                items:[inputTextArea]
            })
        ],
        bbar:[
           "->", 
           new Ext.Toolbar.Button({
               tooltip: 'Guardar capas',
               text: "Generar",
               icon: 'img/folder-save.png',
               handler: function(){                            

                   inputTextArea.setValue(jsonobject);

               }
           })                  
        ]
    });
    window.show();     
    
}