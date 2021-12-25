<template>
  <div class="home">
    <el-container>
      <el-header
        ><div class="header">
          <div class="h_item logo" title="返回首页" @click="routeto('/')">
            <img
              src="http://47.108.230.246:8080/guloti/GulotiResource/Guloti_Logo.png"
              alt=""
            />
          </div>
          <div class="h_item searchbox">
            <input type="text" placeholder="大众" />
            <div class="searchbtn">搜索</div>
          </div>
          <div class="h_item welcome" v-if="$store.getters.getme">
            {{ $store.getters.getme.name }},欢迎你!
          </div>
          <div class="h_item loginbox" v-else>
            <div class="login_btn" @click="routeto('/login')">登录</div>
            <div class="register_btn" @click="routeto('/register')">注册</div>
          </div>
        </div></el-header
      >
      <el-container>
        <el-aside width="120px">
          <el-row class="tac" width="120px">
            <el-col :span="24">
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="rgb(247, 248, 252)"
              >
                <el-menu-item
                  v-for="(item, index) in asidelist"
                  :key="index + 'asidelist'"
                  :index="item.index"
                  @click="routeto(item.path)"
                >
                  <i :class="item.classicon"></i>
                  <span slot="title">{{ item.title }}</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <div class="main_page">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      asidelist: [
        {
          index: "1",
          classicon: "el-icon-menu",
          title: "首页",
          path: "/dashboard",
        },
        {
          index: "2",
          classicon: "el-icon-discount",
          title: "选车",
          path: "/carstore",
        },
        {
          index: "3",
          classicon: "el-icon-price-tag",
          title: "二手车",
        },
        {
          index: "4",
          classicon: "el-icon-s-help",
          title: "车友圈",
        },
        {
          index: "5",
          classicon: "el-icon-video-camera-solid",
          title: "直播",
        },
        {
          index: "6",
          classicon: "el-icon-s-tools",
          title: "工具",
        },
        {
          index: "7",
          classicon: "el-icon-s-data",
          title: "排行榜",
        },
        {
          index: "8",
          classicon: "el-icon-picture",
          title: "车图",
        },
        {
          index: "9",
          classicon: "el-icon-s-home",
          title: "车库",
          path: "/barn",
        },
        {
          index: "10",
          classicon: "el-icon-user-solid",
          title: "我的",
          path: "/aboutme",
        },
        {
          index: "11",
          classicon: "el-icon-edit",
          title: "反馈",
        },
      ],
      //搜索内容
      serachcontent: "",
    };
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    routeto(path, param) {
      this.$router.push(path);
    },
  },
};
</script>
<style lang="scss">
.home {
  background-color: rgb(247, 248, 252);
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-header {
    background-color: #fff;
  }
  .header {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 60px;
    display: flex;
    background-color: #fff;
    .h_item {
      position: relative;
      width: 33%;
      height: 40px;
      margin: auto 0;
    }
    .welcome {
      font-size: 1.2rem;
      text-align: center;
      line-height: 40px;
    }
    .logo {
      cursor: pointer;
      left: 50px;
      img {
        height: 40px;
        width: 120px;
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
      input:focus {
        border: none;
        box-shadow: 0 0 0 1px #42a7ff;
      }
      .searchbtn {
        width: 15%;
        text-align: center;
        font-size: 1rem;
        cursor: pointer;
        color: #fff;
        height: 40px;
        line-height: 40px;
        background-color: rgb(64, 158, 255);
      }
    }
    .loginbox {
      position: relative;
      display: flex;
      justify-content: flex-end;
      .login_btn,
      .register_btn {
        width: 15%;
        border-radius: 5px;
        text-align: center;
        font-size: 1rem;
        cursor: pointer;
        margin: auto 10px;
        color: #fff;
        height: 40px;
        line-height: 40px;
        background-color: rgb(64, 158, 255);
      }
      .register_btn {
        background-color: rgb(223, 223, 223);
        color: rgb(64, 158, 255);
        text-decoration-line: underline;
      }
    }
  }
  .tac {
    position: fixed;
    z-index: 100;
  }
}
</style>