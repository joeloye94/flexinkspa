<template>
  <div class="bbs__listing">
    <b-table show-empty responsive :items="items" :fields="fields" :current-page="currentPage" :per-page="0">
      <!-- A custom formatted data column cell -->
      <template #cell(title)="data">
        <!--/bbs/list/view/:id-->
        <!--{{ data.items[data.index].id }}-->
        <router-link :to="'/bbs/list/view/'+ data.items[data.index].id ">{{ data.value }}</router-link>
        <!--testing-->
      </template>
    </b-table>
    <b-pagination size="md" :total-rows="totalItems" v-model="currentPage" :per-page="perPage"></b-pagination>


  </div>
</template>

<script>
export default {
  name: 'BBSListingComponent',
  props:{
      
  },
  data(){
    return{
      items:[],
      fields:[{
        key: 'id',
        label: 'No'
      },
      {
        key: 'title',
        label: 'Title'
      },
      {
        key: 'views',
        label: 'Views'
      }],
      currentPage:1,
      perPage: 10,
      totalItems: 0,
      listing:{}
    }
  },
  components:{
      
  },
  mounted(){
    this.getBBSListing();
  },
  methods:{
    async getBBSListing(){
      await fetch("http://idc.flexink.com:9250/api/public/bbs/post?pageNumber="+this.currentPage)
        .then(response=>
          response.json()
        )
        .then(items=>{
          this.items = items.data;
          this.totalItems = parseInt(items.count)
        })
        .catch(error=>{
          console.error(error)
        })
    }
  },
  watch: {
    currentPage: {
      handler: function(value) {
        this.getBBSListing().catch(error => {
          console.error(error)
        })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
