class PreparedFeedbackForm{

    constructor(body){

        if(body){

            this.id = (!body.id) ? null : body.id;
            this.feedbackid = (!body.feedbackid) ? 21705 : body.feedbackid;
            this.ip = (!body.ip) ? " " : body.ip;
            this.email = (!body.email) ? " " : body.email;
            this.user_name = (!body.user_name) ? " " : body.user_name;
            this.user_phone = (!body.user_phone) ? " " : body.user_phone;
            this.field_message = (!body.field_message) ? " " : body.field_message;

        } else {

            this.id = null;
            this.feedbackid = 21705;
            this.ip = " ";
            this.email = " ";
            this.user_name = " ";
            this.user_phone = " ";
            this.field_message = " ";

        }

    }

}

module.exports = PreparedFeedbackForm;
