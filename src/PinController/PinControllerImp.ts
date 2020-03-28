import {PinController} from "./PinController";
import {Pin} from "./Pin";
import {createPoint, getEmptyVectorLayer} from "../WFSLayerUtils";
import {getPinStyle} from "../Styling";


export class PinControllerImp implements PinController {

    private pinId;
    private map;
    private pinVectorLayer;

    constructor(map){
        this.map = map;
        this.pinVectorLayer = getEmptyVectorLayer();
        this.map.addLayer(this.pinVectorLayer);
        this.pinId = 0;
    }

    public addPin(coordinates, color): Pin {
        let pinStyle = getPinStyle(color);
        let pinFeature = createPoint(coordinates, pinStyle);
        let newPin = new Pin(pinFeature, coordinates, color, this.pinId++);
        this.addPinToLayer(newPin);
        return newPin;
    }

    public clearPins() {
        this.pinVectorLayer.getSource().clear();
    }

    public removePin(pin: Pin) {
        this.pinVectorLayer.getSource().removeFeature(pin.getFeature());
    }

    private addPinToLayer(pin: Pin) {
        this.pinVectorLayer.getSource().addFeature(pin.getFeature())
    }
}