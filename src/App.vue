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
        <keep-alive>
            <router-view :seller="seller" ></router-view>
        </keep-alive>
    </div>
</template>




<script>
import {urlParse} from '@/common/js/util'
import header from '@/components/header/header'
const config = require('../config')

export default {
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  created(){
    this.$http.get(config.apiHost.seller + "?id=" + this.seller.id).then((response) => {
      response = response.body
      this.seller = Object.assign({}, this.seller, response)
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
