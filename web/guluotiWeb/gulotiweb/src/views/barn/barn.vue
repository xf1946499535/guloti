<template>
  <div class="barn">
    <div class="carlist" v-loading="loading">
      <barncarlist :carslist="cars" @getcarsinbarn="init"></barncarlist>
    </div>
  </div>
</template>

<script>
import barncarlist from "./components/barn_carlist.vue";
import { getcarsinbarn } from "@/api/barn";
export default {
  components: {
    barncarlist,
  },
  created() {
    this.init();
    // getcarsinbarn().then((res) => {
    //   this.cars = res.data.data;
    // });
  },
  data() {
    return {
      cars: [],
      loading: false,
    };
  },
  methods: {
    init() {
      this.loading = true;
      //获取车库车辆列表
      getcarsinbarn().then(
        (res) => {
          this.cars = res.data.data;
          this.loading = false;
        },
        (err) => {
          this.$notify.error({
            title: "获取失败",
            message: err.message,
          });
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style lang="scss">
.barn {
  width: 100%;
  height: 800px;
  .carlist {
    width: 100%;
  }
}
</style>