<template>
  
  <div class="bbs__listingitem" :items="items" v-if="loaded">
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
</template>

<script>

export default {
  name: 'BBSListItemViewComponent',
  props:["query-id"],
  data(){
    return{
      queryID:this.$props.queryId,
      loaded:false,
      items:[]
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
          console.log(items)
          this.items = items;
          this.loaded = true;
        })
        .catch(error=>{
          console.error(error)
          this.loaded = true;
        })
    },
    async downloadFile(file){
      console.log(file)
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
