<template>
    <div>
        <!--search bar layout-->
        <div class="search-bar">   <!--搜索栏-->
            <van-row gutter="5">
                <van-col span="3"><img :src="locationIcon" width="80%" class="location-icon" /></van-col>
                <van-col span="16">
                <input type="text" class="search-input"/>
                </van-col>
                <van-col span="5"><van-button size="mini">查找</van-button></van-col>         
            </van-row>
        </div>

        <!-- 轮播图 -->
        <div class="swiper-area">
          <van-swipe :autoplay="1000">
            <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
              <img v-lazy="banner.image" width="100%"/>
            </van-swipe-item>
          </van-swipe>
        </div>

        <div class="type-bar"> <!--广告-->
          <div  v-for="(cate,index) in category" :key="index" >
            <img v-lazy="cate.image" width="90%" />
            <span>{{cate.mallCategoryName}}</span> 
          </div>
        </div>


      <!-- 广告 -->
      <div class="ad-banner">
          <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
      </div>

      <!-- 商品推荐 -->
    <div class="recommend-area">
        <div class="recommend-title">
            商品推荐
        </div>
        <div class="recommend-body">
            <!--swiper-->
            <swiper :options="swiperOption">
                <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
                    <div class="recommend-item">
                      <img :src="item.image" width="80%" />
                      <div>{{item.goodsName}}</div>
                      <div>￥{{item.price|moneyFilter}} (￥{{item.mallPrice|moneyFilter}})</div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>


    <!-- 楼层1 -->
    <floorComponent :floorData="floor1"  :floorTitle="floorName.floor1" ></floorComponent>
    <!-- 楼层2 -->
    <floorComponent :floorData="floor2"  :floorTitle="floorName.floor2" ></floorComponent>
    <!-- 楼层3 -->
    <floorComponent :floorData="floor3"  :floorTitle="floorName.floor3" ></floorComponent>

    <!-- 热卖 -->
    <div class="hot-area">
        <div class="hot-title">热卖商品</div>
        <div class="hot-goods">
          <!--这里需要一个list组件-->
          <van-list>
              <van-row gutter="20">
                  <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
                       <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                  </van-col>
              </van-row>
          </van-list>
        </div>
    </div>

  </div>
</template>
 
<script>
import axios from "axios"
import floorComponent from '../component/floorComponent'
import {toMoney} from '@/filter/moneyFilter.js'
import goodsInfo from '../component/goodsInfoComponent'
import url from '@/serviceAPI.config.js'

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require("../../assets/images/location.png"), //搜索栏小图标
      category: [], //导航
      adBanner: [], //获得广告图片
      bannerPicArray: [], //轮播图片
      recommendGoods: [], //推荐商品
      //楼层数据
      floorName:[],     //楼层名字
      floor1: [],
      floor2: [],
      floor3: [],
      hotGoods:[], //热卖商品
    };
  },
  filters:{
      moneyFilter(money){
          return toMoney(money)
      }  
  },
  created() {
    axios({
      url:url.getShoppingMallInfo,
      method: "get"
    })
    .then(response => {
      if (response.status == 200) {
        this.category = response.data.data.category;
        this.adBanner = response.data.data.advertesPicture;
        this.bannerPicArray = response.data.data.slides;
        this.recommendGoods = response.data.data.recommend; //推荐商品
        //楼层数据
        this.floorName = response.data.data.floorName        //楼层名称
        this.floor1 = response.data.data.floor1;
        this.floor2 = response.data.data.floor2;
        this.floor3 = response.data.data.floor3;

        this.hotGoods = response.data.data.hotGoods           //热卖商品 
      }
    })
    .catch(error => {
      console.log(error);
    });
  },
  components:{floorComponent,goodsInfo}
};
</script>
 
<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important ;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}


.swiper-area{
  clear:both;
  max-height: 15rem;
  overflow:hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
  flex: 1;
}

.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}

.recommend-body {
  border-bottom: 1px solid #eee;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}

.hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
}
 
</style>