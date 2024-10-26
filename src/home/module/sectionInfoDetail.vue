<template>
  <div style=''>
    <el-collapse v-model="collapseActiveName" accordion>
      <el-collapse-item title="基本信息" name="1">
        <div style='margin-left: 20px;'>
          <el-form ref="form" :model="form" label-width="80px">
            <div v-for='(item,index) in collapseList' :key="index">
              <el-form-item :label="item.name" v-if='item.type === "normal"'>
                <el-input v-model="form[item.id]" disabled></el-input>
              </el-form-item>
              <el-form-item :label="item.name" v-if='item.type === "endAffiliate"'>
                <el-input v-model="form[item.id]" disabled>
                  <template slot="append">{{ item.endAffiliateName }}</template>
                </el-input>
              </el-form-item>
            </div>
            <el-form-item label="二维码" >
              <img src='./qrCode.png'>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <div class='positionLine'></div>

      <el-collapse-item title="参与单位" name="2">

        <div style='margin-left: 20px;'>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="建设单位" >
              <el-input v-model="form.xmbh" disabled></el-input>
            </el-form-item>
            <el-form-item label="标段业主" >
              <div style='display: flex;'>
                <div v-for='item in 5' style='margin: 2px 10px;display: flex;flex-flow: column;justify-content: center;align-items: center;' :key="item">
                  <img src='./avatar.png' style='width: 40px;height: 40px;'>
                  <div>宇文庆</div>
                </div>
              </div>
            </el-form-item>
            <div style='width: 100%; border-top: 1px dashed #c0c4cc;margin-bottom: 20px;'></div>
            <el-form-item label="监理单位" >
              <el-input v-model="form.xmbh" disabled></el-input>
            </el-form-item>
            <el-form-item label="总监理工程师" >
              <div style='display: flex;'>
                <div v-for='item in 1' style='margin: 2px 10px;display: flex;flex-flow: column;justify-content: center;align-items: center;' :key="item">
                  <img src='./avatar.png' style='width: 40px;height: 40px;'>
                  <div>宇文庆</div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="专业监理工程师" >
              <div style='display: flex;'>
                <div v-for='item in 1' style='margin: 2px 10px;display: flex;flex-flow: column;justify-content: center;align-items: center;' :key="item">
                  <img src='./avatar.png' style='width: 40px;height: 40px;'>
                  <div>宇文庆</div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="监理员" >
              <div style='display: flex;'>
                <div v-for='item in 2' style='margin: 2px 10px;display: flex;flex-flow: column;justify-content: center;align-items: center;' :key="item">
                  <img src='./avatar.png' style='width: 40px;height: 40px;'>
                  <div>宇文庆</div>
                </div>
              </div>
            </el-form-item>
            <div style='width: 100%; border-top: 1px dashed #c0c4cc;margin-bottom: 20px;'></div>
            <el-form-item label="监理单位" >
              <el-input v-model="form.xmbh" disabled></el-input>
            </el-form-item>
            <el-form-item label="项目经理" >
              <div style='display: flex;'>
                <div v-for='item in 1' style='margin: 2px 10px;display: flex;flex-flow: column;justify-content: center;align-items: center;' :key="item">
                  <img src='./avatar.png' style='width: 40px;height: 40px;'>
                  <div>宇文庆</div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="单位技术负责人" >
              <div style='display: flex;'>
                <div v-for='item in 1' style='margin: 2px 10px;display: flex;flex-flow: column;justify-content: center;align-items: center;' :key="item">
                  <img src='./avatar.png' style='width: 40px;height: 40px;'>
                  <div>宇文庆</div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="安全员" >
              <div style='display: flex;'>
                <div v-for='item in 2' style='margin: 2px 10px;display: flex;flex-flow: column;justify-content: center;align-items: center;' :key="item">
                  <img src='./avatar.png' style='width: 40px;height: 40px;'>
                  <div>宇文庆</div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="材料员" >
              <div style='display: flex;'>
                <div v-for='item in 4' style='margin: 2px 10px;display: flex;flex-flow: column;justify-content: center;align-items: center;' :key="item">
                  <img src='./avatar.png' style='width: 40px;height: 40px;'>
                  <div>宇文庆</div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="质检员" >
              <div style='display: flex;'>
                <div v-for='item in 3' style='margin: 2px 10px;display: flex;flex-flow: column;justify-content: center;align-items: center;' :key="item">
                  <img src='./avatar.png' style='width: 40px;height: 40px;'>
                  <div>宇文庆</div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="施工员" >
              <div style='display: flex;'>
                <div v-for='item in 4' style='margin: 2px 10px;display: flex;flex-flow: column;justify-content: center;align-items: center;' :key="item">
                  <img src='./avatar.png' style='width: 40px;height: 40px;'>
                  <div>宇文庆</div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="资料员" >
              <div style='display: flex;'>
                <div v-for='item in 5' style='margin: 2px 10px;display: flex;flex-flow: column;justify-content: center;align-items: center;' :key="item">
                  <img src='./avatar.png' style='width: 40px;height: 40px;'>
                  <div>宇文庆</div>
                </div>
              </div>
            </el-form-item>
<!--            endAffiliateName-->

          </el-form>
        </div>

      </el-collapse-item>
      <div class='positionLine'></div>

      <el-collapse-item title="工程设施" name="4">
        <div style='margin-left: 20px;'>
          <div style='margin: 10px 0px 20px'>


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

          <div v-for='item in 10' style='margin-bottom: 14px' @click='cardCLick2(item)' :key="item">
            <el-card shadow="hover">
              <div style='display: flex;align-items: center;'>
                <div style='flex: 1;line-height: 1.5;font-size: 16px'>
                  <span class='cardColor' :class='"cardColor" + item%2' style=''>{{titleTips2[item%2]}}</span>
                  泵站{{item}}
                </div>
                <div>项目编号: 3201060252023001</div>
                <div class='youjiantan'> <div class="iconfont icon-youjiantou"></div> </div>
              </div>
            </el-card>

          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'sectionInfoDetail.vue',
  data(){
    return {
      value:'',
      collapseActiveName:'1',
      form:{xmbh:'自动带出'},
      titleTips:['项目在建','项目立项','项目完工'],
      titleTips2:['在建','验收'],
      collapseList:[
        {name:'标段编号',id:"xmbh",type:"normal"},
        {name:'标段名称',id:"xmbh",type:"normal"},
        {name:'标段状态',id:"xmbh",type:"normal"},
        {name:'建设工程',id:"xmbh",type:"normal"},
        {name:'标段金额',id:"xmbh",type:"endAffiliate",endAffiliateName:'万元'},
        {name:'建设面积',id:"xmbh",type:"endAffiliate",endAffiliateName:'亩'},
      ],
      collapseList2:[
        {name:'设计单位',id:"xmbh"},
        {name:'审计单位',id:"xmbh"},
        {name:'检查单位',id:"xmbh"},
      ],
    }
  },
  methods: {
    cardCLick(item){
      console.log(item)
      // this.$emit('cardCLick',item)
    },
    cardCLick2(item){
      this.$emit('facilityInfoDetailClick',item)
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
