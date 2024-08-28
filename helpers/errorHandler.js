export function errorHandler() {
    const allowedErrorNames = ["BadParamError", "HttpError"];
    const isProduction = process.env.NODE_ENV === "production";
    const getMessage = (e) => e?.message || e?.toString?.() || "Unknown error.";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return [
        (error, req, res, next) => {
            if (error.name != "ValidationError")
                return next(error);
            next(new HttpError(400, error.details[0].message));
        },
        (error, req, res, next) => {
            if (typeof error === "string")
                error = new Error(error);
            if (!(error instanceof Error))
                error = new Error(getMessage(error));
            const isNotListed = !allowedErrorNames.includes(error.name);
            if (isNotListed)
                console.log("@errorHandler:", error);
            else
                console.log("@errorHandler:", error.name, ":", error.message);
            if (isProduction && isNotListed)
                return res.sendStatus(500);
            switch (error.name) {
                case "HttpError": {
                    return res.status(error?.code ?? 500).json(error);
                }
                case "BadParamError": {
                    return res.status(400).send(error);
                }
                default: {
                    return res.status(500).send(error);
                }
            }
        },
    ];
}
export class HttpError extends Error {
    code;
    constructor(code, message) {
        super();
        this.code = code;
        this.name = "HttpError";
        this.message = message;
    }
}
export class BadParamError extends Error {
    constructor(message) {
        super();
        this.name = "BadParamError";
        this.message = message;
    }
}
