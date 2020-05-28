const ObjectId = require('mongodb').ObjectId;

function idsToObjectIds(ids){
    return ids.map(id => ObjectId(id));
}

module.exports.idsToObjectIds = idsToObjectIds;
