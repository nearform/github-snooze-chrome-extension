/**
 * Messages
 */
/**
 * Snooze Statuses
 */

const SNOOZE_STATUS_PENDING = 'SNOOZE_STATUS_PENDING';
const SNOOZE_STATUS_DONE = 'SNOOZE_STATUS_DONE';
/**
 * Actions
 */

const ACTION_UPDATE_BADGE_COUNTER = 'ACTION_UPDATE_BADGE_COUNTER';
/**
 * URL
 */

const URL_MATCH = 'https://github.com/';
/**
 * Colors
 */

const COLOR_PRIMARY = '#140048';
const COLOR_SECONDARY = '#FB7A9C';
const COLOR_SUCCESS = '#E3FBE3';
const COLOR_WHITE = '#FFFFFF';
/**
 * Storage Keys
 */

const SK_BADGE_COUNTER = 'badgeCounter';
const SK_URL = 'url';
const SK_USER = 'user';
const SK_PAT = 'pat';
/**
 * Reducer Action Types
 */

const SET_LOADING = 'SET_LOADING';
const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
const SET_USER = 'SET_USER';
const SET_PAT = 'SET_PAT';
const SET_CURRENT_URL = 'SET_CURRENT_URL';
const SET_SNOOZE_LIST = 'SET_SNOOZE_LIST';

/**
 * Sends a message to the background service worker
 * @param {string} action to send to the background service worker
 * @param {object} message an object with the message to send
 * @returns void
 */

const sendMessage = async (action, message) => {
  return await chrome.runtime.sendMessage({
    action,
    msg: message
  });
};
/**
 * Stores an item to the local storage
 * @param {object} item an object with keys and values to store
 */

const writeToLocalStorage = async item => {
  await chrome.storage.local.set(item);
};
/**
 * Fetches from the local storage the values related to the keys used as input
 * @param {string[]} keys an array of strings containing the keys to extract from the local storage
 * @returns the required keys from the local storage with the values
 */

const readFromLocalStorage = async keys => {
  const storage = await chrome.storage.local.get(keys);
  return storage;
};
/**
 * Reads everything from the local storage
 * @returns the entire local storage
 */

const readAllFromLocalStorage = async () => {
  return await chrome.storage.local.get();
};
/**
 * Clears the local storage removing every data present in it.
 */

const clearLocalStorage = async () => {
  await chrome.storage.local.clear();
};
/**
 * Clears the sync storage removing every data present in it.
 */

const clearSyncStorage = async () => {
  await chrome.storage.sync.clear();
};
/**
 * Fetches from the sync storage the values related to the keys used as input
 * @param {string[]} keys an array of strings containing the keys to extract from the sync storage
 * @returns the required keys from the lsync storage with the values
 */

const readFromSyncStorage = async keys => {
  return await chrome.storage.sync.get(keys);
};
/**
 * Stores an item to the sync storage
 * @param {object} obj an object with keys and values to store
 */

const writeToSyncStorage = async obj => {
  await chrome.storage.sync.set(obj);
};
/**
 * Returns the list of snoozes for that particular user
 * @param {string} userId user id
 * @returns the list of snoozes
 */

const getSnoozeList = async userId => {
  const storage = await chrome.storage.sync.get();

  if (storage[userId]) {
    return storage[userId].sort((x, y) => x.notifyAt - y.notifyAt);
  }

  return [];
};
/**
 * Stores the provided list of snoozes for the specified user
 * @param {string} userId user id
 * @param {object[]} snoozeList list of snooze objects
 * @returns void
 */

const setSnoozeList = async (userId, snoozeList) => {
  return await chrome.storage.sync.set({
    [userId]: snoozeList
  });
};
/**
 * Adds a snooze to the list and returns the list of snoozes
 * @param {string} userId user id
 * @param {object} snooze object
 * @returns the list of snooze after the insert
 */

const addSnooze = async (userId, snooze) => {
  let snoozeList = await getSnoozeList(userId);

  if (!snoozeList) {
    snoozeList = [];
  }

  snoozeList.push(snooze);
  await setSnoozeList(userId, snoozeList);
  return snoozeList.sort((x, y) => x.notifyAt - y.notifyAt);
};
/**
 * Removes a snooze object and returns the list of snoozes after the removal
 * @param {string} userId user id
 * @param {object} snooze object
 * @returns the list of snoozes after the removal
 */

const removeSnooze = async (userId, snooze) => {
  const snoozeList = await getSnoozeList(userId);
  const updatedList = snoozeList.filter(s => s.id !== snooze.id);
  await setSnoozeList(userId, updatedList);

  if (snooze.badgeCount) {
    const badgeCounter = await incrementBadgeCounter(-1);
    await sendMessage(ACTION_UPDATE_BADGE_COUNTER, badgeCounter);
  }

  return await getSnoozeList(userId);
};
/**
 * Checks if the provided URL is already present in the Snooze list.
 * @param {string} userId user id
 * @param {string} url url to snooze
 * @returns true if the url is already present, false otherwise
 */

const checkUrlAlreadySnoozed = async (userId, url) => {
  const snoozeList = await getSnoozeList(userId);
  const snoozeFound = snoozeList.find(snooze => {
    const snoozeUrl = snooze.url;

    if (snoozeUrl.length > url) {
      return snoozeUrl.startsWith(url);
    }

    return url.startsWith(snoozeUrl);
  });
  return snoozeFound !== undefined;
};
/**
 * Increments the badge counter value by the specified increment value, default is 1.
 * @param {number} increment default is 1
 * @returns the badge counter incremented value
 */

const incrementBadgeCounter = async (increment = 1) => {
  let badgeCounter = await getBadgeCounter();
  badgeCounter += increment;
  await writeToSyncStorage({
    badgeCounter
  });
  return badgeCounter;
};
/**
 * It updates the badge counter UI with the badge counter value retrieved from the sync storage.
 */

const updateBadgeCounterUI = async () => {
  const badgeCounter = await getBadgeCounter();
  chrome.action.setBadgeBackgroundColor({
    color: COLOR_SECONDARY
  });
  chrome.action.setBadgeText({
    text: badgeCounter.toString()
  });
};
/**
 * Retrieves the badge counter value, if does not exist will be created with the specified initial value, otherwise 0
 * @param {number} initialValue default is 0
 * @returns the badge counter value
 */

const getBadgeCounter = async (initialValue = 0) => {
  let {
    badgeCounter
  } = await readFromSyncStorage([SK_BADGE_COUNTER]);

  if (!badgeCounter) {
    await writeToSyncStorage({
      badgeCounter: initialValue
    });
    return 0;
  }

  return badgeCounter;
};

/**
 * Fetches the GitHub user details using the PAT provided.
 * @param {string} token Personal Access Token
 * @returns the GitHub user data
 */
const getUserByPat = async token => {
  const response = await fetch(`https://api.github.com/user`, getRequestHeaders('GET', token));
  const data = await response.json();

  if (response.status !== 200) {
    if (data.message === 'Bad credentials') {
      throw new Error('The provided PAT is not valid or expired.');
    }

    throw new Error(data.message);
  }

  return { ...data,
    // TODO: this header is not available, check why ...
    exp: response.headers.get('github-authentication-token-expiration')
  };
};
/**
 * Fetches the GitHub entity (issue or pull request) information.
 * @param {object} entityInfo an object containing the repo's owner, repo name, the entity type (issue or pull), and the entity number
 * @param {string} token Personal Access Token
 * @returns the GitHub entity detailed information
 */

const getEntity = async (entityInfo, token) => {
  const {
    owner,
    repo,
    type,
    number
  } = entityInfo;
  const effectiveType = type === 'pull' ? 'pulls' : type;
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/${effectiveType}/${number}`, getRequestHeaders('GET', token));
  const data = await response.json();
  return data;
};

const getRequestHeaders = (httpMethod, token) => {
  return {
    method: httpMethod,
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    }
  };
};

export { ACTION_UPDATE_BADGE_COUNTER as A, removeSnooze as B, COLOR_PRIMARY as C, SNOOZE_STATUS_PENDING as S, URL_MATCH as U, getEntity as a, SNOOZE_STATUS_DONE as b, COLOR_SECONDARY as c, SET_LOADING as d, readFromLocalStorage as e, COLOR_SUCCESS as f, getSnoozeList as g, COLOR_WHITE as h, incrementBadgeCounter as i, checkUrlAlreadySnoozed as j, addSnooze as k, getUserByPat as l, clearLocalStorage as m, clearSyncStorage as n, SET_SNOOZE_LIST as o, SET_CURRENT_URL as p, SET_PAT as q, readAllFromLocalStorage as r, setSnoozeList as s, SET_USER as t, updateBadgeCounterUI as u, SET_AUTHENTICATED as v, writeToLocalStorage as w, SK_URL as x, SK_PAT as y, SK_USER as z };
