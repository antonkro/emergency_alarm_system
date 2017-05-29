cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "com.dooble.phonertc.PhoneRTC",
        "file": "plugins/com.dooble.phonertc/www/phonertc.js",
        "pluginId": "com.dooble.phonertc",
        "clobbers": [
            "cordova.plugins.phonertc"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-console": "1.0.7",
    "cordova-plugin-compat": "1.1.0",
    "com.dooble.phonertc": "2.1.0"
};
// BOTTOM OF METADATA
});