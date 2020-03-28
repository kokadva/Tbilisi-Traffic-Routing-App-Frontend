import {Pin} from "./Pin";


export interface PinController {
    
    addPin(coordinates, color): Pin;
    removePin(pin: Pin);
    clearPins();
    
}
