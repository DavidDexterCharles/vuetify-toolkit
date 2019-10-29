import Vue from 'vue'
import Router from 'vue-router'
import QuickStart from './views/QuickStart.vue'
import VTreeSelect from './views/VTreeSelect.vue'
import VCascader from './views/VCascader.vue'
import VDataGridSelect from './views/VDataGridSelect.vue'
import VMdView from './views/VMdView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'quickstart',
      component: QuickStart
    },
    {
      path: '/treeselect',
      name: 'vtreeselect',
      component: VTreeSelect
    },
    {
      path: '/cascader',
      name: 'vcascader',
      component: VCascader
    },
    {
      path: '/datagridselect',
      name: 'vdatagridselect',
      component: VDataGridSelect
    },
    {
      path: '/mdview',
      name: 'vmdview',
      component: VMdView
    }
  ]
})
