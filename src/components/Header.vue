<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="logo" />
    </div>
    <el-menu
      mode="horizontal"
      @select="handleSelect"
      background-color="#2b4b6b"
      active-text-color="#ffd04b"
      text-color="#fff"
    >

      <el-submenu v-for="item in navs" :key="item.id" :index="item.id+''">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
          <el-menu-item
            v-for="child in item.children"
            :key="child.id"
            :index="item.id+'-'+child.id"
          >
            <template>
              <i :class="child.icon"></i>
              <router-link :to="child.path" tag="span" v-text="child.title"></router-link>
            </template>
          </el-menu-item>
      </el-submenu>
    </el-menu>
    <div>
      <el-dropdown placement="bottom">
        <!-- <i class="el-icon-s-custom el-icon"></i> -->
        <span class="el-dropdown-link">
          刘侨
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import navs from "@/utils/api/navs";

export default {
  name: "",
  data: function() {
    return {
      navs
    };
  },
  mounted() {

  },
  methods: {
    handleSelect() {}
  }
};
</script>

<style lang='scss' scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80px;
  line-height: 80px;
  .logo {
    margin-top: 20px;
    margin-left: 50px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .el-menu {
    margin-left: 80px;
    background-color: #2b4b6b;
    display: flex;
    flex: 1;
    border-bottom: 0;
  }

  .el-dropdown-link {
    color: #fff;
  }

  .el-icon {
    font-size: 40px;
    background-color: darkgreen;
  }
}
</style>
