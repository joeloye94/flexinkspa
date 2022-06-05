<template>
  <div class="pagesidebar" id="PageSidebar">
      <nav>
        <CollapseItem 
          :menuList="menuList" />
      </nav>
  </div>
</template>

<script>
import CollapseItem from '../sidebar/CollapseItem.vue'

export default {
  name: 'PageSidebar',
  components:{
    CollapseItem
  },
  data(){
    return {
      menuList:''
    }
  },
  mounted(){
    this.buildListAsync()
  },
  methods:{
    buildListAsync(){
      fetch("http://idc.flexink.com:9250/api/public/menu/hierarchy")
        .then(response=>response.json())
        .then(data=>{
          this.appendMenu(data)
        })
        .catch(error=>{
          alert("code error")
        })
    },
    appendMenu(data){
      this.menuList = data;
      console.log(this.menuList)
    }
  }
}
</script>

<style lang="scss">
.pagesidebar{
  background:#ddd;
  height:100%;
}
@media(min-width:1024px){

}
</style>
