<template>
  <div class="oldcar_carlist">
    <div class="carlist_box">
      <div class="nothing" v-if="carslist.length == 0">
        抱歉，没有二手车出售~~
      </div>
      <div
        class="caritem"
        v-for="(car, index) in carslist"
        :key="index + 'carslist'"
        @click="routeto('/oldcarbuy', car.barn_id)"
      >
        <div class="car_showimg">
          <el-card shadow="hover">
            <img :src="car.car_showimg" alt="" />
            <div class="cars_msg cars_name">{{ car.car_name }}</div>
            <div class="cars_msg">
              {{ car.sellstate
              }}<span v-if="car.sellstate == '在售'">:{{ car.pricing }}万</span>
            </div>
            <div class="cars_msg cars_price">
              原价:{{ car.car_price_low }}万
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["carslist"],
  data() {
    return {
      //验证登录密码
      formLabelWidth: "120px",
      loading: false,
    };
  },
  methods: {
    routeto(path, barn_id) {
      this.$router.push({
        path: path,
        query: {
          barn_id: barn_id,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.oldcar_carlist {
  width: 100%;
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
  .carlist_box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: 800px;
    .nothing {
      text-align: center;
      line-height: 300px;
      font-size: 1.5rem;
      height: 300px;
      width: 100%;
      background-color: #fff;
      margin: 10px auto;
    }
    .caritem {
      width: 23%;
      cursor: pointer;
      box-sizing: border-box;
      padding: 10px 10px;
      height: 300px;
      margin-top: 10px;
      .car_showimg {
        img {
          width: 100%;
        }
        .cars_msg {
          margin-top: 10px;
          width: 100%;
          text-align: center;
        }
        .cars_name {
          height: 1.5rem;
          line-height: 1.5rem;
          font-size: 1.05rem;
        }
        .cars_score {
          height: 1rem;
          line-height: 1rem;
          font-size: 1rem;
        }
        .cars_price {
          height: 1.1rem;
          line-height: 1.1rem;
          color: #f52d26;
        }
      }
    }
  }
}
.carlist_box .caritem:last-child:nth-child(4n + 2) {
  margin-right: calc((100% - 23%) / 3 * 2);
}
.carlist_box .caritem:last-child:nth-child(4n + 3) {
  margin-right: calc((100% - 23%) / 3 * 1);
}
</style>