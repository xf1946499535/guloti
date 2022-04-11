<template>
  <div class="newsform">
    <el-form
      :model="nowform"
      :rules="rules"
      ref="nowform"
      label-width="200px"
      class="demo-ruleForm"
    >
      <el-form-item label="新闻标题" label-width="100px" prop="news_title">
        <el-input v-model="nowform.news_title"></el-input>
      </el-form-item>
      <el-form-item
        label="新闻展示图"
        label-width="100px"
        prop="news_headimg_url"
      >
        <el-upload
          class="avatar-uploader"
          title="新闻展示图"
          action="http://localhost:8200/api/glt/users/uploadfile"
          :data="newstitle_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="nowform.news_headimg_url"
            :src="nowform.news_headimg_url"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="新闻类型"
        label-width="100px"
        prop="news_content_type"
      >
        <el-radio-group v-model="nowform.news_content_type">
          <el-radio label="text"></el-radio>
          <!-- <el-radio label="video"></el-radio> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文本内容" label-width="100px" prop="news_text">
        <!-- <el-input type="textarea" v-model="nowform.news_text"></el-input> -->
        <quill-editor
          v-model="nowform.news_text"
          ref="myQuillEditor"
          :options="editorOption"
          @focus="onEditorFocus($event)"
          @blur="onEditorBlur($event)"
          @change="onEditorChange($event)"
        >
        </quill-editor>
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
import { addnews, updatenews } from "@/api/car_news";
export default {
  props: ["nowform", "isedit"],
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
        news_title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        news_headimg_url: [
          { required: true, message: "请上传新闻简图", trigger: "blur" },
        ],
        news_content_type: [
          {
            required: true,
            message: "请选择新闻类型,当前只支持text类型",
            trigger: "change",
          },
        ],
        news_text: [
          { required: true, message: "请填写新闻内容", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    newstitle_upload: {
      get: function () {
        return {
          path: `news_headimg/${
            this.nowform.news_title + Math.floor(Math.random() * 100)
          }.jpg`,
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
      this.nowform.news_headimg_url = res.url;
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
      if (!this.nowform.news_title) {
        this.$message.error("新闻名字长度必须大于3才能上传图片");
      }
      return isJPG && isLt2M && this.nowform.news_title.length > 3;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addnews(this.nowform).then((res) => {
            this.$message("新增成功");
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
          updatenews(this.nowform)
            .then((res) => {
              this.$message.success("更新成功");
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