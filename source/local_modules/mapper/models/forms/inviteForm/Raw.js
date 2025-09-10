class RawInviteForm {

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

        this.id = (!data.id) ? null : data.id;
        this.guser_id = (!data.guser_id) ? 2 : data.guser_id;
        this.user_id = (!data.user_id) ? null : data.user_id;
        this.to_email = (!data.to_email) ? "noemail@example.ru" : data.to_email;
        this.to_name = (!data.to_name) ? "" : data.to_name;
        this.date = (!data.date) ? this.#formatDate(new Date(), 'short') : data.date; 

    }

}

module.exports = RawInviteForm;