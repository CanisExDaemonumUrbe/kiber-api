const Packager = require(`../packager/Packager`);
const Logger = require(`../logger/Logger`);
const Mapper = require(`../mapper/Mapper`);
const DataBaseNodeController = require(`./DataBaseNodeController`);
const StaticNodeController = require(`./StaticNodeController`);
const MailerNodeController = require(`./MailerNodeController`);

const packager = new Packager();
const logger = new Logger();
const mapper = new Mapper();
const dbnController = new DataBaseNodeController();
const snController = new StaticNodeController();
const mnController = new MailerNodeController();


class NetController{

    async GetStatusAsync(privatePath = false) {

        let result = null;

        try{

            let dbNodeStatus = await dbnController.GetStatusAsync();
            let sNodeStatus = await snController.GetStatusAsync();
            let mNodeStatus = await mnController.GetStatusAsync();

            let selfStatus = (dbNodeStatus[`status`] == `ok`) ? `ok` : `unavailable`

            result = await packager.packObjectAsync(
                selfStatus,
                {
                    'db-node': dbNodeStatus,
                    'static-node': sNodeStatus,
                    'mailer-node': mNodeStatus
                }
            );
        
        } catch (err){

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('DBNController', 'CheckStatusAsync', err.message);

        } finally{

            return result;
        }

    }

    async AuthorizationUserAsync(headers){

        let result = null;

        try {

            let login = headers['login'];
            let password = headers['password'];

            result = await dbnController.AuthorizationUserAsync(login, password);
            
        } catch (err) {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('NetController', 'AuthorizationUserAsync', err.message);

        } finally {

            return result;
        }

    }

    async GetResidentProfileByUserIdAsync(params) {
        
        let result = null;

        try {

            let userId = params.resident_id;

            if(userId) {
                let userPacked = await dbnController.GetUserByUserIdAsync(userId);
                let userUnpacked = await packager.unpackObjectAsync(userPacked);
                let userData = userUnpacked[1];

                if(userData) {

                    let groupPacked = await dbnController.GetGroupByGroupIdAsync(userData.group_id);
                    let groupUnpacked = await packager.unpackObjectAsync(groupPacked);
                    let groupData = groupUnpacked[1];
    
                    let cityPacked = await dbnController.GetCityByCityIdAsync(userData.city_id);
                    let cityUnpacked = await packager.unpackObjectAsync(cityPacked);
                    let cityData = cityUnpacked[1];
    
                    let sheduleData = null;
                    if(groupData) {
    
                        let shedulePacked = await dbnController.GetSheduleByGroupIdAsync(groupData.id);
                        let sheduleUnpacked = await packager.unpackObjectAsync(shedulePacked);
                        sheduleData = sheduleUnpacked[1];
                    }
    
                    let locationData = null;
                    let moduleData = null;
                    if(sheduleData) {
    
                        let locationPacked = await dbnController.GetLocationByLocationId(sheduleData.location_id);
                        let locationUnpacked = await packager.unpackObjectAsync(locationPacked);
                        locationData = locationUnpacked[1];

                        let modulePacked = await dbnController.GetModuleByModuleId(sheduleData.module_id);
                        let moduleUnpacked = await packager.unpackObjectAsync(modulePacked);
                        moduleData = moduleUnpacked[1][0];
                    }
    
                    let JProfile = await mapper.createJResidentProfile(
                        userData,
                        groupData,
                        locationData,
                        sheduleData,
                        moduleData,
                        cityData
                    );
                    
                    result = await packager.packObjectAsync(`ok`, JProfile[0]);
    
                }

            } else {

                result = await packager.packObjectAsync(`bad_request`, 400);
            }
    

        } catch (err) {
            
            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('NetController', 'GetResidentProfileByUserIdAsync', err.message);

        } finally {

            return result;
        }

    }

    async GetResidentKiberonLogsByUserIdAsync(params) {
        
        let result = null;

        try{

            let userId = params.resident_id;

            result = await dbnController.GetUserKiberonLogsByUserId(userId);

        } catch (err) {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog(`NetController`, `GetResidentKiberonLogsByUserIdAsync`, err.message);
        } finally {

            return result;
        }

    }

    async UpdateUserPasswordAsync(body) {

        let result = null;

        try {

            let userId = body.id;
            let userNewPassword = body.password;

            result = await dbnController.UpdateUserPasswordAsync(userId, userNewPassword);

        } catch (err) {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('NetController', 'UpdateUserPassword', err.message);
            
        } finally {

            return result;
        }

    }

    async GetCityFeedByCityIdAsync(params) {

        let result = null;

        try {

            let cityId = params.city_id;

            result = await dbnController.GetCityFeedByCityIdAsync(cityId);

        } catch (err) {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('NetController', 'GetCityFeedByCityIdAsync', err.message);

        } finally {

            return result;
        }

    }

    async GetCityKibershopByCityIdAsync(params) {

        let result = null;

        try {

            let cityId = params.city_id;

            result = await dbnController.GetCityKibershopByCityIdAsync(cityId);

        } catch (err) {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('NetController', 'GetCityKibershopByCityIdAsync', err.message);

        } finally {

            return result;
        }

    }

    async GetImageLinkAsync(params) {

        let type = (params.type) ? params.type : `error_no_type`;
        let name = (params.name) ? params.name : `error_no_name`;
        let size = (params.size) ? params.size : `error_no_size`;

        return await snController.GetImageLinkAsync(type, name, size);

    }

    //Resident - Feedback forms//

    async PostResidentFormInviteAsync(body){
        
        let result = null;

        try {

            let profileId = body.profile_id;
            let residentParentFIO = body.resident_parent_fio;
            let residentName = body.resident_name;
            let residentAge = body.resident_age;
            let residentProfileEmail = body.resident_profile_email;
            let residentParentPhone = body.resident_parent_phone;
            let cityName = body.city_name;
            let locationName = body.location_name;
            let groupName = body.group_name;

            let friendParentFIO = body.friend_parent_fio;
            let friendResidentName = body.friend_resident_name;
            let friendEmail = body.friend_email;
            let friendPhone = body.friend_phone;

            let managerEmail = body.manager_email;

            let selfStatus;

            let mailerResult = await mnController.SendResidentInviteFormAsync(
                residentParentFIO,
                residentName,
                residentAge,
                residentProfileEmail,
                residentParentPhone,
                cityName,
                locationName,
                groupName,
                friendParentFIO,
                friendResidentName,
                friendEmail,
                friendPhone,
                managerEmail
            );

            let dbResult = await dbnController.PostResidentInviteForm(
                null,
                profileId,
                friendEmail,
                friendParentFIO
            );

            if(mailerResult[`status`] == `ok` && dbResult[`status`] == `ok`) {
                selfStatus = `ok`;
            } else if(mailerResult[`status`] == `error` && dbResult[`status` == `error`]) {
                selfStatus = `error`;
            } else {
                selfStatus = 'warning'
            }

            result = await packager.packObjectAsync(
                selfStatus,
                {
                    mailer_result: mailerResult,
                    db_result: dbResult
                }
            );
            

        } catch (err) {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('NetController', 'PostResidentFormInviteAsync', err.message);

        } finally {

            return result;
        }
    }

    async PostResidentFormFeedbackAsync(body){

        let result = null;

        try{

            let profileId = body.profile_id;
            let residentParentFIO = body.resident_parent_fio;
            let residentName = body.resident_name;
            let residentAge = body.resident_age;
            let residentProfileEmail = body.resident_profile_email;
            let residentParentPhone = body.resident_parent_phone;
            let cityName = body.city_name;
            let locationName = body.location_name;
            let groupName = body.group_name;

            let feedbackid = body.feedbackid;
            let feedbackName = body.feedback_name;
            let feedbackPhone = body.feedback_phone;
            let feedbackEmail = body.feedback_email;
            let feedbackMessage = body.feedback_message;
            
            let managerEmail = body.manager_email;

            let selfStatus;

            let mailerResult = await mnController.SendResidentFeedbackFormAsync(
                residentParentFIO,
                residentName,
                residentAge,
                residentProfileEmail,
                residentParentPhone,
                cityName,
                locationName,
                groupName,
                feedbackName,
                feedbackPhone,
                feedbackEmail,
                feedbackMessage,
                managerEmail
            );

            let dbResult = await dbnController.PostResidentFeedbackFormAsync(
                null,
                profileId,
                feedbackid,
                `255.255.255.255`,
                feedbackEmail,
                feedbackPhone,
                feedbackMessage
            );

            if(mailerResult[`status`] == `ok` && dbResult[`status`] == `ok`) {
                selfStatus = `ok`;
            } else if(mailerResult[`status`] == `error` && dbResult[`status` == `error`]) {
                selfStatus = `error`;
            } else {
                selfStatus = 'warning'
            }

            result = await packager.packObjectAsync(
                selfStatus,
                {
                    mailer_result: mailerResult,
                    db_result: dbResult
                }
            );

        } catch(err) {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('NetController', 'PostResidentFormFeedbackAsync', err.message);

        } finally {

            return result;
        }

    }

    async PostResidentFormCallbackAsync(body){

        let result = null;

        try{

            let profileId = body.profile_id;
            let residentParentFIO = body.resident_parent_fio;
            let residentName = body.resident_name;
            let residentAge = body.resident_age;
            let residentProfileEmail = body.resident_profile_email;
            let residentParentPhone = body.resident_parent_phone;
            let cityName = body.city_name;
            let locationName = body.location_name;
            let groupName = body.group_name;

            let feedbackid = body.feedbackid;

            let callbackName = body.callback_name;
            let callbackPhone = body.callback_phone;
            
            let managerEmail = body.manager_email;

            let selfStatus;

            let mailerResult = await mnController.SendResidentCallbackFormAsync(
                residentParentFIO,
                residentName,
                residentAge,
                residentProfileEmail,
                residentParentPhone,
                cityName,
                locationName,
                groupName,
                callbackName,
                callbackPhone,
                managerEmail
            );

            let dbResult = await dbnController.PostResidentFeedbackFormAsync(
                null,
                profileId,
                feedbackid,
                `0.0.0.0`,
                callbackName,
                callbackPhone,
                ''
            );

            if(mailerResult[`status`] == `ok` && dbResult[`status`] == `ok`) {
                selfStatus = `ok`;
            } else if(mailerResult[`status`] == `error` && dbResult[`status` == `error`]) {
                selfStatus = `error`;
            } else {
                selfStatus = 'warning'
            }

            result = await packager.packObjectAsync(
                selfStatus,
                {
                    mailer_result: mailerResult,
                    db_result: dbResult
                }
            );

        } catch (err){

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('NetController', 'PostResidentFormCallbackAsync', err.message);

        } finally {

            return result;
        }

    }

    async PostResidentFormTechSupportAsync(body){

        let result = null;

        try {

            let profileId = body.profile_id;
            let residentParentFIO = body.resident_parent_fio;
            let residentName = body.resident_name;
            let residentAge = body.resident_age;
            let residentProfileEmail = body.resident_profile_email;
            let residentParentPhone = body.resident_parent_phone;
            let cityName = body.city_name;
            let locationName = body.location_name;
            let groupName = body.group_name;

            let tsrEmail = body.tsr_email;
            let tsrMessage = body.tsr_message;
            let tsrDeviceInfo = body.tsr_device_info;
            
            let managerEmail = body.manager_email;

            result = await mnController.SendResidentTechSupportFormAsync(
                residentParentFIO,
                residentName,
                residentAge,
                residentProfileEmail,
                residentParentPhone,
                cityName,
                locationName,
                groupName,
                tsrEmail,
                tsrMessage,
                tsrDeviceInfo,
                managerEmail
            );

        } catch (err){

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('NetController', 'PostResidentFormTechSupportAsync', err.message);

        } finally {

            return result;
        }
        
    }

    //Guest - Registration form//

    async PostGuestFormRegistrationAsync(body){

        let result = null;

        try {

            let guestCityName = body.city_name;
            let guestFio = body.fio;
            let guestEmail = body.email;
            let guestPhoneNumber = body.phone_number;
            let guestResidentAge = body.resident_age;
            let guestManagerEmail = body.manager_email;

            result = await mnController.SendGuestRegistrationFormAsync(
                guestCityName,
                guestFio,
                guestEmail,
                guestPhoneNumber,
                guestResidentAge,
                guestManagerEmail
            );

        } catch (err){

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('NetController', 'PostGuestFormRegistrationAsync', err.message);

        } finally {

            return result;
        }
    }
}

module.exports = NetController