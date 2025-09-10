class RawCity{

    #formatDate(stringDate, type) {

        let date = new Date(stringDate);

        try{
            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
      
            let mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
      
            let yyyy = date.getFullYear();
        
            let result = yyyy + '-' + mm + '-' + dd;

            if(type !== 'full'){
                return result;
            }

            let hh = date.getHours();
            if (hh < 10) hh = '0' + hh;
            result = result + ' ' + hh;

            let min = date.getMinutes();
            if (min < 10) min = '0' + min;
            result = result + ':' + min;

            let sec = date.getSeconds();
            if (sec < 10) sec = '0' + sec;
            result = result + ':' + sec;

            return result;

        } catch {

            return '0000-00-00';

        }

    }

    constructor(data){

        if(data){

            this.id = (!data.id) ? null : data.id;
            this.guser_id = (!data.guser_id) ? 2 : data.guser_id;
            this.title = (!data.title) ? '' : data.title;
            this.admin_id = (!data.admin_id) ? -1 : data.admin_id;
            this.sort_id = (!data.sort_id) ? -1 : data.sort_id;
            this.dateedited = (!data.dateedited) ? this.#formatDate(new Date(), 'full') : this.#formatDate(data.dateedited, 'full');
            this.datecreated = (!data.datecreated) ? this.#formatDate(new Date(), 'full') : this.#formatDate(data.datecreated, 'full');
            this.phone = (!data.phone) ? '' : data.phone;
            this.email = (!data.email) ? '' : data.email;
            this.whatsapp = (!data.whatsapp) ? '' : data.whatsapp;
            this.payment = (!data.payment) ? '' : data.payment;
            this.ads = (!data.ads) ? '' : data.ads;
            this.bonus_lesson = (!data.bonus_lesson) ? 0 : data.bonus_lesson;
            this.bonus_adv = (!data.bonus_adv) ? 0 : data.bonus_adv;
            this.kiberon_change_message = (!data.kiberon_change_message) ? '' : data.kiberon_change_message;
            this.praise_link = (!data.praise_link) ? '' : data.praise_link;

        } else {

            this.id = null;
            this.guser_id = 2;
            this.title = '';
            this.admin_id = -1;
            this.sort_id = -1;
            this.dateedited = this.#formatDate(new Date(), 'full');
            this.datecreated = this.#formatDate(new Date(), 'full');
            this.phone = '';
            this.email = '';
            this.whatsapp = '';
            this.payment = '';
            this.ads = '';
            this.bonus_lesson = 0;
            this.bonus_adv = 0;
            this.kiberon_change_message = '';
            this.praise_link = '';

        }

    }

}

module.exports = RawCity;