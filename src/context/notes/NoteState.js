import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
  const host="http://localhost:5000"
    const notesInitial=[]
    const [notes,setNotes] = useState(notesInitial);

    const getNotes=async ()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        
        headers: {
          'content-type':'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc0ZGM3YzgzN2IxYzMxMDU4MGJkZWE0In0sImlhdCI6MTczMzE1MDY5Nn0.GNYO3PBHqEB4Md__hkRY1EYyh4GP1a9pPjKwSF8xBi0',
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
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczMzQyMTVkODMxNWIzNjU4ODVhYzVkIn0sImlhdCI6MTczMTQ5MDA0N30.6FrYLjV3F0GA-m7XNNESxlFYHRTzCE5kz6myEeB-Bic',
        },
        body: JSON.stringify({title,description,tag}),});
       const json=response.json();

      console.log("addig new note")
      const note={
        "user": "674dc7c837b1c310580bdea4",
        "title": title,
        "description": description,
        "tag": "GD",
        "_id": "674dc9d37767353632f57fd9",
        "date": "2024-12-02T14:53:07.173Z",
        "__v": 0
      };
       setNotes(notes.concat(note));

    }
    const deleteNote=async (id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        
        headers: {
          'content-type':'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczMzQyMTVkODMxNWIzNjU4ODVhYzVkIn0sImlhdCI6MTczMTQ5MDA0N30.6FrYLjV3F0GA-m7XNNESxlFYHRTzCE5kz6myEeB-Bic',
        }
      });
      const json=response.json();
      console.log(json)
     const  newNotes=notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes);
      
    }
        
    const editNote=async (id,title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST",
        
        headers: {
          'content-type':'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczMzQyMTVkODMxNWIzNjU4ODVhYzVkIn0sImlhdCI6MTczMTQ5MDA0N30.6FrYLjV3F0GA-m7XNNESxlFYHRTzCE5kz6myEeB-Bic',
        },
        body: JSON.stringify({title,description,tag}),});
      const json=response.json();

      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id===id){
          element.title=title;
          element.description=description;
          element.tag=tag;
        }
        
      }
      
    }
        
        
   
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
            </NoteContext.Provider>

    )


}

export default NoteState;