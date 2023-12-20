//import express from 'express';
//import Television from './models/Exam.js';

//const app = express();

//app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));

//app.get("/", async function (req, res) {
//    const wishlist = await Television.loadMany({ bought: 0 });
//    const televisions = await Television.loadMany({ bought: 1 });
//    res.render('ListWords.ejs', { wishlist, televisions });
//});

//app.get("/delete/:id", async function (req, res) {
//    await Television.delete({ idtelevisions: req.params.id });
//    res.redirect('/');
//});

//app.get("/buy/:id", async function (req, res) {
//    const tv = await Television.load({ idtelevisions: req.params.id });
//    tv.bought = 1;
//    tv.save();
//    res.redirect('/');
//});

//app.post("/add", async function (req, res) {
//    const television = new Television();
//    television.update({ brand: req.body.new_brand, size: req.body.new_size, price: req.body.new_price, bought: 0, working: "yes" });
//    await television.save();
//    res.redirect('/');
//});

//app.post("/destroy/:id", async function (req, res) {
//    const tv = await Television.load({ idtelevisions: req.params.id });
//    tv.update({ working: "no", destruction: req.body.new_destruction });
//    await tv.save();
//    res.redirect('/');
//});


//app.listen(4000, function () {
//    console.log('Server is running on port 4000.');
//});

import express from 'express';
import Translation from './models/Exam.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let test_translation = new Translation();
let validation;

app.get("/dictionnary", async function (req, res) {
    const dictionnary = await Translation.loadMany();
    res.render('ListWords.ejs', { dictionnary });
});

app.get("/delete/:id", async function (req, res) {
    await Translation.delete({ idtranslation : req.params.id });
    res.redirect('/dictionnary');
});

app.post("/add", async function (req, res) {
    const translation = new Translation();
    translation.update({ word: req.body.new_word, translation: req.body.new_translation, nbrgood : 0, nbrtotal : 0});
    await translation.save();
    res.redirect('/dictionnary');
});

app.get("/questions", async function (req, res) {
    const dictionnary = await Translation.loadMany();
    let random_translation;
    let validation_none;
    let list_translations = dictionnary
    list_translations.sort(function () { return 0.5 - Math.random() });
    random_translation = list_translations[0];
    res.render('Questions.ejs', { dictionnary, test_translation, random_translation, validation, validation_none });
});


app.post("/submit", async function (req, res) {
    test_translation.update({ translation: req.body.test_translation });
    validation = req.body.validation;
    res.redirect('/questions');
});


app.listen(4000, function () {
    console.log('Server is running on port 4000.');
});