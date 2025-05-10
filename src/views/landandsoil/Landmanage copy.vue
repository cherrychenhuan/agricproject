<template>
  <div>
    <div id="map-container" style="height: 600px;">

    </div>
    <div id="my-panel">

    </div>
  </div>
</template>
<script setup>
import { locationStore } from '@/stores/location.js'
import { ref, nextTick, toRefs, toRef, watch } from 'vue'
import AMapLoader from "@amap/amap-jsapi-loader";
const locationstore = locationStore();
// 设置安全密钥
const map = ref()
window._AMapSecurityConfig = {
  securityJsCode: '382e2bc088531849b40e2a14e5e8cff5',
}
const location = ref()
const getLocation = () => {
  let xarea = locationstore.location
  let rectangle_1 = ''
  let rectangle_2 = ''
  let lat = 40
  let lon = 116
  if (xarea.rectangle != undefined) {
    rectangle_1 = xarea.rectangle.split(';')[0].split(',')
    rectangle_2 = xarea.rectangle.split(';')[1].split(',')
    lat = (Number(rectangle_2[0]) + Number(rectangle_1[0])) / 2
    lon = (Number(rectangle_2[1]) + Number(rectangle_1[1])) / 2
  }
  location.value = [lat, lon]
}
const initMap = (location) => {
  //创建卫星图层
  var satellite = new AMap.TileLayer.Satellite();
  //创建路网图层
  var roadNet = new AMap.TileLayer.RoadNet();
  AMapLoader.reset()
  AMapLoader.load({
    key: 'ab72f78b39cbc866a7a122a545f5861b',
    version: '2.0',   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.AutoComplete', 'AMap.PlaceSearch', 'AMap.Marker'],  // 需要使用的的插件列表
    AMapUI: {
      version: '1.1',
      plugins: []
    }
  }).then((AMap) => {
    // var path = [
    //   new AMap.LngLat(104.15, 32.18),
    //   new AMap.LngLat(104.555481, 32.409684),
    //   new AMap.LngLat(105.238498, 32.575821),

    //   new AMap.LngLat(104.6835, 32.944031),
    //   new AMap.LngLat(105.608609, 33.329212),
    //   new AMap.LngLat(106.257636, 32.830032),
    //   new AMap.LngLat(106.15658, 33.327293),
    //   new AMap.LngLat(106.673217, 33.153636),
    //   new AMap.LngLat(106.920781, 33.617637),
    //   new AMap.LngLat(107.333787, 33.156937),
    //   new AMap.LngLat(107.545678, 33.222808),
    //   new AMap.LngLat(107.990551, 33.524261),
    //   new AMap.LngLat(108.314299, 33.310284),
    //   new AMap.LngLat(109.152833, 33.423764),
    //   new AMap.LngLat(109.361783, 32.832213),
    //   new AMap.LngLat(110.881741, 33.531071),
    //   new AMap.LngLat(110.426005, 32.993095),
    //   new AMap.LngLat(111.473644, 33.307272),
    //   new AMap.LngLat(111.849354, 33.044698),
    //   new AMap.LngLat(112.08745, 32.687732),
    //   new AMap.LngLat(112.3601, 32.521282),
    //   new AMap.LngLat(112.80829, 32.682464),
    //   new AMap.LngLat(113.327144, 32.723975),
    //   new AMap.LngLat(114.016818, 32.82134),
    //   new AMap.LngLat(114.021988, 33.014038),
    //   new AMap.LngLat(114.362477, 33.006808),
    //   new AMap.LngLat(114.618537, 32.96344),
    //   new AMap.LngLat(114.965519, 32.74488),
    //   new AMap.LngLat(115.26312, 33.038884),
    //   new AMap.LngLat(115.814252, 32.891032),
    //   new AMap.LngLat(116.206396, 33.158424),
    //   new AMap.LngLat(116.710947, 32.710536),
    //   new AMap.LngLat(117.018603, 32.585384),
    //   new AMap.LngLat(117.205083, 32.971543),
    //   new AMap.LngLat(117.388566, 32.91682),
    //   new AMap.LngLat(117.881312, 33.126532),
    //   new AMap.LngLat(118.223941, 33.476575),
    //   new AMap.LngLat(118.873132, 33.294095),
    //   new AMap.LngLat(119.113166, 33.551495),
    //   new AMap.LngLat(119.260589, 33.781648),
    //   new AMap.LngLat(119.802271, 33.758857),
    //   new AMap.LngLat(119.820713, 33.990372),
    //   new AMap.LngLat(120.326338, 33.766277)

    // ];
    // var polyline = new AMap.Polyline({
    //   path: path,
    //   borderWeight: 2, //线条宽度，默认为1
    //   strokeColor: "red", //线条颜色
    //   lineJoin: "round", //折线拐点连接处样式
    // });
    // 初始化地图
    map.value = new AMap.Map('map-container', {
      viewMode: "2D",  //  是否为3D地图模式
      zoom: 13,   // 初始化地图级别
      center: location, //中心点坐标  广州
      resizeEnable: true,
      willreadoften: true,
      mapStyle: "amap://styles/fresh",
      layers: [satellite, roadNet],
    });
    //多边形 Polygon对象添加到 Map
    // map.value.add(polyline);
    // map.value.setFitView([polyline])
    //将覆盖物调整到合适视野
    // map.value.setFitView([polygon])
    // AMap.plugin(["AMap.PlaceSearch"], function () {
    //   const placeSearch = new AMap.PlaceSearch({
    //     pageSize: 5, //单页显示结果条数
    //     pageIndex: 1, //页码
    //     city: "010", //兴趣点城市
    //     citylimit: true, //是否强制限制在设置的城市内搜索
    //     map: map, //展现结果的地图实例
    //     panel: "my-panel", //结果列表将在此容器中进行展示。
    //     autoFitView: true, //是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围
    //   });
    //   placeSearch.search("北京大学"); //使用插件搜索关键字并查看结果
    // });
    //鼠标点击事件
    this.map.on('click', this.clickMapHandler)
    // 搜索提示插件

    this.AutoComplete = new AMap.AutoComplete({ city: "全国" });
  }).catch(e => {
    console.log(e);
  });


}
getLocation()
initMap(location.value)
</script>
<style lang="scss"></style>
