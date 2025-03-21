import React, { useContext,useEffect,useRef,useState } from 'react'
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  let navigate = useNavigate();
    const context = useContext(noteContext);
  const {notes,getNotes,editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();}
    else{
      navigate('/login');
    }
    

  }, )
  const ref = useRef(null)
  const refClose=useRef(null)
  const [note, setnote] = useState({id:"",etitle:'',edescription:'',etag:''})
  const updateNote=(currentnote)=>{
    ref.current.click();
    setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    props.showAlert('Updated Notes Successfully',"success");

  }
  
  const handleClick=(e)=>{
    console.log("updating the note")
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
   

}
const onChange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
    
}
  
  return (
   <>
    <AddNote showAlert={props.showAlert}/>

<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="etitle"
                        name='etitle'
                        aria-describedby="emailHelp"
                        onChange={onChange}
                        value={note.etitle}
                        minLength={5} required
                    />
                  
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="edescription"
                        name='edescription'
                        onChange={onChange}
                        value={note.edescription}
                        minLength={5} required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                        Tag
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="etag"
                        name='etag'
                        onChange={onChange}
                        value={note.etag}
                        minLength={5} required
                    />
                </div>
            </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
    <h2 className="my-4 text-center">Your Notes</h2>

<div className="container">
  {notes.length === 0 ? (
    <div className="text-center text-muted my-4">
      <p>No notes to display</p>
    </div>
  ) : (
    <div className="row">
      {notes.map((note) => (
        <NoteItem
          key={note._id}
          updateNote={updateNote}
          showAlert={props.showAlert}
          note={note}
        />
      ))}
    </div>
  )}
</div>

  </div>
  </>
  )
}

export default Notes