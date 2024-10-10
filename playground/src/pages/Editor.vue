<template>
  <div class="editor-app">
    <TMagicEditor
      v-model="value"
      ref="editor"
      :menu="menu"
      :runtime-url="runtimeUrl"
      :props-configs="propsConfigs"
      :props-values="propsValues"
      :event-method-list="eventMethodList"
      :datasource-event-method-list="datasourceEventMethodList"
      :datasource-configs="datasourceConfigs"
      :datasource-values="datasourceValues"
      :component-group-list="componentGroupList"
      :datasource-list="datasourceList"
      :default-selected="defaultSelected"
      :moveable-options="moveableOptions"
      :auto-scroll-into-view="true"
      :stage-rect="stageRect"
      :layerContentMenu="contentMenuData"
      :stageContentMenu="contentMenuData"
      @props-submit-error="propsSubmitErrorHandler"
    >
      <template #workspace-content>
        <DeviceGroup ref="deviceGroup" v-model="stageRect"></DeviceGroup>
      </template>
    </TMagicEditor>

    <TMagicDialog v-model="previewVisible" destroy-on-close class="pre-viewer" title="预览" :width="stageRect?.width">
      <iframe
        v-if="previewVisible"
        ref="iframe"
        width="100%"
        style="border: none"
        :height="stageRect?.height"
        :src="previewUrl"
      ></iframe>
    </TMagicDialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, markRaw, nextTick, onBeforeUnmount, onMounted, Ref, ref, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Coin, Connection, CopyDocument, Document, DocumentCopy } from '@element-plus/icons-vue';
import axios from 'axios';
import { cloneDeep } from 'lodash-es';
import serialize from 'serialize-javascript';

import { TMagicDialog, tMagicMessage, tMagicMessageBox } from '@tmagic/design';
import {
  ContentMenu,
  COPY_STORAGE_KEY,
  type DatasourceTypeOption,
  editorService,
  type MenuBarData,
  type MenuButton,
  type MoveableOptions,
  propsService,
  type Services,
  TMagicEditor,
} from '@tmagic/editor';
import type { MApp, MContainer, MNode } from '@tmagic/schema';
import { NodeType } from '@tmagic/schema';
import type { CustomizeMoveableOptionsCallbackConfig } from '@tmagic/stage';
import { asyncLoadJs, calcValueByFontsize } from '@tmagic/utils';

import DeviceGroup from '../components/DeviceGroup.vue';
import componentGroupList from '../configs/componentGroupList';
import dsl from '../configs/dsl';
import { uaMap } from '../const';

const { VITE_RUNTIME_PATH, VITE_ENTRY_PATH } = import.meta.env;

const datasourceList: DatasourceTypeOption[] = [];
const runtimeUrl = `${VITE_RUNTIME_PATH}/playground/index.html`;
const router = useRouter();
const route = useRoute();
const fileName = route.query?.filename;
const editor = ref<InstanceType<typeof TMagicEditor>>();
const deviceGroup = ref<InstanceType<typeof DeviceGroup>>();
const iframe = ref<HTMLIFrameElement>();
const previewVisible = ref(false);
const value = ref<MApp>(dsl);
const defaultSelected = ref(dsl.items[0].id);
const propsValues = ref<Record<string, any>>({});
const propsConfigs = ref<Record<string, any>>({});
const eventMethodList = ref<Record<string, any>>({});
const datasourceEventMethodList = ref<Record<string, any>>({
  base: {
    events: [],
    methods: [],
  },
});
const datasourceConfigs = ref<Record<string, any>>({});
const datasourceValues = ref<Record<string, any>>({});
const stageRect = ref({
  width: 1024,
  height: 768,
});

const previewUrl = computed(
  () => `${VITE_RUNTIME_PATH}/page/index.html?localPreview=1&page=${editor.value?.editorService.get('page')?.id}`,
);

const collectorOptions = {
  id: '',
  name: '蒙层',
  isTarget: (key: string | number, value: any) =>
    typeof key === 'string' && typeof value === 'string' && key.includes('events') && value.startsWith('overlay_'),
  isCollectByDefault: false,
};

const usePasteMenu = (menu?: Ref<InstanceType<typeof ContentMenu> | undefined>): MenuButton => ({
  type: 'button',
  text: '粘贴(带关联信息)',
  icon: markRaw(DocumentCopy),
  display: (services) => !!services?.storageService?.getItem(COPY_STORAGE_KEY),
  handler: (services) => {
    const nodes = services?.editorService?.get('nodes');
    if (!nodes || nodes.length === 0) return;

    if (menu?.value?.$el) {
      const stage = services?.editorService?.get('stage');
      const rect = menu.value.$el.getBoundingClientRect();
      const parentRect = stage?.container?.getBoundingClientRect();
      const initialLeft =
        calcValueByFontsize(stage?.renderer.getDocument(), (rect.left || 0) - (parentRect?.left || 0)) /
        services.uiService.get('zoom');
      const initialTop =
        calcValueByFontsize(stage?.renderer.getDocument(), (rect.top || 0) - (parentRect?.top || 0)) /
        services.uiService.get('zoom');
      services?.editorService?.paste({ left: initialLeft, top: initialTop }, collectorOptions);
    } else {
      services?.editorService?.paste({}, collectorOptions);
      services?.codeBlockService?.paste();
      services?.dataSourceService?.paste();
    }
  },
});

const contentMenuData = computed<MenuButton[]>(() => [
  {
    type: 'button',
    text: '复制(带关联信息)',
    icon: markRaw(CopyDocument),
    handler: (services: Services) => {
      const nodes = services?.editorService?.get('nodes');
      nodes && services?.editorService?.copyWithRelated(cloneDeep(nodes), collectorOptions);
      nodes && services?.codeBlockService?.copyWithRelated(cloneDeep(nodes));
      nodes && services?.dataSourceService?.copyWithRelated(cloneDeep(nodes));
    },
  },
  usePasteMenu(),
]);

const menu: MenuBarData = {
  left: [
    {
      type: 'text',
      text: '界面设计器',
    },
  ],
  center: ['delete', 'undo', 'redo', 'guides', 'rule', 'zoom'],
  right: [
    {
      type: 'button',
      text: 'Form Playground',
      handler: () => router.push('form'),
    },
    {
      type: 'button',
      text: 'Form Editor Playground',
      handler: () => router.push('form-editor'),
    },
    {
      type: 'button',
      text: 'Table Playground',
      handler: () => router.push('table'),
    },
    '/',
    {
      type: 'button',
      text: '预览',
      icon: Connection,
      handler: async (services) => {
        if (services?.editorService.get('modifiedNodeIds').size > 0) {
          try {
            await tMagicMessageBox.confirm('有修改未保存，是否先保存再预览', '提示', {
              confirmButtonText: '保存并预览',
              cancelButtonText: '预览',
              type: 'warning',
            });
            save();
          } catch (e) {
            console.error(e);
          }
        }
        previewVisible.value = true;

        await nextTick();

        if (!iframe.value?.contentWindow || !deviceGroup.value?.viewerDevice) return;
        Object.defineProperty(iframe.value.contentWindow.navigator, 'userAgent', {
          value: uaMap[deviceGroup.value.viewerDevice],
          writable: true,
        });
      },
    },
    {
      type: 'button',
      text: '保存',
      icon: Coin,
      handler: () => {
        save();
      },
    },
    '/',
    {
      type: 'button',
      icon: Document,
      tooltip: '源码',
      handler: (service) => service?.uiService.set('showSrc', !service?.uiService.get('showSrc')),
    },
  ],
};

// update
onMounted(() => {
  initDSL(); // 在组件加载时执行 DSL 的初始化请求
  getEventList();
});
const initDSL = async () => {
  const dslData = await fetchDSL();
  if (dslData) {
    // eslint-disable-next-line no-eval
    value.value = eval(`(${dslData})`); // 将 DSL 数据设置为编辑器的初始值
    const currentDSL = serialize(toRaw(value.value), {
      space: 2,
      unsafe: true,
    }).replace(/"(\w+)":\s/g, '$1: ');
    localStorage.setItem('magicDSL', currentDSL);
  } else {
    console.error('无法加载 DSL 数据');
  }
};
// 获取dsl
const fetchDSL = async () => {
  try {
    const response = await axios.get(`/api/designPlan/getTsContent?fileName=${fileName}`); // 假设你的 DSL API 是 /api/getDSL
    return decodeURIComponent(response.data?.data); // 返回 DSL 数据
  } catch (error) {
    console.error('获取 DSL 失败:', error);
    return null; // 如果失败，可以返回一个默认的 DSL 或者空值
  }
};
// 保存dsl
const saveDSL = async (currentDSL: any) => {
  const params = {
    fileName,
    content: currentDSL,
  };
  try {
    // const currentDSL = editor.value?.editorService.get('dsl'); // 获取当前的 DSL
    if (currentDSL) {
      await axios.post('/api/designPlan/uploadTs', params); // 将 DSL 保存到后端
      console.log('DSL 保存成功');
    }
  } catch (error) {
    console.error('保存 DSL 失败:', error);
  }
};
// 获取事件列表
const getEventList = async () => {
  const { data }: any = await axios.get('/api/event/list');
  if (data?.code === 200 && data?.data && data?.data?.length > 0) {
    const list = data?.data.map((item: any) => ({ value: item.id, text: item.name }));
    localStorage.setItem('eventEnum', JSON.stringify(list));
  }
};

const moveableOptions = (config?: CustomizeMoveableOptionsCallbackConfig): MoveableOptions => {
  const options: MoveableOptions = {};

  if (!editor.value) return options;

  const page = editor.value.editorService.get('page');

  const ids = config?.targetElIds || [];
  let isPage = page && ids.includes(`${page.id}`);

  if (!isPage) {
    const id = config?.targetElId;
    if (id) {
      const node = editor.value.editorService.getNodeById(id);
      isPage = node?.type === NodeType.PAGE;
    }
  }

  options.draggable = !isPage;
  options.resizable = !isPage;
  options.rotatable = !isPage;

  // 双击后在弹层中编辑时，根组件不能拖拽
  if (config?.targetEl?.parentElement?.classList.contains('tmagic-editor-sub-stage-wrap')) {
    options.draggable = false;
    options.resizable = false;
    options.rotatable = false;
  }

  return options;
};

const save = () => {
  const currentDSL = serialize(toRaw(value.value), {
    space: 2,
    unsafe: true,
  }).replace(/"(\w+)":\s/g, '$1: ');
  saveDSL(encodeURIComponent(currentDSL)).then(() => {
    localStorage.setItem('magicDSL', currentDSL);
    editor.value?.editorService.resetModifiedNodeId();
    tMagicMessage.success('保存成功');
  });
};

asyncLoadJs(`${VITE_ENTRY_PATH}/config/index.umd.cjs`).then(() => {
  propsConfigs.value = (globalThis as any).magicPresetConfigs;
});
asyncLoadJs(`${VITE_ENTRY_PATH}/value/index.umd.cjs`).then(() => {
  propsValues.value = (globalThis as any).magicPresetValues;
});
asyncLoadJs(`${VITE_ENTRY_PATH}/event/index.umd.cjs`).then(() => {
  eventMethodList.value = (globalThis as any).magicPresetEvents;
});
asyncLoadJs(`${VITE_ENTRY_PATH}/ds-config/index.umd.cjs`).then(() => {
  datasourceConfigs.value = (globalThis as any).magicPresetDsConfigs;
});
asyncLoadJs(`${VITE_ENTRY_PATH}/ds-value/index.umd.cjs`).then(() => {
  datasourceValues.value = (globalThis as any).magicPresetDsValues;
});

// try {
//   // initDSL();
//   // eslint-disable-next-line no-eval
//   const magicDSL = eval(`(${localStorage.getItem('magicDSL')})`);
//   console.error("localStorage.getItem('magicDSL')", localStorage.getItem('magicDSL'));
//   if (!magicDSL) {
//     save();
//   } else {
//     value.value = magicDSL;
//   }
// } catch (e) {
//   console.error(e);
//   save();
// }

editorService.usePlugin({
  beforeDoAdd: (config: MNode, parent: MContainer) => {
    if (config.type === 'overlay') {
      config.style = {
        ...config.style,
        left: 0,
        top: 0,
      };

      return [config, editorService.get('page') as MContainer];
    }

    return [config, parent];
  },
});

propsService.usePlugin({
  beforeFillConfig: (config) => [config, '100px'],
});

onBeforeUnmount(() => {
  editorService.removeAllPlugins();
});

const propsSubmitErrorHandler = async (e: any) => {
  console.error(e);
  tMagicMessage.closeAll();
  tMagicMessage.error(e.message);
};
</script>

<style lang="scss">
html {
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
}

.editor-app {
  width: 100%;
  height: 100%;

  .m-editor {
    flex: 1;
    height: 100%;
  }

  .el-overlay-dialog {
    display: flex;
  }

  .pre-viewer {
    margin: auto;

    .el-dialog__body {
      padding: 0;
    }
  }

  .menu-left {
    .menu-item-text {
      margin-left: 10px;
    }
  }
}
</style>
