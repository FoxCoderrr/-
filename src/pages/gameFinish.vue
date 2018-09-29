<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div>中奖情况</div>
        </div>
        <div class="main">
           <div class="d_top">
               <div class="f_c ta_c">
                   <span>本轮游戏结束</span>
                   <span v-if="$route.params.type==1">恭喜您，获得最终大奖</span>
                   <span v-if="$route.params.type==0">很遗憾，您没有获得最终大奖</span>
               </div>
           </div>
           <div class="d_mid">
               <div class="ta_c" v-if="$route.params.type==1">
                   <span>金额</span>
                   <span>{{$route.params.num}}ETH</span>
               </div>
               <div>
                   <button class="btn f_l" @click="toCanprofit">查看我的可提现收益</button>
                   <button class="btn f_r" @click="toWallet">查看我的钱包</button>
               </div>
           </div>
           <div class="d_bot ta_c f_c">
               <div>
                <span>下一轮游戏蓄力中</span>
                <span>即将开启</span>
               </div>
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
      that.$router.push({
        name: "donate"
      });
      error;
    };
    that.$store.state.tip=false;
    window.localStorage.setItem("first","1")
  },
  methods: {
    back() {
      let that = this;
      that.$router.push({
        name: "donate"
      });
    },
    toWallet() {
      let that = this;
      that.$router.push({
        name: "wallet"
      });
    },
    toCanprofit() {
      let that = this;
      that.$router.push({
        name: "canprofit"
      });
    },
  }
};
</script>
<style lang="less" scoped>
.wrap {
  font-size: 0.36rem;
  width: 100%;
  color: white;
  box-sizing: border-box;
  padding-top: 1.15rem;
  > .top {
    border-bottom: 0.05rem solid #242424;
  }
  .main {
    box-sizing: border-box;
    .d_top {
      padding: 0.8rem 0 0.8rem;
      span {
        display: block;
        font-size: 0.6rem;
      }
      span:first-child {
        font-size: 0.46rem;
        padding-bottom: 0.4rem;
      }
    }
    .d_mid {
      padding: 0.8rem 0 0.8rem;
      border-top: 1px solid rgba(185, 151, 112, 0.3);
      border-bottom: 1px solid rgba(185, 151, 112, 0.3);
      div:first-child {
        span {
          display: block;
        }
        span:last-child {
          padding: 0.3rem 0 0.6rem;
        }
      }
      div:last-child {
        overflow: hidden;
        padding: 0 10% 0;
        box-sizing: border-box;
        .btn {
          width: 46%;
          background: #ba9870;
          color: white;
          border-radius: 4px;
          line-height: 0.66rem;
          border: 1px solid #ba9870;
        }
        .btn:last-child {
          background: transparent;
          color: #ba9870;
        }
      }
    }
    .d_bot {
      padding-top: 1rem;
      div {
        border: 1px solid #ba9870;
        width: 56%;
        margin: 0 auto;
        padding: 0.6rem 0 0.6rem;
        font-size: 0.5rem;
        span {
          display: block;
        }
        span:first-child {
          padding-bottom: 0.2rem;
        }
      }
    }
  }
}
</style>
