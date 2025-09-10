const path = require("path");
const fs = require('fs');

const cfg = require(`../Config.json`);

const Packager = require(`./packager/Packager`);
const Logger = require(`./logger/Logger`);

const packager = new Packager();
const logger = new Logger();

let staticFiles = path.join(__dirname, cfg['path_to_static']);


class StaticFilesController{

    constructor() {

        this.staticDictionary = [
            {'path':`user` , 'dir':`userimages`},
            {'path':`module` , 'dir':`dictionary`},
            {'path':`kibershop-item` , 'dir':`products`},
            {'path':`city-news` , 'dir':`city_news`}
        ];

    }
    

    async GetStatusAsync(privatePath = false) {

        return await packager.packObjectAsync(`ok`, `online`);
    }


    #checkDir(sizedImgPath){
        try{
            fs.accessSync(sizedImgPath, fs.constants.F_OK);
            return true;
        } catch (err){
            return false;
        }
    }

    async #findIconImage(imgPath, files, name){
        for(let i = files.length - 1; i >= 0; i--){
            let sizedImgPath = path.join(imgPath, files[i].value, name);
            if(this.#checkDir(sizedImgPath)){
                return sizedImgPath;
            }
            
        }
        return null;
    }

    async #findBigImage(imgPath, name){
        let sizedImgPath = path.join(imgPath, name);
        if(this.#checkDir(sizedImgPath)){
            return sizedImgPath;
        }
    }

    async #prepareFiles(files){
        let filesDict = [];

        for (let i = 0; i < files.length; i++){
            let keys = files[i].split("_");
            let key = Number(keys[0].replace("x",""));
            filesDict.push({key: key, value: files[i]});
        }

        filesDict.sort((a, b) => {
            if (a.key > b.key) return 1;
            if (a.key == b.key) return 0;
            if (a.key < b.key) return -1;
        });
        
        return filesDict;
    }

    async #findImage(imgType, name, size){
        let sizeTypes = [{key:-1, value:'big'},{key:1, value:'icons'}];
        let typeKey = (size == 'big') ? -1 : 1;

        let findedImage = null;

        for (let i = 0; i < sizeTypes.length; i++){
            let sizeType = sizeTypes.find(item => item.key == typeKey);
            if (typeKey < 0){
                //Попытка найти большое изображение
                let imgPath = path.join(staticFiles, imgType, sizeType.value);
                findedImage = await this.#findBigImage(imgPath, name);
                if(findedImage != null){ 
                    return findedImage;
                } else {
                    typeKey *= -1;
                }
            } else {
                //Попытка найти малое изображение
                let imgPath = path.join(staticFiles, imgType, sizeType.value);
                let files = fs.readdirSync(imgPath);
                let pFiles = await this.#prepareFiles(files);
                findedImage = await this.#findIconImage(imgPath, pFiles, name);
                if(findedImage != null){ 
                    return findedImage;
                } else {
                    typeKey *= -1;
                }
            }

        }

        return path.join(staticFiles, 'no_cover', 'no_cover_icon.png');
    }

    async getImageAsync(params) {

        let result = null;

        try {

            let type = params.type;
            let name = params.name;
            let size = params.size;

            let imagesDirName = this.staticDictionary.find(_ => _.path == type).dir;
            
            result = await this.#findImage(imagesDirName, name, size);

        } catch (err) {

            logger.createLog(`StaticFilesController`, `getImageAsync`, err);

        } finally {

            return result;

        }

    }

}

module.exports = StaticFilesController;