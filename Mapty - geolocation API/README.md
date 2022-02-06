
The live website for this project can be found here: [Mapty](https://mapty-rishabh.netlify.app/) 

🟢# This is Mapty, an interactive map-based workout tracker that utilizes Leaflet.js for rendering maps and the geolocation API.

🟢Goal: This application allows cyclists and runners to view their workout history and record corresponding details. An interactive map and a workout sidebar are the core components of this application. The application provides an intuitive experience.

🟢Highlights:

1. I organized the project with real world project architecture in mind.
2. Utilizes some of the cutting-edge features of JavaScript such as private class fields and protected methods.
3. Project uses npm packages.

🟢A user's workflow would be as follows:

1. Interact with the map, that is, zoom in/zoom out, move around the map by grab and dragging and also click the map.
2. When the user clicks anywhere on the map, it opens a window on the left sidebar that allows the user to enter their work out details for the chosen location.
3. The workout types are two, that is, cycling and running, and the user would need to fill out the corresponding form fields before being able to register the workout.
4. Once filled out, the user can press "Enter" and submit the workout for it to be saved.
5. A successful save, leads to a map marker to appear on the map, based on the user's earlier map click.
6. The user's workout is saved to local storage.
7. The user can view all the map markers, even if they are spread out in terms of area, just by zooming out the map.
8. If the user clicks one of their registered workouts via the sidebar window, the map will move to the workouts corresponding map marker.
9. As the user's workouts are saved to local storage, upon return to the page or even page refresh, the user's workout are retrieved and loaded from local storage.

🟢In addition to the main project features introduced in the course, I also implemented the following:

1. The user can clear out all the registered workouts in the sidebar by clicking the '🧹' icon on the top right corner of the sidebar window.
2. I integrated the Dragula API via npm, to allow user easy and intuitive drag and drop sorting of workouts within its parent container. Thus, users can sort or order their workouts in which order they like. The user defined order is also stored in the localStorage and retrieved and applied upon start.
3. Users can also delete a given workout by pressing the '❌' icon on the top right corner of the workout window. Once deleted, the workout is removed from localStorage and map.

# df
🔵
