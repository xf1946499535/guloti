<template>
  <div class="register">
    <div class="main_box">
      <div class="loginbox">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="account" required>
            <el-input v-model.number="ruleForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" required>
            <el-input
              type="password"
              v-model="ruleForm.pwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpwd" required>
            <el-input
              type="password"
              v-model="ruleForm.checkpwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name" required>
            <el-input v-model.number="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>
        <div class="submit_b" @click="registersubmit('ruleForm')">
          <span style="margin-right: 20px; display: inline-block">注</span
          ><span>册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/loginAPI";
import { setssoLocal } from "@/utils/sso";

export default {
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      callback();
    };
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("名字不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pwd: "",
        checkpwd: "",
        account: "",
        name: "",
      },
      rules: {
        pwd: [{ validator: validatePass, trigger: "blur" }],
        account: [{ validator: checkAccount, trigger: "blur" }],
        checkpwd: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
      },
    };
  },
  methods: {
    registersubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var query = {
            admin_name: this.ruleForm.account,
            admin_password: this.ruleForm.pwd,
          };
          login(query)
            .then((res) => {
              // localStorage.setItem("token", res.data.token);
              // setssoLocal(res.data.token);
              // sessionStorage.setItem("me", JSON.stringify(res.data.data));
              // this.$router.push("/");
            })
            .catch((err) => {
              this.$notify.error({
                title: "登陆失败",
                message: "请检查用户名和密码是否正确",
              });
              console.log("error submit!!");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    routeto(path, prarams) {
      this.$router.push(path);
    },
  },
};
</script>
<style lang="scss">
@import "@/styles/un_color.scss";
.register {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 500px;
  .main_box {
    position: absolute;
    width: 700px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    .loginbox {
      width: 40rem;
      height: 40rem;
      font-size: 2rem;
    }
  }
  .title {
    color: $font;
    font-size: 5rem;
    cursor: pointer;
    width: 100%;
    text-align: center;
    margin: 2rem 0;
  }
  .submit_b {
    height: 2.5rem;
    line-height: 2.5rem;
    color: #fff;
    background-color: #0f6edb;
    margin: 0 auto;
    width: 60%;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
  }
  .submit_b:hover {
    background-color: #3180da;
  }
}
</style>