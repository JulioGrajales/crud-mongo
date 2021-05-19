const express = require('express');
const router = express.Router();

const task = require('../models/task');

router.get('/', async (req,res)=>{
  const lastareas = await task.find();
  console.log(lastareas);
  res.render('index',{
    lastareas
  });
});

router.post('/add', async (req,res)=>{
  
  const mitask = new task(req.body);
  await mitask.save();
  res.redirect('/');
});

router.get('/turn/:id',async (req,res)=>{
  const {id} = req.params;
  const tarea = await task.findById(id);
  tarea.status = !tarea.status;
  await tarea.save();
  res.redirect('/');
});

router.get('/edit/:id',async (req,res)=>{
  const {id} = req.params;
  const tarea = await task.findById(id);
  res.render('edit',{
    tarea
  });
});

router.post('/update/:id',async (req,res)=>{
  const {id} = req.params;
  await task.updateOne({_id: id}, req.body);
  res.redirect('/');
});

router.get('/delete/:id', async (req,res)=>{
  const {id} = req.params;
  await task.remove({_id:id});
  res.redirect('/');
});

module.exports = router;