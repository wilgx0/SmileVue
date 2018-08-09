const mongoose = require('mongoose')
const db = 'mongodb://localhost/simle-db'

const glob = require('glob')            //允许你使用 * 等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则文件
const {resolve} = require('path')       //将一系列路径或路径段解析为绝对路径。


//一次性引入所有的Schema文件了
exports.initSchemas = () =>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}

//连接数据库的操作
exports.connect = ()=>{
    
    mongoose.connect(db)        //连接数据库
    let maxConnectTimes = 0;    //数据库断开重连的次数

    return  new Promise((resolve,reject)=>{

        //数据库断开事件
        mongoose.connection.on('disconnected',()=>{
            console.log('***********数据库断开***********')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db)    
            }else{
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }
    
        })

        //数据库错误事件
        mongoose.connection.on('error',err=>{
            console.log('***********数据库错误***********')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db)   
            }else{
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }
        })

        //数据库连接成功事件
        mongoose.connection.once('open',()=>{
            console.log('MongoDB Connected successfully!')
            resolve()   
        })
    })

    
    

}