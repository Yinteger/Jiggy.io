'use strict';

var dts = require('dts-bundle');
dts.bundle({
	name : '@jiggy/utils',
	main : './dist/index.d.ts',
	baseDir : './',
	out  : './dist/utils.d.ts'
});
