# Delete Slack Messages Using Node.js

Deletes Slack public & private channel and chat messages.

## Download The Script & Resources —

```sh
$ wget https://gist.githubusercontent.com/brucebentley/538bd8f4516261d53857096fa8189528/raw/f24d65ab8bd57396318712e046da37f9e5e577fa/delete-channel-messages.js
```

## Configure Each `.env` —

Copy the provided `.env-sample` file and rename it to match each of your Slack Workspaces.
```sh
$ cp config/.env-sample config/{personal,work}.env
```

## Locate The `CHANNEL_ID` —

> *nbsp;
> **Please Note:**  
> The `CHANNEL_ID` is a hashed value that maps to the vanity name of each channel or user that you see inside the application.  
> &nbsp;  
> Be sure to store the `CHANNEL_ID` value somewhere. We're going to pass it in as a parameter when we run our script.  
> *nbsp;

- Open a web browser & navigate to your Slack Workspace.
  - **For Example:** `https://yourworkspace.slack.com/`
- Select the channel or chat message from the left-sidebar.
- The `CHANNEL_ID` hash can be found in the URL for each individual channel or chat message.
  - **For Example:** `https://yourworkspace.slack.com/messages/CHANNEL_ID/`

## Run The Script —

```js
$ WORKSPACE=personal node delete-slack-messages.js <CHANNEL_ID>
$ WORKSPACE=gocanvas node delete-slack-messages.js <CHANNEL_ID>
```
