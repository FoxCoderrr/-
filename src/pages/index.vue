<template>
    <div class="wrap">
      <div class="top_notice">
        <!-- 公告 -->
        <div class="notice">
            <div>
                <div class="d_img f_l">
                    <img src="../assets/notice.png" alt="">
                </div>
                <swiper class="f_l" height="40px" loop auto :interval="interval" direction="vertical" :show-dots="false" style="width:100%;">
                  <swiper-item @click.native="toDetail(item)" v-for="(item,index) in notices" :key="index"><p>{{item.title}}</p></swiper-item>
                </swiper>
                <div class="f_r">
                  <span @click="toSet" class="iconfont icon-shezhi1 f_c"></span>
                </div>
            </div>
        </div>
      </div>
      <div class="top_aty">
        <img @click="dialog=true" src="../assets/cup.gif" alt="">
        <div class="d_bonus f_c">{{$store.state.cur_data.number}}</div>
        <div class="d_time">
          <span>{{$store.state.h}}</span> : <span>{{$store.state.m}}</span> : <span>{{$store.state.s}}</span>
        </div>
      </div>
      <tab class="tab tb" v-model.number="tabIndex" :line-width = 4 custom-bar-width='26px'  bar-active-color="#ba9870" active-color="#ba9870" :scroll-threshold="5">
          <tab-item @click.native="navTap(0)">
            <router-link :to="{name:'donate'}">时间捐赠</router-link>
          </tab-item>
          <tab-item @click.native="navTap(1)">
            <router-link :to="{name:'coffers'}">我的金库</router-link>
          </tab-item>
          <tab-item @click.native="navTap(2)">
            <router-link :to="{name:'wallet'}">我的钱包</router-link>
          </tab-item>
          <tab-item @click.native="navTap(3)">
            <router-link :to="{name:'invite'}">邀请玩家</router-link>
          </tab-item>
        </tab>
      <router-view name="child" class="child"></router-view>
      <div class="bot">
        <tab class="tab" :line-width = 2 bar-active-color="#ba9870" active-color="#ba9870" :scroll-threshold="5">
          <tab-item selected @click.native="navTap1(0)">当前轮次</tab-item>
          <tab-item @click.native="navTap1(1)">捐赠模式统计</tab-item>
        </tab>
        <div v-if="nid1==0">
          <div class="d_time ta_c">
            <div>距离第{{$store.state.cur_data.phase}}轮结束</div>
            <div><span>{{$store.state.h}}</span> : <span>{{$store.state.m}}</span> : <span>{{$store.state.s}}</span></div>
          </div>
          <ul class="ul1">
            <li>
              <div class="f_l ta_l">奖池金额</div>
              <div class="f_l ta_r f_c">
                <span>{{$store.state.cur_data.number}}</span>
                <span>&asymp;{{$store.state.cur_data.cny_number}}CNY</span>
              </div>
              <div class="f_r">
                <img src="../assets/coin.png" alt="">
              </div>
            </li>
            <li>
              <div class="f_l ta_l">我的捐赠</div>
              <div class="f_l ta_r f_c">
                <span>{{$store.state.cur_data.donation}}</span>
                <span>&asymp;{{$store.state.cur_data.cny_donation}}CNY</span>
              </div>
              <div class="f_r">
                <img src="../assets/clock.png" alt="">
              </div>
            </li>
            <li>
              <div class="f_l ta_l">我的可提现收益</div>
              <div class="f_l ta_r f_c">
                <span>{{$store.state.cur_data.use_income}}</span>
                <span>&asymp;{{$store.state.cur_data.cny_income}}CNY</span>
              </div>
              <div class="f_r">
                <img src="../assets/coin.png" alt="">
              </div>
            </li>
          </ul>
        </div>
        <div v-if="nid1==1">
          <div class="d_title ta_c">所有玩家在各个捐赠模式投入ETH统计</div>
          <ul class="ul2">
            <li v-for="(item,index) in $store.state.pattern_data" :key="index">
              <div class="f_l ta_l">{{item.name}}</div>
              <div class="f_l ta_r f_c">
                <!-- <span>{{item.number}}</span> -->
                <span>{{item.ratio}}%</span>
              </div>
              <div class="f_r">
                <img src="../assets/coin.png" alt="">
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 弹窗 -->
      <x-dialog v-model="dialog" class="des_dialog" hide-on-blur>
        <div class="dialog">
            <span class="vux-close" @click="dialog=false"></span>
          <div>
              <div class="title">大奖获得规则</div>
              <div class="con rule">
                {{rules}}
              </div>
          </div>
        </div>
      </x-dialog>
    </div>
</template>
<script>
import $ from "jquery";
import { Swiper, SwiperItem, Tab, TabItem, XDialog } from "vux";
export default {
  data() {
    return {
      nid: this.$store.state.nid,
      nid1: "0",
      dialog: false,
      interval: 2500,
      notices: [],
      tabIndex: 0,
      rules: ""
    };
  },
  components: {
    Swiper,
    SwiperItem,
    Tab,
    TabItem,
    XDialog
  },
  mounted() {
    let that = this;
    that.ptData();
    that.goldPole();
    that.interval1();
    if (that.$route.name == "donate") {
      $(".tb .vux-tab-item")
        .eq(0)
        .trigger("click");
    } else if (that.$route.name == "coffers") {
      $(".tb .vux-tab-item")
        .eq(1)
        .trigger("click");
    } else if (that.$route.name == "wallet") {
      $(".tb .vux-tab-item")
        .eq(2)
        .trigger("click");
    } else {
      $(".tb .vux-tab-item")
        .eq(3)
        .trigger("click");
    }
    this.$nextTick(() => {
      this.tabIndex = this.$store.state.nid;
    });
    // 公告
    that
      .$http({
        url: "/",
        method: "post",
        data: {
          nozzle: "notice"
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.notices = res.data.data;
        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "text",
            position: "middle",
            time: 1200
          });
        }
      });
    // 奖池规则
    that
      .$http({
        url: "/",
        method: "post",
        data: {
          nozzle: "gold_rule"
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.rules = res.data.data;
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
    toDetail(o) {
      clearInterval(window.tt0);
      clearInterval(window.tt1);
      this.$store.state.cur_notice = o;
      this.$router.push({
        name: "noticedetail"
      });
    },
    toSet() {
      clearInterval(window.tt0);
      clearInterval(window.tt1);
      this.$router.push({
        name: "setting"
      });
    },
    navTap(i) {
      this.$store.state.nid = i;
    },
    navTap1(i) {
      this.nid1 = i;
      if (i) {
        clearInterval(window.tt1);
        this.interval0();
      } else {
        clearInterval(window.tt0);
        this.interval1();
      }
    },
    ptData() {
      // 模式统计
      let that = this;
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "pattern_statistic"
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.$store.state.pattern_data = res.data.data;
          }
        });
    },
    goldPole() {
      // 当前轮次
      let that = this;
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "current_rotation",
            token: that.$store.state.user_info.token
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.$store.state.cur_data = res.data.data;
            that.$store.state.end = res.data.data.count;
            that.$store.commit("countDown");
            if(res.data.data.status==0){
              that.$store.state.end=0;
              that.$store.state.h="00";
              that.$store.state.m="00";
              that.$store.state.s="00";
              // if (res.data.data.status == 0&&window.localStorage.getItem("first")!=1) {
                clearInterval(window.tmain);
                that.$store.state.bool = false;
                that
                  .$http({
                    url: "/",
                    method: "post",
                    data: {
                      nozzle: "award_info",
                      token: that.$store.state.user_info.token
                    }
                  })
                  .then(function(res) {
                    if (res.data.data != 0) {
                      if (that.$store.state.tip) {
                        that.$router.push({
                          name: "gamefinish",
                          params: {
                            type: "0",
                            num: res.data.data
                          }
                        });
                      }
                    }else{
                      that.$router.push({
                          name: "gamefinish",
                          params: {
                            type: "0",
                            num: "0"
                          }
                        });
                    }
                  });
              // }
            }else{
                that.$store.state.tip=true;
                // window.localStorage.setItem("first","0")
              }
          }
        });
    },
    interval0() {
      let that = this;
      window.tt0 = setInterval(function() {
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "pattern_statistic"
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$store.state.pattern_data = res.data.data;
            }
          });
      }, 3000);
    },
    interval1() {
      let that = this;
      window.tt1 = setInterval(function() {
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "current_rotation",
              token: that.$store.state.user_info.token
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$store.state.cur_data = res.data.data;
              that.$store.state.end = res.data.data.count;
              that.$store.commit("countDown");
              if(res.data.data.status==0){
                // if (res.data.data.status == 0&&window.localStorage.getItem("first")!=1) {
                  clearInterval(window.tmain);
                  that.$store.state.end=0;
                  that.$store.state.bool = false;
                  that
                    .$http({
                      url: "/",
                      method: "post",
                      data: {
                        nozzle: "award_info",
                        token: that.$store.state.user_info.token
                      }
                    })
                    .then(function(res) {
                      if (res.data.data!=0) {
                      if (that.$store.state.tip) {
                        that.$router.push({
                          name: "gamefinish",
                          params: {
                            type: "0",
                            num: res.data.data
                          }
                        });
                      }
                    }else{
                      that.$router.push({
                          name: "gamefinish",
                          params: {
                            type: "0",
                            num: "0"
                          }
                        });
                    }
                    });
                // }
              }else{
                  that.$store.state.tip=true;
                  // window.localStorage.setItem("first","0");
                }
            }
          });
      }, 3000);
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  font-size: 0.36rem;
  width: 100%;
  color: white;
  box-sizing: border-box;
  padding: 1rem 0 1rem;

  .notice {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background: #010101;
    z-index: 1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    > div {
      overflow: hidden;
      box-sizing: border-box;
      padding: 0.16rem 3% 0;
      .d_img {
        img {
          width: 0.76rem;
        }
      }
      .vux-slider {
        width: calc(100% - 2rem) !important;
        box-sizing: border-box;
        padding-left: 0.2rem;
      }
      .iconfont {
        font-size: 0.66rem;
        display: block;
        transform: translateY(0.02rem);
      }
    }
  }
  .top_aty {
    width: 100%;
    height: 6rem;
    background: url("../assets/bgbg.png");
    background-size: 100% 100%;
    overflow: hidden;

    > img {
      width: 2.4rem;
      display: block;
      margin: 1rem auto 0;
    }
    > .d_bonus {
      text-align: center;
      font-size: 0.6rem;
    }
    > .d_time {
      text-align: center;
      font-size: 0.4rem;
      padding-top: 0.1rem;
    }
  }
  > .tab {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 0.3rem;
    a {
      color: rgba(255, 255, 255, 0.8);
    }
    .router-link-exact-active {
      color: #ba9870;
    }
  }
  .bot {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    .d_time {
      padding: 0.6rem 0 0.6rem;
      > div:first-child {
        padding-bottom: 0.2rem;
      }
    }
    .d_title {
      padding: 0.6rem 0 0.6rem;
    }
    .ul1 {
      padding: 0 3% 0;
      li {
        overflow: hidden;
        border-top: 1px solid rgba(185, 151, 112, 0.4);
        padding: 0.3rem 0 0.2rem;
        > div:nth-child(2) {
          width: calc(100% - 2.3rem);
          span {
            display: block;
            padding-bottom: 0.1rem;
          }
        }
        img {
          width: 0.6rem;
          display: inline-block;
          vertical-align: top;
        }
      }
      li:nth-child(2) {
        img {
          width: 0.5rem;
          transform: translateX(-0.1rem);
        }
      }
      li:last-child {
        border-bottom: 1px solid rgba(185, 151, 112, 0.4);
        > div:nth-child(2) {
          width: calc(100% - 3.4rem);
        }
      }
    }
    .ul2 {
      padding: 0 3% 0;
      li {
        overflow: hidden;
        border-top: 1px solid rgba(185, 151, 112, 0.4);
        padding: 0.2rem 0 0.2rem;
        line-height: 0.7rem;
        > div:nth-child(2) {
          width: calc(100% - 2.3rem);
          span {
            display: block;
            padding-bottom: 0.1rem;
          }
        }
        img {
          width: 0.6rem;
          display: inline-block;
          vertical-align: top;
        }
      }
      li:last-child {
        border-bottom: 1px solid rgba(185, 151, 112, 0.4);
        > div:nth-child(2) {
          width: calc(100% - 2.5rem);
        }
      }
    }
  }
  .des_dialog {
    .dialog {
      text-align: left;
      color: #333;
      position: relative;
      padding: 1rem 0.4rem 0.6rem;
      .rule {
        max-height: 7rem;
        overflow: auto;
      }
      .vux-close {
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
      }
      .title {
        padding: 0.2rem 0 0.2rem;
      }
      .con {
        padding-bottom: 0.3rem;
      }
      > div:last-child {
        .con {
          padding: 0;
        }
      }
    }
  }
}
</style>
