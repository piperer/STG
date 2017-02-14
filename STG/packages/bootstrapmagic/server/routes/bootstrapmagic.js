'use strict';

var versions = require('../controllers/versions');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.version.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Versions, app, auth) {

    app.get('/versions', versions.all);
    app.post('/versions', auth.requiresLogin, versions.create);
    app.get('/versions/:versionId', versions.show);
    app.put('/versions/:versionId', auth.requiresLogin, hasAuthorization, versions.update);
    app.delete('/versions/:versionId', auth.requiresLogin, hasAuthorization, versions.destroy);

    // Finish with setting up the articleId param
    app.param('versionId', versions.version);
};
