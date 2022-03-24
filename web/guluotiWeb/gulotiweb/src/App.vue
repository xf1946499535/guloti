<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { getUser } from "@/api/users";
import socket from "@/utils/socket";
import { getnoreadnum } from "@/api/chat";
export default {
  created() {
    let _this = this;
    this.setLoguser();
    socket.on("connect", function () {
      console.log("与服务器建立起socket连接");
    });
    //牛的
    socket.on("addnoread", function (res) {
      let nowlength = _this.$store.getters.getnoreadnum;
      _this.$store.commit("setnoreadnum", nowlength + res.affectedRows);
    });
    if (sessionStorage.getItem("myid")) {
      getnoreadnum().then((res) => {
        this.$store.commit("setnoreadnum", res.data.data);
      });
    }
  },
  beforeDestroy() {
    socket.emit("logout");
  },
  methods: {
    setLoguser() {
      if (sessionStorage.getItem("myid")) {
        getUser(sessionStorage.getItem("myid")).then((res) => {
          this.$store.commit("setme", res.data.data);
          console.log(this.$store.getters.getme);
          socket.emit("setsocket", sessionStorage.getItem("myid"));
        });
      }
    },
  },
};
</script>
<style lang="scss">
#app {
  font-size: 12px;
}
@media screen and (max-width: 1200px) {
  #app {
    font-size: 12px;
  }
}
@media screen and (max-width: 800px) {
  #app {
    font-size: 7px;
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.w {
  width: 100rem;
  margin: 0 auto;
}
#app {
  margin: 0 auto;
  padding: 0;
  min-width: 1200px;
}
li {
  list-style: none;
}
a {
  text-decoration-line: none;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

