'use strict';

var dts = require('dts-bundle');
dts.bundle({
	name : '@jiggy/core',
	main : './dist/index.d.ts',
	baseDir : './',
	out  : './dist/core.d.ts'
});
