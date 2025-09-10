const cfg = require(`./Config.json`);

const express = require(`express`);
const Logger = require(`./local_modules/logger/Logger`);
const MailController = require(`./local_modules/mailer/MailController`);

const app = express();
const logger = new Logger();
const mailer = new MailController();

const nodeAlias = `/${cfg[`node_name`]}/v${cfg[`node_version`]}`;

function public(path) {

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
    
    let result = await mailer.GetStatusAsync();

    res.json(result);

})

app.get(private(`status`), async (req, res) => {
    
    let result = await mailer.GetStatusAsync(true);

    res.json(result);

})

app.post(private(`kiber-club/resident/form/recovery-password`), async (req, res) => {

    const body = req.body;

    let result = await mailer.SendRecoveryPasswordMailAsync(body);

    console.log(result);

})

app.post(private(`kiber-club/resident/form/invite-friend`), async (req, res) => {

    const body = req.body;

    let result = await mailer.SendInviteMailAsync(body);

    res.json(result);

})

app.post(private(`kiber-club/resident/form/feedback`), async (req, res) => {

    const body = req.body;

    let result = await mailer.SendFeedbackMailAsync(body);

    res.json(result);

})

app.post(private(`kiber-club/resident/form/callback`), async (req, res) => {

    const body = req.body;

    let result = await mailer.SendCallbackMailAsync(body);

    res.json(result);

})

app.post(private(`kiber-club/resident/form/tech-support-request`), async (req, res) => {

    const body = req.body;

    let result = await mailer.SendTechSupportRequestMailAsync(body);

    res.json(result);

})

app.post(private(`kiber-club/guest/form/registration`), async (req, res) => {

    const body = req.body;

    let result = await mailer.SendRegistrationMailAsync(body);

    res.json(result);

})

app.listen(cfg[`node_port`], async () => {

    let linkedNodes = '';

    for (node in cfg[`linked_nodes`]){
        linkedNodes += `${node}, `;
    }

    let strartLog = `Name = ${cfg[`node_name`]}, Port = ${cfg[`node_port`]}, Version = ${cfg[`node_version`]}}\nLinkedNodes = ${linkedNodes}`;

    logger.createLog('App.js', 'Starting Node', strartLog);

    console.log(`Node online`);

})