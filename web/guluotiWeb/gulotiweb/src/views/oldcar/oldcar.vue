<template>
  <div class="oldcar">
    <div class="carlist" v-loading="loading">
      <oldcarlist :carslist="cars" @getcarsinbarn="init"></oldcarlist>
    </div>
  </div>
</template>

<script>
import oldcarlist from "./components/oldcar_carlist.vue";
import { getoldcarlist } from "@/api/oldcar";
export default {
  components: {
    oldcarlist,
  },
  created() {
    this.init();
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
      getoldcarlist().then(
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
.oldcar {
  width: 100%;
  height: 800px;
  background: rgb(255, 255, 255);
  .carlist {
    width: 100%;
  }
}
</style>