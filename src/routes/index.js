const { render } = require('ejs');
const fs = require('fs')
const express = require('express')
const router = express.Router()
const client = require('../libs/connects')()

router.get('/', (req, res)=>{
    client.connect(async (err)=>{
        if (!err) {
            const collection = client.db("users").collection("userpasword")
            collection.find().toArray((err,result)=>{
                if (!err) {
                    res.render('formulario', result)
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


router.get('/', (req, res)=>{
    res.send('index', {nombre:"Python", dia:"Lunes", dias:["Lunes", "Martes", "Miercoles", "..."]})
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