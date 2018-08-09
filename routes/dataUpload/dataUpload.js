const router=require('express').Router();
const multer  = require('multer')
const bodyParser = require('body-parser');
const path=require('path');
var verifyToken=require('../auth/verifyToken');
const port=1234;
const sellorSchema = require('../../model/sellor')
////////////////////////////         REQUIRING THE MODELS          /////////////////////////


let electronicsData=require('../../model/electronicsModel');
let fashionData=require('../../model/fashionModel')
let booksData=require('../../model/booksModel')
let watchesData=require('../../model/watchesModel')

///////////////////////////          SETTING UP THE MULTER          //////////////////////////////

let filePathMulter;
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(req.body.category ==='electronics') {

            cb(null, __dirname + '/../../public/images/electronics')
        }

        if(req.body.category==='fashion') {

            cb(null, __dirname + '/../../public/images/fashion')
        }

        if(req.body.category==='books') {

            cb(null, __dirname + '/../../public/images/books')
        }

        if(req.body.category==='watches')
        {
            cb(null, __dirname + '/../../public/images/watches')

        }

    },
    filename: (req, file, cb) => {

        filePathMulter= "img_" + Date.now() + path.extname(file.originalname);

        cb(null, filePathMulter)
    }
});

var upload = multer({storage: storage});


///////////////////////////////////////   ROUTING FOR MULTER CONTENT /////////////////////////////


router.post('/',verifyToken,upload.single('avatar'),function (req,res,next) {
    console.log("hello from upload data api" )
    var name=req.body.name;
    var price=req.body.price;
    var description=req.body.description;
    var category=req.body.category;
    var sub_category = req.body.sub_category;

    if(category==='electronics')
    {
        let pathOfFile='/images/electronics/' + filePathMulter;
console.log(pathOfFile)

        let newItem = new electronicsData((
            {
                name:name,
                price:price,
                description:description,
                imgLink: pathOfFile,
                sub_category:sub_category
            }
        ))
        console.log('newItem:', newItem)

        newItem.save().then(()=>
        {
            console.log('new item:', newItem);
            sellorSchema.findByIdAndUpdate(req.userId, { $push:{itemsOnSale:newItem}},function (err,data) {
                if (err) {
                    res.json({"error": true});
                } else {
                    res.sendStatus(200)

                }
            });

        })
    }


    //////////////////////////////////////    FASHION     /////////////////////////////////////
    if(category==='fashion')
    {

        let pathOfFile='/images/fashion/' + filePathMulter;


        let newItem = new fashionData((
            {
                name:name,
                price:price,
                description:description,
                imgLink: pathOfFile,
                sub_category:sub_category
            }
        ))

        newItem.save().then(()=>
        {
            console.log('new item:', newItem);
            sellorSchema.findByIdAndUpdate(req.userId, { $push:{itemsOnSale:newItem}},function (err,data) {
                if (err) {
                    res.json({"error": true});
                } else {
                    res.sendStatus(200)

                }
            });

        })
    }


    /////////////////////////////////  BOOKS             //////////////////////////////////////
    if(category==='books')
    {


        let pathOfFile='/images/books/' + filePathMulter;


        let newItem = new booksData((
            {
                name:name,
                price:price,
                description:description,
                imgLink: pathOfFile,
                sub_category:sub_category

            }
        ))

        newItem.save().then(()=>
        {
            sellorSchema.findByIdAndUpdate(req.userId, { $push:{itemsOnSale:newItem}},function (err,data) {
                if (err) {
                    res.json({"error": true});
                } else {
                    res.sendStatus(200)

                }
            });
        })

    }

    //////////////////////////////////////    WATCHES    /////////////////////////////////////


    if(category==='watches')
    {
        let pathOfFile='/images/watches/' + filePathMulter;


        let newItem = new watchesData((
            {
                name:name,
                price:price,
                description:description,
                imgLink: pathOfFile,
                sub_category:sub_category
            }
        ))

        newItem.save().then(()=>
        {
            sellorSchema.findByIdAndUpdate(req.userId, { $push:{itemsOnSale:newItem}},function (err,data) {
                if (err) {
                    res.json({"error": true});
                } else {
                    res.sendStatus(200)

                }
            });

        })


    }

})



// router.get('/adminView',function (req,res) {
//     console.log("hello");
//
//     var electronicsCardData=[];
//     var fashionCardData=[];
//     var  watchesCardData=[];
//     var booksCardData=[];
//     var totalData=[];
//     var promise1Electronics= new Promise(function (resolve,reject) {
//         electronicsData.find({})
//             .exec(function (err,result) {
//                 if(err)
//                 {
//                     reject('error in electronics');
//                 }
//
//                 else{
//                     electronicsCardData=electronicsCardData.concat(result);
//                     resolve();
//                 }
//
//             })
//     })
//
//
//     var promise2Fashion= new Promise(function (resolve,reject) {
//         fashionData.find({})
//             .exec(function (err,result) {
//
//                 if(err)
//                 {
//                     reject('error in fashion');
//                 }
//
//                 else {
//                     fashionCardData = fashionCardData.concat(result);
//
//                     resolve();
//                 }
//             })
//     })
//
//     var promise3Books= new Promise(function (resolve,reject) {
//         booksData.find({})
//             .exec(function (err,result) {
//                 if(err)
//                 {
//                     reject('error in books')
//                 }
//                 else
//                 {
//                     booksCardData = booksCardData.concat(result);
//                     resolve();
//
//                 }
//             })
//
//     })
//
//     var promise4Watches=new Promise(function (resolve,reject) {
//
//         watchesData.find({})
//             .exec(function (err,result) {
//                 if(err)
//                 {
//                     reject('error in watches')
//                 }
//
//                 else {
//                     watchesCardData = watchesCardData.concat(result);
//                     resolve();
//                 }
//             })
//     })
//
//     Promise.all([promise1Electronics,promise2Fashion,promise3Books,promise4Watches])
//         .then(function () {
//
//             totalData=totalData.concat(electronicsCardData);
//             totalData=totalData.concat(fashionCardData);
//             totalData=totalData.concat(watchesCardData);
//             totalData=totalData.concat(booksCardData);
//             for(var i=0;i<totalData.length;i++)
//             {
//                 totalData[i].imgLink = `http://localhost:${port}`+ totalData[i].imgLink;
//             }
//             res.json(totalData)
//         })
//






//})

module.exports=router;
