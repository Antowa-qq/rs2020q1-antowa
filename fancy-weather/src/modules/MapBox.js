import mapboxgl from 'mapbox-gl';

export default class MapBox {
  constructor() {
    this.map = new mapboxgl.Map({ container: 'map' });
    this.marker = new mapboxgl.Marker();
    this.token = 'pk.eyJ1IjoiYW50b3dhIiwiYSI6ImNrYW55aG53MzB5cGwyeXFtcDAyMXRtdHMifQ.fopHJlJDcgn6i57WAfmLCA';
    this.containerCoordinates = document.querySelector('.map-data__coordinates');
  }

  showMap(lon, lat) {
    mapboxgl.accessToken = this.token;
    this.map
      .setStyle('mapbox://styles/mapbox/streets-v11')
      .setZoom(9)
      .setCenter([lon, lat]);
  }

  setMarker(lon, lat) {
    this.marker.remove().setLngLat([lon, lat]).addTo(this.map);
    this.map.setCenter([lon, lat]);
  }

  setLonLat() {
    const { lng, lat } = this.getLonLat();
    this.containerCoordinates.querySelector('.latitude').textContent = lat;
    this.containerCoordinates.querySelector('.longitude').textContent = lng;
  }

  getLonLat() {
    return this.marker.getLngLat();
  }

  init(lon, lat) {
    this.showMap(lon, lat);
    this.setMarker(lon, lat);
    // this.setLonLat();
  }
}
