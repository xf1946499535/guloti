<template>
  <div class="club">
    <div class="clubtitle">选择你的车友会</div>
    <div class="clublist">
      <div
        class="clubitem"
        v-for="(club, index) in clublist"
        :key="index + 'clublist'"
        @click="routeto('/invitation', club.club_id, club.brand_name)"
      >
        <div class="brand_logo">
          <el-card shadow="hover">
            <img :src="club.brand_logo" alt="" />
            <div class="club_msg club_name">{{ club.brand_name }}</div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getclublist } from "@/api/club";
export default {
  created() {
    this.init();
  },
  data() {
    return {
      clublist: [],
    };
  },
  methods: {
    init() {
      getclublist().then((res) => {
        this.clublist = res.data.data;
      });
    },
    routeto(path, club_id, club_name) {
      this.$router.push({
        path: path,
        query: {
          club_id: club_id,
          club_name: club_name,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.club {
  width: 100%;
  height: 800px;
  .clubtitle {
    font-size: 1.5rem;
  }
  .clublist {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .nothing {
      text-align: center;
      line-height: 300px;
      font-size: 1.5rem;
      height: 300px;
      width: 100%;
      background-color: #fff;
      margin: 10px auto;
    }
    .clubitem {
      width: 10%;
      cursor: pointer;
      box-sizing: border-box;
      padding: 10px 10px;
      margin-top: 20px;
      .brand_logo {
        img {
          width: 100%;
        }
        .club_msg {
          margin-top: 10px;
          width: 100%;
          text-align: center;
        }
        .club_name {
          height: 1.5rem;
          line-height: 1.5rem;
          font-size: 1.05rem;
        }
      }
    }
  }
  .clublist .clubitem:last-child:nth-child(4n + 2) {
    margin-right: calc((100% - 23%) / 3 * 2);
  }
  .clublist .clubitem:last-child:nth-child(4n + 3) {
    margin-right: calc((100% - 23%) / 3 * 1);
  }
}
</style>