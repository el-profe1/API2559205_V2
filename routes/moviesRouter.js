const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyparser = require('body-parser');
require('dotenv').config();
const movieService = require('../services/movieService');

const uri = process.env.URI;

const router = express.Router();

const service = new movieService();

//MOVIES
/**
 * CRUD
 */

// 2. READ: Buscar datos
// find()

router.get('/',async (req, res)=>{
    const resultado = await service.find();
    if(resultado.length>0){
        res.status(200).send(resultado);
    }else{
        res.status(404).send("Not found");
    }
})

// findOne()
router.get('/:id',async (req, res)=>{
    const client = new MongoClient(uri);
    const { id } = req.params;
    try{
        await client.connect();
        const resultado = await client.db('sample_mflix').collection('movies').findOne({"_id": new ObjectId(id)});
        if(resultado){
            res.send(resultado);
        }else{
            res.send("No se encontró la pelicula");
        }
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
})

// CREATE: Son las inserciones de documentos en la collection
// insertOne() TAREA: inserMany()
router.post('/',async (req, res)=>{
    const client = new MongoClient(uri);
    const body = req.body;
    try{
        await client.connect();
        const resultado = await client.db('sample_mflix').collection('movies').insertOne(body);
        if(resultado){
            res.status(201).json({
                "message": "Se creo una pelicula",
                data: body,
                resultado
            });
        }else{
            res.send("No se encontró la pelicula");
        }
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
})
// UPDATE
// updateOne
router.patch('/:id',async (req, res)=>{
    const id = req.params.id;
    const body = req.body;
    const title = body.title;
    const year = body.year;
    const resultado = await service.updateOne(id, title, year);
    if(resultado){
        res.status(201).json({
            "message": "Se modifico la pelicula",
            data: body
        });
    }else{
        res.status(404).send("No se encontró la pelicula");
    }
})
//DELETE: Eliminar
// deleteOne()

router.delete('/:id',async (req, res)=>{
    const client = new MongoClient(uri);
    const { id } = req.params;
    try{
        await client.connect();
        const resultado = await client.db('sample_mflix').collection('movies').deleteOne({"_id": new ObjectId(id)});
        if(resultado){
            res.status(200).json({
                "message": "Se elimino la pelicula",
                resultado,
                id
            });
        }else{
            res.send("No se encontró la pelicula");
        }
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
})

module.exports = router;