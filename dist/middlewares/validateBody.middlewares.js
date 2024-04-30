"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateBody = void 0;
class ValidateBody {
    static execute(schema) {
        return (req, res, next) => {
            req.body = schema.parse(req.body);
            return next();
        };
    }
}
exports.ValidateBody = ValidateBody;
