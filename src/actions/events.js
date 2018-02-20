export const selectFeature = (feature) => {
    /*
     *  Selects a new feature on the globe and stores its properties
     * 
     *  @param {object} feature - a selected feature object
     */
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
