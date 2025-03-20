import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setnote] = useState({ title: '', description: '', tag: '' });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert('Note added successfully!', 'success');
        setnote({ title: '', description: '', tag: '' });
    };

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container my-5 p-4 shadow rounded" style={{ maxWidth: '600px', backgroundColor: '#f8f9fa' }}>
            <h2 className="text-center mb-4" style={{ color: '#343a40' }}>Add a New Note</h2>

            <form>
                <div className="mb-4">
                    <label htmlFor="title" className="form-label fw-bold">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={note.title}
                        onChange={onChange}
                        minLength={5}
                        required
                        placeholder="Enter a title (min 5 characters)"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="form-label fw-bold">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={note.description}
                        onChange={onChange}
                        minLength={5}
                        required
                        placeholder="Enter a detailed description (min 5 characters)"
                        rows="3"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="tag" className="form-label fw-bold">
                        Tag
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        value={note.tag}
                        onChange={onChange}
                        minLength={5}
                        required
                        placeholder="Enter a tag (e.g., Personal, Work)"
                    />
                </div>

                <div className="text-center">
                    <button
                        disabled={note.title.length < 5 || note.description.length < 5}
                        type="submit"
                        className="btn btn-primary w-100"
                        onClick={handleClick}
                    >
                        Add Note
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNote;
