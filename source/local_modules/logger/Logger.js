const fs = require('fs');
const path = require('path');

class Logger{

    constructor(){

        this.logsFolder = path.join(__dirname, '../../../logs');
        
        if(!fs.existsSync(this.logsFolder)){
            fs.mkdirSync(this.logsFolder);
        }

        this.logsPath = `${this.logsFolder}/logs.log`;
        this.ws = fs.createWriteStream(this.logsPath, {flags: 'a'});

    }

    async createLog (place, operation, message) {

        let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');


        let log = `###----------------------------------------###\n${date} :: ${place} :: ${operation}\n${message}\n###----------------------------------------###`;

        this.ws.write('\n'+log);

        return log;
        
    }

}

module.exports = Logger;