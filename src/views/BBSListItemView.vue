<template>
  <div class="">
    <h1>BBS View</h1>

    <!--this will be the id view page-->
    <BBSListItemViewComponent :query-id=" $route.params.id " />
    
    
  </div>
</template>

<script>
import BBSListItemViewComponent from '../components/bbslisting/BBSListItemViewComponent.vue'


export default {
  name: 'BBSListItemView',
  props:{
      
  },
  data(){
    return{
      
    }
  },
  components:{
      BBSListItemViewComponent
  },
  mounted(){
    //this.getBBSListingItem()
  },
  methods:{
    /*async getBBSListingItem(){
      //http://idc.flexink.com:9250/api/public/bbs/post/44
      await fetch("http://idc.flexink.com:9250/api/public/bbs/post/"+this.$route.params.id)
        .then(response=>
          response.json()
        )
        .then(items=>{

        })
        .catch(error=>{
          console.error(error)
        })
    }*/
    
  },
  watch: {
  }
}
</script>

<style lang="scss">

</style>
