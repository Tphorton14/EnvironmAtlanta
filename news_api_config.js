require("dotenv").config({
    path: './.env',
});

module.exports = {
    resolve: 'news_api_config',
    options: {
        credentials: {
            "private_key": process.env.private_key
        }
    }
}
