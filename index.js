/*//expamples
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
*/

//기본 라우팅 소스코드
//1.express모듈 사용하기 위해 require 함수로 불러옴
var express=require('express');

//2.라우팅 객체 만듦.
var app=express();
var bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

//postgresql 불러오기
var postgres=require('postgresql');

var connection=postgres.createConnection({
  //host:"172.31.37.111",
  host: "ubuntu@ec2-52-79-190-47.ap-northeast-2.compute.amazonaws.com",
  port:5432,//또는 22
  user:"foodpass",//계정 아이디
  password:"postgres",//계정 비밀번호
  database:"foodpass"//접속할 db
})
connection.connect()

//3. 기본 라우팅 라우터 모듈
//req: 클라이언트로부터 넘어온 데이터가 저장된 객체
//res: 클라이언트에로 결과를 넘겨주기 위한 객체
/*
app.get('/', function(req, res){
  res.send("Hello, world!")
});

//query: get 방식으로 서버에 데이터 전송할 때, 주소 뒤에 붙는 데이터 
app.get('/pass', function(req,res){
  var data=req.query.data
  res.send(data)
});
*/
app.post('/user', function(req, res){
  var userID= req.body.userID
  var foodtruckID= req.body.truckID
  if(userID){
    connection.query("INSERT INTO user_tb(userID, foodtruckID) VALUES ('"+userID+"', '"+foodtruckID+"')", 
    function(error, result, fields){
      if(error){
        res.send('err: '+error)
      }
      else{
        console.log(userID+', '+foodtruckID)
        res.send('success create user name: '+userID+' truck: '+foodtruckID)
      }
    })
  }

});
//4. 서버 열기
app.listen(8888, function(){
  console.log("server starting with 8888")
});


