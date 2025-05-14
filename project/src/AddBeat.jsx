function AddBeat() {
  return (
    <div>
        <nav>
            <div></div>
            <div><a href="index.html"><img src="images/logo.png" alt=""/></a></div>
            <div></div>
        </nav>

        <div class="container">
            <h1>Add a new beat</h1>
            <div class="addbeat">
                <form onsubmit="handleSubmit(event)">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Blessed" onchange="Change(event)"/>
                    <label for="audio">Audio:</label>
                    <input type="text" id="audio" name="audio" onchange="Change(event)"/>
                    <label for="waveform">Waveform:</label>
                    <input type="text" id="waveform" name="waveform" onchange="Change(event)"/>
                    <label for="bpm">BPM:</label>
                    <input type="text" id="bpm" name="bpm" placeholder="144" onchange="Change(event)"/>
                    <label for="key">Key:</label>
                    <input type="text" id="key" name="key" placeholder="Cm" onchange="Change(event)"/>
                    <label for="date">Date Created:</label>
                    <input type="date" id="date" name="date" onchange="Change(event)"/>
                    <br /><input type="submit" value="submit" class="submit"/>
                </form> 
            </div>
        </div>
    </div>
  );
};

export default AddBeat;
