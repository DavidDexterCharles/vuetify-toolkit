import Vue, { VueConstructor } from 'vue'
import { VTreeview } from '../../vuetify-import'

const VTreeviewComponent = VTreeview as VueConstructor<Vue>

export default VTreeviewComponent.extend({
  name: 'v-tree-view-selector',
  props: {
    selectedItems: {
      type: Array,
      default: []
    }
  },
  data: () => ({
    selectedCache: new Set()
  }),
  watch: {
    selectedItems () {
      if (this.selectedItems.length < 1) {
        this.clearSelection()
      }
    }
  },
  methods: {
    clearSelection () {
      this.selectedCache.clear()
      Object.keys(this.$data.nodes).forEach(key => {
        this.$data.nodes[key].isSelected = false
        this.$data.nodes[key].isIndeterminate = false
      })
    },
    selectAll () {
      this.selectedCache.clear()
      Object.keys(this.$data.nodes).forEach(key => {
        this.$data.nodes[key].isSelected = true
        this.$data.nodes[key].isIndeterminate = false
      })
    }
  }
})
