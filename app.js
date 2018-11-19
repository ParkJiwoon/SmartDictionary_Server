var express = require('express');
var mongoose = require('mongoose');
var app = express();
var port = process.env.PORT || 3000;  // Heroku에서 사용하는 포트 설정

app.listen(port, function() {
    console.log('Server On!');
});

/** 몽고디비 연결 */
MONGODB_URI = 'mongodb://heroku_s3p4j43q:b7009me3ku4vig5krar75de0g7@ds151753.mlab.com:51753/heroku_s3p4j43q';
mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, function(err) {
    if(err) {
        console.error('mongodb connection error', err);
    }

    console.log('mongodb connect');
});

/** 스키마 생성 */
var wordSchema = new mongoose.Schema({ 
    word: String,
    description: String,
    link: String
});
var usedWordSchema = new mongoose.Schema({ 
    word: String,
    date: Number
});

/** 모델 등록 */
var Word = mongoose.model('word', wordSchema)
var UsedWord = mongoose.model('usedword', usedWordSchema);

app.get('/', function(req, res) {
    res.write("Hello, this is smart dictionary team");
    res.end();
});

app.post('/', function(req, res) {
    req.on('data', (data) => {
      var inputData = JSON.parse(data);
             
      /** To do 1. 데이터베이스 쿼리문을 통해 뜻 가져오는 작업 추가 */
      var targetWord = inputData.word

      /** 뜻 찾기 */
      Word.findOne({word: targetWord}, function(err, word) {
          if(word) {
              let sendWord = {
                  word: word.word,
                  description: word.description,
                  link: word.link
              }
              res.json(sendWord);
              res.end();
          } else {
              let sendWord = {
                  word: targetWord,
                  description: "검색 결과가 없습니다",
                  link: "no data"
              }          
              res.json(sendWord);
              res.end();
          } 
      });

      /** To do 2. 사용 빈도 확인을 위해 데이터베이스에 넣는 작업 추가 */
        /** 현재 날짜 생성 */
        var date = new Date();

        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();

        if(day < 10) {
            day = "0" + day
        }

        var usedword = UsedWord({ 
            word: targetWord,
            date: eval(year + "" + month + "" + day)
        })

        /** 단어 저장 */
        usedword.save(function(err) {
            if(err) {
                // console.log("insert fail");
            } else {
                // console.log(targetWord, "insert success");
            }
        })
    });
});






