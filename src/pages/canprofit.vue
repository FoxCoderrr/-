<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div>可提现收益明细</div>
        </div>
        <div class="zong f_c ta_r">共计：{{sum}}ETH</div>
        <div class="main">
            <ul>
                <li>
                    <span>时间</span>
                    <span>类别</span>
                    <span>模式</span>
                    <span>金额</span>
                </li>
            </ul>
            <!-- <van-pull-refresh v-model="isLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="努力加载中..." @refresh="onRefresh"> -->
            <!-- <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"  infinite-scroll-immediate-check=false> -->
              <ul>
                <li v-for="(item,index) in list" :key="index">
                    <span>{{item.time}}</span>
                    <span>{{item.type}}</span>
                    <span>{{item.name}}</span>
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
      sum:0,
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
    // LoadMore
    // "van-pull-refresh": PullRefresh,
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
        name:"coffers"
      });
      error;
    };
    that.getlist();
  },
  methods: {
    back() {
      let that = this;
      that.$router.push({
        name:"coffers"
      });
    },
    // onRefresh() {
    //   let that = this;
    //   that.isLoading = true;
    //   that.page = 1;
    //   that.list = [];
    //   that.getlist();
    // },
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
            nozzle: "profit_log",
            token: that.$store.state.user_info.token
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.list = res.data.data;
            if(res.data.data.length){
              let s=0;
              for(let i=0,l=res.data.data.length;i<l;i++){
                s=(parseFloat(s)+parseFloat(res.data.data[i].number)).toFixed(4);
              }
              that.sum =s;
            }
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
  padding-top: 3.2rem;
  box-sizing: border-box;
  > .top {
    border-bottom: 0.05rem solid #242424;
  }
  .zong {
    position: fixed;
    width: 100%;
    top: 1.15rem;
    line-height: 1rem;
    background: #010101;
    box-sizing: border-box;
    padding: 0 4% 0;
    z-index: 99;
    border-bottom: 0.05rem solid #242424;
  }
  .main {
    box-sizing: border-box;
    background: #010101;
    ul:first-child {
      position: fixed;
      top: 2.15rem;
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
          width: 24%;
          text-align: center;
          min-height: 1px;
        }
        span:last-child {
          width: 28%;
        }
      }
    }
    ul:nth-child(2) {
      li {
        span:nth-child(2),
        span:nth-child(3),
        span:last-child {
          // padding-top: 0.3rem;
        }
      }
    }
  }
}
</style>
