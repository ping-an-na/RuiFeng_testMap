<template>
  <div id="app">
<!--    <HomeMap></HomeMap>-->
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* 整个滚动条 */
::-webkit-scrollbar {
  width: 2px;               /* 滚动条的宽度 */
  height: 2px;              /* 滚动条的高度，对水平滚动条有效 */
  //width: 0px; /* 滚动条的宽度 */
  //height: 0px; /* 滚动条的高度，对水平滚动条有效 */
  background-color: #f9f9fd; /* 滚动条的背景颜色 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #e1e1e1; /* 轨道的背景颜色 */
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #c1c1c1; /* 滑块的背景颜色 */
  border: 3px solid #e1e1e1; /* 滑块的边框和轨道相同的颜色，可以制造“边距”的效果 */
}

/* 滚动条滑块：悬停效果 */
::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8; /* 滑块的悬停颜色 */
}

/* 滚动条滑块：激活时的效果 */
::-webkit-scrollbar-thumb:active {
  background-color: #888888; /* 滑块的激活颜色 */
}

/* 滚动条按钮（上下箭头） */
::-webkit-scrollbar-button {
  display: none; /* 通常情况下不显示滚动条按钮 */
}

</style>
