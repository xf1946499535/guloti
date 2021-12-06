<template>
  <div class="dashboard">
    咨询页面
    <!-- <video id="myVideo" class="video-js">
      <meta name="referrer" content="never" />
      <source
        src="https://v6-default.ixigua.com/f05d0efaf2cdaf09f7ba4ef9817bd12b/61ab3654/video/tos/cn/tos-cn-ve-4-alinc2/aecc1cd7f3514c13bc58add344945f74/?a=0&br=4799&bt=4799&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=4&er=0&ft=teqIn88-o10DN7nh7TQ_plXxuhsd8ly8HqY&l=2021120416303001021213803308FC8ECC&lr=xigua&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M3Ntcmg6ZmR5OTMzNDczM0ApaTRnPDQ7NGU1Nzc1OTQ1OmcxY3BycjQwLWhgLS1kLWFzcy1iYTEyYC1hMS9hYzQxMV46Yw==&vl=&vr="
        type="video/mp4"
      />
    </video> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // this.initVideo();
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
  },
};
</script>

<style>
</style>