const mysql = require(`mysql2`);

const cfg = require(`./DBConfig.json`);
const Packager = require(`../packager/Packager`);
const Logger = require(`../logger/Logger`);
const Mapper = require(`../mapper/Mapper`);

const UserController = require(`./entities_сontrollers/UserController`);
const GroupController = require(`./entities_сontrollers/GroupController`);
const SheduleController = require(`./entities_сontrollers/SheduleController`);
const ModuleController = require(`./entities_сontrollers/ModuleController`);
const LocationController = require(`./entities_сontrollers/LocationController`);
const CityController = require(`./entities_сontrollers/CityController`);
const LogsController = require(`./entities_сontrollers/KiberonLogsController`);
const FeedController = require(`./entities_сontrollers/FeedController`);
const KibershopController = require(`./entities_сontrollers/KibershopController`);
const FormController = require(`./entities_сontrollers/FormController`);

const db = cfg[cfg[`active_connection`]];
const packager = new Packager();
const logger = new Logger();
const mapper = new Mapper();

const user = new UserController();
const group = new GroupController();
const shedule = new SheduleController();
const moduleController = new ModuleController();
const location = new LocationController();
const city = new CityController();
const logs = new LogsController();
const feed = new FeedController();
const kibershop = new KibershopController();
const form = new FormController();

class DatabaseController {

    constructor() {

        this.connection = mysql.createPool({

            connectionLimit: 10,
            host : db[`host`],
            port : db[`port`],
            database : db[`database`],
            user : db[`user`],
            password : db[`password`]
        
        }).promise();

        logger.createLog(`DatabaseController`, `constructor`, `Connection is established: ${db[`host`]}:${db[`port`]}, ${db[`database`]}, ${db[`user`]}`);

    }

    async #queryExecute(query){
        return new Promise((resolve, reject) => {
         resolve(this.connection.query(query));
         reject(null);
        })
    }


    async GetStatusAsync(privatePath = false) {

        return await packager.packObjectAsync(`ok`, `online`);

    }


//USER operations
//--------------------------------------------------------------------

    async ChangePasswordUserAsync(body){

        let result = null;

        try{

            let userId = body.id;
            let password = body.password;

            let request = await user.changePassword(userId, password);
            if (request){
                let response = await this.#queryExecute(request);

                result = await packager.packObjectAsync(`ok`, response)
            }

        } catch (err) {

            result = await packager.packObjectAsync('error', err.message);
            logger.createLog(`DatabaseController`,`userChangePasswordAsync`, err.message);

        } finally {

            return result;

        }

    }

    async AuthorizationUserAsync(headers){

        let result = null;

        try{

            let login = headers['login'];
            let password = headers['password'];
        
            let request = await user.authorization(login, password);
            let response = await this.#queryExecute(request);

            if (response[0].length != 0) {
                let dbRes = JSON.parse(JSON.stringify(response[0]))[0]
                if (dbRes['password'] == password){

                    result = await packager.packObjectAsync(`ok`, dbRes);

                } else {
                    result = await packager.packObjectAsync(`access_denied`);
                }
                
            } else {

                result = await packager.packObjectAsync(`user_not_found`);

            }

        } catch(err) {

            result = await packager.packObjectAsync('error', err.message);
            logger.createLog(`DatabaseController`,`userAuthorizationAsync`, err.message);

        } finally {

            return result;
        }

    }

    async GetUserByUserIdAsync(params){

        let result = null;

        try {

            let userId = params.user_id;

            let request = await user.getData(userId);
            if (request){
                let response = await this.#queryExecute(request);
                let jUserList = await mapper.createJUserAsync(response[0]);

                result = await packager.packObjectAsync(`ok`, (jUserList[0]) ? jUserList[0] : null)
            }

        } catch (err) {

            result = await packager.packObjectAsync('error', err)
            logger.createLog(`DatabaseController`, `userGetDataAsync`, err);

        } finally {

            return result;
        }

    }

//--------------------------------------------------------------------


//SHEDULE operations
//--------------------------------------------------------------------

    async GetSheduleLogByGroupIdAsync(params){

        let result = null;

        try {

            let groupId = params.group_id;

            let request = await shedule.getData(groupId);
            if (request){
                let response = await this.#queryExecute(request);
                let jSheduleList = await mapper.createJSheduleAsync(response[0]);

                result = await packager.packObjectAsync(`ok`, (jSheduleList[0]) ? jSheduleList[0] : null)
            }

        } catch (err) {

            result = await packager.packObjectAsync('error', err.message);
            logger.createLog(`DatabaseController`, `GetSheduleLogByGroupIdAsync`, err.message);

        } finally {

            return result;

        }

    }

//--------------------------------------------------------------------



//GROUP operations
//--------------------------------------------------------------------

    async GetGroupByGroupIdAsync(params){

        let result = null;

        try {

            let groupId = params.group_id;

            let request = await group.getData(groupId);
            if (request){
                let response = await this.#queryExecute(request);
                let jGroupList = await mapper.createJGroupAsync(response[0]);

                result = await packager.packObjectAsync(`ok`, (jGroupList[0]) ? jGroupList[0] : null)
            }

        } catch (err) {

            result = await packager.packObjectAsync('error', err.message);
            logger.createLog(`DatabaseController`, `GetGroupByGroupIdAsync`, err.message);

        } finally {

            return result;
        }

    }

//--------------------------------------------------------------------


//LOCATION operations
//--------------------------------------------------------------------

    async GetLocationByLocationIdAsync(params){

        let result = null;

        try {

            let locationId = params.location_id;

            let request = await location.getData(locationId);
            if (request){
                let response = await this.#queryExecute(request);
                let jLocationList = await mapper.createJLocationAsync(response[0]);

                result = await packager.packObjectAsync(`ok`, (jLocationList[0]) ? jLocationList[0] : null);
            }

        } catch (err) {

            result = await packager.packObjectAsync('error', err.message);
            logger.createLog(`DatabaseController`, `GetLocationByLocationIdAsync`, err.message);

        } finally {

            return result;

        }

    }

//--------------------------------------------------------------------



//MODULE operations
//--------------------------------------------------------------------

    async GetModuleByModuleIdAsync(params){

        let result = null;

        try {

            let moduleId = params.module_id;

            let request = await moduleController.getData(moduleId);
            if (request){
                let response = await this.#queryExecute(request);
                let jModuleList = await mapper.createJModuleAsync(response[0]);

                result = await packager.packObjectAsync(`ok`, (jModuleList[0]) ? jModuleList : null);
            }

        } catch (err) {

            result = await packager.packObjectAsync('error', err.message);
            logger.createLog(`DatabaseController`, `GetModuleByModuleIdAsync`, err.message);

        } finally {

            return result;

        }

    }

//--------------------------------------------------------------------


//CITY operations
//--------------------------------------------------------------------

    async GetCityByCityIdAsync(params){

        let result = null;

        try {

            let cityId = params.city_id;

            let request = await city.getData(cityId);
            if (request) {
                let response = await this.#queryExecute(request);
                let jCityList = await mapper.createJCityAsync(response[0]);

                result = await packager.packObjectAsync(`ok`, (jCityList[0]) ? jCityList[0] : null);
            }

        } catch (err) {

            result = await packager.packObjectAsync('error', err.message);
            logger.createLog(`DatabaseController`, `GetCityByCityIdAsync`, err.message);

        } finally {

            return result;

        }

    }

//--------------------------------------------------------------------


//KIBERON-LOGS operations
//--------------------------------------------------------------------

    async GetKiberonHistoryByUserIdAsync(params){

        let result = null;

        try {

            let userId = params.user_id;

            let request = await logs.getData(userId);
            if (request) {
                let response = await this.#queryExecute(request);
                let jLogsList = await mapper.createJLogAsync(response[0]);

                result = await packager.packObjectAsync(`ok`, (jLogsList) ? jLogsList : null);
            }

        } catch (err) {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog(`DatabaseController`, `GetKiberonHistoryByResidentIdAsync`, err.message);

        } finally {

            return result;
        }

    }

//--------------------------------------------------------------------


//FEED operations
//--------------------------------------------------------------------

    async GetFeedByCityIdAsync(params){

        let result = null;

        try {

            let cityId = params.city_id;

            let request = await feed.getData(cityId);
            if (request) {
                let response = await this.#queryExecute(request);
                let jFeedList = await mapper.createJFeedAsync(response[0]);

                result = await packager.packObjectAsync(`ok`, (jFeedList) ? jFeedList : null);
            }

        } catch (err) {

            result = await packager.packObjectAsync('error', err.message);
            logger.createLog(`DatabaseController`, `GetFeedByCityIdAsync`, err.message);

        } finally {

            return result;

        }

    }
//--------------------------------------------------------------------


//KIBERSHOP operations
//--------------------------------------------------------------------

    async GetKibershopByCityIdAsync(params) {

        let result = null;

        try {

            let cityId = params.city_id;

            let request = await kibershop.getData(cityId);
            if (request) {
                let response = await this.#queryExecute(request);
                let jKibershopList = await mapper.createJKibershopAsync(response[0]);

                result = await packager.packObjectAsync(`ok`, (jKibershopList) ? jKibershopList : null);
            }

        } catch (err) {

            result = await packager.packObjectAsync('error', err.message);
            logger.createLog(`DatabaseController`, `GetKibershopByCityIdAsync`, err.message);

        } finally {

            return result;

        }

    }

//--------------------------------------------------------------------


//FORM operations
//--------------------------------------------------------------------
    async InsertInviteForm(body) {

        let result = null;

        try {

            let forms = await mapper.createInviteFormAsync([body]);
            let inviteForm = forms[0];

            let request = await form.InsertInviteFormAsync(inviteForm);
            if (request) {
                let response = await this.#queryExecute(request);

                result = await packager.packObjectAsync(`ok`, response)
            }

        } catch (err) {

            result = await packager.packObjectAsync('error', err.message);
            logger.createLog(`DatabaseController`,`InsertInviteForm`, err.message);

        } finally {

            return result;
        }

    }

    async InsertFeedbackForm(body) {

        let result = null;

        try {

            let forms = await mapper.createFeedbackFormAsync([body]);
            let feedbackForm = forms[0];

            let request = await form.InsertFeedbackFormAsync(feedbackForm);
            if (request) {
                let response = await this.#queryExecute(request);

                result = await packager.packObjectAsync(`ok`, response);
            }

        } catch (err) {

            result = await packager.packObjectAsync('error', err.message);
            logger.createLog(`DatabaseController`,`InsertFeedbackForm`, err.message);

        } finally {

            return result;
        }

    }
//--------------------------------------------------------------------

}

module.exports = DatabaseController;
