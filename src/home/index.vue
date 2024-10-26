<template>
  <div class="map-wrap" :class='{screenFull:!isBig}' id='mapWrap' style=''>
    <div style='position: relative;width: 100%;height: 100%;'>
      <div id="container"></div>

      <!--    <el-slider-->
      <!--      style='position: absolute;top: 30px;left: 130px;width: 450px;'-->
      <!--      v-model="sliderValue"-->
      <!--      :min='2014'-->
      <!--      :max='2024'-->
      <!--      :show-tooltip='false'-->
      <!--      @input='inputInput'-->
      <!--      :marks="marks">-->
      <!--    </el-slider>-->

      <div class='blowButton mapIcon' @click="handleFullscreen">
        <img v-if='isBig' src='./module/big.png' style='width: 70%;'>
        <img v-else src='./module/small.png' style='width: 70%;'>
      </div>

      <div class='legendMap mapIcon' @click='legendMapClick' v-if='!isLegendMap'>
        <img src='./module/legendMap.png' style='width: 70%;'>
      </div>

      <div class='leftWinMain' :style='leftWinMainCss()'>
        <div style='width: 100%;height: 100%;' v-if='isLegendMap'>
          <div class='legendTitle'>
            <div>图例</div>
            <el-switch
                v-model="isLegendMap"
                active-color="#2878ff"
                inactive-color="#2878ff">
            </el-switch>
          </div>
          <div class='legendCentern'>
            <div v-for='(vI,indexvI) in legendList' :key="indexvI">
              <el-divider>{{ vI.name }}</el-divider>
              <div class='legendMsg'>
                <div v-for='(item,index) in vI.iconList' class='legendListCenter' :style='"width:"+100/vI.span+"%;"'
                     :key="index">
                  <div style='width: 18px;height: 18px;margin-right: 6px;'>
                    <img :src='item.img' style='width: 100%;'>
                  </div>
                  <span>{{ item.name }}</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>


      <div class='rightWinMain' :style='!isMenuMap?"width:5px;":"width:450px;"'>

        <div v-if='isMenuMap' class='homeSide dynamicHomeSide' @click='isMenuMap = !isMenuMap'>
          <img src='./module/icon/vector1.png' style='width: 16px;height: 16px;margin-bottom: 20px'>
          <div v-for='item in "首页"' :key="item">{{ item }}</div>
          <img src='./module/icon/jvxing1.png' style='width: 10px;height: 2px;margin-top: 20px'>
          <div class='minJiao'></div>
        </div>
        <div v-else class='homeSide idlenessHomeSide' @click='menuMapClick'>
          <img src='./module/icon/vector2.png' style='width: 22px;height: 14px;margin-bottom: 10px'>
          <div v-for='item in "项目列表"' :key="item">{{ item }}</div>
          <img src='./module/icon/jvxing2.png' style='width: 10px;height: 2px;margin-top: 10px'>
          <div class='minJiaoFFF'></div>
        </div>

        <div style='width: 100%;height: 100%;overflow: hidden;' v-show='isMenuMap'>
          <div class='legendTitle legendTitleBC'>
            <div class='ycyc' v-if='!winInfo'>{{ ifList ? '项目查询' : menuCenternMapInfo.name }}</div>
            <div v-else class='winInfoBox' @click='winInfoBack'>
              <img src='./module/icon/leftJiantou.png' style='width: 20px;height: 20px;'>
              <div>{{ winInfoName }}</div>
            </div>
            <div style='padding-left: 40px'>
              <el-switch
                  v-model="isMenuMap"
                  active-color="#2878ff"
                  inactive-color="#2878ff">
              </el-switch>
            </div>
          </div>
          <div class='menuCentern'>
            <menuCenternInfo ref="menuCenternInfo" v-if='ifList' @positionInfo='positionInfo'></menuCenternInfo>
            <itemCenterInfo ref="itemCenterInfo" v-else @titleEdit='titleEdit'></itemCenterInfo>
          </div>
        </div>
      </div>


      <div id="alertWin" style='display: none;'>
        <div class='alertWinTitle'>
          <div class='alertWinTitleIcon' style=''></div>
          <div class='alertWinTitleText'>{{ alertWinObj.properties.XMMC }}</div>
        </div>
        <div class='alertWinInfo'>
          <div class='imageMSG'>
            <img src='./module/1708501928012.jpg' style='width: 100%;'>
          </div>
          <div class='textInfoBox'>
            <div><span class='spanTitle'>建设年度：</span> <span>{{ alertWinObj.properties.DKMC }}</span></div>
            <div><span class='spanTitle'>项目编号：</span> <span>{{ alertWinObj.properties.DKMC }}</span></div>
            <div><span class='spanTitle'>建设面积：</span> <span>{{ alertWinObj.properties.DKMC }}</span></div>
            <div><span class='spanTitle'>建设工期：</span> <span>{{ alertWinObj.properties.DKMC }}</span></div>
            <div><span class='spanTitle'>建设状态：</span> <span>{{ alertWinObj.properties.DKMC }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import mapData from './module/mapData.json'
import menuCenternInfo from './menuCenternInfo.vue'
import itemCenterInfo from './itemCenterInfo.vue'

window._AMapSecurityConfig = {
  securityJsCode: '5813988a0760fdae1c1afb28100e3f92'
}

export default {
  name: 'MapMap',
  components: {menuCenternInfo, itemCenterInfo},
  data() {
    return {
      AMap: null,
      map: null,
      zoom: 15, //地图放大缩小的值
      address: '', //搜索地址

      cityPolygons: [], // 城市多边形
      alertWin: null,// 窗口
      // sliderButton:null,
      alertWinObj: {
        properties: {
          DKMC: '图斑292',
          XMMC: '2022年度江苏省南通市海岸市去趟真高标准农田建设项目（财政拨款）'
        }
      },
      // sliderValue:2024,
      marks: {},
      isBig: true,
      isLegendMap: true,
      isMenuMap: true,
      legendList: [
        {
          name: '区域说明',
          span: 3,
          iconList: [
            {
              img: require('./module/icon/rectangle3.png'),
              name: '规划',
            },
            {
              img: require('./module/icon/rectangle2.png'),
              name: '在建',
            },
            {
              img: require('./module/icon/rectangle1.png'),
              name: '验收',
            },
          ]
        },
        {
          name: '点状物工程',
          span: 2,
          iconList: [
            {
              img: require('./module/icon/dian1.png'),
              name: '塘堰(坝)',
            },
            {
              img: require('./module/icon/dian2.png'),
              name: '小型河坝',
            },
            {
              img: require('./module/icon/dian3.png'),
              name: '农用井',
            },
            {
              img: require('./module/icon/dian4.png'),
              name: '小型集雨设施',
            },
            {
              img: require('./module/icon/dian5.png'),
              name: '泵站',
            },
            {
              img: require('./module/icon/dian6.png'),
              name: '疏浚沟渠',
            },
            {
              img: require('./module/icon/dian7.png'),
              name: '渠系建筑物',
            }, {
              img: require('./module/icon/dian8.png'),
              name: '高效节能灌溉措施',
            },
            {
              img: require('./module/icon/dian9.png'),
              name: '其他水利措施',
            },

          ]
        },
        {
          name: '线状物工程',
          span: 2,
          iconList: [
            {
              img: require('./module/icon/xian1.png'),
              name: '机耕道',
            },
            {
              img: require('./module/icon/xian2.png'),
              name: '生产路',
            },
            {
              img: require('./module/icon/xian3.png'),
              name: '其他田间道路',
            },
            {
              img: require('./module/icon/xian4.png'),
              name: '衬砌明渠(沟)',
            },
            {
              img: require('./module/icon/xian5.png'),
              name: '排水暗渠(管)',
            },
          ]
        },

      ],
      menuCenternMapInfo: {},
      ifList: true,
      winInfo: false,
      winInfoName: '',
      indexxx: 0,
      iconPath: [],
    }
  },
  activated() {
    console.log(111)
    this.initMap()
    let mapWrap = document.getElementById("mapWrap")
    let alertWin = document.getElementById("alertWin")
    this.sliderButton = document.getElementsByClassName("el-slider__button")[0]

    // if(this.sliderButton)this.sliderButton.innerText = this.sliderValue
    // console.log(this.sliderButton)

    this.alertWin = alertWin
    let that = this
    mapWrap.onmousemove = function (e) {
      console.log(that.isBig)
      if (that.isBig) {
        alertWin.style.left = e.clientX - 220 + "px"
        alertWin.style.top = e.clientY - 90 + "px"
      } else {
        alertWin.style.left = e.clientX + 20 + "px"
        alertWin.style.top = e.clientY + 20 + "px"
      }

    }

  },
  created() {
    console.log(11)
    this.initMap()

    // this.marks = {}
    //  for(let i = 1990; i <= 2100; i++) {
    //    this.marks[i] = i+''
    //  }
  },

  methods: {
    leftWinMainCss() {
      if (!this.isLegendMap) return "width:0px;height:0;"
      else return "width:300px;height:430px;padding: 20px;"
    },
    winInfoBack() {
      console.log(111)
      this.winInfo = false
      this.winInfoName = ''
      if (this.$refs['itemCenterInfo']) {
        this.$refs['itemCenterInfo'].ifInfo = false
        this.$refs['itemCenterInfo'].infoId = ''
      }
    },
    titleEdit(name) {
      this.winInfo = true
      this.winInfoName = name
    },
    positionInfo(item) {
      let a = []
      item.geometry.coordinates[0].map(res => {
        a.push(new AMap.Marker({
          position: res
        }))
      })
      this.map.setFitView(a, true, [40, 40, 40, 40], 21);
      this.clearPath()
      let aa = [item.geometry.coordinates[0][0], item.geometry.coordinates[0][1]]
      this.ifList = false
      this.jignegdao(aa)
      this.shengchanlu(aa)
      this.tianjianlu(aa)
      this.chenqimingqv(aa)
      this.paishuianqv(aa)
      this.markersPoint(aa)
      this.menuCenternMapInfo = {
        name: item.properties.XMMC,
      }
    },
    /**
     * 地图左下图例
     */
    legendMapClick() {
      this.isLegendMap = true

    },
    /**
     * 地图右上菜单
     */
    menuMapClick() {
      if (this.isMenuMap) {
        this.winInfoBack()
        this.ifList = true
        this.clearPath()
      } else {
        this.isMenuMap = true
      }
    },
    /**
     * 时间轴
     * @param e
     */
    // inputInput(e){
    //   if(this.sliderButton)this.sliderButton.innerText = e
    // },
    /**
     * 图斑
     * @param res
     */
    addPolygon(res) {
      this.indexxx++
      let color = ""
      let color1 = ""
      if (this.indexxx % 3 === 0) {
        color = "#79bbff"
        color1 = "#409eff"
      }
      if (this.indexxx % 3 === 1) {
        color = "#e6a23c"
        color1 = "#ff7b00"
      }
      if (this.indexxx % 3 === 2) {
        color = "#f56c6c"
        color1 = "#ff0000"
      }
      let polygon = new this.AMap.Polygon({
        map: this.map,
        fillColor: color,
        strokeColor: color,
        fillOpacity: 0.2,
        zIndex: 99,
        path: res.geometry.coordinates,
      });


      polygon.on('mouseover', () => {
        // console.log('触发地图平移开始时的事件',res.properties.DKMC);
        // this.alertWin.style.display = "block";
        this.alertWin ? this.alertWin.style.display = "block" : '';

        this.alertWinObj = res
        // console.log( this.alertWinObj )
        polygon.setOptions({
          fillOpacity: 0.4,
          fillColor: color1,
          strokeColor: color1,

        })
      });
      polygon.on('click', () => {
        this.clearPath()
        // this.alertWin.style.display = "block";
        this.alertWin ? this.alertWin.style.display = "block" : '';
        this.alertWinObj = res
        polygon.setOptions({
          fillOpacity: 0.4,
          fillColor: color1,
          strokeColor: color1,
        })
        this.map.setFitView(polygon, true, [40, 40, 40, 40], 21);
        // console.log(res.geometry.coordinates[0])
        let aa = [res.geometry.coordinates[0][0], res.geometry.coordinates[0][1]]
        this.ifList = false
        this.jignegdao(aa)
        this.shengchanlu(aa)
        this.tianjianlu(aa)
        this.chenqimingqv(aa)
        this.paishuianqv(aa)
        this.markersPoint(aa)


        this.menuCenternMapInfo = {
          name: res.properties.XMMC,
        }

      });
      polygon.on('mouseout', () => {
        // console.log('触发地图平移开始时的事件',res.properties.DKMC);
        this.alertWin ? this.alertWin.style.display = "none" : '';
        polygon.setOptions({
          fillOpacity: 0.2,
        })
      });
    },
    /**
     * 地图初始化
     */
    initMap() {
      let that = this
      console.log(AMapLoader)
      AMapLoader.load({
        key: '04de3b1bdb3e0120292185751bbe45bb', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.AutoComplete', 'AMap.PlaceSearch', 'AMap.Geocoder', 'AMap.DistrictSearch', 'AMap.Polygon', 'AMap.TileLayer', 'AMap.ToolBar', 'AMap.ControlBar', 'AMap.Geolocation'] // 需要使用的的插件列表
      })
          .then((AMap) => {
            console.log('aaa')
            that.AMap = AMap
            that.map = new AMap.Map('container', {
              //设置地图容器id
              layers: [new AMap.TileLayer.Satellite()],
              center: [120.3050602907016, 32.451609249069215],
              zoom: 10
            })

            that.map.addControl(new AMap.ToolBar());
            that.map.addControl(new AMap.ControlBar());
            that.map.addControl(new AMap.Geolocation());
            mapData.features.forEach(res => {
              this.addPolygon(res)
            })/// 别忘了打开

            //行政区划查询
            var opts = {
              extensions: "all",
            };
            that.district = new AMap.DistrictSearch(opts);//注意：需要使用插件同步下发功能才能这样直接使用
            that.district.setLevel('district'); //行政区级别 // "province" “city” “district”
            //"320000" 江苏
            that.district.search('海安市', function (status, result) {
              // console.log(status,'statusstatusstatus')
              if (status == 'complete') {
                let bounds = result.districtList[0].boundaries
                if (bounds) {
                  for (var i = 0, l = bounds.length; i < l; i++) {
                    var polygon = new that.AMap.Polygon({
                      map: that.map,
                      strokeWeight: 3,
                      strokeColor: '#0091ea',
                      fillColor: '#80d8ff',
                      fillOpacity: 0,
                      path: bounds[i]
                    });
                    that.cityPolygons.push(polygon);
                  }
                  that.map.setFitView(null, true);//地图自适应
                }

              }
            });


          })
          .catch((e) => {
          })
    },
    // 机耕道
    jignegdao(pathList) {
      var path = [[pathList[0][0], pathList[0][1] - 0.0001], [pathList[1][0], pathList[1][1] - 0.0001]]
      var polyline1 = new AMap.Polyline({
        // 机耕道
        path: path,
        isOutline: true,
        borderWeight: 3,
        outlineColor: "#c83810",
        strokeColor: "#FFF",
        strokeWeight: 6,
        strokeOpacity: 1,
        zIndex: 100,
      })
      var polyline2 = new AMap.Polyline({
        // 机耕道
        path: path,
        zIndex: 101,
        strokeStyle: "dashed",
        strokeDasharray: [6, 2],
        strokeColor: "#c83810",
        strokeWeight: 1,
      })
      this.iconPath.push([polyline1, polyline2])
      this.map.add([polyline1, polyline2])
    },
    // 生产路
    shengchanlu(pathList) {
      var path = [[pathList[0][0], pathList[0][1] - 0.0002], [pathList[1][0], pathList[1][1] - 0.0002]]

      var polyline1 = new AMap.Polyline({
        // 机耕道
        path: path,
        isOutline: true,
        borderWeight: 3,
        outlineColor: "#6aacff",
        strokeColor: "#FFF",
        strokeWeight: 6,
        strokeOpacity: 1,
        zIndex: 100,
      })
      var polyline2 = new AMap.Polyline({
        // 机耕道
        path: path,
        zIndex: 101,
        strokeStyle: "dashed",
        strokeDasharray: [0, 0, 0],
        strokeColor: "#6aacff",
        strokeWeight: 1,
        strokeOpacity: 1,
      })
      this.iconPath.push([polyline1, polyline2])
      this.map.add([polyline1, polyline2])
    },
    // 其他田间道路
    tianjianlu(pathList) {
      var path = [[pathList[0][0], pathList[0][1] - 0.0003], [pathList[1][0], pathList[1][1] - 0.0003]]
      var polyline1 = new AMap.Polyline({
        // 机耕道
        path: path,
        strokeColor: "#02be82",
        strokeWeight: 12,
        strokeOpacity: 1,
        zIndex: 100,
      })
      var polyline2 = new AMap.Polyline({
        // 机耕道
        path: path,
        zIndex: 101,
        strokeStyle: "dashed",
        strokeDasharray: [5, 2, 5],
        strokeColor: "#FFF",
        strokeWeight: 1,
        strokeOpacity: 1,
      })
      this.iconPath.push([polyline1, polyline2])
      this.map.add([polyline1, polyline2])
    },
    // 衬砌明渠
    chenqimingqv(pathList) {
      var path = [[pathList[0][0], pathList[0][1] - 0.0004], [pathList[1][0], pathList[1][1] - 0.0004]]
      var polyline1 = new AMap.Polyline({
        // 机耕道
        path: path,
        isOutline: true,
        borderWeight: 0,
        strokeColor: "#ffb067",
        strokeWeight: 12,
        strokeOpacity: 1,
        zIndex: 100,
      })
      var polyline2 = new AMap.Polyline({
        // 机耕道
        path: path,
        zIndex: 101,
        strokeStyle: "dashed",
        strokeDasharray: [3, 6],
        strokeColor: "#FFF",
        strokeWeight: 8,
      })
      this.iconPath.push([polyline1, polyline2])
      this.map.add([polyline1, polyline2])
    },
    // 排水暗渠
    paishuianqv(pathList) {
      var path = [[pathList[0][0], pathList[0][1] - 0.0005], [pathList[1][0], pathList[1][1] - 0.0005]]
      var polyline1 = new AMap.Polyline({
        // 机耕道
        path: path,
        outlineColor: "#c1c1c1",
        strokeColor: "#c1c1c1",
        strokeWeight: 12,
        strokeOpacity: 1,
        zIndex: 100,
      })
      var polyline2 = new AMap.Polyline({
        // 机耕道
        path: path,
        zIndex: 101,
        isOutline: true,
        outlineColor: "#FFF",
        borderWeight: 2,
        strokeStyle: "dashed",
        strokeDasharray: [6, 2],
        strokeColor: "#c1c1c1",
        strokeOpacity: 1,
        strokeWeight: 4,
      })
      this.iconPath.push([polyline1, polyline2])
      this.map.add([polyline1, polyline2])
    },
    // 标记点
    markersPoint(pathList) {
      var path = [[pathList[0][0], pathList[0][1]], [pathList[1][0], pathList[1][1]]]
      let markerLL = []
      path.map((res, index) => {
        var icon = new window.AMap.Icon({
          size: new window.AMap.Size(30, 30),    // 图标尺寸
          image: require(`./module/icon/yuandian${index + 1}.png`),  // Icon的图像
          imageOffset: new window.AMap.Pixel(0, 0),  // 图像相对展示区域的偏移量，适于雪碧图等
          imageSize: new window.AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
        });

        var marker = new window.AMap.Marker({
          icon: icon,
          position: res,
          zIndex: 102,
          offset: new window.AMap.Pixel(-15, -15)
        });

        markerLL.push(marker)
        marker.on('click', () => {
          this.isMenuMap = true
          setTimeout(() => {
            this.titleEdit("设施详情")
            this.$refs['itemCenterInfo'].ifInfo = true
            this.$refs['itemCenterInfo'].infoId = '4'
          })
        })
      })

      this.iconPath.push(markerLL)
      this.map.add(markerLL)

    },
    clearPath() {
      this.iconPath.forEach((res => {
        this.map.remove(res)
      }))
    },
    handleFullscreen() {
      console.log(this.isBig, document)
      let main = document.body;
      if (!this.isBig) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        // this.isBig = true
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen();
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen();
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen();
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen();
        }
        // this.isBig = false
      }
      this.isBig = !this.isBig
    },
  },
  mounted() {
    // //各种适配的浏览器事件
    document.addEventListener('fullscreenchange', () => {
      let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
      isFullscreen = !isFullscreen;
      this.isBig = isFullscreen
    });
    document.addEventListener('mozfullscreenchange', () => {
      let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
      isFullscreen = !isFullscreen;
      this.isBig = isFullscreen
    });
    document.addEventListener('webkitfullscreenchange', () => {
      let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
      isFullscreen = !isFullscreen;
      this.isBig = isFullscreen
    });
    document.addEventListener('msfullscreenchange', () => {
      let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
      isFullscreen = !isFullscreen;
      this.isBig = isFullscreen
    });
  },
}
</script>

<style lang="less" scoped>
.map-wrap {
  width: 100VW;
  height: 100VH;
  position: fixed;
  left: 0;
  top: 0;
  //position: relative;
  overflow: hidden;
  color: #606266;
  font-size: 14px;
  background: #FFF;
}

.screenFull {
  position: absolute;
  width: 100%;
  height: 100%;

  left: 0;
  top: 0;
  z-index: 99;
  //padding: 0 6px !important;
}

#container {
  width: 100%;
  height: 100%;
  flex: 1;
}

#alertWin {
  pointer-events: none;
  position: absolute;
  left: 220px;
  top: 40px;
  width: 530px;
  background: #FFF;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 9999;
  display: flex;
  flex-direction: column;

  .alertWinTitle {
    display: flex;
    font-size: 16px;
    font-weight: 900;
    color: #5d6577;
    padding-bottom: 7px;
    margin-top: 14px;
    border-bottom: 1px #eef0f3 solid;

    .alertWinTitleIcon {
      width: 6px;
      height: 20px;
      background: #098df9;
      border-radius: 0 2px 2px 0;
      margin-right: 26px;
    }

    .alertWinTitleText {
      white-space: nowrap; /* 不换行 */
      overflow: hidden; /* 溢出部分隐藏 */
      text-overflow: ellipsis; /* 显示省略号 */
    }
  }

  .alertWinInfo {
    padding-top: 7px;
    display: flex;
    margin: 20px;
    margin-top: 0;
    color: #5d6577;

    .imageMSG {
      width: 180px;
      height: 130px;
      border-radius: 8px;
      overflow: hidden;
    }

    .textInfoBox {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 14px;
      margin-left: 20px;

      .spanTitle {
        color: #9eaabc;
      }
    }
  }

}

::v-deep {
  .amap-toolbar {
    right: auto !important;
    bottom: auto !important;
    left: 30px;
    top: 125px;
  }

  .amap-controlbar {
    top: 0px !important;
    left: 0px !important;
    transform: scale(0.7)
  }

  .amap-geolocation {
    right: auto !important;
    bottom: auto !important;
    left: 30px !important;
    top: 85px !important;
    height: 30.5px !important;
    width: 30.5px !important;
    border-radius: 8px !important;
    box-shadow: 0 0 3px rgba(0, 0, 0, .5);
  }

  .el-slider__bar {
    display: none !important;
  }

  .el-slider__stop {
    display: none !important;
  }

  .el-slider__runway {
    height: 16px;
    background: #FFF;
  }

  .el-slider__marks-text {
    margin-top: 0;
    //z-index: 1001;
    font-size: 10px !important;
    top: 3px;
  }

  .el-slider__button {
    width: 30px;
    height: 30px;
    //border-radius: 0;
    border: #FFF;
    background: #2878ff;
    background: url('~./module/icon/zhou.png') center center no-repeat;
    //background-size: cover; /* 拉伸并填充至元素内部 */
    border: #FFF solid 1px;
    border-radius: 5px;
    overflow: hidden;

    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
  }

  .el-slider__button-wrapper {
    top: -9px;

  }

  .mapIcon {
    position: absolute;
    width: 30.5px;
    height: 30.5px;
    background: #FFF;
    border-radius: 5px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .blowButton {
    left: 28px;
    top: 210px;

  }

  .legendMap {
    left: 28px;
    bottom: 35px;
  }

  //.el-slider__runway
}

.leftWinMain {
  position: absolute;
  left: 28px;
  bottom: 35px;
  z-index: 99;
  background: #FFF;
  transition: width 0.5s, height 0.5s;
  overflow: hidden;
  border-radius: 6px;


}

.rightWinMain {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
  background: #FFF;
  z-index: 1001;
  transition: width 0.5s;
  width: 0%;
  //overflow: hidden;
}

.legendTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  font-size: 14px;

}

.legendTitleBC {
  font-size: 16px;
  font-weight: 900;
  padding: 16px;
  height: 28px;
}

.legendMsg {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .legendListCenter {
    display: flex;
    margin: 4px 0;
    align-items: center;
  }
}

.legendCentern {
  overflow: auto;
  height: calc(100% - 8px);
  color: #606266;
  font-size: 14px;
}

.menuCentern {
  overflow: hidden;
  height: calc(100% - 68px);
  color: #606266;
  font-size: 14px;
}

.homeSide {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  width: 30px;
  height: 120px;
  position: absolute;
  left: -30px;
  background: #2878ff;
  top: 15px;
  font-size: 16px;
  color: #FFF;
  cursor: pointer;
}

.dynamicHomeSide {
  background: #2878ff;
  color: #FFF;
}

.idlenessHomeSide {
  background: #FFF;
  color: #606266;
  padding: 10px 0 ;

}

.minJiao {
  position: absolute;
  bottom: -19px;
  right: 0px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 16px solid #2878ff;
  border-bottom: 10px solid transparent;
  border-top: 10px solid #2878ff;
}

.minJiaoFFF {
  position: absolute;
  bottom: -19px;
  right: 0px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 16px solid #FFF;
  border-bottom: 10px solid transparent;
  border-top: 10px solid #FFF;
}

.ycyc {
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 溢出部分隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
}

.winInfoBox {
  display: flex;
  align-items: center;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  //width: 100%;
}

//.winInfoBox:hover{
//  background: #f1f6ff;
//}
</style>
