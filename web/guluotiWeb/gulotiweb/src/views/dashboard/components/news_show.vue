<template>
  <div class="news_show">
    <video v-if="videoloading" id="myVideo" class="video-js">
      <meta name="referrer" content="never" />
      <source :src="url" type="video/mp4" />
    </video>
    <div>{{ news_msg }}</div>
  </div>
</template>

<script>
import { getnews } from "@/api/car_news";

export default {
  created() {
    this.init();
  },
  mounted() {},
  data() {
    return {
      news_msg: {},
      url: "",
      videoloading: false,
      myPlayer: "",
    };
  },
  methods: {
    init() {
      getnews(this.$route.query.id)
        .then((res) => {
          this.news_msg = res.data.data;
          this.url = res.data.data.news_video_url;
          this.videoloading = true;
        })
        .then(() => {
          this.initVideo();
        });
    },
    initVideo() {
      //初始化视频方法
      this.myPlayer = this.$video("myVideo", {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: "muted",
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        // //设置视频播放器的显示宽度（以像素为单位）
        // width: "800px",
        // //设置视频播放器的显示高度（以像素为单位）
        // height: "400px",
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    this.myPlayer.dispose();
    next();
  },
};
</script>

<style lang="scss">
.news_show {
  width: 100%;
  #myVideo {
    width: 100%;
    height: 500px;
  }
}
</style>