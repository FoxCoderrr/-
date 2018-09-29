<template>
    <div class="d_wrap">
      <div class="main">
        <ul>
          <li @click="toLink('freedonate')">
            <span class="f_l">自由捐赠</span>
            <span class="f_r">{{info.free}}ETH</span>
          </li>
          <li @click="toLink('fixdonate')">
            <span class="f_l">定期捐赠</span>
            <span class="f_r">{{info.regular}}ETH</span>
          </li>
          <li @click="toLink('todayreturn')">
            <span class="f_l">今日回流</span>
            <span class="f_r">{{info.day_back}}ETH</span>
          </li>
          <li @click="toLink('todaybonus')">
            <span class="f_l">今日奖金</span>
            <span class="f_r">{{info.day_bonus}}ETH</span>
          </li>
          <li @click="toLink('canprofit')">
            <span class="f_l">可提现收益</span>
            <span class="f_r">{{info.use_income}}ETH</span>
          </li>
          <li>
            <span class="f_l">我的总收益</span>
            <span class="f_r">{{info.total_income}}ETH</span>
          </li>
          <li>
            <span class="f_l">我的社区捐赠</span>
            <span class="f_r">{{info.community}}ETH</span>
          </li>
        </ul>
        <div>
          <button class="btn" @click="withdraw">提现到钱包</button>
        </div>
      </div>
      <x-dialog v-model="dialog" class="ww_dialog com_dialog" hide-on-blur @on-hide="reset">
        <div class="dialog" v-if="bool">
            <!-- <span class="detail f_c" @click="toHistory">提现明细</span> -->
            <span class="vux-close" @click="dialog=false"></span>
            <div class="title">
                <span>支付信息</span>
                
            </div>
            <div class="con">
              <div>
                <span>可提现总额：{{info.use_income}}</span>
                <span>账户余额：{{info.balance}}</span>
              </div>
              <div class="d_input">
                  <span class="f_l ta_r">提现数量：</span>
                  <input class="f_l" v-model="w_num" @input="num($event)" type="number" placeholder="请输入要提现的数量">
                  <span class="f_r">ETH</span>
                </div>
              <div class="d_input">
                <span class="f_l ta_r">交易密码：</span>
                <input class="f_l" v-model="pwd" type="password" placeholder="请输入交易密码">
                <span class="f_r" @click="toForget">忘记密码？</span>
              </div>
              <div>
                <button class="btn" @click="sub">确定</button>
              </div>
            </div>
        </div>
      </x-dialog>
      <x-dialog v-model="dialog1" class="pwd_dialog com_dialog" hide-on-blur @on-hide="reset">
        <div class="dialog">
            <span class="vux-close" @click="dialog1=false;bool=true"></span>
            <div>
              <div class="d_input">
                <span class="f_l">输入密码：</span>
                <input class="f_l" v-model="pwd" type="password" placeholder="请输入交易密码">
                <span class="f_r" @click="toForget">忘记密码？</span>
              </div>
              <div class="d_input">
                <span class="f_l">手机验证码：</span>
                <input class="f_l" v-model="code" type="text" placeholder="请输入手机验证码">
                <span class="f_c f_r" :class="{f_cc:btn_msg!='发送验证码'}" @click="getCode">{{btn_msg}}</span>
              </div>
              <div>
                <button class="btn" @click="subPwd">确定</button>
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
      dialog1: false,
      bool: true,
      w_num: "",
      btn_msg: "发送验证码",
      time: 60,
      code: "",
      pwd: ""
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
      .eq(1)
      .trigger("click");
    that.getWallet();
  },
  methods: {
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
    num(e) {
      $(e.target).val(
        $(e.target)
          .val()
          .match(/\d+\.?\d{0,6}/)
      );
      this.w_num = $(e.target).val();
    },
    toLink(r) {
      this.$router.push({
        name: r
      });
    },
    toForget() {
      this.$router.push({
        name: "forgetpwd",
        params: {
          type: 1
        }
      });
    },
    toHistory() {
      this.$router.push({
        name: "withdrawhistory"
      });
    },
    withdraw() {
      let that = this;
      that.dialog = true;
    },
    getCode() {
      let that = this;
      if (that.btn_msg == "发送验证码") {
        that.btn_msg = "60秒";
        window.t = setInterval(function() {
          that.time--;
          that.btn_msg = that.time + "秒";
          if (that.time <= 0) {
            that.btn_msg = "发送验证码";
            clearInterval(window.t);
            that.time = 60;
          }
        }, 1000);
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "withdraw_code",
              token: that.$store.state.user_info.token
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "success",
                position: "middle",
                time: 3000
              });
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
              that.btn_msg = "发送验证码";
              clearInterval(window.t);
              that.time = 60;
            }
          });
      }
    },
    reset() {
      let that = this;
      that.pwd = "";
      that.code = "";
      that.time = 60;
      that.btn_msg = "发送验证码";
      clearInterval(window.t);
    },
    sub() {
      let that = this;
      if (that.w_num) {
        if (
          parseFloat(that.w_num) >= 0 &&
          parseFloat(that.w_num) <= parseFloat(that.info.use_income)
        ) {
          if (that.pwd) {
            that
              .$http({
                url: "/",
                method: "post",
                data: {
                  nozzle: "put_forward",
                  number: that.w_num,
                  password: that.pwd,
                  token: that.$store.state.user_info.token
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
                  that.pwd = "";
                  that.getWallet();
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
                    position: "bottom",
                    time: 1200
                  });
                }
              });
          } else {
            that.$vux.toast.show({
              text: "请输入交易密码！",
              type: "cancel",
              position: "middle",
              time: 1200
            });
          }
        } else {
          that.$vux.toast.show({
            text: "可用提现余额不足！",
            type: "text",
            position: "bottom",
            time: 1200
          });
        }
      } else {
        that.$vux.toast.show({
          text: "请输入提现数量！",
          type: "text",
          position: "bottom",
          time: 1200
        });
      }
    },
    subPwd() {
      let that = this;
      if (that.pwd && that.code) {
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "put_forward",
              number: that.w_num,
              password: that.pwd,
              code: that.code,
              token: that.$store.state.user_info.token
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
              that.getWallet();
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
              that.btn_msg = "发送验证码";
              clearInterval(window.t);
              that.time = 60;
            }
          });
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
  .main {
    ul {
      padding: 0 3% 0;
      box-sizing: border-box;
      li {
        overflow: hidden;
        line-height: 1.2rem;
        border-bottom: 1px solid rgba(185, 151, 112, 0.3);
      }
      li:last-child {
        border: 0;
      }
    }
    .btn {
      width: 5rem;
      line-height: 0.8rem;
      background: #ba9870;
      color: white;
      border-radius: 4px;
      display: block;
      margin: 0.4rem auto 0.5rem;
    }
  }
  .ww_dialog {
    position: relative;
    color: #333;
    .vux-close {
      position: absolute;
      right: 0.3rem;
      top: 0.4rem;
    }
    .detail {
      position: absolute;
      left: 0.3rem;
      top: 0.4rem;
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
    .dialog {
      padding: 1.1rem 0.4rem 0.6rem;
      box-sizing: border-box;
      width: 100%;
    }
    li {
      overflow: hidden;
      border-top: 1px solid #f2f2f2;
      padding: 0.2rem 0 0.2rem;
      .f_l {
        line-height: 0.8rem;
        width: 1.8rem;
        text-align: right;
      }
      .f_r {
        width: calc(100% - 2rem);
        text-align: left;
        line-height: 0.8rem;
      }
      select {
        background: transparent;
        border: 1px solid #bbb;
        border-radius: 4px;
        height: 0.8rem;
        outline: 0;
        font-size: 0.32rem;
      }
      input {
        border: 1px solid #bbb;
        color: #333;
        box-sizing: border-box;
        padding-left: 0.2rem;
      }
    }
    .title {
       padding-bottom: 0.4rem;
       font-size: 0.4rem;
      .d_input {
        overflow: hidden;
        box-sizing: border-box;
        padding: 0.2rem 10% 0.4rem;
      }
      span {
        line-height: 0.9rem;
      }
      input {
        border: 1px solid #bbb;
        line-height: 0.9rem;
        width: calc(100% - 1rem);
        box-sizing: border-box;
        padding-left: 0.2rem;
      }
    }
    .con {
      > div:first-child {
        overflow: hidden;
        padding-bottom: 0.2rem;
        span:first-child {
          float: left;
          text-align: left;
          color: #ba9870;
        }
        > span:last-child {
          text-align: right;
          float: right;

        }
      }
      .d_input {
        line-height: 0.8rem;
        overflow: hidden;
        margin-top: 0.4rem;
        margin-bottom: 0.6rem;
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
        input {
          border: 1px solid #bbb;
          line-height: 0.8rem;
          box-sizing: border-box;
          padding: 0 0.2rem 0;
          width: calc(100% - 5rem);
        }
        span {
          width: 2.4rem;
          padding-right: 0.2rem;
        }
        span:last-child{
          width: 2rem;
           font-size: 0.32rem;
          color: #ba9870;
          text-align: left;
          padding-left: 0.2rem;
        }
        .f_cc {
          color: #aaa;
        }
      }
    }
    .btn {
      display: block;
      width: 3rem;
      text-align: center;
      background: #ba9870;
      color: white;
      line-height: 0.7rem;
      border-radius: 4px;
      margin: 0.6rem auto 0;
    }
  }
  .pwd_dialog {
    .dialog {
      color: #333;
      padding: 1.8rem 3% 0.6rem;
      .vux-close {
        position: absolute;
        right: 0.3rem;
        top: 0.4rem;
      }
      .d_input {
        line-height: 0.8rem;
        overflow: hidden;
        margin-bottom: 0.6rem;
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
        input {
          border: 1px solid #bbb;
          line-height: 0.8rem;
          box-sizing: border-box;
          padding: 0 0.2rem 0;
          width: calc(100% - 4.8rem);
        }
        span {
          width: 2.4rem;
        }
        .f_cc {
          color: #aaa;
        }
      }
      .btn {
        display: block;
        width: 3rem;
        text-align: center;
        background: #ba9870;
        color: white;
        line-height: 0.7rem;
        border-radius: 4px;
        margin: 0.6rem auto 0;
      }
    }
  }
}
</style>
