<template>
  <div style='height: 100%;'>
    <div class='cardHeader'>
      <div style='margin: 10px' >
        <el-row :gutter="8">
          <el-col :span="12">
            <el-card shadow="hover">
             <div class='cardDownBox' style='color: #34c5c5;'>
               <div >
                 <img src='./module/icon/cardIcon1.png' style='width: 14px;height: 14px'>项目数量 ：
               </div>
               <div>
                 <span class='cardDownOneSize'>20</span>
                 <span class='cardDowntwoColor'>个</span>
               </div>
             </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover">
              <div class='cardDownBox' style='color: #15ba83;'>
                <div >
                  <img src='./module/icon/cardIcon2.png' style='width: 14px;height: 14px'>标段数量 ：
                </div>
                <div>
                  <span  class='cardDownOneSize'>20</span>
                  <span class='cardDowntwoColor'>个</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div style='margin: 10px'>
        <el-row :gutter="8">
          <el-col :span="12">
            <el-card shadow="hover">
              <div class='cardDownBox' style='color: #2c7afe;'>
                <div >
                  <img src='./module/icon/cardIcon3.png' style='width: 14px;height: 14px'>建设面积 ：
                </div>
                <div>
                  <span class='cardDownOneSize'>17600</span>
                  <span class='cardDowntwoColor'>亩</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover">
              <div class='cardDownBox' style='color: #41b3e8;'>
                <div >
                  <img src='./module/icon/cardIcon4.png' style='width: 14px;height: 14px'>项目总金额 ：
                </div>
                <div>
                  <span class='cardDownOneSize' >73300</span>
                  <span class='cardDowntwoColor'>万元</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class='lineColo'></div>
    <div style='margin: 10px'>
      <el-row :gutter="8">
        <el-col :span="6">
          <el-select v-model="value" placeholder="请选择省份">
            <el-option label="江苏省" value="江苏省"> </el-option>
            <el-option label="海安市" value="海安市"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="18">
          <div style='display: flex;' class='colInput'>
            <el-input placeholder="请输入项目名称或编号" v-model="value1">
            </el-input>
            <el-button  icon="el-icon-search" type="primary" >搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class='lineColo' style='height: 2px;'></div>
    <div style='margin: 10px'>
      <el-row :gutter="8">
        <el-col :span="4" v-for='item in buttonList'>
          <div :class='buttonMarkers === item.id?"buttonListDynamic":"buttonList"' @click='buttonMarkers = item.id'> {{ item.name }}({{buttonObj[item.id]}}) </div>
        </el-col>
      </el-row>
    </div>
    <div class='cardRoll' >
      <div v-for='(item,index) in mapData.features' style='margin-bottom: 14px' @click='cardCLick(item)'>
        <el-card shadow="hover">
<!--          鼠标悬浮时显示{{item}}-->
          <div style='display: flex;'>
            <div style='flex: 1;line-height: 1.5;font-size: 16px'>
              <span class='cardColor' :class='"cardColor" + index%3' style=''>{{titleTips[index%3]}}</span>
              <span>{{item.properties.XMMC}}</span>
            </div>
            <div class='youjiantan'> <div class="iconfont icon-youjiantou"></div> </div>
          </div>
          <div style='display: flex;justify-content: space-between;margin: 14px 0px;color:#909399 '>
            <div>项目编号: 3201060252023001</div>
            <div>2023年</div>
          </div>

        </el-card>
      </div>


    </div>
  </div>
</template>

<script>
import mapData from './module/mapData.json'
export default {
  name: 'menuCenternInfo.vue',
  data(){
    return {
      mapData:mapData,
      value:'海安市',
      value1:'',
      buttonMarkers:'q1',
      buttonList:[
        {name:'全部',id:'q1'},
        {name:'立项',id:'q2'},
        {name:'在建',id:'q3'},
        {name:'完工',id:'q4'},
        {name:'竣工',id:'q5'},
        {name:'停工',id:'q6'},
      ],
      buttonObj:{
        q1:20,
        q2:5,
        q3:5,
        q4:5,
        q5:5,
        q6:5,
      },
      titleTips:['项目在建','项目立项','项目完工'],
    }
  },
  methods: {
    cardCLick(item){
      this.$emit('positionInfo',item)
    },
  }
}

</script>

<style scoped lang='less'>
::v-deep{
  .el-card{
    cursor:pointer;
  }
 .cardHeader .el-card{
    background: #f7f8fa;
    border: 1px solid #f7f8fa !important;
  }
  .cardHeader .el-card__body{
    padding: 20px 4px !important;
  }
  .cardRoll .el-card:hover .youjiantan{
   color: #2878ff;
  }
  .colInput .el-input__inner{
    border-radius: 4px 0 0 4px;
  }
  .el-button--small {
    border-radius: 0 3px 3px 0!important;
    height: 32px;
  }
}
.lineColo{
  width: 100%;
  background: rgb(246, 247, 247);
  height: 6px;
}
.buttonList{
  padding: 8px 0;
  border: #dcdfe6 solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: #dcdfe6;
  cursor:pointer;
}
.buttonList:hover{
  color: #409eff;
  border: #409eff solid 1px;
}
.buttonListDynamic{
  padding: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor:pointer;
  border: #f7f8fa solid 1px;
  color: #409eff;
  background:#f7f8fa;
}
.cardRoll{
  margin: 10px;height:calc( 100% - 250px);overflow: auto;
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
  width: 60px;font-size: 20px;font-weight: 900;display: flex;justify-content: center;
  align-items: center;
}
//.cardColor4{
//   background: #faecd8;
//   color:#e6a23c ;
//}
.cardDownBox{
  display: flex;justify-content: space-evenly;align-items: center;
  background: #f7f8fa;
}
.cardDownOneSize{
  font-size: 18px
}
.cardDowntwoColor{
  color:#606266;
}


</style>
