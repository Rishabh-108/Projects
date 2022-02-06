'use strict';

const detailsContainer = (workout) => {

  return `
<li class="workout workout--${workout.type}" data-id="${workout.id}">
<h2 class="workout__title">${workout.description} <div class="del__workout__container"><span class="del__workout__icon">❌</span></div></h2>
<div class="workout__details">
  <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
  <span class="workout__value">${workout.distance}</span>
  <span class="workout__unit">km</span>
</div>
<div class="workout__details">
  <span class="workout__icon">⏱</span>
  <span class="workout__value">${workout.duration}</span>
  <span class="workout__unit">min</span>
</div>
`
};

export default detailsContainer;