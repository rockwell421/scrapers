/*
Scrapes Hackernews with Cheerio
This is an interesting example because Hackernews displays its content in a table format
*/

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();


request('https://news.ycombinator.com', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);

    var parseResults = [];

    //select the html element and the class name
    $('span.comhead').each(function (i, element) {

      //selects the previous element
      var a = $(this).prev();

      //get the rank by parsing the elements two levels above the 'a' element
      var rank = a.parent().parent().text();

      //parse the title
      var title = a.text();

      //parse the href attribute from the 'a' element
      var url = a.attr('fullname');

      //get the subtext children from the next row in the html table
      var subtext = a.parent().parent().next().children('.subtext').children();

      //extract the relevant data from the children
      var points = $(subtext).eq(0).text();
      var username = $(subtext).eq(1).text();
      var comments = $(subtext).eq(2).text();

      //our parse meta data object

      var metadata = {
        rank: parseInt(rank),
        title: title,
        url: url,
        points: parseInt(points),
        username: username,
        comments: parseInt(comments)
      };

      //parse the scrape into an array
      parseResults.push(metadata);
      console.log(metadata);
    });

  }
});
