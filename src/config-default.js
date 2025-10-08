export default {
    interface: 'RandomVerse',
    apiUrl: 'https://api.biblesupersearch.com',

    _urlDefaultNotice: function () {
        if (window.console) {
            console.log('----------------------------------------------------------------------');
            console.log('NOTE TO WEBMASTER: You are using the primary Bible SuperSearch API.');
            console.log('This requires a connection between your website and ours,');
            console.log('and LIMITS you to 1000 hits per day.');
            console.log('We recommend installing the Bible SuperSearch API on your website.');
            console.log('For details, please visit: https://www.biblesupersearch.com/api');
            console.log('Download for FREE: https://www.biblesupersearch.com/downloads/');
            console.log('----------------------------------------------------------------------');
            console.log();
        }
    },
    _urlLocalNotice: function () {
        if (window.console) {
            console.log(
                'Congratulations, you are successfully using your own instance of the Bible SuperSearch API!',
            );
        }
    },
    _downloadDisabledNotice: function () {
        if (window.console) {
            console.log('----------------------------------------------------------------------');
            console.log(
                'NOTE TO WEBMASTER: Your Bible SuperSearch API instance has Bible downloads disabled.',
            );
            console.log(
                "Please enable this, otherwise important features such as the downloads dialog won't work.",
            );
            console.log('----------------------------------------------------------------------');
            console.log();
        }
    },
};
