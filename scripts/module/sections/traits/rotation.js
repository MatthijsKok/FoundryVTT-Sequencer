export default {

	/**
	 * Base properties
	 */
	_angle: 0,
	_rotateIn: 0,
	_rotateOut: 0,
	_randomRotation: false,

	/**
	 * The object gets a random rotation, which means it should not be used with .reachTowards()
	 *
	 * @param {boolean} [inBool=true] inBool
	 * @returns this
	 */
	randomRotation(inBool = true) {
		if(typeof inBool !== "boolean") this.sequence._throwError(this, "randomRotation", "inBool must be of type boolean");
		this._randomRotation = inBool;
		return this;
	},

	/**
	 * Sets the rotation of the object, which is added on top of the calculated rotation after .rotateTowards() or .randomRotation()
	 *
	 * @param {number} inRotation
	 * @returns this
	 */
	rotate(inRotation){
		if(typeof inRotation !== "number") this.sequence._throwError(this, "opacity", "inRotation must be of type number");
		this._angle = inRotation;
		return this;
	},

	/**
	 * Sets the location to rotate the object to
	 *
	 * @param {object|string} inLocation
	 * @param {object} options
	 * @returns this
	 */
	rotateTowards(inLocation, options = {}){
		options = foundry.utils.mergeObject({
			duration: 0,
			ease: "linear",
			delay: 0,
			offset: 0,
			towardsCenter: true
		}, options);
		if(typeof options.duration !== "number") this.sequence._throwError(this, "rotateTowards", "options.duration must be of type number");
		if(typeof options.ease !== "string") this.sequence._throwError(this, "rotateTowards", "options.ease must be of type string");
		if(typeof options.delay !== "number") this.sequence._throwError(this, "rotateTowards", "options.delay must be of type number");
		if(typeof options.offset !== "number") this.sequence._throwError(this, "rotateTowards", "options.offset must be of type number");
		if(typeof options.towardsCenter !== "boolean") this.sequence._throwError(this, "rotateTowards", "options.towardsCenter must be of type boolean");
		inLocation = this._validateLocation(inLocation);
		if(!inLocation) this.sequence._throwError(this, "rotateTowards", "could not find position of given object");
		options.target = this._validateLocation(inLocation);
		this._rotateTowards = options;
		return this;
	},

	/**
	 *  Causes the object to rotate when it starts playing
	 *
	 * @param {number} degrees
	 * @param {number} duration
	 * @param {object} [options] options
	 * @returns this
	 */
	rotateIn(degrees, duration, options={}){
		if(typeof options !== "object") this.sequence._throwError(this, "rotateIn", "options must be of type object");
		options = foundry.utils.mergeObject({
			ease: "linear",
			delay: 0
		}, options);
		if(typeof degrees !== "number") this.sequence._throwError(this, "rotateOut", "degrees must be of type number");
		if(typeof duration !== "number") this.sequence._throwError(this, "rotateOut", "duration must be of type number");
		if(typeof options.ease !== "string") this.sequence._throwError(this, "rotateIn", "options.ease must be of type string");
		if(typeof options.delay !== "number") this.sequence._throwError(this, "rotateIn", "options.delay must be of type number");
		this._rotateIn = {
			value: degrees,
			duration: duration,
			ease: options.ease,
			delay: options.delay
		};
		return this;
	},

	/**
	 *  Causes the object to rotate at the end of the effect's duration
	 *
	 * @param {number} degrees
	 * @param {number} duration
	 * @param {object} [options] options
	 * @returns this
	 */
	rotateOut(degrees, duration, options={}){
		if(typeof options !== "object") this.sequence._throwError(this, "rotateOut", "options must be of type object");
		options = foundry.utils.mergeObject({
			ease: "linear",
			delay: 0
		}, options);
		if(typeof degrees !== "number") this.sequence._throwError(this, "rotateOut", "degrees must be of type number");
		if(typeof duration !== "number") this.sequence._throwError(this, "rotateOut", "duration must be of type number");
		if(typeof options.ease !== "string") this.sequence._throwError(this, "rotateOut", "options.ease must be of type string");
		if(typeof options.delay !== "number") this.sequence._throwError(this, "rotateOut", "options.delay must be of type number");
		this._rotateOut = {
			value: degrees,
			duration: duration,
			ease: options.ease,
			delay: options.delay
		};
		return this;
	}

}