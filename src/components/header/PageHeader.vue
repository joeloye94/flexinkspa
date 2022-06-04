<template>
  <div id="pageHeader" class="pageHeader">
    <div class="pageHeader__logo">
      <router-link to="/">
        <img src="../../assets/logo.png">
        <!--return to homepage-->
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    path: String
  }
}
</script>

<style scoped>
.pageHeader{
  background:#eee;
  padding:10px 0;
  position:fixed;
  top:0;
  width:100%;
}
.pageHeader__logo {
  width:70px;
  margin:auto
}
.pageHeader__logo img{
  width:100%;
}
</style>
