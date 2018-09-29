<template>
    <div class="wrap">
        <div class="d_logo">
          <img src="../assets/logo.png" alt="">
        </div>
        <div class="form">
          <div class="d_input">
            <div class="f_l">
              <img src="../assets/phone.png" alt="">
            </div>
            <div class="f_r">
                <x-input class="" type="tel" mask="999 9999 9999" :max=13 v-model="u_phone" placeholder="请输入手机号"></x-input>
            </div>
          </div>
          <div class="d_input">
            <div class="f_l">
              <img src="../assets/pwd.png" alt="">
            </div>
            <div class="f_r">
                <x-input class="" type="password"  v-model="u_pwd" placeholder="请输入密码"></x-input>
            </div>
          </div>
          <div class="d_input">
            <div class="f_l">
              <img src="../assets/code.png" alt="">
            </div>
            <div class="f_r">
              <input type="text" placeholder="请输入验证码" v-model="usercode">
                <s-identify class="f_r" :identifyCode="identifyCode" @refreshcode="getIcode"></s-identify>
            </div>
          </div>
        </div>
        <div class="form_bot">
          <button class="btn" @click="sub">账号登录</button>
          <div>
            <span class="f_l">
              <router-link :to="{name:'register'}">没有账号？立即注册</router-link>
            </span>
            <span class="f_r">
              <router-link :to="{name:'forgetpwd',params:{type:0}}">忘记密码？</router-link>
            </span>
          </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
import { XInput } from "vux";
import SIdentify from "../components/icode";
export default {
  data() {
    return {
      usercode: "",
      identifyCode: "",
      identifyCodes: "123456789",
      u_phone: "",
      u_pwd: "",
      height: ""
    };
  },
  components: {
    XInput,
    SIdentify
  },
  mounted() {
    let that = this;
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    that.height = height;
    $(".wrap").css("min-height", height);
    if (window.localStorage.getItem("acc")) {
      that.u_phone = window.localStorage.getItem("acc");
    }
    that.getIcode();
  },
  methods: {
    getIcode() {
      this.usercode = "";
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    sub() {
      let that = this;
      if (that.u_phone && that.u_pwd && that.usercode) {
        let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (reg.test(that.u_phone.toString().replace(/ /g,""))) {
          if (that.usercode == that.identifyCode) {
            that.$vux.loading.show({
              text: "正在登录"
            });
            that
              .$http({
                url: "/",
                method: "post",
                data: {
                  nozzle: "login",
                  phone: that.u_phone.toString().replace(/ /g,""),
                  password: that.u_pwd
                }
              })
              .then(function(res) {
                that.$vux.loading.hide();
                if (res.data.code == 1) {
                  that.$store.state.user_info = res.data.data;
                  window.sessionStorage.setItem("uinfo",JSON.stringify(res.data.data));
                  window.localStorage.setItem("acc", that.u_phone);
                  that.$router.push({
                    name: "donate"
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
              text: "验证码输入错误！",
              type: "cancel",
              position: "middle",
              time: 1200
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
      } else {
        this.$vux.toast.show({
          text: "请输入完整信息！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
      that.refreshCode();
      that.usercode = "";
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
  background: url("../assets/bg.png");
  background-size: 100% 100%;
  .d_logo {
    overflow: hidden;
    img {
      display: block;
      width: 2.6rem;
      height: 2.6rem;
      margin: 2rem auto;
    }
  }
  .form {
    padding: 0 12% 0;
    .d_input {
      overflow: hidden;
      margin-bottom: 0.4rem;
      > .f_l {
        width: 0.8rem;
        height: 0.8rem;
        display: table-column;
        img {
          width: 100%;
          height: 100%;
          display: table-cell;
          vertical-align: middle;
        }
      }
      > .f_r {
        width: calc(100% - 0.9rem);
        border-bottom: 1px solid rgba(255, 255, 255, 0.4);

        > input {
          width: calc(100% - 106px);
          background: transparent;
          color: white;
          line-height: 0.8rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
          padding-left: 0.1rem;
          box-sizing: border-box;
        }
      }
    }
    > .d_input:last-child > .f_r {
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
