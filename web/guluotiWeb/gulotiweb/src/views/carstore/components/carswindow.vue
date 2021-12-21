<template>
  <div class="carswindow">
    <div class="nothing" v-if="carslist.length == 0">
      抱歉，暂未找到合适车型
    </div>
    <div
      class="caritem"
      v-for="(car, index) in carslist"
      :key="index + 'carslist'"
      @click="routeto('/carbuy', car.id)"
    >
      <div class="car_showimg">
        <el-card shadow="hover">
          <img :src="car.car_showimg" alt="" />
          <div class="cars_msg cars_name">{{ car.car_name }}</div>
          <div class="cars_msg cars_score">
            <el-rate
              v-model="car.car_score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </div>
          <div class="cars_msg cars_price">
            {{ car.car_price_low }}-{{ car.car_price_high }}万
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["carslist"],
  methods: {
    routeto(path, data) {
      this.$router.push({
        path: path,
        query: {
          data: data,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.carswindow {
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
.carswindow .caritem:last-child:nth-child(4n + 2) {
  margin-right: calc((100% - 23%) / 3 * 2);
}
.carswindow .caritem:last-child:nth-child(4n + 3) {
  margin-right: calc((100% - 23%) / 3 * 1);
}
</style>