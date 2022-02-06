'use strict';

import Workout from "./workout";

class Running extends Workout {
  type = "running";

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  //Calculates pace in minutes per km
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }

}

export default Running;