class RawLog{

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

    constructor(data) {

        if(data){

            this.id = (!data.id) ? null : data.id;
            this.guser_id = (!data.guser_id) ? 2 : data.guser_id;
            this.shedule_id = (!data.shedule_id) ? 0 : data.shedule_id;
            this.admin_id = (!data.admin_id) ? -1 : data.admin_id;
            this.date = (!data.date) ? this.#formatDate(new Date(), 'full') : this.#formatDate(data.date, 'full') ;
            this.sign = (!data.sign) ? -1 : data.sign;
            this.amount = (!data.amount) ? 0 : data.amount;
            this.balance = (!data.balance) ? 0 : data.balance;
            this.comment = (!data.comment) ? '' : data.comment;


        } else {
            this.id = null;
            this.guser_id = 2;
            this.shedule_id = 0;
            this.admin_id = -1;
            this.date = this.#formatDate(new Date(), 'full');
            this.sign = -1;
            this.amount = 0;
            this.balance = 0;
            this.comment = "";
        }
    }

}

module.exports = RawLog;