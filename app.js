/* global document, google */
import {GoogleMapsOverlay as DeckOverlay} from '@deck.gl/google-maps';
import {GeoJsonLayer, ArcLayer, ScatterplotLayer, ColumnLayer} from '@deck.gl/layers';
import data from './static/data2.csv'

// Set your Google Maps API key here or via environment variable
const GOOGLE_MAPS_API_KEY = "AIzaSyB7GGN5aFA-KDyq7Bi3GT3aQfOzCqz7d6E"; // eslint-disable-line
const GOOGLE_MAP_ID ="c6cdb489d24f4e82"; // eslint-disable-line
const GOOGLE_MAPS_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=beta&map_ids=${GOOGLE_MAP_ID}`;

var current_img_id;

function loadScript(url) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  const head = document.querySelector('head');
  head.appendChild(script);
  return new Promise(resolve => {
    script.onload = resolve;
  });
}

function print_id(ncid){
  console.log(ncid)
  current_img_id = ncid;
  var full_url1, full_url2, full_url3, full_url4;
  if(document.getElementById('original_img').checked) {
    full_url1 = './static/images/original/' + ncid + '_side_0.jpg';
    full_url2 = './static/images/original/' + ncid + '_side_1.jpg';
    full_url3 = './static/images/original/' + ncid + '_side_2.jpg';
    full_url4 = './static/images/original/' + ncid + '_side_3.jpg';
  }
  if(document.getElementById('segment_img').checked) {
    full_url1 = './static/images/segment/segoverlay_' + ncid + '_side_0.jpg';
    full_url2 = './static/images/segment/segoverlay_' + ncid + '_side_1.jpg';
    full_url3 = './static/images/segment/segoverlay_' + ncid + '_side_2.jpg';
    full_url4 = './static/images/segment/segoverlay_' + ncid + '_side_3.jpg';
  }
  
  document.getElementById('img_top').src = full_url1;
  document.getElementById('img_bot').src = full_url2;
  document.getElementById('img_left').src = full_url3;
  document.getElementById('img_right').src = full_url4;
}

var radio1 = document.getElementById('original_img');
var radio2 = document.getElementById('segment_img');
var previous_opt = 0;
radio1.onclick = handler;
radio2.onclick = handler;


function handler() {
  if (current_img_id){
    var full_url1, full_url2, full_url3, full_url4;
    if (this.id == 'segment_img'){
      full_url1 = './static/images/segment/segoverlay_' + current_img_id + '_side_0.jpg';
      full_url2 = './static/images/segment/segoverlay_' + current_img_id + '_side_1.jpg';
      full_url3 = './static/images/segment/segoverlay_' + current_img_id + '_side_2.jpg';
      full_url4 = './static/images/segment/segoverlay_' + current_img_id + '_side_3.jpg';
      previous_opt = 1;
    }
    if (this.id == 'original_img'){
      full_url1 = './static/images/original/' + current_img_id + '_side_0.jpg';
      full_url2 = './static/images/original/' + current_img_id + '_side_1.jpg';
      full_url3 = './static/images/original/' + current_img_id + '_side_2.jpg';
      full_url4 = './static/images/original/' + current_img_id + '_side_3.jpg';
      previous_opt = 0;
    }
    document.getElementById('img_top').src = full_url1;
    document.getElementById('img_bot').src = full_url2;
    document.getElementById('img_left').src = full_url3;
    document.getElementById('img_right').src = full_url4;
  }
}

loadScript(GOOGLE_MAPS_API_URL).then(() => {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -23.550705484971235, lng:  -46.63296863559315},
    zoom: 16,
    mapId: GOOGLE_MAP_ID
  });
  for(let i = 0;i<data.length;i++){
    data[i]['coordinates'] = [parseFloat(data[i].lng), parseFloat(data[i].lat)];
    data[i]['intensity'] = parseFloat(data[i].intensity)
    data[i]['color'] = [parseInt(data[i].color_r), parseInt(data[i].color_g), parseInt(data[i].color_b)]
  }
  const aea = new ColumnLayer({
    id: 'scatterplot-layer',
    data,
    pickable: true,
    opacity: 1,
    stroked: true,
    filled: true,
    radius:7,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    opacity:0.5,
    getPosition: d => d.coordinates,
    getFillColor: d => d.color,
    getLineColor: d => d.color,
    getElevation: d=> d.intensity
  });

  const overlay = new DeckOverlay({
    layers: [
      aea
    ],
    onClick: ({object}) => print_id(object.cid),
    getTooltip: ({object}) => object && {
    html: `<h2>${object.intensity}</h2><h3>${object.category}</h3><p>${object.cid}</p>`,
    style: {
      backgroundColor: '#e6fffa',
    }}
  });

  overlay.setMap(map);
});