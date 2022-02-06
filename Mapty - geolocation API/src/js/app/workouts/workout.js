'use strict';

import { v4 as uuidv4 } from 'uuid';

class Workout {

  date = new Date();
  //sets unique id for workout
  id = uuidv4();
  //keeps count of clicks
  clicks = 0;

  constructor(coords, distance, duration) {
    //coords = [lat, lng]
    this.coords = coords;
    //calculate distance in km
    this.distance = distance;
    //calculate duration in minutes
    this.duration = duration;
  }

  _setDescription() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]
      } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }


}

export default Workout;