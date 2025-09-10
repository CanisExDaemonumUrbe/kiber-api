const cfg = require(`./Config.json`);

const express = require(`express`);
const Logger = require(`./local_modules/logger/Logger`);
const DatabaseController = require(`./local_modules/dbms/DatabaseController`);

const app = express();
const logger = new Logger();
const database = new DatabaseController();

const nodeAlias = `/${cfg[`node_name`]}/v${cfg[`node_version`]}`;

function public(path){

    return `${nodeAlias}/${path}`;

}

function private(path){

    let pre = `${nodeAlias}/${cfg[`node_private`]}`;

    return `${pre}/${path}`;

}

app.use(express.json());

app.use(private(`*`), async (req, res, next) => {

    let token = req.headers[`authorization`];

    (token == cfg[`node_token`] || token == cfg[`tech_token`]) ? next() : res.sendStatus(403);

})

app.get(public(`status`), async (req, res) => {
    
    let result = await database.GetStatusAsync();

    res.json(result);

})

app.get(private(`status`), async (req, res) => {
    
    let result = await database.GetStatusAsync(true);

    res.json(result);

})

//USER requests
//--------------------------------------------------------------------

// ver - 1.0.0
app.get(private(`user/auth`), async (req, res) => {

    const headers = req.headers;

    let result = await database.AuthorizationUserAsync(headers);

    res.json(result);

})

//ver - 1.0.0
app.get(private(`user/:user_id`), async (req, res) => {

    const params = req.params;

    let result = await database.GetUserByUserIdAsync(params);

    res.json(result);

})

//ver - 1.0.0
app.post(private(`user/change-password`), async (req, res) => {

    const body = req.body;

    let result = await database.ChangePasswordUserAsync(body);

    res.json(result);

})

//--------------------------------------------------------------------


//SHEDULE request
//--------------------------------------------------------------------
//ver - 1.0.0
app.get(private(`shedule/:group_id`), async (req, res) => {

    const params = req.params;

    let result = await database.GetSheduleLogByGroupIdAsync(params);

    res.json(result);

})

//--------------------------------------------------------------------


//GROUP requests
//--------------------------------------------------------------------
//ver - 1.0.0
app.get(private(`group/:group_id`), async (req, res) => {

    const params = req.params;

    let result = await database.GetGroupByGroupIdAsync(params);

    res.json(result);
})

//--------------------------------------------------------------------



//LOCATION requests
//--------------------------------------------------------------------
//ver - 1.0.0
app.get(private(`location/:location_id`), async (req, res) => {

    const params = req.params;

    let result = await database.GetLocationByLocationIdAsync(params);

    res.json(result);

})

//--------------------------------------------------------------------


//MODULE requests
//--------------------------------------------------------------------
//ver 1.0.0
app.get(private(`module/:module_id`), async (req, res) => {

    const params = req.params;

    let result = await database.GetModuleByModuleIdAsync(params);

    res.json(result);
})

//--------------------------------------------------------------------


//CITY requests
//--------------------------------------------------------------------
// ver 1.0.0
app.get(private(`city/:city_id`), async (req, res) => {

    const params = req.params;

    let result = await database.GetCityByCityIdAsync(params);

    res.json(result);
})

//--------------------------------------------------------------------


//FEED requests
//--------------------------------------------------------------------
// ver 1.0.0
app.get(private(`feed/:city_id`), async (req, res) => {

    const params = req.params;

    let result = await database.GetFeedByCityIdAsync(params);

    res.json(result);

})

//--------------------------------------------------------------------


//KIBERSHOP requests
//--------------------------------------------------------------------
//ver 1.0.0
app.get(private(`kibershop/:city_id`), async (req, res) => {

    const params = req.params;

    let result = await database.GetKibershopByCityIdAsync(params);

    res.json(result);

})
//--------------------------------------------------------------------


//KIBERON-LOGS requests
//--------------------------------------------------------------------
//ver 1.0.0
app.get(private(`kiberon-logs/:user_id`), async (req, res) => {

    const params = req.params;

    let result = await database.GetKiberonHistoryByUserIdAsync(params);

    res.json(result);

})

//--------------------------------------------------------------------


//FORMS requests
//--------------------------------------------------------------------
//ver 1.0.0

app.post(private(`form/invite`), async (req, res) => {

    const body = req.body;

    let result = await database.InsertInviteForm(body);

    res.json(result);

})

app.post(private(`form/callback`), async (req, res) => {

    const body = req.body;

    let result = await database.InsertFeedbackForm(body);

    res.json(result);

})

app.post(private(`form/feedback`), async (req, res) => {

    const body = req.body;

    let result = await database.InsertFeedbackForm(body);

    res.json(result);

})


//--------------------------------------------------------------------


app.listen(cfg[`node_port`], async () => {

    let linkedNodes = '';

    for (node in cfg[`linked_nodes`]){
        linkedNodes += `${node}, `;
    }

    let strartLog = `Name = ${cfg[`node_name`]}, Port = ${cfg[`node_port`]}, Version = ${cfg[`node_version`]}\nLinkedNodes = ${linkedNodes}`;

    logger.createLog('App.js', 'Starting Node', strartLog);

    console.log(`Node online`);

})