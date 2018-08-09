const router=require('express').Router();
const sellorSchema = require('../../model/sellor')
var verifyToken=require('../auth/verifyToken');
const port=1234;


router.post('/dashboard',verifyToken,function (req,res) {
    console.log(req.userId);
    sellorSchema.findById(req.userId,{'name': 1,username: '1', phoneNumber: '1'}, function (err,result) {
        if (err)
        {
            console.log('some error');
        }
        else
        {
            res.json(result)
        }
    })
})
router.post('/viewproducts',verifyToken,function (req,res) {
    console.log(req.userId);
    sellorSchema.findById(req.userId, {itemsOnSale:1, _id:0},function (err,result) {
        if (err) {
            console.log('error')
            res.sendStatus(404);
        }
        else
        {
            //console.log(result)
            for(var i =0 ;i < result['itemsOnSale'].length;i++)
            {
                result['itemsOnSale'][i].imgLink = `http://localhost:${port}` + result['itemsOnSale'][i].imgLink;

            }
            res.json(result['itemsOnSale']);
        }
    })
})

module.exports = router;
