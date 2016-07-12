/* jshint node:true, esversion: 6 */
'use strict';

const xml2js        = require('xml2js');
const fs            = require('fs');
const RSVP          = require('rsvp');
const chalk         = require('chalk');
const _filter       = require('lodash').filter;
const _forOwn       = require('lodash').forOwn;

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
  fs.writeFile(xmlPath, xml);
};

const addNodes = function(json, opts) {
  _forOwn(opts.desiredNodes, (newNodes, platformName) => {

    //Cordova wont always have a platforms: []
    if(!json.widget.platform) json.widget.platform = [];

    //See if platform already exists
    let platformNode = _filter(json.widget.platform, {$: { name: platformName } });
    if (platformNode.length > 0) {
      platformNode = platformNode[0];
    } else {
      platformNode = {$: { name: platformName } };
      json.widget.platform.push(platformNode);
    }

    let targetNodes = platformNode[opts.keyName];
    if (targetNodes === undefined) {
      targetNodes = [];
    }

    newNodes.forEach((node) => {
      //If node exists, overwrite it
      let matched = _filter(targetNodes, {$: { src: node.src } });
      let props = opts.serializeFn(platformName, opts.projectPath, node);

      if (matched.length > 0) {
        matched[0].$ = props;
      } else {
        targetNodes.push( {$: props} );
      }
    });

    platformNode[opts.keyName] = targetNodes;
  });


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
      addNodes(json, opts);
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
