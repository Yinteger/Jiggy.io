var Path = require('path');

module.exports = {
    entry: "./dist/test_apps/instanceof/App.js",
    output: {
        filename: "./App.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        alias : {
            "@jiggy/assets" : Path.resolve("./dist/src/assets/src/index.js"),
            "@jiggy/audio" : Path.resolve("./dist/src/audio/src/index.js"),
            "@jiggy/core" : Path.resolve("./dist/src/core/src/index.js"),
            "@jiggy/engines" : Path.resolve("./dist/src/engines/src/index.js"),
            "@jiggy/entities" : Path.resolve("./dist/src/entities/src/index.js"),
            "@jiggy/inputs" : Path.resolve("./dist/src/inputs/src/index.js"),
            "@jiggy/interfaces" : Path.resolve("./dist/src/interfaces/src/index.js"),
            "@jiggy/utils" : Path.resolve("./dist/src/utils/src/index.js")
        }
        // alias : {
        //     "@jiggy/assets" : Path.resolve("../../src/assets/dist/assets/src/index.js"),
        //     "@jiggy/audio" : Path.resolve("../../src/audio/dist/audio/src/index.js"),
        //     "@jiggy/core" : Path.resolve("../../src/core/dist/core/src/index.js"),
        //     "@jiggy/engines" : Path.resolve("../../src/engines/dist/engines/src/index.js"),
        //     "@jiggy/entities" : Path.resolve("../../src/entities/dist/entities/src/index.js"),
        //     "@jiggy/inputs" : Path.resolve("../../src/inputs/dist/inputs/src/index.js"),
        //     "@jiggy/interfaces" : Path.resolve("../../src/interfaces/dist/index.js"),
        //     "@jiggy/utils" : Path.resolve("../../src/utils/dist/utils/src/index.js")
        // }
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
            { enforce: 'pre', test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    }
};