<template>
  <div>
    <div >
      <div style='padding: 10px 0px 20px;position: absolute;background: #FFF;'>
        <el-row :gutter="8">
          <el-col :span="9">
            <el-select v-model="value" placeholder="请选择工程类型">
              <el-option label="工程类型1" value="工程类型1"> </el-option>
              <el-option label="工程类型2" value="工程类型2"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="15">
            <div style='display: flex;' class='colInput'>
              <el-input placeholder="请输入设施编号" v-model="value">
              </el-input>
              <el-button  icon="el-icon-search" type="primary" >搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </div>

      <div style='padding-top: 80px;'>
        <div v-for='(item,index) in 15' style='margin-bottom: 14px' @click='cardCLick(item)' :key="index">
          <el-card shadow="hover">
            <div style='display: flex;align-items: center;'>
              <div style='flex: 1;line-height: 1.5;font-size: 16px'>
                <span class='cardColor' :class='"cardColor" + item%2' >{{titleTips2[item%2]}}</span>
                泵站{{item}}
              </div>
              <div>项目编号: 3201060252023001</div>
              <div class='youjiantan'> <div class="iconfont icon-youjiantou"></div> </div>
            </div>
          </el-card>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'facilityInfo.vue',
  data(){
    return {
      value:'',
      titleTips2:['在建','验收'],
    }
  },
  methods: {
    cardCLick(item){
      // this.$emit('cardCLick',item)
      this.$emit('facilityInfoDetailClick',item)
    },
  }
}

</script>

<style scoped lang='less'>

::v-deep{
  .colInput .el-input__inner{
    border-radius: 4px 0 0 4px;
  }
  .el-button--small {
    border-radius: 0 3px 3px 0!important;
    height: 32px;
  }


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
