<template>
  <div style=''>
    <div v-for='(item,index) in 3' style='margin-bottom: 14px' @click='cardCLick(item)' :key="index">
      <el-card shadow="hover">
        <!--          鼠标悬浮时显示{{item}}-->
        <div style='display: flex;'>
          <div style='flex: 1;line-height: 1.5;font-size: 16px'>
            <span class='cardColor' :class='"cardColor" + item%3' style=''>{{titleTips[item%3]}}</span>
            2023年江苏省宿迁市泗阳县爱园镇高标准农田建设改造提升项目(财政补助){{item}}
          </div>
          <div class='youjiantan'> <div class="iconfont icon-youjiantou"></div> </div>
        </div>
        <div style='display: flex;justify-content: space-between;margin: 14px 0px;color:#909399 '>
          <div>项目编号: 3201060252023001</div>
          <div><img src='./qrCode.png' style='width: 20px;height: 20px;'></div>
        </div>

      </el-card>
    </div>

  </div>
</template>

<script>
export default {
  name: 'sectionInfo.vue',
  data(){
    return {
      titleTips:['项目在建','项目立项','项目完工'],
    }
  },
  methods: {
    cardCLick(item){
      this.$emit('sectionInfoDetailClick',item)
    },

    // cardCLick(item){
    //   // this.$emit('cardCLick',item)
    // },
  }
}

</script>

<style scoped lang='less'>




::v-deep{



  .el-card{
    cursor:pointer;
  }

  .el-card:hover .youjiantan{
    color: #2878ff;
  }
  .el-card__body{
    padding: 10px 20px;
  }
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
}


.cardColor{
  padding: 4px 8px;border-radius: 4px;
  font-size: 12px;
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
</style>
