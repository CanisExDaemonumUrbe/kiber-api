class JResidentProfile{

    constructor(user, group, location, shedule, module, city) {

        this.residentId = (user && user.id) ? user.id : null;
        this.residentImage = (user && user.image) ? user.image : null;
        this.residentFIO = (user && user.fio) ? user.fio : null;
        this.residentKiberoneBalance = (user && user.balance) ? user.balance : null;
        this.residentPayDay = (user && user.date_pay) ? user.date_pay : null;
        this.residentBirthday = (user && user.birthday) ? user.birthday : null;
        this.residentPhoneNumber = (user && user.telephone) ? user.telephone : null;
        this.residentEmail = (user && user.email) ? user.email : null;
        this.residentStartLearning = (user && user.start_learning) ? user.start_learning : null;
        this.residentParentsName = (user && user.parents_name) ? user.parents_name : null;
        this.residentParentsPhone = (user && user.parents_phone) ? user.parents_phone : null;

        this.residentPorfolioLink = (user && user.portfolio) ? user.portfolio : null;

        this.groupId = (group && group.id) ? group.id : null;
        this.groupName = (group && group.title) ? group.title : null;

        this.locationId = (location && location.id) ? location.id : null;
        this.locationName = (location && location.title) ? location.title : null;

        this.sheduleCurrentLesson = (shedule && shedule.lesson) ? shedule.lesson : null;

        this.moduleId = (module && module.id) ? module.id : null;
        this.moduleName = (module && module.title) ? module.title : null;
        this.moduleImage = (module && module.image) ? module.image : null;
        this.moduleVideo = (module && module.video) ? module.video : null;
        this.moduleCountLesson = (module && module.count_lesson) ? module.count_lesson : null;
        
        this.cityId = (city && city.id) ? city.id : null;
        this.cityName = (city && city.title) ? city.title : null;
        this.cityManagerPhone = (city && city.phone) ? city.phone : null;
        this.cityManagerEmail = (city && city.email) ? city.email : null;
        this.cityPaymentLink = (city && city.payment) ? city.payment : null;
        this.cityKiberonChangeMessage = (city && city.kiberon_change_message) ? city.kiberon_change_message : null;

    }

}

module.exports = JResidentProfile;