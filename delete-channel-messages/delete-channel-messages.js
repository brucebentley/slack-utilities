#!/usr/bin/env node

// #####################################################################################################################
//
// OVERVIEW
//
// #####################################################################################################################
//
// The "Channel ID" is located in the actual browser URL. "Channel ID" then gets passed in as an argument at runtime.
//
// @EXAMPLE:
//   https://mycompany.slack.com/messages/MYCHANNELID/
//
// @USAGE:
//   node ./delete-slack-messages.js CHANNEL_ID
//
// #####################################################################################################################


// #####################################################################################################################
//
// CONFIGURATION
//
// #####################################################################################################################
//
// Generating your Slack API token.
//
// @DOCUMENTATION:
//   https://api.slack.com/custom-integrations/legacy-tokens
//
// @USAGE:
//   const token = process.env.SLACK_ACCESS_TOKEN;
//   const token = process.env.SLACK_ACCESS_TOKEN;
//

const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../config/' + process.env.WORKSPACE + '.env')});

// --------------------------------------------------
// Slack Workspace Access Tokens —
// --------------------------------------------------

const token = process.env.SLACK_ACCESS_TOKEN;


// #####################################################################################################################
//
// GLOBALS
//
// #####################################################################################################################

let channel = '';

if (process.argv[0].indexOf('node') !== -1 && process.argv.length > 2) {
  channel = process.argv[2];
} else if (process.argv[0].indexOf('delete') !== -1 && process.argv.length > 1) {
  channel = process.argv[1];
} else {
  console.log('Usage: node ./delete-slack-messages.js CHANNEL_ID');
  process.exit(1);
}

const https         = require('https');
const baseApiUrl    = 'https://slack.com/api/';
const messages      = [];
const historyApiUrl = baseApiUrl + 'conversations.history?token=' + token + '&count=1000&channel=' + channel + '&cursor=';
const deleteApiUrl  = baseApiUrl + 'chat.delete?token=' + token + '&channel=' + channel + '&ts='
let   delay         = 300;  // Delay between delete operations in milliseconds.
let   nextCursor    = '';

//
// ---------------------------------------------------------------------------------------------------------------------
//

function deleteMessage() {

  if (messages.length == 0) {

    if (nextCursor) {
      processHistory();
    }

    return;
  }

  const ts = messages.shift();

  https.get(deleteApiUrl + ts, function (res) {

    let body = '';

    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function(){
      const response = JSON.parse(body);

      if (response.ok === true) {
        console.log(ts + ' deleted!');
      } else if (response.ok === false) {
        console.log(ts + ' could not be deleted! (' + response.error + ')');

        if (response.error === 'ratelimited') {
          delay += 100;  // If rate limited error caught then we need to increase delay.
          messages.push(ts);
        }
      }

      setTimeout(deleteMessage, delay);
    });
  }).on('error', function (e) {
    console.error("Got an error: ", e);
  });
}

//
// ---------------------------------------------------------------------------------------------------------------------
//

function processHistory() {

  https.get(historyApiUrl + nextCursor, function(res) {

    let body = '';

    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {

      nextCursor = null;

      const response = JSON.parse(body);

      if (response.messages && response.messages.length > 0) {

        if (response.has_more) {
          nextCursor = response.response_metadata.next_cursor;
        }

        for (let i = 0; i < response.messages.length; i++) {
          messages.push(response.messages[i].ts);
        }

        deleteMessage();
      }
    });
  }).on('error', function (e) {
    console.error("Got an error: ", e);
  });
}

//
// ---------------------------------------------------------------------------------------------------------------------
//

processHistory();
