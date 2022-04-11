<template>
  <div class="newsform">
    <el-form
      :model="nowform"
      :rules="rules"
      ref="nowform"
      label-width="200px"
      class="demo-ruleForm"
    >
      <el-form-item label="汽车名" label-width="100px" prop="car_name">
        <el-input v-model="nowform.car_name"></el-input>
      </el-form-item>
      <el-form-item label="展示图" label-width="100px" prop="car_showimg">
        <el-upload
          class="avatar-uploader"
          title="展示图"
          action="http://localhost:8200/api/glt/users/uploadfile"
          :data="car_name_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="nowform.car_showimg"
            :src="nowform.car_showimg + `?t=${Math.floor(Math.random() * 100)}`"
            class="avatar"
            alt
            srcset
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="车型" label-width="100px" prop="car_type">
        <el-radio-group v-model="nowform.car_type">
          <el-radio label="SUV"></el-radio>
          <el-radio label="MPV"></el-radio>
          <el-radio label="轿车"></el-radio>
          <el-radio label="跑车"></el-radio>
          <!-- <el-radio label="video"></el-radio> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发动机型号" label-width="100px" prop="car_engine">
        <el-input v-model="nowform.car_engine"></el-input>
      </el-form-item>
      <el-form-item label="变速箱型号" label-width="100px" prop="car_at">
        <el-input v-model="nowform.car_at"></el-input>
      </el-form-item>
      <el-form-item label="价格上限" label-width="100px" prop="car_price_high">
        <el-input v-model="nowform.car_price_high"></el-input>
      </el-form-item>
      <el-form-item label="价格下限" label-width="100px" prop="car_price_low">
        <el-input v-model="nowform.car_price_low"></el-input>
      </el-form-item>
      <el-form-item
        label="产地"
        label-width="100px"
        prop="car_manufacture_addr"
      >
        <el-input v-model="nowform.car_manufacture_addr"></el-input>
      </el-form-item>
      <el-form-item
        label="发布日期"
        label-width="100px"
        prop="car_manufacture_date"
      >
        <el-input v-model="nowform.car_manufacture_date" disabled></el-input>
      </el-form-item>
      <el-form-item label="介绍信息" label-width="100px" prop="car_introduce">
        <el-input type="textarea" v-model="nowform.car_introduce"></el-input>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button v-if="!isedit" type="primary" @click="submitForm('nowform')"
          >立即创建</el-button
        >
        <el-button v-if="isedit" type="primary" @click="saveform('nowform')"
          >保存</el-button
        >
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addcar, updatecar } from "@/api/cars";
export default {
  props: ["nowform", "isedit", "nowform2"],
  data() {
    return {
      imageUrl: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
          ],
        },
      },
      rules: {
        car_name: [
          { required: true, message: "请输入车名", trigger: "blur" },
          {
            // min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        car_showimg: [
          { required: true, message: "请上传新闻简图", trigger: "blur" },
        ],
        car_type: [
          {
            required: true,
            message: "请选择车型",
            trigger: "change",
          },
        ],
        car_at: [
          { required: true, message: "请填写变速箱型号", trigger: "blur" },
        ],
        car_engine: [
          { required: true, message: "请填写发动机型号", trigger: "blur" },
        ],
        car_price_high: [
          { required: true, message: "请填写价格上限", trigger: "blur" },
        ],
        car_price_low: [
          { required: true, message: "请填写价格下限", trigger: "blur" },
        ],
        car_introduce: [
          { required: true, message: "请填写汽车介绍信息", trigger: "blur" },
        ],
        car_manufacture_addr: [
          { required: true, message: "请填写汽车产地", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    car_name_upload: {
      get: function () {
        return {
          path: `cars_headimg/${this.nowform.car_name}.jpg`,
        };
      },
      //   set: function (val) {
      //     this.num = val;
      //     console.log("val", val);
      //   },
    },
  },
  methods: {
    handleAvatarSuccess(res, file) {
      //   this.imageUrl = URL.createObjectURL(file.raw);
      this.nowform.car_showimg = res.url;
      // console.log(this.imageUrl);
      // console.log(res.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      if (!this.nowform.car_name) {
        this.$message.error("汽车名字长度必须大于1才能上传图片");
      }
      return isJPG && isLt2M && this.nowform.car_name.length >= 2;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // addnews(this.nowform).then((res) => {
          //   this.$message("新增成功");
          //   this.$emit("datachange");
          // });
          addcar(this.nowform).then((res) => {
            this.$message.success("操作成功");
            this.$emit("datachange");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    saveform(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updatecar(this.nowform)
            .then((res) => {
              this.$message.success("更新成功");
              this.$emit("datachange");
            })
            .catch((err) => {
              this.$message.error("更新失败");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      // this.$refs[formName].resetFields();
      this.$emit("resetForm");
    },
    // 准备富文本编辑器
    onEditorReady(editor) {},
    // 富文本编辑器 失去焦点事件
    onEditorBlur(editor) {},
    // 富文本编辑器 获得焦点事件
    onEditorFocus(editor) {},
    // 富文本编辑器 内容改变事件
    onEditorChange(editor) {},
  },
};
</script>

<style lang="scss">
.newsform {
  width: 100%;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>