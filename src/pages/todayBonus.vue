<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div>奖金明细</div>
        </div>
        <div class="main">
            <ul>
                <li>
                    <span>时间</span>
                    <span>类别</span>
                    <span>奖金</span>
                </li>
            </ul>
            <!-- <van-pull-refresh v-model="isLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="努力加载中..." @refresh="onRefresh"> -->
            <!-- <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"  infinite-scroll-immediate-check=false> -->
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <span>{{item.time}}</span>
                    <span>{{item.type}}</span>
                    <span>{{item.number}}ETH</span>
                </li>
            </ul>
            <!-- </van-pull-refresh> -->
        </div>
            <!-- <load-more v-if="lif" :show-loading="load" tip="正在加载"></load-more>
            <load-more v-if="nif" :show-loading="none" tip="没有更多数据了"></load-more> -->
    </div>
</template>
<script>
// import { LoadMore } from "vux";
// import { PullRefresh } from "vant";
// import "vant/lib/vant-css/pull-refresh.css";
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
      isLoading: false
    };
  },
  components: {
    // LoadMore,
    // "van-pull-refresh": PullRefresh,
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
    onRefresh() {
      let that = this;
      that.isLoading = true;
      that.page = 1;
      that.list = [];
      that.getlist();
    },
    // loadMore() {
    //   let that = this;
    //   that.lif = true;
    //   that.page++;
    //   that.getlist();
    // },
    getlist(){
      let that = this;
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "bonus_flow",
            token: that.$store.state.user_info.token
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.list = res.data.data;
          } else if (res.data.code == -1) {
            that.$vux.toast.show({
              text: res.data.msg,
              type: "text",
              position: "middle",
              time: 1200
            });
            that.$router.push({
              name: "login"
            });
          } else {
            that.$vux.toast.show({
              text: res.data.msg,
              type: "text",
              position: "middle",
              time: 1200
            });
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
  height: 100%;
  background: #242424;
  color: white;
  padding-top: 2.2rem;
  box-sizing: border-box;
  > .top {
    border-bottom: 0.05rem solid #242424;
  }
  .main {
    box-sizing: border-box;
    background: #010101;
    ul:first-child{
        position: fixed;
        top: 1.15rem;
        width: 100%;
        background: #010101;
        z-index: 99;
    }
    ul {
      li {
        overflow: hidden;
        padding: 0.3rem 0 0.3rem;
        border-bottom: 1px solid #242424;
        background: #010101;
        span {
          float: left;
          width: 33.3%;
          text-align: center;
        }
      }
    }
  }
}
</style>
