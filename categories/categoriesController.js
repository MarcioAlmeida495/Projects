const express = require("express");
const router = express.Router();
const Category = require("./category");
const slugify = require("slugify");
const category = require("./category");

router.get("/admin/categories", (req, res)=>{
    Category.findAll().then(categories =>{
        res.render("admin/categories/index", {categories: categories})
    })
})
router.get('/fetchCategories', (req, res) => {
    Category.findAll().then(categories => {
        res.json(categories)
    })
})
router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
})


router.post("/categories/save", (req, res) => { 
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/admin/categories");
        })
    }else{
        res.redirect("/admin/categories");
    }
})

router.post('/categories/delete', (req, res) =>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect('/admin/categories');
            })
        }else res.redirect('/admin/categories');
    }else res.redirect('/admin/categories');
})
router.get('/categories/update/:id',(req, res) => {
    var id = req.params.id;
    category.findByPk(id).then(category=>{
        console.log(category);
        res.render('admin/categories/catUpdate',{category: category});
    })
})


router.post('/categories/update/save', (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    console.log('dados: --------------')
    console.log(id)
    console.log(title)
    category.update({title: title, slug: slugify(title)},{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/categories')
    })
})

module.exports = router;