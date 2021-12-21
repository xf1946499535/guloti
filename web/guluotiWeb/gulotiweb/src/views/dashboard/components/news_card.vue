<template>
  <div class="news_card">
    <el-card :body-style="{ padding: '0px' }">
      <div class="newsimg">
        <img
          :src="newsmsg.news_headimg_url"
          @click="routeto('/news_show', newsmsg.id)"
          alt=""
        />
      </div>
      <div class="news_info">
        <div class="newstitle" @click="routeto('/news_show', newsmsg.id)">
          {{ this.newsmsg.news_title }}
        </div>
        <div class="news_info_time">
          <span>{{ this.newsmsg.playtimes }}万次播放</span>
          <br />
          <span>{{ this.newsmsg.news_time }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["newsmsg"],
  data() {
    return {};
  },
  methods: {
    routeto(path, data) {
      this.$router.push({ path: path, query: { id: data } });
    },
  },
};
</script>

<style lang="scss">
.news_card {
  width: 100%;
  .newsimg {
    font-size: 0;
    width: 100%;
    overflow: hidden;
    img {
      width: 100%;
      transition: all 0.2s;
    }
    img:hover {
      transform: scale(1.2);
    }
  }
  .news_info {
    margin-top: 10px;
    width: 100%;
    height: 100px;
    .newstitle {
      min-height: 2rem;
      line-height: 1rem;
      font-size: 1rem;
    }
    .newstitle:hover {
      cursor: pointer;
      color: red;
    }
    .news_info_time {
      margin-top: 10px;
      span {
        color: rgb(170, 169, 169);
      }
    }
  }
}
</style>