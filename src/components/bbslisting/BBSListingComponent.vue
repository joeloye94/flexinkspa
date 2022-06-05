<template>
  <div class="bbs__listing">
    <b-table-simple hover small caption-top responsive>
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
    </b-table-simple>

    <b-pagination
      v-model="ex2CurrentPage"
      :total-rows="ex2Rows"
      :per-page="ex2PerPage"
      first-number
    ></b-pagination>

  </div>
</template>

<script>
import {ref} from 'vue'

const ex2CurrentPage = ref(4)
const ex2PerPage = ref(1)
const ex2Rows = ref(100)

export default {
  name: 'BBSListingComponent',
  props:{
      
  },
  components:{
    
  },
  data(){
    return{
      pageNumber:1,
      listing:{}
    }
  },
  components:{
      
  },
  mounted(){
      this.getBBSListing(this.pageNumber);
  },
  methods:{
    getBBSListing(pageNumber){
      console.log(pageNumber)
      fetch("http://idc.flexink.com:9250/api/public/bbs/post?pageNumber="+pageNumber)
        .then(response=>response.json())
        .then(data=>{
          this.pageNumber = pageNumber;
          this.listing = data;
        })
        .catch(error=>{
          alert("get BBS listing error")
        })
    }
  }
}
</script>

<style lang="scss">

</style>
