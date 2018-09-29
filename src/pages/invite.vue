<template>
    <div class="d_wrap">
      <div class="main">
        <tab class="tab" :line-width = 2 bar-active-color="#ba9870" active-color="#ba9870" :scroll-threshold="5">
          <tab-item selected @click.native="navTap(0)">我的邀请码</tab-item>
          <tab-item @click.native="navTap(1)">我的社区</tab-item>
        </tab>
        <div v-if="nid==0" class="d_invite">
          <div class="ta_c">
                <img :src="info.img" alt="">
                <div>我的邀请码：{{info.code}}</div>
            </div>
            <div>
                <span class="f_l">推广链接：</span>
                <span class="f_l">{{url}}</span>
                <button class="f_r btn" v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</button>
            </div>
        </div>
        <div v-if="nid==1" class="d_community">
          <div class="d_top f_c">
            <span class="f_l">总人数：{{mem_num}}</span>
            <span class="f_r ta_r">总捐赠：{{sum}}</span>
          </div>
          <div class="d_member">
            <ul>
              <li>
                <div>
                  <span>序号</span>
                  <span>账号</span>
                  <span>社区人数</span>
                  <span>捐赠总额</span>
                </div>
              </li>
            </ul>
            <!-- 成员列表 -->
            <ul class="ul_mem">
              <li v-for="(item,index) in list" :key="index">
                <!-- 一级 -->
                <div class="d_first" @click="seeSecond($event)">
                  <span>{{index+1}}</span>
                  <span class="ta_r">{{item.phone}}</span>
                  <span>{{item.team}}<span v-if="item.team" class="iconfont icon-xiajiantou"></span></span>
                  <span>{{item.amount}}ETH</span>
                </div>
                <div>
                  <!-- 二级 -->
                  <div class="d_second" v-for="(item1,index1) in item.son" :key="index1">
                    <div @click="seeThird($event)">
                      <span>{{index1+1}}</span>
                      <span class="ta_r">{{item1.phone}}</span>
                      <span>{{item1.team}}<span v-if="item1.team" class="iconfont icon-xiajiantou"></span></span>
                      <span>{{item1.amount}}ETH</span>
                    </div>
                    <!-- 三级 -->
                    <div class="d_third" v-for="(item2,index2) in item1.son" :key="index2">
                      <span>{{index2+1}}</span>
                      <span class="ta_r">{{item2.phone}}</span>
                      <span>{{item2.team}}</span>
                      <span>{{item2.amount}}ETH</span>
                    </div>
                  </div>
                </div>
                
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import $ from "jquery";
import { Tab, TabItem } from "vux";
export default {
  data() {
    return {
      nid: 0,
      url: "",
      info: "",
      list: [],
      mem_num: "",
      sum: ""
    };
  },
  components: {
    Tab,
    TabItem
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
      .eq(3)
      .trigger("click");
    // 邀请
    that
      .$http({
        url: "/",
        method: "post",
        data: {
          nozzle: "promotion",
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.info = res.data.data;
          that.url = res.data.data.url;
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
    // 成员
    that
      .$http({
        url: "/",
        method: "post",
        data: {
          nozzle: "community",
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.list = res.data.data.son;
          that.sum = res.data.data.total_amount;
          that.mem_num = res.data.data.total_team;
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
    navTap(i) {
      this.nid = i;
    },
    onCopy(e) {
      this.$vux.toast.show({
        text: "复制成功",
        type: "success",
        position: "middle",
        time: 1200
      });
    },
    // 复制失败
    onError(e) {
      this.$vux.toast.show({
        text: "复制失败！",
        type: "cancel",
        position: "middle",
        time: 1200
      });
    },
    reset() {
      $(".d_second,.d_third").hide();
    },
    resetSecond() {
      $(".d_third").hide();
    },
    seeSecond(e) {
      $(e.target)
        .parents(".d_first")
        .siblings("div")
        .find(".d_second")
        .toggle();
      $(e.target)
        .parents(".d_first")
        .find(".iconfont")
        .toggleClass("rotate");
    },
    seeThird(e) {
      $(e.target)
        .parents(".d_second")
        .find(".d_third")
        .toggle();
      $(e.target)
        .parents(".d_second")
        .find(".iconfont")
        .toggleClass("rotate");
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
    box-sizing: border-box;
    .d_invite {
      padding: 0.4rem 3% 0.5rem;
      box-sizing: border-box;
      overflow: hidden;
      > div > div {
        padding: 0.1rem 0 0.1rem;
      }
      > div {
        overflow: hidden;
        padding: 0.6rem 0 0;
        img {
          width: 3rem;
          height: 3rem;
        }
        span {
          line-height: 0.96rem;
        }
        span:nth-child(2) {
          width: calc(100% - 4rem);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .btn {
          width: 2rem;
          line-height: 0.66rem;
          border: 1px solid #ba9870;
          color: #ba9870;
          border-radius: 4px;
          background: transparent;
        }
      }
      > div:last-child {
        padding-top: 0.2rem;
      }
    }
    .d_community {
      padding: 0 3% 0.4rem;
      box-sizing: border-box;
      overflow: hidden;
      > .d_top {
        overflow: hidden;
        border-bottom: 1px solid rgba(186, 152, 112, 0.4);
        span {
          padding: 0.4rem 0 0.4rem;
        }
      }
      .d_member {
        .ul_mem {
          overflow-y: auto;
          max-height: 6rem;
        }
        div {
          overflow: hidden;
          > span {
            float: left;
          }
          > span:first-child {
            width: 1.3rem;
            text-align: center;
          }
          > span:nth-child(3) {
            width: 2rem;
            text-align: right;
            box-sizing: border-box;
            padding: 0 0.1rem 0;
          }
          > span:nth-child(2) {
            width: 2.7rem;
            text-align: center;
          }
          > span:last-child {
            width: calc(100% - 6rem);
            text-align: right;
          }
          .iconfont {
            display: inline-block;
            margin-left: 0.1rem;
          }
          .rotate {
            transform: rotateZ(-180deg);
          }
        }
      }
      ul:first-child {
        padding: 0.3rem 0 0.3rem;
      }
      .ul_mem {
        li {
          padding: 0.2rem 0 0.2rem;
          border-bottom: 1px solid rgba(186, 152, 112, 0.3);
          div:first-child {
            padding-bottom: 0.2rem;
          }
          .d_second {
            display: none;
            font-size: 0.34rem;
            color: rgba(255, 255, 255, 0.8);
            padding-bottom: 0.2rem;
            > div:first-child {
              > span:first-child {
                padding-left: 0.15rem;
                box-sizing: border-box;
              }
            }
          }
          .d_second:last-child {
            padding-bottom: 0;
          }
          .d_third {
            display: none;
            font-size: 0.32rem;
            color: rgba(255, 255, 255, 0.8);
            padding-bottom: 0.2rem;
            span:first-child {
              padding-left: 0.18rem !important;
              box-sizing: border-box;
            }
            > span:nth-child(3) {
              padding-right: 0.5rem;
            }
          }
        }
        li:last-child {
          border: 0;
        }
      }
    }
  }
}
</style>
