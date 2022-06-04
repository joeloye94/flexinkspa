<template>
  <PageHeader />
  <PageBody />
  <PageFooter />
</template>
<!--https://www.digitalocean.com/community/tutorials/how-to-generate-a-vue-js-single-page-app-with-vue-create-->

<script>
import PageHeader from './components/header/PageHeader.vue'
import PageBody from './components/body/PageBody.vue'
import PageFooter from './components/footer/PageFooter.vue'


export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter,
    PageBody
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin:0px
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
