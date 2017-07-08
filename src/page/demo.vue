<template>
  <ztree :treeData="ztreeData" :flatten="true" @nodeClick="nodeClick"></ztree>
</template>

<script type="text/ecmascript-6">
  import Ztree from '../components/ztree/ztree.vue'

  const treeData = [
    {
      name: '美剧',
      children: [
        {
          name: '权力的游戏',
          icon: 'fa fa-star-o',
          callbackInfo: { actor: '囧'}
        }
      ]
    }, {
      name: '动漫',
      children: [
        {
          name: '国产',
          children: [
            {
              name: '喜羊羊与灰太狼'
            }
          ]
        },
        {
          name: '日本',
          children: [
            {
              name: '海贼王',
              callbackInfo: { id: '12345', role: '路飞'}
            },
            {
              disable: true,
              lastIcon: 'fa fa-ban',
              name: '火影忍者'
            }
          ]
        }
      ]
    }
  ];

/*   支持打平的树结构，上面的树打平后应该是这种等价格式  根节点pid应该为0
    const treeData = [{
      id: '1',
      pid: '0',
      name: '美剧'
    }, {
      id: '2',
      pid: '1',
      name: '权力的游戏',
      icon: 'fa fa-star-o',
      callbackInfo: { actor: '囧'}
    }, {
      id: '3',
      pid: '0',
      name: '动漫'
    }, {
      id: '4',
      pid: '3',
      name: '国产'
    }, {
      id: '5',
      pid: '4',
      name: '喜羊羊与灰太狼'
    }, {
      id: '6',
      pid: '3',
      name: '日本'
    }, {
      id: '7',
      pid: '6',
      name: '海贼王',
      callbackInfo: { id: '12345', role: '路飞'}
    }, {
      id: '8',
      pid: '6',
      disable: true,
      lastIcon: 'fa fa-ban',
      name: '火影忍者'
    }];*/

  export default {
    name: 'ztreeDemo',
    data() {
      return {
        ztreeData: treeData
      }
    },
    components: {
      Ztree
    },
    methods: {
      nodeClick(n) {
        console.log(n)
      }
    }
  };
</script>
