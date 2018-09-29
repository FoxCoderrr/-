<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div></div>
        </div>
        <div class="d_logo">
          <img src="../assets/logo.png" alt="">
        </div>
        <div class="form">
          <div class="d_input">
            <div class="f_l">
              <span>手机号：</span>
            </div>
            <div class="f_r">
                <x-input class="" type="tel" mask="999 9999 9999" :max=13 v-model="u_phone" placeholder="请输入手机号"></x-input>
            </div>
          </div>
          <div class="d_input">
            <div class="f_l">
              <span>登录密码：</span>
            </div>
            <div class="f_r">
                <x-input class="" type="password"  v-model="u_pwd" placeholder="请输入新登录密码"></x-input>
            </div>
          </div>
          <div class="d_input">
            <div class="f_l">
              <span>确认登录密码：</span>
            </div>
            <div class="f_r">
                <x-input class="" type="password"  v-model="u_pwd1" placeholder="请再次输入新登录密码"></x-input>
            </div>
          </div>
          <div class="d_input">
            <div class="f_l">
              <span>安全密码：</span>
            </div>
            <div class="f_r">
                <x-input class="" type="password"  v-model="uu_pwd" placeholder="请输入新安全密码"></x-input>
            </div>
          </div>
          <div class="d_input">
            <div class="f_l">
              <span>确认安全密码：</span>
            </div>
            <div class="f_r">
                <x-input class="" type="password"  v-model="uu_pwd1" placeholder="请再次输入新安全密码"></x-input>
            </div>
          </div>
          <div class="d_input">
            <div class="f_l">
              <span>验证码：</span>
            </div>
            <div class="f_r">
                <input type="text" placeholder="请输入验证码" v-model="code">
                <span class="code_span" :class="{f_cc:btn_msg!='发送验证码'}" @click="getCode">{{btn_msg}}</span>
            </div>
          </div>
          <div class="d_input">
            <div class="f_l">
              <span>邀请码：</span>
            </div>
            <div class="f_r">
                <input class="" type="text"  v-model="yqm" placeholder="请输入邀请码"/>
                <span class="code_span">（必填项）</span>
            </div>
          </div>
        </div>
        <div class="form_bot">
            <div>
                <check-icon :value.sync="ifAgree"></check-icon>
                <span>我已阅读并同意<span class="f_c" @click="toProtocal"> 《时间沙漏注册服务协议》</span></span>
            </div>
          <button class="btn" @click="sub">确认</button>
        </div>
        <div class="mask">
          <div class="d_top">
            <img @click.stop="hideProtocal" class="back_img" src="../assets/nav_back.png" alt="">
            <span>注册服务协议</span>
          </div>
          <div class="d_main">
            <div v-html="protocal"></div>
          </div>
        </div>
      <x-dialog v-model="dialog0" class="default_dialog" @on-hide="dialog=false">
        <div class="dialog">
          <span class="vux-close" @click="dialog0 = false"></span>
            <div class="title">风险提示</div>
            <div class="con ta_l">
              {{warn}}
            </div>
            <div>
                <button class="btn" @click="regSuc">确认风险</button>
            </div>
        </div>
      </x-dialog>
    </div>
</template>
<script>
import { XInput, CheckIcon, XDialog } from "vux";
import $ from "jquery";
export default {
  data() {
    return {
      dialog0: false,
      warn: "",
      u_phone: "",
      u_pwd: "",
      u_pwd1: "",
      uu_pwd: "",
      uu_pwd1: "",
      code: "",
      yqm: "",
      btn_msg: "发送验证码",
      ifAgree: false,
      time: 60,
      protocal: ""
    };
  },
  components: {
    XInput,
    CheckIcon,
    XDialog
  },
  mounted() {
    let that = this;
    mui.back = function() {
      clearInterval(window.t);
      that.$router.back();
      error;
    };
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    that.height = height;
    $(".wrap").css("min-height", height);
    // 风险提示
    that
      .$http({
        url: "/",
        method: "post",
        data: {
          nozzle: "risk_hints"
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.warn = res.data.data;
        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "text",
            position: "middle",
            time: 1200
          });
        }
      });
    that
      .$http({
        url: "/",
        method: "post",
        data: {
          nozzle: "register_protocol"
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.protocal = res.data.data;
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
      clearInterval(window.t);
      that.$router.back();
    },
    toProtocal() {
      $(".mask").fadeIn();
    },
    hideProtocal() {
      $(".mask").fadeOut();
    },
    getCode() {
      let that = this;
      let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (
        reg
          .test(that.u_phone)
          .toString()
          .replace(/ /g, "")
      ) {
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
                nozzle: "register_code",
                phone: that.u_phone.toString().replace(/ /g, "")
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
      } else {
        that.$vux.toast.show({
          text: "请输入正确的手机号！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    sub() {
      let that = this;
      if (
        that.u_phone &&
        that.u_pwd &&
        that.u_pwd1 &&
        that.uu_pwd &&
        that.uu_pwd1 &&
        that.code
      ) {
        if (that.u_pwd == that.u_pwd1) {
          if (that.uu_pwd == that.uu_pwd1) {
            if (that.ifAgree) {
              that.dialog0 = true;
            } else {
              that.$vux.toast.show({
                text: "请阅读并同意注册协议！",
                type: "cancel",
                position: "middle",
                time: 1200
              });
            }
          } else {
            that.$vux.toast.show({
              text: "两次安全密码输入不一致！",
              type: "cancel",
              position: "middle",
              time: 1200
            });
          }
        } else {
          that.$vux.toast.show({
            text: "两次登录密码输入不一致！",
            type: "cancel",
            position: "middle",
            time: 1200
          });
        }
      } else {
        this.$vux.toast.show({
          text: "请输入完整信息！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    regSuc() {
      let that = this;
      that.$vux.loading.show({
        text: ""
      });
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "register",
            phone: that.u_phone.toString().replace(/ /g, ""),
            login: that.u_pwd,
            confirm_login: that.u_pwd1,
            trade: that.uu_pwd,
            confirm_trade: that.uu_pwd1,
            code: that.code,
            reid: that.yqm
          }
        })
        .then(function(res) {
          that.dialog0 = false;
          that.$vux.loading.hide();
          if (res.data.code == 1) {
            that.$vux.alert.show({
              title: "成功",
              content: "注册成功！",
              buttonText: "立即登录",
              onShow() {},
              onHide() {
                that.dialog0 = false;
                that.$router.push({
                  name: "login"
                });
              }
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
  position: absolute;
  width: 100%;
  color: white;

  .d_logo {
    overflow: hidden;
    img {
      display: block;
      width: 2.6rem;
      height: 2.6rem;
      margin: 1.6rem auto;
    }
  }
  .form {
    padding: 0 4% 0;
    .d_input {
      overflow: hidden;
      margin-bottom: 0.4rem;
      > .f_l {
        width: 3rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: right;
      }
      > .f_r {
        width: calc(100% - 3rem);
        border-bottom: 1px solid rgba(255, 255, 255, 0.4);
        .code_span {
          float: right;
          line-height: 0.8rem;
          color: #ba9870;
        }
        .f_cc {
          color: rgba(255, 255, 255, 0.5);
        }

        > input {
          width: calc(100% - 106px);
          background: transparent;
          color: white;
          line-height: 0.8rem;
          padding-left: 0.15rem;
          box-sizing: border-box;
        }
      }
    }
  }
  .form_bot {
    padding: 0 12% 0;
    > div {
      font-size: 0.32rem;
      padding-bottom: 1rem;
      text-align: center;
    }
    .btn {
      display: block;
      width: 100%;
      line-height: 0.9rem;
      text-align: center;
      color: white;
      background: #ba9870;
      border-radius: 20px;
    }
    > div {
      overflow: hidden;
      > span {
        margin-top: 0.3rem;
      }
      a {
        color: #ba9870;
        font-size: 0.32rem;
      }
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #010101;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
    padding-top: 1.15rem;
    z-index: 2;
    display: none;
    .d_top {
      position: fixed;
      line-height: 1.1rem;
      width: 100%;
      top: 0;
      left: 0;
      text-align: center;
      font-size: 0.38rem;
      background: #010101;
      border-bottom: 0.05rem solid #242424;
    }
    .d_top > .back_img {
      position: absolute;
      left: 3%;
      top: 0.14rem;
      width: 0.8rem;
    }
    .d_main {
      padding: 0.4rem 4% 0.4rem;
      max-height: 100%;
      box-sizing: border-box;
      overflow: auto;
    }
  }
  .default_dialog {
    .dialog {
      color: #333;
      padding: 0.8rem 0.4rem 0.6rem;
      box-sizing: border-box;
      width: 100%;
      .vux-close {
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
      }
      .title {
        padding: 0.2rem 0 0.4rem;
      }
      .con {
        max-height: 8rem;
        overflow: auto;
      }
      .btn {
        display: block;
        width: 3rem;
        text-align: center;
        background: #ba9870;
        color: white;
        line-height: 0.7rem;
        border-radius: 20px;
        margin: 0.6rem auto 0;
      }
    }
  }
}
</style>
