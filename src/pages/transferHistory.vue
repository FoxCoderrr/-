<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div>转账记录</div>
        </div>
        <div class="main">
            <div class="d_top f_c">
                只显示转账记录，不显示收款记录，若删除APP，所有记录将清空
            </div>
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"  infinite-scroll-immediate-check=false>
                <li>
                    <div>
                        <span>发送地址：</span>
                        <span>asdsada1231231321a23sd</span>
                    </div>
                    <div>
                        <span>接收地址：</span>
                        <span>2das213as5d32123123</span>
                    </div>
                    <div>
                        <span>数量：</span>
                        <span class="f_c">+1.123456ETH</span>
                    </div>
                    <div>
                        <span>时间：</span>
                        <span>2018-06-06 16:16:16</span>
                    </div>
                </li>
                <li>
                     <div>
                        <span>发送地址：</span>
                        <span>asdsada1231231321a23sd</span>
                    </div>
                    <div>
                        <span>接收地址：</span>
                        <span>2das213as5d32123123</span>
                    </div>
                    <div>
                        <span>数量：</span>
                        <span class="f_c">+1.123456ETH</span>
                    </div>
                    <div>
                        <span>时间：</span>
                        <span>2018-06-06 16:16:16</span>
                    </div>
                </li>
            </ul>
            <load-more v-if="lif" :show-loading="load" tip="正在加载"></load-more>
            <load-more v-if="nif" :show-loading="none" tip="没有更多数据了"></load-more>
        </div>
    </div>
</template>
<script>
import { LoadMore } from "vux";
export default {
  data() {
    return {
      list: [],
      page: 1,
      load: true,
      none: false,
      lif: true,
      nif: false,
      loading: false,
    };
  },
  components: {
      LoadMore
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    that.getlist();
  },
  methods: {
    back() {
      let that = this;
      that.$router.back();
    },
    loadMore() {
      let that = this;
      that.lif = true;
      that.page++;
      that.getlist();
    },
    getlist() {
      let that = this;
      that
      .$http({
        url: "/",
        method: "post",
        data: {
          nozzle: "withdraw_log",
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          
        } else if (res.data.code == -1) {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "text",
            position: "middle",
            time: 1200
          });
          that.$router.push({
            name:"login"
          })
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  font-size: 0.36rem;
  width: 100%;
  color: white;
  box-sizing: border-box;
  padding-top: 1.15rem;
  > .top {
    border-bottom: 0.05rem solid #242424;
  }
  .main{
      padding: 0 4% 0;
      box-sizing: border-box;
      .d_top{
          border-bottom: 1px solid rgba(186, 152, 112, .3);
          padding: 0.4rem 0 0.4rem;
      }
      ul{
          li{
              padding: 0.6rem 0 0.6rem;
              border-bottom: 1px solid rgba(186, 152, 112, .3);
              div{
                  padding-bottom: 0.4rem;
                  overflow: hidden;
                  span{
                      float: left;
                      width: calc(100% - 2rem);
                      box-sizing: border-box;
                      padding: 0 0.1rem 0;
                      word-break: break-all;
                  }
                  span:first-child{
                      width: 2rem;
                      text-align: right;
                  }
              }
              div:last-child{
                  padding: 0;
              }
          }
      }
  }
}
</style>
