const cfg = require(`../../Config.json`);

const Packager = require(`../packager/Packager`);
const Logger = require(`../logger/Logger`);
const nodeInfo = cfg['linked_nodes']['database'];

const packager = new Packager();
const logger = new Logger();

class DBNController{

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


    // USER request - ver 1.0.0
    //--------------------------------------------------------------------
    // ver 1.0.0
    async AuthorizationUserAsync(login, password){

        return await this.#MakeFetchAsync(
            `${this.privatePath}/user/auth`,
            `get`,
            {
                'authorization' : `${this.token}`,
                'login' : `${login}`,
                'password' : `${password}`
            }
        )

    }

    async GetUserByUserIdAsync(userId){

        return await this.#MakeFetchAsync(
            `${this.privatePath}/user/${userId}`,
            `get`,
            {'authorization' : `${this.token}`}
        );

    }

    //ver 1.0.0
    async GetUserKiberonLogsByUserId(userId){

        return await this.#MakeFetchAsync(
            `${this.privatePath}/kiberon-logs/${userId}`,
            `get`,
            {'authorization' : `${this.token}`}
        );
    }

    async GetGroupByGroupIdAsync(groupId){

        return await this.#MakeFetchAsync(
            `${this.privatePath}/group/${groupId}`,
            `get`,
            {'authorization' : `${this.token}`}
        );

    }

    async GetCityByCityIdAsync(cityId){

        return await this.#MakeFetchAsync(
            `${this.privatePath}/city/${cityId}`,
            `get`,
            {'authorization' : `${this.token}`}
        );

    }

    async GetSheduleByGroupIdAsync(groupId){
        
        return await this.#MakeFetchAsync(
            `${this.privatePath}/shedule/${groupId}`,
            `get`,
            {'authorization' : `${this.token}`}
        );

    }

    async GetLocationByLocationId(locationId){

        return await this.#MakeFetchAsync(
            `${this.privatePath}/location/${locationId}`,
            `get`,
            {'authorization' : `${this.token}`}
        );

    }

    async GetModuleByModuleId(moduleId){

        return await this.#MakeFetchAsync(
            `${this.privatePath}/module/${moduleId}`,
            `get`,
            {'authorization' : `${this.token}`}
        );
    }

    // ver 1.0.0
    async UpdateUserPasswordAsync(userId, userNewPassword){

        return await this.#MakeFetchAsync(
            `${this.privatePath}/user/change-password`,
            `post`,
            {
                'authorization' : `${this.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            JSON.stringify(
                {
                    id: userId,
                    password: userNewPassword
                }
            )
        );

    }
    //--------------------------------------------------------------------


    // CITY requests = ver 1.0.0
    //--------------------------------------------------------------------
    // ver 1.0.0
    async GetCityFeedByCityIdAsync(cityId){

        return await this.#MakeFetchAsync(
            `${this.privatePath}/feed/${cityId}`,
            `get`,
            {'authorization' : `${this.token}`}
        );
    }


    // ver 1.0.0
    async GetCityKibershopByCityIdAsync(cityId){

        return await this.#MakeFetchAsync(
            `${this.privatePath}/kibershop/${cityId}`,
            `get`,
            {'authorization' : `${this.token}`}
        );
    }

    //--------------------------------------------------------------------


    // Form request - ver 1.0.0
    //--------------------------------------------------------------------
    
    async PostResidentInviteForm(id, userId, toEmail, toName){

        return await this.#MakeFetchAsync(
            `${this.privatePath}/form/invite`,
            `post`,
            {
                'authorization' : `${this.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            JSON.stringify(
                {
                    id: id,
                    user_id: userId,
                    to_email: toEmail,
                    to_name: toName
                }
            )
        );
    }

    async PostResidentFeedbackFormAsync(id, userId, feedbackid, ip, email, userName, userPhone, fieldMessage){

        return await this.#MakeFetchAsync(
            `${this.privatePath}/form/feedback`,
            `post`,
            {
                'authorization' : `${this.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            JSON.stringify(
                {
                    id: id,
                    user_id: userId,
                    feedbackid: feedbackid,
                    ip: ip,
                    email: email,
                    user_name: userName,
                    user_phone: userPhone,
                    field_message: fieldMessage
                }
            )
        );

    }

    //--------------------------------------------------------------------
}

module.exports = DBNController;