<template>
  <div class="news_show">
    <video
      v-if="videoloading && news_msg.news_content_type == 'video'"
      :src="url"
      autoplay="autoplay"
      muted="muted"
      controls="controls"
      height="400"
      width="700"
    ></video>
    <div class="news_info">
      <div class="news_info_title">{{ news_msg.news_title }}</div>
      <div class="news_content" v-html="news_msg.news_text"></div>
      <div class="news_info_time">
        <span>发布于{{ news_msg.news_time }}</span>
        <span>{{ news_msg.playtimes }}万次</span>
      </div>
    </div>
    <!-- <div>{{ news_msg }}</div> -->
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
      myPlayer: {},
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
          if (this.news_msg.news_content_type == "video") {
            this.initVideo();
          }
        });
    },
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  beforeDestroy() {
    if (this.news_msg.news_content_type == "video") {
      this.myPlayer.dispose();
    }
  },
};
</script>

<style lang="scss">
.news_show {
  width: 100%;
  min-height: 800px;
  #myVideo {
    width: 100%;
    height: 500px;
  }
  .news_info_title {
    font-size: 1.3rem;
    line-height: 1.5rem;
    height: 1.5rem;
    margin: 1.2rem 0;
  }
  .news_content {
    font-size: 1rem;
    line-height: 1.5rem;
    margin: 1.2rem 0;
  }
  .news_info_time {
    color: rgb(133, 132, 132);
    span {
      font-size: 1rem;
      padding-right: 2rem;
    }
  }
}
</style>