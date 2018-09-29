<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div>设置</div>
        </div>
        <div class="main">
            <ul>
                <li @click="toHelp">
                    <span class="f_l">帮助中心</span>
                    <img class="f_r r_img" src="../assets/right1.png" alt="">
                </li>
            </ul>
            <div class="bot">
                <button class="btn" @click="exit">退出</button>
                <div class="ta_c f_c">版本 1.0.0</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
  },
  methods: {
    back() {
      let that = this;
      that.$router.back();
    },
    toHelp(){
        this.$router.push({
            name:"helpcenter"
        })
    },
    exit() {
      let that = this;
      that.$vux.confirm.show({
        title: "退出",
        confirmText: "确定",
        cancelText: "取消",
        content: "确定要退出登录吗？",
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          // mui.plusReady(function() {
          //   plus.runtime.quit();
          // });
           that.$router.push({
              name: "login"
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
  min-height: 100%;
  color: white;
  box-sizing: border-box;
  padding-top: 1.15rem;
  > .top {
    border-bottom: 0.05rem solid #242424;
  }
  .main {
    box-sizing: border-box;
    ul {
      li {
        overflow: hidden;
        padding: 0.2rem 4% 0.2rem;
        line-height: 0.7rem;
        border-bottom: 1px solid #242424;
        .r_img {
          width: 0.7rem;
        }
      }
    }
    .bot {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      .btn {
        display: block;
        width: 6rem;
        text-align: center;
        background: #ba9870;
        color: white;
        line-height: 0.9rem;
        border-radius: 20px;
        margin: 0.6rem auto 0;
      }
      div {
        font-size: 0.32rem;
        padding: 0.6rem 0 .6rem;
      }
    }
  }
}
</style>
