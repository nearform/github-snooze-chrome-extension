(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GH_SNOOZE_PREFIX = exports.ERR_USER_NOT_FOUND = void 0;
const GH_SNOOZE_PREFIX = 'GH_SNOOZE - ';
exports.GH_SNOOZE_PREFIX = GH_SNOOZE_PREFIX;
const ERR_USER_NOT_FOUND = 'User not found.';
exports.ERR_USER_NOT_FOUND = ERR_USER_NOT_FOUND;

},{}],2:[function(require,module,exports){
"use strict";

var _constants = require("./constants.js");

var _logger = require("./logger.js");

var _user = require("./user.js");

const start = async () => {
  // Retrieve the logged in user from the meta user-login
  const username = (0, _user.fetchUsername)();

  if (!username) {
    (0, _logger.logError)(_constants.ERR_USER_NOT_FOUND);
    return;
  }

  (0, _logger.logInfo)('User found: ' + username); // Retrieve user data from GitHub API

  const userData = await (0, _user.fetchUserData)(username);

  if (!userData) {
    (0, _logger.logError)(`User data for @${username} not found.`);
  } // Initialise the user model with needed data


  const user = (0, _user.initUserModel)(userData);
  (0, _logger.logDebug)('User initialised: ' + user);
};

start();

},{"./constants.js":1,"./logger.js":3,"./user.js":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logInfo = exports.logError = exports.logDebug = void 0;

var _constants = require("./constants.js");

const logInfo = message => console.info(_constants.GH_SNOOZE_PREFIX + message);

exports.logInfo = logInfo;

const logDebug = message => console.debug(_constants.GH_SNOOZE_PREFIX + message);

exports.logDebug = logDebug;

const logError = message => console.error(_constants.GH_SNOOZE_PREFIX + message);

exports.logError = logError;

},{"./constants.js":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initUserModel = exports.fetchUsername = exports.fetchUserData = void 0;

var _logger = require("./logger.js");

const fetchUsername = () => {
  return document.querySelector('meta[name="user-login"]').content;
};

exports.fetchUsername = fetchUsername;

const fetchUserData = async username => {
  try {
    (0, _logger.logInfo)('username: ' + username);
    const response = await fetch(`https://api.github.com/users/${username}`);
    (0, _logger.logInfo)('here1: ', JSON.stringify(response));
    const data = await response.json();
    (0, _logger.logInfo)('here: ', JSON.stringify(data));
    return data;
  } catch (err) {
    (0, _logger.logError)(err);
    return null;
  }
};

exports.fetchUserData = fetchUserData;

const initUserModel = data => {
  return {
    username: data['login'],
    id: data['id'],
    company: data['company'],
    me: data['url']
  };
};

exports.initUserModel = initUserModel;

},{"./logger.js":3}]},{},[2]);
