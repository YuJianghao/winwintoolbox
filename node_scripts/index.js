const fs = require('fs');
const path = require('path');
const glob = require('glob');
const logger = require('./lib');
const chalk = require('chalk');
const ROOT = path.resolve(process.cwd(), '.')
logger.info('Root:', chalk.blue(ROOT))
const ignore = ['index.html'].concat(fs.readFileSync('.gitignore').toString().split('\n')).filter(item => !!item);
const ignored = ignore.map(pattern => {
    return glob.sync(pattern, {
        cwd: ROOT
    })
}).reduce((a, b) => a.concat(b), []).map(item=>path.relative('.',item))
logger.info('Ignore patterns:', ignore)
logger.info('Ignored files:')
ignored.map(item => logger.info('\t', chalk.blue(item)))
const exts = ['.html'];
logger.info('Extnames:', exts)
const counter = {
    file: 0,
    dir: 0
}
function tree(root) {
    const node = {};
    if (fs.existsSync(root)) {
        node.name = path.basename(root);
        node.path = path.relative(ROOT, root)
        if (!fs.lstatSync(root).isFile()) {
            const all = fs.readdirSync(root).map(item => path.relative(ROOT, path.resolve(root, item)));
            const children = all.filter(child => !ignored.includes(child)).map(item => path.basename(item))
            node.children = children.map(item => tree(path.resolve(root, item))).filter(item => !item.ignore);
            node.isDir = true
            node.isFile = false
            if (node.children.length < 1) node.ignore = true
            else counter.dir++
        } else {
            if (!exts.includes(path.extname(root))) {
                node.ignore = true
                return node
            }
            node.extname = path.extname(root)
            node.isDir = false
            node.isFile = true
            counter.file++
        }
    } else {
        throw new Error('Path not exists:', root);
    }
    return node;
}

const data = tree(ROOT).children;
fs.writeFileSync('data.js', `'use strict';
window.__TREE_DATA = ${JSON.stringify(data)};`);

logger.info('Listed', counter.file, 'files and', counter.dir, 'dirs, saved into data.js')