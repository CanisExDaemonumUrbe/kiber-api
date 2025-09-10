class PreparedItem{

    constructor(RawItem){
        if(RawItem){

            this.id = (!RawItem.id) ? null : RawItem.id;
            this.city_id = (!RawItem.city_id) ? 0 : RawItem.city_id;
            this.active = (!RawItem.active) ? 0 : RawItem.active;
            this.title = (!RawItem.title) ? '' : RawItem.title;
            this.description = (!RawItem.description) ? '' : RawItem.description;
            this.image = (!RawItem.image) ? 'empty_product_image' : RawItem.image;
            this.price = (!RawItem.price) ? 0 : RawItem.price;
        }
    }

}

module.exports = PreparedItem;