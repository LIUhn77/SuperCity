// import Echart from "echarts/lib/echarts";
// import "echarts/lib/chart/pie";
// import "echarts/lib/chart/bar";
// import "echarts/lib/chart/line";
// import "echarts/lib/component/tooltip";
// import "echarts/lib/component/legend";
// import "echarts/lib/component/title";
// import "echarts/lib/component/legendScroll";
import * as Echart from "echarts";
/**
 * 通用颜色(设置echart图表颜色)
 */
let commonColor = ["#12B7F5","#53C68C","#FFB423","#EB464D","#2E75B6","#71BE83","#E9E29C"];
let CGpieColor = ['#839bff','#ff53a1','#4af8b4','#7067FF','#2BA7FF','#FF8B8B','#71C8FF','#75ABFF','#7B6BFF','#2BAD62','#FFF646','#FF85A0','#259DF1','#FFB94B','#D8C2C2','#ACE091','#DE84FF','#9AD4FF','#B7B7B7','#60E3FF','#FA961E']

/**
 * 通用饼图
 * @param {string} domId 图表绑定的DOM元素的ID
 * @param {any} legend 图例数据
 * @param {any} data 值数据
 * @param {string} seriesName 系列名
 * @param {string} unit 单位
 */
function getPieChart(domId,legend,data,seriesName,unit){
    let mychart = Echart.init(document.getElementById(domId));
    let option = {
        color:commonColor,
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}"+unit+"({d}%)"
        },
        legend: {
            type: 'scroll',
            x: '70%',
            y: 'center',
            orient:'vertical',
            data:legend,
            textStyle:{
                fontSize:12,
                color:'#1890ff'
            },
            itemGap:25,
            itemWidth:12,
            itemHeight:12,
            pageIconSize:10,
            pageIconColor:'#1089ff'
            // formatter:(name)=>{
            //     return name + '\n\n' + data.filter(item=>item.name==name)[0].value+unit;
            // }
        },
        series: [
            {
                name:seriesName,
                type:'pie',
                radius: ['40%', '60%'],
                center: ['30%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        fontSize:12,
                        formatter:"{b}\n{c}"+unit+"({d}%)"
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:data
            }
        ]
    };
    mychart.setOption(option);
}

/**
 * 通用柱形图
 * @param {string} domId 图表绑定的DOM元素的ID
 * @param {any} legend 图例数据
 * @param {any} xdata X轴数据
 * @param {any} ydata Y轴数据
 * @param {any} grid 设置图表的边距及大小
 * @param {string} unit 单位
 */
function getBarChart(domId,legend,xdata,ydata,grid,unit){
    let mychart = Echart.init(document.getElementById(domId));
    let option = {
        color:commonColor,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter:(params)=>{
                let rStr = "";
                if(params.length!=undefined){
                    params.map((item,i)=>{
                        if(i==0){
                            rStr+=item.name;
                        }
                        if(i>=0){
                            rStr+="<br/>";
                        }
                        rStr+=item.seriesName+":"+item.data+unit;
                    })
                }
                else{
                    rStr+=item.name+"<br/>";
                    rStr+=item.seriesName+":"+item.data+unit;
                }
                return rStr;
            }
        },
        legend: {
            x: '75%',
            y: 'top',
            data:legend,
            textStyle:{
                fontSize:12
            },
            itemWidth:12,
            itemHeight:12
        },
        grid:grid,
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                data: xdata,
                axisLabel:{
                    fontSize:12,
                    rotate:35,
                    color:'#666'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name:'单位：'+unit,
                axisLabel:{
                    fontSize:12,
                    color:'#666'
                },
                nameTextStyle:{
                    color:'#999'
                }
            }
        ],
        series: function(){
            let series = [];
            legend.forEach((item,index)=>{
                series.push(
                    {
                        name:item,
                        type:'bar',
                        data:ydata[index],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                fontSize:12,
                                color:commonColor[index],
                                formatter:"{c}"
                            }
                        },
                        barCategoryGap:'50%'
                    }
                );
            });
            return series;
        }()
    };
    mychart.setOption(option);
}

/**
 * 通用折线图
 * @param {string} domId 图表绑定的DOM元素的ID
 * @param {any} legend 图例数据
 * @param {any} xdata X轴数据
 * @param {any} ydata Y轴数据
 * @param {any} grid 设置图表的边距及大小
 * @param {string} unit 单位
 */


function getLineChart(domId,legend,xdata,ydata,grid,unit){
    let mychart = Echart.init(document.getElementById(domId));
    let option = {
        color:commonColor,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter:(params)=>{
                let rStr = "";
                if(params.length!=undefined){
                    params.map((item,i)=>{
                        if(i==0){
                            rStr+=item.name.replace(/\n/g,"");
                        }
                        if(i>=0){
                            rStr+="<br/>";
                        }
                        rStr+=item.seriesName+":"+item.data+unit;
                    })
                }
                else{
                    rStr+=item.name+"<br/>";
                    rStr+=item.seriesName+":"+item.data+unit;
                }
                return rStr;
            }
        },
        legend: {
            x: '75%',
            y: 'top',
            data:legend,
            textStyle:{
                fontSize:12
            },
            itemWidth:12,
            itemHeight:12
        },
        grid:grid,
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                offset:15,
                data: function(){
                    let x = [];
                    xdata.map(item=>{
                        let num = 0;
                        let snum = 0;
                        let changeNum = 3;//每到N个长度进行换行
                        if((item.length/changeNum)==parseInt(item.length/changeNum)){
                            num = parseInt(item.length/changeNum);
                            snum = changeNum;
                        }
                        else{
                            num = parseInt(item.length/changeNum) + 1;
                            snum = parseInt(item.length%changeNum);
                        }
                        if(item.length>changeNum){
                            let xname = "";
                            for(let i=0;i<num;i++){
                                if(i>0){
                                    xname+='\n';
                                }
                                if(i==num-1){
                                    xname+=item.substr(i*changeNum,snum);
                                }
                                else{
                                    xname+=item.substr(i*changeNum,changeNum);
                                }
                            }
                            x.push(xname);
                        }
                        else{
                            x.push(item);
                        }
                    })
                    return x;
                }(),
                axisLabel:{
                    fontSize:12,
                    rotate:35,
                    color:'#666'
                },
                boundaryGap: false
            }
        ],
        yAxis: [
            {
                type: 'value',
                name:'单位：'+unit,
                axisLabel:{
                    fontSize:12,
                    color:'#666'
                },
                nameTextStyle:{
                    color:'#999'
                }
            }
        ],
        visualMap: {
            show:false,
            pieces: [
              {
                gt: 0,
                lte: 10,
                color: "#93CE07",
              },
              {
                gt: 10,
                lte: 20,
                color: "#FBDB0F",
              },
              {
                gt: 20,
                lte: 30,
                color: "#FC7D02",
              },
              {
                gt: 30,
                lte: 40,
                color: "#FD0100",
              },
              {
                gt: 40,
                lte: 50,
                color: "#AA069F",
              },
              {
                gt: 50,
                color: "#AC3B2A",
              },
            ],
            outOfRange: {
              color: "#999",
            },
          },
        series: function(){
            let series = [];
            legend.forEach((item,index)=>{
                series.push(
                    {
                        name:item,
                        type:'line',
                        data:ydata[index],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                fontSize:12,
                                color:commonColor[index],
                                formatter:"{c}"
                            }
                        },
                        barCategoryGap:'50%',
                        // areaStyle:{
                        //     color: {
                        //         type: 'linear',
                        //         x: 0,
                        //         y: 0,
                        //         x2: 0,
                        //         y2: 1,
                        //         colorStops: [{
                        //             offset: 0, color: '#3373FD' // 0% 处的颜色
                        //         },{
                        //             offset: 0.5, color: '#90B1FC' // 50% 处的颜色
                        //         }, {
                        //             offset: 1, color: '#C2D3F9' // 100% 处的颜色
                        //         }],
                        //         global: false // 缺省为 false
                        //     }
                        // }
                    }
                );
            });
            return series;
        }()
    };
    mychart.setOption(option);
    return mychart;
}


/**
 * 城管部件饼图
 * @param {string} domId 图表绑定的DOM元素的ID
 * @param {any} data 值数据
 * @param {string} seriesName 系列名
 * @param {string} unit 单位
 */
function getCGPieChart(domId,data,seriesName,unit){
    let mychart = Echart.init(document.getElementById(domId));
    let option = {
        color:CGpieColor,
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}"+unit+"({d}%)"
        },
        series: [
            {
                name:seriesName,
                minAngle: 20,  
                type:'pie',
                radius: '50%',
                center: ['50%', '50%'],
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: true,                        
                        fontSize:12,
                        formatter:"{b}\n{c}({d}%)"
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '15',
                            fontWeight: 'bold'
                        }
                    }
                },
                
                data:data
            }
        ]
    };
    mychart.setOption(option);
}

/**
 * 城管城市部件数统计折线图
 * @param {string} domId 图表绑定的DOM元素的ID
 * @param {any} legend 图例数据
 * @param {any} xdata X轴数据
 * @param {any} ydata Y轴数据
 * @param {any} grid 设置图表的边距及大小
 * @param {string} unit 单位
 */
function getCGLineChart(domId,legend,xdata,ydata,grid,unit){
    let mychart = Echart.init(document.getElementById(domId));
    let option = {
        color:commonColor,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter:(params)=>{
                let rStr = "";
                if(params.length!=undefined){
                    params.map((item,i)=>{
                        if(i==0){
                            rStr+=item.name.replace('\n',"");
                        }
                        if(i>=0){
                            rStr+="<br/>";
                        }
                        rStr+=item.seriesName+":"+item.data+unit;
                    })
                }
                else{
                    rStr+=item.name+"<br/>";
                    rStr+=item.seriesName+":"+item.data+unit;
                }
                return rStr;
            }
        },
        // legend: {
        //     x: '75%',
        //     y: 'top',
        //     data:legend,
        //     textStyle:{
        //         fontSize:12
        //     },
        //     itemWidth:12,
        //     itemHeight:12
        // },
        grid:grid,
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                data: function(){
                    let x = [];
                    xdata.map(item=>{
                        let num = 0;
                        let snum = 0;
                        let changeNum = 8;//每到N个长度进行换行
                        if((item.length/changeNum)==parseInt(item.length/changeNum)){
                            num = parseInt(item.length/changeNum);
                            snum = changeNum;
                        }
                        else{
                            num = parseInt(item.length/changeNum) + 1;
                            snum = parseInt(item.length%changeNum);
                        }
                        if(item.length>changeNum){
                            let xname = "";
                            for(let i=0;i<num;i++){
                                if(i>0){
                                    xname+='\n';
                                }
                                if(i==num-1){
                                    xname+=item.substr(i*changeNum,snum);
                                }
                                else{
                                    xname+=item.substr(i*changeNum,changeNum);
                                }
                            }
                            x.push(xname);
                        }
                        else{
                            x.push(item);
                        }
                    })
                    return x;
                }(),
                axisLabel:{                    
                    fontSize:12,
                    rotate:35,
                    color:'#666'
                },
                boundaryGap: true
            }
        ],
        yAxis: [
            {
                type: 'value',
                name:'单位：'+unit,
                axisLabel:{
                    fontSize:12,
                    color:'#666'
                },
                nameTextStyle:{
                    color:'#999',
                    padding:[0,0,0,50]
                }
            }
        ],
        series: function(){
            let series = [];
            legend.forEach((item,index)=>{
                series.push(
                    {
                        name:item,
                        symbol: 'circle',
                        type:'line',
                        symbolSize: 4,   //折线点的大小
                        itemStyle: {
                            normal: {
                              color: "#573AFE",//折线点的颜色
                              lineStyle: {
                              color: "#573AFE"//折线的颜色
                             }
                           }
                        },
                        data:ydata[index],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                fontSize:12,
                                color:"#573AFE",
                                formatter:"{c}"
                            }
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#573AFE' // 0% 处的颜色
                                },{
                                    offset: 0.5, color: '#C8DCF9' // 50% 处的颜色
                                }, {
                                    offset: 1, color: '#DBFAF8' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    }
                );
            });
            return series;
        }()
    };
    mychart.setOption(option);
}

/**
 * 城管部件损坏数量柱状图
 * @param {string} domId 图表绑定的DOM元素的ID
 * @param {any} xdata X轴数据
 * @param {any} ydata Y轴数据
 * @param {any} grid 设置图表的边距及大小
 * @param {string} unit 单位
 */
function getCGBarChart(domId,xdata,ydata,grid,unit){
    let mychart = Echart.init(document.getElementById(domId));
    let option = {
        color:commonColor,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            // formatter:(params)=>{
            //     let rStr = "";
            //     if(params.length!=undefined){
            //         params.map((item,i)=>{
            //             if(i==0){
            //                 rStr+=item.name;
            //             }
            //             if(i>=0){
            //                 rStr+="<br/>";
            //             }
            //             rStr+=item.seriesName+":"+item.data+unit;
            //         })
            //     }
            //     else{
            //         rStr+=item.name+"<br/>";
            //         rStr+=item.seriesName+":"+item.data+unit;
            //     }
            //     return rStr;
            // }
        },
        grid:grid,
        // calculable: true,
        xAxis: [
            {
                position: 'top',
                type: 'value',
                axisTick:{       //y轴刻度线
                    "show":false
                  },
                  //设置网格线颜色
                splitLine: {
                    show: true,
                    lineStyle:{
                        color: ['#F8F8FF'],
                        width: 1,
                        type: 'solid'
                    }
            　　},
                axisLabel:{
                    fontSize:12,
                    color:'#666'
                },
                axisLine:{
                    lineStyle:{
                        color:'#F8F8FF',
                    }
                }
            }
        ],
        yAxis: [
            {
                
                name:'单位：'+unit,
                type: 'category',
                data:ydata,
                axisTick:{       //y轴刻度线
                    "show":false
                  },
                axisLabel:{
                    fontSize:12,
                    color:'#666'
                },
                axisLine:{
                    lineStyle:{
                        color:'#F8F8FF',
                    }
                },
                

            }
        ],
        series:[{
            // show:false,
            type:'bar',           
            data:xdata,
            barCategoryGap:'0',/*多个并排柱子设置柱子之间的间距*/
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    fontSize:12,
                    color:"#999",
                    formatter:"{c} {b}"
                }
            },
            color: function(params) { 
                　//首先定义一个数组 
                var colorList = ['#98E9FF','#FFA765']; 
                if(params.dataIndex % 2 == 0){
                    return colorList[0]
                }else{                    
                    return colorList[1]
                }                 
            },
        }]        
    };
    mychart.setOption(option);
}
function getAJBarChart(domId,legend,xdata,ydata,grid,unit,color){
    let mychart = Echart.init(document.getElementById(domId));
    let option = {
        color:color,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter:(params)=>{
                let rStr = "";
                if(params.length!=undefined){
                    if(params[0].name.indexOf("20") == '0'){
                        params.map((item,i)=>{
                            if(i==0){
                                rStr+=item.name;
                            }
                            if(i>=0){
                                rStr+="<br/>";
                            }
                            rStr+=item.seriesName+":"+item.data+unit+"<br/>";
                        })
                    }else {
                        params.map((item,i)=>{
                            if(i==0){
                                rStr+=item.name;
                            }
                            if(i>=0){
                                rStr+="<br/>";
                            }
                            rStr+=item.seriesName+":"+item.data+unit+"<br/>";
                            rStr+="统计区间：2019-01至2020-04";
                        })
                    }
                }
                else{
                    rStr+=item.name+"<br/>";
                    rStr+=item.seriesName+":"+item.data+unit;
                }
                return rStr;
            }
        },
        legend: {
            x: '75%',
            y: 'top',
            data:legend,
            textStyle:{
                fontSize:12
            },
            itemWidth:12,
            itemHeight:12
        },
        grid:grid,
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                data: xdata,
                axisLabel:{
                    interval:0,
                    fontSize:12,
                    rotate:35,
                    color:'#666'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name:'单位：'+unit,
                axisLabel:{
                    fontSize:12,
                    color:'#666'
                },
                nameTextStyle:{
                    color:'#999'
                }
            }
        ],
        series: function(){
            let series = [];
            legend.forEach((item,index)=>{
                series.push(
                    {
                        name:item,
                        type:'bar',
                        data:ydata[index],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                fontSize:12,
                                color:color,
                                formatter:"{c}"
                            }
                        },
                        barCategoryGap:'50%'
                    }
                );
            });
            return series;
        }()
    };
    mychart.setOption(option);
}

/**
 * 村改农资分析柱形图
 * @param {string} domId 图表绑定的DOM元素的ID
 * @param {any} legend 图例数据
 * @param {any} xdata X轴数据
 * @param {any} ydata Y轴数据
 * @param {any} grid 设置图表的边距及大小
 * @param {string} unit 单位
 */
function getBarChartAPS(domId,legend,xdata,ydata,grid,unit){
    let mychart = Echart.init(document.getElementById(domId));
    let option = {
        color:commonColor,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter:(params)=>{
                let rStr = "";
                if(params.length!=undefined){
                    params.map((item,i)=>{
                        if(i==0){
                            rStr+=item.name;
                        }
                        if(i>=0){
                            rStr+="<br/>";
                        }
                        rStr+=item.seriesName+":"+item.data+unit;
                    })
                }
                else{
                    rStr+=item.name+"<br/>";
                    rStr+=item.seriesName+":"+item.data+unit;
                }
                return rStr;
            }
        },
        legend: {
            x: '75%',
            y: 'top',
            data:legend,
            textStyle:{
                fontSize:12
            },
            itemWidth:12,
            itemHeight:12
        },
        grid:grid,
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                data: xdata,
                axisLabel:{
                    fontSize:12,
                    rotate:35,
                    color:'#666'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name:'单位：'+unit,
                axisLabel:{
                    fontSize:12,
                    color:'#666'
                },
                nameTextStyle:{
                    color:'#999'
                }
            }
        ],
        series: function(){
            let series = [];
            legend.forEach((item,index)=>{
                series.push(
                    {
                        name:item,
                        type:'bar',
                        data:ydata[index],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                fontSize:12,
                                color:"#EB464D",
                                formatter:"{c}"
                            }
                        },
                        barCategoryGap:'50%',
                        itemStyle:{
                            normal:{
                                color:"#EB464D",
                            }
                        }
                    }
                );
            });
            return series;
        }()
    };
    mychart.setOption(option);
}

function getTyphoonSpeedChart(domId,legend,xdata,ydata,grid,unit){
    let mychart = Echart.init(document.getElementById(domId));
    let option = {
        color:commonColor,
        animationDuration:3000,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter:(params)=>{
                let rStr = "";
                if(params.length!=undefined){
                    params.map((item,i)=>{
                        if(i==0){
                            rStr+=item.name.replace(/\n/g,"");
                        }
                        if(i>=0){
                            rStr+="<br/>";
                        }
                        rStr+=item.seriesName+":"+item.data+unit;
                    })
                }
                else{
                    rStr+=item.name+"<br/>";
                    rStr+=item.seriesName+":"+item.data+unit;
                }
                return rStr;
            }
        },
        legend: {
            x: '75%',
            y: 'top',
            data:legend,
            textStyle:{
                fontSize:12
            },
            itemWidth:12,
            itemHeight:12
        },
        grid:grid,
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: {show: true},
                offset:15,
                data: function(){
                    let x = [];
                    xdata.map(item=>{
                        let num = 0;
                        let snum = 0;
                        let changeNum = 3;//每到N个长度进行换行
                        if((item.length/changeNum)==parseInt(item.length/changeNum)){
                            num = parseInt(item.length/changeNum);
                            snum = changeNum;
                        }
                        else{
                            num = parseInt(item.length/changeNum) + 1;
                            snum = parseInt(item.length%changeNum);
                        }
                        if(item.length>changeNum){
                            let xname = "";
                            for(let i=0;i<num;i++){
                                if(i>0){
                                    xname+='\n';
                                }
                                if(i==num-1){
                                    xname+=item.substr(i*changeNum,snum);
                                }
                                else{
                                    xname+=item.substr(i*changeNum,changeNum);
                                }
                            }
                            x.push(xname);
                        }
                        else{
                            x.push(item);
                        }
                    })
                    return x;
                }(),
                axisLabel:{
                    fontSize:10,
                    rotate:35,
                    color:'#666',
                },
                boundaryGap: false
            }
        ],
        yAxis: [
            {
                type: 'value',
                name:'单位：'+unit,
                axisLabel:{
                    fontSize:12,
                    color:'#666'
                },
                nameTextStyle:{
                    color:'#999'
                }
            }
        ],
        visualMap: {
            show:false,
            pieces: [
              {
                gt: 10.8,
                lte: 17.1,
                color: "#00D5CB",
              },
              {
                gt: 17.1,
                lte: 24.4,
                color: "#FCFA00",
              },
              {
                gt: 24.4,
                lte: 32.6,
                color: "#FDAE0D",
              },
              {
                gt: 32.6,
                lte: 41.4,
                color: "#FB3B00",
              },
              {
                gt: 41.4,
                lte: 50.9,
                color: "#FC4d80",
              },
              {
                gt: 50.9,
                color: "#C2218E",
              },
            ],
            outOfRange: {
              color: "#C2218E",
            },
          },
        series: function(){
            let series = [];
            legend.forEach((item,index)=>{
                series.push(
                    {
                        name:item,
                        type:'line',
                        data:ydata[index],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                fontSize:12,
                                color:commonColor[index],
                                formatter:"{c}"
                            }
                        },
                        barCategoryGap:'50%',
                    }
                );
            });
            return series;
        }()
    };
    mychart.setOption(option);
    return mychart;
}

const CommonEchart = {
    getPieChart:getPieChart,
    getBarChart:getBarChart,
    getLineChart:getLineChart,
    getCGPieChart:getCGPieChart,
    getCGLineChart:getCGLineChart,
    getCGBarChart:getCGBarChart,
    getAJBarChart:getAJBarChart,
    getBarChartAPS:getBarChartAPS,
    getTyphoonSpeedChart:getTyphoonSpeedChart
}

export default CommonEchart;