import express from 'express';
import Television from './models/Exam.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", async function (req, res) {
    const wishlist = await Television.loadMany({ bought: 0 });
    const televisions = await Television.loadMany({ bought: 1 });
    res.render('listTelevisions.ejs', { wishlist, televisions });
});

app.get("/delete/:id", async function (req, res) {
    await Television.delete({ idtelevisions: req.params.id });
    res.redirect('/');
});

app.get("/buy/:id", async function (req, res) {
    const tv = await Television.load({ idtelevisions: req.params.id });
    tv.bought = 1;
    tv.save();
    res.redirect('/');
});

app.post("/add", async function (req, res) {
    const television = new Television();
    television.update({ brand: req.body.new_brand, size: req.body.new_size, price: req.body.new_price, bought: 0, working: "yes" });
    await television.save();
    res.redirect('/');
});

app.post("/destroy/:id", async function (req, res) {
    const tv = await Television.load({ idtelevisions: req.params.id });
    tv.update({ working: "no", destruction: req.body.new_destruction });
    await tv.save();
    res.redirect('/');
});


app.listen(4000, function () {
    console.log('Server is running on port 4000.');
});
