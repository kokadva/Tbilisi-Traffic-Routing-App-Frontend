

export class Pin {

    private feature;
    private coordinates;
    private color;
    private id;


    constructor(feature, coordinates, color, id) {
        this.feature = feature;
        this.coordinates = coordinates;
        this.color = color;
        this.id = id;
    }

    public getCoordinates(){
        return this.coordinates;
    }


    getFeature() {
        return this.feature;
    }
}