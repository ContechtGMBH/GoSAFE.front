import Cesium from "cesium/Source/Cesium";

module.exports = {

    toggleFeatureInfo: function(props, scene, movement){
        let feature = scene.pick(movement.position);
        if (Cesium.defined(feature)){
            props.toggleFeatureInfo(props.featureInfo.display);
            props.selectFeature(feature);
            console.log(movement)
            //let properties = feature.id.properties.propertyNames;
            //properties.forEach(function(p){console.log(p + " : " + feature.id.properties[p])})
        }
    },

    addNewFeature: function(){
        console.log('new feature')
    }
}
