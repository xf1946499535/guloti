<template>
  <div class="carstore">
    <div class="screen_box" v-loading="loading">
      <div class="screen_line">
        <div class="screen_line_up">
          <div class="line_title">{{ screenlist[0].title }}</div>
          <div
            class="line_content"
            v-for="(item, j) in screenlist[0].content"
            :class="{ choosed_item: item == screenlist[0].choosed }"
            :key="j + 'line_1_content'"
            @click="changebrandintial(item)"
          >
            {{ item }}
          </div>
        </div>
        <div class="screen_line_down" v-show="brandlist.length != 0">
          <div
            class="branditem"
            v-for="(brand, brandindex) in brandlist"
            :key="brandindex + 'brand'"
            :class="{ branditemchoosed: myscreen[0] == brand.brand_name }"
            @click="changebrand(brand)"
          >
            <img :src="brand.brand_logo" alt="" />
            {{ brand.brand_name }}
          </div>
        </div>
      </div>
      <div class="screen_line">
        <div class="screen_line_up">
          <div class="line_title">{{ screenlist[1].title }}</div>
          <div
            class="line_content"
            v-for="(item, j) in screenlist[1].content"
            :class="{ choosed_item: item == screenlist[1].choosed }"
            :key="j + 'line_2_content'"
          >
            <span v-if="item == 10" @click="pricescreen(-10000, 10)"
              >10万以下</span
            >
            <span v-else-if="item == '不限'" @click="pricescreen(-10000, 10000)"
              >不限</span
            >
            <span v-else-if="item == -500" @click="pricescreen(500, 10001)"
              >500万以上</span
            >
            <span
              v-else
              @click="pricescreen(screenlist[1].content[j - 1], item)"
              >{{ screenlist[1].content[j - 1] }}万-{{ item }}万</span
            >
          </div>
        </div>
      </div>
      <div class="screen_line">
        <div class="screen_line_up">
          <div class="line_title">{{ screenlist[2].title }}</div>
          <div
            class="line_content"
            v-for="(item, j) in screenlist[2].content"
            :class="{ choosed_item: item == screenlist[2].choosed }"
            :key="j + 'line_3_content'"
            @click="cartypescreen(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <div class="screenset">
      <div class="screenset_left searchbox">
        <!-- 此处留作条件筛选标签行 -->
        <input
          type="text"
          placeholder="请输入汽车名字"
          v-model="searchcontent"
          @input="getcarslike"
        />
      </div>
      <div class="screenset_right">
        <el-button size="small" type="primary" round @click="resetscreen"
          >重置</el-button
        >
      </div>
    </div>
    <!-- <div class="nowchoose">
      {{ myscreen[0] }}
      {{ myscreen[1] }}
      {{ myscreen[2] }}
      {{ myscreen[3] }}
    </div> -->
    <carswindow :carslist="cars"></carswindow>
  </div>
</template>

<script>
import { debounce } from "@/utils/tools";
import { getbrandlist, getcarslist } from "@/api/cars";
import carswindow from "./components/carswindow.vue";
export default {
  components: {
    carswindow,
  },
  created() {
    this.changebrandintial(this.screenlist[0].choosed);
    getcarslist(this.myscreen).then((res) => {
      this.cars = res.data.data;
    });
  },
  data() {
    return {
      loading: false,
      //预设筛选条件
      screenlist: [
        {
          title: "品牌",
          content: [
            "不限",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
          ],
          choosed: "不限",
        },
        {
          title: "价格",
          content: ["不限", 10, 50, 100, 200, 300, 400, 500, -500],
          choosed: "不限",
        },
        {
          title: "级别",
          content: ["不限", "轿车", "SUV", "MPV", "跑车"],
          choosed: "不限",
        },
      ],
      //品牌列表
      brandlist: [],
      //查询条件数组
      /*
      0：品牌名
      1：价格下限
      2:价格上限
      3:级别
       */
      myscreen: ["不限", -10000, 10000, "不限"],
      //查询到的车辆数组
      cars: [],
      // 车名模糊查询字符串
      searchcontent: "",
    };
  },
  methods: {
    //模糊查询获取车辆列表
    getcarslike: debounce(function () {
      this.searchcontent = this.searchcontent.trim();

      getcarslist(this.myscreen, this.searchcontent).then((res) => {
        this.cars = res.data.data;
      });
    }, 500),
    /*
    改变筛选条件
    当前只有改变车型使用到了此函数
    content:新的条件，默认为不限
    */
    cartypescreen(content) {
      this.loading = true;
      this.screenlist[2].choosed = content;
      this.myscreen[3] = content;
      getcarslist(this.myscreen, this.searchcontent).then((res) => {
        this.cars = res.data.data;
        this.loading = false;
      });
    },
    /*
    根据价格改变筛选 
    */
    pricescreen(low, high) {
      this.loading = true;
      this.myscreen[1] = low;
      this.myscreen[2] = high;
      this.screenlist[1].choosed = high == 10000 ? "不限" : high;
      this.screenlist[1].choosed =
        high == 10001 ? -500 : this.screenlist[1].choosed;
      getcarslist(this.myscreen, this.searchcontent).then((res) => {
        this.cars = res.data.data;
        this.loading = false;
      });
    },
    /*
    根据首字母获取品牌列表
    */
    changebrandintial(intial) {
      this.loading = true;
      getbrandlist(intial == "不限" ? -1 : intial)
        .then((res) => {
          this.brandlist = res.data.data;
          this.loading = false;
        })
        .then(() => {
          this.screenlist[0].choosed = intial;
        });
    },

    /*
    改变当前选中的品牌
     */
    changebrand(brand) {
      this.loading = true;
      this.$set(this.myscreen, 0, brand.brand_name);
      getcarslist(this.myscreen, this.searchcontent).then((res) => {
        this.cars = res.data.data;
        this.loading = false;
      });
    },

    /*
    重置筛选条件
    */
    resetscreen() {
      this.loading = true;
      this.myscreen = ["不限", -10000, 10000, "不限"];
      this.screenlist.forEach((item) => {
        item.choosed = "不限";
      });
      this.searchcontent = "";
      this.changebrandintial(this.screenlist[0].choosed);
      getcarslist(this.myscreen, this.searchcontent).then((res) => {
        this.cars = res.data.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss">
.carstore {
  .screen_box {
    width: 100%;
    background-color: #fff;
    margin: 5px auto;
    .screen_line {
      width: 100%;
      min-height: 50px;
      border-bottom: 1px solid rgb(107, 107, 107);
      padding: 20px 10px;
      .screen_line_up {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        font-size: 1rem;
        padding-left: 20px;
        .line_title {
          color: rgb(160, 160, 160);
        }
        .line_content {
          cursor: pointer;
          height: 40px;
          line-height: 40px;
          padding: 0px 10px;
          margin-left: 10px;
          border-radius: 3px;
        }
        .line_content > span {
          display: block;
          height: 40px;
        }
        .line_content:hover {
          background-color: rgb(142, 212, 233);
        }
        .choosed_item {
          background-color: rgb(31, 192, 241);
        }
      }
      .screen_line_down {
        width: 90%;
        margin: 5px auto;
        padding: 10px 5px;
        display: flex;
        flex-wrap: wrap;
        background-color: rgb(240, 240, 240);
        .branditem {
          height: 24px;
          cursor: pointer;
          line-height: 24px;
          font-size: 1.05rem;
          margin: 5px 10px;
          display: flex;
          img {
            width: 24px;
            height: 24px;
          }
        }
        .branditemchoosed {
          background-color: rgb(124, 212, 233);
        }
        .branditem:hover {
          background-color: rgb(114, 183, 247);
        }
      }
    }
  }
  .screenset {
    width: 100%;
    background-color: #fff;
    margin: 10px 0;
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    .screenset_left {
      width: 20%;
      display: flex;

      .screentag {
        margin-right: 10px;
      }
    }
    .searchbox {
      display: flex;
      input {
        width: 85%;
        height: 40px;
        line-height: 40px;
        border: 2px solid rgb(64, 158, 255);
        outline-color: rgb(64, 158, 255);
        padding-left: 5px;
      }
    }
    .screenset_right {
      width: 10rem;
    }
  }
}
</style>