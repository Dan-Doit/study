export class Organization {
    _name : string;
    _location : string;
    _position : string;
    constructor (data) {
        this._name = data.name;
        this._location = data.location;
        this._position = data.position;
    }

    get name() {return this._name}
    set name(arg) {this._name = arg}
    get location() {return this._location}
    set location(arg) {this._location = arg}
    get position() {return this._position}
    set position(arg) {this._position = arg}
    
}