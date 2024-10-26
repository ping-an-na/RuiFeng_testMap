<template>
  <div >
    <el-collapse v-model="collapseActiveName" accordion>
      <el-collapse-item title="基本信息" name="1">
        <div style='margin-left: 20px;'>
          <el-form ref="form" :model="form" label-width="80px">
            <div v-for='(item,index) in collapseList' :key="index">
              <el-form-item :label="item.name" >
                <el-input v-model="form[item.id]" disabled></el-input>
              </el-form-item>
            </div>
            <el-form-item label="二维码" >
              <img src='./qrCode.png'>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <div class='positionLine'></div>
      <div class='a_little_text' > 完成工序：<span style='color:#2878ff;'>3</span>/7</div>
      <el-collapse-item title="建设过程" name="2">
        <div class='collapseCustom'>
          <el-collapse v-model="collapseActiveNameSun" accordion>
            <el-collapse-item  v-for='(item,index) in constructList' :name="index+1" :disabled='!item.isOk' :key="index">
              <template slot="title">
                <img src='./icon/yuanInco2.png' v-if='item.isOk' style='width: 22px;height: 22px'>
                <img src='./icon/yuanInco1.png' v-else style='width: 22px;height: 22px'>
                <span style='padding-left: 20px;'>{{ item.nameTitle }}</span>
              </template>
              <div style='border-left: 1px dashed #c0c4cc;margin-left: 11px;padding-left: 20px;'>
                <div style='height: 6px;width:100%;border-bottom: 1px dashed #c0c4cc; margin-bottom: 6px;'></div>

                <div style='display: flex;padding: 10px 0 20px 0;align-items: center;'>
                  <img src='./avatar.png' class='imgAnnui'>
                  <div style='margin-right: 14px;'>
                    <div><span>于文庆</span><span class='cardColor cardColor0'>施工单位</span></div>
                    <div>2023-12-31</div>
                  </div>
                  <div class='annuiImgBox' >
                    <div
                      class='annuiN'
                      @click='leftClick'
                      @mousedown.left="handleLeftClickLeftDown('overflow_x_A_'+index)"
                      @mouseup.left="handleLeftClickLeftUp"
                      @mouseleave='handleLeftClickLeftUp'
                    ><i class="el-icon-arrow-left"></i>
                    </div>

                    <div style='width: 100%;flex: 1;position: relative;overflow-x: auto;overflow-y: hidden;' :ref='"overflow_x_A_"+index'>
                      <div style=' white-space: nowrap;position: absolute'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                      </div>
                    </div>
                    <div class='annui'
                         @click='rightClick'
                         @mousedown.left="handleLeftClickRightDown('overflow_x_A_'+index)"
                         @mouseup.left="handleLeftClickRightUp"
                         @mouseleave='handleLeftClickRightUp'>
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </div>
                </div>
                <div style='display: flex;padding: 10px 0 20px 0;align-items: center;'>
                  <img src='./avatar.png' class='imgAnnui'>
                  <div style='margin-right: 14px;'>
                    <div><span>于文庆</span><span class='cardColor cardColor1'>监理单位</span></div>
                    <div>2023-12-31</div>
                  </div>
                  <div class='annuiImgBox' >
                    <div
                      class='annuiN'
                      @click='leftClick'
                      @mousedown.left="handleLeftClickLeftDown('overflow_x_B_'+index)"
                      @mouseup.left="handleLeftClickLeftUp"
                      @mouseleave='handleLeftClickLeftUp'
                    ><i class="el-icon-arrow-left"></i>
                    </div>

                    <div style='width: 100%;flex: 1;position: relative;overflow-x: auto;overflow-y: hidden;' :ref='"overflow_x_B_"+index'>
                      <div style=' white-space: nowrap;position: absolute'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                      </div>
                    </div>
                    <div class='annui'
                         @click='rightClick'
                         @mousedown.left="handleLeftClickRightDown('overflow_x_B_'+index)"
                         @mouseup.left="handleLeftClickRightUp"
                         @mouseleave='handleLeftClickRightUp'>
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </div>
                </div>
                <div style='display: flex;padding: 10px 0 20px 0;align-items: center;'>
                  <img src='./avatar.png' class='imgAnnui'>
                  <div style='margin-right: 14px;'>
                    <div><span>于文庆</span><span class='cardColor cardColor2'>建设单位</span></div>
                    <div>2023-12-31</div>
                  </div>
                  <div class='annuiImgBox' >
                    <div
                      class='annuiN'
                      @click='leftClick'
                      @mousedown.left="handleLeftClickLeftDown('overflow_x_C_'+index)"
                      @mouseup.left="handleLeftClickLeftUp"
                      @mouseleave='handleLeftClickLeftUp'
                    ><i class="el-icon-arrow-left"></i>
                    </div>

                    <div style='width: 100%;flex: 1;position: relative;overflow-x: auto;overflow-y: hidden;' :ref='"overflow_x_C_" + index'>
                      <div style=' white-space: nowrap;position: absolute'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                        <img src='./caoIcon.png' class='imgClickBg' @click='imgClickBg'>
                      </div>
                    </div>
                    <div class='annui'
                         @click='rightClick'
                         @mousedown.left="handleLeftClickRightDown('overflow_x_C_'+ index)"
                         @mouseup.left="handleLeftClickRightUp"
                         @mouseleave='handleLeftClickRightUp'>
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

      </el-collapse-item>

    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'facilityInfoDetailA.vue',
  data(){
    return {
      value:'',
      collapseActiveName:'1',
      collapseActiveNameSun: 1 ,
      form:{xmbh:'自动带出'},
      titleTips:['项目在建','项目立项','项目完工'],
      titleTips2:['在建','验收'],
      collapseList:[
        {name:'设施类型',id:"xmbh"},
        {name:'设施编号',id:"xmbh"},
        {name:'设施名称',id:"xmbh"},
        {name:'设施状态',id:"xmbh"},
        {name:'当前工序步骤',id:"xmbh"},
        {name:'所属标段',id:"xmbh"},
      ],
      constructList:[
        {nameTitle:'确定取土场和运输路线',id:'1',isOk:true},
        {nameTitle:'测量放线',id:'2',isOk:true},
        {nameTitle:'取土运土',id:'3',isOk:true},
        {nameTitle:'挖掘机填筑土方',id:'4',isOk:false},
        {nameTitle:'压实和排水',id:'5',isOk:false},
        {nameTitle:'围堰拆除',id:'6',isOk:false},
        {nameTitle:'竣工验收',id:'7',isOk:false},
      ],
    }
  },
  methods: {
    cardCLick(item){
      this.$emit('sectionInfoDetailClick',item)
    },
    imgClickBg(){
      this.$message('打开图片~~')
    },

    handleLeftClickLeftDown(item){
      // console.log(item)
      let scrollContainer = this.$refs[item][0]
      // console.log(scrollContainer)
      this.setTimeName = setInterval(()=>{
        scrollContainer.scrollLeft = scrollContainer.scrollLeft - 1
      },15)
    },
    handleLeftClickLeftUp(){
      // console.log('← 停 ')
      clearInterval(this.setTimeName)
    },
    handleLeftClickRightDown(item){
      // console.log(item)
      let scrollContainer = this.$refs[item][0]
      // console.log(scrollContainer)

      this.setTimeName = setInterval(()=>{
        scrollContainer.scrollLeft = scrollContainer.scrollLeft + 1
      },15)
    },
    handleLeftClickRightUp(){
      // console.log('→ 停 ')
      clearInterval(this.setTimeName)
    },
    leftClick(){
      // console.log()
      // let scrollContainer = this.$refs['overflow_x_A_0']
      // scrollContainer.scrollLeft = scrollContainer.scrollLeft - 10
    },
    rightClick(){
      // console.log(this.$refs['overflow_x_A_0'])
      // let scrollContainer = this.$refs['overflow_x_A_0']
      // scrollContainer.scrollLeft = scrollContainer.scrollLeft + 10
    },
  }
}

</script>

<style scoped lang='less'>

.positionLine{
  position: relative;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgb(246, 247, 247);
}


::v-deep{

  .el-collapse{
    border-top: none;
    border-bottom: none;
  }
  .el-collapse-item__header{
    border-bottom: none;
    height: 20px!important;
    line-height: 20px;
    margin: 20px 0px;
    border-left: 4px solid #2878ff;
    padding-left: 20px;
  }
  .el-collapse-item__wrap{
    border-bottom: none;
  }
  .collapseCustom {
    margin: 0 10px;
    .el-collapse-item__header{
      border-left: none;
      padding-left: 0;
    }
    .el-collapse-item__content{
      padding-bottom: 0px;
    }
  }
}


.cardColor{
padding: 4px 8px;border-radius: 4px;
font-size: 12px;
  margin-left: 8px;
}
.cardColor0{
background: #faecd8;
color:#e6a23c ;
}
.cardColor1{
background: #e0eaff;
color:#6789f0 ;
}
.cardColor2{
background: #ecfff9;
color:#5fd1ab ;
}

.youjiantan{
width: 60px;font-size: 20px;font-weight: 900;display: flex;justify-content: end;
align-items: center;
}
.a_little_text{
font-size: 12px;color: #909399;float: right; position: relative;top: 24px; right: 30px;pointer-events:none;
}
.annui{
  width: 12px;height: 40px;border-radius: 0 8px 8px 0;background: #f6f6f6;display: flex;align-items: center;justify-content: center;
  margin-left: 4px;
  cursor:pointer;
}
.annuiN{
  width: 12px;height: 40px;border-radius: 8px 0 0 8px ;background: #f6f6f6;display: flex;align-items: center;justify-content: center;
  margin-right: 4px;
  cursor:pointer;

}
.imgAnnui{
  width: 40px;height: 40px;margin-right: 20px;
}
.annuiImgBox{
  width: 100%;flex: 1;height: 40px;display: flex
}
.imgClickBg{
  cursor:pointer;
  width: 40px;height: 40px;margin-right: 4px;
}
.cardColor{
  padding: 4px 8px;border-radius: 4px;
  font-size: 12px;
}
</style>
