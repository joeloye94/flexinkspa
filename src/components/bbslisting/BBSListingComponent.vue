<!--<template>
  <div class="bbs__listing">
    <b-table show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="0"></b-table>
    <b-pagination size="md" :total-rows="totalItems" v-model="currentPage" :per-page="perPage"></b-pagination>
  </div>
</template>

<script>
export default {
  name: 'BBSListingComponent',
  props:{
      
  },
  components:{
    
  },
  data(){
    return{
      items: [],
      fields: [{
          key: 'postId',
          label: 'Post ID'
        },
        {
          key: 'id',
          label: 'ID'
        },
        {
          key: 'name',
          label: 'Name'
        },
        {
          key: 'email',
          label: 'Email'
        },
        {
          key: 'body',
          label: 'Body'
        }
      ],
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
      listing:{}
    }
  },
  components:{
      
  },
  mounted() {
    this.fetchData().catch(error => {
      console.error(error)
    })
  },
  methods: {
    async fetchData() {
      this.items = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${this.currentPage}&_limit=${this.perPage}`)
        .then(res => {
          this.totalItems = parseInt(res.headers.get('x-total-count'), 10)

          return res.json()
        })
        .then(items => items)
    }
  },
  watch: {
    currentPage: {
      handler: function(value) {
        this.fetchData().catch(error => {
          console.error(error)
        })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
-->
<template>
  <div class="bbs__listing">
    <!--<b-table-simple hover small caption-top responsive
      :items="items" 
      :fields="fields"
      :current-page="currentPage"
      :per-page="0">
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>No.</b-th>
            <b-th>Title</b-th>
            <b-th>Views</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="item in listing.data">
            <b-td>{{item.id}}</b-td>
            <b-td>{{item.title}}</b-td>
            <b-td>{{item.views}}</b-td>
          </b-tr>
        </b-tbody>
    </b-table-simple>-->
    <b-table show-empty responsive :items="items" :fields="fields" :current-page="currentPage" :per-page="0">
      <!-- A custom formatted data column cell -->
      <template #cell(title)="data">
        <!--/bbs/list/view/:id-->
        <!--{{ data.items[data.index].id }}-->
        <router-link :to="'/bbs/list/view/'+ data.items[data.index].id ">{{ data.value }}</router-link>
        
      </template>
    </b-table>
    <b-pagination size="md" :total-rows="totalItems" v-model="currentPage" :per-page="perPage"></b-pagination>

    <!--<b-pagination
      v-model="ex2CurrentPage"
      :total-rows="ex2Rows"
      :per-page="ex2PerPage"
      first-number
    ></b-pagination>-->

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
    //this.getBBSListing(this.currentPage);
    this.getBBSListing();
  },
  methods:{
    //async getBBSListing(currentPage){
    async getBBSListing(){
      await fetch("http://idc.flexink.com:9250/api/public/bbs/post?pageNumber="+this.currentPage)
        .then(response=>
          response.json()
        )
        .then(items=>{
          /*let editItems = items.data.forEach((i)=>{
            console.log(i)
            i.title = `<a href="https://www.google.com">${i.title}</a>`
          })*/
          console.log(this.$data)
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
