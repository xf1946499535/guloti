<template>
  <div class="ctnews">
    <div style="margin-bottom: 20px">
      <el-button
        type="primary"
        @click="addnews()"
        icon="el-icon-circle-plus-outline"
        >新增</el-button
      >
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="40%"
    >
      <carsform
        :nowform="nowform"
        :isedit="isedit"
        @datachange="init"
        @resetForm="resetForm"
      ></carsform>
    </el-drawer>
    <el-container>
      <el-table
        :data="
          carlist.filter(
            (data) =>
              !search ||
              data.car_name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column label="发布日期" prop="car_manufacture_date">
        </el-table-column>
        <el-table-column label="车名" prop="car_name"> </el-table-column>
        <el-table-column label="车型" prop="car_type"> </el-table-column>
        <el-table-column label="价格上限" prop="car_price_high">
        </el-table-column>
        <el-table-column label="价格上限" prop="car_price_low">
        </el-table-column>
        <el-table-column label="产地" prop="car_manufacture_addr">
        </el-table-column>

        <el-table-column align="right">
          <template slot="header" slot-scope>
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-footer>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination></div
      ></el-footer>
    </el-container>
  </div>
</template>

<script>
import { getcarslist, delcar } from "@/api/cars";
import carsform from "./components/carsform.vue";
export default {
  components: {
    carsform,
  },
  created() {
    this.init();
  },
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      drawer: false,
      direction: "ltr",
      //新闻列表
      newslist: [],
      search: "",
      //isedit 是否为编辑，否则为新增
      isedit: false,
      //查询条件数组
      /*
      0：品牌id
      1：价格下限
      2:价格上限
      3:级别
      4:车名模糊查询字符串
       */
      myscreen: [this.$store.getters.getme.companyid, -10000, 10000, "不限"],
      //查询到的车辆数组
      carlist: [],
      // nowform: {
      //   id: "",
      //   news_title: "",
      //   news_headimg_url: "",
      //   news_content_type: "",
      //   news_video_url: "",
      //   news_text: "",
      // },
      nowform: {
        id: "",
        car_name: "",
        car_brandid: this.$store.getters.getme.companyid,
        car_showimg: "",
        car_engine: "",
        car_at: "",
        car_manufacture_addr: "",
        car_manufacture_date: "",
        car_price_high: "",
        car_price_low: "",
        car_type: "",
        car_introduce: "",
      },
    };
  },
  methods: {
    init() {
      // getnewslist().then((res) => {
      //   this.newslist = res.data.data;
      // });
      getcarslist(this.myscreen).then((res) => {
        this.carlist = res.data.data;
        console.log(this.carlist);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleEdit(index, row) {
      // console.log(row);
      this.nowform = row;
      this.isedit = true;
      this.drawer = true;
    },
    handleDelete(index, row) {
      delcar(row.id).then((res) => {
        this.$message.success("操作成功");
        this.init();
      });
      // console.log(index, row);
    },
    handleClose(done) {
      done();
    },
    addnews() {
      this.isedit = false;
      this.drawer = true;
    },
    resetForm() {
      this.nowform = {
        id: "",
        car_name: "",
        car_brandid: this.$store.getters.getme.companyid,
        car_showimg: "",
        car_engine: "",
        car_manufacture_addr: "",
        car_manufacture_date: "",
        car_at: "",
        car_price_high: "",
        car_price_low: "",
        car_type: "",
        car_introduce: "",
      };
    },
  },
};
</script>

<style lang="scss">
.ctnews {
  height: 800px;
  .block {
    margin: 5px auto;
  }
}
</style>