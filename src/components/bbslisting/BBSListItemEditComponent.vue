<template>

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
            <b-form-input id="title" v-model="items.title"></b-form-input>
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
            ></b-form-textarea>
            
          </b-td>
          
        </b-tr>
        <b-tr>
          <b-th>Files</b-th>
          <!--
            
            EDIT INTERFACE
          
          -->
          <b-td v-if="isEdit">
            <div v-if="items.attachedFile.attachedFileInfos" v-for="file in items.attachedFile.attachedFileInfos">
              <p>
                {{getOriginalFilename(file)}} 
                <!--file.id ? file.filename : file.originalFilename-->
                <b-button v-if="file.id" variant="danger" @click="removeExistingFile(file)">x</b-button>
                <b-button v-if="file.originalFilename" variant="danger" @click="removeFile(file)">x</b-button>
              </p>
            </div>

            <!--file input-->
            <!--bootstrap vue file input not supported-->
            <b-button variant="info" @click="this.$refs.bbsFileinputEdit.click()" >Choose File</b-button>
            <!--currently, if user removed and upload the same file again, no file uploading will happen-->            
            <input ref="bbsFileinputEdit" type="file" id="bbsFileinputEdit" class="bbs__fileinput d-none" @change="uploadFile($event)"/>
          </b-td>


          <!--

            REGISTER INTERFACE

          -->
          <b-td v-if="!isEdit">
            <div v-if="items.attachedFile.attachedFileInfos" v-for="file in items.attachedFile.attachedFileInfos">
              <p>
                {{file.originalFilename}} 
                <b-button variant="danger" @click="removeFile(file)">x</b-button>
              </p>
            </div>

            <!--file input-->
            <!--bootstrap vue file input not supported-->
            <b-button variant="info" @click="this.$refs.bbsFileinput.click()" >Choose File</b-button>
            <!--currently, if user removed and upload the same file again, no file uploading will happen-->            
            <input ref="bbsFileinput" 
              type="file" 
              id="bbsFileinput" 
              class="bbs__fileinput d-none" 
              @change="uploadFile($event)"/>
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
      <b-button @click="removeItem()">
        Delete
      </b-button>
      <b-button @click="modifyItem()">
        Modify
      </b-button>
    </div>

    <div v-if="!isEdit">
      
      <b-button @click="addItem()">
        Save
      </b-button>
    </div>
  
  </div>
</template>

<script>
import axios from 'axios';
import {ref} from 'vue';

export default {
  name: 'BBSListItemEditComponent',
  props:["query-id"],
  data(){
    return{
      queryID:this.$props.queryId,
      loaded:false,
      items:{
        title: "",
        content: "",
        attachedFile: {
            attachedFileInfos: []
        }
      }

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
    getOriginalFilename(file){
      return file.id ? file.filename : file.originalFilename
    },
    //trigger click vanilla
    triggerFileinput(){
      document.querySelector('[data-fileInput]').click();
    },
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
          }else{
            alert("error getting id")
          }*/
          this.items = items;
          this.isError = false;          
          //this.loaded = true;
        })
        .catch(error=>{
          console.error(error)
          //this.loaded = true;
        })
    },
    
  /*https://dev.to/ljnce/use-axios-api-with-vue-cli-54i2
  
  file upload:
    POST - http://idc.flexink.com:9250/api/public/bbs/post/file/54/45/73
    DEL - http://idc.flexink.com:9250/api/public/bbs/post/file/49/40/64 

  listing item
    POST - http://idc.flexink.com:9250/api/public/bbs/post
    DEL - http://idc.flexink.com:9250/api/public/bbs/post/42
    */
    removeItem(){
      let confirmation = confirm("Do you want to delete post?");
      let comp = this;

      if(confirmation === true){
        axios.delete("http://idc.flexink.com:9250/api/public/bbs/post/" + this.$props.queryId, {
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then(function(response){
          //console.log(response.data);
          //why is "this" not defined???
          alert("successfully deleted post");
          comp.$router.push('/bbs/list')
        })
        .catch(function (error) {
          console.log(error); 
        });
      }
      
      
      
    },
    uploadFile(event){
      let comp = this;
      //console.log(event.target.files)
      if(event.target.files.length > 0){
        let formData = new FormData();
        formData.append('file', event.target.files[0]);
        axios.post("http://idc.flexink.com:9250/api/public/bbs/post/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
            //"Accept":'*/*'
          }
        })
        .then(function(response){

          //push one by one
          //console.log(response.data);
          comp.$data.items.attachedFile.attachedFileInfos.push(response.data[0])
          console.log(comp.$data)

          //refresh file input here
          //this.$refs.bbsFileinput.remove()
          
          
        })
        //file size limit apparently
        .catch(function (error) {
          console.log(error); 
        });
      }
    },
    removeFile(file){
      let comp = this;
      if(file){
        //http://idc.flexink.com:9250/api/public/bbs/post/file/20220413103126464-09a035ca-7686-4f93-a1b0-099666f3aa1d.png?lang=ko---

        let bbsFilename = file.filename;
        axios.delete("http://idc.flexink.com:9250/api/public/bbs/post/file/" + bbsFilename)
        .then(function(response){
          //console.log(response.data);
          let filteredFileInput = comp.$data.items.attachedFile.attachedFileInfos.filter( data =>{
            return data.filename != file.filename
          })
          comp.$data.items.attachedFile.attachedFileInfos = filteredFileInput;

          console.log(comp.$data)
        })
        .catch(function (error) {
          console.log(error); 
        });

      }
    },
    removeExistingFile(file){
      let comp = this;

      if(file){
        let postId = this.$data.items.id;
        let fileId = this.$data.items.attachedFile.id;
        let fileInfoId = file.id;

        //let bbsFilename = file.filename;

        axios.delete(`http://idc.flexink.com:9250/api/public/bbs/post/file/${postId}/${fileId}/${fileInfoId}`)
        .then(function(response){
          //console.log(response.data);
          let filteredFileInput = comp.$data.items.attachedFile.attachedFileInfos.filter( data =>{
            return data.id != file.id
          })
          comp.$data.items.attachedFile.attachedFileInfos = filteredFileInput;

          console.log(comp.$data)
        })
        .catch(function (error) {
          console.log(error); 
        });
      }
    },
    modifyItem(){
      let formData = this.$data.items;
      let comp = this;

      //JSON for updating the Post - Same with the registering. Just send new file infos.
      //remove existing files
      formData.attachedFile.attachedFileInfos = formData.attachedFile.attachedFileInfos.filter(data=>{
        //if has id, remove
        return !Object.keys(data).includes('id')
      })
      console.log(formData)

      axios.put("http://idc.flexink.com:9250/api/public/bbs/post/" + this.$props.queryId, formData, {
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then(function(response){
          console.log(response.data);
          alert("successfuly updated post")
          comp.$router.push('/bbs/list')
        })
        .catch(function (error) {
          console.log(error); 
        });

    },
    //register
    addItem(){
      let formData = this.$data.items;
      let comp = this;
      
      axios.post("http://idc.flexink.com:9250/api/public/bbs/post", formData, {
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then(function(response){
          console.log(response.data);
          alert("successfuly added post")
          comp.$router.push('/bbs/list')
        })
        .catch(function (error) {
          console.log(error); 
        });

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
