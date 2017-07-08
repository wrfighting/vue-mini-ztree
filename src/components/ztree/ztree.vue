<template>
  <ul class="ztree">
    <tree-item v-for="model in treeDataReady" :model="model" :open="allOpen" :key="model.index"></tree-item>
  </ul>
</template>

<script type="text/ecmascript-6">
  import utils from './utils';
  import treeItem from './treeItem.vue';
  import './css/metroStyle/metroStyle.css';

  export default {
    componentName: 'ztree',
    props: {
      allOpen: {
        type: Boolean,
        default: false
      },
      flatten: {
        type: Boolean,
        default: false
      },
      treeData: {
        type: Array,
        default: []
      }
    },
    beforeMount() {
      this.$on('item-click', this.handleItemClick);
    },
    computed: {
      treeDataReady() {
        var index = 0;
        let tempArr = utils.clone(this.treeData);
        if (this.flatten) {
          tempArr = utils.flattenToTree(tempArr);
        }

        var updateIndex = (arr) => {
          for (let i=0; i < arr.length; i++) {
            arr[i].index = index;

            if (i+1 >= arr.length) {
              arr[i].isLast = true;
              arr[i].buttonClass = 'bottom';
            } else {
              arr[i].isLast = false;
              arr[i].buttonClass = 'center';
            }
            if (index === 0 && !arr[i].isLast) {
              arr[i].buttonClass = 'roots';
            }
            if (index === 0 && arr[i].isLast) {
              arr[i].buttonClass = 'root';
            }
            index++;
            if (arr[i].children && arr[i].children.length > 0) {
              if (!this.allOpen) {
                arr[i].buttonClass += '_close';
              } else {
                arr[i].buttonClass += '_open';
              }
              updateIndex(arr[i].children);
            } else {
              arr[i].buttonClass += '_docu';
            }
          }
        };

        updateIndex(tempArr);
        return tempArr;
      }
    },
    methods: {
      handleItemClick(n) {
        this.$emit('nodeClick', n);
      }
    },
    components: {
      treeItem
    }
  };
</script>
