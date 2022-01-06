/*
 * @Author: LiuHN
 * @Date: 2022-01-04 09:45:23
 * @LastEditTime: 2022-01-06 10:32:35
 * @Description: 根据台风的等级返回台风要素渲染颜色
 * @版权声明
 */
const typhoonConfig = (strong) => { 
    let color = "";
    switch (strong) {
      case "热带低压(TD)":
        color = "#00D5CB";
        break;
      case "热带风暴(TS)":
        color = "#FCFA00";
        break;
      case "强热带风暴(STS)":
        color = "#FDAE0D";
        break;
      case "台风(TY)":
        color = "#FB3B00";
        break;
      case "强台风(STY)":
        color = "#FC4d80";
        break;
      case "SUPERTY":
        color = "#C2218E";
        break;
    }
    return color;
}

export default typhoonConfig;