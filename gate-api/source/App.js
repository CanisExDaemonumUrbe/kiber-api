const path = require('node:path');

const cfg = require(`./Config.json`);

const express = require("express");
const Logger = require('./local_modules/logger/Logger');
const NetController = require(`./local_modules/node_ms/NetController`);

const app = express();
const logger = new Logger();
const net = new NetController();

const nodeAlias = `/${cfg[`node_name`]}/v${cfg[`node_version`]}`;

function public(path) {

    return `${nodeAlias}/${path}`;

}

function private(path){

    let pre = `${nodeAlias}/${cfg[`node_private`]}`;

    return `${pre}/${path}`;

}

app.use(express.json());

app.use(public(`static`), express.static(path.join(__dirname, `../static`)));

app.get(public(`static/image/:type/:name/:size`), async (req, res) => {

    let params = req.params;

    let imageLink = await net.GetImageLinkAsync(params);

    if(imageLink){

        res.redirect(imageLink);

    } else{

        res.sendStatus(400);
    }

})

app.get (public(``), async (req, res) => {
    res.send("Начальная страница API")
})

app.use(private(`*`), async (req, res, next) => {

    let token = req.headers[`authorization`];

    (token == cfg[`node_token`] || token == cfg[`tech_token`]) ? next() : res.sendStatus(403);
})

app.get(public(`status`), async (req, res) => {
    
    let result = await net.GetStatusAsync();

    res.json(result);

})

app.get(private(`status`), async (req, res) => {
    
    let result = await net.GetStatusAsync(true);

    res.json(result);

})

//USER-GUEST request - ver 1.0.0
//--------------------------------------------------------------------
// ver 1.0.0

app.post(private(`user/guest/form/registration`), async (req, res) => {

    const body = req.body;

    let result = await net.PostGuestFormRegistrationAsync(body);

    res.json(result);
})

//--------------------------------------------------------------------

// USER-RESIDENT request - ver 1.0.0
//--------------------------------------------------------------------
// ver 1.0.0
app.get(private(`user/auth`), async (req, res) => {

    const headers = req.headers;

    let result = await net.AuthorizationUserAsync(headers);

    res.json(result);

})

//ver 1.0.0
app.get(private(`user/resident/:resident_id/profile`), async (req, res) => {

    const params = req.params;

    let result = await net.GetResidentProfileByUserIdAsync(params);

    res.json(result);

})

//ver 1.0.0
app.get(private(`user/resident/:resident_id/kiberon-logs`), async (req, res) => {

    const params = req.params;

    let result = await net.GetResidentKiberonLogsByUserIdAsync(params);

    res.json(result);

})

app.post(private(`user/resident/form/invite-friend`), async (req, res) => {

    const body = req.body;

    let result = await net.PostResidentFormInviteAsync(body);

    res.json(result);

})

app.post(private(`user/resident/form/feedback`), async (req, res) => {

    const body = req.body;

    let result = await net.PostResidentFormFeedbackAsync(body);

    res.json(result);
})

app.post(private(`user/resident/form/callback`), async (req, res) => {

    const body = req.body;

    let result = await net.PostResidentFormCallbackAsync(body);

    res.json(result);
})

app.post(private(`user/resident/form/tech-support-request`), async (req, res) => {

    const body = req.body;

    let result = await net.PostResidentFormTechSupportAsync(body);

    res.json(result);
})

//ver 1.0.0
app.post(private(`user/change-password`), async (req, res) => {

    const body = req.body;

    let result = await net.UpdateUserPasswordAsync(body);

    res.json(result);
})
//--------------------------------------------------------------------


//CITY? requests
//--------------------------------------------------------------------
//ver 1.0.0
app.get(private(`city/:city_id/feed`), async (req, res) => {

    const params = req.params;

    let result = await net.GetCityFeedByCityIdAsync(params);

    res.json(result);

})

app.get(private(`city/:city_id/kibershop`), async (req, res) => {

    const params = req.params;

    let result = await net.GetCityKibershopByCityIdAsync(params);

    res.json(result);

})

//--------------------------------------------------------------------

app.listen(cfg[`node_port`], async () => {

    let linkedNodes = '';

    for (node in cfg[`linked_nodes`]){
        linkedNodes += `${node}, `;
    }

    let strartLog = `Name = ${cfg[`node_name`]}, Port = ${cfg[`node_port`]}, Version = ${cfg[`node_version`]}}\nLinkedNodes = ${linkedNodes}`;

    logger.createLog('App.js', 'Starting Node', strartLog);

    console.log(`Node online`);

})