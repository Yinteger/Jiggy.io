'use strict';

const Path = require('path');
const ChildProcess = require('child_process');
const FileSystem = require('fs');

const ROOT_DIR = Path.resolve(__dirname, '../../');
const BIN_DIR = Path.resolve(ROOT_DIR, './node_modules/.bin/');
const SRC_DIR = Path.resolve(ROOT_DIR, './src/');

function ammendPackageVersions(version, pkgLoc) {
    var pkg = require(pkgLoc);

    // Change the package version to the new version
    pkg.version = version;

    // If the package has any peer dependencies that is @jiggy/, 
    // update the dependency version of all those as well
    if (pkg.peerDependencies) {
        for (var peerPkg in pkg.peerDependencies) {
            if (peerPkg.indexOf('@jiggy/') > -1) {
                pkg.peerDependencies[peerPkg] = version;
            }
        }
    }

    //Finally, write the updated package.json file, in a human readable way.
    FileSystem.writeFileSync(pkgLoc, JSON.stringify(pkg, null, 4));
}

function exec(done, args = '') {
    var packages = FileSystem.readdirSync(SRC_DIR);

    var version = null;
    for (var i = 0; i < process.argv.length; i++) {
        if (process.argv[i] === "-v") {
            version = process.argv[i + 1];
        }
    }

    if (!version) {
        console.error('\nSyntax: gulp publish -v {version}\n');
        return done();
    }

    for (var i = 0; i < packages.length; i++) {
        var pkgLoc = packages[i];

        var pkg = Path.resolve(SRC_DIR, pkgLoc, 'package.json');
        
        if (FileSystem.existsSync(pkg)) {
            console.log('Publishing', pkgLoc, '...');

            ammendPackageVersions(version, pkg);
            
            ChildProcess.spawnSync(`npm publish`, {
                cwd : Path.resolve(SRC_DIR, pkgLoc),
                shell : true,
                stdio: 'inherit'
            });
        }
    }

    done();
}

module.exports = {
    'all' : (gulp) => (done) => exec(done)
};