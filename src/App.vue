<template>
  <div id="app">
    <router-view name='login' v-if="$route.path=='/login'"></router-view>
    <Home v-else></Home>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Home: ()=>import('@/pages/Home.vue')
  }
};
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

#app{
  height: 100%;
}

.quill-editor{
  width:100%;
  height: 350px;
  margin-bottom: 50px;
}

</style>
