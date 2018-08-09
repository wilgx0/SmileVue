const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose') 



router.get('/',async(ctx)=>{
    ctx.body = '用户操作页面';
})

router.post('/register',async(ctx)=>{
    //取得Model
    const User = mongoose.model('User')
    //把从前端接收的POST数据封装成一个新的user对象
    let newUser = new User(ctx.request.body)
    //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUser.save().then(()=>{
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch(error=>{
        ctx.body={
            code:500,
            message:error
        }
    })
})


router.post('/login',async(ctx)=>{
    let loginUser =ctx.request.body      //得到前端传递过来的数据
    let userName = loginUser.userName
    let password = loginUser.password
    const User = mongoose.model('User') //引入User的model
    await User.findOne({userName:userName}) //查找用户名是否存在，如果存在开始比对密码
        .exec()
        .then(async(result)=>{
            console.log(result)
            if(result){             //当用户名存在时，开始比对密码
                let newUser = new User()    //因为是实例方法，所以要new出对象，才能调用
                await newUser.comparePassword(password,result.password)
                    .then(isMatch => {  //返回比对结果
                        ctx.body = {code:200,message:isMatch}
                    })
                    .catch(error=>{      //出现异常，返回异常
                        ctx.body = {code:500,message:error}
                    })
            } else {
                ctx.body = {code:200,message:'用户名不存在'}
            }
        }).catch(error=>{
            console.log(error)
            ctx.body={code:500,message:error}
        })
})

module.exports = router