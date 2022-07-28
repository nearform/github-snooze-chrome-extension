// SIMPLE RELOADER IMPORT
              import "./assets/background-page-reloader-80739b98.js"
              import { A as ACTION_UPDATE_BADGE_COUNTER, u as updateBadgeCounterUI, w as writeToLocalStorage, r as readAllFromLocalStorage, g as getSnoozeList, S as SNOOZE_STATUS_PENDING, s as setSnoozeList, a as getEntity, b as SNOOZE_STATUS_DONE, i as incrementBadgeCounter, U as URL_MATCH } from './chunks/github-6217f4bd.js';

/**
 * Checks if the url provided is a valid one.
 * @param {string} url
 * @param {string} match pattern to match in string format
 * @returns true if the url provided starts with the match
 */
const isValidUrl = (url, match) => {
  return url.startsWith(match);
};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const {
    action,
    msg: badgeCounter
  } = message;

  switch (action) {
    case ACTION_UPDATE_BADGE_COUNTER:
      updateBadgeCounterUI();
      break;
  }

  sendResponse();
});
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  let url = '';

  if (changeInfo.url === undefined) {
    url = tab.url;
  } else {
    url = changeInfo.url;
  }

  if (!isValidUrl(url, URL_MATCH)) {
    url = null;
  }

  await writeToLocalStorage({
    url
  });
});
chrome.tabs.onActivated.addListener(async activeInfo => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  let {
    url
  } = tab;

  if (!url || !isValidUrl(url, URL_MATCH)) {
    url = null;
  }

  await writeToLocalStorage({
    url
  });
});
setInterval(async () => {
  const now = new Date();
  const localStorage = await readAllFromLocalStorage();
  const {
    user,
    pat
  } = localStorage;
  const snoozesList = await getSnoozeList(user.id);
  const updatedSnoozeList = [];

  for (const snooze of snoozesList) {
    const snoozeNotifyDate = new Date(snooze.notifyAt);

    if (snooze.status === SNOOZE_STATUS_PENDING && snoozeNotifyDate < now) {
      // notify date has passed
      const updatedSnooze = await notify(snooze, pat);
      updatedSnoozeList.push(updatedSnooze);
    } else {
      updatedSnoozeList.push(snooze);
    }
  }

  await updateBadgeCounterUI();
  await setSnoozeList(user.id, updatedSnoozeList);
}, 5000);

const notify = async (snooze, pat) => {
  const {
    entityInfo
  } = snooze;
  const entity = await getEntity(entityInfo, pat);
  const {
    updated_at: updatedAt
  } = entity;
  snooze.status = SNOOZE_STATUS_DONE;

  if (updatedAt !== entityInfo.updatedAt) {
    // there has been an update, so don't notify the user
    return snooze;
  }

  await incrementBadgeCounter();
  snooze.badgeCount = true;
  return snooze;
};