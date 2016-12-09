#!/usr/bin/env node

'use strict'
Array.prototype.contain = function (obj) {
    return this.indexOf(obj) !== -1;
}
const srm = require('./srm')
const argv = require('yargs')
    .option('p', {
        alias: 'path',
        type: 'string',
        describe: '要删除/清空的目录路径'
    })
    .option('m', {
        alias: 'mode',
        type: 'string',
        demand: true,
        describe: '指定模式: [e]-清空目录 [d]-删除目录'
    })
    .usage('Usage: srm [options]')
    .example('srm -m e -p F://example')
    .help('h')
    .alias('h', 'help')
    .strict()
    .check(checkArg)
    .showHelpOnFail(true)
    .epilog('copyright 2016')
    .argv;

function checkArg(argv) {
    var mOption = ['e', 'd']
    return mOption.contain(argv.m)
}

if (argv.m) {
    srm(argv.m, argv.p || process.cwd())
}