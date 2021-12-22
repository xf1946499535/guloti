<template>
  <div class="carbuy">
    <div class="carbuy_main">
      <div class="main_aside">
        <div class="carname">
          <div class="carname_item">
            <img :src="car.brand_logo" alt="" />
          </div>
          <div class="carname_item">{{ car.car_name }}</div>
          <div class="carname_type">{{ car.car_brand }}/{{ car.car_type }}</div>
        </div>
        <div class="car_price">
          <div class="price_title">经销商指导价</div>
          <div class="price_info_up">
            {{ car.car_price_low }}-{{ car.car_price_high }}万
          </div>
        </div>
        <div class="car_price">
          <div class="price_title">官方指导价</div>
          <div class="price_info_down">
            {{ car.car_price_low }}-{{ car.car_price_high }}万
          </div>
        </div>
        <div class="buycarBtn">询问商家</div>
        <div class="buycarBtn" @click="buycarsubmit(car.id)">购买此车</div>
      </div>
      <div class="main_mid">
        <div class="sliberimg_l">
          <img :src="sliberimg[0]" alt="" />
        </div>
        <div class="sliberimg_r">
          <div class="sliberimg_small"><img :src="sliberimg[1]" alt="" /></div>
          <div class="sliberimg_small"><img :src="sliberimg[2]" alt="" /></div>
        </div>
      </div>
      <div class="main_aside">
        <div class="car_comment">
          <span>汽车评价</span>
          <br />
          {{ car.car_introduce }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getcarinfo, buycar } from "@/api/cars";
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
      });
    },
    buycarsubmit(carid) {
      buycar(carid).then(
        (res) => {
          console.log("成功了");
        },
        (err) => {
          // console.log(err);
          this.$notify.error({
            title: "无法购买",
            message: err.message,
          });
          this.$router.push("/login");
        }
      );
    },
  },
};
</script>

<style lang="scss">
.carbuy {
  height: 800px;
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
    display: flex;
    .main_mid {
      width: 60%;
      display: flex;
    }
    .sliberimg_l {
      width: 67%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .sliberimg_r {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .sliberimg_small {
        height: 50%;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .main_aside {
      width: 20%;
      .carname {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .carname_item {
          height: 3rem;
          line-height: 3rem;
          font-size: 2rem;
          font-weight: 900;
          img {
            height: 100%;
          }
        }
        .carname_type {
          margin-left: 20px;
          height: 3rem;
          line-height: 3rem;
          font-size: 1rem;
          color: #99a9bf;
        }
      }
      .car_price {
        width: 100%;
        height: 1.5rem;
        margin-top: 5px;
        display: flex;
        line-height: 1.5rem;
        .price_title {
          border: 1px solid #b6bac0;
          color: #b5bac0;
          text-align: center;
          height: 1.5rem;
          line-height: 1.5rem;
          padding: 0 5px;
        }
        .price_info_up {
          font-size: 1.3rem;
          margin-left: 10px;
          font-weight: 900;
          color: red;
        }
        .price_info_down {
          font-size: 1rem;
          margin-left: 10px;
        }
      }
      .buycarBtn {
        width: 80%;
        height: 2.5rem;
        line-height: 2.5rem;
        font-size: 1.2rem;
        background: rgb(43, 141, 233);
        text-align: center;
        color: #fff;
        margin-top: 10px;
        cursor: pointer;
      }
      .buycarBtn:hover {
        background: rgb(67, 149, 226);
        color: rgb(247, 68, 68);
      }
      .car_comment {
        width: 90%;
        margin: 10px auto;
        border: 1px solid #d3dce6;
        line-height: 1.5rem;
        letter-spacing: 5px;
      }
    }
  }
}
</style>