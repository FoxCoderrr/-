<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div>充币明细</div>
        </div>
        <div class="main">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <div>
                        <span>订单号：</span>
                        <span>{{item.order}}</span>
                    </div>
                    <div>
                        <span>时间：</span>
                        <span>{{item.time}}</span>
                    </div>
                    <div>
                        <span>收币地址：</span>
                        <span>{{item.address}}</span>
                    </div>
                    <div>
                        <span>充币金额：</span>
                        <span>{{item.number}}</span>
                    </div>
                    <div>
                        <span>状态：</span>
                        <span v-if="item.status==2">失败 <span class="f_c_red">（凭证不符）</span></span>
                        <span v-if="item.status==0">待审核</span>
                        <span v-if="item.status==1">成功</span>
                    </div>
                    <div>
                        <span>备注：</span>
                        <span>{{item.remark}}</span>
                    </div>
                    <div>
                        <span>充币凭证：</span>
                        <span>
                            <div>
                                <img @click="showBig(item.img)" :src="item.img" alt="">
                            </div>
                        </span>
                    </div>
                </li>
            </ul>
        </div>
        <img class="big_img" v-if="show" :src="src" alt="" @click="show=false;src=''">
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      bool: true,
      show: false,
      src: "",
      list:[],
    };
  },
  components: {},
  mounted() {
    let that = this;
    mui.back = function() {
      if (that.show) {
        that.show = false;
        error;
      } else {
        that.$router.back();
        error;
      }
    };
    that
      .$http({
        url: "/",
        method: "post",
        data: {
          nozzle: "recharge_log",
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
  },
  methods: {
    back() {
      let that = this;
      that.$router.back();
    },
    showBig(s) {
      this.src = s;
      this.show = true;
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  font-size: 0.36rem;
  width: 100%;
  min-height: 100%;
  color: white;
  box-sizing: border-box;
  padding-top: 1.15rem;
  > .top {
    border-bottom: 0.05rem solid #242424;
  }
  .f_c_red {
    color: rgba(229, 28, 35, 1);
  }
  .big_img {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  .main {
    ul {
      li {
        border-bottom: 1px solid #242424;
        > div {
          overflow: hidden;
          border-bottom: 1px solid #242424;
          padding: 0.3rem 6% 0.3rem;
          > span:first-child {
            float: left;
            width: 2rem;
            text-align: right;
            box-sizing: border-box;
          }
          > span:last-child {
            word-break: break-all;
            float: left;
            width: calc(100% - 2rem);
            box-sizing: border-box;
            padding-left: 0.4rem;
          }
        }
        > div:last-child {
          padding-bottom: 0.8rem;
          div {
            width: 100%;
            border: 1px solid #ba9870;
            text-align: center;
            box-sizing: border-box;
            padding: 0.2rem 0 0.2rem;
            img {
              display: inline-block;
              width: 3rem;
              height: 5rem;
            }
          }
        }
      }
    }
  }
}
</style>
