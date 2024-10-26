<template>
  <div>
    <div>
      <div class='titleText'>项目档案</div>

      <div style='width: 100%;'>
        <div style='display: flex;flex-wrap: wrap;'>
          <div v-for='(item,index) in projectInfo' style='width: 25%;margin: 2px 0;' :key="index">
            <div class='fileEnvelope' style='' @click='fileClick(item,"项目档案")'>
              <div class='fileEnvelopeImg' style=''>
                <img :src='file[item.type]'>
              </div>
              <div style='' class='overflowText'>
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div>
      <div class='titleText'>标段档案</div>

      <div style='width: 100%;'>
        <div style='display: flex;flex-wrap: wrap;'>
          <div v-for='(item,index) in projectInfo1' style='width: 25%;margin: 2px 0;' :key="index">
            <div class='fileEnvelope' style='' @click='fileClick(item,"标段档案")'>
              <div class='fileEnvelopeImg' style=''>
                <img :src='file[item.type]'>
              </div>
              <div style='' class='overflowText'>
                {{ item.name }}
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
  name: 'archiveDetailBox.vue',
  data() {
    return {
      file: {file, doc, docx, pdf, ppt, rar, txt, xls, xlsx, zip,},
      collapseActiveName: '',
      projectInfo: [
        {name: '项目档案', type: 'file', id: 'xmda1', child: [],},

      ],
      projectInfo1: [
        {name: '标段档案1', type: 'file', id: 'xmda1', child: [],},
        {name: '标段档案2', type: 'file', id: 'xmda2', child: [],},
        {name: '标段档案3', type: 'file', id: 'xmda3', child: [],},
      ],

    }
  },
  methods: {
    cardCLick(item) {
      console.log(item)
      // this.$emit('cardCLick',item)
    },

    fileClick(item, name) {
      console.log(item, '---')
      item.child = [
        {name: name + 'A', type: 'file', id: 'xmda5', child: [],},
        {name: name + 'B', type: 'file', id: 'xmda6', child: [],},
        {name: name + 'C', type: 'file', id: 'xmda7', child: [],},
        {name: name + 'D.xls', type: 'xls', id: 'xmda8', child: [],},
        {name: name + 'E.xlsx', type: 'xlsx', id: 'xmda8', child: [],},
        {name: name + 'F.zip', type: 'zip', id: 'xmda8', child: [],},
      ]

      if (item.type === 'file') this.$emit('openDetails', item)
      else this.$message('正在下载' + item.name)

    },
  }
}

</script>

<style scoped lang='less'>
.titleText {
  font-size: 16px;
  padding-left: 20px;
  margin: 14px 0;
  border-left: 4px solid #2878ff;
}

.fileEnvelope {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 8px;
  border-radius: 4px;
}

.fileEnvelope:hover {
  background: #f1f6ff;
}

.overflowText {
  margin: 10px;
  display: -webkit-box; /* Safari */
  -webkit-line-clamp: 2; /* Safari and Chrome */
  -webkit-box-orient: vertical; /* Safari and Chrome */
  overflow: hidden;
  height: 38px;
}

.fileEnvelopeImg {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
