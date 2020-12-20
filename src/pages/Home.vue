<template>
  <div>
    <el-container>
      <el-header style="height:80px">
        <Header></Header>
      </el-header>
      <el-main>
        <Main></Main>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {
    Header: () => import("@/components/Header.vue"),
    Main: () => import("@/components/Main.vue")
  },
  data() {
    return {
      msg: "",
      activeIndex2: 1
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>

<style lang='scss' scoped>
.el-header {
  background-color: #2b4b6b;
  color: #333;
  height: 80px;
}

.el-main {
  height: 100%;
    background-color: rgb(250,250,250);
}
</style>
