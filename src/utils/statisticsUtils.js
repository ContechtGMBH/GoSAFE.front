import Geostats from 'geostats';
import Chroma from 'chroma-js';
import Cesium from "cesium/Source/Cesium";

module.exports = {

  calculateBreaks: function(data, n){

    let values = data.map(item => item.value)

    let geostats = new Geostats(values)
    let jenks = geostats.getClassJenks(n)

    let ramp = Chroma.scale('OrRd').colors(n)

    console.log(ramp, jenks)

  },

  graduatedColors: function(dataSourcesObject, layer, parameter, n_breaks){

    let ramp = Chroma.scale(['yellow', 'red']).colors(6)

    for (let entity of dataSourcesObject.values){

      let param = Math.floor(Math.random() * (6))

      if (entity.name === "Track"){

        //if (parameter){}

        let material;

        if(entity.point){
          material = entity.point.material
        } else if (entity.polyline) {
          entity.polyline.material
        } else if (entity.polygon) {
          entity.polygon.material
        }

        material.color = Cesium.Color.fromCssColorString(ramp[param]).withAlpha(0.7)

      }
    }

    //let values = data.map(item => item.value)

    //let geostats = new Geostats(values)
    //let jenks = geostats.getClassJenks(n)

    //let ramp = Chroma.scale('OrRd').colors(n)

    //console.log(ramp)
    //["#fff7ec", "#fdd49e", "#fc8d59", "#d7301f", "#7f0000"]
  },

}
