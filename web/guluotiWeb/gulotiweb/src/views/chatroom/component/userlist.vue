<template>
  <div class="userlist" ref="userlist">
    <div class="users">
      <div
        class="useritem"
        v-for="(item, index) in chatusers"
        :key="index"
        @click="chooseuser(item)"
      >
        <div
          class="left"
          :class="{
            online: item.isonline == 1,
          }"
        >
          <img :src="item.headimg" />
        </div>
        <div class="right">
          <span class="name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["chatusers", "unreadlist", "chooseuser"],
  data() {
    return {};
  },
  mounted() {},
  beforeMount() {},

  methods: {},
  computed: {},
};
</script>

<style  lang="scss">
a {
  text-decoration: none;
}
.userlist {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  /* 头像默认为没登录的灰色 */
  .headerimg {
    height: 4rem;
    width: 4%;
    filter: grayscale(1);
    margin: 0 10px;
    /* background-color: #fff; */
  }
  .headerimg img {
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
  }
  .online {
    /* 提高权重，因为online权重没有原本的类的权重高，filter无法覆盖 */
    filter: grayscale(0) !important;
  }

  .users {
    position: relative;
    width: 100%;
    min-width: 20rem;
    min-height: 80vh;
    overflow-y: hidden;
    overflow: scroll;
  }
  .users::-webkit-scrollbar {
    width: 0 !important;
  }
  .useritem {
    position: relative;
    width: 100%;
    height: 10vh;
    min-height: 5rem;
    border-bottom: solid 1px #ffffff;
    transition: 0.5s;
  }
  .useritem:hover {
    background-color: rgba(135, 206, 235, 0.5);
  }
  .left {
    position: absolute;
    height: 10vh;
    width: 50px;
    left: 5px;
    filter: grayscale(1);
  }
  .redpoint {
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    bottom: 10px;
    left: 50px;
    background-color: red;
    z-index: 10;
  }
  .left img {
    position: absolute;
    top: 10px;
    left: 10px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }

  .right {
    position: absolute;
    height: 10vh;
    left: 80px;
    top: 10px;
  }
  .right span {
    display: block;
  }

  .right .name {
    font-weight: 500;
    font-size: 15px;
  }
  .right .myword {
    margin-top: 10px;
    font-size: 10px;
    color: darkgray;
  }
}
</style>