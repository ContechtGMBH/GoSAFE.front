import GeoJsonDataSource from "cesium/Source/DataSources/GeoJsonDataSource";
import Cesium from 'cesium/Source/Cesium';

const initial = {
    dataSources: null,
    loading: true
};

export default function(state = initial, action) {
    switch (action.type) {
        case 'RECEIVED_DS':
            let dataSourcesObject = action.payload;
            dataSourcesObject.container.removeAll();
            for (let layer of dataSourcesObject.layers) {
                let ds = new GeoJsonDataSource.load(layer.data, layer.style);
                ds.then(function(dsResult){
                  dsResult.name = layer.name;
                  dsResult.colors = { style: 'default', attribute: 'gid' };
                  dataSourcesObject.container.add(dsResult);
                  var entities = dsResult.entities.values;
                  // probably a temporary workaraund it creates a separate style object for each feature
                  for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    if (entity.polyline){
                      entity.polyline.material = layer.style.stroke;
                    } else if (entity.polygon) {
                      entity.polygon.material = layer.style.fill;
                    } else if (entity.billboard) {
                      entity.billboard = undefined;
                      entity.point = new Cesium.PointGraphics({
                          color: layer.style.markerColor,
                          pixelSize: 20
                      });
                    }
                  }
                })
            }

            return {
                dataSources: dataSourcesObject.container,
                loading: false
            }

        case 'REQUEST_DS':
            return state;

        default:
            return state;
    }

}
