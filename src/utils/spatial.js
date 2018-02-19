import turf from "turf";
import Wkt from 'wicket/wicket';
import booleanWithin from '@turf/boolean-within';

module.exports = {

    isWithinDistance: function(trackGeom, featureGeom, distance, callback){
        let wkt = new Wkt.Wkt()
        let track = turf.lineString(wkt.read(trackGeom).toJson().coordinates)
        let buffer = turf.buffer(track, distance)
        let newFeature;
        let feature = wkt.read(featureGeom)
        switch (feature.type){
          case "point":
            newFeature = turf.point(feature.toJson().coordinates)
            break
          case "polygon":
            newFeature = turf.polygon(feature.toJson().coordinates)
            break
          case "linestring":
            newFeature = turf.lineString(feature.toJson().coordinates)
            break
          case "multipolygon":
            newFeature = turf.multiPolygon(feature.toJson().coordinates)
            break
          default:
            break
        }
        let isWithin = booleanWithin(newFeature, buffer)

        callback(isWithin)
    }

}
