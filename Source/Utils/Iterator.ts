export default class Iterator {
	private _array : any[];
	private _index : number;
	private _length : number;

	public constructor (array : any[]) {
		this._array = array;
		this._index = -1;
		this._length = array.length;
	}

	public hasNext () : boolean {
		if (this._array[this._index + 1]) {
			return true;
		} else {
			return false;
		}
	}

	public next () : any {
		this._index += 1;
		return this._array[this._index];
	}

	public hasPrev () : boolean {
		if (this._array[this._index - 1]) {
			return true;
		} else {
			return false;
		}
	}

	public prev () : any {
		this._index -= 1;
		return this._array[this._index];
	}

	public setToBeginning () : void {
		this._index = -1;
	}

	public setToEnd () : void {
		this._index = this._array.length;
	}

	public getFirst  () : any {
		return this._array[0];
	}

	public getLast () : any {
		return this._array[this._array.length - 1];
	}
}