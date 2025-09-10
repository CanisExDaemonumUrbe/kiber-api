class LocationController{

    async #checkDigit(digit){
        const reg = new RegExp(`^[0-9]+$`);
        return reg.test(digit);
    }

    async getData(locationId){

        if(!await this.#checkDigit(locationId)){
            return null;
        }

        let request = `SELECT * FROM dictionary_locations WHERE id = ${locationId};`;

        return request;

    }

}

module.exports = LocationController;