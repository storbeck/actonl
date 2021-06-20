const print_header = (label, cur, total) => {
    console.log('===================================')
    console.log(`${label} (${cur}/${total})`)
    console.log('===================================')
}

const print_list = (users) => {
    users.forEach(u => {
        // Remove #activision_id after username
        console.log(u.username.replace(/#.*/,''))
    })
}

const print_divider = () => {
    console.log('')
    console.log('')
}
const print_online = (online, total) => {
    print_header('online', online.length, total)
    print_list(online)
}

const print_offline = (offline, total) => {
    print_header('offline', offline.length, total)
    print_list(offline)
}

const print = (users) => {
    const total = users.online.length + users.offline.length;
    
    print_online(users.online, total)
    print_divider()
    print_offline(users.offline, total)
}

module.exports = {
    print
}