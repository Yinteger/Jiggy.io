'use strict';

var dts = require('dts-bundle');
dts.bundle({
	name : '@jiggy/inputs',
	main : './dist/index.d.ts',
	baseDir : './',
	out  : './dist/inputs.d.ts'
});
