import {createClient} from "@supabase/supabase-js";
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

function Change(e) {
    setNewBeat((prev) => ({...prev, name: e.target.value}))
}