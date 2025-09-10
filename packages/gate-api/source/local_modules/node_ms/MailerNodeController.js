const cfg = require(`../../Config.json`);

const Packager = require(`../packager/Packager`);
const Logger = require(`../logger/Logger`);
const { json } = require("express");
const nodeInfo = cfg['linked_nodes']['mailer'];

const packager = new Packager();
const logger = new Logger();

class MNController{

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

    async SendResidentInviteFormAsync(
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
    ){

        return await this.#MakeFetchAsync(
            `${this.privatePath}/kiber-club/resident/form/invite-friend`,
            `post`,
            {
                'authorization' : `${this.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            JSON.stringify(
                {
                    resident_parent_fio: residentParentFIO,
                    resident_name: residentName,
                    resident_age: residentAge,
                    resident_profile_email: residentProfileEmail,
                    resident_parent_phone: residentParentPhone,
                    city_name: cityName,
                    location_name: locationName,
                    group_name: groupName,
                    friend_parent_fio: friendParentFIO,
                    friend_resident_name: friendResidentName,
                    friend_email: friendEmail,
                    friend_phone: friendPhone,
                    manager_email: managerEmail
                }
            )
        );

    }

    async SendResidentFeedbackFormAsync(
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
    ){
        return await this.#MakeFetchAsync(
            `${this.privatePath}/kiber-club/resident/form/feedback`,
            `post`,
            {
                'authorization' : `${this.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            JSON.stringify(
                {
                    resident_parent_fio: residentParentFIO,
                    resident_name: residentName,
                    resident_age: residentAge,
                    resident_profile_email: residentProfileEmail,
                    resident_parent_phone: residentParentPhone,
                    city_name: cityName,
                    location_name: locationName,
                    group_name: groupName,
                    feedback_name: feedbackName,
                    feedback_phone: feedbackPhone,
                    feedback_email: feedbackEmail,
                    feedback_message: feedbackMessage,
                    manager_email: managerEmail
                }
            )
        );
    }

    async SendResidentCallbackFormAsync(
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
    ){
        return await this.#MakeFetchAsync(
            `${this.privatePath}/kiber-club/resident/form/callback`,
            `post`,
            {
                'authorization' : `${this.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            JSON.stringify(
                {
                    resident_parent_fio: residentParentFIO,
                    resident_name: residentName,
                    resident_age: residentAge,
                    resident_profile_email: residentProfileEmail,
                    resident_parent_phone: residentParentPhone,
                    city_name: cityName,
                    location_name: locationName,
                    group_name: groupName,
                    callback_name: callbackName,
                    callback_phone: callbackPhone,
                    manager_email: managerEmail
                }
            )
        );
    }

    async SendResidentTechSupportFormAsync(
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
    ){
        return await this.#MakeFetchAsync(
            `${this.privatePath}/kiber-club/resident/form/tech-support-request`,
            `post`,
            {
                'authorization' : `${this.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            JSON.stringify(
                {
                    resident_parent_fio: residentParentFIO,
                    resident_name: residentName,
                    resident_age: residentAge,
                    resident_profile_email: residentProfileEmail,
                    resident_parent_phone: residentParentPhone,
                    city_name: cityName,
                    location_name: locationName,
                    group_name: groupName,
                    tsr_email: tsrEmail,
                    tsr_message: tsrMessage,
                    tsr_device_info: tsrDeviceInfo,
                    manager_email: managerEmail
                }
            )
        );
    }

    async SendGuestRegistrationFormAsync(
        guestCityName,
        guestFio,
        guestEmail,
        guestPhoneNumber,
        guestResidentAge,
        guestManagerEmail
    ) {
        return await this.#MakeFetchAsync(
            `${this.privatePath}/kiber-club/guest/form/registration`,
            `post`,
            {
                'authorization' : `${this.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            JSON.stringify(
                {
                    guest_city_name: guestCityName,
                    guest_fio: guestFio,
                    guest_email: guestEmail,
                    guest_phone_number: guestPhoneNumber,
                    guest_resident_age: guestResidentAge,
                    guest_manager_email: guestManagerEmail
                }
            )
        )
    }

}

module.exports = MNController;