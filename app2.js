mapboxgl.accessToken = 'pk.eyJ1IjoibWF1cm9kaWF6NyIsImEiOiJjbG8yem91N2sxc2NiMm9qeWt2M2JraTBuIn0.YIX7-YY7VR0AsiK97_vRLA';
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "static/data3.csv",
        dataType: "text",
        success: function(dat) {
            const map = new mapboxgl.Map({
             container: 'map',
             style: 'mapbox://styles/mapbox/light-v9',
             center: [-46.63296863559315,-23.550705484971235],
             zoom: 12,
             antialias: true,
             bearing: 0,
             pitch: 0,
             attributionControl: false
          });
          var data = $.csv.toObjects(dat);
          console.log(data);
          for(let i = 0;i<data.length;i++){
            data[i]['coordinates'] = [parseFloat(data[i].lng), parseFloat(data[i].lat)];
            data[i]['intensity'] = parseFloat(data[i].intensity)
            data[i]['color'] = [parseInt(data[i].color_r), parseInt(data[i].color_g), parseInt(data[i].color_b)]
          }

      function print_id(ncid){
        console.log('hola', ncid)
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
    };

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
  };
  const aea = new deck.ColumnLayer({
      id: 'scatterplot-layer',
      data,
      pickable: true,
      opacity: 1,
      stroked: true,
      filled: true,
      radius:15,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      opacity:0.5,
      getPosition: d => d.coordinates,
      getFillColor: d => d.color,
      getLineColor: d => d.color,
      getElevation: d=> d.intensity
    });

  const overlay = new deck.MapboxOverlay({
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
  map.addControl(overlay);
  }
})
});