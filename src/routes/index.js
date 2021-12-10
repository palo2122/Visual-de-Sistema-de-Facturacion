const { render } = require('ejs');
const fs = require('fs')
const express = require('express');
const res = require('express/lib/response');
const router = express.Router()
const client = require('../libs/connects')()

router.get('/', (req,res)=>{
    res.render('formulario')
})

router.post('/', (req, res)=>{
    var user = req.body.user;
    var pasword = req.body.pasword;
    client.connect(async (err)=>{
        if (!err) {
            const collection = client.db("users").collection("userpasword")
            console.log(req.body)
            collection.find({Usuario:{$eq:req.Usuario}},
                {Contraseña:{$eq:req.Contraseña}}).toArray((err,result)=>{
                console.log(result)
                if (result==user|result==pasword|!err) {
                    res.render('registrar')
                }else{
                    res.send("resultado:[{'respuesta':'error al cargar'}], {'mensaje':"+ err +"}")
                }
            })
        }else{
            res.send("resultado:[{'respuesta':'error al cargar'}], {'mensaje':"+ err +"}")
        }
    })
})


router.get('/registrar', (req,res)=>{
    res.render('registrar')
})

router.get('/vender',(req,res)=>{
    client.connect(async (err)=>{
        if (!err) {
            const collection = client.db("tienda").collection("productoPrecio")
            collection.find().toArray((err,result)=>{
                if (!err) {
                    res.render('ventas',{datos:result})
                }else{
                    res.send("resultado:[{'respuesta':'error al cargar'}], {'mensaje':"+ err +"}")
                }
            })
        }else{
            res.send("resultado:[{'respuesta':'error al cargar'}], {'mensaje':"+ err +"}")
        }
    })
})
router.get('/reporte', (req,res)=>{
    res.send('<h1>Pagina del Reporte</h1>')
})

router.post('/agrego', (req, res)=>{
    res.send("{producto:['fideo','azucar','arroz']}")
    res.send("{precio:[2.40,5.00,1.20]}")
})

router.delete('/eliminar', (req,res)=>{
    res.send("Eliminado")
})

router.post('/agregarProducto', (req,res)=>{
    client.connect(async (err)=>{
        if (!err) {
            const collection = client.db("tienda").collection("productoPrecio")
            console.log(req.body)
            collection.insertOne( req.body )
        }else{
            res.send("resultado:[{'respuesta':'error al cargar'}], {'mensaje':"+ err +"}")
        }
    })
})

router.post('/seleccion', (req, res)=>{
    client.connect(async (err)=>{
        if(!err){
            const collection = client.db("tienda").collection("productoPrecio")
            console.log(req.body)
            collection.find().toArray((err, result)=>{
                if (!err) {
                    res.render('ventas',{result})
                }else{
                    res.send("'resultado':[{'respuesta':'error al traer la data'}, {'mensaje':"+ err +"}]")
                }
            })
        }else{
            res.send("resultado:[{'respuesta':'error al cargar'}], {'mensaje':"+ err +"}")
        }
    })
})

router.post('/seleccionProducto', (req,res)=>{
    var productoLocal = req.body.producto;
    client.connect(async (err) =>{
        if(!err){
            const collection = client.db("tienda").collection("productoPrecio")
            collection.find({producto:{$eq:productoLocal}}).toArray((err, result)=>{
                if (!err) {
                    res.send('ventas', {datos:result})
                    res.render('ventas', {datos:result})
                }else{
                    res.send("resultado:[{'respuesta':'error al cargar'}], {'mensaje':"+ err +"}")
                }
            })
        }else{
            res.send("resultado:[{'respuesta':'error al cargar'}], {'mensaje':"+ err +"}")
        }
    })
})

module.exports = router;