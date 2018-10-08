<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div>充币</div>
            <span class="f_c" @click="toTopupHistory">充币明细</span>
        </div>
        <div class="d_main">
          <div class="top_tips f_c" v-html="tips"></div>
          <div class="main">
              <!-- <div class="ta_c">余额：{{info.balance}}ETH</div> -->
              <!-- <div class="ta_c">
                  <img :src="info.img" alt="">
              </div> -->
              <div>
                <div>
                  <span class="f_l">充币金额：</span>
                  <input class="f_l" type="number" @input="num($event)" v-model="t_num" placeholder="请输入充币金额">
                  <span class="f_r f_c">ETH</span>
                </div>
                <div>
                  <span class="f_l">收款地址：</span>
                  <span class="f_l">{{ads_}}</span>
                  <button class="f_r btn" v-clipboard:copy="ads" v-clipboard:success="onCopy" v-clipboard:error="onError">复制地址</button>
                </div>
              </div>
              <div>
                <div>
                  <span>充币凭证：</span>
                  <div class="up_div">
                      <span class="icon f_c">+</span>
                      <span class="jia">点击上传支付凭证</span>
                      <img v-if="data1" :src="data1" >
                      <input name="img" :disabled="data1!=''" type="file" id="handcard" @change="pushImg1($event)" accept="image/jpeg,image/png,image/gif" alt="">
                      <span class="clear iconfont icon-shanchu1" v-if="data1" @click="delImg1($event)"></span>
                  </div>
                </div>
                <div>
                  <span>备注：</span>
                  <textarea cols="30" rows="4" placeholder="" v-model="comment"></textarea>
                </div>
              </div>
          </div>
          <div>
            <button class="btn" @click="sub">确定</button>
          </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      ads: "",
      ads_: "",
      info: "",
      t_num: "",
      data1: "",
      urll: "",
      comment: "",
      tips: ""
    };
  },
  components: {},
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    that
      .$http({
        url: "/",
        method: "post",
        data: {
          nozzle: "recharge_info",
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.info = res.data.data;
          that.tips = res.data.data.tips;
          that.ads = res.data.data.address;
          that.ads_ =
            res.data.data.address.substr(0, 10) +
            "..." +
            res.data.data.address.substr(res.data.data.address.length - 10);
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
    back() {
      let that = this;
      that.$router.back();
    },
    toTopupHistory() {
      this.$router.push({
        name: "topuphistory"
      });
    },
    num(e) {
      $(e.target).val(
        $(e.target)
          .val()
          .match(/\d+\.?\d{0,4}/)
      );
      this.t_num = $(e.target).val();
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
    // 上传
    pushImg1: function(e) {
      let file = e.target,
        reader = new FileReader(),
        that = this,
        _name,_fileName;
      _name = file.value;
      _fileName = _name.substring(_name.lastIndexOf(".") + 1).toLowerCase();
      if (_fileName !== "png" && _fileName !== "jpg") {
        that.$vux.toast.show({
          text: "请上传图片类型文件！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }else{
        reader.readAsDataURL(file.files[0]);
        if (file.files[0].size > 10 * 1024 * 1024) {
          that.$vux.toast.show({
            text: that.$t("ups.d"),
            type: "warn",
            position: "middle",
            time: 1500
          });
        } else {
          that.$vux.loading.show({
            text: "上传中..."
          });
          reader.onload = function() {
            let result = this.result;
  
            // that.data1 = result;
  
            var image = new FormData();
            image.append("file", e.target.files[0]);
            // image.append("nozzle", "upload");
            // image.append("token", that.$store.state.user_info.token);
            that
              .$http({
                url: "/upload",
                method: "post",
                data: image
              })
              .then(function(res) {
                that.$vux.loading.hide();
                if (res.data.code == 200) {
                  that.data1 = result;
                  that.urll = res.data.msg;
                } else {
                  that.$vux.toast.show({
                    text: "上传失败，请重新上传！",
                    type: "cancel",
                    position: "middle",
                    time: 1200
                  });
                }
              });
          };
        }

      }
    },
    delImg1: function(e) {
      this.data1 = "";
      let dom = document.getElementById("handcard");
      dom.value = "";
    },
    sub() {
      let that = this;
      if (that.t_num && that.urll && that.comment) {
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "recharge_operation",
              token: that.$store.state.user_info.token,
              number: that.t_num,
              address: that.ads,
              img: that.urll,
              remark: that.comment
            }
          })
          .then(function(res) {
            that.$vux.loading.hide();
            if (res.data.code == 1) {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "success",
                position: "middle",
                time: 1200
              });
              that.t_num = "";
              that.data1 = "";
              that.urll = "";
              that.comment = "";
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
  width: 100%;
  color: white;
  box-sizing: border-box;
  padding-top: 1.15rem;
  > .top {
    border-bottom: 0.05rem solid #242424;
    > span:last-child {
      position: absolute;
      right: 4%;
      top: 0.04rem;
      font-size: 0.36rem;
    }
  }
  .d_main {
    box-sizing: border-box;
    .top_tips {
      padding: 0.4rem 4% 0.4rem;
      line-height: 0.55rem;
      box-sizing: border-box;
    }
    .main {
      box-sizing: border-box;
      // div {
      //   padding: 0.4rem 0 0.6rem;
      //   img {
      //     width: 3rem;
      //     height: 3rem;
      //   }
      // }
      > div:first-child {
        padding-top: 0.6rem;
        border-top: 1px solid #242424;
        border-bottom: 1px solid #242424;
        > div {
          padding: 0 4% 0;
          overflow: hidden;
          padding-bottom: 0.6rem;
          box-sizing: border-box;
          span {
            line-height: 0.8rem;
          }
          span:first-child {
            padding-right: 0.2rem;
            width: 2rem;
            text-align: right;
          }
          span:nth-child(2) {
            width: calc(100% - 4.4rem);
            overflow: hidden;
            text-overflow: ellipsis;
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
          input {
            background: transparent;
            border: 1px solid #ba9870;
            line-height: 0.8rem;
            box-sizing: border-box;
            padding: 0 0.2rem 0;
            width: calc(100% - 3.1rem);
            color: white;
          }
          .btn {
            width: 2rem;
            line-height: 0.58rem;
            border: 1px solid #ba9870;
            color: #ba9870;
            border-radius: 4px;
            background: transparent;
          }
        }
      }
      > div:nth-child(2) {
        padding-top: 0.6rem;
        > div {
          padding: 0 4% 0.6rem;
          box-sizing: border-box;
          > span {
            float: left;
            padding-right: 0.1rem;
            width: 2rem;
            text-align: right;
            padding-bottom: 0.3rem;
          }
          .up_div {
            clear: both;
            width: 5rem;
            height: 4rem;
            margin: 0 auto;
            border: 1px solid #ba9870;
            position: relative;
            text-align: center;
            .icon {
              position: absolute;
              left: 50%;
              top: 0.6rem;
              font-size: 1.4rem;
              transform: translateX(-50%);
            }
            .jia {
              position: absolute;
              left: 50%;
              top: 2.4rem;
              color: #ba9870;
              transform: translateX(-50%);
              white-space: nowrap;
            }
            img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
            input {
              opacity: 0;
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
            }
            .clear {
              font-size: 0.72rem;
              color: rgba(255, 255, 255, 0.8);
              position: absolute;
              right: -0.8rem;
              top: -0.4rem;
            }
          }
          textarea {
            width: calc(100% - 2.2rem);
            box-sizing: border-box;
            padding: 0.2rem;
            border: 1px solid #ba9870;
            background: #6a5337;
            color: white;
            outline: 0;
          }
        }
      }
    }
    > div:last-child {
      .btn {
        display: block;
        width: 4rem;
        line-height: 0.7rem;
        border-radius: 4px;
        background: #ba9870;
        color: white;
        margin: 0.2rem auto;
      }
    }
  }
}
</style>
