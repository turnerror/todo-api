class BodyValidation {

    validateIds(ids) {
        const regex = /[0-9a-f]{24}/;
        let check = true;

        ids.forEach(id => {
            if (!(regex.test(id))){
                check = false;
                return false;
            }
        });

        return check;
    }
}

module.exports = BodyValidation;