class FormController {

    async #checkDigit(digit){
        const reg = new RegExp(`^[0-9]+$`);
        return reg.test(digit);
    }

    async InsertInviteFormAsync(DefInviteForm) {
        
        if(!await this.#checkDigit(DefInviteForm.user_id)){
            return null;
        }

        let request = `INSERT INTO user_invite (guser_id, user_id, to_email, to_name, date)
        VALUES (${DefInviteForm.guser_id}, ${DefInviteForm.user_id}, '${DefInviteForm.to_email}', '${DefInviteForm.to_name}', '${DefInviteForm.date}');`;

        return request;
    }

    async InsertFeedbackFormAsync(DefCallbackForm) {

        let request = `INSERT INTO feedback (guser_id, feedbackid, ip, fio, email, telephone, organization, post, address, city, \`text\`, \`comment\`, dateposted, dateedited, datecreated, \`status\`, \`new\`, field_message, referer, \`stats\`, is_deleted)
        VALUES (${DefCallbackForm.guser_id}, ${DefCallbackForm.feedbackid}, \'${DefCallbackForm.ip}\', \'${DefCallbackForm.fio}\', \'${DefCallbackForm.email}\', \'${DefCallbackForm.telephone}\', \'${DefCallbackForm.organization}\', \'${DefCallbackForm.post}\', \'${DefCallbackForm.address}\', \'${DefCallbackForm.city}\', \'${DefCallbackForm.text}\', \'${DefCallbackForm.comment}\', \'${DefCallbackForm.dateposted}\', \'${DefCallbackForm.dateedited}\', \'${DefCallbackForm.datecreated}\', ${DefCallbackForm.status}, ${DefCallbackForm.new}, \'${DefCallbackForm.field_message}\', \'${DefCallbackForm.referer}\', \'${DefCallbackForm.stats}\', ${DefCallbackForm.is_deleted});`;

        return request;
    }

}

module.exports = FormController;