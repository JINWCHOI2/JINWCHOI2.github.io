const expressJwt = require('express-jwt');
const config = require('config.json');
//const userService = require('../../../src/main/java/com/example/findmytutor2/models/PersonService');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        //JWT authentication is used on all routes except for the authenticate and register routes which are public.
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};