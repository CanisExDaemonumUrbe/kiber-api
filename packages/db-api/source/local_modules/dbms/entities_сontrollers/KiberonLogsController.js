class KiberonLogsController {

    async #checkDigit(digit){
        const reg = new RegExp(`^[0-9]+$`);
        return reg.test(digit);
    }

    async getData(userId){
        
        if(!await this.#checkDigit(userId)){
            return null;
        }

        let request = `SELECT * FROM kiberon_log WHERE \`user_id\`=${userId}`;
        return request;

    }

}

module.exports = KiberonLogsController;