import {Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import {supabase} from './supabaseClient'

// Adds a new beat to the database and to the website
function AddBeat() {
    
    const [newBeat, setNewBeat] = useState({name: "", audio: "", bpm: "", key: "", date: ""});
    const [audioFile, setAudioFile] = useState(null);

    // Handle changing of text
    const handleChange = (e) => { 
        const { name, value, type } = e.target;

        let parsedValue = value;

        if (type === "number") {
            parsedValue = parseInt(value, 10);
        } else if (type === "date") {
            parsedValue = value;
        }

        setNewBeat(prev => ({ ...prev, [name]: parsedValue }));
    }

    // Handle changing of audio
    const handleAudioChange = (e) => {
        if (e.target.files && e.target.files.length>0) {
            const file = e.target.files[0];

            const allowedTypes = ['audio/mpeg', 'audio/wav'];
            // Only audio files allowed
             if (!allowedTypes.includes(file.type)) {
                window.alert("Only audio files of mp3 type are allowed.");
                e.target.value = "";
                setAudioFile(null);
                return;        
            }
                
            const maxFileSize = 50 * 1024 * 1024; // 50MB in bytes
            if (file.size > maxFileSize) {
                window.alert("File size must be less than or equal to 25KB.");
                e.target.value = "";
                setAudioFile(null);
                return;
            }

            setAudioFile(file);
        }
    };

    const sanitizeFileName = (name) => {
        return name
        .replace(/[^a-zA-Z0-9_\-\.]/g, '_') // Replace disallowed chars with underscore
    }

    const uploadAudioFile = async (file) => {
        const filePath = `${sanitizeFileName(file.name)}`

        const {error} = await supabase.storage.from('audio').upload(filePath, file);
        if (error) {
            console.log("Error uploading audio:", error.message);
            return;
        }

        const {data}  = await supabase.storage.from('audio').getPublicUrl(filePath);
        return data.publicUrl;
    }
        
    // Handle submitting new beat
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!audioFile) {
            window.alert("Please select a valid audio file before submitting.");
            return;
        }

        const audioUrl = await uploadAudioFile(audioFile);
        
        if (!audioUrl) {
            window.alert("Audio upload failed. Please try again.");
            return;
        }

        const beatToInsert = {
        ...newBeat,
        audio: audioUrl
        };

        //Insert beat to database
        const {error} = await supabase.from("Beats").insert(beatToInsert).single();
    
        if (error) {
            console.error("Error adding beat: ", error.message);
            return;
        }
        else {
            window.alert("Beat added successfully!");
        }
    
        // Reset form after beat was added
        setNewBeat({name: "", audio: "", bpm: "", key: "", date: ""})
        setAudioFile(null);
    }

    // Get today's date for max in date created
    const today = new Date().toISOString().split('T')[0];

  return (
    <div>
        <nav>
            <div></div>
            <div><Link to="/"><img src="images/logo.png" alt=""/></Link></div>
            <div></div>
        </nav>

        <div className="container">
            <h1>Add a new beat</h1>
            <div className="addbeat">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Name < 20 characters" maxLength={20} value={newBeat.name} onChange={handleChange}/>
                    <label htmlFor="audio">Audio:</label>
                    <input type="file" id="audio" name="audio" onChange={handleAudioChange}/>
                    <label htmlFor="bpm">BPM:</label>
                    <input type="number" id="bpm" name="bpm" placeholder="144" value={newBeat.bpm} onChange={handleChange}/>
                    <label htmlFor="key">Key:</label>
                    <input type="text" id="key" name="key" placeholder="N/A if unknown" maxLength={3} value={newBeat.key} onChange={handleChange}/>
                    <label htmlFor="date">Date Created:</label>
                    <input type="date" id="date" name="date" min="2000-01-01" max={today} value={newBeat.date} onChange={handleChange}/>
                    <br /><input type="submit" value="submit" className="submit"/>
                </form> 
            </div>
        </div>
    </div>
  );
};

export default AddBeat;