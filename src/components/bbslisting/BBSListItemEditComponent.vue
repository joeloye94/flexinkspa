<template>
<!--
  file upload:
    POST - http://idc.flexink.com:9250/api/public/bbs/post/file/54/45/73
    DEL - http://idc.flexink.com:9250/api/public/bbs/post/file/49/40/64 

  listing item
    POST - http://idc.flexink.com:9250/api/public/bbs/post
    DEL - http://idc.flexink.com:9250/api/public/bbs/post/42
-->
  <div :items="items" >
  <div class="bbs__listingitem" ><!--v-if="loaded"-->
    <b-table-simple responsive>
      
      <b-tbody>
        <b-tr >
          <b-th>Title</b-th>
          <b-td>

            <b-form-group
            id="titleFormGroup"
            label-for="title"
            >
            <b-form-input id="title" v-model="items.title" @input="testLog()"></b-form-input>
            </b-form-group>
          </b-td>
          
        </b-tr>
        <b-tr>
          <b-th>Content</b-th>
          <b-td>
            <b-form-textarea
              id="textarea"
              v-model="items.content"
              rows="3"
              max-rows="6"
              @input="testLog()"
            ></b-form-textarea>
            
          </b-td>
          
        </b-tr>
        <b-tr>
          <b-th>Files</b-th>
          <b-td>
            <div v-if="items.attachedFile" v-for="file in items.attachedFile.attachedFileInfos">
              <p>
                {{file.filename}} 
                <b-button variant="danger" @click="removeFile(file)">x</b-button>
              </p>
            </div>
            <div v-if="!items.attachedFile">No files</div>

            <!--file input-->
          </b-td>
          
        </b-tr>
      </b-tbody>
      
    </b-table-simple>

  </div>
    <div v-if="isEdit">
      <router-link to="/bbs/list">
        <b-button>
          List
        </b-button>
      </router-link>
      <b-button @click="removeItem(items)">
        Delete
      </b-button>
      <b-button @click="modifyItem(items)">
        Modify
      </b-button>
    </div>

    <div v-if="!isEdit">
      
      <b-button>
        Save
      </b-button>
    </div>
  
  </div>
</template>

<script>

export default {
  name: 'BBSListItemEditComponent',
  props:["query-id"],
  data(){
    return{
      queryID:this.$props.queryId,
      loaded:false,
      items:{}
      /*items:{
        "id": 35,
        "title": "웹 제목",
        "content": "웹 내용",
        "views": 35,
        "attachedFile": {
            "id": 24,
            "attachedFileInfos": [
                {
                    "id": 37,
                    "size": null,
                    "downloadCount": 37,
                    "filename": "파일1.org"
                },
                {
                    "id": 38,
                    "size": null,
                    "downloadCount": 38,
                    "filename": "파일2.org"
                }
            ]
        }
      }*/
    }
  },
  components:{
      
  },
  mounted(){
    if(this.isEdit){
      this.getBBSListingItem()
    }
    //else{
      //this.loaded = true;
    //}
    
  },
  computed:{
    isEdit(){
      return this.$route.fullPath.indexOf("modify") > -1
    }

  },
  methods:{
    computeContent(value){
      return value ? value : "-"
    },
    testLog(){
      console.log(this.$data.items)
    },
    async getBBSListingItem(){
      //http://idc.flexink.com:9250/api/public/bbs/post/44
      await fetch("http://idc.flexink.com:9250/api/public/bbs/post/"+this.$props.queryId)
        .then(response=>
          response.json()
        )
        .then(items=>{
          this.items = items;
          //this.loaded = true;
        })
        .catch(error=>{
          console.error(error)
          //this.loaded = true;
        })
    },
    removeItem(items){
      
    },
    removeFile(file){
      
    },
    modifyItem(item){

    }
  },
  watch: {
    
  }
}
</script>

<style lang="scss">
.bbs__listingitem{
  @media(max-width:767px){
    th{
      
    }
  }
  th{
    width: 20%
  }
}
</style>
