'use strict';

const Path = require('path');
const ChildProcess = require('child_process');
const FileSystem = require('fs');

const ROOT_DIR = Path.resolve(__dirname, '../../');
const BIN_DIR = Path.resolve(ROOT_DIR, './node_modules/.bin/');
const SRC_DIR = Path.resolve(ROOT_DIR, './src/');

function execBuild(done, args = '') {
    // var promise = new Promise((resolve, reject) => {
        var packages = FileSystem.readdirSync(SRC_DIR);

        for (var i = 0; i < packages.length; i++) {
            var pkg = packages[i];
            
            // console.log(pkg, Path.resolve(SRC_DIR, pkg, 'package.json'));
            if (FileSystem.existsSync(Path.resolve(SRC_DIR, pkg, 'package.json'))) {
                console.log('Building', pkg, '...');
                
                var buildProcess = ChildProcess.spawnSync(`${BIN_DIR}/tsc && node bundle_declarations.js`, {
                    cwd : Path.resolve(SRC_DIR, pkg),
                    shell : true,
                    stdio: 'inherit'
                });

                // console.log(buildProcess);

                // buildProcess.stdout.on('data', (data) => {
                //     console.log(data);
                // });

                // buildProcess.stderr.on('data', (data) => {
                //     console.log(data);
                // });

                // buildProcess.stdout.pipe(process.stdout);
                // buildProcess.stderr.pipe(process.stderr);
            }
        }

        // console.log(packages);
    // });

    // promise.then(() => {
    //     done();
    // }).catch(() => {
    //     done();
    // });
}

module.exports = {
    'all' : (gulp) => (done) => execBuild(done)
};