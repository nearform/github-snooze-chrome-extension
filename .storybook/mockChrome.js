export default {
  runtime: {
    sendMessage() {},
    onMessage: {
      addListener() {}
    }
  },
  alarms: {
    create() {},
    onAlarm: {
      addListener() {}
    }
  },
  storage: {
    local: {
      get() {},
      set() {},
      clear() {}
    },
    sync: {
      get() {},
      set() {},
      clear() {}
    }
  },
  action: {
    setBadgeBackgroundColor() {},
    setBadgeText() {}
  },
  notifications: {
    create() {}
  },
  windows: {
    getCurrent() {}
  },
  tabs: {
    query() {}
  }
}
