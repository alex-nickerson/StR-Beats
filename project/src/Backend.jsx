import {supabase} from './supabaseClient'
import React, { useEffect, useState } from 'react'

const [newBeat, setNewBeat] = useState({name: "", audio: "", waveform: "", bpm: "", key: "", date:""})
    
export const handleSubmit = async (e) => {
    console.log("test")
    e.preventDefault();

    const {error} = await supabase.from("Beats").insert(newBeat).single();

    if (error) {
        console.error("Error adding beat: ", error.message);
    }

    setNewBeat({name: "", audio: "", waveform: "", bpm: "", key: "", date:""})
}

export function handleChange (e) {
    setNewBeat((prev) => ({...prev, name: e.target.value}));
    console.log("work");
}