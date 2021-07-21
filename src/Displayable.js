class Displayable {
    _x;
    _y;
    _displayChar


    constructor(x, y, displayChar) {
        this._x = x
        this._y = y
        this._displayChar = displayChar
    }

    getX() {
        return this._x
    }

    getY() {
        return this._y
    }

    setX(x) {
        this._x = x
    }

    setY(y) {
        this._y = y
    }

    getDisplayChar() {
        return this._displayChar
    }
}

export default Displayable