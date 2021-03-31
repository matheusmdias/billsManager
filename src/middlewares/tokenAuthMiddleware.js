const httpUtils = require("../utils/httpUtils.js");
const jwt = require('jsonwebtoken');
 

/**
 * Retrieve, decode and validate client jwt code unimplemented
 * @param {req} request body.
 */
const jwtTokenMiddleware = async (req, res, next) =>{
  try {
    if(req.headers.authorization)
    {
      const token = req.headers.authorization.split(' ')[1];
      const jwtPayload = jwt.decode(token);
      
      req.clientInfo = {
        cd_client: jwtPayload.cd_client
      };      
    }
    return next();

  } catch (err) {
    return httpUtils.unauthorizedError(err, res);
  }
}


module.exports = { 
    jwtTokenMiddleware
}