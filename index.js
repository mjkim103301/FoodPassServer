//기본 라우팅 소스코드
//1.express모듈 사용하기 위해 require 함수로 불러옴
var express=require('express');

//2.라우팅 객체 만듦.
var app=express();
var bodyParser=require('body-parser')
const {Client}=require('pg');
app.use(bodyParser.urlencoded({extended: true}))

//postgresql 불러오기
var postgres=require('postgresql');

const client=new Client({
  user:"foodpass",
  //host:"52.79.190.47",
  host:"172.31.37.111",
  //host:"ec2-52-79-190-47.ap-northeast-2.compute.amazonaws.com",
  database:"foodpass",
  password:"postgres",
  port:5432,
});

client.connect();
client.query('SELECT NOW()', (err,res)=>{
  console.log(err,res)
  client.end()
});

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

//4. 서버 열기
app.listen(8888, function(){
  console.log("server starting with 8888")
});


