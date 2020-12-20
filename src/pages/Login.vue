<template>
  <div class="login">
    <div class="login-box">
      <el-form status-icon label-width="100px" class="login-form">
        <el-form-item label="用户名:" prop="username">
          <el-input type="text" v-model="userinfo.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input type="password" v-model="userinfo.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      userinfo: {
        username: "",
        pwd: ""
      }
    };
  },
  methods: {
    login() {
      let data = {
        username: this.userinfo.username,
        password: this.userinfo.pwd
      };

      this.$http.loginapi.login(data).then(res => {
        localStorage.setItem("token", res.token);
        this.$router.replace("/home");
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.login {
  height: 100%;
  background-color: #2b4b6b;
  .login-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .login-form {
      margin-top: 60px;
      margin-right: 60px;
    }
  }
}
</style>
