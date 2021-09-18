const db=require('../config/connection')

module.exports={
    addProduct:(product,callback)=>{

        db.get().collection("products").insertOne(product).then((data)=>{
            callback(data.insertedId)
        })
    }
}