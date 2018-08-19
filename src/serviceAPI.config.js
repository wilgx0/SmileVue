const BASEURL = "https://www.easy-mock.com/mock/5b57aebfe6f67b0d7723d1b0/example/"
const LOCALURL = 'http://localhost:3000/'


const URL = {
    getShoppingMallInfo:BASEURL+'test',     //商城首页所有信息
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser:LOCALURL + 'user/register', //用户注册接口
    login:LOCALURL+'user/login',   //用户登录
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodInfo',   //获取商品详细信息
    getCategoryList:LOCALURL + 'goods/getCategoryList',   //获取大类信息
    getCategorySubList:LOCALURL+'goods/getCategorySubList',  //获取小类
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',   //得到小类商品信息
}
 
module.exports = URL