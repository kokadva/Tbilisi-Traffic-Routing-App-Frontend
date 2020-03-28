import {TrafficController} from "./TrafficController";
import {BusRoutingController} from "./BusRoutingController";
import {fromEvent} from 'rxjs';
import {OlMap} from "./OlMap";
import {map, withLatestFrom} from "rxjs/operators";

export class MapController {

    private trafficController: TrafficController;
    private busRoutingController: BusRoutingController;
    private olMap: OlMap;

    constructor() {
        this.olMap = new OlMap();
        this.initTrafficControls();
        this.initBusRouting();
    }

    private initTrafficControls() {
        this.trafficController = new TrafficController(this.olMap.getMap());

        let busNumberInput = document.getElementById('route_num');
        let busNumberInputKeyUpObservable = fromEvent(busNumberInput, 'keyup')
            .pipe(
                map((e) => e.target['value'])
            );

        let trafficShowButton = document.getElementById('traffic_show_button');
        let trafficShowButtonClickObservable = fromEvent(trafficShowButton, 'click')
            .pipe(
                withLatestFrom(busNumberInputKeyUpObservable),
                map(([buttonClickEvent, inputValue]) => inputValue)
            );
        trafficShowButtonClickObservable.subscribe((busNum) => {
            this.trafficController.showTraffic();
            this.trafficController.showBusRouteTraffic(busNum);
        });

        const trafficHideButton = document.getElementById('traffic_hide_button');
        const trafficHideButtonClickObservable = fromEvent(trafficHideButton, 'click');
        trafficHideButtonClickObservable.subscribe((eve) => {
            this.trafficController.hideTraffic();
        });
    }

    private initBusRouting() {
        this.busRoutingController = new BusRoutingController(this.olMap.getMap());
        const routeClearButton = document.getElementById('route_clear_button');
        const routeClearButtonClickObservable = fromEvent(routeClearButton, 'click');
        routeClearButtonClickObservable.subscribe((eve) => {
            this.busRoutingController.clear();
        });
    }
}
