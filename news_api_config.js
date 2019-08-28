require("dotenv").config({
    path: `./.env`,
});

module.exports = {
    resolve: 'news_api_config',
    options: {
        credentials: {
            "private_key": '185145ab685d4df1bd29d79b88c3cc79',
        }
    }
}
