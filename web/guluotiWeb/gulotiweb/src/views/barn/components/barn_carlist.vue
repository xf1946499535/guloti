<template>
  <div class="barn_carlist">
    <el-dialog
      title="请填写出售信息"
      :visible.sync="dialogFormVisible"
      v-if="$store.getters.getme && sellcar"
    >
      <el-form :model="buycarform" size="mini">
        <el-form-item label="汽车名称" :label-width="formLabelWidth">
          {{ sellcar.car_name }}/{{ sellcar.car_brand }}
        </el-form-item>
        <el-form-item label="产地" :label-width="formLabelWidth">
          {{ sellcar.car_manufacture_addr }}
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          {{ sellcar.car_price_low }}w
        </el-form-item>
        <el-form-item label="出售日期" :label-width="formLabelWidth">
          {{ new Date() }}
        </el-form-item>
        <el-form-item label="出售人" :label-width="formLabelWidth">
          {{ $store.getters.getme.name }}
        </el-form-item>
        <el-form-item label="出售须知" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="sellcar.car_introduce"
            :disabled="true"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="定价" :label-width="formLabelWidth">
          <el-input
            v-model="buycarform.pricing"
            placeholder="请输入您的售价"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录密码" :label-width="formLabelWidth">
          <el-input
            v-model="buycarform.paypassword"
            show-password
            placeholder="请输入您的密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sellcommit">确 认 出 售</el-button>
      </div>
    </el-dialog>
    <div class="carlist_box">
      <div class="nothing" v-if="carslist.length == 0">
        抱歉，暂未找到合适车型
      </div>
      <div
        class="caritem"
        v-for="(car, index) in carslist"
        :key="index + 'carslist'"
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
            <el-button
              v-show="car.sellstate == '在库'"
              type="danger"
              size="small"
              @click="tosell(car)"
              round
              >出售此车</el-button
            >
            <el-button
              v-show="car.sellstate == '在售'"
              type="danger"
              size="small"
              @click="giveupsell(car)"
              round
              >放弃出售</el-button
            >
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sellcar, giveupsell } from "@/api/barn";
export default {
  props: ["carslist"],
  data() {
    return {
      //当前选中的出售的车
      sellcar: null,
      //dialog框开关
      dialogTableVisible: false,
      dialogFormVisible: false,
      buycarform: {
        //支付密码
        paypassword: "",
        //定价
        pricing: "",
      },
      //验证登录密码

      formLabelWidth: "120px",
      loading: false,
    };
  },
  methods: {
    tosell(car) {
      this.sellcar = car;
      this.dialogFormVisible = true;
    },
    sellcommit() {
      var data = {
        barnid: this.sellcar.barn_id,
        paypassword: this.buycarform.paypassword,
        pricing: this.buycarform.pricing,
      };
      sellcar(data).then(
        (res) => {
          this.$message({
            message: "汽车成功挂售",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.$emit("getcarsinbarn");
        },
        (err) => {
          this.$notify.error({
            title: "无法出售",
            message: err.message,
          });
        }
      );
    },
    giveupsell(car) {
      this.sellcar = car;
      var data = {
        barnid: this.sellcar.barn_id,
      };
      giveupsell(data).then(
        (res) => {
          this.$message({
            message: "汽车成功取消出售",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.$emit("getcarsinbarn");
        },
        (err) => {}
      );
    },
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
.barn_carlist {
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