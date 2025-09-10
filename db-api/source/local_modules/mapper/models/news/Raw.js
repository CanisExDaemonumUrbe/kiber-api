class RawNews{

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

    //����� ������ ��������� ������� �������� ������

    constructor(data){

        //������ ������������ � ��������� �����������

        if(data){

            this.id = (!data.id) ? null : data.id;
            this.guser_id = (!data.guser_id) ? 2 : data.guser_id;
            this.city_id = (!data.city_id) ? 0 : data.city_id;
            this.section_id = (!data.section_id) ? 21698 : data.section_id;
            this.active = (!data.active) ? 0 : data.active;
            this.title = (!data.title) ? '' : data.title;
            this.anons = (!data.anons) ? '' : data.anons;
            this.description = (!data.description) ? '' : data.description;
            this.image = (!data.image) ? '' : data.image;
            this.date = (!data.date) ? this.#formatDate(new Date(), 'short') : this.#formatDate(data.datecreated, 'short');
            this.datecreated = (!data.datecreated) ? this.#formatDate(new Date(), 'full') : this.#formatDate(data.datecreated, 'full');
            this.dateedited = (!data.dateedited) ? this.#formatDate(new Date(), 'full') : this.#formatDate(data.dateedited, 'full');
        } else {

            this.id = null;
            this.guser_id = 2;
            this.city_id = 0;
            this.section_id = 21698;
            this.active = 0;
            this.title = '';
            this.anons = '';
            this.description = '';
            this.image = '';
            this.date = this.#formatDate(new Date(), 'short');
            this.datecreated = this.#formatDate(new Date(), 'full');
            this.dateedited = this.#formatDate(new Date(), 'full');

        }  
    }
}

module.exports = RawNews;