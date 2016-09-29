/* jshint node:true, esversion: 6 */
'use strict';

const path          = require('path');
const childProcess  = require('pn/child_process');

module.exports = (sourceBuffer, resize) => {
  const phantomjsCmd = require('phantomjs-prebuilt').path;
  const converterFileName = path.resolve(__dirname, './svg2png-converter.js');

  const cp = childProcess.execFile(
    phantomjsCmd,
    [converterFileName, JSON.stringify(resize)],
    { maxBuffer: Infinity }
  );

  writeBufferInChunks(cp.stdin, sourceBuffer);

  return cp.promise.then(processResult);
};

function writeBufferInChunks(writableStream, buffer) {
  const asString = buffer.toString('base64');
  const chunkSize = 1024;

  writableStream.cork();

  for (let offset = 0; offset < asString.length; offset += chunkSize) {
    writableStream.write(asString.substring(offset, offset + chunkSize));
  }

  writableStream.end("\n"); // so that the PhantomJS side can use readLine()
}

function processResult(result) {
  const prefix = 'data:image/png;base64,';
  const stdout = result.stdout.toString();

  if (stdout.startsWith(prefix)) {
    return new Buffer(stdout.substring(prefix.length), 'base64');
  }

  if (stdout.length > 0) {
    // PhantomJS always outputs to stdout.
    throw new Error(stdout.replace(/\r/g, '').trim());
  }

  const stderr = result.stderr.toString();

  if (stderr.length > 0) {
    // But hey something else might get to stderr.
    throw new Error(stderr.replace(/\r/g, '').trim());
  }

  throw new Error('No data received from the PhantomJS child process');
}
