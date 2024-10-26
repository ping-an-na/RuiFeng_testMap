<template>
  <div style='height: 100%;'>
    <div class='lineColo'></div>
    <template v-if='!ifInfo'>
      <div style='margin: 10px'>
        <div style='width: 100%;display: flex;'>
          <div class='tabs_z' :class='{"tabsDynamic_z":activeName ==="1"}' @click='activeName = "1"'>基本信息</div>
          <div class='tabs_z' :class='{"tabsDynamic_z":activeName ==="2"}' @click='activeName = "2"'>标段信息</div>
          <div class='tabs_z' :class='{"tabsDynamic_z":activeName ==="3"}' @click='activeName = "3"'>档案库</div>
          <div class='tabs_z' :class='{"tabsDynamic_z":activeName ==="4"}' @click='activeName = "4"'>设施信息</div>
        </div>
  <!--      <el-tabs v-model="activeName" @tab-click="handleClick">-->
  <!--        <el-tab-pane label="基本信息" name="1"></el-tab-pane>-->
  <!--        <el-tab-pane label="标段信息" name="2"></el-tab-pane>-->
  <!--        <el-tab-pane label="档案库" name="3"></el-tab-pane>-->
  <!--        <el-tab-pane label="设施信息" name="4"></el-tab-pane>-->
  <!--      </el-tabs>-->
      </div>
      <div class='lineColo' style='height: 2px'></div>

      <div style='margin: 10px' v-if='activeName === "1"' class='cardRoll'>
        <collapse ref='collapse' @sectionInfoDetailClick='sectionInfoDetailClick' @facilityInfoDetailClick='facilityInfoDetailClick'></collapse>
      </div>
      <div style='margin: 10px' v-if='activeName === "2"' class='cardRoll'>
        <sectionInfo ref='sectionInfo' @sectionInfoDetailClick='sectionInfoDetailClick' ></sectionInfo>
      </div>
      <div style='margin: 10px' v-if='activeName === "3"' class='cardRoll'>
        <archive ref='archive' @openDetails='openDetailsArchive' ></archive>
      </div>

      <div style='margin: 10px' v-if='activeName === "4"' class='cardRoll'>
        <facilityInfo ref='facilityInfo' @facilityInfoDetailClick='facilityInfoDetailClick'></facilityInfo>
      </div>
    </template>
    <template v-else>
      <div style='margin: 10px' v-if='infoId === "2"' class='cardRoll2'>
        <sectionInfoDetail ref='sectionInfoDetail' @facilityInfoDetailClick='facilityInfoDetailClick'></sectionInfoDetail>
      </div>
      <div style='margin: 10px' v-if='infoId === "3"' class='cardRoll2'>
        <archiveDetail ref='archiveDetail'></archiveDetail>
      </div>
      <div style='margin: 10px' v-if='infoId === "4"' class='cardRoll2'>
        <facilityInfoDetail ref='facilityInfoDetail'></facilityInfoDetail>
      </div>
    </template>


  </div>
</template>

<script>
import  collapse from './module/collapse.vue'
import  sectionInfo from './module/sectionInfo.vue'
import  archive from './module/archive.vue'
import  archiveDetail from './module/archiveDetail.vue'
import  sectionInfoDetail from './module/sectionInfoDetail.vue'
import  facilityInfoDetail from './module/facilityInfoDetail.vue'



import  facilityInfo from './module/facilityInfo.vue'
export default {
  name: 'itemCenterInfo.vue',
  components:{collapse,sectionInfo,archive,facilityInfo,archiveDetail,sectionInfoDetail,facilityInfoDetail},
  data(){
    return {
      activeName: '1',
      ifInfo:false,
      infoId:'',
    }
  },
  methods: {
    facilityInfoDetailClick(item){
      this.ifInfo = true
      this.infoId = '4'
      this.$emit('titleEdit','设施详情')
    },
    sectionInfoDetailClick(item){
      this.ifInfo = true
      this.infoId = '2'
      this.$emit('titleEdit','标段详情')
    },
    openDetailsArchive(item){
      this.ifInfo = true
      this.infoId = '3'
      this.$emit('titleEdit',item.name)
      setTimeout(()=>{
        this.$refs['archiveDetail'].breadcrumbList = [item]
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  }
}

</script>

<style scoped lang='less'>

.lineColo{
  width: 100%;
  background: rgb(246, 247, 247);
  height: 6px;
}
.cardRoll{
  margin: 10px;height:calc( 100% - 100px);overflow: auto;
}
.cardRoll2{
  margin: 10px;height:calc( 100% - 20px);overflow: auto;
}
.tabs_z{
  cursor:pointer;
  width: 25%;display: flex;justify-content: center;align-items: center;padding-bottom: 15px;padding-top: 10px;
  border-bottom: 3px solid #FFF;
  font-size: 16px;
}
.tabsDynamic_z{
  border-bottom: 3px solid #2878ff;
  color:#2878ff;

}
::v-deep{

}
</style>
