<template>

  <div v-for="(item,index) in menuList" >  
    <!--single url--> 
    <router-link v-if="item.subMenus.length == 0" :to="item.url">{{subitems.menuName}}>
      {{item.menuName}}
    </router-link>
    <!--single url--> 


    <!--collapsible--> 
    <p v-b-toggle="'collapse-'+index" v-if="item.subMenus.length > 0">
      {{item.menuName}}
    </p>
    <b-collapse :id="'collapse-'+index" class="mt-2" v-if="item.subMenus.length > 0">
      <div v-for="(subitems, _index) in item.subMenus" >
        <router-link v-if="subitems.subMenus.length == 0" :to="subitems.url">{{subitems.menuName}}</router-link>

        <p v-if="subitems.subMenus.length > 0" v-b-toggle="'collapse-'+index+_index">
          {{subitems.menuName}}
        </p>
        <b-collapse v-if="subitems.subMenus.length > 0" :id="'collapse-'+index+_index" class="mt-2" >
          test more submenus
        </b-collapse>
      </div>
    </b-collapse>
    <!--collapsible--> 
  </div>

</template>

<script>

export default {
  name: 'CollapseItem',
  data(){
    return {
      
    }
  },
  props:{
    menuList:Array
  },
  mounted(){
    
  },
  methods:{
  }
}
</script>

<style lang="scss">

</style>
