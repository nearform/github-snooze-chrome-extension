"use strict";

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }

        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }

      return n[i].exports;
    }

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);

    return o;
  }

  return r;
})()({
  1: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.postSnooze = exports.fetchUserData = void 0;

    var _logger = require("./logger.js");

    var _state = require("./state.js");

    const fetchUserData = async () => {
      try {
        const response = await fetch("https://api.github.com/user", {
          method: 'GET',
          headers: {
            Authorization: "token ".concat((0, _state.getPat)())
          }
        });
        const data = await response.json();
        return data;
      } catch (err) {
        (0, _logger.logError)(err);
        return null;
      }
    }; // eslint-disable-next-line no-unused-vars


    exports.fetchUserData = fetchUserData;

    const postSnooze = async (url, notifyDate) => {
      // TODO: add real HTTP request
      (0, _logger.logInfo)('Sending postSnooze request ...');
      return true;
    };

    exports.postSnooze = postSnooze;
  }, {
    "./logger.js": 10,
    "./state.js": 11
  }],
  2: [function (require, module, exports) {
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
  }, {}],
  3: [function (require, module, exports) {
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
  }, {}],
  4: [function (require, module, exports) {
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
  }, {}],
  5: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ErrorsType = void 0;
    const ErrorsType = {
      PAT_NOT_FOUND: 'PAT_NOT_FOUND',
      PAT_NOT_VALID: 'PAT_NOT_VALID'
    };
    exports.ErrorsType = ErrorsType;
  }, {}],
  6: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.renderSnoozePlugin = exports.renderError = exports.initUser = exports.initPat = void 0;

    var _constants = require("./constants.js");

    var _logger = require("./logger.js");

    var _state = require("./state.js");

    var _html = require("./html.js");

    var _date = require("./date.js");

    var _dialog = require("./dialog.js");

    var _api = require("./api.js");

    var _errorsType = require("./errorsType.js");

    const initPat = async () => {
      // eslint-disable-next-line no-undef
      const {
        pat
      } = await chrome.storage.sync.get('pat');

      if (!pat) {
        throw new Error(_errorsType.ErrorsType.PAT_NOT_FOUND);
      }

      (0, _state.setPat)(pat);
    };

    exports.initPat = initPat;

    const initUser = async () => {
      // Retrieve the logged in user from the meta user-login
      const username = (0, _html.fetchUsername)();

      if (!username) {
        (0, _logger.logError)(_constants.ERR_USER_NOT_FOUND);
        return;
      }

      (0, _logger.logInfo)('User found: ' + username); // Retrieve user data from GitHub API

      const userData = await (0, _api.fetchUserData)();

      if (!userData) {
        throw new Error(_errorsType.ErrorsType.PAT_NOT_VALID);
      } // Initialise the user state with needed data


      const user = (0, _state.setUser)(userData);

      if (user.username !== username) {
        throw new Error(_errorsType.ErrorsType.PAT_NOT_VALID);
      }

      (0, _logger.logInfo)('User initialised.');
    };

    exports.initUser = initUser;

    const renderError = errorType => {
      const renderedError = (0, _html.getRenderedError)();

      if (renderedError) {
        (0, _logger.logInfo)('Snooze error already rendered.');
        return;
      }

      const parent = (0, _html.getParentElement)();

      if (!parent) {
        (0, _logger.logError)(_constants.ERR_HTML_PARENT_NOT_FOUND);
        return;
      }

      let errorMessage = _constants.ERR_GENERIC;

      switch (errorType) {
        case _errorsType.ErrorsType.PAT_NOT_FOUND:
          errorMessage = _constants.ERR_PAT_NOT_FOUND;
          break;

        case _errorsType.ErrorsType.PAT_NOT_VALID:
          errorMessage = _constants.ERR_PAT_NOT_VALID;
          break;
      }

      const button = (0, _html.createButton)('GitHub Snooze', handleSnoozeClick, true);
      parent.appendChild(button);
      const extensionId = (0, _state.getExtensionId)();
      const redirectUrl = "chrome-extension://".concat(extensionId, "/screens/options/options.html");
      const hyperText = (0, _html.createHyperText)(errorMessage, redirectUrl);
      parent.appendChild(hyperText);
    };

    exports.renderError = renderError;

    const renderSnoozePlugin = () => {
      (0, _logger.logInfo)('Rendering snooze plugin.');
      const snoozeButton = (0, _html.getSnoozeButton)();

      if (snoozeButton) {
        (0, _logger.logInfo)('Snooze button already rendered.');
        return;
      }

      const parent = (0, _html.getParentElement)();

      if (!parent) {
        (0, _logger.logError)(_constants.ERR_HTML_PARENT_NOT_FOUND);
        return;
      }

      const button = (0, _html.createButton)('GitHub Snooze', handleSnoozeClick);
      parent.appendChild(button);
      (0, _logger.logInfo)('Snooze plugin rendered.');
    };

    exports.renderSnoozePlugin = renderSnoozePlugin;

    const handleSnoozeClick = () => {
      const hours = (0, _dialog.promptHoursDialog)();
      console.log("You will be notified in ".concat(hours, " hours."));

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
  }, {
    "./api.js": 1,
    "./constants.js": 2,
    "./date.js": 3,
    "./dialog.js": 4,
    "./errorsType.js": 5,
    "./html.js": 7,
    "./logger.js": 10,
    "./state.js": 11
  }],
  7: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getSnoozeButton = exports.getRenderedError = exports.getParentElement = exports.fetchUsername = exports.createHyperText = exports.createButton = void 0;

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

    const getRenderedError = () => {
      // eslint-disable-next-line no-undef
      return document.getElementById('github-snooze-error');
    };

    exports.getRenderedError = getRenderedError;

    const getParentElement = () => {
      // eslint-disable-next-line no-undef
      const [parent] = document.getElementsByClassName('discussion-sidebar-item sidebar-notifications');
      return parent;
    };

    exports.getParentElement = getParentElement;

    const createButton = function createButton(text, onClick) {
      let disabled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // eslint-disable-next-line no-undef
      const btnNode = document.createElement('button');
      btnNode.setAttribute('id', 'github-snooze-button');
      btnNode.setAttribute('class', 'btn btn-block btn-sm thread-subscribe-button');
      btnNode.setAttribute('style', 'margin-top: 6px;');

      if (disabled) {
        btnNode.setAttribute('disabled', disabled);
      }

      btnNode.onclick = onClick; // eslint-disable-next-line no-undef

      const textNode = document.createTextNode(text);
      btnNode.appendChild(textNode);
      return btnNode;
    };

    exports.createButton = createButton;

    const createHyperText = (text, url) => {
      // eslint-disable-next-line no-undef
      const aNode = document.createElement('a');
      aNode.setAttribute('id', 'github-snooze-error');
      aNode.setAttribute('class', 'reason text-small');
      aNode.setAttribute('style', 'color: #FFBF00; margin-top: 6px;');
      aNode.setAttribute('href', url);
      aNode.setAttribute('target', '_blank'); // eslint-disable-next-line no-undef

      const textNode = document.createTextNode(text);
      aNode.appendChild(textNode);
      return aNode;
    };

    exports.createHyperText = createHyperText;
  }, {}],
  8: [function (require, module, exports) {
    "use strict";

    var _listeners = _interopRequireDefault(require("./listeners.js"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    (0, _listeners.default)();
  }, {
    "./listeners.js": 9
  }],
  9: [function (require, module, exports) {
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
          url,
          extensionId
        } = msg;

        switch (message) {
          case _constants.MSG_TAB_REFRESHED:
          case _constants.MSG_URL_CHANGED:
            if (!(0, _url.isValidUrl)(url)) {
              (0, _logger.logInfo)(_constants.ERR_URL_NOT_VALID);
              return;
            }

            if ((0, _state.getProcedureInProgress)()) {
              (0, _logger.logInfo)(_constants.ERR_PROCEDURE_STILL_RUNNING);
              return;
            }

            (0, _state.setProcedureInProgress)(true);
            (0, _state.setCurrentUrl)(url);
            (0, _state.setExtensionId)(extensionId);

            try {
              await (0, _extension.initPat)();
              await (0, _extension.initUser)();
            } catch (err) {
              (0, _logger.logError)(err.message);
              (0, _extension.renderError)(err.message); // eslint-disable-next-line no-undef

              (0, _state.setProcedureInProgress)(false);
              return;
            }

            (0, _extension.renderSnoozePlugin)();
            (0, _state.setProcedureInProgress)(false);
            break;

          default:
            break;
        }

        sendResponse();
      });
    }
  }, {
    "./constants.js": 2,
    "./extension.js": 6,
    "./logger.js": 10,
    "./state.js": 11,
    "./url.js": 12
  }],
  10: [function (require, module, exports) {
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
  }, {
    "./constants.js": 2
  }],
  11: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.setUser = exports.setProcedureInProgress = exports.setPat = exports.setExtensionId = exports.setCurrentUrl = exports.getUser = exports.getProcedureInProgress = exports.getPat = exports.getExtensionId = exports.getCurrentUrl = void 0;
    const state = {
      extensionId: null,
      user: {
        username: null,
        id: null,
        company: null,
        me: null
      },
      pat: null,
      procedureInProgress: false,
      currentUrl: null
    };

    const setExtensionId = id => {
      state.extensionId = id;
    };

    exports.setExtensionId = setExtensionId;

    const getExtensionId = () => state.extensionId;

    exports.getExtensionId = getExtensionId;

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

    const setPat = pat => {
      state.pat = pat;
    };

    exports.setPat = setPat;

    const getPat = () => state.pat;

    exports.getPat = getPat;

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
  }, {}],
  12: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isValidUrl = void 0;

    const isValidUrl = url => {
      return url.includes('/issues/') || url.includes('/pull/');
    };

    exports.isValidUrl = isValidUrl;
  }, {}]
}, {}, [8]);
