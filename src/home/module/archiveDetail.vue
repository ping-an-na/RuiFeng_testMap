<template>
  <div style=''>
    <div>
      <div class='titleText'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for='(item,index) in breadcrumbList' :key="index"><span @click='spanCLick(item,index)' class='breadcrumb'>{{ item.name }}</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div>
        <el-row :gutter="8">
          <el-col :span="24">
            <el-select v-model="value" placeholder="请选择档案类型" style='width: 100%' clearable>
              <el-option v-for='(fileItem) in fileTypeList' :label="fileItem.name" :value="fileItem.type" :key='fileItem.type'> </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>


      <div style='width: 100%;'>
        <div style='display: flex;flex-wrap: wrap;'>
          <div v-for='(item,index) in breadcrumbList[breadcrumbList.length-1].child' :key="index" style='width: 25%;margin: 2px 0;' :style='value && value !== item.type ? "display: none;":""'>
            <div class='fileEnvelope' style='' @click='fileClick(item,index)'>
              <div class='fileEnvelopeImg'  style=''>
                <img :src='file[item.type]'>
              </div>
              <div style='' class='overflowText'>
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

import file from './icon/fileIcon.png'
import doc from './icon/fileDOC.png'
import docx from './icon/fileDOCX.png'
import pdf from './icon/filePDF.png'
import ppt from './icon/filePPT.png'
import rar from './icon/fileRAR.png'
import txt from './icon/fileTXT.png'
import xls from './icon/fileXLS.png'
import xlsx from './icon/fileXLSX.png'
import zip from './icon/fileZIP.png'


export default {
  name: 'archiveDetail.vue',
  data(){
    return {
      fileTypeList:[
        {name:'文件夹',type:'file'},
        {name:'doc',type:'doc'},
        {name:'docx',type:'docx'},
        {name:'pdf',type:'pdf'},
        {name:'ppt',type:'ppt'},
        {name:'rar',type:'rar'},
        {name:'txt',type:'txt'},
        {name:'xls',type:'xls'},
        {name:'xlsx',type:'xlsx'},
        {name:'zip',type:'zip'},
      ],

      value:'',
      file:{file,doc,docx,pdf,ppt,rar,txt,xls,xlsx,zip,},
      collapseActiveName:'',
      breadcrumbList:[
        {name:'项目档案',type:'zip',id:'xmda8',child:[
            {name:'项目档案F.zip',type:'zip',id:'xmda8',child:[],},
          ],},
      ],


    }
  },
  methods: {
    spanCLick(item,index){
      this.breadcrumbList.splice(index+1);
    },

    fileClick(item){
      {
        item.child = [
          {name:"第" + this.breadcrumbList.length + '项项目档案A',type:'file',id:'xmda5',child:[],},
          {name:"第" + this.breadcrumbList.length + '项项目档案B',type:'file',id:'xmda6',child:[],},
          {name:"第" + this.breadcrumbList.length + '项项目档案C',type:'file',id:'xmda7',child:[],},
          {name:"第" + this.breadcrumbList.length + '项项目档案D.xls',type:'xls',id:'xmda8',child:[],},
          {name:"第" + this.breadcrumbList.length + '项项目档案E.xlsx',type:'xlsx',id:'xmda8',child:[],},
          {name:"第" + this.breadcrumbList.length + '项项目档案.zip',type:'zip',id:'xmda8',child:[],},
          {name:"第" + this.breadcrumbList.length + '项项目档案.doc',type:'doc',id:'xmda8',child:[],},
          {name:"第" + this.breadcrumbList.length + '项项目档案.docx',type:'docx',id:'xmda8',child:[],},
          {name:"第" + this.breadcrumbList.length + '项项目档案.pdf',type:'pdf',id:'xmda8',child:[],},
          {name:"第" + this.breadcrumbList.length + '项项目档案.ppt',type:'ppt',id:'xmda8',child:[],},
          {name:"第" + this.breadcrumbList.length + '项项目档案.rar',type:'rar',id:'xmda8',child:[],},
          {name:"第" + this.breadcrumbList.length + '项项目档案.txt',type:'txt',id:'xmda8',child:[],},
          {name:"第" + this.breadcrumbList.length + '项项目档案.xls',type:'xls',id:'xmda8',child:[],},
          {name:"第" + this.breadcrumbList.length + '项项目档案.xlsx',type:'xlsx',id:'xmda8',child:[],}
      ]
      }
      if (item.type === 'file') {
        this.breadcrumbList.push(item)
      }
      else this.$message('正在下载'+item.name)

    },
  }
}

</script>

<style scoped lang='less'>
.titleText{
  font-size: 16px;
  padding-left: 20px;
  margin: 14px 0;
  border-left: 4px solid #2878ff;
}
.fileEnvelope{
  display: flex;flex-flow: column;justify-content: center;align-items: center;cursor:pointer;
  margin: 0 8px;border-radius: 4px;
}
.fileEnvelope:hover{
  background: #f1f6ff;
}
.overflowText{
  margin: 10px;
  display: -webkit-box; /* Safari */
  -webkit-line-clamp: 2; /* Safari and Chrome */
  -webkit-box-orient: vertical; /* Safari and Chrome */
  overflow: hidden;
  height: 38px;
}
.fileEnvelopeImg{
  width: 80px;height: 80px;display: flex;justify-content: center;align-items: center;
}
.breadcrumb{
  cursor:pointer;
}
.breadcrumb:hover{
  color: #2878ff;
}
</style>
