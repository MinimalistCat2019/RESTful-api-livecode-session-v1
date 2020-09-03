exports.handleMongoDbErrors = (err, req, res, next) => {
      const mongoErrorCodes = {
        11000: {status: 400, msg: "Document already exists"}
      }
      const incomingError = mongoErrorCodes[err.code];
    
      if (incomingError) {
        res.status(incomingError.status).send({msg: incomingError.msg});
      }
      else next(err);
    };


exports.handleServerErrors = (err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error' });
};
