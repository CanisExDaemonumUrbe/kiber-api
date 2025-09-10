class PreparedInviteForm{

    constructor(body){

        if(body){
            this.id = (!body.id) ? null : body.id;
            this.user_id = (!body.user_id) ? null : body.user_id;
            this.to_email = (!body.to_email) ? "noemail@example.ru" : body.to_email;
            this.to_name = (!body.to_name) ? "" : body.to_name;
        } else {
            this.id = null;
            this.user_id = null;
            this.to_email = "noemail@example.ru";
            this.to_name = "";
        }
    }
}

module.exports = PreparedInviteForm;