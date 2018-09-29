<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div>忘记密码</div>
        </div>
        <tab v-if="$route.params.type==0" class="tab" :line-width = 2  bar-active-color="#ba9870" active-color="#ba9870" :scroll-threshold="5">
          <tab-item selected class="tab0" v-model.number="tabIndex" @click.native="navTap(0)">修改登录密码</tab-item>
          <tab-item class="tab1" @click.native="navTap(1)">修改安全密码</tab-item>
        </tab>
        <tab v-if="$route.params.type==1" class="tab" :line-width = 2  bar-active-color="#ba9870" active-color="#ba9870" :scroll-threshold="5">
          <tab-item class="tab0" v-model.number="tabIndex" @click.native="navTap(0)">修改登录密码</tab-item>
          <tab-item selected class="tab1" @click.native="navTap(1)">修改安全密码</tab-item>
        </tab>
        <div class="form" v-if="nid==0">
          <div class="d_input">
            <div class="f_l">
              <span>手机号：</span>
            </div>
            <div class="f_r">
                <x-input class="" type="tel" mask="999 9999 9999" :max=13 v-model="u_phone" placeholder="请输入注册时的手机号"></x-input>
            </div>
          </div>
          <div class="d_input">
            <div class="f_l">
              <span>验证码：</span>
            </div>
            <div class="f_r">
                <input type="text" placeholder="请输入验证码" v-model="u_code">
                <span @click="getCode" class="code_span" :class="{f_cc:btn_msg!='发送验证码'}">{{btn_msg}}</span>
            </div>
          </div>
          <div class="d_input">
            <div class="f_l">
              <span>新登录密码：</span>
            </div>
            <div class="f_r">
                <x-input class="" type="password"  v-model="u_pwd" placeholder="请输入新登录密码"></x-input>
            </div>
          </div>
          <div class="d_input">
            <div class="f_l">
              <span>确认新登录密码：</span>
            </div>
            <div class="f_r">
                <x-input class="" type="password"  v-model="u_pwdd" placeholder="请再次输入新登录密码"></x-input>
            </div>
          </div>
            <div class="form_bot">
                <button class="btn" @click="sub">提交</button>
            </div>
        </div>
        <div class="form" v-if="nid==1">
          <div class="d_input">
            <div class="f_l">
              <span>手机号：</span>
            </div>
            <div class="f_r">
                <x-input class="" type="tel" mask="999 9999 9999" :max=13 v-model="u_phone1" placeholder="请输入注册时的手机号"></x-input>
            </div>
          </div>
          <div class="d_input">
            <div class="f_l">
              <span>验证码：</span>
            </div>
            <div class="f_r">
                <input type="text" placeholder="请输入验证码" v-model="u_code1">
                <span @click="getCode1" class="code_span" :class="{f_cc:btn_msg1!='发送验证码'}">{{btn_msg1}}</span>
            </div>
          </div>
          <div class="d_input">
            <div class="f_l">
              <span>新安全密码：</span>
            </div>
            <div class="f_r">
                <x-input class="" type="password"  v-model="u_pwd1" placeholder="请输入新安全密码"></x-input>
            </div>
          </div>
          <div class="d_input">
            <div class="f_l">
              <span>确认新安全密码：</span>
            </div>
            <div class="f_r">
                <x-input class="" type="password"  v-model="u_pwdd1" placeholder="请再次输入新安全密码"></x-input>
            </div>
          </div>
            <div class="form_bot">
            <button class="btn" @click="sub1">提交</button>
            </div>
        </div>
    </div>
</template>
<script>
import { Tab, TabItem, XInput } from "vux";
import $ from "jquery";
export default {
  data() {
    return {
      nid: 0,
      ccode: "",
      u_phone: "",
      u_code: "",
      u_pwd: "",
      u_pwdd: "",
      btn_msg: "发送验证码",
      time: 60,
      u_phone1: "",
      u_code1: "",
      u_pwd1: "",
      u_pwdd1: "",
      btn_msg1: "发送验证码",
      time1: 60,
      tabIndex:"0",
    };
  },
  components: {
    Tab,
    TabItem,
    XInput
  },
  init(){
    this.$nextTick(() => {
      this.tabIndex = this.$route.params.type;
    });
  },
  mounted() {
    let that = this;
    mui.back = function() {
      clearInterval(window.t);
      clearInterval(window.t1);
      that.$router.back();
      error;
    };
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    that.height = height;
    $(".wrap").css("min-height", height);
    if(that.$route.params.type==1){
      that.nid = that.$route.params.type;
      that.tabIndex = that.$route.params.type;
    }else{
      console.log("000");
      that.nid = that.$route.params.type;
      that.tabIndex = that.$route.params.type;
    }
    that.$nextTick(() => {
      that.tabIndex = that.$route.params.type;
    });
  },
  methods: {
    back() {
      let that = this;
      clearInterval(window.t);
      clearInterval(window.t1);
      that.$router.back();
    },
    navTap(i) {
      this.nid = i;
    },
    getCode() {
      let that = this;
      let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (reg.test(that.u_phone).toString().replace(/ /g,"")) {
        if (that.btn_msg == "发送验证码") {
          that.btn_msg = "60";
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
                nozzle: "forget_code",
                phone: that.u_phone.toString().replace(/ /g,"")
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
    getCode1() {
      let that = this;
      let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (reg.test(that.u_phone1).toString().replace(/ /g,"")) {
        if (that.btn_msg1 == "发送验证码") {
          that.btn_msg1 = "60秒";
          window.t1 = setInterval(function() {
            that.time1--;
            that.btn_msg1 = that.time1 + "秒";
            if (that.time1 <= 0) {
              that.btn_msg1 = "发送验证码";
              clearInterval(window.t1);
              that.time1 = 60;
            }
          }, 1000);
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "forget_code",
                phone: that.u_phone1.toString().replace(/ /g,"")
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
                that.btn_msg1 = "发送验证码";
                clearInterval(window.t1);
                that.time1 = 60;
              }
            });
        }
      } else {
        that.$vux.toast.show({
          text: "手机号格式错误！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    sub() {
      let that = this;
      if (that.u_phone && that.u_pwd && that.u_pwdd && that.u_code) {
        if (that.u_pwd == that.u_pwdd) {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "login_password",
                phone: that.u_phone.toString().replace(/ /g,""),
                code: that.u_code,
                password: that.u_pwd,
                confirm: that.u_pwdd
              }
            })
            .then(function(res) {
              that.$vux.loading.hide();
              if (res.data.code == 1) {
                that.$vux.toast.show({
                  text: "成功修改登录密码！",
                  type: "cancel",
                  position: "middle",
                  time: 1200
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
            text: "两次新密码输入不一致！",
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
    sub1() {
      let that = this;
      if (that.u_phone1 && that.u_pwd1 && that.u_pwdd1 && that.u_code1) {
        if (that.u_code1 == that.ccode) {
          if (that.u_pwd1 == that.u_pwdd1) {
            that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "trade_password",
                phone: that.u_phone1.toString().replace(/ /g,""),
                code: that.u_code1,
                password: that.u_pwd1,
                confirm: that.u_pwdd1
              }
            })
            .then(function(res) {
              that.$vux.loading.hide();0
              if (res.data.code == 1) {
                that.$vux.toast.show({
                  text: "成功修改登录密码！",
                  type: "cancel",
                  position: "middle",
                  time: 1200
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
              text: "两次新密码输入不一致！",
              type: "cancel",
              position: "middle",
              time: 1200
            });
          }
        } else {
          that.$vux.toast.show({
            text: "验证码输入错误！",
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
  box-sizing: border-box;
  padding-top: 1.15rem;
  > .top {
    border-bottom: 0.05rem solid #242424;
  }
  .form {
    padding: 1.5rem 4% 0;
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
          border: 1px solid #ba9870;
          border-radius: 20px;
          width: 2.2rem;
          text-align: center;
        }
        .f_cc {
          color: rgba(255, 255, 255, 0.4);
        }

        > input {
          width: calc(100% - 2.6rem);
          background: transparent;
          color: white;
          line-height: 0.8rem;
          padding-left: 0.15rem;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
        }
      }
    }
    .d_input:nth-child(2) > .f_r {
      border: 0;
    }
  }
  .form_bot {
    padding: 1rem 12% 0;
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
}
</style>
