# StR Beats [Version 1.4.1]

A React + Vite App to display my music/beats!

LIVE: https://str-beats.vercel.app/

## Latest Update

Audio is now handled entirely through the Waveform.jsx component, meaning loading is faster and code is more modular! 

## Features

- Display beats using Javascript + React
- Download beats via download button
- Automatically draws waveform based on the audio file provided
- Playing and seeking through beats via custom controls and by clicking on the waveform
- Playback time of beat provided and updates accordingly
- Backend SQL integration via [Supabase](https://supabase.com/)
- File storage via [Cloudflare R2](https://www.cloudflare.com/en-ca/developer-platform/products/r2/)
- Audio file uploads and requests are handled via a [Wrangler](https://developers.cloudflare.com/workers/wrangler/) worker
- User authentication via login page; handled by Supabase authentication
- Beats can only be added by authenticated users (me), and are updated to the database when added

## Lessons Learned

Through this project I learned more about building react applications (this time using Vite + React), and how to connect an app to a database (using Supabase). I faced many challenges like how to upload files to the database, how to authenticate users, and even how to simply connect to the database in the beginning. I have learned valuable skills in Frontend + Backend integration, such as uploading data to a backend database (In this case, an SQL database), and retreiving said data to display it and interact with it (in the form of beats).

## Screenshots

![image](https://github.com/alex-nickerson/StR-Beats/blob/71e669d0b52c7caa718efb05240aa3d4de724f24/project/public/images/app-screenshots/Homepage.png)
![image](https://github.com/alex-nickerson/StR-Beats/blob/71e669d0b52c7caa718efb05240aa3d4de724f24/project/public/images/app-screenshots/Login.png)
![image](https://github.com/alex-nickerson/StR-Beats/blob/71e669d0b52c7caa718efb05240aa3d4de724f24/project/public/images/app-screenshots/AddANewBeat.png)
![image](https://github.com/alex-nickerson/StR-Beats/blob/main/project/public/images/app-screenshots/supabase-screenshot.png)
![image](https://github.com/alex-nickerson/StR-Beats/blob/main/project/public/images/app-screenshots/r2-screenshot.png)

## User Interface

Early design mockup: [Figma project](https://www.figma.com/design/Ggt4RVbYw0KfmBopPjbEje/strbeats?node-id=0-1&t=U2TTDFJUMoGIYO0M-1)

## Future Updates

- ~~Be able to search for specific beats~~
- ~~Add multiple pages so that all beats don't get stacked on a single page (causing a lot of scrolling)~~
- Add sorting by key

#### If users can sign up:

- Allow users to sign out
- Add "profiles" for users that will display their provided information and the music they have uploaded
- Allow users to remove beats they have added
- Allow users to edit beats they have created

## Acknowledgements

Special thank you to [PedroTech](https://www.youtube.com/@PedroTechnologies) on youtube for the Supabase crash course I followed to implement most of my backend integration.
 - [Supabase Crash Course](https://www.youtube.com/watch?v=kyphLGnSz6Q)