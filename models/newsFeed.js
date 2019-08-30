
$(document).ready(function () {
    var NewsAPI = require("newsapi");
    const newsapi = new NewsAPI('185145ab685d4df1bd29d79b88c3cc79');
    var today = new Date();
    var ddToday = String(today.getDate()).padStart(2, '0');
    var mmToday = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyyToday = today.getFullYear();

    today = yyyyToday + '-' + ddToday + '-' + mmToday;
    var todayString = today.toDateString;
    console.log(todayString);

    var lastWeek = new Date();
    var ddLastWeek = String(lastWeek.getDate() - 7).padStart(2, '0');
    var mmLastWeek = String(lastWeek.getMonth() + 1).padStart(2, '0');
    var yyyyLastWeek = lastWeek.getFullYear();
    lastWeek = yyyyLastWeek; + '-' + ddLastWeek + '-' + mmLastWeek;
    var lastWeekString = lastWeek.toDateString;
    console.log(lastWeekString);

    // To query /v2/everything
    // You must include at least one q, source, or domain
    newsapi.v2.everything({
        q: 'recycling, Atlanta, environment, green',
        sources: 'treehugger,grist, national geographic, huffpost, greepeace',
        domains: 'treehugger.com, grist.org, nationalgeographic.com/environment/, huffpost.com/impact/green/, greenpeace.org/usa/',
        from: lastWeekString,
        to: todayString,
        language: 'en',
        sortBy: 'date',
        page: 2
    }).then(response => {

        console.log(response);
        var article = [
            `<th scope="row">${response.title}</th>
            <th scope="row">${response.description} </th>
            <th scope="row">${response.url}</th>
            <th scope="row">${response.publishedAt}</th>
            <th scope="row">${response.content}</th>`
        ];
        
        console.log(article);
    }

//         $(".recyling-news-feed").append(article);
//     const GoogleNewsRss = require('google-news-rss');
//     const googleNews = new GoogleNewsRss();
 
// googleNews
//    .search('unicorns')
//    .then(resp => console.log(resp));
);
});

