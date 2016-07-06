/* jshint node:true, esversion: 6 */
'use strict';

const xml2js        = require('xml2js');
const fs            = require('fs');
const RSVP          = require('rsvp');
const _filter       = require('lodash').filter;
const _forOwn       = require('lodash').forOwn;

const parseXML = function() {
  return new RSVP.Promise((resolve, reject) => {
    const contents = fs.readFileSync('config.xml', 'utf8');
    const parser = new xml2js.Parser();
    parser.parseString(contents, function (err, result) {
      if (err) reject(err);
      if (result) resolve(result);
    });
  });
};

const saveXML = function(json) {
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(json);
  fs.writeFile("config.xml", xml);
};

/*
   desiredNodes Array:
   {ios: [], android: [], blackberry: []}
   See lib/default-icons for an example

   nodeName: String
   probably icon or splash, what is the config.xml node name?

   serializeFn: Function
   Given a single node from desiredNodes, serialize to config.xml format
*/
module.exports = function(desiredNodes, nodeName, serializeFn) {
  parseXML().then((json) => {
    _forOwn(desiredNodes, (newNodes, platformName) => {

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

      let targetNodes = platformNode[nodeName];
      if (targetNodes === undefined) {
        targetNodes = [];
      }

      newNodes.forEach((node) => {
        //If node exists, overwrite it
        let matched = _filter(targetNodes, {$: { src: node.src } });
        let props = serializeFn(platformName, node);

        if (matched.length > 0) {
          matched[0].$ = props;
        } else {
          targetNodes.push( {$: props} );
        }
      });

      platformNode[nodeName] = targetNodes;
    });

    saveXML(json);
  });
};
