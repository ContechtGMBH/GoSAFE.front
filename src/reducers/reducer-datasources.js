import Cesium from 'cesium/Source/Cesium';
import Wkt from 'wicket/wicket'
const Styles = require('../assets/styles');
const spatial = require('../utils/spatial');

const initial = {
    dataSources: null,
    loading: true
};
/*
 * Load track elements or neighbourhood from the database
 *
 * type: 'RECEIVED_ELEMENTS, RECEIVED_NEIGHBOURHOOD'
 * payload: {object}
 *
 * default: {}
 */
export default function(state = initial, action) {
    // payload contains current Cesium.viewer.dataSources object and array of graph nodes
    let dataSourcesObject = action.payload;
    let container = null;
    let data = null;
    switch (action.type) {
        // TRACK ELEMENTS
        case 'RECEIVED_ELEMENTS':
          container = dataSourcesObject.container; // Cesium.viewer.dataSources object
          data = dataSourcesObject.entities.data; // graph nodes
          for (let entity of data){
            if (container.getById(entity.e.properties.id)){ // skip if this entity was already loaded
              continue;
            }
            let coordinatesArray = [] // coordinatesArray must be 1d
            let properties = Object.assign({}, entity.e.properties);
            let label = entity.e.labels[0]
            if (properties.geometry){
              let wkt = new Wkt.Wkt();
              wkt.read(properties.geometry)
              wkt.components.forEach((item)=> {
                coordinatesArray.push(item.x, item.y)
              })
              delete properties.geometry; // remove the geometry from properties because it is not necesery to display it in the table
              container.add({
                id: properties.id, // must be unique
                position : Cesium.Cartesian3.fromDegrees(coordinatesArray[0], coordinatesArray[1]),
                point: Styles[label], // point style
                properties: properties,
                label: { // label style
                  text: properties.name || properties.id,
                  font : '12pt monospace',
                  style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                  outlineWidth : 2,
                  verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                  pixelOffset : new Cesium.Cartesian2(0, -9),
                  fillColor: Cesium.Color.RED,
                  distanceDisplayCondition: {near: 0.0, far: 2000}
                }

              })
            }
          }

          return {
              dataSources: dataSourcesObject.container,
              loading: false
          }

        case 'REQUEST_ELEMENTS':
            return state;

        // CURRENTLY ONLY BUILDINGS
        case 'RECEIVED_NEIGHBOURHOOD':
          // Should be improved
          container = dataSourcesObject.container;
          data = dataSourcesObject.entities.data;
          for (let entity of data){
            if (container.getById(entity.node.properties.id)){
              continue;
            }
            let coordinatesArray;
            let properties = Object.assign({}, entity.node.properties);
            //let label = entity.node.labels[0]
            if (properties.geometry){
              let wkt = new Wkt.Wkt();
              wkt.read(properties.geometry)
              coordinatesArray = spatial.flatten(wkt.toJson().coordinates)
              delete properties.geometry;
              container.add({
                id: properties.id,
                polygon : {
                  hierarchy: Cesium.Cartesian3.fromDegreesArray(coordinatesArray),
                  material: Cesium.Color.RED.withAlpha(0.8),
                  outline : true,
                  outlineColor : Cesium.Color.RED,
                  extrudedHeight: 10
                },
                properties: properties,

              })
            }
          }

          return {
              dataSources: dataSourcesObject.container,
              loading: false
          }

        case 'REQUEST_NEIGHBOURHOOD':
            return state;

        default:
            return state;
    }

}
