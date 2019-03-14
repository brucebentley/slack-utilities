# Delete Slack Messages

Deletes Slack public & private channel and chat messages.

## Locating The `CHANNEL_ID` —

> *nbsp;
> **Please Note:**  
> The `CHANNEL_ID` is a hashed value that maps to the vanity name of each channel or user that you see inside the application.  
> &nbsp;  
> Be sure to store the `CHANNEL_ID` value somewhere. We're going to pass it in as a parameter when we run our script.  
> *nbsp;

-   Open a web browser & navigate to your Slack Workspace.
    -   **For Example:** `https://yourworkspace.slack.com/`
-   Select the channel or chat message from the left-sidebar.
-   The `CHANNEL_ID` hash can be found in the URL for each individual channel or chat message.
    -   **For Example:** `https://yourworkspace.slack.com/messages/CHANNEL_ID/`

## Running The Script —

```js
$ WORKSPACE=DEFAULT node delete-slack-messages.js <CHANNEL_ID>
$ WORKSPACE=PERSONAL node delete-slack-messages.js <CHANNEL_ID>
$ WORKSPACE=GOCANVAS node delete-slack-messages.js <CHANNEL_ID>
```

## Copyright & License

Copyright &copy; 2019 [Bruce Bentley](https://brucebentley/.io) under the [MIT License](https://github.com/brucebentley/slack-utilities/blob/master/LICENSE).
