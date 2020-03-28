import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from "ol/format/GeoJSON";
import {Point} from 'ol/geom';
import Feature from 'ol/Feature';


export function createVectorLayerSourceFrom(sourceUrl) {
    return new VectorSource({
        format: new GeoJSON(),
        url: sourceUrl
    })
}


export function getEmptyVectorLayer(style = null) {
    let result = new VectorLayer({
        source: new VectorSource(),
        updateWhileAnimating: false,
        updateWhileInteracting: false,
    });
    if (style) {
        result.setStyle(style)
    }
    return result;
}


export function createPoint(coordinates, style = null) {
    let feature = new Feature({
        'geometry': new Point(coordinates),
        'size': 10
    });
    if (style)
        feature.setStyle(style);
    return feature;
}

export function geojsonToFeatures(geojson) {
    return (new GeoJSON()).readFeatures(geojson, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
    });
}