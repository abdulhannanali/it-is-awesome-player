# Spotify Music Player

Spotify Music Player to play a file from the computer, the file can be any of the 
given file. This provides a browser based 60fps Music Player also parsing the 
Metadata for us, to make the experience complete for the user. This provides a 
sleek Spotify like interface, although a few things are going to be 
finalized don't let perfect me the enemy of starting.

We are going to start with a prototype having a simple audio track file
containing nothing but a plain design music player, and an ability to upload
the tracks online to play them and a metadata parser working on the 
Worker.

The application is going to use Webpack Module Bundler which uses the ES6 Import Syntax
and design patterns such as Module and Prototype pattern are going to be used 
in order to make the application easier to process for everyone.

### Goals for the first prototype of this application

The first prototype should focus on building a Player to read the metadata without much
regard for the design as design would be a distraction to the development process
right now.

- Upload file using FileReader
- Read it as array buffer
- Simple MP3 Player Implementation
- Read the MetaData
- Provide the metadata to the application

Using Vanilla JavaScript

### Component Based Architecture

Moreover, this application is using component based architecture to keep the application's structure
modular and managing the connection between certain parts of the application better. This can
follow the example of Vanilla Components I wrote in my previous Spotify ProgressBar implementation.