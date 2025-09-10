class UserController{

    async #checkDigit(digit){
        const reg = new RegExp(`^[0-9]+$`);
        return reg.test(digit);
    }

    async changePassword(userId, password){

        if(!await this.#checkDigit(userId) || !password){
            return null;
        }

        let request = `UPDATE users SET password = '${password}' WHERE id = ${userId};`;

        return request;

    }

    async authorization(login, hash){

        let reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

        let requestPart;
        
        if(reg.test(login)){
            requestPart = `\`telephone\` = \'${login}\'`;
        } else {
            requestPart = `\`login\` = \'${login}\'`;
        }

        let request = `SELECT \`id\`,\`password\` FROM \`users\` WHERE ${requestPart} LIMIT 1`;
        //let request = `SELECT \`id\` FROM \`users\` WHERE ${requestPart} LIMIT 1`;
        return request;
    }

    async getData(userId){
        
        if(!await this.#checkDigit(userId)){
            return null;
        }

        let request = `SELECT * FROM users WHERE \`id\`=${userId}`;
        return request;

    }
    
}
module.exports = UserController;