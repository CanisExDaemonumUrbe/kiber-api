class PreparedCity{

    constructor(RawCity){

        if (RawCity){
            this.id = (!RawCity.id) ? null : RawCity.id;
            this.title = (!RawCity.title) ? '' : RawCity.title;
            this.admin_id = (!RawCity.admin_id) ? -1 : RawCity.admin_id;
            this.phone = (!RawCity.phone) ? '' : RawCity.phone;
            this.email = (!RawCity.email) ? '' : RawCity.email;
            this.whatsapp = (!RawCity.whatsapp) ? '' : RawCity.whatsapp;
            this.payment = (!RawCity.payment) ? '' : RawCity.payment;
            this.bonus_lesson = (!RawCity.bonus_lesson) ? 0 : RawCity.bonus_lesson;
            this.bonus_adv = (!RawCity.bonus_adv) ? 0 : RawCity.bonus_adv;
            this.kiberon_change_message = (!RawCity.kiberon_change_message) ? '' : RawCity.kiberon_change_message;
            this.praise_link = (!RawCity.praise_link) ? '' : RawCity.praise_link;
        }
        
    }

}

module.exports = PreparedCity;