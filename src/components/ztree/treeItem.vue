<template>
  <div>
    <li>
    <li :class="level" tabindex="0" hidefocus="true" treenode="">
      <span title="" class="button switch" :class="[level, model.buttonClass]" @click="toggle" treenode_switch=""></span>
      <a :class="level" treenode_a="" target="_blank" :style="styleObj" @click="clickIt(model.callbackInfo)">
        <span class="node_name">
          <span :title="model.name">
            <i :class="model.icon ? model.icon : ''" aria-hidden="true"></i>&nbsp;{{model.name}}
            <i :class="model.lastIcon ? model.lastIcon : ''" aria-hidden="true"></i>
          </span>
        </span>
      </a>
      <transition name="fade">
        <ul :class="[level, {line: !model.isLast}]" v-show="isOpen" v-if="isFolder">
          <tree-item v-for="model in model.children" :model="model" :index="model.index" :open="open" :key="model.index"></tree-item>
        </ul>
      </transition>
    </li>
    </li>
  </div>
</template>

<script type="text/ecmascript-6">
  import emitter from './emitter';
  import './css/metroStyle/metroStyle.css';
  import './assets/font-awesome/css/font-awesome.min.css';

  export default {
    name: 'tree-item',
    componentName: 'tree-item',
    mixins: [emitter],
    props: {
      model: Object,
      index: [String, Number],
      open: Boolean
    },
    data() {
      return {
        isOpen: this.open
      }
    },
    computed: {
      isFolder() {
        return this.model.children &&
          this.model.children.length
      },
      level() {
        return 'level' + this.index;
      },
      styleObj() {
        if (this.model.disable) {
          return {'cursor': 'default', 'text-decoration': 'none', 'position': 'absolute', 'z-index': '-1'}
        }
      }
    },
    watch: {
      open() {
        this.isOpen = this.open;
      }
    },
    methods: {
      toggle() {
        if (this.isFolder) {
          this.isOpen = !this.isOpen;
          if (this.isOpen) {
            this.model.buttonClass = this.model.buttonClass.split('_')[0] + '_open';
          } else {
            this.model.buttonClass = this.model.buttonClass.split('_')[0] + '_close';
          }
        }
      },
      clickIt(n) {
        this.dispatch('ztree', 'item-click', n);
      }
    }
  };
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>

