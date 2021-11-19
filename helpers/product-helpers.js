const db=require('../config/connection')
var collections=require('../config/collections')
var objectId=require('mongodb').ObjectId
module.exports={
    addProduct:(product,callback)=>{
        console.log(product)
        let data={
            pname:product.pname,
            price:parseInt(product.price),
            qty:product.qty
        }
        console.log(data)
        db.get().collection("products").insertOne(data).then((datas)=>{
            callback(datas.insertedId)
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collections.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(id,done)=>{
            console.log(objectId(id))
            db.get().collection(collections.PRODUCT_COLLECTION).deleteOne({_id:objectId(id)}).then((response)=>{
               done()
           })
        
    },
    adminLogin:(details,callback)=>{
        let Email="chris@gmail.com"
        let Pass='123'
        if(Email=details.email){
            if(Pass=details.password){
                callback()
            }
        }   
    },
    getProductDetails:(ProdId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id:objectId(ProdId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(id,content)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).updateOne({_id:objectId(id)},{
                $set:{
                    pname:content.pname,
                    price:content.price,
                    qty:content.qty
                }
            }).then((response)=>{
                resolve()

            })
        })


    }
}