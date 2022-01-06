/*
 * @Author: LiuHN
 * @Date: 2022-01-01 19:25:38
 * @LastEditTime: 2022-01-06 09:33:52
 * @Description:
 * @版权声明
 */
import Select from 'ol/interaction/Select';
import { altKeyOnly, click, pointerMove } from 'ol/events/condition';
import TyphoonInfoPanel from "../MapInteraction/typhoonInfoPanel.vue"

export function mapSelect(map, type) {
    const selectType = new Select();
    if (type == 1) {
        selectType.condition = pointerMove
    }
    map.addInteraction(selectType);
    selectType.on('select', function (e) {
        debugger
        console.log(map, e)
    });

}