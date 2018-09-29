<template>
    <div class="d_wrap">
      <div class="d_pattern">
          <div class="top_tip">
              <img src="../assets/clock.png" alt="">
              <span>{{title}}</span>
          </div>
          <div class="d_donate">
              <div class="d_title">
                  <span></span>
                  <span>选择模式</span>
                  <span class="iconfont icon-wenhao" @click="dialog=true"></span>
              </div>
              <div class="d_way">
                <div class="d_title">{{free.name}}</div>
                <ul>
                    <li v-for="(item,index) in free.data" :key="index" class="f_c ta_c" :class="{liSelect:way_id==index}" @click="selectWay('自由',item.id,index,item.min,item.max)">
                        <div>
                            <span>{{item.ratio}}%</span>
                            <span>日回流</span>
                        </div>
                        <div>{{item.name}}</div>
                    </li>
                </ul>
              </div>
              <div class="d_way">
                <div class="d_title">{{regular.name}}</div>
                <ul>
                    <li v-for="(item,index) in regular.data" :key="index" class="f_c ta_c" :class="{liSelect:way_id1==index}" @click="selectWay('定期',item.id,index,item.min,item.max)">
                        <div>
                            <span>{{item.ratio}}%</span>
                            <span>日回流</span>
                        </div>
                        <div>{{item.cycle}}天</div>
                    </li>
                </ul>
              </div>
              <div class="form">
                  <div>
                    <img src="../assets/clock.png" alt="">
                    <input type="number" v-model="d_num" placeholder="请输入数量" @input="num($event)">
                    <span>ETH</span>
                  </div>
                  <div>
                      <button class="btn f_l" @click="donate(0)">使用ETH捐赠</button>
                      <button class="btn f_r" @click="donate(1)">使用分红捐赠</button>
                  </div>
              </div>
          </div>
      </div>


      <!-- 弹窗 -->
      <x-dialog v-model="dialog" class="des_dialog" hide-on-blur>
        <div class="dialog">
            <span class="vux-close" @click="dialog=false"></span>
            <div class="dd_con">
              <div v-for="(item,index) in tips" :key="index">
                  <div class="title">{{item.name}}</div>
                  <div class="con" v-html="item.content"></div>
              </div>
            </div>
        </div>
      </x-dialog>
      <x-dialog v-model="dialog1" class="dt_dialog com_dialog" hide-on-blur @on-hide="range=0;u_pwd=''">
        <div class="dialog" v-show="bool">
            <span class="vux-close" @click="dialog1=false;range=0;u_pwd=''"></span>
            <div class="title">
                <span>支付信息</span>
                <span>{{calc_sum}}ETH</span>
            </div>
            <div class="con">
              <ul>
                <li>
                  <span class="f_l">支付地址：</span>
                  <span class="f_r">{{address}}</span>
                </li>
                <!-- <li>
                  <span class="f_l">收款地址：</span>
                  <span class="f_r">{{address}}</span>
                </li>
                <li @click="dialog3=true;bool=false;">
                  <span class="f_l">旷工费：</span>
                  <img class="f_r r_img" src="../assets/right.png" alt="">
                  <span class="f_r">{{fee}} ETH</span>
                </li> -->
                <li>
                  <span class="f_l">输入密码：</span>
                  <input class="f_r" type="password" v-model="u_pwd" placeholder="请输入交易密码">
                </li>
              </ul>
              <div>
                <button class="btn" @click="sub">确定</button>
              </div>
            </div>
        </div>
      </x-dialog>
      <x-dialog v-model="dialog3" class="re_dialog com_dialog" hide-on-blur @on-hide="bool=true">
        <div class="dialog">
          <span class="vux-close" @click="dialog3=false;bool=true;"></span>
            <div class="title">
                <span>旷工费设置</span>
                <span>{{fee}} ETH &asymp; {{cny}} CNY</span>
            </div>
            <div class="con">
              <mt-range v-model="range"></mt-range>
              <div>
                <button class="btn" @click="setRange">确定</button>
              </div>
            </div>
        </div>
      </x-dialog>
    </div>
</template>
<script>
import $ from "jquery";
import { Tab, TabItem, XDialog } from "vux";
import { Range } from "mint-ui";
export default {
  data() {
    return {
      way_id: "0",
      way_id1: "way_id1",
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      nid: 0,
      d_num: "",
      d_type: "",
      mine_fee: 0,
      range: 0,
      bool: true,
      u_pwd: "",
      title: "",
      free: "",
      regular: "",
      tips: [],
      id: "",
      min: "",
      max: "",
      platform: "",
      address: "",
      fee: "",
      cny: "",
      fee_rate: "",
      fee_min: "",
      fee_max: ""
    };
  },
  components: {
    Tab,
    TabItem,
    XDialog,
    "mt-range": Range
  },
  watch: {
    range(o, n) {
      let that = this;
      let percentage = parseFloat(that.range / 100);
      let scope = that.fee_max - that.fee_min;
      that.fee = parseFloat(that.fee_min + percentage * scope).toFixed(4);
      that.cny = parseFloat(that.fee * that.fee_rate).toFixed(4);
    }
  },
  computed: {
    calc_sum() {
      return (parseFloat(this.d_num) + parseFloat(this.fee)).toFixed(4);
    }
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
      .eq(0)
      .trigger("click");
    if (
      window.sessionStorage.getItem("free") &&
      window.sessionStorage.getItem("regular") &&
      window.sessionStorage.getItem("title")
    ) {
      that.free = JSON.parse(window.sessionStorage.getItem("free"));
      that.regular = JSON.parse(window.sessionStorage.getItem("regular"));
      that.title = window.sessionStorage.getItem("title");
    }
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
          that.platform = res.data.data.platform;
          that.address = res.data.data.address;
          if (
            window.sessionStorage.getItem("free") &&
            window.sessionStorage.getItem("regular") &&
            window.sessionStorage.getItem("title")
          ) {
          } else {
            that.title = res.data.data.title;
            window.sessionStorage.setItem("title", res.data.data.title);
            that.free = res.data.data.free;
            window.sessionStorage.setItem(
              "free",
              JSON.stringify(res.data.data.free)
            );
            that.regular = res.data.data.regular;
            window.sessionStorage.setItem(
              "regular",
              JSON.stringify(res.data.data.regular)
            );
          }
          that.tips = res.data.data.tips;
          that.min = res.data.data.free.data[0].min;
          that.max = res.data.data.free.data[0].max;
          that.id = res.data.data.free.data[0].id;
          that.fee_min = res.data.data.min;
          that.fee_max = res.data.data.max;
          that.fee = res.data.data.fee;
          that.cny = res.data.data.cny;
          that.fee_rate =
            parseFloat(res.data.data.cny) / parseFloat(res.data.data.fee);
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
  },
  methods: {
    toDetail() {},
    num(e) {
      $(e.target).val(
        $(e.target)
          .val()
          .match(/\d+\.?\d{0,6}/)
      );
      this.d_num = $(e.target).val();
    },
    selectWay(type, id, i, min, max) {
      this.min = min;
      this.max = max;
      this.id = id;
      if (type == "自由") {
        this.way_id = i;
        this.way_id1 = "way_id1";
      } else {
        this.way_id1 = i;
        this.way_id = "way_id";
      }
    },
    donate(i) {
      let that = this;
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
            that.free = res.data.data.free;
            window.sessionStorage.setItem(
              "free",
              JSON.stringify(res.data.data.free)
            );
            that.regular = res.data.data.regular;
            window.sessionStorage.setItem(
              "regular",
              JSON.stringify(res.data.data.regular)
            );
            if (that.$store.state.bool) {
              that.d_type = i;
              if (that.way_id == "way_id" && that.way_id1 == "way_id1") {
                that.$vux.toast.show({
                  text: "请选择捐赠模式！",
                  type: "cancel",
                  position: "middle",
                  time: 1200
                });
              } else {
                if (
                  parseFloat(that.d_num) >= parseFloat(that.min) &&
                  parseFloat(that.d_num) <= parseFloat(that.max)
                ) {
                  that.dialog1 = true;
                } else {
                  that.$vux.toast.show({
                    text: "请输入" + that.min + "-" + that.max + "捐赠数量！",
                    type: "cancel",
                    position: "middle",
                    time: 1500
                  });
                }
              }
            } else {
              that.$vux.toast.show({
                text: "当轮游戏已结束，请等待下轮游戏开始！",
                type: "cancel",
                position: "middle",
                time: 1200
              });
            }
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
    },
    setRange() {
      let that = this;
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "setup_fee",
            number: that.fee
          }
        })
        .then(function(res) {});
      that.dialog3 = false;
      that.bool = true;
    },
    sub() {
      let that = this;
      if (that.u_pwd) {
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "donation",
              token: that.$store.state.user_info.token,
              mode: that.id,
              number: that.d_num,
              type: that.d_type,
              password: that.u_pwd
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "success",
                position: "middle",
                time: 1300
              });
              that.dialog1 = false;
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
                  }
                });
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
          type: "text",
          position: "bottom",
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

  > .d_pattern {
    padding: 0 3% 0;

    > .top_tip {
      img {
        width: 0.56rem;
        display: inline-block;
        vertical-align: sub;
        margin-right: 0.1rem;
        transform: translateY(0.1rem);
      }
      span {
        display: inline-block;
        line-height: 1.4rem;
      }
    }
    > .d_donate {
      .d_title {
        padding: 0.3rem 0 0.3rem;
        > span:first-child {
          display: inline-block;
          width: 4px;
          height: 0.3rem;
          background: #ba9870;
          border-radius: 10px;
          transform: translateY(0.01rem);
        }
        .iconfont {
          display: inline-block;
          vertical-align: middle;
          margin-left: 0.1rem;
        }
      }
      .d_way {
        ul {
          overflow: hidden;
          li {
            float: left;
            width: 33.3%;
            > div:first-child {
              height: 2.8rem;
              background: url("../assets/jjz.png");
              background-size: 100% 100%;
              box-sizing: border-box;
              padding-top: 0.8rem;

              span {
                display: block;
                padding-bottom: 0.1rem;
              }
            }
          }
          .liSelect {
            > div:first-child {
              height: 2.8rem;
              background: url("../assets/jz.png");
              background-size: 100% 100%;
              padding-top: 0.59rem;
              > span:first-child {
                font-size: 0.48rem;
              }
            }
          }
        }
      }
      .form {
        > div:first-child {
          padding: 0.8rem 0.4rem 0.8rem;
          box-sizing: border-box;
          img {
            width: 0.56rem;
            display: inline-block;
            vertical-align: middle;
          }
          input {
            background: #6a5337;
            border: 1px solid #ba9870;
            line-height: 0.9rem;
            color: white;
            padding-left: 0.2rem;
            width: calc(100% - 2.4rem);
            margin: 0 0.1rem 0;
          }
          span {
            display: inline-block;
            line-height: 0.9rem;
          }
        }
        > div:last-child {
          padding: 0 0.4rem 0;
          overflow: hidden;
          .btn {
            color: white;
            background: #ba9870;
            border-radius: 4px;
            width: 46%;
            line-height: 0.76rem;
            border: 1px solid #ba9870;
            margin-bottom: 0.7rem;
          }
          .btn:last-child {
            background: transparent;
            color: #ba9870;
          }
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
      .dd_con {
        max-height: 7rem;
        overflow: auto;
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
  .dialog {
    position: relative;
    color: #333;
    .vux-close {
      position: absolute;
      right: 0.3rem;
      top: 0.3rem;
    }
  }
  .com_dialog {
    .dialog {
      padding: 0.8rem 0.4rem 0.6rem;
      box-sizing: border-box;
      width: 100%;

      .title {
        span {
          display: block;
          padding-bottom: 0.2rem;
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
  .dt_dialog {
    ul {
      li {
        overflow: hidden;
        border-top: 1px solid #f2f2f2;
        padding: 0.2rem 0 0.2rem;
        .f_l {
          width: 2.2rem;
          text-align: right;
        }
        .f_r {
          width: calc(100% - 2.4rem);
          word-break: break-all;
          text-align: left;
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
          line-height: 0.8rem;
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
      }
      li:nth-child(3) {
        .f_l {
          line-height: 0.6rem;
        }
        .f_r {
          width: calc(100% - 2.8rem);
          text-align: left;
          line-height: 0.64rem;
        }
        .r_img {
          width: 0.6rem;
        }
      }
      li:last-child {
        .f_l {
          line-height: 0.8rem;
        }
      }
    }
  }
  .re_dialog {
    .title {
      padding-bottom: 0.8rem;
    }
    .btn {
      margin: 0.9rem auto 0 !important;
    }
  }
}
</style>
