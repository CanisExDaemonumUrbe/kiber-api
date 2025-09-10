const cfg = require(`../../Config.json`);

const Packager = require(`../packager/Packager`);
const Logger = require(`../logger/Logger`);
const nodeInfo = cfg['linked_nodes']['static'];

const packager = new Packager();
const logger = new Logger();

class SNController{

    constructor(){

        this.name = nodeInfo[`name`];
        this.version = nodeInfo[`version`];
        this.host = nodeInfo[`host`];
        this.port = nodeInfo[`port`];
        this.private = nodeInfo[`private`];
        this.token = nodeInfo[`token`];

        this.privatePath = `${this.host}:${this.port}/${this.name}/v${this.version}/${this.private}`;
    }


    async #MakeFetchAsync(link, method, headers, body = ``){

        let result = null;

        try{

            let fetchOptions = {};

            if(method == 'get'){
                
                fetchOptions = {
                    method: `${method}`,
                    headers: headers
                }

            } else {
                
                fetchOptions = {
                    method: `${method}`,
                    headers: headers,
                    body: body
                }
            }

            let request = await fetch(link, fetchOptions)
    
            if (request.status == 200){

                result = await request.json();

            } else if (request.status == 502) {

                result = await packager.packObjectAsync(`bad_gateway`, 502);

            } else {

                result = await packager.packObjectAsync(`bad_request`, 400);
            }

        } catch(err) {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('DBNController', 'MakeFetchAsync', `${err.message} -> ${link}`);

        } finally{

            return result;

        }

    }


    async GetStatusAsync(){

        return await this.#MakeFetchAsync(
            `${this.privatePath}/status`,
            `get`,
            {'authorization' : `${this.token}`}
        )

    }

    async GetImageLinkAsync(type, name, size){

        let link = null;

        try{

            link = `${this.host}:${this.port}/${this.name}/v${this.version}/image/${type}/${name}/${size}`;

        } catch (err){

            link = `${this.host}:${this.port}/${this.name}/v${this.version}/image/error/error/error`
            logger.createLog(`SNController`,`GetImageLinkAsync`, err.message);
            
        } finally{

            return link;
        }

    }

}

module.exports = SNController;