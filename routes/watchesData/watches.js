var router=require('express').Router();
var watchesData=require('../../model/watchesModel');
var portDev= require('../../../config');
const port=process.env.PORT ||portDev.port;

// router.get('/',function (req,res) {
//     var data;
//
//     watchesData.find({},function (err,result) {
//         if (err) throw err;
//
//         data=result;
//         //console.log(result)
//       //  console.log(data)
//         for(var i=0;i<data.length;i++)
//         {
//             console.log("hello")
//             data[i].imgLink = `http://localhost:${port}`+ data[i].imgLink;
//         }
//         res.json(data);
//
//     })
// })


router.get('/:pageNumber',function (req,res) {
    var data;
    var totalItem;
    var pageNumber=req.params.pageNumber;
    var limitNumber=6;
    var skipNumber=(pageNumber-1)*6;

    watchesData.find({}).skip(skipNumber).limit(limitNumber)
        .exec(function (err,result) {
            if (err) throw err;

            data=result;
            //console.log(result)
            //console.log(data)
            for(var i=0;i<data.length;i++)
            {
                //console.log("hello")
                data[i].imgLink = `http://localhost:${port}`+ data[i].imgLink;
            }

            watchesData.count({},function (err,count) {
                if (err) throw err;
                totalItem=count;
                console.log(totalItem)
                data.push({'totalItem':totalItem})
                res.json(data);

            })

        })

})

router.get('/a/:id',function (req,res) {
    var data;
    var dataToBeSend=[];
    var id=req.params.id;

        watchesData.findById(id,function (err,result) {
            if (err) throw err;
            data=result;
            dataToBeSend.push(data);
            watchesData.find({sub_category:data.sub_category}).exec(function (err,result) {
                if(err) throw err;
                for(var i=0;i<result.length;i++)

                {
                    if(data._id.equals(result[i]._id))
                    {
                        console.log("matched")
                    }
                    else
                    {
                        dataToBeSend.push(result[i])

                    }
                }
                dataToBeSend=dataToBeSend.slice(0,4);
                for(var i=0;i<dataToBeSend.length;i++)
                {
                    dataToBeSend[i].imgLink = `http://localhost:${port}`+ dataToBeSend[i].imgLink;
                }
                res.json(dataToBeSend)
            })
        })

    })


module.exports=router;