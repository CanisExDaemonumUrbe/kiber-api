class RawUser{

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

    //Найти способ упростить процесс создания модели

    constructor(data){

        //Шаблон пользователя с исходными параметрами

        if(data){

            this.id = (!data.id) ? null : data.id;
            this.guser_id = (!data.guser_id) ? 2 : data.guser_id;
            this.status = (!data.status) ? 0 : data.status;
            this.trade_group = (!data.trade_group) ? 1 : data.trade_group;
            this.fio = (!data.fio) ? '' : data.fio;
            this.fio_lastname = (!data.fio_lastname) ? '' : data.fio_lastname;
            this.nik = (!data.nik) ? '' : data.nik;
            this.address = (!data.address) ? '' : data.address;
            this.login = (!data.login) ? '' : data.login;
            this.password = (!data.password) ? '' : data.password;
            this.confirm = (!data.confirm) ? '' : data.confirm;
            this.telephone = (!data.telephone) ? '' : data.telephone;
            this.email = (!data.email) ? '' : data.email;
            this.city = (!data.city) ? '' : data.city;
            this.image = (!data.image) ? '' : data.image;
            this.signature = (!data.signature) ? '' : data.signature;
            this.bbcode_signature = (!data.bbcode_signature) ? '' : data.bbcode_signature;
            this.subscribe = (!data.subscribe) ? 0 : data.subscribe;
            this.smsalert = (!data.smsalert) ? 0 : data.smsalert;
            this.emailalert = (!data.emailalert) ? 0 : data.emailalert;
            this.secretq = (!data.secretq) ? '' : data.secretq;
            this.secreta = (!data.secreta) ? '' : data.secreta;
            this.dateregistered = (!data.dateregistered) ? this.#formatDate(new Date(), 'full') : this.#formatDate(data.dateregistered, 'full');
            this.dateedited = (!data.dateedited) ? this.#formatDate(new Date(), 'full') : this.#formatDate(data.dateedited, 'full');
            this.userinfo = (!data.userinfo) ? '' : data.userinfo;
            this.registeredusersonlyaccess = (!data.registeredusersonlyaccess) ? 0 : data.registeredusersonlyaccess;
            this.personal_discount = (!data.personal_discount) ? 0.0 : data.personal_discount;
            this.user_type = (!data.user_type) ? 0 : data.user_type;
            this.city_id = (!data.city_id) ? 0 : data.city_id;
            this.start_learning = (!data.start_learning) ? this.#formatDate(new Date(), 'short') : this.#formatDate(data.start_learning, 'short');
            this.date_pay = (!data.date_pay) ? this.#formatDate(new Date(), 'short') : this.#formatDate(data.date_pay, 'short');
            this.parents_name = (!data.parents_name) ? '' : data.parents_name;
            this.parents_phone = (!data.parents_phone) ? '' : data.parents_phone;
            this.portfolio = (!data.portfolio) ? '' : data.portfolio;
            this.group_id = (!data.group_id) ? 0 : data.group_id;
            this.add_pay_date_type = (!data.add_pay_date_type) ? '' : data.add_pay_date_type;
            this.birthday = (!data.birthday) ? this.#formatDate(new Date(), 'short') : this.#formatDate(data.birthday, 'short');
            this.balance = (!data.balance) ? 0 : data.balance;
            this.balance_start = (!data.balance_start) ? 0 : data.balance_start;
            this.telephone_bak = (!data.telephone_bak) ? '' : data.telephone_bak;
            this.parents_phone_bak = (!data.parents_phone_bak) ? '' : data.parents_phone_bak;
        } else {
            this.id = null;
            this.guser_id = 2;
            this.status = 0;
            this.trade_group = 1;
            this.fio = '';
            this.fio_lastname = '';
            this.nik = '';
            this.address = '';
            this.login = '';
            this.password = '';
            this.confirm = '';
            this.telephone = '';
            this.email = '';
            this.city = '';
            this.image = '';
            this.signature = '';
            this.bbcode_signature = '';
            this.subscribe = 0;
            this.smsalert = 0;
            this.emailalert = 0;
            this.secretq = '';
            this.secreta = '';
            this.dateregistered = this.#formatDate(new Date(), 'full');
            this.dateedited = this.#formatDate(new Date(), 'full');
            this.userinfo = '';
            this.registeredusersonlyaccess = 0;
            this.personal_discount = 0.0;
            this.user_type = 0;
            this.city_id = 0;
            this.start_learning = this.#formatDate(new Date(), 'short');
            this.date_pay = this.#formatDate(new Date(), 'short');
            this.parents_name = '';
            this.parents_phone = '';
            this.portfolio = '';
            this.group_id = 0;
            this.add_pay_date_type = '';
            this.birthday = this.#formatDate(new Date(), 'short');
            this.balance = 0;
            this.balance_start = 0;
            this.telephone_bak = '';
            this.parents_phone_bak = '';
        }

        
    }

}

module.exports = RawUser;