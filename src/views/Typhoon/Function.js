/*
 * @Author: LiuHN
 * @Date: 2022-01-07 11:22:19
 * @LastEditTime: 2022-01-07 11:52:36
 * @Description: 台风专题的一些函数
 * @版权声明
 */
import { Stroke, Fill, Text, Style, Circle, Icon } from "ol/style";

/**
 * 设置台风点样式
 * @param {string} 颜色 如rgb(0,0,0)
 * @returns ol.Style
 */
export function setPointStyle(color) {
    let style = new Style({
        image: new Circle({
            radius: 3, //半径
            fill: new Fill({
                color: color,
            }),
            stroke: new Stroke({
                //边界样式
                color: "#555555",
                width: 1,
            }),
        }),
    });
    return style;
}

/**
 * 设置台风线样式
 * @param {string} 颜色 如rgb(0,0,0)
 * @returns ol.Style
 */
export function setLineStyle(color) {
    let style = new Style({
        stroke: new Stroke({
            color: color, //颜色
            width: 2, //宽度
        }),
    });
    return style;
}

/**
 * 创建文本
 * @param {*string} text 文本内容
 * @returns ol.Style
 */
export function createLabelStyle(text) {
  return new Style({
    text: new Text({
      textAlign: "center", //位置
      offsetX:-20, //偏移
      textBaseline: "middle", //基准线
      font: "normal 14px 微软雅黑", //文字样式
      text: text, //文本内容
      fill: new Fill({
        //文本填充样式（即文字颜色)
        color: "#000",
      }),
      stroke: new Stroke({
        color: "#F00",
        width: 2,
      }),
    }),
  });
}
