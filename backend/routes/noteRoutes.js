const express=require('express');
const {getNotes,getNote,createNote,updateNote,deleteNote}=require('../controllers/noteController')
const {protect}=require('../middleware/authMiddleware')
const router=express.Router();

router.get('/',protect,getNotes);
router.get('/:id',protect,getNote);
router.post('/',protect,createNote);
router.put('/:id',protect,updateNote);
router.delete('/:id',protect,deleteNote);

module.exports=router;