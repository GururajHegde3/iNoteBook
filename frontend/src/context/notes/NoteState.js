import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
  const host="https://inotebook-4a3x.onrender.com"
    const notesInitial=[]
    const [notes,setNotes] = useState(notesInitial);

    const getNotes=async ()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        
        headers: {
          'content-type':'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const json=await response.json();
      console.log(json);
      setNotes(json);
     


    }

    //Add Note
    const addNote=async (title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        
        headers: {
          'content-type':'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,tag}),});
       const note=response.json()
       setNotes(notes.concat(note));
     

    }
    const deleteNote=async (id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        
        headers: {
          'content-type':'application/json',
          'auth-token': localStorage.getItem('token'),
        }
      });
      const json=response.json();
      console.log(json)
     const  newNotes=notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes);
      
    }
        
    const editNote=async (id,title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        
        headers: {
          'content-type':'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,tag}),});
      const json=response.json();
      console.log(json);

      let newNotes=JSON.parse(JSON.stringify(notes))

      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        }
        
        
      }
      setNotes(newNotes);
      
    }
        
        
   
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
            </NoteContext.Provider>

    )


}

export default NoteState;
