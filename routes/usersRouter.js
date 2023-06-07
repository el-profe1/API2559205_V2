const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.URI;

const router = express.Router();

router.get('/',async (req, res)=>{
    const client = new MongoClient(uri);
    try{
        await client.connect();
        const resultado = await client.db('sample_mflix').collection('users').find({}).skip(1000).limit(5).toArray();
        res.status(200).send(resultado);
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
})

module.exports = router;