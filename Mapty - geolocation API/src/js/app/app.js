'use strict';
import L from 'leaflet';

import Cycling from "./workouts/cycling";
import Running from "./workouts/running";
import cyclingDetails from "./components/cyclingDetails";
import detailsContainer from "./components/detailsContainer";
import runningDetails from "./components/runningDetails";
import Workout from "./workouts/workout";

import dragula from 'dragula/dragula';
import 'dragula/dist/dragula.css';

//Global variables
const form = document.querySelector('.form');
const workoutsContainer = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputCadence = document.querySelector('.form__input--cadence');
const inputDuration = document.querySelector('.form__input--duration');
const inputElevation = document.querySelector('.form__input--elevation');
const clearFormIcon = document.querySelector('#clear__form__icon');

const workout = new Workout();


class App {
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;
  #markers = []


  constructor() {

    //1. Retrieve user's geolocation data
    this._getPosition();
    //2. Retrieve workouts from local storage
    this._getLocalStorage();
    //3. Load dragula
    this._loadDragula();
    //4. Link event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    workoutsContainer.addEventListener('click', this._moveToPopup.bind(this));
    clearFormIcon.addEventListener('click', this.reset);
  }

  //Retrieve geolocation data
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  //Loads dragula on the workouts container
  _loadDragula() {
    dragula([workoutsContainer]);
  };

  /**
    * Handles retrieval of geolocation data, loading of map
    * and handling map clicks.
    * Utilizes Leaflet.js for map creation.
    * @param {object} position
    */
  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  /**
   * Shows the workout form
   * @param {object} mapEv
   */
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  /**
   * Hides the workout form
   */
  _hideForm() {
    //Clear the input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
      '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }


  /**
   * Displays the elevation field instead of cadence
   * when cycling is selected.
   */
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(input => input > 0);

    e.preventDefault();

    // Get data from form
    let workout;
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;

    //If workout type is running, then create a 'running' object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //If workout type is cycling, then create a 'cycling' object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    //Add the workout(object) to the workout array
    this.#workouts.push(workout);

    //Render the workout on the map via popup marker
    this._renderWorkoutMarker(workout);

    //Render the workout on the list
    this._renderWorkout(workout);

    //Hide form + clear input fields
    this._hideForm();

    //Set local storage to all workouts
    this._setLocalStorage();
  }

  /**
    * Renders dynamically the text displayed on
    * the map marken marker based on the type of workout.
    * @param {object} workout
    */
  _renderWorkoutMarker(workout) {
    //Display map marker
    const workoutMarker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();

    this.#markers.push(workoutMarker);
    workoutMarker.data_id = workout.id;
  }

  _renderWorkout(workout) {
    //renders the basic markup for a workout
    let html = `${detailsContainer(workout)}`;
    //renders the workout details based on the workout type
    if (workout.type === 'running') html += `${runningDetails(workout)}`;
    if (workout.type === 'cycling') html += `${cyclingDetails(workout)}`;
    form.insertAdjacentHTML('afterend', html);
    const delWorkoutIcon = document.querySelector('.del__workout__icon');

    delWorkoutIcon.addEventListener('click', this._delWorkout.bind(this));

  }


  /**
   * Moves the map to the corresponding map marker when a workout is clicked
   * from the sidebar.
   */
  _moveToPopup(e) {
    if (e.target.classList.contains('workout__item')) {
    }
    if (!this.#map) return;

    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  /**
   * Clears the saved workouts from sidebar and localstorage
   */
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }


  /**
   * Delete a workout from the sidebar, localstorage and map.
   * @param {event} e
   */
  _delWorkout(e) {
    if (e.target.classList.contains('del__workout__icon')) {
      const workoutEl = e.target.closest('.workout');
      const id = workoutEl.dataset.id;
      //check if there is a workout with the given id in #markers array
      const workoutMarker = this.#markers.find(marker => marker.data_id === id);
      //remove the workout from the map and maintain zoom level
      this.#map.removeLayer(workoutMarker);
      //set zoom level to current user zoom level
      this.#map.setZoom(this.#mapZoomLevel);
      const workoutLs = localStorage.getItem('workouts');
      const workout = JSON.parse(workoutLs).find(work => work.id === id);
      //delete the workout from localstorage
      const newWorkouts = JSON.parse(workoutLs).filter(work => work.id !== id);
      localStorage.setItem('workouts', JSON.stringify(newWorkouts));
      //remove the workout from the sidebar
      workoutEl.remove();
    }
  }
}

export default App;

