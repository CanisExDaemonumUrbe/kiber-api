class GroupController{

    async #checkDigit(digit){
        const reg = new RegExp(`^[0-9]+$`);
        return reg.test(digit);
    }

    async getData(groupId){


        if(!await this.#checkDigit(groupId)){
            return null;
        }

        let request = `SELECT * FROM groups WHERE id = ${groupId};`;
        return request;

    }

}

module.exports = GroupController;