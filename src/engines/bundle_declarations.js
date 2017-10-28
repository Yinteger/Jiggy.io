'use strict';

var dts = require('dts-bundle');
dts.bundle({
	name : '@jiggy/engines',
	main : './dist/index.d.ts',
	baseDir : './',
	out  : './dist/engines.d.ts'
});
