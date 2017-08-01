export const selectFeature = feature => {
    let properties = {};
    let propertiesNames = feature.id.properties.propertyNames;
    propertiesNames.forEach(function(p){
        properties[p] = feature.id.properties[p]._value
    })
    return {
        type: 'SELECT_FEATURE',
        payload: properties
    }
}
