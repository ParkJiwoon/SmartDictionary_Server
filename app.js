var express = require('express');
var app = express();
var port = process.env.PORT || 88;  // Heroku에서 사용하는 포트 설정

app.listen(port, function() {
    console.log('Server On!');
});

app.get('/', function(req, res) {
    res.write("Hello, this is smart dictionary team");
    res.end();
});

app.post('/', function(req, res) {
    req.on('data', (data) => {
      var inputData = JSON.parse(data);
             
      /** To do 1. 데이터베이스 쿼리문을 통해 뜻 가져오는 작업 추가 */

      /** To do 2. 사용 빈도 확인을 위해 데이터베이스에 넣는 작업 추가 */

      let words = {
          word: inputData.word,
          description: inputData.word + " 뜻",
          link: "www.naver.com"
      }

      console.log(words);
      res.json(words);
      res.end();
    });
});



// 우리말샘 오픈 API 이용 //
// var key = 'DCBF129679642CC2140B4946338DEC0C';
// q = encodeURI('나무');
// var url = 'https://opendict.korean.go.kr/api/search?&key=' + key + '&q=' + q;

// var request = require('request');
// var xml2js = require('xml2js');

// var parser = new xml2js.Parser();

// request.get(url, function(err, res, body) {
//   parser.parseString(body, function(err, result) {
//     console.log(result.channel.item[0].word[0]);
//     console.log(result.channel.item[0].sense[0].definition[0]);
//     console.log(result.channel.item[0].sense[0].link[0]);
//   });
// });

 
 
// 네이버 백과사전 오픈 API ///
// var client_id = 'W8zmbB6bAGyXWmlr7d8O';
// var client_secret = 'u8yw58ggR8';
// app.get('/search/encyc', function (req, res) {
//    var api_url = 'https://openapi.naver.com/v1/search/encyc?query=' + encodeURI("파이썬"); // json 결과
//    var request = require('request');
//    var options = {
//        url: api_url,
//        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
//     };

//    request.get(options, function (error, response, body) {
//      if (!error && response.statusCode == 200) {
//        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
//        res.end(body);
       
//        var result = JSON.parse(body);
//        console.log("\nlink:", result.items[0].link);
//        console.log("description:", result.items[0].description);
//      } else {
//        res.status(response.statusCode).end();
//        console.log('error = ' + response.statusCode);
//      }
//    });
//  });

//  app.post('/post', function(req, res) {
//     console.log('who get in here post /users');
//     var inputData;

//     req.on('data', function(data) {
//       var inputStr = "롤챔스"
//       var api_url = 'https://openapi.naver.com/v1/search/encyc?query=' + encodeURI(inputStr); // json 결과
//       var request = require('request');
//       var options = {
//           url: api_url,
//           headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
//        };
   
//       request.get(options, function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//           // res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
//           // res.end(body);
          
//           var result = JSON.parse(body);
//           inputData = result.items[0].description;
//           console.log("\nlink:", result.items[0].link);
//           console.log("description:", result.items[0].description);
//           res.write(inputData);
//           res.end();
//         } else {
//           res.status(response.statusCode).end();
//           console.log('error = ' + response.statusCode);
//         }
//       });
//     });
    
//  });
