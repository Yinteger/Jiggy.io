'use strict';

var dts = require('dts-bundle');
dts.bundle({
	name : '@jiggy/interfaces',
	main : './dist/index.d.ts',
	baseDir : './',
	out  : './dist/interfaces.d.ts'
});
