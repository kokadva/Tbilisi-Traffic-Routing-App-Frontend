import View from "ol/View";
import {TBILISI_COORDINATES_CENTER} from "./Constants";
import {Tile as TileLayer} from "ol/layer";
import XYZ from "ol/source/XYZ";
import Map from "ol/Map";


export class OlMap {

    private view;
    private layers;
    private map;

    constructor() {
        this.view = this.initView();
        this.layers = this.initDefaultLayers();
        this.map = this.initMap();
    }

    private initView() {
        return new View({
            center: TBILISI_COORDINATES_CENTER,
            zoom: 13,
            minZoom: 1,
            maxZoom: 18
        });
    }

    private initDefaultLayers() {
        let defaultOSMLayer = new TileLayer({
            source: new XYZ({
                attributionsCollapsible: false,
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                maxZoom: 23
            })
        });
        return [defaultOSMLayer];
    }

    private initMap() {
        return new Map({
            layers: this.layers,
            target: 'map',
            view: this.view
        });
    }

    public getMap():Map {
        return this.map;
    }


}