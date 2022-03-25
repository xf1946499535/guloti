<template>
  <div class="chatroom">
    <div class="chatroom_l">
      <router-view></router-view>
    </div>
    <div class="chatroom_r">
      <userlist :chatusers="chatusers" :chooseuser="chooseuser"></userlist>
    </div>
  </div>
</template>

<script>
import { getchatconnectlist } from "@/api/chat";
import userlist from "./component/userlist.vue";
export default {
  components: {
    userlist,
  },
  created() {
    this.init();
  },
  data() {
    return {
      chatusers: [],
      //当前聊天对象
      touser: {},
    };
  },
  methods: {
    init() {
      getchatconnectlist({
        userid: this.$store.getters.getme.id,
      }).then((res) => {
        this.chatusers = res.data.data;
      });
    },
    //选择跟谁聊天
    chooseuser(user) {
      this.$router.push({
        path: "/chatroom/chatuser",
        query: {
          touserid: user.userid,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.chatroom {
  width: 100%;
  height: 700px;
  display: flex;
  overflow-y: hidden;
  overflow-x: hidden;

  .chatroom_l {
    width: 70%;
  }
  .chatroom_r {
    width: 30%;
  }
}
</style>