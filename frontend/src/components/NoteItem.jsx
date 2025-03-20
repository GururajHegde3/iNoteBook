import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import PropTypes from "prop-types";

// Import the NoteItem-specific styles
import "../Stylesheets/NoteItem.css";

const NoteItem = ({ note, updateNote }) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-danger btn-sm me-2"
              onClick={() => deleteNote(note._id)}
              title="Delete Note"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => updateNote(note)}
              title="Edit Note"
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  updateNote: PropTypes.func.isRequired,
};

export default NoteItem;
