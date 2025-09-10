class PreparedUser{

    #formatDate(date, type) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
      
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
      
        var yyyy = date.getFullYear();
        
        let result = yyyy + '-' + mm + '-' + dd;

        if(type !== 'full'){
            return result;
        }

        var hh = date.getHours();
        if (hh < 10) hh = '0' + hh;
        result = result + ' ' + hh;

        var min = date.getMinutes();
        if (min < 10) min = '0' + min;
        result = result + ':' + min;

        var sec = date.getSeconds();
        if (sec < 10) sec = '0' + sec;
        result = result + ':' + sec;

        return result;

    }

    constructor(rawUser){

        if (rawUser){
            this.id = (!rawUser.id) ? null : rawUser.id;
            this.fio = (!rawUser.fio) ? '' : rawUser.fio;
            this.balance = (!rawUser.balance) ? 0 : rawUser.balance;
            this.address = (!rawUser.address) ? '' : rawUser.address;
            this.telephone = (!rawUser.telephone) ? '' : rawUser.telephone;
            this.email = (!rawUser.email) ? '' : rawUser.email;
            this.city = (!rawUser.city) ? '' : rawUser.city;
            this.image = (!rawUser.image) ? '' : rawUser.image;
            this.user_type = (!rawUser.user_type) ? 0 : rawUser.user_type;
            this.city_id = (!rawUser.city_id) ? 0 : rawUser.city_id;
            this.start_learning = (!rawUser.start_learning) ? '1899-11-30' : rawUser.start_learning;
            this.date_pay = (!rawUser.date_pay) ? '1899-11-30' : rawUser.date_pay;
            this.parents_name = (!rawUser.parents_name) ? '' : rawUser.parents_name;
            this.parents_phone = (!rawUser.parents_phone) ? '' : rawUser.parents_phone;
            this.group_id = (!rawUser.group_id) ? 0 : rawUser.group_id;
            this.birthday = (!rawUser.birthday) ? '1899-11-30' : rawUser.birthday;
            this.portfolio = (!rawUser.portfolio) ? '' : rawUser.portfolio;
        }

        
    }

}

module.exports = PreparedUser;
