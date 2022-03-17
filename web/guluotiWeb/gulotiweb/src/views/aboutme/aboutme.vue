<template>
  <div class="aboutme">
    <div class="aboutme_header">
      <div class="myheaderimg">
        <img :src="nowheadimg" alt="" srcset="" />
      </div>
      <el-upload
        class="avatar-uploader"
        title="修改头像"
        action="http://localhost:8200/api/glt/users/uploadfile"
        :data="data"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <input id="logout" type="button" value="注销账户" @click="logout" />
  </div>
</template>

<script>
import { editUsermessage, getUser } from "@/api/users";

export default {
  data() {
    return {
      imageUrl: "",
      data: { path: `headimg/${this.$store.getters.getme.id}.jpg` },
      nowheadimg: this.$store.getters.getme.headimg,
    };
  },
  methods: {
    logout() {
      //清除会话
      sessionStorage.removeItem("myid");
      this.$store.commit("setme", null);
      this.$message({
        message: "注销成功",
        type: "success",
      });
      this.$router.push("/");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      let data = {
        userid: this.$store.getters.getme.id,
        usernewinfo: {
          headimg: res.url,
        },
      };
      editUsermessage(data).then((res1) => {
        getUser(sessionStorage.getItem("myid")).then((res2) => {
          this.$store.commit("setme", res2.data.data[0]);
          this.nowheadimg = URL.createObjectURL(file.raw);
          this.imageUrl = "";
        });
      });
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
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss">
.aboutme {
  height: 800px;
  .aboutme_header {
    width: 100%;
    display: flex;
    .myheaderimg {
      width: 10rem;
      img {
        width: 100%;
      }
    }
  }
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
    width: 10rem;
    height: 10rem;
    line-height: 10rem;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>