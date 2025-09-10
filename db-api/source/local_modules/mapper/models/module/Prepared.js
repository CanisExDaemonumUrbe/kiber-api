class PreparedModule{

    #tryGetVideoLink(iframe){
        try{
            return iframe.split(' ')[3].slice(5,-1);
        }
        catch{
            return null;
        }
    }

    constructor(rawModule){

        if (rawModule){

            this.id = (!rawModule.id) ? null : rawModule.id;
            this.title = (!rawModule.title) ?  `` : rawModule.title;
            this.image = (!rawModule.image) ? `` : rawModule.image;
            this.video = (!rawModule.video) ? `` : this.#tryGetVideoLink(rawModule.video);
            this.count_lesson = (!rawModule.count_lesson) ? 0 : rawModule.count_lesson;
            this.description = (!rawModule.description) ? `` : rawModule.description;  

        }

    }


}

module.exports = PreparedModule;