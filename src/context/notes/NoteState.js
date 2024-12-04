import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
    const notesInitial=[{
        "user": "674dc7c837b1c310580bdea4",
        "title": "fifth id",
        "description": "good day",
        "tag": "GD",
        "_id": "674dc9d37767353632f57fd9",
        "date": "2024-12-02T14:53:07.173Z",
        "__v": 0
      },{
        "user": "674dc7c837b1c310580bdea4",
        "title": "fifth id",
        "description": "good day",
        "tag": "GD",
        "_id": "674dc9d37767353632f57fd9",
        "date": "2024-12-02T14:53:07.173Z",
        "__v": 0
      },{
        "user": "674dc7c837b1c310580bdea4",
        "title": "fifth id",
        "description": "good day",
        "tag": "GD",
        "_id": "674dc9d37767353632f57fd9",
        "date": "2024-12-02T14:53:07.173Z",
        "__v": 0
      },{
        "user": "674dc7c837b1c310580bdea4",
        "title": "fifth id",
        "description": "good day",
        "tag": "GD",
        "_id": "674dc9d37767353632f57fd9",
        "date": "2024-12-02T14:53:07.173Z",
        "__v": 0
      }]
    const [notes,setNotes] = useState(notesInitial);
        
   
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
            </NoteContext.Provider>

    )


}

export default NoteState;