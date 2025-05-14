/*import {createClient} from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

export const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.SUPABASE_API_KEY
);

const [newBeat, setNewBeat] = useState({name: "", audio: "", waveform: "", bpm: "", key: "", date:""})
    console.log("test")
    
const handleSubmit = async (e) => {
    console.log("test")
    e.preventDefault();

    const {error} = await supabase.from("Beats").insert(newBeat).single();

    if (error) {
        console.error("Error adding beat: ", error.message);
    }

    setNewBeat({name: "", audio: "", waveform: "", bpm: "", key: "", date:""})
}

function Change(item, e) {
    setNewBeat((prev) => ({...prev, title: e.target.value}))
}*/

import {createClient} from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

  const supabaseUrl = "https://ponhcenaovkremckkfed.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvbmhjZW5hb3ZrcmVtY2trZmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNzU4MDUsImV4cCI6MjA2Mjc1MTgwNX0.yf1V-XId3dPSyMOI9PPg7iJ386X4-2eGR7FRmDJd_V4";
  export const supabase = createClient(supabaseUrl, supabaseKey);

  let newBeat = {
    name: "",
    audio: "",
    waveform: "",
    bpm: "",
    key: "",
    date: ""
  };

  function Change(e) {
    const { id, value } = e.target;
    newBeat[id] = value;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting:", newBeat);

    const { error } = await supabase.from("Beats").insert([newBeat]);

    if (error) {
      console.error("Error adding beat:", error.message);
    } else {
      alert("Beat added!");
      document.querySelector("form").reset();
      newBeat = { name: "", audio: "", waveform: "", bpm: "", key: "", date: "" };
    }
  }
