<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller"> 商家</router-link>
            </div>
        </div>
        <router-view></router-view>
        <div class="content">i am content</div>
    </div>
</template>

<script>
import header from './components/header/header'

export default {
  data () {
    return {
      seller: {}
    }
  },
  created(){
    this.$http.get('http://localhost:3000/seller').then((response)=>{
      response = response.body
      this.seller = response
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style scoped lang="stylus" type="stylesheet/stylus">
    @import "./common/stylus/maxin.styl";
    #app
        .tab
            display:flex
            width:100%
            height:40px
            line-height:40px
            border-1px(rgba(7,17,27,0.1))  /*实现可以缩放的一像素边框*/
            .tab-item
                flex:1
                text-align:center
                & > a
                    display:block
                    font-size:14px
                    color:rgb(77,85,93)
                    &.router-link-active
                        color:red



</style>
