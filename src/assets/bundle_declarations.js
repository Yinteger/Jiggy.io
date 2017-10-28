'use strict';

var dts = require('dts-bundle');
dts.bundle({
	name : '@jiggy/assets',
	main : './dist/index.d.ts',
	baseDir : './',
	out  : './dist/assets.d.ts'
});
