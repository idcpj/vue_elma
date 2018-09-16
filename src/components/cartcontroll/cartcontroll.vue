<template>
    <div class="cartcontroll">
        <transition >
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
                <span class="icon-remove_circle_outline inner"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(){
        if (!this.food.count){
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart(){
        if (this.food.count){
          this.food.count--
        }
      }
    },
    components: {}
  }
</script>

<style scoped lang="stylus" type="stylesheet/stylus">
    .cartcontroll
        font-size: 0
        .cart-decrease
            display:inline-block
            padding:6px
            line-height:24px
            font-size:24px
            color:#068dc7
            .inner
                display:inline-block
                line-height:24px
                font-size:24px
            &.v-enter-active,&.v-leave-active
                transition:all 0.3s linear
            &.v-enter,&.v-leave-to
                opacity:0
                transform:translate3d(30px, 0, 0)
                .inner
                    transform:rotate(180deg)
        .cart-count
            display:inline-block
            vertical-align:top
            width:12px
            padding-top:6px
            line-height:24px
            text-align:center
            font-size:10px
            color:rgb(147,153,159)
        .cart-add
            display:inline-block
            padding:8px
            line-height:24px
            font-size:24px
            color:#068dc7
</style>
