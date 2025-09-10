class PreparedShedule {

    constructor (rawShedule){

        if(rawShedule){
            this.id = (!rawShedule.id) ? null : rawShedule.id;
            this.city_id = (!rawShedule.city_id) ? null : rawShedule.city_id;
            this.group_id = (!rawShedule.group_id) ? null : rawShedule.group_id;
            this.module_id = (!rawShedule.module_id) ? null : rawShedule.module_id;
            this.lesson = (!rawShedule.lesson) ? 0 : rawShedule.lesson;
            this.location_id = (!rawShedule.location_id) ? null : rawShedule.location_id;
        }

    }

}

module.exports = PreparedShedule;