<template>
  <div id="app">
    <transition :name="transitionName">
        <router-view name="main" class="main"></router-view>
    </transition>
  </div>
</template>

<script>
import "./assets/iconfont/iconfont.css";
import "./base/css/common.css";
export default {
  name: "App",
  data() {
    return {
      transitionName: "",
      timedown: this.arr
    };
  },
  watch: {
    // 使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.fullPath.indexOf("index")==-1){
        clearInterval(window.tt0);
        clearInterval(window.tt1);
      }
      if (to.meta.none != "true" || from.meta.none != "true") {
        if (to.meta.index > from.meta.index) {
          //设置动画名称
          this.transitionName = "slide-left";
        } else {
          this.transitionName = "slide-right";
        }
      } else {
        this.transitionName = "";
      }
    }
  },
  components: {},
  mounted() {
    let that = this;
  },
  methods: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.main {
  width: 100%;
  /* height: 100%;
  position: absolute; */
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
<style lang="less">
@import "~vux/src/styles/close.less";
</style>
