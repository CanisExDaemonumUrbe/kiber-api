class SheduleController{

    async #checkDigit(digit){
        const reg = new RegExp(`^[0-9]+$`);
        return reg.test(digit);
    }

    async getData(groupId){

        if(!await this.#checkDigit(groupId)){
            return null;
        }

        let req = `SELECT * FROM schedule WHERE group_id  = ${groupId} AND date < CURDATE() ORDER BY id DESC LIMIT 1;`;

        return req;

    }

}

module.exports = SheduleController;