'use strict';

var dts = require('dts-bundle');

dts.bundle({
	name : '@jiggy/audio',
	main : './dist/index.d.ts',
	baseDir : './',
	out  : './dist/audio.d.ts'
});
