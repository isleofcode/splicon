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
    parser.parseString(contents, function (err, result) {
      if (err) reject(err);
      if (result) resolve(result);
    });
  });
};

const saveXML = function(json, xmlPath) {
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(json);

  fs.writeFileSync(xmlPath, xml);
};

const addNodes = function(json, opts) {
  _forOwn(opts.desiredNodes, (nodeData, platformName) => {

    //Cordova wont always have a platforms: []
    if(!json.widget.platform) json.widget.platform = [];

    //See if platform already exists
    let platformNode;
    let platformNodePos = _findIndex(json.widget.platform, {$: { name: platformName } });

    if (platformNodePos > -1) {
      //the platform existed, assign to platform Node & temp rm from JSOn
      platformNode = json.widget.platform[platformNodePos];
      _pullAt(json.widget.platform, platformNodePos);
    } else {
      platformNode = {$: { name: platformName } };
      json.widget.platform.push(platformNode);
    }

    let targetNodes = platformNode[opts.keyName];
    if (targetNodes === undefined) {
      targetNodes = [];
    }

    //Icons do not have a consistent node for detection
    const itemKey = nodeData.itemKey;

    nodeData.items.forEach((node) => {
      //If node exists, overwrite it
      let props = opts.serializeFn(platformName, opts.projectPath, node);
      _filter(targetNodes, (item) => {
        if (!item) return;

        if (item.$[itemKey] === String(props[itemKey])) {
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
   See lib/default-icons for an example

   keyName: String
   probably icon or splash, what is the config.xml node name?

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

      reject();
    });
  });
};
