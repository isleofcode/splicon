"use strict";

var path = require("path");
var childProcess = require("pn/child_process");

var phantomjsCmd = require("phantomjs-prebuilt").path;
var converterFileName = path.resolve(__dirname, "./converter.js");

var PREFIX = "data:image/png;base64,";

module.exports = function (sourceBuffer, resize) {
  console.log('here');
    var cp = childProcess.execFile(phantomjsCmd, getPhantomJSArgs(resize), { maxBuffer: Infinity });

    console.log('a');
    writeBufferInChunks(cp.stdin, sourceBuffer);

    console.log('b');
    return cp.promise.then(processResult);
};

module.exports.sync = function (sourceBuffer, resize) {
    var result = childProcess.spawnSync(phantomjsCmd, getPhantomJSArgs(resize), {
        input: sourceBuffer.toString("base64")
    });
    return processResult(result);
};

function getPhantomJSArgs(resize) {
    return [converterFileName, resize === undefined ? "undefined" : JSON.stringify(resize)];
}

function writeBufferInChunks(writableStream, buffer) {
    var asString = buffer.toString("base64");

    var INCREMENT = 1024;

    writableStream.cork();
    for (var offset = 0; offset < asString.length; offset += INCREMENT) {
        writableStream.write(asString.substring(offset, offset + INCREMENT));
    }
    writableStream.end("\n"); // so that the PhantomJS side can use readLine()
}

function processResult(result) {
  console.log('processing result');
  console.log('result is', result);
    var stdout = result.stdout.toString();
    console.log('yo');
    console.log(stdout);
    console.log(stdout.startsWith);
    //below line is changed from startsWith
    if (stdout.indexOf(PREFIX === 0)) {
        console.log('prefix');
        return new Buffer(stdout.substring(PREFIX.length), "base64");
    }

    if (stdout.length > 0) {
      console.log('length');
        // PhantomJS always outputs to stdout.
        throw new Error(stdout.replace(/\r/g, "").trim());
    }

    var stderr = result.stderr.toString();
    console.log('string');
    if (stderr.length > 0) {
        // But hey something else might get to stderr.
        throw new Error(stderr.replace(/\r/g, "").trim());
    }

    console.log('derp');
    throw new Error("No data received from the PhantomJS child process");
}
