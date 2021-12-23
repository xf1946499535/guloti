<template>
  <div class="aboutme">
    <input type="button" value="注销账户" @click="logout" />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      sessionStorage.setItem("myid", null);
      this.$store.commit("setme", null);
      this.$message({
        message: "注销成功",
        type: "success",
      });
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>