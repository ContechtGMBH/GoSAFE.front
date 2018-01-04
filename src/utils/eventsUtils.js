import Cesium from "cesium/Source/Cesium";

var highlited = {
  feature: undefined,
  color: new Cesium.Color()
}

module.exports = {

    toggleFeatureInfo: function(props, scene, movement){
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
        let feature = scene.pick(movement.position);

        if (Cesium.defined(feature)){
            props.toggleFeatureInfo(props.featureInfo.display);
            props.selectFeature(feature);
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
    },

    closeFeatureInfoBox: function(){
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
        console.log('new feature')
    }
}
