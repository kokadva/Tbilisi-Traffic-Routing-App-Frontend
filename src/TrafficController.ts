import {BUS_STOP_TRAFFIC_URL} from './Constants'
import {createVectorLayerSourceFrom, getEmptyVectorLayer} from "./WFSLayerUtils";
import {objectsStyleFunc} from "./Styling";
import VectorLayer from 'ol/layer/Vector';
import Map from "ol/Map";

export class TrafficController {

    private map: Map;
    private trafficVectorLayer: VectorLayer;

    constructor(map: Map) {
        this.map = map;
        this.trafficVectorLayer = getEmptyVectorLayer(objectsStyleFunc);
        this.trafficVectorLayer.setVisible(false);
        this.map.addLayer(this.trafficVectorLayer);
    }

    public showTraffic() {
        this.trafficVectorLayer.setVisible(true);
    }

    public hideTraffic() {
        this.trafficVectorLayer.setVisible(false);
    }

    public showBusRouteTraffic(bus_num: string) {
        let busRouteTrafficUrl = BUS_STOP_TRAFFIC_URL.replace('{bus_num}', bus_num);
        let vectorLayerSource = createVectorLayerSourceFrom(busRouteTrafficUrl);
        this.trafficVectorLayer.setSource(vectorLayerSource);
    }

}