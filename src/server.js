require('dotenv').config();

const fs = require("fs");
const express = require("express");
const logger = require('morgan');
const http = require('http');
const https = require('https');
const httpUtils = require('./utils/httpUtils.js');
const { jwtTokenMiddleware} = require('./middlewares/tokenAuthMiddleware.js');
const billsManagerController = require('./controllers/billsManagerController.js');

const app = express();
const OpenApiValidator = require('express-openapi-validator').OpenApiValidator;

app.use(logger('dev'));

const port = process.env.PORT ? process.env.PORT : 1337;

new OpenApiValidator({
    apiSpec: './openapi/ecdt-api.yml',
    validateRequests: false,
    validateResponses: false
})
.install(app)
.then(() => {
    
    app.post("/insertBill", jwtTokenMiddleware, (req, res) => {
        billsManagerController.insertBill(req, res);
    });
    app.get("/getBills", jwtTokenMiddleware, (req, res) => {
        billsManagerController.getBills(req, res);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || httpUtils.INTERNAL_SERVER_ERROR).json({
            message: err.message,
            errors: err.errors,
        });
    });
    let server = null; 
    if (process.env.ENVIRONMENT == 'development') {
        server = http.createServer(app);
    } else {
        const sslPath = `${process.env.HTTPS_PATH}`;
        const options = {
            key: fs.readFileSync(sslPath + 'privkey.pem'),
            cert: fs.readFileSync(sslPath + 'fullchain.pem')
        };
        server = https.createServer(options, app);  
      }    
    server.listen(port, () => {
        console.log(`Container listening on port ${port}...`);
    });
});
