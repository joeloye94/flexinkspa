<template>
  <div class="">
    <h1>BBS View</h1>

    <BBSListingComponent />
  </div>
</template>


<script>
import BBSListingComponent from '../components/bbslisting/BBSListingComponent.vue'

export default {
  name: 'BBSListingView',
  props:{
      
  },
  components:{
      BBSListingComponent
  },
  mounted(){
      
  },
  methods:{
  }
}
</script>