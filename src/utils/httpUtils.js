const messageErrors = {
  400: "400 - Invalid parameters",
  401: "401 - Unauthorized",
  404: "404 - Not found",
  429: "429 - Too many requets",
  500: "500 - Internal server error"
}

//200
const OK = 200;

//400
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404; 
const TOO_MANY_REQUESTS = 429;

//500
const INTERNAL_SERVER_ERROR = 500;

const unauthorizedError = async(err, res) =>{
  return res.status(UNAUTHORIZED).json(err);
}

const getErrorMessage = (code)=>{
  if(messageErrors[code]){
    return {code: code, message:messageErrors[code]};
  }else{
    return {code:500, message: messageErrors[500]};
  }
}

const formatErrorResponse = (error, request, response) => {
  const httpError = getErrorMessage(error);
  return response.status(httpError.code).json({error: httpError.message});
};


module.exports = {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  INTERNAL_SERVER_ERROR,
  getErrorMessage,
  unauthorizedError,
  formatErrorResponse

}