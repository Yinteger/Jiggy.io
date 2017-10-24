'use strict';

var dts = require('dts-bundle');
dts.bundle({
	name : '@jiggy/engine',
	main : 'dist/lib/index.d.ts',
	baseDir : './',
	out  : './dist/engine.d.ts'
});
