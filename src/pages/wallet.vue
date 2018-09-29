<template>
    <div class="d_wrap">
      <div class="main">
        <div class="can">
          <span>余额：</span>
          <span>{{info.balance}}ETH</span>
        </div>
        <div class="d_ads">
          <div>
            <span class="f_l">钱包地址：</span>
            <span class="f_r" v-clipboard:copy="address" v-clipboard:success="onCopy" v-clipboard:error="onError">{{address_}}</span>
            <!-- <select class="f_r">
              <option v-for="(item,index) in list" :key="index" value="">{{item.ads}}</option>
            </select> -->
            <!-- <div class="d_copy">
              <button class="f_r btn" v-clipboard:copy="address" v-clipboard:success="onCopy" v-clipboard:error="onError">复制地址</button>
            </div> -->
          </div>
          <div class="ta_c add_ads">
              <span class="iconfont icon-tianjia" @click="addAds"></span>
              <span @click="addAds">添加提币地址</span>
              <span class="editAds f_c" @click="toEdit">提币地址管理</span>
          </div>
          <div class="d_btn ta_c">
            <button class="btn" @click="toTopup">充币</button>
            <button class="btn" @click="toWithdraw">提币</button>
            <button class="btn" @click="toTransfer">C2C</button>
            <button class="btn" @click="toHistory">转账记录</button>
          </div>
        </div>
      </div>
      <x-dialog v-model="dialog" class="ads_dialog" hide-on-blur @on-hide="reset">
        <div class="dialog">
          <div class="title">添加提币地址</div>
          <div class="form">
            <div>
              <span>提币地址：</span>
              <input type="text" placeholder="请输入提币地址" v-model="ads">
            </div>
            <div>
              <span class="f_l">地址标签：</span>
              <input class="f_r" type="text" placeholder="如：火币" v-model="tag">
            </div>
            <div>
              <button class="btn" @click="subAdd">确定</button>
              <button class="btn" @click="cancel">取消</button>
            </div>
          </div>
        </div>
      </x-dialog>
    </div>
</template>
<script>
import $ from "jquery";
import { XDialog } from "vux";
export default {
  data() {
    return {
      info: "",
      dialog: false,
      ads: "",
      tag: "",
      list: [],
      address:"",
      address_:"",
    };
  },
  components: {
    XDialog
  },
  mounted() {
    let that = this;
    mui.back = function() {
      mui.plusReady(function() {
        var main = plus.android.runtimeMainActivity();
        main.moveTaskToBack(false);
      });
      error;
    };
    $(".tb .vux-tab-item")
      .eq(2)
      .trigger("click");
      that
      .$http({
        url: "/",
        method: "post",
        data: {
          nozzle: "home",
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.address_=res.data.data.address.substr(0,15)+"..."+res.data.data.address.substr(res.data.data.address.length-15);
          that.address = res.data.data.address;
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
        }
      });
    that.getWallet();
    that.getAds();
  },
  methods: {
    getAds() {
      let that = this;
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "withdraw_address",
            token: that.$store.state.user_info.token
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            if (res.data.data.length) {
              for (let i = 0, l = res.data.data.length; i < l; i++) {
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
    },
    getWallet() {
      let that = this;
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "my_vault",
            token: that.$store.state.user_info.token
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.info = res.data.data;
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
    onCopy(e) {
      this.$vux.toast.show({
        text: "复制地址成功",
        type: "success",
        position: "middle",
        time: 1200
      });
    },
    // 复制失败
    onError(e) {
      this.$vux.toast.show({
        text: "复制地址失败！",
        type: "cancel",
        position: "middle",
        time: 1200
      });
    },
    reset() {
      this.ads = "";
      this.tag = "";
    },
    toTopup() {
      this.$router.push({
        name: "topupcoin"
      });
    },
    toTransfer(){
      this.$router.push({
        name: "transfercoin1"
      });
    },
    toWithdraw() {
      if (this.list.length) {
        this.$router.push({
          name: "withdrawcoin"
        });
      } else {
        this.$vux.toast.show({
          text: "请添加钱包地址",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    toHistory() {
      this.$router.push({
        name: "withdrawhistory"
      });
    },
    toEdit() {
      this.$router.push({
        name: "editaddress"
      });
    },
    addAds() {
      this.dialog = true;
    },
    cancel() {
      this.dialog = false;
      this.reset();
    },
    subAdd() {
      let that = this;
      if (that.ads && that.tag) {
        let reg = /^[A-Za-z0-9]+$/;
        if (reg.test(that.ads)) {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "increase_address",
                token: that.$store.state.user_info.token,
                address: that.ads,
                name: that.tag
              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
                that.$vux.toast.show({
                  text: res.data.msg,
                  type: "success",
                  position: "middle",
                  time: 1200
                });
                that.dialog = false;
                that.getAds();
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
        } else {
          that.$vux.toast.show({
            text: "请输入正确的钱包地址",
            type: "cancel",
            position: "middle",
            time: 1200
          });
        }
      } else {
        that.$vux.toast.show({
          text: "请输入完整信息！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.d_wrap {
  font-size: 0.36rem;
  width: 100%;
  color: white;
  box-sizing: border-box;
  padding: 0.6rem 0 0.6rem;
  .main {
    .can {
      text-align: center;
      span:last-child {
        font-size: 0.6rem;
      }
    }
    .d_ads {
      padding: 0 3% 0;
      box-sizing: border-box;
      > div {
        overflow: hidden;
        padding-top: 0.6rem;
        .d_copy{
          padding-top: 0.2rem;
          overflow: hidden;
          clear: both;
          .btn{
            width: 2rem;
            background: transparent;
            color: #ba9870;
          }
        }
        span {
          line-height: 0.8rem;
        }
        .f_r {
          background: rgba(186, 152, 112, 0.6);
          border: 1px solid rgba(186, 152, 112, 0.6);
          border-radius: 4px;
          height: 0.8rem;
          outline: 0;
          color: white;
          width: calc(100% - 2rem);
          font-size: 0.32rem;
          box-sizing: border-box;
          padding: 0 0.1rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      > .add_ads {
        color: #aaa;
        // padding-top: 0.2rem;
        line-height: 0.6rem;
        position: relative;
        .iconfont {
          font-size: 0.6rem;
          display: inline-block;
          vertical-align: sub;
          padding-right: 0.1rem;
        }
        .editAds {
          position: absolute;
          right: 3%;
        }
      }
      .d_btn {
        .btn {
          line-height: 0.6rem;
          width: 1.8rem;
          border-radius: 4px;
          border: 1px solid #ba9870;
          background: transparent;
          color: #ba9870;
          margin-left: 0.2rem;
        }
        .btn:first-child {
          background: #ba9870;
          color: white;
          margin: 0;
        }
      }
    }
  }
  .ads_dialog {
    .dialog {
      color: #333;
      position: relative;
      padding: 0.6rem 0.5rem 0;

      .title {
        font-size: 0.46rem;
      }
      .form {
        > div {
          overflow: hidden;
          line-height: 0.8rem;
          margin-bottom: 0.6rem;
          input {
            border: 1px solid #bbb;
            padding: 0 0.2rem 0;
            line-height: 0.8rem;
            box-sizing: border-box;
            width: calc(100% - 2rem);
          }
          ::-webkit-input-placeholder {
            color: #888;
          }
          ::-moz-input-placeholder {
            color: #888;
          }
          ::-o-input-placeholder {
            color: #888;
          }
          ::-ms-input-placeholder {
            color: #888;
          }

          .btn {
            width: 2rem;
            line-height: 0.66rem;
            border: 1px solid #ba9870;
            background: #ba9870;
            color: white;
            border-radius: 4px;
            margin: 0 0.5rem 0;
          }
          .btn:last-child {
            background: transparent;
            color: #ba9870;
          }
        }
        > div{
          span {
            display: block;
            text-align: left;
          }
          input {
            width: 100%;
            display: block;
          }
        }
        >div:first-child{
          margin-bottom: 0.2rem;
        }
      }
    }
  }
}
</style>
