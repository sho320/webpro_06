"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// 持っている株の管理システム

let stocks = [
    { id: 1, name: "SBG", code: "9984", amount: 10, price: 17740 },
    { id: 2, name: "Toyota", code: "7203", amount: 100, price: 2000 }
];

// イタリア料理システム
let dishes = [
    { id: 1, name: "マルゲリータ", type: "ピザ", price: 1200 },
    { id: 2, name: "カルボナーラ", type: "パスタ", price: 1400 }
];

// 人気曲システム
let songs = [
    { id: 1, title: "Lemon", artist: "米津玄師", rank: 1 },
    { id: 2, title: "Pretender", artist: "Official髭男dism", rank: 2 }
];



app.get("/", (req, res) => {
    res.render("index");
});


//株
app.get("/stocks", (req, res) => {
    res.render("stocks/index", { data: stocks });
});


app.get("/stocks/create", (req, res) => {
    res.render("stocks/create");
});


app.post("/stocks", (req, res) => {
    const maxId = stocks.length > 0 ? Math.max(...stocks.map(s => s.id)) : 0;
    const name = req.body.name;
    const code = req.body.code;
    const amount = Number(req.body.amount);
    const price = Number(req.body.price);

    const newData = { id: maxId + 1, name: name, code: code, amount: amount, price: price };
    stocks.push(newData);
    
    res.redirect("/stocks");
});


app.get("/stocks/:id", (req, res) => {
    const id = Number(req.params.id);
    const target = stocks.find(s => s.id === id);
    if (target) {
        res.render("stocks/detail", { data: target });
    } else {
        res.status(404).send("Not Found");
    }
});


app.get("/stocks/edit/:id", (req, res) => {
    const id = Number(req.params.id);
    const target = stocks.find(s => s.id === id);
    if (target) {
        res.render("stocks/edit", { data: target });
    } else {
        res.status(404).send("Not Found");
    }
});


app.post("/stocks/update/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = stocks.findIndex(s => s.id === id);
    
    if (index !== -1) {
        stocks[index].name = req.body.name;
        stocks[index].code = req.body.code;
        stocks[index].amount = Number(req.body.amount);
        stocks[index].price = Number(req.body.price);
        res.redirect("/stocks");
    } else {
        res.status(404).send("Not Found");
    }
});


app.get("/stocks/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    stocks = stocks.filter(s => s.id !== id);
    res.redirect("/stocks");
});


//イタリア料理

app.get("/dishes", (req, res) => {
    res.render("dishes/index", { data: dishes });
});

app.get("/dishes/create", (req, res) => {
    res.render("dishes/create");
});

app.post("/dishes", (req, res) => {
    const maxId = dishes.length > 0 ? Math.max(...dishes.map(d => d.id)) : 0;
    const newData = {
        id: maxId + 1,
        name: req.body.name,
        type: req.body.type,
        price: Number(req.body.price)
    };
    dishes.push(newData);
    res.redirect("/dishes");
});

app.get("/dishes/:id", (req, res) => {
    const id = Number(req.params.id);
    const target = dishes.find(d => d.id === id);
    if(target) res.render("dishes/detail", { data: target });
    else res.status(404).send("Not Found");
});

app.get("/dishes/edit/:id", (req, res) => {
    const id = Number(req.params.id);
    const target = dishes.find(d => d.id === id);
    if(target) res.render("dishes/edit", { data: target });
    else res.status(404).send("Not Found");
});

app.post("/dishes/update/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = dishes.findIndex(d => d.id === id);
    if(index !== -1) {
        dishes[index].name = req.body.name;
        dishes[index].type = req.body.type;
        dishes[index].price = Number(req.body.price);
        res.redirect("/dishes");
    } else res.status(404).send("Not Found");
});

app.get("/dishes/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    dishes = dishes.filter(d => d.id !== id);
    res.redirect("/dishes");
});


//人気曲
app.get("/songs", (req, res) => {
    res.render("songs/index", { data: songs });
});

app.get("/songs/create", (req, res) => {
    res.render("songs/create");
});

app.post("/songs", (req, res) => {
    const maxId = songs.length > 0 ? Math.max(...songs.map(s => s.id)) : 0;
    const newData = {
        id: maxId + 1,
        title: req.body.title,
        artist: req.body.artist,
        rank: Number(req.body.rank)
    };
    songs.push(newData);
    res.redirect("/songs");
});

app.get("/songs/:id", (req, res) => {
    const id = Number(req.params.id);
    const target = songs.find(s => s.id === id);
    if(target) res.render("songs/detail", { data: target });
    else res.status(404).send("Not Found");
});

app.get("/songs/edit/:id", (req, res) => {
    const id = Number(req.params.id);
    const target = songs.find(s => s.id === id);
    if(target) res.render("songs/edit", { data: target });
    else res.status(404).send("Not Found");
});

app.post("/songs/update/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = songs.findIndex(s => s.id === id);
    if(index !== -1) {
        songs[index].title = req.body.title;
        songs[index].artist = req.body.artist;
        songs[index].rank = Number(req.body.rank);
        res.redirect("/songs");
    } else res.status(404).send("Not Found");
});

app.get("/songs/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    songs = songs.filter(s => s.id !== id);
    res.redirect("/songs");
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));