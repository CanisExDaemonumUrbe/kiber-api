class ModuleController{

    async #checkDigit(digit){
        const reg = new RegExp(`^[0-9]+$`);
        return reg.test(digit);
    }

    async getData(moduleId){

        if(!await this.#checkDigit(moduleId)){
            return null;
        }

        let request = `SELECT * FROM dictionary_module WHERE id = ${moduleId};`;

        return request;

    }

}

module.exports = ModuleController;