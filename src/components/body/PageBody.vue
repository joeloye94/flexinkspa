<template>
  <div class="pageBody">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-3">
          <PageSidebar />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-9">
          <div class="pageContent">
            <router-view/>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageSidebar from '../sidebar/PageSidebar.vue'

export default {
  name: 'PageBody',
  props:{
      
  },
  components:{
      PageSidebar
  },
  mounted(){
      this.reposBody()
  },
  methods:{
      reposBody(){
          //in case logo dynamic
          setTimeout(()=>{
            let headerHeight = document.querySelector("#pageHeader").clientHeight;
            //console.log(headerHeight);
            document.querySelector("#app").style.marginTop = headerHeight+"px";
          },10)
      }
  }
}
</script>

<style lang="scss">
.pageBody{
  background:#fff;
  min-height:100vh;

  .container-fluid{
    padding:0;

    .row{
      margin:0;

      div[class*="col-"]{
        padding:0;

      }
      @media(min-width:767px){
        .pageContent{
          min-height:100vh
        }

      }
      
    }
  }
  
}
</style>
