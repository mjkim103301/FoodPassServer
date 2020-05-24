//expamples
// const express = require('express');

// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello Express app!')
// });

// app.listen(3000, () => {
//   console.log('server started');
// });


//기본 라우팅 소스코드
//1.express모듈 사용하기 위해 require 함수로 불러옴
var express=require('express');

//2.라우팅 객체 만듦.
var app=express();

//3. 기본 라우팅 라우터 모듈
//req: 클라이언트로부터 넘어온 데이터가 저장된 객체
//res: 클라이언트에로 결과를 넘겨주기 위한 객체
app.get('/', function(req, res){
  res.send("Hello, world!")
});

//query: get 방식으로 서버에 데이터 전송할 때, 주소 뒤에 붙는 데이터 
app.get('/pass', function(req,res){
  var data=req.query.data
  res.send(data)
});
//4. 서버 열기
app.listen(8888, function(){
  console.log("server starting with 8888")
});



