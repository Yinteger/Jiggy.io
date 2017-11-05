'use strict';

const Path = require('path');
const ChildProcess = require('child_process');
const FileSystem = require('fs');

const ROOT_DIR = Path.resolve(__dirname, '../../');
const BIN_DIR = Path.resolve(ROOT_DIR, './node_modules/.bin/');
const SRC_DIR = Path.resolve(ROOT_DIR, './src/');
const TEST_DIR = Path.resolve(ROOT_DIR, './test_apps/');

function execBuild(done, args = '') {
    // var packages = FileSystem.readdirSync(SRC_DIR);

    ChildProcess.spawnSync(`${BIN_DIR}/tsc`, {
        cwd : Path.resolve(SRC_DIR),
        shell : true,
        stdio: 'inherit'
    });

    // for (var i = 0; i < packages.length; i++) {
    //     var pkg = packages[i];
        
    //     if (FileSystem.existsSync(Path.resolve(SRC_DIR, pkg, 'package.json'))) {
    //         console.log('Building', pkg, '...');
            
    //         ChildProcess.spawnSync(`${BIN_DIR}/tsc -p tsconfig-build.json`, {
    //             cwd : Path.resolve(SRC_DIR, pkg),
    //             shell : true,
    //             stdio: 'inherit'
    //         });

    //         ChildProcess.spawnSync(`node build.js`, {
    //             cwd : Path.resolve(SRC_DIR, pkg),
    //             shell : true,
    //             stdio: 'inherit'
    //         });
    //     }
    // }

    done();
}

function execBuildTests(done, args = '') {
    var testApps = FileSystem.readdirSync(TEST_DIR);

    for (var i = 0; i < testApps.length; i++) {
        var testApp = testApps[i];
        
        if (FileSystem.existsSync(Path.resolve(TEST_DIR, testApp, 'webpack.config.js'))) {
            console.log('Building', testApp, '...');

            ChildProcess.spawnSync(`${BIN_DIR}/webpack`, {
                cwd : Path.resolve(TEST_DIR, testApp),
                shell : true,
                stdio: 'inherit'
            });
        }
    }

    done();
}

module.exports = {
    'all' : (gulp) => (done) => execBuild(done),
    'allTests' : (gulp) => (done) => execBuildTests(done)
};