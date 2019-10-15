var utilities = require("./utils/Utils");

function versionCheck(req, res, next) {
    if (req.params.version == null || typeof req.params.version == "undefined") {
        return res.json({ _ok: false, message: "Missing API version!" });
    }
    else {
        if (typeof req.params.version == "string" || typeof req.params.version == "number") {
            if (typeof req.params.version == "string") {
                var formattedVersion = req.params.version.trim().toLowerCase();

                // Allow for zendesk api callbacks to always use latest api version
                if (formattedVersion == "default") {
                    return next();
                }
            }

            var version = utilities.parseInteger(req.params.version);

            // Verify the api version in the request path
            if (isNaN(version) || version < 1) {
                return res.json({ _ok: false, _message: "Invalid API version!" });
            }

            if (version < process.env.APP_VERSION) {
                return res.json({ _ok: false, _message: "Please update your application!" });
            }

            if (version > process.env.APP_VERSION) {
                return res.json({ _ok: false, _message: "Unsupported API version!" });
            }

            return next();
        }
        else {
            return res.json({ _ok: false, _message: "Invalid API version!" });
        }
    }
};

export default versionCheck;
