const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

const currentDir = path.resolve(__dirname);
const folderPath = path.join(currentDir, 'test');
const logFilePath = path.join(currentDir, 'log.txt');

const logEvent = (event, filePath) => {
    const timestamp = new Date().toLocaleString();
    const message = `File ${filePath} has been ${event} at ${timestamp}\n`;
    fs.appendFile(logFilePath, message, (err) => {
        if (err) console.error(`Error logging event: ${err}`);
    });
};

const watcher = chokidar.watch(folderPath, { ignored: /[\/\\]\./ });

watcher
    .on('add', path => logEvent('added', path))
    .on('change', path => logEvent('changed', path))
    .on('unlink', path => logEvent('deleted', path));



    

