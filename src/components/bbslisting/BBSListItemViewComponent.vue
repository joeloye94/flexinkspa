<template>
  <div :items="items">
    <div class="bbs__listingitem" ><!--v-if="loaded"-->
      <b-table-simple responsive>
        
        <b-tbody>
          <b-tr >
            <b-th>Title</b-th>
            <b-td>{{ computeContent(items.title) }}</b-td>
            
          </b-tr>
          <b-tr>
            <b-th>Content</b-th>
            <b-td>{{ computeContent(items.content) }}</b-td>
            
          </b-tr>
          <b-tr>
            <b-th>Files</b-th>
            <b-td>
              <div v-if="items.attachedFile" v-for="file in items.attachedFile.attachedFileInfos">
                <b-link href="javascript:;" @click="downloadFile(file)">
                  {{file.filename}}
                </b-link>
              </div>
              <div v-if="!items.attachedFile">No files</div>
            </b-td>
            
          </b-tr>
        </b-tbody>
        
      </b-table-simple>

    </div>
    <div>
      <router-link to="/bbs/list">
        <b-button>
          Back
        </b-button>
      </router-link>
      <router-link :to="{
        path:'/bbs/list/view/modify/'+$route.params.id,
        /*name:'bbsListModify',
        params:{
          title:items.title,
          content:items.content,
          files:items.attachedFile
        }*/
      }">
        <b-button v-if="!isError">
          Modify
        </b-button>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BBSListItemViewComponent',
  props:["query-id"],
  data(){
    return{
      queryID:this.$props.queryId,
      loaded:false,
      items:[],
      isError:true,
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
    this.getBBSListingItem()
  },
  computed:{


  },
  methods:{
    computeContent(value){
      return value ? value : "-"
    },
    async getBBSListingItem(){
      //http://idc.flexink.com:9250/api/public/bbs/post/44
      await fetch("http://idc.flexink.com:9250/api/public/bbs/post/"+this.$props.queryId)
        .then(response=>
          response.json()
        )
        .then(items=>{
          /*if(items.code == "200"){
            this.items = items;
            this.isError = false;
            
          }else{
            alert("error getting id")
          }*/
          this.items = items;
          this.isError = false;
        })
        .catch(error=>{
          console.error(error)
        })
    },
    async downloadFile(file){
      
      let idOne = this.items.id;
      let idTwo = this.items.attachedFile.id;
      let idThree = file.id;

      //console.log(`http://idc.flexink.com:9250/api/public/bbs/post/file/${idOne}/${idTwo}/${idThree}`)
       
      const image = await fetch(`http://idc.flexink.com:9250/api/public/bbs/post/file/${idOne}/${idTwo}/${idThree}`);

      if(image.status == 200){
        const imageBlog = await image.blob();
        const imageURL = URL.createObjectURL(imageBlog);

        const anchor = document.createElement("a");
        anchor.href = imageURL;
        anchor.download = file.filename;

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

        URL.revokeObjectURL(imageURL);
      }else{
        alert("error cannot download file")
      }
      
      
      
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
