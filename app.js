var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();


//Scrapes Futurism

request('http://www.futurism.com', (err, res, body) =>{

  if(!err && res.statusCode == 200) {
    let parseresults = [];
    let $ = cheerio.load(body);

    $('a.title', 'div.daily').each(function() {

      let title = $(this).attr('title');
      let url = $(this).attr('href');

      console.log(title);
      console.log(url);

    });
  }
});


//Scrapes Phys.org
//
// request('http://www.phys.org', (err, res, body) =>{
//
//   if(!err && res.statusCode == 200) {
//     let parseresults = [];
//     let $ = cheerio.load(body);
//
//     //needs modification
//     $('a.title', 'div.daily').each(function() {
//
//       let title = $(this).attr('title');
//       let url = $(this).attr('href');
//
//       console.log(title, href);
//
//     });
//   }
// });
