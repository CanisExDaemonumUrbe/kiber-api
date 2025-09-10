class KibershopController{

    async #checkDigit(digit){
        const reg = new RegExp(`^[0-9]+$`);
        return reg.test(digit);
    }

    async getData(cityId){
        
        if(!await this.#checkDigit(cityId)){
            return null;
        }

        let request = `SELECT * FROM city_products WHERE \`city_id\`=${cityId}`;
        return request;

    }

}

module.exports = KibershopController;