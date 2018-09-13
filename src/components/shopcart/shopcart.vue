<template>
    <div class="cart-content">
        <div class="shopcart">
            <div class="content" @click="toggleList">
                <!--购物车左侧-->
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{heightline:totalCount>0}">
                            <i class="icon-shopping_cart" :class="{heightline:totalPrice>0}"></i>
                        </div>
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{heightline:totalPrice>0}">{{totalPrice}}元</div>
                    <div class="desc">另需配送费${{deliveryPrice}}元</div>
                </div>
                <!--购物侧右侧-->
                <div class="content-right" @click.stop.prevent="pay">
                    <div class="pay" :class="payClass">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <div class="ball-container">
                <transition-group name="balltra">
                    <div class="ball" v-for="(ball,index) in balls" :key="index" v-show="ball.show" >
                        <div class="inner"></div>
                    </div>
                </transition-group>
            </div>
            <transition>
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="foodsWrapper">
                        <ul>
                            <li class="food" v-for="(food,index) in selectFoods" :key="index" v-if="food.count > 0">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>$ {{food.price * food.count}}</span>
                                </div>
                                <div class="cartcontroll-wrapper">
                                    <cartcontroll :food="food"></cartcontroll>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition>
            <div class="list-mark" v-show="listShow"  @click="toggleList"></div>
        </transition>
    </div>
</template>

<script>
  import cartcontroll from '@/components/cartcontroll/cartcontroll'
  import BScroll from 'better-scroll'

  export default {
    data(){
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        fold: true
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default(){
          return [
//            {price: 10, count: 1}
          ]
        }
      },
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          if (food.count > 0){
            total += food.price * food.count
          }
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food)=>{
          if (food.count){
            count += food.count
          }
        })
        return count
      },
      payDesc(){
        if (this.totalPrice === 0) {
          return `$ ${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差$${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass(){
        let className = ""
        if (this.totalPrice >= this.minPrice){
          className = "heightline"
        }
        return className
      },
      listShow () {
        if (!this.totalCount) {
          return false
        }
        let show = !this.fold
        if (show){
          this.$nextTick(()=> {
            // eslint-disable-next-line
            this.foodsWrapper = new BScroll(this.$refs.foodsWrapper, {
              click: true
            })
          })
        }
        return show
      }
    },
    methods: {
      toggleList(){
        if (!this.totalCount){
          return false
        }
        this.fold = !this.fold
      },
      empty(){
        this.selectFoods.forEach((food)=>{
          food.count = 0
        })
      },
      pay(){
        if (this.totalPrice < this.minPrice){
          return false
        }
        window.alert(`需要支付 ${this.totalPrice} 元`)
      }
    },
    components: {
      cartcontroll
    }
  }
</script>

<style scoped lang="stylus" type="stylesheet/stylus">
    @import "../../common/stylus/maxin";
    .cart-content
        .shopcart
            position:fixed
            left:0
            bottom:0
            z-index:50
            width:100%
            height:48px
            .content
                display:flex
                background:#141d27
                color:rgba(255,255,255,0.4)
                .content-left
                    flex:1
                    .logo-wrapper
                        display:inline-block
                        position:relative
                        top:-10px
                        margin:0 12px
                        padding:6px
                        width:56px
                        height:56px
                        box-sizing:border-box
                        vertical-align:top
                        border-radius:50%
                        background:#141d27
                        .logo
                            width:100%
                            height:100%
                            border-radius:50%
                            background:#2b343c
                            text-align:center
                            &.heightline
                                background:rgb(0 ,160,220)
                            .icon-shopping_cart
                                line-height:44px
                                font-size:24px
                                color:#80858a
                                &.heightline
                                    color:#fff
                        .num
                            position:absolute
                            top:0
                            right:0
                            width:24px
                            height:16px
                            line-height:16px
                            text-align:center
                            border-radius:16px
                            font-size:9px
                            color:#fff
                            background:rgb(240,20,20)
                            box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
                    .price
                        display:inline-block
                        vertical-align:top
                        line-height:24px
                        margin-top:12px
                        box-sizing:border-box
                        padding-right:12px
                        border-right:1px solid rgba(255,255,255,0.4)
                        font-size:16px
                        font-weight:700
                        &.heightline
                            color:#fff
                    .desc
                        display:inline-block
                        vertical-align:top
                        margin:12px 0 0 12px
                        line-height:24px
                        font-size:10px
                .content-right
                    flex:0 0 105px
                    width:105px
                    .pay
                        height:48px
                        line-height:48px
                        text-align:center
                        font-size:12px
                        font-weight:700
                        background:#2b333b
                        &.heightline
                            background:green
                            color:#fff
            .ball-container
                .ball
                    position:flxed
                    left:32px
                    bottom:22px
                    z-index:200
                    &.balltra-enter-active,&.balltra-leave-active
                        tansition:all 0.4s
                        .inenr
                            width:16px
                            height:16px
                            border-radius:50%
                            background:rgb(0,160,220)
                            tansition:all 0.4s
            .shopcart-list
                position:absolute
                top:0
                left:0
                z-index:-1
                width:100%
                transform:translate3d(0, -100%, 0)
                &.v-enter-active,&.v-leave-active
                    transition:all 0.3s linear
                &.v-enter,&.v-leave-to
                    opacity:0
                    transform:translate3d(0, 0, 0)
                .list-header
                    height:40px
                    line-height:40px
                    padding:0 18px
                    background:#f3f5f7
                    border-bottom:1px solid rgba(7,17,27,0.1)
                    .title
                        float:left
                        font-size:14px
                        color:rgb(7,17,27)
                    .empty
                        float:right
                        font-size:12px
                        color:rgb(0,160,220)
                .list-content
                    padding:0 18px
                    max-height:217px
                    overflow:hidden
                    background:#fff
                    .food
                        position:relative
                        padding:12px 0
                        box-sizing:border-box
                        border-1px(rgba(7,17,27,0.1))
                        .name
                            line-height:24px
                            font-size:14px
                            color:rgb(7,17,27)
                        .price
                            position:absolute
                            right:90px
                            bottom:12px
                            line-height:24px
                            font-size:14px
                            font-weight:700
                            color:rgb(240,20,20)
                        .cartcontroll-wrapper
                            position:absolute
                            right:0
                            bottom:6px
        .list-mark
            position:fixed
            top:0
            left:0
            width:100%
            height:100%
            z-index:40
            background:rgba(7,17,27,0.6)
            &.v-enter-active,&.v-leave-active
                transition:all 0.3s linear
            &.v-enter,&.v-leave-to
                opacity:0
                background:rgba(7,17,27,0)




</style>
