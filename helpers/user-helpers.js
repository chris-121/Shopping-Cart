const db=require('../config/connection');
var collections=require('../config/collections')
const bcrypt=require('bcrypt')

module.exports={
    addUserData:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection(collections.USER_COLLECTIONS).insertOne(userData)
            resolve(userData._id)
        })
    },
    login:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginstatus=false
            let response={}
            let user=await db.get().collection(collections.USER_COLLECTIONS).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log("login succesfull")
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("login failed")
                        resolve({status:false})
                    }
                })
            }else{
                console.log("user not found")
                resolve({status:false})

            }

        })

    }
}