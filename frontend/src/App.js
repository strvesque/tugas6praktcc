import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import backgroundImage from './assets/background.jpeg'; // Import gambar
import { BASE_URL } from "./utils.js";

function App() {
    
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const response = await axios.get(`${BASE_URL}/api/notes`);
        setNotes(response.data);
    };

    const addNote = async () => {
        const response = await axios.post(`${BASE_URL}/api/notes`, { title, content });
        setNotes([...notes, response.data]);
        setTitle('');
        setContent('');
    };

    const updateNote = async (id) => {
        const response = await axios.put(`${BASE_URL}/api/notes/${id}`, { title, content });
        setNotes(notes.map(note => (note.id === id ? response.data : note)));
        setTitle('');
        setContent('');
        setEditingId(null);
        setIsEditing(false);
    };

    const deleteNote = async () => {
        if (noteToDelete) {
            await axios.delete(`${BASE_URL}/api/notes/${noteToDelete}`);
            setNotes(notes.filter(note => note.id !== noteToDelete));
            setShowModal(false);
            setNoteToDelete(null);
        }
    };

    const handleDeleteClick = (id) => {
        if (!isEditing) {
            setNoteToDelete(id);
            setShowModal(true);
        }
    };

    const handleEdit = (note) => {
        if (!showModal) {
            setTitle(note.title);
            setContent(note.content);
            setEditingId(note.id);
            setIsEditing(true);
        }
    };

    return (
        <div 
            className="app-container"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className="container">
                <h1>My Notes</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    editingId ? updateNote(editingId) : addNote();
                }}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={showModal}>{editingId ? 'Update Note' : 'Add Note'}</button>
                </form>
                <div>
                    {notes.map(note => (
                        <div className="note" key={note.id}>
                            <h2>{note.title}</h2>
                            <p>{note.content}</p>
                            <button className='buttonEdit' onClick={() => handleEdit(note)} disabled={showModal}>Edit</button>
                            <button className='buttonDelete' onClick={() => handleDeleteClick(note.id)} disabled={showModal}>Delete</button>
                        </div>
                    ))}
                </div>

                {/* Modal Konfirmasi */}
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Delete this note?</h2>
                            <button className='buttonEdit' onClick={() => setShowModal(false)}>Cancel</button>
                            <button className='buttonDelete' onClick={deleteNote}>Delete</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
