const cars = document.querySelector('.cars');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

const renderCar = (data, id) => {
  const html = `
    <div class="card-panel car white row" data-id="${id}">
    <img src="/img/car.png" alt="car thumb">
    <div class="car-details">
      <div class="car-title">${data.vin}</div>
      <div class="car-data">Deck: ${data.deck}</div>
      <div class="car-data">Hold: ${data.hold}</div>
    </div>
    <div class="car-delete">
      <i class="material-icons" data-id="${id}">delete_outline</i>
    </div>
  </div>
  `;

  cars.innerHTML += html;
}