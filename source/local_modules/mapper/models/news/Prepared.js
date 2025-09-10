class PreparedNews{

    constructor(RawNews){
        if(RawNews){

            this.id = (!RawNews.id) ? null : RawNews.id;
            this.city_id = (!RawNews.city_id) ? 0 : RawNews.city_id;
            this.section_id = (!RawNews.section_id) ? 21698 : RawNews.section_id;
            this.active = (!RawNews.active) ? 0 : RawNews.active;
            this.title = (!RawNews.title) ? '' : RawNews.title;
            this.anons = (!RawNews.anons) ? '' : RawNews.anons;
            this.description = (!RawNews.description) ? '' : RawNews.description;
            this.image = (!RawNews.image) ? 'empty_news_image' : RawNews.image;
            this.date = (!RawNews.date) ? '1899-11-30' : RawNews.date;
        }
    }

}

module.exports = PreparedNews;