import Cesium from 'cesium/Source/Cesium';
import Wkt from 'wicket/wicket'
const Styles = require('../assets/styles');

const initial = {
    dataSources: null,
    loading: true
};

export default function(state = initial, action) {
    let dataSourcesObject = action.payload;
    let container = null;
    let data = null;
    switch (action.type) {

        case 'RECEIVED_ELEMENTS':
          container = dataSourcesObject.container;
          data = dataSourcesObject.entities.data;
          for (let entity of data){
            if (container.getById(entity.e.properties.id)){
              continue;
            }
            let coordinatesArray = []
            let properties = Object.assign({}, entity.e.properties);
            let label = entity.e.labels[0]
            if (properties.geometry){
              let wkt = new Wkt.Wkt();
              wkt.read(properties.geometry)
              wkt.components.forEach((item)=> {
                coordinatesArray.push(item.x, item.y)
              })
              delete properties.geometry;
              container.add({
                id: properties.id,
                position : Cesium.Cartesian3.fromDegrees(coordinatesArray[0], coordinatesArray[1]),
                point: Styles[label],
                properties: properties,
                label: {
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

        default:
            return state;
    }

}
