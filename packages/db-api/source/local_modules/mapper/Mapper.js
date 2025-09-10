const RawUser = require(`./models/user/Raw`);
const RawShedule = require(`./models/shedule/Raw`);
const RawGroup = require(`./models/group/Raw`);
const RawLocation = require(`./models/location/Raw`);
const RawModule = require(`./models/module/Raw`);
const RawCity = require(`./models/city/Raw`);
const RawLog = require(`./models/kiberonLog/Raw`);
const RawNews = require(`./models/news/Raw`);
const RawItem = require(`./models/item/Raw`);
const RawInviteForm = require(`./models/forms/inviteForm/Raw`);
const RawFeedbackForm = require(`./models/forms/feedbackForm/Raw`);

const JUser = require(`./models/user/Prepared`);
const JShedule = require(`./models/shedule/Prepared`);
const JGroup = require(`./models/group/Prepared`);
const JLocation = require(`./models/location/Prepared`);
const JModule = require(`./models/module/Prepared`);
const JCity = require(`./models/city/Prepared`);
const JLog = require(`./models/kiberonLog/Prepared`);
const JNews = require(`./models/news/Prepared`);
const JItem = require(`./models/item/Prepared`);
const JInviteForm = require(`./models/forms/inviteForm/Prepared`);
const JFeedbackForm = require(`./models/forms/feedbackForm/Prepared`);


class Mapper {

    async createJUserAsync(modelList){
        let result = [];
        for (let i = 0; i < modelList.length; i++){
            let user = new JUser(new RawUser(modelList[i]));
            result.push(user);
        }
        return result;
    }

    async createJSheduleAsync(modelList){
        let result = [];
        for (let i = 0; i < modelList.length; i++){
            let shedule = new JShedule(new RawShedule(modelList[i]));
            result.push(shedule);
        }
        return result;
    }

    async createJGroupAsync(modelList){
        let result = [];
        for (let i = 0; i < modelList.length; i++){
            let group = new JGroup(new RawGroup(modelList[i]));
            result.push(group);
        }
        return result;
    }

    async createJLocationAsync(modelList){
        let result = [];
        for (let i = 0; i < modelList.length; i++){
            let location = new JLocation(new RawLocation(modelList[i]));
            result.push(location);
        }
        return result;
    }

    async createJModuleAsync(modelList){
        let result = [];
        for (let i = 0; i < modelList.length; i++){
            let module = new JModule(new RawModule(modelList[i]));
            result.push(module);
        }
        return result;
    }

    async createJCityAsync(modelList){
        let result = [];
        for (let i = 0; i < modelList.length; i++){
            let city = new JCity(new RawCity(modelList[i]));
            result.push(city);
        }
        return result;
    }

    async createJLogAsync(modelList){
        let result = [];
        for (let i = 0; i < modelList.length; i++){
            let log = new JLog(new RawLog(modelList[i]));
            result.push(log);
        }
        return result;
    }

    async createJFeedAsync(modelList){
        let result = [];
        for (let i = 0; i < modelList.length; i++){
            let news = new JNews(new RawNews(modelList[i]));
            result.push(news);
        }
        return result;
    }

    async createJKibershopAsync(modelList){
        let result = [];
        for (let i = 0; i < modelList.length; i++){
            let item = new JItem(new RawItem(modelList[i]));
            result.push(item);
        }
        return result;
    }

    async createInviteFormAsync(modelList){
        let result = [];
        for (let i = 0; i < modelList.length; i++) {
            let form = new RawInviteForm(new JInviteForm(modelList[i]));
            result.push(form); 
        }
        return result;
    }

    async createFeedbackFormAsync(modelList){
        let result = [];
        for (let i = 0; i < modelList.length; i++) {
            let form = new RawFeedbackForm(new JFeedbackForm(modelList[i]));
            result.push(form);
        }
        return result;
    }

}

module.exports = Mapper;