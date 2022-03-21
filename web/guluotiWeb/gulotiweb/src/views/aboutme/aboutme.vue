<template>
  <div class="aboutme">
    <div class="aboutme_header">
      <div class="myheaderimg">
        <img :src="nowheadimg + `?t=${Math.random()}`" alt="" srcset="" />
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
    <div class="aboutme_form">
      <el-form ref="form" label-width="80px" size="mini">
        <el-form-item label="姓名">
          <el-input v-model="usernewinfo.name"></el-input>
        </el-form-item>
        <el-form-item label="余额">
          <el-input v-model="usernewinfo.balance" disabled></el-input>
        </el-form-item>
        <el-form-item label="公司">
          <el-select v-model="usernewinfo.companyid" placeholder="请选择">
            <el-option
              v-for="item in brandlist"
              :key="item.id + 'company'"
              :label="item.brand_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="submit"><el-button @click="submit" plain>保存</el-button></div>
    <input id="logout" type="button" value="注销账户" @click="logout" />
  </div>
</template>

<script>
import { editUsermessage, getUser } from "@/api/users";
import { getbrandlist } from "@/api/cars";

export default {
  created() {
    getUser(sessionStorage.getItem("myid")).then((res) => {
      this.usernewinfo = res.data.data;
    });
    getbrandlist(-1).then((res) => {
      this.brandlist = res.data.data;
      this.brandlist.push({
        brand_name: "普通用户",
        id: -1,
      });
    });
  },
  data() {
    return {
      imageUrl: "",
      data: { path: `headimg/${this.$store.getters.getme.id}.jpg` },
      nowheadimg: this.$store.getters.getme.headimg,
      usernewinfo: {
        name: "",
        balance: "",
        usertype: "",
        companyid: "",
      },
      brandlist: "",
      pwdcheck: "",
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
      // console.log(res);
      let data = {
        userid: this.$store.getters.getme.id,
        usernewinfo: {
          headimg: res.url,
        },
      };
      editUsermessage(data).then((res1) => {
        getUser(sessionStorage.getItem("myid")).then((res2) => {
          this.$store.commit("setme", res2.data.data);
          // this.nowheadimg = URL.createObjectURL(file.raw);
          this.nowheadimg = this.$store.getters.getme.headimg;
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
    submit() {
      let data = {
        userid: this.$store.getters.getme.id,
        usernewinfo: {
          name: this.usernewinfo.name,
          usertype: this.usernewinfo.companyid > 0 ? "normal" : "store",
          companyid: this.usernewinfo.companyid,
        },
      };
      editUsermessage(data).then((res1) => {
        getUser(sessionStorage.getItem("myid")).then((res2) => {
          this.$store.commit("setme", res2.data.data);
          this.$message("修改成功");
        });
      });
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
      height: 10rem;
      img {
        width: 100%;
        height: 100%;
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
    width: 10rem;
    height: 10rem;
    display: block;
  }
  .aboutme_form {
    width: 50%;
  }
  .submit {
    margin-top: 2rem;
  }
  #logout {
    margin-top: 2rem;
  }
}
</style>