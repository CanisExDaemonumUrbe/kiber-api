class RawShedule{

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
            this.date = (!data.date) ? this.#formatDate(new Date(), `short`) : this.#formatDate(data.date, `short`);
            this.time_start = (!data.time_start) ? `00:00:00` : data.time_start;
            this.time_end = (!data.time_end) ? `00:00:00` : data.time_end;
            this.group_id = (!data.group_id) ? null : data.group_id;
            this.module_id = (!data.module_id) ? null : data.module_id;
            this.lesson = (!data.lesson) ? 0 : data.lesson;
            this.location_id = (!data.location_id) ? null : data.location_id;
            this.teacher_id = (!data.teacher_id) ? null : data.teacher_id;

        } else {

            this.id = null;
            this.guser_id = 2;
            this.city_id = null;
            this.date = this.#formatDate(new Date(), `short`);
            this.time_start = `00:00:00`;
            this.time_end = `00:00:00`;
            this.group_id = null;
            this.module_id = null;
            this.lesson = 0;
            this.location_id = null;
            this.teacher_id = null;

        }

    }

}

module.exports = RawShedule