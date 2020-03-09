import Vue, { PropType, VNode } from 'vue'
import {
  VBtn,
  VIcon,
  VMenu,
  VList,
  VListItem,
  VListItemContent,
  VListItemTitle,
  VListItemSubtitle,
  VListItemAction,
  VCheckbox,
  VDivider,
  VCard,
  VCardActions
} from '../../vuetify-import'
import { TableHeader } from '../VAdvDataTable/utils/AdvTableUtils'

export default Vue.extend({
  name: 'v-column-editor',
  props: {
    headerIcon: {
      type: String,
      default: undefined
    },
    headerIconColor: {
      type: String,
      default: undefined
    },
    upIcon: {
      type: String,
      default: 'expand_more'
    },
    downIcon: {
      type: String,
      default: 'expand_less'
    },
    headers: Array as PropType<TableHeader[]>,
    dark: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sortedHeaders (): TableHeader[] {
      // if (!this.dataHeaders) {
      //   return this.headers.slice().sort((a, b) => a.order - b.order)
      // }
      return this.dataHeaders
    },
    resultHeaders (): TableHeader[] {
      return this.sortedHeaders.filter((v: TableHeader) => v.visible)
    }
  },
  data: () => ({
    isMenuActive: false,
    dataHeaders: [] as TableHeader[]
  }),
  methods: {
    deactivateMenu (e: Event, payload: string) {
      if (payload === 'CLOSE') {
        this.isMenuActive = true
      } else {
        e.stopPropagation()
        this.isMenuActive = false
        if (payload === 'OK') {
          this.$emit('headers-changed', this.resultHeaders)
        }
      }
    },
    genActivator (listeners: EventListener): VNode {
      return this.$createElement(VBtn, {
        props: {
          icon: true
        },
        slot: 'activator',
        on: {
          click: (e: Event) => {
            e.stopPropagation()
            this.isMenuActive = !this.isMenuActive
            this.$nextTick()
          },
          listeners
        }
      }, [
        this.genIcon()
      ])
    },
    genIcon (): VNode {
      return this.$createElement(VIcon, {
        props: {
          color: this.headerIconColor
        }
      }, [this.headerIcon])
    },
    genVisibleCheckbox (header: TableHeader): VNode {
      return this.$createElement(VCheckbox, {
        props: {
          value: header.visible,
          inputValue: header.visible,
          trueValue: true,
          falseValue: false
        },
        on: {
          click: (e: Event) => {
            e.stopPropagation()
            e.preventDefault()
            header.visible = !header.visible
          }
        }
      })
    },
    genMenuItem (header: TableHeader): VNode {
      return this.$createElement(VListItem, {
        props: {
          dense: this.dense
        }
      }, [
        this.$createElement(VListItemAction, {}, [
          this.genVisibleCheckbox(header)
        ]),
        this.$createElement(VListItemAction, {}, [
          this.$createElement(VBtn, {
            props: {
              icon: true
            },
            on: {
              click: () => this.downHeader(header)
            }
          }, [
            this.$createElement(VIcon, this.downIcon)
          ])
        ]),
        this.$createElement(VListItemAction, {}, [
          this.$createElement(VBtn, {
            props: {
              icon: true
            },
            on: {
              click: () => this.upHeader(header)
            }
          }, [
            this.$createElement(VIcon, this.upIcon)
          ])
        ]),
        this.$createElement(VListItemContent, {
          style: {
            'padding-left': '18px',
            'padding-right': '18px'
          }
        }, [
          this.$createElement(VListItemTitle, {
            domProps: {
              innerHTML: header.value
            }
          }),
          this.$createElement(VListItemSubtitle, {
            domProps: {
              innerHTML: header.text
            }
          })
        ])
      ])
    },
    setDataHeaders () {
      if (!this.dataHeaders) {
        this.dataHeaders = this.sortedHeaders
      }
    },
    upHeader (header: TableHeader) {
      this.setDataHeaders()
      const i = this.dataHeaders.indexOf(header)
      if (i === 0) {
        const a = this.dataHeaders.slice(1)
        a.push(header)
        a.map(v => { v.order = a.indexOf(v) })
        this.dataHeaders = a
      } else {
        const a = this.dataHeaders.slice(0, i - 1)
        a.push(header)
        a.push(this.dataHeaders[i - 1])
        a.push(...this.dataHeaders.slice(i + 1))
        a.map(v => { v.order = a.indexOf(v) })
        this.dataHeaders = a
      }
      this.$nextTick()
    },
    downHeader (header: TableHeader) {
      this.setDataHeaders()
      const i = this.dataHeaders.indexOf(header)
      if (i === this.dataHeaders.length) {
        const a = this.dataHeaders.slice(0, i - 1)
        a.push(header)
        a.map(v => { v.order = a.indexOf(v) })
        this.dataHeaders = a
      } else {
        const a = this.dataHeaders.slice(0, i - 1)
        a.push(header)
        a.push(this.dataHeaders[i - 1])
        a.push(...this.dataHeaders.slice(i + 1))
        a.map(v => { v.order = a.indexOf(v) })
        this.dataHeaders = a
      }
      this.$nextTick()
    },
    genMenuContent (): VNode {
      const items = this.sortedHeaders.map(header => this.genMenuItem(header))
      return this.$createElement(VCard, {
        props: {
          dark: this.dark,
          dense: this.dense
        }
      },
      [
        this.$createElement(VList, {}, items),
        this.$createElement(VDivider, {}),
        this.$createElement(VCardActions, {
          style: {
            'justify-content': 'flex-end'
          }
        }, [
          this.$createElement(VBtn, {
            props: {
              text: true
            },
            domProps: {
              innerHTML: 'Cancel'
            },
            on: {
              click: (e: Event) => this.deactivateMenu(e, 'CANCEL')
            }
          }),
          this.$createElement(VBtn, {
            props: {
              text: true
            },
            on: {
              click: (e: Event) => this.deactivateMenu(e, 'OK')
            },
            domProps: {
              innerHTML: 'OK'
            }
          })
        ])

      ])
    }

  },
  render (): VNode {
    const self = this
    return this.$createElement(VMenu, {
      props: {
        closeOnContentClick: false,
        value: this.isMenuActive
      },
      on: {
        input: (e: Event) => this.deactivateMenu(e, 'CLOSE')
      },
      slot: 'header.data-table-settings',
      scopedSlots: {
        'activator' (on) {
          return self.genActivator(on)
        }
      }
    }, [
      this.genMenuContent()
    ])
  }
})
