<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div>帮助中心</div>
        </div>
        <div class="main">
            <ul>
                <li v-for="(item,index) in list" :key="index" @click="showDg(item)">
                    <span class="f_l">{{item.title}}</span>
                    <img class="f_r r_img" src="../assets/right1.png" alt="">
                </li>
            </ul>
        </div>
        <x-dialog v-model="dialog" class="default_dialog" hide-on-blur>
        <div class="dialog">
          <span class="vux-close" @click="dialog=false;"></span>
            <div class="title">{{cur_title}}</div>
             <div class="con ta_l" v-html="cur_content"></div>
        </div>
      </x-dialog>
      <x-dialog v-model="dialog0" class="default_dialog">
        <div class="dialog">
          <span class="vux-close" @click="back"></span>
            <div class="title">{{warn.title}}</div>
            <div class="con ta_l">
              {{warn.content}}
            </div>
            <div>
                <button class="btn" @click="dialog0=false">确认风险</button>
            </div>
        </div>
      </x-dialog>
    </div>
</template>
<script>
import { XDialog } from "vux";
export default {
  data() {
    return {
      dialog0: false,
      dialog: false,
      warn:"",
      list:"",
      cur_title:"",
      cur_content:"",
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
          nozzle: "help_center",
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          if(res.data.data.length){
            that.list = res.data.data;
            // that.dialog0 = true;
          }
        } else{
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
    back() {
      let that = this;
      that.$router.back();
    },
    showDg(o) {
      this.cur_title = o.title;
      this.cur_content = o.content;
      this.dialog = true;
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
  }
  .default_dialog {
    .dialog {
      color: #333;
      padding: 0.8rem 0.4rem 0.6rem;
      box-sizing: border-box;
      width: 100%;
      .vux-close {
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
      }
      .title {
        padding: 0.2rem 0 0.4rem;
      }
      .con{
          max-height: 8rem;
          overflow: auto;
      }
      .btn {
        display: block;
        width: 3rem;
        text-align: center;
        background: #ba9870;
        color: white;
        line-height: 0.7rem;
        border-radius: 20px;
        margin: 0.6rem auto 0;
      }
    }
  }
}
</style>
