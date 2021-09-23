const db=require('../config/connection')
var collections=require('../config/collections')
var objectId=require('mongodb').ObjectId
module.exports={
    addProduct:(product,callback)=>{

        db.get().collection("products").insertOne(product).then((data)=>{
            callback(data.insertedId)
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
        console.log('hai')
        let Email="chris@gmail.com"
        let Pass='123'
        if(Email=details.email){
            if(Pass=details.password){
                callback()
            }
        }   
    }
}