'use strict'
const exec = require('child_process').exec
const path = require('path')
const fs = require('fs')
const readline = require('readline')
const chalk = require('chalk')

function srm(mode, Upath) {
    console.log(Date())
    if (!Upath || !fs.statSync(path.join(Upath)).isDirectory()) {
        console.log(chalk.red('Illegal path!'))
        process.exit(0)
    }
    let tempPath = path.join(path.resolve(Upath, '..'), `${new Date().getTime()}-srm-created`)
    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    r1.question(`Are you sure ${chalk.green(mode === 'e' ? 'empty' : 'delete')} ${chalk.red(Upath)} ? (y/n)`, (answer) => {
        if (answer.toLowerCase() !== 'y') {
            console.log(chalk.blue('Thank you,bye~'))
            r1.close()
            process.exit(0)
        }
        fs.mkdir(tempPath, () => {
            exec(`robocopy ${tempPath} ${Upath} /purge`, {}, function (err, stdout, stderr) {
                if (err) {
                    console.log(err)
                    process.exit(1)
                }
                console.log(`${chalk.green(mode === 'e' ? 'empty' : 'delete')} the directory(${Upath}) successfully!`)
                fs.rmdir(tempPath, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            })
        })
        r1.close();
    })

}

module.exports = srm