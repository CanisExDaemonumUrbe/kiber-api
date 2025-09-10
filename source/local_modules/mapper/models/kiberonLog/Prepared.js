class PreparedLog{

    constructor(DefaultLog) {
        if(DefaultLog){

            this.id = (!DefaultLog.id) ? null : DefaultLog.id;
            this.date = (!DefaultLog.date) ? '1999-11-30' : DefaultLog.date;
            this.sign = (!DefaultLog.sign) ? -1 : DefaultLog.sign;
            this.amount = (!DefaultLog.amount) ? 0 : DefaultLog.amount;
            this.balance = (!DefaultLog.balance) ? 0 : DefaultLog.balance;
            this.comment = (!DefaultLog.comment) ? '' : DefaultLog.comment;
        }
    }
}

module.exports = PreparedLog;