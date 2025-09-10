const JResidentProfile = require(`./models/profile/JResidentProfile`);

class Mapper{

    async createJResidentProfile(user, group, location, shedule, module, city){
        let result = [];

        let profile = new JResidentProfile(user, group, location, shedule, module, city);
        result.push(profile);

        return result;

    }

}

module.exports = Mapper;