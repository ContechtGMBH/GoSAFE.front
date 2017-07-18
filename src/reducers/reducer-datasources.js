import GeoJsonDataSource from "cesium/Source/DataSources/GeoJsonDataSource";

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
                dataSourcesObject.container.add(ds);
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
