[![Continuous Integration](https://github.com/nearform/github-snooze-chrome-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/nearform/github-snooze-chrome-extension/actions/workflows/ci.yml)
[![Chrome Web Store Automation](https://github.com/nearform/github-snooze-chrome-extension/actions/workflows/chrome-web-store-automation.yml/badge.svg)](https://github.com/nearform/github-snooze-chrome-extension/actions/workflows/chrome-web-store-automation.yml)

# Github Snooze Chrome Extension

This Chrome Extension adds a Snooze feature to GitHub issues and pull requests.

## How it works

This extension allows to "snooze" GitHub issues and pull requests so that you get notified after a certain time if there is no activity on the issue or pull request.

This is useful for example if:

- you opened an issue and you're waiting for feedback on it
- you opened a pull request and you're waiting for a review
- you replied to an issue or pull request and you're waiting for somebody to reply

## Installation

The [GitHub Snooze Extension](https://chrome.google.com/webstore/detail/github-snooze/pphnmnebnblgfepdjefofceimacpkcni) is available in the Chrome Web Store. You can install it as a regular extension.

## Setup

You will need to generate a GitHub Personal Access Token (PAT)
This can be done by generating either a [Fine-grained PAT](https://github.com/settings/personal-access-tokens/new) or a [Classic PAT](https://github.com/settings/tokens/new). 

#### Generating a Fine-grained PAT
You will need to:
- [open the Fine-grained PAT generation page](https://github.com/settings/personal-access-tokens/new)
- in the `Repository access` section, select `All repositories`
- set `Read-only` permission to the following `Repository permissions`:
    - `Issues`
    - `Pull requests`
    - `Metadata` (should be set automatically when you set it for `Issues` or `Pull requests`)
    - `Discussions` - currently not available with fine-grained PATs

#### Generating a Classic PAT
You will need to:
- [open the Classic PAT generation page](https://github.com/settings/tokens/new)
- select the following scopes:
    - `repo`: used for getting the repository information, such as last update date time on issues and pull requests
    - `read:user`: used for retrieving the current logged in user information _(GitHub ID and username)_
    - `write:discussions`: used to have access to the discussions API


## Security

### Permissions

This extension will require this set of permissions:

- `tabs`: used for checking the current navigation URL on different tabs and if it matches the `https://github.com/*` pattern
- `alarms`: used for periodic checks for the updates on a PR / issue
- `storage`: used for storing in the `sync` and `local` storage data
- `background`: used for running in background a `service_worker` that will manage all the background operations, such as: checking current url, set initial state, ...
- `notifications`: used for sending in-browser notifications

No action is required by the user to allow or enable these permissions, the browser will manage those automatically.

### Local storage

The local storage will be used to store this information:

- `currentUrl`: the current url you are navigating on, only if it matches the `https://github.com/*` pattern
- `pat`: the user personal access token
- `user`: user object with the information retrieved from `GET https://api.github.com/user`

## Sync storage

The sync storage will be used to store this information:

- `snoozeList`: the list of all the snooze the user planned
- `badgeCounter`: the number of notifications (expired snoozes) available

## Advanced usage

### Storybook

A hosted Storybook is running [here](https://nearform.github.io/github-snooze-chrome-extension).

### Using the unpacked extension

In order to use this extension locally from a compressed archive:

- Download the release artifact with the distribution files, the `dist.zip` and extract it.
- Open the **Extension Management** page by navigating to: `chrome://extensions`
- Enable Developer Mode by clicking the toggle switch next to **Developer mode**
- Click the **Load unpacked** button and select the extension directory, in this case the previously extracted folder

## Development

In order to use this extension during the development:

- Run `npm start` in the project root, this command will generate the `dist` folder and will run the extension in `watch` mode
- Open the **Extension Management** page by navigating to: `chrome://extensions`
- Enable Developer Mode by clicking the toggle switch next to **Developer mode**
- Click the **Load unpacked** button and select the extension directory, in this case the `dist` folder

### Chrome Store listing

The extension is published automatically to the Chrome Store whenever a new release is made in the repository.

To publish a new release, use the standard release workflow from the Actions tab of the repository.

### Screenshots

Screenshots to be included in the store listing can be generated with storycap running the command `npm run storycap`.

It uses Storybook to generate stories for the screenshots.
