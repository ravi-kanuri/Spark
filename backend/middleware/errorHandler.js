const errorHandler = (err, req, res, next) => {
    
    const statusCode = res.statusCode;

    
    switch (statusCode) {
        case 400:
            return res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
        case 404:
            return res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
        case 401:
            return res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
        case 403:
            return res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
        case 500:
            return res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
        default:
            console.log("no error"); 
            
    }
};

export default errorHandler;