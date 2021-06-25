require('dotenv').config()
require('log-timestamp')
const http = require('http')
const API = require('call-of-duty-api')();
const { print, html } = require('./utilities/output');
const { sort_identities } = require('./utilities/process');

let data;
let sorted;

const getData = async() => {
    data = await API.getEventFeed();
    return sort_identities(data.identities)
}

const requestListener = async (req, res) => {
    // Ignore fancy things such as a favicon
    if (req.url === '/favicon.ico') return;


    // Process our data
    sorted = await getData()
    console.log(`Received event feed -- ${sorted.online.length} ↑  ||  ${sorted.offline.length} ↓`);

    // Write to web server
    res.writeHead(200)
    res.end(print(sorted, res))
}

// Login on server start
(async () => {
    try {
        await API.login(process.env.ACTIVISION_USERNAME, process.env.ACTIVISION_PASSWORD);

	if (process.argv[2] === '--server') {
            console.log('Logged in to API')
	    const server = http.createServer(requestListener)
	    server.listen(process.env.PORT || 8080)
	} else {
	    print(await getData()) 
	}

    } catch(error) {
        console.error(error)
    }
})()

