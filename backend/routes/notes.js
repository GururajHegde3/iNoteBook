const express=require('express');
const router=express.Router();
const fetchuser =require("../middleware/fetchuser")
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');
//route to fetch all notes
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
  try{
    const notes=await Notes.find({user:req.user.id});
    res.json(notes);
  }catch(error)
    {
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  
   
})
//route for adding new note
router.put('/addnote',fetchuser, [
        body('title', 'Enter a valid name').isLength({ min: 3 }),
        body('description', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
        
      ],async (req,res)=>{
        const {title,description,tag}=req.body;
        const notes=await Notes.find({user:req.user.id});
      const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const note= new Notes({
    title,description,tag,user:req.user.id
  })
  const savednote = await note.save()
  res.json(savednote); 
})

//route for updating the node
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
  const {title,description,tag} = req.body;
  const newnote={}
  if(description){
    newnote.description=description
  };
  if(title){
    newnote.title=title
  };
  if(tag){
    newnote.tag=tag
  };

  let note= await Notes.findByIdAndUpdate(req.params.id)
  if(!note){
    res.status(400).send('Error')
  }
  if(note.user.toString() !== req.user.id){
    res.status(401).send("not allowed")
  }
  note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
  res.json({note})

})
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
      // Find the note to be delete and delete it
      let note = await Notes.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this Note
      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }

      note = await Notes.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})


module.exports=router;