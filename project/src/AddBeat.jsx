import {Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import {supabase} from './supabaseClient'

function AddBeat() {
    
    const [newBeat, setNewBeat] = useState({name: "", audio: "", waveform: "", bpm: "", key: "", date: ""});
    const [audioFile, setAudioFile] = useState(null);

    const handleChange = (e) => { 
        const { name, value, type } = e.target;

        let parsedValue = value;

        if (type === "number") {
            parsedValue = parseInt(value, 10);
        } else if (type === "date") {
            parsedValue = new Date(value).toISOString();
        }

        setNewBeat(prev => ({ ...prev, [name]: parsedValue }));
    }

    const handleAudioChange = (e) => {
        if (e.target.files && e.target.files.length>0) {
            const file = e.target.files[0];
            setAudioFile(file);
        }
    };

    const uploadAudioFile = async (file) => {
        const filePath = `${file.name}`

        const {error} = await supabase.storage.from('audio').upload(filePath, file);
        if (error) {
            console.log("Error uploading audio:", error.message);
            return;
        }

        const {data}  = await supabase.storage.from('audio').getPublicUrl(filePath);
        return data.publicUrl;
    }
        
    const handleSubmit = async (e) => {
        e.preventDefault();

        let audioUrl = null;

        if (audioFile) {
        audioUrl = await uploadAudioFile(audioFile);
        }

        const beatToInsert = {
        ...newBeat,
        audio: audioUrl
        };
    
        const {error} = await supabase.from("Beats").insert(beatToInsert).single();
    
        if (error) {
            console.error("Error adding beat: ", error.message);
            return;
        }
        else {
            window.alert("Beat added successfully!");
        }
    
        setNewBeat({name: "", audio: "", waveform: "", bpm: "", key: "", date: ""})
        setAudioFile(null);
    }

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
                    <input type="text" id="name" name="name" placeholder="Blessed" value={newBeat.name} onChange={handleChange}/>
                    <label htmlFor="audio">Audio:</label>
                    <input type="file" id="audio" name="audio" onChange={handleAudioChange}/>
                    <label htmlFor="bpm">BPM:</label>
                    <input type="number" id="bpm" name="bpm" placeholder="144" value={newBeat.bpm} onChange={handleChange}/>
                    <label htmlFor="key">Key:</label>
                    <input type="text" id="key" name="key" placeholder="Cm" value={newBeat.key} onChange={handleChange}/>
                    <label htmlFor="date">Date Created:</label>
                    <input type="date" id="date" name="date" value={newBeat.date} onChange={handleChange}/>
                    <br /><input type="submit" value="submit" className="submit"/>
                </form> 
            </div>
        </div>
    </div>
  );
};

export default AddBeat;