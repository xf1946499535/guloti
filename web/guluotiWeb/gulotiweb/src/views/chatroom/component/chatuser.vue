<template>
  <div class="chatuser" v-if="touserid" v-loading="loading">
    <div class="tousermsg">
      {{ touser.name }}
    </div>
    <div class="chatbox" ref="chatbox">
      <div v-for="(item, index) in chatlist" :key="index + 'chatlist'">
        {{ item }}
      </div>
    </div>
    <div class="inputbox">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入内容"
        resize="none"
        v-model="myinput"
      >
      </el-input>
      <el-button @click="sendmsg">发送</el-button>
    </div>
  </div>
  <div v-else>请选择用户</div>
</template>

<script>
import socket from "@/utils/socket";
import { getUser } from "@/api/users";
import { getchatmsglist } from "@/api/chat";
export default {
  created() {
    this.init();
    socket.on("getmsg", (res) => {
      // this.chatlist.push(res);
      console.log(res);
      this.$set(this.chatlist, this.chatlist.length, res);
    });
  },
  data() {
    return {
      loading: false,
      touserid: this.$route.query.touserid,
      chatlist: [],
      touser: {},
      //当前输入的内容
      myinput: "",
    };
  },
  methods: {
    //保持滚动条在底部
    scrollbottom() {
      let chatbox = this.$refs.chatbox;
      chatbox.scrollTop = chatbox.scrollHeight;
    },
    init() {
      getUser(this.touserid).then((res) => {
        this.touser = res.data.data;
      });
      getchatmsglist({
        userid: this.$store.getters.getme.id,
        touserid: this.touserid,
      }).then((res) => {
        this.chatlist = res.data.data;
        this.loading = false;
        this.scrollbottom();
      });
    },
    //发送消息
    sendmsg() {
      let data = {
        from_userid: this.$store.getters.getme.id,
        to_userid: this.touserid,
        content: this.myinput,
      };
      socket.emit("sendmsg", data);
      this.$set(this.chatlist, this.chatlist.length, data);
    },
  },
  watch: {
    $route(to, from) {
      // console.log(this.$route.query.touserid);
      this.loading = true;
      this.touserid = this.$route.query.touserid;
      this.init();
    },
  },
};
</script>

<style lang="scss">
.chatuser {
  width: 100%;
  display: flex;
  flex-direction: column;
  .tousermsg {
    width: 100%;
    height: 2rem;
  }
  .chatbox {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    flex: 1;
    min-height: 32rem;
    height: 32rem;
    max-height: 32rem;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .chatbox::-webkit-scrollbar {
    display: none;
  }
  .inputbox {
    width: 100%;
    height: 2rem;
    display: flex;
  }
}
</style>