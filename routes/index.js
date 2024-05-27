var express = require('express');
var router = express.Router();
const fs=require("fs");
const path=require("path")

const globalpath=path.join(__dirname,"../","public","uplods");

/* GET home page. */
router.get('/', function(req, res, next) {
  const read=fs.readdirSync(globalpath);
  res.render('index', {read:read,store:"",file:"" });
});

router.get('/show/:file', function(req, res, next) {
  const store=fs.readFileSync(path.join(globalpath,req.params.file),"utf-8")
  const read=fs.readdirSync(globalpath);
  res.render('index', {read:read,store:store,file:req.params.file });
});

router.post('/create', function(req, res, next) {
  const{file}=req.body;
  fs.writeFileSync(path.join(globalpath,file),"")
  res.redirect(`/show/${file}`)
});

router.post('/update/:file', function(req, res, next) {
  fs.writeFileSync(path.join(globalpath,req.params.file),req.body.store)
  res.redirect(`/show/${req.params.file}`)
});
router.get('/delete/:file', function(req, res, next) {
  fs.unlinkSync(path.join(globalpath,req.params.file))
  res.redirect("/")
});

module.exports = router;
