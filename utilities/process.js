const sort_identities = (identities) => {
    const sorted = { online: [], offline: [] }

    identities.forEach(identity => {
        if (identity.status.online) {
            sorted.online.push(identity)
        } else {
            sorted.offline.push(identity)
        }
    })

    return sorted;
};

module.exports = {
    sort_identities
}