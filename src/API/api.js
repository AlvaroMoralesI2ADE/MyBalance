const path = require('path');


const { getConnection } = require('../database/database.js')
const conn = getConnection();

const { selectAdmin, selectUsuario,
    createUser, selectSuscripcion,
    insertSuscripcion, updateUsuario, selectSuscVigentes,
    insertAlergia, selectAlergia, cancelarSuscripcion, updatePassword } = require('../models/user.js')
const { selectAlimentosSuscripcion, UpdateAlimentosComidas,
    UpdateConsumidoAlimento, selectAlimento, deleteAlimento, insertAlimento } = require('../models/alimentos.js');
const { selectMessagesAdmin, insertMessageUser, selectMessagesUser,
    insertMessageAdmin, updateVistosMensajes, countMensajesNoVistos } = require('../models/mensajes.js');
const { selectDieta, selectDietaNombre, createComidasDieta,
     createDieta, transactionInsertAlimentosDieta } = require('../models/dieta.js');
const { transactionInsertAlimentosDietaModelo, createDietaModelo, createComidasDietaModelo, 
    selectDietaModeloName, selectDietaModelo, selectNameDietaModelo  } = require('../models/dietaModelo.js');


const api = (app) => {

    app.get('/reset-password', function (req, res) {
        res.sendFile(path.join(__dirname, '../views/html/nuevaContraseña.html'));
    });


    app.get('/verifyAccount', function (req, res) {
        res.sendFile(path.join(__dirname, '../views/html/verificacionEmail.html'));
    });



    app.get("/api/selectUsuario", (req, res) => {
        selectUsuario(
            conn,
            req.query.email,
            (result) => {
                res.json(result);
            }
        );
    });


    
    app.get('/api/createDieta', (req, res) => {
        createDieta(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });


    app.get('/api/selectDieta', (req, res) => {
        selectDieta(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });
    
    

    app.get('/api/transactionInsertAlimentosDieta', async (req, res) => {
        await transactionInsertAlimentosDieta(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });
    
    

    app.get('/api/selectDietaNombre', (req, res) => {
        selectDietaNombre(
            conn,
            req.query.nombre,
            (result) => {
                res.json(result);
            }
        );
    });
    

    app.get('/api/selectAdmin', (req, res) => {
        selectAdmin(
            conn,
            req.query.email,
            (result) => {
                res.json(result);
            }
        );
    });


    app.get("/api/createUser", (req, res) => {
        createUser(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });


    app.get("/api/selectSuscripcion", (req, res) => {
        selectSuscripcion(
            conn,
            req.query.email,
            (result) => {
                console.log(result)
                res.json(result);
            }
        );
    });


    app.get("/api/selectAlimentosSuscripcion", (req, res) => {
        selectAlimentosSuscripcion(
            conn,
            req.query.suscripcion,
            req.query.semana,
            (result) => {
                res.json(result);
            }
        );
    });




    app.get("/api/UpdateAlimentosComidas", (req, res) => {
        UpdateAlimentosComidas(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });


  

    app.get("/api/updatePassword", (req, res) => {
        console.log("SI HACE LA PETICIÓN")
        updatePassword(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });

    app.get("/api/UpdateConsumidoAlimento", (req, res) => {
        UpdateConsumidoAlimento(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });




    app.get("/api/insertMessageUser", (req, res) => {
        insertMessageUser(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });




    app.get("/api/updateVistosMensajes", (req, res) => {
        updateVistosMensajes(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });


    app.get("/api/insertMessageAdmin", (req, res) => {
        insertMessageAdmin(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });


    app.get("/api/selectMessagesUser", (req, res) => {
        selectMessagesUser(
            conn,
            req.query.nombre,
            (result) => {
                res.json(result);
            }
        );
    });



    app.get("/api/selectMessagesAdmin", (req, res) => {
        selectMessagesAdmin(
            conn,
            req.query.nombre,
            (result) => {
                res.json(result);
            }
        );
    });


    app.get("/api/cancelarSuscripcion", (req, res) => {
        cancelarSuscripcion(
            conn,
            req.query.email,
            (result) => {
                res.json(result);
            }
        );
    });


    app.get("/api/selectNameDietaModelo", (req, res) => {
        selectNameDietaModelo(
            conn,
            req.query.term,
            (result) => {
                res.json(result);
            }
        );
    });



    app.get("/api/updateUsuario", (req, res) => {
        updateUsuario(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });


    app.get("/api/insertAlergia", (req, res) => {
        insertAlergia(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });


    app.get("/api/selectAlergia", (req, res) => {
        selectAlergia(
            conn,
            req.query.email,
            (result) => {
                res.json(result);
            }
        );
    });



    app.get('/api/insertSuscripcion', (req, res) => {
        insertSuscripcion(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });


    app.get("/api/selectSuscVigentes", (req, res) => {
        selectSuscVigentes(
            conn,
            (result) => {
                console.log(result)
                res.json(result);
            }
        );
    });



    app.get("/api/countMensajesNoVistos", (req, res) => {
        countMensajesNoVistos(
            conn,
            req.query.usuario,
            (result) => {
                console.log(result)
                res.json(result);
            }
        );
    });


    app.get("/api/searchAlimento", (req, res) => {
        selectAlimento(
            conn,
            req.query.term,
            (result) => {
                res.json(result);
            }
        );
    });

    app.get("/api/selectDietaModeloName", (req, res) => {
        selectDietaModeloName(
            conn,
            req.query.nombre,
            (result) => {
                res.json(result);
            }
        );
    });



    app.get("/api/createDietaModelo", (req, res) => {
        createDietaModelo(
            conn,
            req.query.nombre,
            (result) => {
                res.json(result);
            }
        );
    });


    app.get("/api/transactionInsertAlimentosDietaModelo", (req, res) => {
        console.log(req.query)
        transactionInsertAlimentosDietaModelo(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });


    app.get("/api/createComidasDietaModelo", (req, res) => {
        console.log(req.query)
        createComidasDietaModelo(
            conn,
            req.query.nombre,
            (result) => {
                res.json(result);
            }
        );
    });

    

    app.get("/api/deleteAlimento", (req, res) => {
        deleteAlimento(
        conn,
        req.query.alimento,
        (result) => {
            res.json(result);
        }
        );
    });


    app.get("/api/insertAlimento", (req, res) => {
        insertAlimento(
        conn,
        req.query,
        (result) => {
            res.json(result);
        }
        );
    });



    app.get("/api/selectDietaModelo", (req, res) => {
        selectDietaModelo(
            conn,
            req.query.dieta,
            (result) => {
                console.log(result)
                res.json(result);
            }
        );
    });

    app.get('/api/createComidasDieta', (req, res) => {
        createComidasDieta(
            conn,
            req.query,
            (result) => {
                res.json(result);
            }
        );
    });

}



module.exports = api






