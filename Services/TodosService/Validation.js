function validateIds(ids) {
    const regex = /[0-9a-f]{24}/;
    let check = true;

    ids.forEach(id => {
        if (!(regex.test(id))) {
            check = false;
            return false;
        }
    });

    return check;
}

function validateCompletedQuery(completed) {
    let check = true;
    if (completed && completed !== '1'){
        check = false;
    }

    return check;
}

module.exports.validateIds = validateIds;
module.exports.validateCompletedQuery = validateCompletedQuery;
