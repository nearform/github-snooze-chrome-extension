(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSnooze = exports.fetchUserData = void 0;

var _logger = require("./logger.js");

const fetchUserData = async username => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    return data;
  } catch (err) {
    (0, _logger.logError)(err);
    return null;
  }
};

exports.fetchUserData = fetchUserData;

const postSnooze = async (url, user, notifyDate) => {
  // TODO: add real HTTP request
  (0, _logger.logInfo)('Sending postSnooze request ...');
  return true;
};

exports.postSnooze = postSnooze;

},{"./logger.js":9}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MSG_URL_CHANGED = exports.MSG_TAB_REFRESHED = exports.GH_SNOOZE_PREFIX = exports.ERR_USER_NOT_FOUND = void 0;

/**
 * Prefixes
 */
const GH_SNOOZE_PREFIX = 'GH_SNOOZE - ';
/**
 * Errors
 */

exports.GH_SNOOZE_PREFIX = GH_SNOOZE_PREFIX;
const ERR_USER_NOT_FOUND = 'User not found.';
/**
 * Messages
 */

exports.ERR_USER_NOT_FOUND = ERR_USER_NOT_FOUND;
const MSG_URL_CHANGED = 'URL_CHANGED';
exports.MSG_URL_CHANGED = MSG_URL_CHANGED;
const MSG_TAB_REFRESHED = 'TAB_REFRESHED';
exports.MSG_TAB_REFRESHED = MSG_TAB_REFRESHED;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addHours = void 0;

const addHours = (date, numOfHours) => {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  return date;
};

exports.addHours = addHours;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptHoursDialog = void 0;

const promptHoursDialog = () => {
  const hours = Number( // eslint-disable-next-line no-undef
  prompt('In how many hours do you want to be notified?', 1));

  if (isNaN(hours) || hours === 0) {
    // eslint-disable-next-line no-undef
    alert('Please insert a valid number of hours.');
    return null;
  }

  return hours;
};

exports.promptHoursDialog = promptHoursDialog;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSnoozePlugin = exports.init = void 0;

var _constants = require("./constants.js");

var _logger = require("./logger.js");

var _state = require("./state.js");

var _html = require("./html.js");

var _date = require("./date.js");

var _dialog = require("./dialog.js");

var _api = require("./api.js");

const init = async () => {
  // Retrieve the logged in user from the meta user-login
  const username = (0, _html.fetchUsername)();

  if (!username) {
    (0, _logger.logError)(_constants.ERR_USER_NOT_FOUND);
    return;
  }

  (0, _logger.logInfo)('User found: ' + username); // Retrieve user data from GitHub API

  const userData = await (0, _api.fetchUserData)(username);

  if (!userData) {
    (0, _logger.logError)(`User data for @${username} not found.`);
  } // Initialise the user state with needed data


  (0, _state.setUser)(userData);
  (0, _logger.logInfo)('User initialised.');
};

exports.init = init;

const renderSnoozePlugin = () => {
  (0, _logger.logInfo)('Rendering snooze plugin.');
  const snoozeButton = (0, _html.getSnoozeButton)();

  if (snoozeButton) {
    (0, _logger.logInfo)('Snooze button already rendered.');
    return;
  }

  const parent = (0, _html.getParentElement)();

  if (!parent) {
    (0, _logger.logError)('Unable to find the parent element. Try to refresh the page.');
    return;
  }

  const button = (0, _html.createButton)('GitHub Snooze', handleSnoozeClick);
  parent.appendChild(button);
  (0, _logger.logInfo)('Snooze plugin rendered.');
};

exports.renderSnoozePlugin = renderSnoozePlugin;

const handleSnoozeClick = () => {
  const hours = (0, _dialog.promptHoursDialog)();
  console.log(`You will be notified in ${hours} hours.`);

  if (!hours) {
    (0, _logger.logError)('Hours value not valid.');
    return;
  }

  const now = new Date();
  const notifyDate = (0, _date.addHours)(now, hours);
  console.log('Notify date: ' + notifyDate);
  console.log('Notify date (UNIX): ' + notifyDate.getTime());
  const url = (0, _state.getCurrentUrl)();
  const user = (0, _state.getUser)();
  const unixTimestamp = notifyDate.getTime();
  (0, _api.postSnooze)(url, user, unixTimestamp);
};

},{"./api.js":1,"./constants.js":2,"./date.js":3,"./dialog.js":4,"./html.js":6,"./logger.js":9,"./state.js":10}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSnoozeButton = exports.getParentElement = exports.fetchUsername = exports.createButton = void 0;

const fetchUsername = () => {
  // eslint-disable-next-line no-undef
  return document.querySelector('meta[name="user-login"]').content;
};

exports.fetchUsername = fetchUsername;

const getSnoozeButton = () => {
  // eslint-disable-next-line no-undef
  return document.getElementById('github-snooze-button');
};

exports.getSnoozeButton = getSnoozeButton;

const getParentElement = () => {
  // eslint-disable-next-line no-undef
  const [parent] = document.getElementsByClassName('discussion-sidebar-item sidebar-notifications');
  return parent;
};

exports.getParentElement = getParentElement;

const createButton = (text, onClick) => {
  // eslint-disable-next-line no-undef
  const btnNode = document.createElement('button');
  btnNode.setAttribute('id', 'github-snooze-button');
  btnNode.setAttribute('class', 'btn btn-block btn-sm thread-subscribe-button');
  btnNode.setAttribute('style', 'margin-top: 6px;');
  btnNode.onclick = onClick; // eslint-disable-next-line no-undef

  const textNode = document.createTextNode(text);
  btnNode.appendChild(textNode);
  return btnNode;
};

exports.createButton = createButton;

},{}],7:[function(require,module,exports){
"use strict";

var _listeners = _interopRequireDefault(require("./listeners.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _listeners.default)();

},{"./listeners.js":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _constants = require("./constants.js");

var _extension = require("./extension.js");

var _logger = require("./logger.js");

var _url = require("./url.js");

var _state = require("./state.js");

function _default() {
  // eslint-disable-next-line no-undef
  chrome.runtime.onMessage.addListener(async (msg, _sender, sendResponse) => {
    const {
      message,
      url
    } = msg;

    switch (message) {
      case _constants.MSG_TAB_REFRESHED:
      case _constants.MSG_URL_CHANGED:
        (0, _logger.logInfo)('URL: ' + url);

        if (!(0, _url.isValidUrl)(url)) {
          (0, _logger.logInfo)('Current URL is not valid. Waiting for a valid URL.');
          return;
        }

        if ((0, _state.getProcedureInProgress)()) {
          (0, _logger.logInfo)('Procedure already in progress. Nothing to do.');
          return;
        }

        (0, _state.setProcedureInProgress)(true);
        (0, _state.setCurrentUrl)(url);
        await (0, _extension.init)();
        (0, _extension.renderSnoozePlugin)();
        (0, _state.setProcedureInProgress)(false);
        break;

      default:
        break;
    }

    sendResponse();
  });
}

},{"./constants.js":2,"./extension.js":5,"./logger.js":9,"./state.js":10,"./url.js":11}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logWarn = exports.logInfo = exports.logError = void 0;

var _constants = require("./constants.js");

const logInfo = message => console.info(_constants.GH_SNOOZE_PREFIX + message);

exports.logInfo = logInfo;

const logWarn = message => console.warn(_constants.GH_SNOOZE_PREFIX + message);

exports.logWarn = logWarn;

const logError = message => console.error(_constants.GH_SNOOZE_PREFIX + message);

exports.logError = logError;

},{"./constants.js":2}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUser = exports.setProcedureInProgress = exports.setCurrentUrl = exports.getUser = exports.getProcedureInProgress = exports.getCurrentUrl = void 0;
const state = {
  user: {
    username: null,
    id: null,
    company: null,
    me: null
  },
  procedureInProgress: false,
  currentUrl: null
};

const setUser = data => {
  state.user = {
    username: data['login'],
    id: data['id'],
    company: data['company'],
    me: data['url']
  };
  return state.user;
};

exports.setUser = setUser;

const getUser = () => state.user;

exports.getUser = getUser;

const setProcedureInProgress = value => {
  state.procedureInProgress = value;
};

exports.setProcedureInProgress = setProcedureInProgress;

const getProcedureInProgress = () => state.procedureInProgress;

exports.getProcedureInProgress = getProcedureInProgress;

const setCurrentUrl = url => {
  state.currentUrl = url;
};

exports.setCurrentUrl = setCurrentUrl;

const getCurrentUrl = () => state.currentUrl;

exports.getCurrentUrl = getCurrentUrl;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidUrl = void 0;

const isValidUrl = url => {
  return url.includes('/issues/') || url.includes('/pull/');
};

exports.isValidUrl = isValidUrl;

},{}]},{},[7]);
