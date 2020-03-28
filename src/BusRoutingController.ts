import {transform} from 'ol/proj';
import {BUS_ROUTE_URL} from './Constants';
import {busRoutingVectorLayerStyle} from "./Styling";
import {geojsonToFeatures, getEmptyVectorLayer} from "./WFSLayerUtils";
import {fromEvent, Subscription} from "rxjs";
import {PinController} from "./PinController/PinController";
import {PinControllerImp} from "./PinController/PinControllerImp";
import Map from "ol/Map";
import VectorLayer from 'ol/layer/Vector';
import {Pin} from "./PinController/Pin";
import {map} from "rxjs/operators";
import {get} from "./HttpClient";


export class BusRoutingController {

    private map: Map;
    private routingVectorLayer: VectorLayer;
    private startLocationPin: Pin;
    private endLocationPin: Pin;
    private mapOnClickSubscription: Subscription;
    private routingPinController: PinController;

    constructor(map: Map) {
        this.map = map;
        this.routingVectorLayer = getEmptyVectorLayer(busRoutingVectorLayerStyle);
        this.map.addLayer(this.routingVectorLayer);
        this.startLocationPin = null;
        this.endLocationPin = null;
        this.routingPinController = new PinControllerImp(map);
        this.initRouting();
    }

    private initRouting() {
        let mapOnClickObservable = fromEvent(this.map, 'click').pipe(
            map((event) => event["coordinate"])
        );
        this.mapOnClickSubscription = mapOnClickObservable.subscribe((coordinates) => {
            if (this.startLocationPin == null) {
                this.startLocationPin = this.routingPinController.addPin(coordinates, 'green');
            } else {
                this.routingVectorLayer.getSource().clear();
                this.clearRouteDescription();
                if (this.endLocationPin)
                    this.routingPinController.removePin(this.endLocationPin);
                this.endLocationPin = this.routingPinController.addPin(coordinates, 'red');
                this.drawRoute(this.startLocationPin.getCoordinates(), this.endLocationPin.getCoordinates());
            }
        });
    }

    public clear() {
        this.startLocationPin = this.endLocationPin = null;
        this.routingPinController.clearPins();
        this.routingVectorLayer.getSource().clear();
        this.clearRouteDescription();
    }

    private drawRoute(startLocation, endLocation) {
        const url = this.getRouteRequestUrlFrom(startLocation, endLocation);
        get(url).then((data) => {
            this.showRoute(data);
        }).catch((ignore) => {
            alert("Route not found !");
        });
    }

    private showRoute(routeData) {
        document.getElementById("routeDetails").innerHTML = this.getRouteDescription(routeData);
        let features = geojsonToFeatures(routeData);
        this.routingVectorLayer.getSource().clear();
        this.routingVectorLayer.getSource().addFeatures(features);
    }

    private clearRouteDescription(){
        document.getElementById("routeDetails").innerHTML = "";
    }

    private getRouteRequestUrlFrom(startCoordinates, endCooordinates) {
        startCoordinates = this.toEPSG4326(startCoordinates);
        endCooordinates = this.toEPSG4326(endCooordinates);
        return BUS_ROUTE_URL
            .replace('{start_coordinates_lon}', startCoordinates[0])
            .replace('{start_coordinates_lat}', startCoordinates[1])
            .replace('{end_coordinates_lon}', endCooordinates[0])
            .replace('{end_coordinates_lat}', endCooordinates[1])
    }

    private toEPSG4326(coordinates) {
        return transform(coordinates, 'EPSG:3857', 'EPSG:4326');
    }

    private getRouteDescription(routeData) {
        let routeDescription = "Route Details:";
        routeData.features.forEach((x) =>
            routeDescription += "\n Bus Num: " + x.properties.bus_num + "\n" + x.properties.bus_stop_name
        );
        return routeDescription;
    }
}