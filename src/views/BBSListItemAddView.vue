<template>
  <div class="">
    <h1>BBS Register/View</h1>

    <!--this will be the form page-->
    <!--route item data gone after refresh-->
    <!--{{$route.params}}-->
    <BBSListItemEditComponent :query-id=" $route.params.id " />

  </div>
    
</template>
<script>
import BBSListItemEditComponent from '../components/bbslisting/BBSListItemEditComponent.vue'


export default {
  name: 'BBSListItemEditView',
  props:{
      
  },
  data(){
    return{
      
    }
  },
  components:{
      BBSListItemEditComponent
  },
  mounted(){
    
  },
  computed:{
    
  },
  methods:{
    
    
  },
  watch: {
  }
}
</script>

<style lang="scss">

</style>
