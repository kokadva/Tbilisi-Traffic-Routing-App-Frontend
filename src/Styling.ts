import {Circle as CircleStyle, Circle, Fill, Stroke, Style} from 'ol/style';


export var objectsStyleFunc = function (feature, extentInfo) {
    var delay = feature.getProperties()['traffic'];
    if (delay <= 0)
        delay = 100;
    let color = 'blue';


    delay = Math.abs(delay);
    return new Style({
        image: new Circle({
            fill: new Fill({color: color}),
            stroke: new Stroke({color: 'black', width: 1}),
            radius: delay / 50
        }),
    });

};

export let busRoutingVectorLayerStyle = new Style({
    fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new Stroke({
        color: '#ffcc33',
        width: 2
    }),
    image: new CircleStyle({
        radius: 7,
        fill: new Fill({
            color: '#ffcc33'
        })
    })
});

export function getPinStyle(color) {
    return new Style({
        image: new Circle({
            fill: new Fill({color: color}),
            stroke: new Stroke({color: 'black', width: 1}),
            radius: 5
        })
    });
}