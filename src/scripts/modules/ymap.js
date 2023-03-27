/* global ymaps */
export function initYMap() {
  const address = 'Краснодар, ул. Ростовское шоссе, 34/10';
  const apiKey = '468db478-c4c3-4057-920e-2869b7bbb9d6';

  fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${encodeURIComponent(address)}`)
    .then((response) => response.json())
    .then((json) => {
      const coords = json.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').map(parseFloat);
      const lat = +coords[1];
      const lon = +coords[0];

      const isMobile = window.innerWidth < 992;
      const mapCenter = isMobile ? [lat, lon] : [lat, lon + 0.005];

      ymaps.ready(() => {
        const mapOptions = {
          center: mapCenter,
          zoom: 16,
          controls: ['zoomControl'],
        };

        const myMap = new ymaps.Map('map', mapOptions);

        const myPlacemark = new ymaps.Placemark(
          [lat, lon],
          {},
          {
            iconLayout: 'default#image',
            iconImageHref: './assets/img/mark.png',
            iconImageSize: [84, 98],
            iconImageOffset: [-48, -90],
          },
        );

        myMap.behaviors.disable('scrollZoom');
        myMap.geoObjects.add(myPlacemark);
      });
    });
}
