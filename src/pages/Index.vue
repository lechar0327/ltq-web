<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="editor-text">
      <Editor></Editor>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {
    Editor: () => import("@/components/Editor.vue")
  }
};
</script>

<style lang='scss' scoped>
.editor-text {
  width: 600px;
  height: 800px;
  margin: 0 auto;
}
</style>
