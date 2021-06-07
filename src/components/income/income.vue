<template>
  <div class="box">
    <el-select v-model="value" placeholder="请选择" style="margin-right:20px" @change="yearChange()">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <el-select v-model="value1" placeholder="请选择" v-show="value == 2" @change="mouthChange()">
      <el-option
        v-for="item in options1"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div id="income"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import axios from 'axios'
export default {
  data(){
    return {
      options:[
        {value:1,label:'年份'},
        {value:2,label:'月份'}
      ],
      options1:[
        {value:1,label:'一月'},
        {value:2,label:'二月'},
        {value:3,label:'三月'},
        {value:4,label:'四月'},
        {value:5,label:'五月'},
        {value:6,label:'六月'},
        {value:7,label:'七月'},
        {value:8,label:'八月'},
        {value:9,label:'九月'},
        {value:10,label:'十月'},
        {value:11,label:'十一月'},
        {value:12,label:'十二月'},
      ],
      value:1,
      value1:'',
      date:[],
      result:[]
    }
  },
  methods:{
    init:function(url){
      axios({
              method: "GET",    //请求方式
              url: url,    //请求地址
          }).then(res => {
              this.date = res.data.data
              console.log(this.date,"日期");
              this.result = res.data.result
              //请求成功
              this.chartLine = echarts.init(document.getElementById("income"));
              // 指定图表的配置项和数据
              var option = {
                title: {
                  text: "探周边订单销量",
                  /* subtext: '纯属虚构',*/
                  x: "center",
                },
                xAxis: {
                  type: "category",
                  name : '日期',
                  data: this.date
                },
                dataZoom: [
                  {
                    type: "slider",
                    show: true,
                    xAxisIndex: [0],
                    left: "9%",
                    bottom: -5,
                    start: 10,
                    end: 90, //初始化滚动条
                  },
                ],
                yAxis: {
                  type: "value",
                  name : '收益金额（元）',
                },
                series: [
                  {
                    data: this.result,
                    type: "bar",
                    barWidth: 30, //设置柱状图宽度
                    itemStyle: {
                      normal: {
                        label: {
                          show: true, //开启显示
                          position: "top", //在上方显示
                          textStyle: {
                            //数值样式
                            color: "black",
                            fontSize: 16,
                          },
                        },
                      },
                    },
                  },
                ],
              };
              // 使用刚指定的配置项和数据显示图表。
              this.chartLine.setOption(option);
            })
    },
    mouthChange:function(){
      if(localStorage.type === '管理员') {
       this.init(`/api/backGround/income/adminMouth?mouth=${this.value1}`)
      }else {
        this.init(`/api/backGround/income/restaurantMouth?mouth=${this.value1}&id=${localStorage._id}`)
      }
    },
    yearChange:function(){
      if(localStorage.type === '管理员') {
         if(this.value == 1) {
          this.init('/api/backGround/income/adminYear')
        }
      }else {
        if(this.value == 1) {
          this.init(`/api/backGround/income/restaurantYear?id=${localStorage._id}`)
        }
      }
     
    }
  },
  mounted() {
    if(localStorage.type === '管理员') {
       this.init('/api/backGround/income/adminYear')
    }else {
       this.init(`/api/backGround/income/restaurantYear?id=${localStorage._id}`)
    }
  },
};
</script>
<style lang="less" scoped>
.box {
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
}
#income {
  padding: 20px;
  box-sizing: border-box;
  width: 90%;
  height: 70vh;
}
</style>
