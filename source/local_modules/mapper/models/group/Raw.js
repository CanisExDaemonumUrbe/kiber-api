class RawGroup{

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
            this.city_id = (!data.city_id) ? null : data.city_id;
            this.title = (!data.title) ? `` : data.title;
            this.age_id = (!data.age_id) ? null : data.age_id;
            this.location_id = (!data.location_id) ? null : data.location_id;
            this.year = (!data.year) ? 0 : data.year;
            this.day_num = (!data.day_num) ? 0 : data.day_num;
            this.time_id = (!data.time_id) ? null : data.time_id;
            this.assistant_id = (!data.assistant_id) ? null : data.assistant_id;
            this.sort_id = (!data.sort_id) ? null : data.sort_id;
            this.active = (!data.active) ? 0 : data.active;
            this.dateedited = (!data.dateedited) ? this.#formatDate(new Date(), `long`) : this.#formatDate(data.dateedited, `long`);
            this.datecreated = (!data.datecreated) ? this.#formatDate(new Date(), `long`) : this.#formatDate(data.datecreated, `long`);

        } else {

            this.id = null;
            this.guser_id = 2;
            this.city_id = null;
            this.title = ``;
            this.age_id = null;
            this.location_id = null;
            this.year = 0;
            this.day_num = 0;
            this.time_id = null;
            this.assistant_id = null;
            this.sort_id = null;
            this.active = 0;
            this.dateedited = this.#formatDate(new Date(), `long`);
            this.datecreated = this.#formatDate(new Date(), `long`);

        }

    }

}

module.exports = RawGroup;