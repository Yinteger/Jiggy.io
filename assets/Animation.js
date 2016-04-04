/**
 * public Animation
 *
 * 
 */
zen.assets.Animation = function(entity, spritesheet, animationDefinition) {
	this.entity = entity; //Entity to do the animation
	this.spritesheet = spritesheet; //The spritesheet for the animation
	this.animationDefinition = animationDefinition || {}; //Definitions for animations
	this._loop = true;
	this._direction;
	this._reverseLoop = false;
	this.animating = false;
	this._animation_index = -1;
	this.timeout;
};

zen.extends(null, zen.assets.Animation, {
	start : function () {
		if (!this.timeout) {
			this._direction = "forward";
			this._loadStep(0);
			this.animating = true;
		}
	},
	stop : function () {
		clearTimeout(this.timeout);
		this.timeout = undefined;
		this.animating = false;
	},
	loop : function (state) {
		this._loop = state;
	},
	reverseLoop : function (state) {
		this._reverseLoop = state;
	},
	isAnimating : function () {
		return this._animating;
	},
	_loadStep : function (stepIndex) {
		var self = this;
		var step = this.animationDefinition[stepIndex];
		var sprite = this.spritesheet.getSprite(step.sprite_id);
		this.entity.setTexture(sprite);
		this.entity.setWidth(sprite.getData().width);
		this.entity.setHeight(sprite.getData().height);

		var offset = 0;

		if (step['move-x'] || (this._direction === "reverse" && this.animationDefinition[stepIndex + 1]['move-x'])) {
			if (this._direction === "reverse" && this.animationDefinition[stepIndex + 1]['move-x']) {
				offset =  0 - this.animationDefinition[stepIndex + 1]['move-x'];
				this.entity.setX(this.entity.getX() - this.animationDefinition[stepIndex + 1]['move-x']);
			} else {
				offset =  0 + step['move-x'];
				this.entity.setX(this.entity.getX() + step['move-x']);
			}
		}

		if (step['move-y'] || (this._direction === "reverse" && this.animationDefinition[stepIndex + 1]['move-y'])) {
			if (this._direction === "reverse" && this.animationDefinition[stepIndex + 1]['move-y']) {
				this.entity.setY(this.entity.getY() - this.animationDefinition[stepIndex + 1]['move-y']);
			} else {
				this.entity.setY(this.entity.getY() + step['move-y']);
			}
		}
		zen.util.LogManager.getSingleton().log(zen.util.LogManager.INFO, stepIndex, this._direction, offset);

		var nextStepIndex;

		if (this._direction === "reverse") {
			nextStepIndex = stepIndex - 1;
		} else {
			nextStepIndex = stepIndex + 1;
		}

		if (this.animationDefinition[nextStepIndex]) {
			this.timeout = setTimeout(function () {
				self._loadStep(nextStepIndex)
			}, step.delay);
		} else if (this._reverseLoop) {
			this.timeout = setTimeout(function () {
				if (self._direction === "forward") {
					self._direction = "reverse";
					self._loadStep(stepIndex - 1);
				} else if (self._direction === "reverse") {
					self._direction = "forward";
					self._loadStep(stepIndex + 1);
				}
			}, step.delay);
		} else if (this._loop) {
			this.timeout = setTimeout(function () {
				self._loadStep(0)
			}, step.delay);
		} else {
			//Animation Complete
			this.stop();
		}
	}
});