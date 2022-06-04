<template>
  <div class="pageFooter">
    <p class="pageFooter__content">
      {{ content }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  props:{
      content:String
  }
  
}
</script>

<style scoped>
.pageFooter{
  background:#eee;
  padding:10px 0;
}

</style>
