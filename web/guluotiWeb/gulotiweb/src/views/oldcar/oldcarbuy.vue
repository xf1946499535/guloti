<template>
  <div class="oldcarbuy" v-loading="loading">
    <el-dialog
      title="请确认订单信息"
      :visible.sync="dialogFormVisible"
      v-if="$store.getters.getme"
    >
      <el-form :model="buycarform" size="mini">
        <el-form-item label="汽车名称" :label-width="formLabelWidth">
          {{ car.car_name }}/{{ car.car_brand }}
        </el-form-item>
        <el-form-item label="产地" :label-width="formLabelWidth">
          {{ car.car_manufacture_addr }}
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          {{ car.car_price_low }}w
        </el-form-item>
        <el-form-item label="下单日期" :label-width="formLabelWidth">
          {{ new Date() }}
        </el-form-item>
        <el-form-item label="卖家" :label-width="formLabelWidth">
          {{ car.user_name }}
        </el-form-item>
        <el-form-item label="购买人" :label-width="formLabelWidth">
          {{ $store.getters.getme.name }}
        </el-form-item>
        <el-form-item label="购买须知" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="car.car_introduce"
            :disabled="true"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="支付密码" :label-width="formLabelWidth">
          <el-input
            v-model="paypassword"
            show-password
            placeholder="请输入您的密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="buycarsubmit">确 认 支 付</el-button>
      </div>
    </el-dialog>
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
          <div class="price_title">卖家出价</div>
          <div class="price_info_up">{{ car.pricing }}万</div>
        </div>
        <div class="car_price">
          <div class="price_title">官方指导价</div>
          <div class="price_info_down">
            {{ car.car_price_low }}-{{ car.car_price_high }}万
          </div>
        </div>
        <div class="buycarBtn" @click="ask">询问卖家</div>
        <div class="buycarBtn" @click="buycarbtn()">购买此车</div>
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
import { addchatconnect } from "@/api/chat";
import socket from "@/utils/socket";
import { getcarinfo, buycar } from "@/api/cars";
import { getoldcar, buyoldcar } from "@/api/oldcar";
export default {
  created() {
    this.init();
  },
  data() {
    return {
      //汽车信息
      car: {},
      //汽车图片
      sliberimg: [],
      //dialog框开关
      dialogTableVisible: false,
      dialogFormVisible: false,
      buycarform: {},
      //支付密码
      paypassword: "",
      formLabelWidth: "120px",
      loading: false,
    };
  },
  methods: {
    init() {
      this.loading = true;
      getoldcar(this.$route.query.barn_id).then((res) => {
        this.car = res.data.data;
        this.sliberimg = res.data.data.car_exhibition_list.split("$");
        this.loading = false;
      });
    },
    buycarbtn() {
      if (!this.$store.getters.getme) {
        this.$notify.error({
          title: "无法购买",
          message: "请完成登录",
        });
      } else {
        this.dialogFormVisible = true;
      }
    },
    buycarsubmit() {
      this.loading = true;
      var buycarform = {
        barn_id: this.car.barn_id,
        userid: this.$store.getters.getme.id,
        order_type: 1,
        sell_id: this.car.userid,
        paypwd: this.paypassword,
      };
      buyoldcar(buycarform).then(
        (res) => {
          this.$message({
            message: "汽车成功入库",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.loading = false;
        },
        (err) => {
          // console.log(err);
          this.$notify.error({
            title: "无法购买",
            message: err.message,
          });
          this.dialogFormVisible = false;
          this.loading = false;
        }
      );
    },
    ask() {
      if (this.car.userid == this.$store.getters.getme.id) {
        this.$message.error("不能跟自己聊天");
        return;
      }
      socket.emit("sendmsg", {
        from_userid: this.$store.getters.getme.id,
        to_userid: this.car.userid,
        content: "你好",
      });
      this.$router.push({
        path: "/chatroom/chatuser",
        query: {
          touserid: this.car.userid,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.oldcarbuy {
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