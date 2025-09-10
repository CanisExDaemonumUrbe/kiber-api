class PreparedGroup{

    constructor(rawGroup){

        if(rawGroup){

            this.id = (!rawGroup.id) ? null : rawGroup.id;
            this.city_id = (!rawGroup.city_id) ? null : rawGroup.city_id;
            this.title = (!rawGroup.title) ? `` : rawGroup.title;
            this.age_id = (!rawGroup.age_id) ? null : rawGroup.age_id;
            this.location_id = (!rawGroup.location_id) ? null : rawGroup.location_id;
            this.year = (!rawGroup.year) ? 0 : rawGroup.year;
            this.day_num = (!rawGroup.day_num) ? 0 : rawGroup.day_num;
            this.time_id = (!rawGroup.time_id) ? null : rawGroup.time_id;
            this.assistant_id = (!rawGroup.assistant_id) ? null : rawGroup.assistant_id;
            this.active = (!rawGroup.active) ? 0 : rawGroup.active;

        }

    }

}

module.exports = PreparedGroup;