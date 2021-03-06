const util = require('util');
const fs = require('fs');
const { google } = require('googleapis');
require('dotenv').config()

const dispenseTreats = require('./treats/dispense');

const writeFilePromise = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);

const save = async (path, str) => {
    await writeFilePromise(path, str);
    console.log('Successfully Saved');
};

const read = async path => {
    const fileContents = await readFilePromise(path);
    return JSON.parse(fileContents);
};

const youtube = google.youtube('v3');
const OAuth2 = google.auth.OAuth2;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const redirectURI = 'http://localhost:3000/callback'
// Permissions needed to view and submit live chat comments
const scope = [
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/youtube.force-ssl'
];
const auth = new OAuth2(clientId, clientSecret, redirectURI);

let liveChatId; // Where we'll store the id of our liveChat
let nextPage; // How we'll keep track of pagination for chat messages
const intervalTime = 5000; // Miliseconds between requests to check chat messages
let interval; // variable to store and control the interval that will check messages

const youtubeService = {};

youtubeService.getCode = response => {
    const authUrl = auth.generateAuthUrl({
        access_type: 'offline',
        scope
    });
    response.redirect(authUrl);
};

// Request access from tokens using code from login
youtubeService.getTokensWithCode = async code => {
    const credentials = await auth.getToken(code);
    youtubeService.authorize(credentials);
};

// Storing access tokens received from google in auth object
youtubeService.authorize = ({ tokens }) => {
    auth.setCredentials(tokens);
    console.log('Successfully set credentials');
    console.log('tokens:', tokens);
    save('./tokens.json', JSON.stringify(tokens));
};

youtubeService.findActiveChat = async () => {
    const response = await youtube.liveBroadcasts.list({
        auth,
        part: 'snippet',
        broadcastStatus: 'active',
    });
    const latestChat = response.data.items[0];
    console.log(JSON.stringify(response.data, null, 2));
    liveChatId = latestChat.snippet.liveChatId;
    console.log('Chat ID Found:', liveChatId)
};

const getChatMessages = async () => {
    const response = await youtube.liveChatMessages.list({
        auth,
        part: 'snippet',
        liveChatId,
        pageToken: nextPage
    });
    const { data } = response;
    nextPage = data.nextPageToken;

    const newMessages = data.items.map(({ snippet }) => snippet.textMessageDetails.messageText)
    console.log(newMessages);

    const treatCommandFound = newMessages.some(message => /\/treats/.test(message))
    console.log({ treatCommandFound });

    if (treatCommandFound) {
        dispenseTreats()
        youtubeService.insertMessage("Treats coming soon!")
    }
};

youtubeService.startTrackingChat = () => {
    interval = setInterval(getChatMessages, intervalTime);
};

youtubeService.stopTrackingChat = () => {
    clearInterval(interval);
};

youtubeService.insertMessage = messageText => {
    youtube.liveChatMessages.insert(
        {
            auth,
            part: 'snippet',
            resource: {
                snippet: {
                    type: 'textMessageEvent',
                    liveChatId,
                    textMessageDetails: {
                        messageText
                    }
                }
            }
        },
        () => { }
    );
}

// Update the tokens automatically when they expire
auth.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
        // store the refresh_token in my database!
        save('./tokens.json', JSON.stringify(auth.tokens));
        console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
});

// Read tokens from stored file
const checkTokens = async () => {
    const tokens = await read('./tokens.json');
    if (tokens) {
        auth.setCredentials(tokens);
        console.log('tokens set');
    } else {
        console.log('no tokens set');
    }
};

(async () => {

    // Check tokens as soon as server is started
    await checkTokens();
    await youtubeService.findActiveChat();
    youtubeService.startTrackingChat();

})()

module.exports = youtubeService;
