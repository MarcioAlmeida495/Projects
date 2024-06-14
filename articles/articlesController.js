const express = require("express");
const router = express.Router();
const Category = require('../categories/category');
const Article = require('./article');
const slugify = require('slugify');

router.get("/articles", (req, res) => {
    res.send("rota de artigos");
});
router.get("/categories", (req, res) => {
    res.send("rota de artigos");
});

router.get('/admin/articles/new', (req, res) => {
    res.render('admin/articles/new.ejs')
})

router.post('/articles/save', (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category
    console.log(req)
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then()
})
module.exports = router;
