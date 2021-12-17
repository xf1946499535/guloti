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
            @click="screenchoose(0, item)"
          >
            {{ item }}
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
      {{ screenlist[0].choosed }}
      {{ screenlist[1].choosed }}
      {{ screenlist[2].choosed }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //筛选条件
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
    };
  },
  methods: {
    /*
    改变筛选条件
    linenums:被改变的筛选条件行
    content:新的条件，默认为不限
    */
    screenchoose(linenums, content) {
      this.screenlist[linenums].choosed = content;
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
    }
  }
}
</style>