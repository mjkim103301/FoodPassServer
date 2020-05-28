//기본 라우팅 소스코드
//1.express모듈 사용하기 위해 require 함수로 불러옴
//bodyparser.json 추가?
const express=require('express');
const bodyParser=require('body-parser');
const postgres=require('postgresql');

//2.라우팅 객체 만듦.
const app=express();

//const {Client}=require('pg');
app.use(bodyParser.urlencoded({extended: true}))


//db_configure.json 써먹기
const db=new (require('./Database_Connecter'))('db_configure.gitignore');


// //데이터 입력
// const truckInformSql="insert into foodtruck_tb(name, image, introduction, notice, origin_information, location) values($1, $2, $3, $4, $5, $6) Returning *";
// const values=['name','image','introduction','notice','origin_information','location'];
// db.query(truckInformSql, values, (err,res)=>{
//   if(err){
//     console.log(err.stack)
//   }else{
//     console.log(res.rows[0])
//   }
// })
app.post('/insertTruck',(req,res)=>{
  let name=req.body.name;
  let image=req.body.image;
  let introduction=req.body.introduction;
  let notice=req.body.notice;
  let origin_information=req.body.origin_information;
  let location=req.body.location;

  const truckInformSql="insert into foodtruck_tb(name, image, introduction, notice, origin_information, location) values($1, $2, $3, $4, $5, $6) Returning *";
  const values=[name,image,introduction,notice,origin_information,location];
  db.query(truckInformSql,values,(err,res)=>{
    if(err){
      console.log(err.stack)
    }else{
      console.log(res.rows[0])
      res.send('name: '+name)
    }
  })

});

app.post('/insertMenu',(req,res)=>{
  let foodtruck_id=req.body.foodtruck_id;
  let name=req.body.name;
  let image=req.body.image;
  let introduction=req.body.introduction;
  let price=req.body.price;
  let allergy_information=req.body.allergy_information;

  const menuInformSql="insert into menu_tb(foodtruck_id, name,image ,introduction ,price ,allergy_information) values($1,$2,$3,$4,$5,$6)";
  const values=[foodtruck_id,name,image,introduction,price,allergy_information];

   db.query(menuInformSql,values,(err,res)=>{
    if(err){
      console.log(err.stack)
    }else{
      console.log(res.rows[0])
      res.send('name: '+name)
    }
  })
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


