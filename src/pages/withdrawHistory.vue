<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div>转账记录</div>
        </div>
        <tab class="tab transfer_tab" :line-width = 4 custom-bar-width='28px' bar-active-color="#ba9870" active-color="#ba9870" :scroll-threshold="5">
          <tab-item selected @click.native="navTap(0)">转币明细</tab-item>
          <tab-item @click.native="navTap(1)">提币明细</tab-item>
        </tab>
        <div class="main">
            <div v-if="nid0==0">
                <x-table :cell-bordered="false">
                    <thead>
                        <tr>
                            <th>转币时间</th>
                            <th>转币地址</th>
                            <th>数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in list" :key="index">
                            <td>{{item.time}}</td>
                            <td>{{item.address}}</td>
                            <td>{{item.number}}ETH</td>
                        </tr>
                    </tbody>
                </x-table>
            </div>
            <div v-if="nid0==1">
                <x-table :cell-bordered="false">
                    <thead>
                        <tr>
                            <th>提币时间</th>
                            <th>接收地址</th>
                            <th>金额</th>
                            <th>实际到账</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in list1" :key="index">
                            <td>{{item.time}}</td>
                            <td>{{item.send}}</td>
                            <td>{{item.number}}ETH</td>
                            <td>{{item.total}}ETH</td>
                            <td>{{item.status}}</td>
                        </tr>
                    </tbody>
                </x-table>
            </div>
            <!-- <van-pagination 
                v-model="page" 
                :total-items="100" 
                :items-per-page="5"
                :show-page-size="4"
                force-ellipses
                @change="change"
            /> -->
        </div>
    </div>
</template>
<script>
import { Tab, TabItem, XTable } from "vux";
// import { Pagination } from "vant";
// import "vant/lib/vant-css/pagination.css";
export default {
  data() {
    return {
      nid0: "0",
      list: [],
      list1:[],
      page: 1
    };
  },
  components: {
    Tab,
    TabItem,
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
    that.getlist1();
  },
  methods: {
    back() {
      let that = this;
      that.$router.back();
    },
    navTap(i) {
      this.nid0 = i;
      this.page = 1;
    },
    change(i) {
      console.log(i);
    },
    // 转币明细
    getlist() {
      let that = this;
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "transfer_log",
            token: that.$store.state.user_info.token
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            //   拿到数据
            that.list = res.data.data;
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
    },
    // 提现明细
    getlist1() {
      let that = this;
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "withdraw_log",
            token: that.$store.state.user_info.token
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            //   拿到数据
            that.list1 = res.data.data;
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
      td {
        white-space: nowrap;
        padding: 0.2rem 0.3rem 0.2rem;
        line-height: 0.8rem;
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
}
</style>
