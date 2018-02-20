import Cesium from "cesium/Source/Cesium";

var highlited = {
  feature: undefined,
  tile: undefined,
  color: new Cesium.Color(),
  colorTile: new Cesium.Color()
}

module.exports = {

    toggleFeatureInfo: function(props, scene, movement){
        /*
         * LMB event utility. Selects a feature from the globe and extracts properties.
         * Selected item has a different color.
         *
         * (1) if a different object was selected before, change its color to the basic color
         * (2) if this previously selected object is a tile, its structure is a little bit different
         *
         * @param {object} props - CesiumGlobe component properties (actions)
         * @param {object} scene - an active Cesium scene object
         * @param {object} movement - an object that contains coordinates of the last LMB click
         */
        if (Cesium.defined(highlited.feature)){ // (1)
          if (highlited.feature.id.polyline){
            highlited.feature.id.polyline.material.color = highlited.color;
          } else if (highlited.feature.id.polygon) {
            highlited.feature.id.polygon.material.color = highlited.color;
          } else if (highlited.feature.id.point) {
            highlited.feature.id.point.color = highlited.color;
          }
          highlited.feature = undefined;
        }

        if (Cesium.defined(highlited.tile)){ // (2)
          highlited.tile.color = highlited.colorTile;
          highlited.tile = undefined;
        }

        let feature = scene.pick(movement.position);

        if (Cesium.defined(feature) && (!(feature instanceof Cesium.Cesium3DTileFeature))){
            props.selectFeature(feature);
            props.toggleFeatureInfo(props.featureInfo.display);

            highlited.feature = feature;
            if (feature.id.polyline){
              if (feature.id.polyline.material.color !== Cesium.Color.CYAN){
                highlited.color = feature.id.polyline.material.color
              }
              feature.id.polyline.material.color = Cesium.Color.CYAN
            } else if (feature.id.polygon) {
              if (feature.id.polygon.material.color !== Cesium.Color.CYAN){
                highlited.color = feature.id.polygon.material.color
              }
              feature.id.polygon.material.color = Cesium.Color.CYAN
            } else if (feature.id.point) {
              if (feature.id.point.color !== Cesium.Color.CYAN){
                highlited.color = feature.id.point.color
              }
              feature.id.point.color = Cesium.Color.CYAN
            }

        } else if (Cesium.defined(feature) && (feature instanceof Cesium.Cesium3DTileFeature)) { // (2)
            highlited.tile = feature;
            highlited.colorTile = feature.color;
            feature.color = Cesium.Color.CYAN;

            //console.log(feature.getPropertyNames())

        }

    },

    closeFeatureInfoBox: function(){
      /*
       * Closes a feature info box and change its color to the basic color
       */
      if (Cesium.defined(highlited.feature)){
        if (highlited.feature.id.polyline){
          highlited.feature.id.polyline.material.color = highlited.color;
        } else if (highlited.feature.id.polygon) {
          highlited.feature.id.polygon.material.color = highlited.color;
        } else if (highlited.feature.id.point) {
          highlited.feature.id.point.color = highlited.color;
        }
        highlited.feature = undefined;
      }
    },

    addNewFeature: function(){
        /*
         * Deprecated
         */
        console.log('new feature')
    },

    colorSelectedFeature: function(entity){
      let feature = {id: entity}
      if (Cesium.defined(highlited.feature)){
        if (highlited.feature.id.polyline){
          highlited.feature.id.polyline.material.color = highlited.color;
        } else if (highlited.feature.id.polygon) {
          highlited.feature.id.polygon.material.color = highlited.color;
        } else if (highlited.feature.id.point) {
          highlited.feature.id.point.color = highlited.color;
        }
        highlited.feature = undefined;
      }

      if (Cesium.defined(feature)){
          highlited.feature = feature;
          if (feature.id.polyline){
            if (feature.id.polyline.material.color !== Cesium.Color.CYAN){
              highlited.color = feature.id.polyline.material.color
            }
            feature.id.polyline.material.color = Cesium.Color.CYAN
          } else if (feature.id.polygon) {
            if (feature.id.polygon.material.color !== Cesium.Color.CYAN){
              highlited.color = feature.id.polygon.material.color
            }
            feature.id.polygon.material.color = Cesium.Color.CYAN
          } else if (feature.id.point) {
            if (feature.id.point.color !== Cesium.Color.CYAN){
              highlited.color = feature.id.point.color
            }
            feature.id.point.color = Cesium.Color.CYAN
          }

      }
    }
}
