const express = require(`express`);

const cfg = require(`./Config.json`);
const Logger = require(`./local_modules/logger/Logger`);
const StaticController = require(`./local_modules/StaticFilesController`);

const app = express();
const logger = new Logger();
const static = new StaticController();

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

   //next();
})

app.get(public(`status`), async (req, res) => {
    
    let result = await static.GetStatusAsync();

    res.json(result);

})

app.get(private(`status`), async (req, res) => {
    
    let result = await static.GetStatusAsync(true);

    res.json(result);

})

app.get(public(`image/:type/:name/:size`), async (req, res) => {

    const params = req.params;

    let result = await static.getImageAsync(params);

    if (result) {
        res.sendFile(result);
    } else {
        res.sendStatus(400);
    }

})

app.listen(cfg[`node_port`], async () => {

    let linkedNodes = '';

    for (node in cfg[`linked_nodes`]){
        linkedNodes += `${node}, `;
    }

    let strartLog = `Name = ${cfg[`node_name`]}, Port = ${cfg[`node_port`]}, Version = ${cfg[`node_version`]}\nLinkedNodes = ${linkedNodes}`;

    logger.createLog('App.js', 'Starting Node', strartLog);

    console.log(`Node online`);

})
