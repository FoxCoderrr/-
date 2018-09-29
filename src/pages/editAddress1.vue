<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div>C2C地址管理</div>
        </div>
        <div class="main">
            <ul>
                <li>
                    <span>地址</span>
                    <span>操作</span>
                </li>
            </ul>
            <!-- <van-pull-refresh v-model="isLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="努力加载中..." @refresh="onRefresh"> -->
            <!-- <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"  infinite-scroll-immediate-check=false> -->
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <span>{{item.ads}}</span>
                    <span class="f_c" @click="deleteAds(item.id)">
                        <span>删除</span>
                    </span>
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
// import { XTable } from "vux";
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
    //   XTable,
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
    // onRefresh() {
    //   let that = this;
    //   that.isLoading = true;
    //   that.page = 1;
    //   that.list = [];
    //   that.getlist();
    // },
    deleteAds(ads) {
      let that = this;
      that.$vux.confirm.show({
        title: "删除",
        confirmText: "确定",
        cancelText: "取消",
        content: "确定要删除该地址吗？",
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle:"del_transfer",
                token: that.$store.state.user_info.token,
                address: ads,
              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
                that.$vux.toast.show({
                  text: "删除成功！",
                  type: "success",
                  position: "middle",
                  time: 1200
                });
                that.getlist();
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
                  type: "cancel",
                  position: "middle",
                  time: 1200
                });
              }
            });
        }
      });
    },
    // loadMore() {
    //   let that = this;
    //   that.lif = true;
    //   that.page++;
    //   that.getlist();
    // },
    getlist() {
      let that = this;
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle:"index_transfer",
            token: that.$store.state.user_info.token
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            if(res.data.data.length){
              for(let i=0,l=res.data.data.length;i<l;i++){
                res.data.data[i].ads =
                res.data.data[i].address.split(":")[0] +
                "【" +
                res.data.data[i].address.split(":")[1] +
                "】";
              }
            }
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
              type: "cancel",
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
    ul:first-child {
      position: fixed;
      top: 1.15rem;
      width: 100%;
      background: #010101;
      z-index: 99;
      li {
        > span {
          float: left;
          width: 2rem;
        }
        > span:first-child {
          width: calc(100% - 2rem);
        }
      }
    }
    ul {
      li {
        overflow: hidden;
        padding: 0.3rem 0 0.3rem;
        border-bottom: 1px solid #242424;
        display: table;
        width: 100%;
        > span {
          display: table-cell;
          width: 2rem;
          text-align: center;
          vertical-align: middle;
        }
        > span:first-child {
          width: calc(100% - 2rem);
          box-sizing: border-box;
          padding: 0 0.2rem 0;
          word-break: break-all;
        }
      }
    }
  }
}
</style>
