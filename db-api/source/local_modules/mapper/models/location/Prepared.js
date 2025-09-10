class PreparedLocation {

    constructor(rawLocation) {

        if (rawLocation) {

            this.id = (!rawLocation.id) ? null : rawLocation.id;
            this.city_id = (!rawLocation.city_id) ? null : rawLocation.city_id;
            this.title = (!rawLocation.title) ? `` : rawLocation.title;
            this.active = (!rawLocation.active) ? 0 : rawLocation.active;
            
        }

    }

}

module.exports = PreparedLocation;