<template>
    <div id="viewDiv">
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import Map from '@arcgis/core/Map.js'; 
  import SceneView from "@arcgis/core/views/SceneView.js";
  let view
  onMounted(() => {
    initArcGisMap()
  })
  
  const initArcGisMap = () => {
    const map = new Map({
      basemap: "topo-vector"
    });
  
    view = new SceneView({
      center: [-118.80500, 34.02700],
      zoom: 4,
      container: "viewDiv",
      map: map
    });
    view.ui.components = [];
  }
  </script>
  <style scoped>  #viewDiv {
      width: 100%;
      height: 100vh;
    }
  </style>
  