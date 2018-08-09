var router=require('express').Router();
var electronicsData=require('../../model/electronicsModel');
var fashionData=require('../../model/fashionModel');
var booksData=require('../../model/booksModel');
var watchesData=require('../../model/watchesModel');

var portDev= require('../../../config');
const port=process.env.PORT ||configFile.port || 1234;
router.get('/',function (req,res) {
    console.log("hello");

    var electronicsCardData=[];
    var fashionCardData=[];
    var  watchesCardData=[];
    var booksCardData=[];
    var totalData=[];
var promise1Electronics= new Promise(function (resolve,reject) {
    electronicsData.find({}).limit(4)
        .exec(function (err,result) {
            if(err)
            {
                reject('error in electronics');
            }

            else{
                electronicsCardData=electronicsCardData.concat(result);
                resolve();
            }

        })
})


    var promise2Fashion= new Promise(function (resolve,reject) {
        fashionData.find({}).limit(4)
            .exec(function (err,result) {

                if(err)
                {
                    reject('error in fashion');
                }

                else {
                    fashionCardData = fashionCardData.concat(result);

                   resolve();
                }
            })
    })

    var promise3Books= new Promise(function (resolve,reject) {
        booksData.find({}).limit(4)
            .exec(function (err,result) {
                if(err)
                {
                    reject('error in books')
                }
                      else
                          {
                    booksCardData = booksCardData.concat(result);
                               resolve();

                            }
            })

    })

    var promise4Watches=new Promise(function (resolve,reject) {

        watchesData.find({}).limit(4)
            .exec(function (err,result) {
                if(err)
                {
                    reject('error in watches')
                }

                else {
                    watchesCardData = watchesCardData.concat(result);
                    resolve();
                }
            })
    })

    Promise.all([promise1Electronics,promise2Fashion,promise3Books,promise4Watches])
        .then(function () {

            totalData=totalData.concat(electronicsCardData);
            totalData=totalData.concat(fashionCardData);
            totalData=totalData.concat(watchesCardData);
            totalData=totalData.concat(booksCardData);
            for(var i=0;i<totalData.length;i++)
            {
                totalData[i].imgLink = `http://localhost:${port}`+ totalData[i].imgLink;
            }
         res.json(totalData)
        })







})
module.exports=router;
