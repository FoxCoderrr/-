<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div>转币</div>
        </div>
        <div class="main">
            <div class="form">
                <div>
                    <div class="f_l">转币金额：</div>
                    <input class="f_l" type="number" @input="num" v-model="u_num">
                    <span class="f_r">ETH</span>
                </div>
                <div>
                    <div class="f_l">接收地址：</div>
                    <select class="f_l" @change="selectAds($event)">
                        <option v-for="(item,index) in ads_lists" :key="index" :value="item.id">{{item.ads}}</option>
                    </select>
                </div>
                <div class="ta_c add_ads">
                    <span class="iconfont icon-tianjia" @click="addAds"></span>
                    <span @click="addAds">添加钱包地址</span>
                    <span class="editAds f_c" @click="toEdit">地址管理</span>
                </div>
                <div class="textarea">
                    <div class="f_l">备注：</div>
                    <div class="f_l">
                        <textarea rows="4" placeholder="请备注您的手机号" v-model="u_comment"></textarea>
                    </div>
                </div>
                <button class="btn" @click="sub">确定</button>
            </div>
        </div>
        <x-dialog v-model="dialog" class="ads_dialog" hide-on-blur @on-hide="dialog=false;ads='';tag=''">
        <div class="dialog">
          <div class="title">添加C2C地址</div>
          <div class="form">
            <div>
              <span>C2C地址：</span>
              <input type="text" placeholder="请输入钱包地址" v-model="ads">
            </div>
            <div>
              <span class="f_l">地址标签：</span>
              <input class="f_r" type="text" placeholder="如：张三" v-model="tag">
            </div>
            <div>
              <button class="btn" @click="subAdd">确定</button>
              <button class="btn" @click="cancel">取消</button>
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
      u_ads: "",
      u_num: "",
      u_number: "0",
      u_pwd: "",
      u_code: "",
      u_comment: "",
      min: "",
      min_num: "",
      fee: "",
      btn_msg: "发送验证码",
      time: 60,
      tips: [],
      balance: "",
      ads_lists: [],
      dialog: false,
      ads: "",
      tag: ""
    };
  },
  components: {
    XDialog
  },
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
          nozzle: "transfer_info",
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.balance = res.data.data.balance;
          if (res.data.data.address.length) {
            that.u_ads = res.data.data.address[0].id;
            for (let i = 0, l = res.data.data.address.length; i < l; i++) {
              res.data.data.address[i].ads =
                res.data.data.address[i].address.split(":")[0] +
                "【" +
                res.data.data.address[i].address.split(":")[1] +
                "】";
            }
            that.ads_lists = res.data.data.address;
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
  methods: {
    back() {
      let that = this;
      that.$router.back();
    },
    toEdit() {
      this.$router.push({
        name: "editaddress1"
      });
    },
    addAds() {
      this.dialog = true;
    },
    cancel() {
      this.dialog = false;
      this.ads = "";
      this.tag = "";
    },
    subAdd() {
      let that = this;
      if (that.ads && that.tag) {
        let reg = /^[A-Za-z0-9]+$/;
        if (reg.test(that.ads)) {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "address_transfer",
                token: that.$store.state.user_info.token,
                address: that.ads,
                name: that.tag
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
                that
                  .$http({
                    url: "/",
                    method: "post",
                    data: {
                      nozzle: "transfer_info",
                      token: that.$store.state.user_info.token
                    }
                  })
                  .then(function(res) {
                    if (res.data.code == 1) {
                      that.balance = res.data.data.balance;
                      if (res.data.data.address.length) {
                        that.u_ads = res.data.data.address[0].id;
                        for (
                          let i = 0, l = res.data.data.address.length;
                          i < l;
                          i++
                        ) {
                          res.data.data.address[i].ads =
                            res.data.data.address[i].address.split(":")[0] +
                            "【" +
                            res.data.data.address[i].address.split(":")[1] +
                            "】";
                        }
                        that.ads_lists = res.data.data.address;
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
            text: "请输入正确的钱包地址",
            type: "cancel",
            position: "middle",
            time: 1200
          });
        }
      } else {
        that.$vux.toast.show({
          text: "请输入完整信息！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    num(e) {
      $(e.target).val(
        $(e.target)
          .val()
          .match(/\d+\.?\d{0,4}/)
      );
      this.u_num = $(e.target).val();
    },
    selectAds(e) {
      this.u_ads = e.target.value;
    },
    sub() {
      let that = this;
      if (that.u_num && that.u_ads && that.u_comment) {
        if (parseFloat(that.u_num) <= parseFloat(that.balance)) {
          that.$vux.loading.show({
            text: ""
          });
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "transfer_operation",
                token: that.$store.state.user_info.token,
                id: that.u_ads,
                number: that.u_num,
                remark: that.u_comment
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
                that.u_num = "";
                that.u_comment = "";
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
            text: "可用余额不足！",
            type: "cancel",
            position: "middle",
            time: 1200
          });
        }
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
  input,
  select {
    background: transparent;
    border: 1px solid #ba9870;
    color: #ba9870;
    width: calc(100% - 3rem);
    height: 0.8rem;
    box-sizing: border-box;
  }
  select {
    border-radius: 6px;
    height: 0.84rem;
    line-height: 0.84rem;
    outline: 0;
    padding: 0 0.1rem 0;
    box-sizing: border-box;
  }
  input {
    padding: 0 0.2rem 0;
  }
  textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 0.2rem;
    border: 1px solid #ba9870;
    background: #6a5337;
    color: white;
    outline: 0;
  }
  ::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  ::-moz-input-placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  ::-o-input-placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  ::-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  > .top {
    border-bottom: 0.05rem solid #242424;
  }
  .main {
    padding: 1rem 8% 1rem;
    box-sizing: border-box;
    .form {
      > div {
        overflow: hidden;
        margin-bottom: 0.5rem;
        span {
          line-height: 0.86rem;
        }
      }
      > div {
        > div:first-child {
          padding-bottom: 0.14rem;
        }
        > .f_l:first-child {
          width: 2rem;
          box-sizing: border-box;
          padding-right: 0.2rem;
          line-height: 0.8rem;
          text-align: right;
        }
      }
      > div:nth-child(2) {
        select {
          width: calc(100% - 2rem);
        }
      }
      > .add_ads {
        color: #aaa;
        line-height: 0.6rem;
        position: relative;
        .iconfont {
          font-size: 0.6rem;
          display: inline-block;
          vertical-align: sub;
          padding-right: 0.1rem;
        }
        .editAds {
          position: absolute;
          right: 3%;
        }
      }
      .textarea {
        .f_l:last-child {
          width: calc(100% - 2rem);
        }
      }
      .btn {
        display: block;
        width: 3rem;
        line-height: 0.7rem;
        border-radius: 4px;
        background: #ba9870;
        color: white;
        margin: 0.8rem auto;
      }
    }
  }
  .ads_dialog {
    .dialog {
      color: #333;
      position: relative;
      padding: 0.6rem 0.5rem 0;

      .title {
        font-size: 0.46rem;
      }
      .form {
        > div {
          overflow: hidden;
          line-height: 0.8rem;
          margin-bottom: 0.6rem;
          input {
            border: 1px solid #bbb;
            padding: 0 0.2rem 0;
            line-height: 0.8rem;
            box-sizing: border-box;
            width: calc(100% - 2rem);
            color: #333;
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

          .btn {
            width: 2rem;
            line-height: 0.66rem;
            border: 1px solid #ba9870;
            background: #ba9870;
            color: white;
            border-radius: 4px;
            margin: 0 0.5rem 0;
          }
          .btn:last-child {
            background: transparent;
            color: #ba9870;
          }
        }
        > div {
          span {
            display: block;
            text-align: left;
          }
          input {
            width: 100%;
            display: block;
          }
        }
        > div:first-child {
          margin-bottom: 0.2rem;
        }
      }
    }
  }
}
</style>
