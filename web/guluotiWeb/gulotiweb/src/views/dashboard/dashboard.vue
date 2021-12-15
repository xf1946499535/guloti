<template>
  <div class="dashboard">
    <!-- 今日要闻 -->
    <div class="first_news">
      <div class="first_news_title"></div>
      <div class="first_news_item">
        <el-carousel :interval="5000" type="card" height="300px">
          <el-carousel-item
            v-for="(item, index) in sliberimg"
            :key="index + 'sliber'"
          >
            <img :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 资讯列表区 -->
    <div class="news_list">
      <div
        class="news_list_item"
        v-for="(item, index) in news_list"
        :key="index + 'newslist'"
      >
        <carcard :newsmsg="item"></carcard>
      </div>
      <div
        class="news_list_item"
        v-for="(item, index) in news_list"
        :key="index + 'newslist1'"
      >
        <carcard :newsmsg="item"></carcard>
      </div>
    </div>

    <!-- <video id="myVideo" class="video-js">
      <meta name="referrer" content="never" />
      <source
        src="https://v6-default.ixigua.com/0cba615e88eb5ac45b86ea6666a3c13c/61b98af2/video/tos/cn/tos-cn-ve-4-alinc2/560b8c30b5854388976fa3b181254416/?a=0&br=2574&bt=2574&cd=0%7C0%7C0&ch=0&cr=0&cs=0&dr=0&ds=4&er=0&ft=teqIn88-o10DN7nh7TQ_plXxuhsdB9XsHqY&l=20211215132506010212202081033133CA&lr=xigua&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M2dxOmk6ZnNwOTMzNDczM0ApNzk0OTU1OmU7N2c8NThnZWdfMDRncjRfM3BgLS1kLS9zcy8tMy4vLWM2L2AuM15fYjQ6Yw%3D%3D&vl=&vr="
        type="video/mp4"
      />
    </video> -->
  </div>
</template>

<script>
import carcard from "./components/car_card.vue";
import { getnewslist } from "@/api/car_news";
export default {
  components: { carcard },
  data() {
    return {
      //轮播图列表
      sliberimg: [
        "http://47.108.230.246:8080/guloti/GulotiResource/dashboard_web/slide_1.jpeg",
        "http://47.108.230.246:8080/guloti/GulotiResource/dashboard_web/slide_2.webp",
        "http://47.108.230.246:8080/guloti/GulotiResource/dashboard_web/slide_3.webp",
        "http://47.108.230.246:8080/guloti/GulotiResource/dashboard_web/slide_4.webp",
        "http://47.108.230.246:8080/guloti/GulotiResource/dashboard_web/slide_5.webp",
      ],
      //资讯列表
      news_list: [],
    };
  },
  mounted() {
    // this.initVideo();
    this.getNewslist();
  },
  methods: {
    initVideo() {
      //初始化视频方法
      let myPlayer = this.$video(myVideo, {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: "muted",
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        width: "800px",
        //设置视频播放器的显示高度（以像素为单位）
        height: "400px",
      });
    },
    getNewslist() {
      getnewslist().then((res) => {
        this.news_list = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss">
.dashboard {
  overflow: hidden;
  width: 100%;
  .first_news {
    width: 100%;
    height: 300px;
    .first_news_item {
      width: 100%;
      height: 300px;
    }
    .first_news_title {
      height: 2rem;
      background: url("https://lf3-motor.dcarstatic.com/obj/motor-fe-static/motor/pc/_next/static/images/today-news-84b400f0c7be4f1e2ea8..svg")
        no-repeat;
    }
  }
  .el-carousel__item {
    height: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .news_list {
    width: 100%;
    display: flex;
    margin-top: 100px;
    flex-wrap: wrap;
    .news_list_item {
      width: 25%;
      height: 300px;
      padding: 4px 2px;
      background-color: #fff;
    }
  }
}
</style>