import {
	LogManager,
	SeverityEnum
} from '@jiggy/utils';
import {Entity} from "@jiggy/entities";
import {Spritesheet} from "./Spritesheet";
import {Asset} from "@jiggy/assets";

export class Animation {
	public loop : boolean;
	public reverseLoop : boolean;

	private _entity : Entity;
	private _animationDefinition : AnimationFrame[];
	private _direction : string;
	private _animating : boolean;
	private _animation_index : number;
	private _timeout: any;

	public constructor (entity: Entity, animationDefinitions: AnimationFrame[]) {
		this._entity = entity; //Entity to do the animation
		this._animationDefinition = animationDefinitions; //Definitions for animations
		this.loop = true;
		this._timeout = false;
		this.reverseLoop = false;
		this._animating = false;
		this._animation_index = -1;
	}

	public isAnimating () : boolean {
		return this._animating;
	}

	public start () : void {
		if (!this._timeout) {
			this._direction = "forward";
			this._loadStep(0);
			this._animating = true;
		}
	}

	public stop () : void {
		clearTimeout(this._timeout);
		this._timeout = false;
		this._animating = false;
	}

	private _loadStep (stepIndex: number) : void {
		var step = this._animationDefinition[stepIndex];
		var sprite = step.asset;
		this._entity.setTexture(sprite);
		this._entity.setWidth(sprite.getData().width);
		this._entity.setHeight(sprite.getData().height);

		var offset : number = 0;

		if (step.moveX || (this._direction === "reverse" && this._animationDefinition[stepIndex + 1].moveX)) {
			if (this._direction === "reverse" && this._animationDefinition[stepIndex + 1].moveX) {
				offset =  0 - this._animationDefinition[stepIndex + 1].moveX;
				this._entity.setX(this._entity.getX() - this._animationDefinition[stepIndex + 1].moveX);
			} else {
				offset =  0 + step.moveX;
				this._entity.setX(this._entity.getX() + step.moveX);
			}
		}

		if (step.moveY || (this._direction === "reverse" && this._animationDefinition[stepIndex + 1].moveY)) {
			if (this._direction === "reverse" && this._animationDefinition[stepIndex + 1].moveY) {
				this._entity.setY(this._entity.getY() - this._animationDefinition[stepIndex + 1].moveY);
			} else {
				this._entity.setY(this._entity.getY() + step.moveY);
			}
		}
		// LogManager.getInstance().log(SeverityEnum.INFO, stepIndex + this._direction + offset);

		var nextStepIndex : number;

		if (this._direction === "reverse") {
			nextStepIndex = stepIndex - 1;
		} else {
			nextStepIndex = stepIndex + 1;
		}

		if (this._animationDefinition[nextStepIndex]) {
			this._timeout = setTimeout(() => {
				this._loadStep(nextStepIndex)
			}, step.delay);
		} else if (this.reverseLoop) {
			this._timeout = setTimeout(() => {
				if (this._direction === "forward") {
					this._direction = "reverse";
					this._loadStep(stepIndex - 1);
				} else if (this._direction === "reverse") {
					this._direction = "forward";
					this._loadStep(stepIndex + 1);
				}
			}, step.delay);
		} else if (this.loop) {
			this._timeout = setTimeout(() => {
				this._loadStep(0)
			}, step.delay);
		} else {
			//Animation Complete
			this.stop();
		}
	}
}

export interface AnimationFrame {
	asset: Asset;
	delay:  number;
	moveX? : number;
	moveY?: number;
}
