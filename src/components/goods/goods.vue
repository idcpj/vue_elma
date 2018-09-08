<template>
    <div class="goods">
        <!--左侧菜单栏-->
        <div class="menu-wrapper"  ref="menuWrapper">
            <ul>
                <li v-for="(item,key) in goods" :key="key" class="menu-item" :class="{'current':currentIndex===key}" @click="selectMenu(key)">
                    <span class="text">
                        <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>

                </li>
            </ul>
        </div>
        <!--右侧商品栏-->
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" :key="item.id" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" :key="food.id" class="food-item border-1px">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评{{food.rating}}</span>
                                </div>
                                <div class="price">
                                    <span class="now">${{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">${{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'

  const config = require('../../../config')
  var ERR_OK = 200

  export default {
    props: {
      seller: {
      }
    },
    data(){
        return {
          classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
          goods: [],
          listHeight: [],
          scrollY: 0
        }
    },
    // 计算属性
    computed: {
      currentIndex() {
        // 此函数在this.scrollY  发生改变时,才会激活,所以这属性需要 有 this.xxxx 绑定参数
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    created(){
      this.$http.get(config.apiHost.goods).then((response)=>{
        if (response.status === ERR_OK){
            this.goods = response.body
          // 由于 goods 的渲染是异步方式,所以加入 nextTick 时,使其可精确计算DOM 高度
            this.$nextTick(()=>{
              this._initScroll()
              this._calculateHeight()
            })
        }

      })
    },
    methods: {
      selectMenu(index){
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _initScroll(){
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true})
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos)=>{
          this.scrollY = Math.abs(Math.floor(pos.y))
        })
      },
      _calculateHeight(){
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
            height += item.clientHeight
            this.listHeight.push(height)
        }
      }
    },
    components: {
      shopcart
    }

  }
</script>

<style scoped lang="stylus" type="stylesheet/stylus">
    @import "../../common/stylus/maxin.styl";
    .goods
        display:flex
        position:absolute
        top:174px
        width:100%
        bottom:46px
        overflow:hidden
        .menu-wrapper
            flex:0 0 80px
            width:80px
            background:#f3f5f7
            .menu-item
                display:table
                height:54px
                width:56px
                line-height:14px
                background-repeat:no-repeat
                margin:0 auto
                &.current
                    position:relative
                    z-index:10
                    margin-top:-1px
                    background :#fff
                    font-weight:700
                    width:100%
                    text-align:center
                    .text
                        border-none()
                .text
                    font-size:12px
                    display:table-cell
                    width:12px
                    vertical-align:middle
                    border-1px(rgba(7,17,27,0.1))
                    text-align:center
                    .icon
                        display:inline-block
                        vertical-align:top
                        width:12px
                        height:12px
                        color:red
                        margin-right:2px
                        background-size:12px
                        background-repeat:no-repeat
                        &.decrease
                            bg-image("img/decrease_3")
                        &.discount
                            bg-image("img/discount_3")
                        &.guarantee
                            bg-image("img/guarantee_3")
                        &.invoice
                            bg-image("img/invoice_3")
                        &.special
                            bg-image("img/special_3")
        .foods-wrapper
            flex:1
            /*overflow:auto*/
            .title
                padding-left:14px
                height:26px
                line-height:26px
                border-left:2px solid #d9dde1
                font-size:12px
                color:rgb(147,152,159)
                background:#f3f5f7
            .food-item
                display:flex
                margin:18px
                border-1px:(rgba(7,17,27,0.1))
                padding-bottom:18px
                &.last-child
                    border-none()
                    margin-bottom:0
                .icon
                    flex:0 0 57px
                    margin-right:10px
                .content
                    flex:1
                    .name
                        margin:2px 0 8px 0
                        height:14px
                        line-height:14px
                        font-size:14px
                        color:rgb(7,17,27)
                    .desc , .extra
                        line-height:10px
                        font-size:10px
                        color:rgb(147,153,159)
                    .desc
                        line-height:10px
                        margin-bottom:8px
                    .extra
                        .count
                            margin-right:12px
                    .price
                        font-weight:700
                        line-height:24px
                        .now
                            margin-right:8px
                            font-size:14px
                            color:rgb(240,20,20)
                        .old
                            text-decoration:line-through
                            font-size:10px
                            color:rgb(147,153,159)
                .content-right
                    flex:0 0 105px
                    width:105px
                    .pay
                        height:48px
                        line-height:48px
                        text-align:center
                        font-size:12px
                        font-weight:700


</style>
