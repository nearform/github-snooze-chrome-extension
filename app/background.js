(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _constants = require("./constants.js");

// eslint-disable-next-line no-undef
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!tab.url.startsWith('https://github.com/')) {
    return;
  }

  if (changeInfo.url === undefined) {
    // eslint-disable-next-line no-undef
    await chrome.tabs.sendMessage(tabId, {
      message: _constants.MSG_TAB_REFRESHED,
      url: tab.url,
      // eslint-disable-next-line no-undef
      extensionId: chrome.runtime.id
    });
    return;
  }

  if (changeInfo.url) {
    // eslint-disable-next-line no-undef
    await chrome.tabs.sendMessage(tabId, {
      message: _constants.MSG_URL_CHANGED,
      url: changeInfo.url,
      // eslint-disable-next-line no-undef
      extensionId: chrome.runtime.id
    });
    return;
  }
});

},{"./constants.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MSG_URL_CHANGED = exports.MSG_TAB_REFRESHED = exports.GH_SNOOZE_PREFIX = exports.ERR_USER_NOT_FOUND = exports.ERR_URL_NOT_VALID = exports.ERR_PROCEDURE_STILL_RUNNING = exports.ERR_PAT_NOT_VALID = exports.ERR_PAT_NOT_FOUND = exports.ERR_HTML_PARENT_NOT_FOUND = exports.ERR_GENERIC = void 0;

/**
 * Prefixes
 */
const GH_SNOOZE_PREFIX = 'GH_SNOOZE - ';
/**
 * Errors
 */

exports.GH_SNOOZE_PREFIX = GH_SNOOZE_PREFIX;
const ERR_USER_NOT_FOUND = 'User not found.';
exports.ERR_USER_NOT_FOUND = ERR_USER_NOT_FOUND;
const ERR_PAT_NOT_FOUND = 'If you want to use the GitHub Snooze extension please add a valid PAT in the `GitHub Snooze Options Page`.';
exports.ERR_PAT_NOT_FOUND = ERR_PAT_NOT_FOUND;
const ERR_PAT_NOT_VALID = 'The provided PAT in the `GitHub Snooze Options Page` seems not valid. Try to insert it again.';
exports.ERR_PAT_NOT_VALID = ERR_PAT_NOT_VALID;
const ERR_GENERIC = 'A generic error occurred. Try to refresh the page.';
exports.ERR_GENERIC = ERR_GENERIC;
const ERR_HTML_PARENT_NOT_FOUND = 'Unable to find the parent element. Try to refresh the page.';
exports.ERR_HTML_PARENT_NOT_FOUND = ERR_HTML_PARENT_NOT_FOUND;
const ERR_URL_NOT_VALID = 'Current URL is not valid. Waiting for a valid URL.';
exports.ERR_URL_NOT_VALID = ERR_URL_NOT_VALID;
const ERR_PROCEDURE_STILL_RUNNING = 'Procedure is still running. Nothing to do.';
/**
 * Messages
 */

exports.ERR_PROCEDURE_STILL_RUNNING = ERR_PROCEDURE_STILL_RUNNING;
const MSG_URL_CHANGED = 'URL_CHANGED';
exports.MSG_URL_CHANGED = MSG_URL_CHANGED;
const MSG_TAB_REFRESHED = 'TAB_REFRESHED';
exports.MSG_TAB_REFRESHED = MSG_TAB_REFRESHED;

},{}]},{},[1]);
