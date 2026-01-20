const Note=require('../models/Note')

const getNotes =async (req,res)=>{
    try{
        const notes=await Note.find({user:req.user._id}).sort({createdAt:-1});
        res.status(200).json(notes) 
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
}

const getNote=async(req,res)=>{
     try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createNote=async (req,res)=>{
    try{
        const {title ,content}=req.body;
    
        if(!title || !content)
        {
           return res.status(400).json({message:"this fields can't be empty"})
        }
        const newNote=await Note.create({
            title,
            content,
            user:req.user._id,
        })
    
        return res.status(201).json(newNote);
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
}

const updateNote=async (req,res)=>{ 
    try{
        const {title,content}=req.body;
        
        const updatedNote= await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true,runValidators:true});
        if(!updatedNote)
        {
            return res.status(404).json({message:"Note not found"})
        }

        res.status(200).json(updatedNote)
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
}

const deleteNote = async (req, res) => {
  try {
    // 1. Find note
    const note = await Note.findById(req.params.id);

    // 2. Check if note exists
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // 3. Check ownership
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // 4. Delete note
    await note.deleteOne();

    // 5. Respond
    res.status(200).json({ message: "Note deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports={getNotes,getNote,createNote,updateNote,deleteNote}