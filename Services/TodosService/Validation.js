function validateId(id) {
    const regex = /[0-9a-f]{24}/;
    let check = true;

    if (!(regex.test(id))) {
        check = false;
        return false;
    }

    return check;
}

function validateCompletedQuery(completed) {
    let check = true;
    if (completed && completed !== '1'){
        check = false;
    }

    return check;
}

module.exports.validateId = validateId;
module.exports.validateCompletedQuery = validateCompletedQuery;
