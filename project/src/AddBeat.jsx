import {Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import {supabase} from './supabaseClient'

function AddBeat() {
    
    const [newBeat, setNewBeat] = useState({name: "", audio: "", waveform: "", bpm: "", key: "", date: ""})

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
        
    const handleSubmit = async (e) => {
        console.log("test")
        e.preventDefault();
    
        const {error} = await supabase.from("Beats").insert(newBeat).single();
    
        if (error) {
            console.error("Error adding beat: ", error.message);
            return;
        }
        else {
            window.alert("Beat added successfully!");
        }
    
        setNewBeat({name: "", audio: "", waveform: "", bpm: "", key: "", date: ""})
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
                    <input type="text" id="audio" name="audio" value={newBeat.audio} onChange={handleChange}/>
                    <label htmlFor="waveform">Waveform:</label>
                    <input type="text" id="waveform" name="waveform" value={newBeat.waveform} onChange={handleChange}/>
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