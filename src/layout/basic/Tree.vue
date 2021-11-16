<template>
  <transition name="fadeIn">
    <ul>
      <li v-for="item in data" :key="item.node">
        <div
          @click="triggerClick(item)"
        >{{ item.name || item.title }} {{ item.showSubMenu ? '-' : '+' }}</div>
        <tree v-if="item.children.length" v-show="item.showSubMenu" :data="item.children"></tree>
      </li>
    </ul>
  </transition>
</template>

<script lang="ts" setup>
import { Menu } from '@/router/menu';
import { ref, computed } from 'vue'

//setup 语法，可以通过vue文件名被自身引用，不再需要指定name
interface Props {
  data: Menu[];
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
});

const color = 'blue'

const triggerClick = (item: Menu) => {
  if (item.children.length) {
    item.showSubMenu = !item.showSubMenu
  }
}

</script>

<style scoped>
ul {
  color: v-bind("color");
}
</style>
