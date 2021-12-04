<template>
  <div class="home">
    <el-container>
      <el-header
        ><div class="header">
          <div class="h_item logo" title="返回首页">
            <img
              src="http://47.108.230.246:8080/guloti/GulotiResource/Guloti_Logo.png"
              alt=""
            />
          </div>
          <div class="h_item searchbox">
            <input type="text" placeholder="大众" />
            <div class="searchbtn">搜索</div>
          </div>
          <div class="h_item loginbox">
            <div class="login_btn">登录</div>
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
                >
                  <i :class="item.classicon"></i>
                  <span slot="title">{{ item.title }}</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
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
        },
        {
          index: "2",
          classicon: "el-icon-discount",
          title: "选车",
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
          classicon: "el-icon-video-play",
          title: "视频",
        },
        {
          index: "10",
          classicon: "el-icon-user-solid",
          title: "我的",
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="scss">
.home {
  background-color: rgb(247, 248, 252);
  .el-header {
    background-color: #fff;
  }
  .header {
    position: relative;
    width: 100%;
    height: 60px;
    display: flex;
    .h_item {
      position: relative;
      width: 33%;
      height: 40px;
      margin: auto 0;
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
      .login_btn {
        position: absolute;
        right: 20px;
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
  }
}
</style>