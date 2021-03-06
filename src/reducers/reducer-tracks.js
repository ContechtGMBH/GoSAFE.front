import Cesium from 'cesium/Source/Cesium';
import Wkt from 'wicket/wicket'


const initial = {
    dataSources: null,
    tracks: [],
    lines: [],
    loading: true
};

export default function(state = initial, action) {
    let dataSourcesObject = action.payload;
    let container = null;
    let data = null;
    let tracksIds = [];
    switch (action.type) {
        case 'RECEIVED_TRACKS':
          dataSourcesObject.container.removeAll();
          container = dataSourcesObject.container;
          data = dataSourcesObject.entities.data;
          for (let entity of data){
            let coordinatesArray = []
            let properties = Object.assign({}, entity.n.properties);
            tracksIds.push({id: properties.id, line: entity.l.properties.id})
            if (properties.geometry){
              let wkt = new Wkt.Wkt();
              wkt.read(properties.geometry)
              wkt.components.forEach((item)=> {
                coordinatesArray.push(item.x, item.y)
              })
              //delete properties.geometry;
              container.add({
                id: properties.id,
                name: 'Track',
                polyline: {
                  positions: Cesium.Cartesian3.fromDegreesArray(coordinatesArray),
                  width : 8,
                  material : Cesium.Color.YELLOW.withAlpha(0.7),
                },
                properties: properties

              })
            }
          }
          let linesIds = [ ...new Set(tracksIds.map(obj => obj.line)) ]

          return {
              dataSources: dataSourcesObject.container,
              tracks: tracksIds,
              lines: linesIds,
              loading: false
          }

        case 'REQUEST_TRACKS':
            return state;

        default:
            return state;
    }

}
