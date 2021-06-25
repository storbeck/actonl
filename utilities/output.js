let output = 'log';

const log = (line) => {
    if (output === 'log') {
        console.log(line)
    } else {
        output.write(line + '\n')
    }
}
const print_header = (label, cur, total) => {
    log('===================================')
    log(`${label} (${cur}/${total})`)
    log('===================================')
}

const print_list = (users) => {
    users.forEach(u => {
        // Remove #activision_id after username
        log(u.username.replace(/#.*/,''))
    })
}

const print_divider = () => {
    log('')
    log('')
}
const print_online = (online, total) => {
    print_header('online', online.length, total)
    print_list(online)
}

const print_offline = (offline, total) => {
    print_header('offline', offline.length, total)
    print_list(offline)
}

const print = (users, res=false) => {
    if (res) output=res;

    const total = users.online.length + users.offline.length;
    
    print_online(users.online, total)
    print_divider()
    print_offline(users.offline, total)
}

module.exports = {
    print
}
