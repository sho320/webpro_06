const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});










app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる

total += 1; 

  if( hand === cpu ){
    judgement = 'あいこ';
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1; // 勝ったら１タス
  } else {
    judgement = '負け';
  }

  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する

const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/jankenradio", (req, res) => {
  let hand = req.query.hand; // ラジオボタン
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  
  // 1:グー, 2:チョキ, 3:パー
  const num = Math.floor( Math.random() * 3 + 1 ); 
  let cpu = '';
  let judgement = '';
  
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';

total += 1; 

  if( hand === cpu ){
    judgement = 'あいこ';
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1; // 勝ったら１＋
  } else {
    judgement = '負け';
  }



const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken_radio', display ); 
});

app.get("/keiyo_add", (req, res) => {
    // 1. フォームから送られてきたデータを取得
    let id = req.query.id; 
    let code = req.query.code; 
    let name = req.query.name;
    let newdata = { id: id, code: code, name: name };
    station.push( newdata ); 
    res.redirect('/public/keiyo_add.html');
    res.render('db1', { data: station });

});


let books = [
    { id: 1, title: "米津の人生", author: "せいほ" },
    { id: 2, title: "サム・アルトマンの人生", author: "翔真" }
];

app.get("/books", (req, res) => {
    res.render('books_list', { data: books });
});


app.get("/books_add", (req, res) => {
    let id = req.query.id;
    let title = req.query.title;
    let author = req.query.author;
    let newdata = { id: id, title: title, author: author };
    books.push( newdata );
    res.redirect('/books');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
