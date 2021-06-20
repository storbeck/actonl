require('dotenv').config()
const API = require('call-of-duty-api')();
const { print } = require('./utilities/output');
const { sort_identities } = require('./utilities/process');

(async () => {
    try {
        await API.login(process.env.ACTIVISION_USERNAME, process.env.ACTIVISION_PASSWORD);
        const data = await API.getEventFeed();
        const sorted = sort_identities(data.identities)
        
        print(sorted)
    } catch(error) {
        console.error(error)
    }
})()