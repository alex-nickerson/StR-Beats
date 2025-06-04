# StR Beats [Version 1.4.0]

A React + Vite App to display my music/beats!

LIVE: https://str-beats.vercel.app/

## Latest Update

Audio is now handled entirely through the Waveform.jsx component, meaning loading is faster and code is more modular! 

## Features

- Display beats fully using jsx
- Download beats via download button
- Automatically draws waveform based on the audio file provided
- Playing and seeking through beats via custom controls and by clicking on the waveform
- Custom audio controls to control the volume
- Current time of playing beat provided and updates accordingly
- Backend SQL integration via [Supabase](https://supabase.com/)
- File storage via [Cloudflare R2](https://www.cloudflare.com/en-ca/developer-platform/products/r2/)
- Audio file uploads and requests are handled via a [Wrangler](https://developers.cloudflare.com/workers/wrangler/) worker
- User authentication via login page; handled by Supabase authentication
- Beats can only be added by authenticated users, and are updated to the database when added

## Lessons Learned

Through this project I learned more about building react applications (this time using Vite + React), and how to connect an app to a database (using Supabase). I faced many challenges like how to upload files to the database, how to authenticate users, and even how to simply connect to the database in the beginning. I have learned valuable skills in Frontend + Backend integration, such as uploading data to a backend database (In this case, an SQL database), and retreiving said data to display it and interact with it (in the form of beats).

## Screenshots

![image](https://github.com/alex-nickerson/StR-Beats/blob/71e669d0b52c7caa718efb05240aa3d4de724f24/project/public/images/app-screenshots/Homepage.png)
![image](https://github.com/alex-nickerson/StR-Beats/blob/71e669d0b52c7caa718efb05240aa3d4de724f24/project/public/images/app-screenshots/Login.png)
![image](https://github.com/alex-nickerson/StR-Beats/blob/71e669d0b52c7caa718efb05240aa3d4de724f24/project/public/images/app-screenshots/AddANewBeat.png)
![image](https://github.com/alex-nickerson/StR-Beats/blob/main/project/public/images/app-screenshots/supabase-screenshot.png)
![image](https://github.com/alex-nickerson/StR-Beats/blob/main/project/public/images/app-screenshots/r2-screenshot.png)

## Future Updates

- Allow more characters in the name of a beat by making the UI more responsive to scaling
- Allow users to signup so anyone can upload music
- Allow users to sign out
- Add "profiles" for users that will display their provided information and the music they have uploaded
- ~~Be able to search for specific beats~~
- Allow users to remove beats they have added
- Allow users to edit beats they have created
- ~~Add multiple pages so that all beats don't get stacked on a single page (causing a lot of scrolling)~~
- Add sorting by key

## Acknowledgements

Special thank you to [PedroTech](https://www.youtube.com/@PedroTechnologies) on youtube for the Supabase crash course I followed to implement most of my backend integration.
 - [Supabase Crash Course](https://www.youtube.com/watch?v=kyphLGnSz6Q)
