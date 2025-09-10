const cfg = require('./mailsConfig.json')

const NodeMailer = require('nodemailer')
const Packager = require(`../packager/Packager`);
const Logger = require(`../logger/Logger`);

const packager = new Packager();
const logger = new Logger();

const usedMail = cfg['app'];


class MailController {

    constructor() {

        this.transporter = NodeMailer.createTransport({
            host: usedMail['host'],
            port: usedMail['port'],
            secure: usedMail['secure'],
            auth: {
                user: usedMail['auth']['user'],
                pass: usedMail['auth']['pass']
            }
        });

        this.mainSender = usedMail['auth']['user'];

    }

    async #SendMailAsync(sender, subject, text, html, addressee){

        let result;

        try
        {

            let sendResult = await this.transporter.sendMail({
                from: sender,
                to: addressee,
                subject: subject,
                text: text,
                html: html
            });

            result = await packager.packObjectAsync(`ok`, sendResult.response);

        } catch (err) {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('MailController', 'SendMailAsync', `${err.message}`);

        } finally {

            return result;
        }

    }

    async GetStatusAsync(privatePath = false) {

        return await packager.packObjectAsync(`ok`, `online`);
    }

    async SendRecoveryPasswordMailAsync(){

        let response = await this.transporter.sendMail({
            from: 'test',
            to: 'd.gelimyanov@yandex.ru',
            subject: 'subject-test',
            text: 'text-test',
            html: '<b>html-test</b>'
        });

        return response.response;

    }

    async SendInviteMailAsync(body){

        let result = null;

        try{
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

            let friendSubject = `Ваш друг приглашает вас в KIBERone!`;
            let friendText = `Ваш друг приглашает вас в KIBERone в самую современную КиберШколу для изучения программирования и цифровых технологий. Запишитесь на бесплатное пробное занятие и получите первую фирменную валюту КиберШколы, которую можешь обменять на классный мерч. Наш официальный сайт -  https://kiber-one.com`;
            let friendHtml = `<p><span>Ваш друг приглашает вас в KIBERone в самую современную КиберШколу для изучения программирования и цифровых технологий. Запишитесь на бесплатное пробное занятие и получите первую фирменную валюту КиберШколы, которую можешь обменять на классный мерч. Наш официальный сайт - &nbsp;</span><a data-link-id=\"1\" target=\"_blank\" rel=\"noopener noreferrer\" data-spam-item-id=\"2\">https://kiber-one.com</a></p>`;

            let friendResponse = await this.#SendMailAsync(
                this.mainSender,
                friendSubject,
                friendText,
                friendHtml,
                friendEmail
            );


            let managerSubject = `Личный кабинет резидента: приглашение друга`;
            
            let managerText = `
            КОНТАКТЫ ДРУГА\n
            ФИО родителя: ${friendParentFIO}\n
            ФИО ребёнка: ${friendResidentName}\n
            Номер: ${friendPhone}\n
            Почта: ${friendEmail}\n
            ИНФОРМАЦИЯ ОБ ОТПРАВИТЕЛЕ\n
            ФИО родителя: ${residentParentFIO}\n
            ФИО ребёнка: ${residentName}\n
            Возраст ребёнка: ${residentAge}\n
            Город: ${cityName}\n
            Локация: ${locationName}\n
            Группа: ${groupName}\n
            Номер: ${residentParentPhone}\n
            Email: ${residentProfileEmail}`;

            let managerHtml = `
            <p><strong>КОНТАКТЫ ДРУГА<br /></strong></p>
            <p>ФИО родителя: ${friendParentFIO}<br/>ФИО ребёнка: ${friendResidentName}<br/>Номер: ${friendPhone}<br/>Почта: ${friendEmail}</p>
            <p><strong>ИНФОРМАЦИЯ ОБ ОТПРАВИТЕЛЕ</strong></p>
            <p>ФИО родителя: ${residentParentFIO}<br/>ФИО ребёнка: ${residentName}<br/>Возраст ребёнка: ${residentAge}<br/>Город: ${cityName}<br/>Локация: ${locationName}<br/>Группа: ${groupName}<br/>Номер: ${residentParentPhone}<br/>Email: ${residentProfileEmail}<br/></p>
            `;

            let managerResponse = await this.#SendMailAsync(
                this.mainSender,
                managerSubject,
                managerText,
                managerHtml,
                managerEmail
            )

            let selfStatus;
            
            if(friendResponse['status'] == `ok` && managerResponse['status'] == `ok`){
                selfStatus = `ok`;
            } else if(friendResponse['status'] == `error` && managerResponse['status'] == `error`){
                selfStatus = `error`;
            } else {
                selfStatus = 'warning';
            }

            result = await packager.packObjectAsync(
                selfStatus,
                {
                    friend_response: friendResponse,
                    manager_response: managerResponse
                }
            );

        } catch (err) {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('MailController', 'SendInviteMailAsync', err.message);

        } finally {

            return result;
        }

    }

    async SendFeedbackMailAsync(body){

        let result = null;

        try{

            let residentParentFIO = body.resident_parent_fio;
            let residentName = body.resident_name;
            let residentAge = body.resident_age;
            let residentProfileEmail = body.resident_profile_email;
            let residentParentPhone = body.resident_parent_phone;
            let cityName = body.city_name;
            let locationName = body.location_name;
            let groupName = body.group_name;

            let feedbackName = body.feedback_name;
            let feedbackPhone = body.feedback_phone;
            let feedbackEmail = body.feedback_email;
            let feedbackMessage = body.feedback_message;

            let managerEmail = body.manager_email;

            let subject = `Личный кабинет резидента: сообщение от резидента`;

            let text = `
            ИНФОРМАЦИЯ ИЗ ФОРМЫ\n
            Имя из формы: ${feedbackName}\n
            Номер из формы: ${feedbackPhone}\n
            Email из формы: ${feedbackEmail}\n
            Текст сообщения из формы: ${feedbackMessage}\n
            ИНФОРМАЦИЯ ОБ ОТПРАВИТЕЛЕ\n
            ФИО родителя: ${residentParentFIO}\n
            ФИО ребёнка: ${residentName}\n
            Возраст ребёнка: ${residentAge}\n
            Город: ${cityName}\n
            Локация: ${locationName}\n
            Группа: ${groupName}\n
            Номер: ${residentParentPhone}\n
            Email: ${residentProfileEmail}`;

            let html = `
            <p><strong>ИНФОРМАЦИЯ ИЗ СООБЩЕНИЯ</strong></p>
            <p>Имя из формы: ${feedbackName}<br/>Номер из формы: ${feedbackPhone}<br />Email из формы: ${feedbackEmail}<br />Текст сообщения из формы: ${feedbackMessage}</p>
            <p><strong>ИНФОРМАЦИЯ ОБ ОТПРАВИТЕЛЕ</strong></p>
            <p>ФИО родителя: ${residentParentFIO}<br/>ФИО ребёнка: ${residentName}<br/>Возраст ребёнка: ${residentAge}<br/>Город: ${cityName}<br/>Локация: ${locationName}<br/>Группа: ${groupName}<br/>Номер: ${residentParentPhone}<br/>Email: ${residentProfileEmail}<br/></p>
            `;

            let response = await this.#SendMailAsync(
                this.mainSender,
                subject,
                text,
                html,
                managerEmail
            )

            result = response;

        } catch(err) {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('MailController', 'SendFeedbackMailAsync', err.message);

        } finally {

            return result;
        }

    }

    async SendCallbackMailAsync(body){

        let result;

        try{

            let residentParentFIO = body.resident_parent_fio;
            let residentName = body.resident_name;
            let residentAge = body.resident_age;
            let residentProfileEmail = body.resident_profile_email;
            let residentParentPhone = body.resident_parent_phone;
            let cityName = body.city_name;
            let locationName = body.location_name;
            let groupName = body.group_name;

            let callbackName = body.callback_name;
            let callbackPhone = body.callback_phone;

            let managerEmail = body.manager_email;

            let subject = `Личный кабинет резидента: заказ обратного звонка`;

            let text = `
            ИНФОРМАЦИЯ ИЗ ФОРМЫ\n
            Имя из формы: ${callbackName}\n
            Номер из формы: ${callbackPhone}\n
            ИНФОРМАЦИЯ ОБ ОТПРАВИТЕЛЕ\n
            ФИО родителя: ${residentParentFIO}\n
            ФИО ребёнка: ${residentName}\n
            Возраст ребёнка: ${residentAge}\n
            Город: ${cityName}\n
            Локация: ${locationName}\n
            Группа: ${groupName}\n
            Номер: ${residentParentPhone}\n
            Email: ${residentProfileEmail}`;

            let html = `
            <p><strong>ИНФОРМАЦИЯ ИЗ СООБЩЕНИЯ</strong></p>
            <p>Имя из формы: ${callbackName}<br/>Номер из формы: ${callbackPhone}</p>
            <p><strong>ИНФОРМАЦИЯ ОБ ОТПРАВИТЕЛЕ</strong></p>
            <p>ФИО родителя: ${residentParentFIO}<br/>ФИО ребёнка: ${residentName}<br/>Возраст ребёнка: ${residentAge}<br/>Город: ${cityName}<br/>Локация: ${locationName}<br/>Группа: ${groupName}<br/>Номер: ${residentParentPhone}<br/>Email: ${residentProfileEmail}<br/></p>
            `;

            let response = await this.#SendMailAsync(
                this.mainSender,
                subject,
                text,
                html,
                managerEmail
            )

            result = response;


        } catch (err) {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('MailController', 'SendCallabckMailAsync', err.message);

        } finally {

            return result;
        }

    }

    async SendTechSupportRequestMailAsync(body){

        let result;

        try {

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


            let subject = `Мобильное приложение: запрос в техподдержку`;

            let text = `
            ИНФОРМАЦИЯ ИЗ ФОРМЫ\n
            Email обратной связи: ${tsrEmail}\n
            Текст сообщение: ${tsrMessage}\n
            Информация об устройстве: ${tsrDeviceInfo}
            ИНФОРМАЦИЯ ОБ ОТПРАВИТЕЛЕ\n
            ФИО родителя: ${residentParentFIO}\n
            ФИО ребёнка: ${residentName}\n
            Возраст ребёнка: ${residentAge}\n
            Город: ${cityName}\n
            Локация: ${locationName}\n
            Группа: ${groupName}\n
            Номер: ${residentParentPhone}\n
            Email: ${residentProfileEmail}`;

            let html = `
            <p><strong>ИНФОРМАЦИЯ ИЗ СООБЩЕНИЯ</strong></p>
            <p>Email обратной связи: ${tsrEmail}<br/>Текст сообщение: ${tsrMessage}<br/>Информация об устройстве: ${tsrDeviceInfo} </p>
            <p><strong>ИНФОРМАЦИЯ ОБ ОТПРАВИТЕЛЕ</strong></p>
            <p>ФИО родителя: ${residentParentFIO}<br/>ФИО ребёнка: ${residentName}<br/>Возраст ребёнка: ${residentAge}<br/>Город: ${cityName}<br/>Локация: ${locationName}<br/>Группа: ${groupName}<br/>Номер: ${residentParentPhone}<br/>Email: ${residentProfileEmail}<br/></p>
            `;

            let response = await this.#SendMailAsync(
                this.mainSender,
                subject,
                text,
                html,
                managerEmail
            )

            result = response;


        } catch {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('MailController', 'SendTechSupportMailAsync', err.message);

        } finally {

            return result;
        }

    }

    async SendRegistrationMailAsync(body){

        let result;

        try {

            let guestCityName = body.guest_city_name;
            let guestFio = body.guest_fio;
            let guestEmail = body.guest_email;
            let guestPhoneNumber = body.guest_phone_number;
            let guestResidentAge = body.guest_resident_age;
            let guestManagerEmail = body.guest_manager_email;

            let techSubject = `Мобильное приложение: заявка на регистрацию`;

            let techText = `
            ИНФОРМАЦИЯ ИЗ ФОРМЫ\n
            Название города: ${guestCityName}\n
            ФИО: ${guestFio}\n
            Контактная почта: ${guestEmail}\n
            Контактный номер: ${guestPhoneNumber}\n
            Возраст ребёнка: ${guestResidentAge}`;

            let techHtml = `
            <p><strong>ИНФОРМАЦИЯ ИЗ СООБЩЕНИЯ</strong></p>
            <p>Название города: ${guestCityName}<br/>ФИО: ${guestFio}<br/>Контактная почта: ${guestEmail}<br/>Контактный номер: ${guestPhoneNumber}<br/>Возраст ребёнка: ${guestResidentAge}</p>`;

            let techResult = await this.#SendMailAsync(
                this.mainSender,
                techSubject,
                techText,
                techHtml,
                guestManagerEmail
            )


            let guestSubject = `KIBERone club - заявка на регистрацию`;

            let guestText = `
            Здравствуйте! Мы получили вашу заявку на регистрацию в KIBERone club.\n
            Скоро мы свяжемся с вами, чтобы продолжить регистрацию. А пока вы ждёте, предлагаем получше узнать о нас, ознакомившись с информацией на нашем официальном сайте - kiber-one.com`;

            let guestHtml = `
            <p><strong>Здравствуйте! Мы получили вашу заявку на регистрацию в KIBERone club.</strong></p>
            <p>Скоро мы свяжемся с вами, чтобы продолжить регистрацию. А пока вы ждёте, предлагаем получше узнать о нас, ознакомившись с информацией на нашем официальном сайте - <a href="https://kiber-one.com/">kiber-one.com</a></p>`;

            let guestResult = await this.#SendMailAsync(
                this.mainSender,
                guestSubject,
                guestText,
                guestHtml,
                guestEmail
            )

            result = await packager.packObjectAsync(
                `ok`,
                {
                    manager_result: techResult,
                    guest_result: guestResult
                }
            )

        } catch {

            result = await packager.packObjectAsync(`error`, err.message);
            logger.createLog('MailController', 'SendRegistrationMailAsync', err.message);

        } finally {

            return result;
        }

    }
}

module.exports = MailController