'use strict';

const express = require('express');
let router = express.Router();
let Msg = require('../models/message');



router.get('/', (req, res)=>{
  console.log("req.query: ",req.query.sort);
  Msg.get(req.query.sort, (err, messages)=>{
    if(err) return res.status(400).send(err);
    res.send(messages);
  });
});

router.get('/:id', (req, res)=>{
  Msg.getOne(req.params.id, (err,messages) => {
    if(err) return res.status(400).send(err);
    res.send(`${messages.author}\'s text: ${messages.text}`);
  });
});

router.post('/', function (req, res){
  // console.log("req.body.author: ",req.body);
  Msg.create(req.body.author, req.body.text ,err => {
    if(err) return res.status(400).send(err);
    res.send("posted");
  });
});

router.delete('/:id', (req, res) => {
  Msg.delete(req.params.id, err => {
    if(err) return res.status(400).send(err);
    res.send("deleted");
  });
});

router.put('/:id/:newMsg', (req, res) => {
  // console.log(`req.params.id: ${req.params.id}\nreq.params.newMsg: ${req.params.newMsg}`);
  Msg.update(req.params.id, req.params.newMsg, err =>{
    if(err) return res.status(400).send(err);

    res.send("updated");
  });
});

module.exports = router;
