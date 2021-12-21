<template>
  <div class="carbuy">
    <div class="carbuy_main">
      <div class="main_aside"></div>
      <div class="main_mid">
        <div class="sliberimg">
          <el-carousel
            :interval="5000"
            arrow="always"
            indicator-position="none"
          >
            <el-carousel-item
              v-for="(item, index) in sliberimg"
              :key="index + 'sliber'"
            >
              <img :src="item" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="main_aside"></div>
    </div>
  </div>
</template>

<script>
import { getcarinfo } from "@/api/cars";
export default {
  created() {
    this.init();
  },
  data() {
    return {
      car: {},
      sliberimg: [],
    };
  },
  methods: {
    init() {
      getcarinfo(this.$route.query.data).then((res) => {
        this.car = res.data.data[0];
        this.sliberimg = res.data.data[0].car_exhibition_list.split("$");
        console.log(this.car);
        console.log(this.sliberimg);
      });
    },
  },
};
</script>

<style lang="scss">
.carbuy {
  width: 100%;
  height: 500px;
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
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
  .carbuy_main {
    width: 100%;
    height: 500px;
    display: flex;
    .main_mid {
      width: 50%;
      height: 100%;
    }
    .sliberimg {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .main_aside {
      width: 25%;
      height: 100%;
      background-color: rgb(228, 228, 228);
    }
  }
}
</style>