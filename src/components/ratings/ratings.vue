<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家 {{seller.rankRate}}</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect @ratingtype="ratingtype"
                          @contenttoggle="contenttoggle"
                          :selectType="selectType"
                          :onlyContent="onlyContent"
                          :ratings="ratings">
            </ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li  v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in ratings" :key="index" class="raging-item">
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟到达</span>
                                <p class="text">{{rating.text}}</p>
                                <div class="recommend" v-show="rating.recommend.length">
                                    <span class="icon-thumb_up"></span>
                                    <span v-for="(item,index_1) in rating.recommend" :key="index_1" class="item">{{item}}</span>
                                </div>
                                <div class="time">{{rating.rateTime | formatDate }}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from '@/components/star/star'
import split from '@/components/split/split'
import ratingselect from '@/components/ratingselect/ratingselect'
import moment from 'moment'
const config = require('@/../config')

// eslint-disable-next-line
const POSITIVE = 0
// eslint-disable-next-line
const NEGATIVE = 1
// eslint-disable-next-line
const ALL = 2

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data(){
    return {
      scroll: {},
      ratings: [],
      selectType: ALL,
      onlyContent: true
      }
  },
  created(){
    this.$http.get(config.apiHost.ratings).then((response) => {
      response = response.body
      this.ratings = response
      this.$nextTick(()=>{
        this.scroll = new BScroll(this.$refs.ratings, {click: true})
      })
    })
  },
  methods: {
    ratingtype(Type){
      this.selectType = Type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    contenttoggle(contentType){
      this.onlyContent = contentType
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow(type, text) {
      if (this.onlyContent && !text){
        return false
      }
      if (this.selectType === ALL){
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  filters: {
    formatDate(time){
      return moment(time).format('YYYY-MM-DD hh:mm')
    }
  },
  components: {
    star, split, ratingselect
  }
}
</script>

<style scoped lang="stylus" type="stylesheet/stylus">
    @import "../../common/stylus/maxin.styl";

    .ratings
        position:absolute
        top:174px
        bottom:0
        width:100%
        overflow:hidden
        .overview
            display:flex
            padding:18px
            @media only screen and (max-width: 320px)
                padding-left:1px
                padding-right:1px
            .overview-left
                flex:0 0 137px
                padding:6px 0
                width:137px
                border-right:1px solid rgba(7,17,27,0.1)
                text-align:center
                @media only screen and (max-width: 320px)
                    flex:0 0 120px
                    width:120px
                .score
                    margin-bottom:6px
                    line-height:28px
                    color:rgb(255,153,0)
                    font-size:24px
                .title
                    margin-bottom:8px
                    line-height:12px
                    font-size:12px
                    color:rgb(7,17,17,27)
                .rank
                    font-size:10px
                    line-height:10px
                    color:rgb(147,153,159)
            .overview-right
                flex:1
                padding:6px 0 6px  24px
                @media only screen and (max-width: 320px)
                    padding-left:6px
                .score-wrapper
                    margin-bottom:8px
                    font-size:0
                    .title
                        color:rgb(7,17,27)
                        font-size:12px
                    .star
                        display:inline-block
                        margin-left:4px
                        vertical-align:top
                    .score
                        display:inline-block
                        vertical-align:top
                        line-height:18px
                        font-size:12px
                        color:rgb(255,153,0)
                .delivery-wrapper
                    font-szie:0
                    .title
                        line-height:18px
                        font-size:12px
                        color:rgb(7,17,27)
                    .delivery
                        margin-left:12px
                        font-size:12px
                        color:rgb(147,153,159)
        .rating-wrapper
            padding:0 18px
            .raging-item
                display:flex
                padding:18px 0
                border-1px(rgba(7,17,27,0.1))
                .avatar
                    flex:0 0 28px
                    width:20px
                    margin-right:12px
                    img
                        border-radius:50%
                .content
                    position:relative
                    flex:1
                    .name
                        margin-bottom:4px
                        line-height:12px
                        font-size:10px
                        color:rgb(7,17,27)
                    .star-wrapper
                        margin-bottom:6px
                        font-size:0
                        .star
                            display:inline-block
                            margin-right:6px
                            vertical-align:top
                        .delivery
                            line-height:12px
                            font-size:10px
                            color:rgb(7,17,27)
                    .text
                        font-size:12px
                        margin:6px 0 18px 0
                        line-height:18px
                        color:rgb(7,17,27)
                    .recommend
                        line-height:16px
                        font-size:0
                        .icon-thumb_up,.item
                            display:inline-block
                            margin:0 8px 4px 0
                            font-size:9px
                        .icon-thumb_up
                            color:rgb(0,160,200)
                        .item
                            padding:0 6px
                            border:1px solid rgba(7,17,27,0.1)
                            border-radius:1px
                            color:rgb(147,153,159)
                            background:#fff
                    .time
                        position:absolute
                        top:0
                        right:0
                        font-size:10px
                        color:rgb(7,17,27)

</style>
