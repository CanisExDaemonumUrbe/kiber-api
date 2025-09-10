class RawFeedbackForm{

    #stats = `<b>Переходы за сегодня:</b><br/><br><b>Переходов по сайту за сегодня: 0</b><br>`;

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

    #createFieldMessage(feedbackid, email, userName, userPhone, message){

        let result;

        try {
            
            let counter = feedbackid % 10;
            switch (counter){
                case 3:
                    result = `a:2:{s:3:"1_2";a:5:{s:5:"title";s:15:"Ваше Имя";s:5:"value";s:${userName.length*2}:"${userName}";s:8:"required";b:1;s:4:"type";s:4:"text";s:13:"fieldTypeElem";N;}s:3:"1_3";a:5:{s:5:"title";s:14:"Телефон";s:5:"value";s:${userPhone.length}:"${userPhone}";s:8:"required";b:1;s:4:"type";s:4:"text";s:13:"fieldTypeElem";N;}}`;
                    break;
                case 4:
                    result = `a:4:{s:3:"1_2";a:5:{s:5:"title";s:15:"Ваше Имя";s:5:"value";s:${userName.length*2}:"${userName}";s:8:"required";b:1;s:4:"type";s:4:"text";s:13:"fieldTypeElem";N;}s:3:"1_3";a:5:{s:5:"title";s:14:"Телефон";s:5:"value";s:${userPhone.length}:"${userPhone}";b:1;s:4:"type";s:4:"text";s:13:"fieldTypeElem";N;}s:3:"1_4";a:5:{s:5:"title";s:6:"E-mail";s:5:"value";s:${email.length}:"${email}";s:8:"required";b:0;s:4:"type";s:5:"email";s:13:"fieldTypeElem";N;}s:3:"1_5";a:5:{s:5:"title";s:29:"Текст сообщения";s:5:"value";s:${message.length*2}:"${message}";s:8:"required";b:1;s:4:"type";s:8:"textarea";s:13:"fieldTypeElem";N;}}`;
                    break;
                case 5:
                    result = `a:4:{s:3:"1_2";a:5:{s:5:"title";s:15:"Ваше Имя";s:5:"value";s:${userName.length*2}:"${userName}";s:8:"required";b:1;s:4:"type";s:4:"text";s:13:"fieldTypeElem";N;}s:3:"1_3";a:5:{s:5:"title";s:14:"Телефон";s:5:"value";s:${userPhone.length}:"${userPhone}";b:1;s:4:"type";s:4:"text";s:13:"fieldTypeElem";N;}s:3:"1_4";a:5:{s:5:"title";s:6:"E-mail";s:5:"value";s:${email.length}:"${email}";s:8:"required";b:0;s:4:"type";s:5:"email";s:13:"fieldTypeElem";N;}s:3:"1_5";a:5:{s:5:"title";s:29:"Текст сообщения";s:5:"value";s:${message.length*2}:"${message}";s:8:"required";b:1;s:4:"type";s:8:"textarea";s:13:"fieldTypeElem";N;}}`;
                    break;
            }
            
            return result;

        } catch (err){

            result = `a:4:{s:3:"1_2";a:5:{s:5:"title";s:15:"Ваше Имя";s:5:"value";s:${err.name.length}:"${err.name}";s:8:"required";b:1;s:4:"type";s:4:"text";s:13:"fieldTypeElem";N;}s:3:"1_3";a:5:{s:5:"title";s:14:"Телефон";s:5:"value";s:12:"+77777777777";s:8:"required";b:1;s:4:"type";s:4:"text";s:13:"fieldTypeElem";N;}s:3:"1_4";a:5:{s:5:"title";s:6:"E-mail";s:5:"value";s:13:"form@error.ru";s:8:"required";b:0;s:4:"type";s:5:"email";s:13:"fieldTypeElem";N;}s:3:"1_5";a:5:{s:5:"title";s:29:"Текст сообщения";s:5:"value";s:${err.message.length}:"${err.message}";s:8:"required";b:1;s:4:"type";s:8:"textarea";s:13:"fieldTypeElem";N;}}`;

        } finally {
            return result;
        }
    }

    constructor(data){
        this.id = (!data.id) ? null : data.id;
        this.guser_id = (!data.guser_id) ? 2 : data.guser_id;
        this.feedbackid = (!data.feedbackid) ? 21705 : data.feedbackid;
        this.ip = (!data.ip) ? "" : data.ip;
        this.fio = (!data.fio) ? "" : data.fio;
        this.email = (!data.email) ? "" : data.email;
        this.telephone = (!data.telephone) ? "" : data.telephone;
        this.organization = (!data.organization) ? "" : data.organization;
        this.post = (!data.post) ? "" : data.post;
        this.address = (!data.address) ? "" : data.address;
        this.city = (!data.city) ? "" : data.city;
        this.text = (!data.text) ? "" : data.text;
        this.comment = (!data.comment) ? "" : data.comment;
        this.dateposted = (!data.dateposted) ? this.#formatDate(new Date(), 'short') : data.dateposted;
        this.dateedited = (!data.dateedited) ? this.#formatDate(new Date(), 'short') : data.dateedited;
        this.datecreated = (!data.datecreated) ? this.#formatDate(new Date(), 'full') : data.datecreated;
        this.status = (!data.status) ? 1 : data.status;
        this.new = (!data.new) ? 1 : data.new;
        this.field_message = this.#createFieldMessage(data.feedbackid, data.email, data.user_name, data.user_phone, data.field_message);
        this.referer = (!data.referer) ? "" : data.referer;
        this.stats = (!data.stats) ? this.#stats : data.stats;
        this.is_deleted = (!data.is_deleted) ? 0 : data.is_deleted;
    }

}

module.exports = RawFeedbackForm;