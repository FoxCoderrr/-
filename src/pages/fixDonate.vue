<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div>定期捐赠</div>
        </div>
        <div class="main">
            <div>
                <!-- <ul>
                    <li>
                        <span class="s_w1">捐赠时间</span>
                        <span class="s_w2">模式</span>
                        <span class="s_w3">金额</span>
                        <span class="s_w2">剩余时间</span>
                        <span class="s_w1">释放日期</span>
                        <span class="s_w2">操作</span>
                    </li>
                    <li v-for="(item,index) in list" :key="index">
                        <span class="s_w1">{{item.time}}</span>
                        <span class="s_w2">{{item.name}}</span>
                        <span class="s_w3">{{item.number}}ETH</span>
                        <span class="s_w2">{{item.day}}天</span>
                        <span class="s_w1">{{item.back_time}}</span>
                        <span class="f_c s_w2" @click="exitDonate">推出捐赠</span>
                    </li>
                </ul> -->
                <x-table :cell-bordered="false">
                    <thead>
                        <tr>
                            <th>捐赠时间</th>
                            <th>模式</th>
                            <th>金额</th>
                            <th>剩余时间</th>
                            <th>释放日期</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in list" :key="index">
                          <td>{{item.time}}</td>
                          <td>{{item.name}}</td>
                          <td>{{item.number}}ETH</td>
                          <td>{{item.day}}天</td>
                          <td>{{item.back_time}}</td>
                          <td class="f_c" @click="exitDonate(item.id)">退出捐赠</td>
                        </tr>
                    </tbody>
                </x-table>
            </div>
            <!-- <van-pagination 
                v-model="page" 
                :total-items="100" 
                :items-per-page="10"
                :show-page-size="4"
                force-ellipses
                @change="change"
            /> -->
        </div>
        <div class="warm_tip f_c">
          <div class="title">温馨提示：</div>
          <div class="con">
            {{tip}}
          </div>
        </div>
    </div>
</template>
<script>
import { XTable } from "vux";
// import { Pagination } from "vant";
// import "vant/lib/vant-css/pagination.css";
export default {
  data() {
    return {
      list: [],
      page: 1,
      tip:""
    };
  },
  components: {
    XTable
    // "van-pagination": Pagination
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    that.getlist();
  },
  methods: {
    back() {
      let that = this;
      that.$router.back();
    },
    exitDonate(id) {
      let that = this;
      that.$vux.confirm.show({
        title: "退出捐赠",
        confirmText: "确定",
        cancelText: "取消",
        content: "确定要退出捐赠吗？",
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "out_donation",
                token: that.$store.state.user_info.token,
                id: id,
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
                that.getlist();
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
        }
      });
    },
    change(i) {
      console.log(i);
    },
    getlist() {
      let that = this;
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "regular_log",
            token: that.$store.state.user_info.token
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.list = res.data.data.data;
            that.tip = res.data.data.tips;
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
  background: #242424;
  color: white;
  padding-top: 1.1rem;
  box-sizing: border-box;
  > .top {
    border-bottom: 0.05rem solid #242424;
  }
  .main {
    box-sizing: border-box;
    background: #010101;
    > div {
      overflow-x: scroll;

      .vux-table{
        width: auto;
      }
      ul {
        width: 100%;
        li {
          padding: 0.3rem 3% 0.3rem;
          border-bottom: 1px solid #242424;
          white-space: nowrap;
          background: #010101;
          span {
            display: inline-block;
            text-align: center;
          }
          .s_w1 {
            width: 4rem;
          }
          .s_w2 {
            width: 2rem;
          }
          .s_w3 {
            width: 4rem;
          }
        }
      }
    }
  }
  .warm_tip {
    .title {
      padding-bottom: 0.2rem;
    }
    padding: 0.6rem 4% 0.4rem;
  }
}
</style>
