<template>
  <div class="claim">
    <div class="top">
      <span class="logo">
        <img src="../assets/logo.png" alt>
      </span>
      <h2>保险理赔数据</h2>
    </div>
    <div id="chart"></div>
  </div>
</template>

<script>
/* eslint-disable */
import echarts from "echarts";
import axios from "axios";
import china from "../assets/common/china.json";
echarts.registerMap("china", china);
import { resetFont, PI } from "../assets/common/common.js";
import { setTimeout } from 'timers';
// 基于准备好的dom，初始化echarts实例
export default {
  data() {
    return {
      datamap: {},
      geoCoordMap: {
        北京市: [116.405, 39.905],
        天津市: [117.190182, 39.125596],
        上海市: [121.48, 31.22],
        重庆市: [106.504962, 29.533155],
        河北省: [114.502461, 38.045474],
        山西省: [112.549248, 37.857014],
        辽宁省: [123.429096, 41.796767],
        吉林省: [125.3245, 43.886841],
        黑龙江省: [126.642464, 45.756967],
        江苏省: [118.767413, 32.041544],
        浙江省: [120.153576, 30.287459],
        安徽省: [117.283042, 31.86119],
        福建省: [119.306239, 26.075302],
        江西省: [115.892151, 28.676493],
        山东省: [117.000923, 36.675807],
        河南省: [113.665412, 34.757975],
        湖北省: [114.298572, 30.584355],
        湖南省: [112.982279, 28.19409],
        广东省: [113.280637, 23.125178],
        海南省: [110.33119, 20.031971],
        四川省: [104.065735, 30.659462],
        贵州省: [106.713478, 26.578343],
        云南省: [102.712251, 25.040609],
        陕西省: [108.948024, 34.263161],
        甘肃省: [103.823557, 36.058039],
        青海省: [101.778916, 36.623178],
        内蒙古自治区: [111.670801, 40.818311],
        广西壮族自治区: [108.320004, 22.82402],
        西藏自治区: [91.132212, 29.660361],
        宁夏回族自治区: [106.278179, 38.46637],
        新疆维吾尔自治区: [87.617733, 43.792818],
        台湾省: [121.509062, 25.044332],
        香港特别行政区: [114.173355, 22.320048],
        澳门特别行政区: [113.54909, 22.198951],
      },
      comData: [],
      symbolSizeNum:10,
      runIndex: 0,
      autoPlay: true
    };
  },
  computed:{
    mapOption(){
        return { 
        backgroundColor: "rgba(255,255,255,0)",
        tooltip: {
          trigger: "item",
          alwaysShowContent: true,
          triggerOn: "mousemove",
          backgroundColor: "#02249f"
        },
        geo: {
          map: "china",
          roam: false,
          zoom:1.20,
          label: {
            normal: {
              show: true,
              formatter: (params)=>{
                console.log("params", params)
                return params.status+"\n"+params.name+"=>"
              },
              textStyle: {
                color: "rgba(0,46,94,1)"
              }
            },
            emphasis: {
              areaColor: "rgba(222,0,0,0.8)",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              textStyle: {
                color: "rgba(255,255,255,0.9)"
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: "rgb(93,189,223)",
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              areaColor: "rgba(84,127,193,1)",
              shadowOffsetX: 6,
              shadowOffsetY: 6,
              shadowBlur: 2,
              borderWidth: 0,
              shadowColor: "rgba(0, 98, 177, 0.9)"
            }
          }
        },
        //配置属性
        series: [
          {
            name: "理赔",
            type: "map",
            mapType: "china",
            geoIndex: 0,
            itemStyle: {
              normal:{
                show:true,
                color:"rgba(255,0,0,0)",
              },
              // 选中省份区域的样式
              emphasis: {
              }
            },
            label: {
              normal: {
                show: true, //省份名称
                textStyle: {
                  color: "rgba(255,46,94,1)"
                },
                formatter: "{b}\n{a}",
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { name: "北京", value: 12 },
              { name: "天津", value: 10 },
              { name: "上海", value: 16 },
              { name: "重庆", value: 68 },
              { name: "河北", value: 95 },
              { name: "河南", value: 88 },
              { name: "云南", value: 34 },
              { name: "辽宁", value: 64 },
              { name: "黑龙江", value: 79 },
              { name: "湖南", value: 34 },
              { name: "安徽", value: 56 },
              { name: "山东", value: 65 },
              { name: "新疆", value: 21 },
              { name: "江苏", value: 24 },
              { name: "浙江", value: 27 },
              { name: "江西", value: 28 },
              { name: "湖北", value: 26 },
              { name: "广西", value: 56 },
              { name: "甘肃", value: 58 },
              { name: "山西", value: 59 },
              { name: "内蒙古", value: 48 },
              { name: "陕西", value: 40 },
              { name: "吉林", value: 20 },
              { name: "福建", value: 12 },
              { name: "贵州", value: 14 },
              { name: "广东", value: 15 },
              { name: "青海", value: 19 },
              { name: "西藏", value: 54 },
              { name: "四川", value: 75 },
              { name: "宁夏", value: 85 },
              { name: "海南", value: 86 },
              { name: "台湾", value: 83 },
              { name: "香港", value: 82 },
              { name: "澳门", value: 81 }
            ]
          },
          {
            name:'增量',
            type: 'scatter',
            coordinateSystem: 'geo',
            geoIndex: 0,
            data: this.convertData(this.comData),
            symbolSize: (rawValue, params) => {
              if(rawValue instanceof Array){
                if(rawValue[2]<=10){
                  params.symbolSize = 20;
                }else if(rawValue[2]<= 100){
                  params.symbolSize = 40;
                }else if(rawValue[2] > 100){
                  params.symbolSize = 120;
                }
              }else{
                params.symbolSize = 0;
              }
              return params.symbolSize
            },
            symbol: "pin",
            symbolRotate: 0,
            label: {
              normal: {
                formatter: (params)=>{
                  return params.seriesName+"\n"+params.name+"=>"+params.value[2]
                },
                color: "#fff",
                position: [10,10],
                show: true
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: "#02249f",
              }
            },
            tooltip: {
              show:false
            }
          }
        ]
      }
    }
  },
  mounted() {
    var self = this;
    this.datamap = echarts.init(document.getElementById("chart"));
    setTimeout(()=>{
      this.drawLine();

    },200)
    setInterval(()=>{
      Math.random()>2? this.comData = []:this.comData=[
        { name: "北京市", value: 30 },
        { name: "天津市", value: 8 },
        { name: "上海市", value: 2050 }
      ]
      setTimeout(()=>{
        this.comData = [];
        this.datamap.setOption(this.mapOption);
      },3000)
      // console.log("comData", this.comData);
      this.datamap.setOption(this.mapOption);
    },30000)
  },
  methods: {
    randomData() {
      return Math.round(Math.random() * 500);
    },
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
        res.push({ name: data[i].name });
      }
      return res;
    },
    drawLine() {
      // 绘制图表
      this.datamap.setOption(this.mapOption);
      this.datamap.on("click", function(params) {
        console.log(params); //此处写点击事件内容
      });
      this.datamap.on("mouseover", params => {
        console.log("停止循环"); //此处写点击事件内容
        this.autoPlay = false;
      });
      this.datamap.on("mouseout", params => {
        console.log("开始循环"); //此处写点击事件内容
        this.autoPlay = true;
      });
      setInterval(() => {
        //使得tootip每隔三秒自动显示
        if (this.autoPlay) {
          this.datamap.dispatchAction({
            type: "showTip", // 根据 tooltip 的配置项显示提示框。
            seriesIndex: 0,
            dataIndex: this.runIndex
          });
          this.runIndex++;
          // mapOption.series[0].data.length 是已报名纵坐标数据的长度
          if (this.runIndex > this.mapOption.series[0].data.length) {
            this.runIndex = 0;
          }
        } else{
          return;
        }
      }, 3000);
    }
  }
};
</script>

<style lang="scss" scoped>
.claim {
  width: 100%;
  height: 100%;
  .top {
    padding: 0;
    margin: 0;
    .logo {
      display: inline-block;
      img {
        margin-left: 50px;
        width: 110px;
      }
    }
    h2 {
      font-size: 0.6rem;
      padding: 0;
      margin: 0;
      margin-left: 80px;
      margin-top: 15px;
      color: #fff;
      display: inline-block;
      vertical-align: top;
    }
  }
  #chart {
    margin-left: 420px;
    position: absolute;
    top: 20px;
    width: 1450px;
    height: 1050px;
  }
}
</style>




        // { name: "北京市", value: 29 },
        // { name: "天津市", value: 16 },
        // { name: "上海市", value: 25 },
        // { name: "重庆市", value: 15 },
        // { name: "河北省", value: 12 },
        // { name: "山西省", value: 9 },
        // { name: "辽宁省", value: 11 },
        // { name: "吉林省", value: 16 },
        // { name: "黑龙江省", value: 16 },
        // { name: "江苏省", value: 19 },
        // { name: "浙江省", value: 29 },
        // { name: "安徽省", value: 4 },
        // { name: "福建省", value: 6 },
        // { name: "江西省", value: 7 },
        // { name: "山东省", value: 17 },
        // { name: "河南省", value: 15 },
        // { name: "湖北省", value: 14 },
        // { name: "湖南省", value: 13 },
        // { name: "广东省", value: 11 },
        // { name: "海南省", value: 4 },
        // { name: "四川省", value: 9 },
        // { name: "贵州省", value: 5 },
        // { name: "云南省", value: 3 },
        // { name: "陕西省", value: 6 },
        // { name: "甘肃省", value: 9 },
        // { name: "青海省", value: 10 },
        // { name: "内蒙古自治区", value: 3 },
        // { name: "广西壮族自治区", value: 7 },
        // { name: "西藏自治区", value: 5 },
        // { name: "宁夏回族自治区", value: 4 },
        // { name: "新疆维吾尔自治区", value: 5 },
        // { name: "台湾省", value: 2 },
        // { name: "香港特别行政区", value: 1 },
        // { name: "澳门特别行政区", value: 1 },



        // size

        // (rawValue, params) => {
        //       if(rawValue instanceof Array){
        //         if(rawValue[2]<=10){
        //           params.symbolSize = 20;
        //         }else if(rawValue[2]<= 100){
        //           params.symbolSize = 40;
        //         }else if(rawValue[2] > 100){
        //           params.symbolSize = 80;
        //         }
        //       }else{
        //         params.symbolSize = 0;
        //       }
        //       return params.symbolSize
        //     }