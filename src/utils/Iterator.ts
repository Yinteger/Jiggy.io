export class Iterator<T> {
	private _array : T[];
	private _index : number;

	public constructor (array : T[]) {
		this._array = array;
		this._index = -1;
	}

	public hasNext () : boolean {
		if (this._array[this._index + 1]) {
			return true;
		} else {
			return false;
		}
	}

	public next () : T {
		this._index += 1;
		return this._array[this._index];
	}

	public hasPrev () : boolean {
		if (this._array[this._index]) {
			return true;
		} else {
			return false;
		}
	}

	public prev () : T {
		return this._array[this._index--];
	}

	public setToBeginning () : void {
		this._index = -1;
	}

	public setToEnd () : void {
		this._index = this._array.length - 1;
	}

	public getFirst  () : T {
		return this._array[0];
	}

	public getLast () : T {
		return this._array[this._array.length - 1];
	}
}
