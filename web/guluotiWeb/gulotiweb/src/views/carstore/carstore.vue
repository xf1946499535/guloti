<template>
  <div class="carstore">
    <div class="screen_box">
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
            @click="screenchoose(1, item)"
          >
            <span v-if="item == 10">10万以下</span>
            <span v-else-if="item == '不限'">不限</span>
            <span v-else-if="item == -500">500万以上</span>
            <span v-else
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
            @click="screenchoose(2, item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="nowchoose">
      {{ myscreen[0] }}
      {{ myscreen[1] }}
      {{ myscreen[2] }}
    </div>
  </div>
</template>

<script>
import { getnewslist, getcarslist } from "@/api/cars";
export default {
  created() {
    this.changebrandintial(this.screenlist[0].choosed);
  },
  data() {
    return {
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
          choosed: ["不限"],
        },
        {
          title: "价格",
          content: ["不限", 10, 50, 100, 200, 300, 400, 500, -500],
          choosed: ["不限"],
        },
        {
          title: "级别",
          content: ["不限", "轿车", "SUV", "MPV", "跑车"],
          choosed: ["不限"],
        },
      ],
      //品牌列表
      brandlist: [],
      //查询条件数组
      /*
      0：品牌
      1：价格
      2:级别
       */
      myscreen: ["不限", "不限", "不限"],
      //查询到的车辆数组
      cars: [],
    };
  },
  methods: {
    /*
    改变筛选条件
    linenums:被改变的筛选条件行
    content:新的条件，默认为不限
    */
    screenchoose(linenums, content) {
      if (linenums != 0) {
        this.screenlist[linenums].choosed = content;
        this.myscreen[linenums] = content;
        getcarslist(this.myscreen);
      }
    },
    /*
    根据首字母获取品牌列表
    */
    changebrandintial(intial) {
      getnewslist(intial == "不限" ? -1 : intial)
        .then((res) => {
          this.brandlist = res.data.data;
        })
        .then(() => {
          this.screenchoose(0, intial);
        });
    },

    /*
    改变当前选中的品牌
     */
    changebrand(brand) {
      this.$set(this.myscreen, 0, brand.brand_name);
      getcarslist(this.myscreen).then((res) => {
        this.cars = res.data.data;
        console.log(this.cars);
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
}
</style>