/* globals String */

/* jshint node:true, esversion: 6 */
'use strict';

const xml2js        = require('xml2js');
const fs            = require('fs');
const RSVP          = require('rsvp');
const chalk         = require('chalk');
const _findIndex    = require('lodash').findIndex;
const _forOwn       = require('lodash').forOwn;
const _filter       = require('lodash').filter;
const _remove       = require('lodash').remove;
const _pullAt       = require('lodash').pullAt;

const parseXML = function(xmlPath) {
  return new RSVP.Promise((resolve, reject) => {
    const contents = fs.readFileSync(xmlPath, 'utf8');
    const parser = new xml2js.Parser();

    if (contents === '') reject('File is empty');

    parser.parseString(contents, function (err, result) {
      if (err) reject(err);
      if (result) resolve(result);
    });
  });
};

const saveXML = function(json, xmlPath) {
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(json);

  // Add missing trailing newline
  fs.writeFileSync(xmlPath, xml + '\n');
};

const addNodes = function(json, opts) {
  _forOwn(opts.desiredNodes, (nodeData, platformName) => {

    //Cordova wont always have a platforms: []
    if (!json.widget.platform) json.widget.platform = [];

    //See if platform already exists
    let platformNode;
    let platformNodePos = _findIndex(json.widget.platform, {$: { name: platformName } });

    if (platformNodePos > -1) {
      //the platform existed, assign to platform Node & temp rm from JSOn
      platformNode = json.widget.platform[platformNodePos];
      _pullAt(json.widget.platform, platformNodePos);
    } else {
      platformNode = {$: { name: platformName } };
    }

    let targetNodes = platformNode[opts.keyName];
    if (targetNodes === undefined) {
      targetNodes = [];
    }

    //Icons do not have a consistent node for detection
    const sizeKey = nodeData.sizeKey;

    nodeData.sizes.forEach((node) => {
      //If node exists, overwrite it
      let props = opts.serializeFn(platformName, opts.projectPath, node);
      _filter(targetNodes, (item) => {
        if (!item) return;

        if (item.$[sizeKey] === String(props[sizeKey])) {
          _remove(targetNodes, item);
        }
      });

      targetNodes.push( {$: props} );
    });

    platformNode[opts.keyName] = targetNodes;
    json.widget.platform.push(platformNode);
  });

  return json;
};

/*
   Required opts:

   desiredNodes Array:
   {ios: [], android: [], blackberry: []}
   See src/platform-icon-sizes for an example

   keyName: String
   `icon` or `splash`

   serializeFn: Function
   Given a single node from desiredNodes, serialize to config.xml format
*/
module.exports = function(opts) {
  const configPath = `${opts.projectPath}/config.xml`;

  return new RSVP.Promise((resolve, reject) => {
    if (!opts.projectPath ||
        !opts.desiredNodes ||
        !opts.keyName ||
        !opts.serializeFn) {

      reject(
        'Missing required opts: projectPath, desiredNodes, keyName, serializeFn'
      );
    }

    parseXML(configPath).then((json) => {
      json = addNodes(json, opts);
      saveXML(json, configPath);
      resolve();
    }).catch((err) => {
      console.log(chalk.red(
        `Error reading XML: ${err}`
      ));

      reject(new Error(err));
    });
  });
};
