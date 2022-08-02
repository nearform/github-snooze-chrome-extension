# Github Snooze Chrome Extension
This Chrome Extension adds the Snooze feature to GitHub issues and pull requests.

## Requirements
To use this extension you will need a _GitHub Personal Access Token_ (_PAT_), with these permissions:

- `repo`: used for getting the repository information, such as last update date time on issues and pull requests
- `read:user`: used for retrieving the current logged in user information _(GitHub ID and username)_

You can generate one through this [link](https://github.com/settings/tokens/new).

## Usage instructions for the users
In order to use this extension locally, you have to complete the following steps:

- Download the release artifact with the distribution files, the `dist.zip` and extract it.
- Open the **Extension Management** page by navigating to: `chrome://extensions`
- Enable Developer Mode by clicking the toggle switch next to **Developer mode**
- Click the **Load unpacked** button and select the extension directory, in this case the previously extracted folder

## Usage instructions for the developers
In order to use this extension during the development, you have to complete these steps:

- `npm start` in the project root, this command will generate the `dist` folder and will run the extension in `watch` mode
- Open the **Extension Management** page by navigating to: `chrome://extensions`
- Enable Developer Mode by clicking the toggle switch next to **Developer mode**
- Click the **Load unpacked** button and select the extension directory, in this case the `dist` folder

## Permissions
This extension will require to the browser these set of permissions:

- `activeTab`: used for checking the current navigation URL on the current tab and if it matches the `https://github.com/*` pattern
- `tabs`: used for checking the current navigation URL on different tabs and if it matches the `https://github.com/*` pattern
- `storage`: used for storing in the `sync` and `local` storage data
- `background`: used for running in background a `service_worker` that will manage all the background operations, such as: checking current url, set initial state, ...
- `scripting`: used for adding scripts functionalities to the extension
- `notifications`: used for sending in-browser notifications

No action is required by the user to allow or enable these permissions, the browser will manage those automatically.

## Local storage
The local storage will be used to store this information:

- `currentUrl`: the current url you are navigating on, only if it matches the `https://github.com/*` pattern
- `pat`: the user personal access token
- `user`: user object with the information retrieved from `GET https://api.github.com/user`

## Sync storage
The sync storage will be used to store this information:

- `snoozeList`: the list of all the snooze the user planned
- `badgeCounter`: the number of notifications (expired snoozes) available
