'use strict';

var dts = require('dts-bundle');
dts.bundle({
	name : '@jiggy/entities',
	main : './dist/index.d.ts',
	baseDir : './',
	out  : './dist/entities.d.ts'
});
