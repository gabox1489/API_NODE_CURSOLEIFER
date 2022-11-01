const express = require('express');
require("dotenv").config();
const cors = require('cors');
const morganBody = require('morgan-body');
const { IncomingWebhook } = require('@slack/webhook');
const dbConnectNoSql = require('./config/mongo');
const app = express()

const ENGINE_DB = process.env.ENGINE_DB;

app.use(cors())
app.use(express.json())
app.use(express.static("storage")) //para usar recursos publicos estaticos

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

const loggerStream = {
    write: message => {
        webhook.send({
            text: message
        })
        console.log('Capturando el LOG', message);
        //logger.info(message);
    },
};


morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function(req, res) {
        return res.statusCode < 400
    }
})

const port = process.env.PORT || 3000

//AQUI INVOCAMOS LAS RUTAS:
app.use("/api", require("./routes"))

app.listen(port, () => {
    console.log(`Tu app esta lista en http://localhost:${port}`);
});

(ENGINE_DB === 'nosql') ? dbConnectNoSql(): dbConnectMysql();