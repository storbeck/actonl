require('dotenv').config()
require('log-timestamp')
const http = require('http')
const API = require('call-of-duty-api')();
const { print, html } = require('./utilities/output');
const { sort_identities } = require('./utilities/process');

let data;
let sorted;

// Login on server start
(async () => {
    try {
        await API.login(process.env.ACTIVISION_USERNAME, process.env.ACTIVISION_PASSWORD);

        console.log('Logged in to API')
    } catch(error) {
        console.error(error)
    }
})()

const requestListener = async (req, res) => {
    // Ignore fancy things such as a favicon
    if (req.url === '/favicon.ico') return;


    // Pull new feed on refresh
    data = await API.getEventFeed();
    

    // Process our data
    sorted = sort_identities(data.identities)
    console.log(`Received event feed -- ${sorted.online.length} ↑  ||  ${sorted.offline.length} ↓`);

    // Write to web server
    res.writeHead(200)
    res.end(print(sorted, res))
}

const server = http.createServer(requestListener)
server.listen(process.env.PORT || 8080)