exports.apiSuccess = (res, result, message = "success") => {
    res.status(200).json({
        error: false,
        message: message,
        result: result,
        errors: []
    });
}

exports.apiError = (res, message = "Unable to process request", err, errorCode = 400) => {
    console.log(err);
    res.status(errorCode).json({
        error: true,
        message: message,
        result: {},
        errors: [err]
    });
}
