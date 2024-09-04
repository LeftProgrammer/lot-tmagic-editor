# TMagic
TMagic 可视化搭建平台。

* 💪 Vue 3.0 Composition API
* 🔥 Written in TypeScript

# 文档

文档请移步 https://tencent.github.io/tmagic-editor/docs/index.html

目前文档仍在逐步完善中，如有疑问欢迎给我们提 issue。

# Playground 体验

https://tencent.github.io/tmagic-editor/playground/index.html

## 环境准备

node.js >= 18

pnpm >= 9

先安装 pnpm

```bash
$ npm install -g pnpm
```

然后安装依赖

```bash
$ pnpm bootstrap
```

## 运行项目

执行命令

```bash
$ pnpm playground
```

最后在浏览器中打开

http://localhost:8098/tmagic-editor/playground/

即可得到一个魔方编辑器示例项目

## magic-admin

已迁移至 https://github.com/vft-magic/tmagic-admin

## 项目介绍
在本项目中，我们核心内容，是包含在 `packages/editor` 中的编辑器，以及 `runtime` 和 `packages/ui` 提供的各个前端框架相关的 runtime 和 ui。

- `packages` 目录中提供的内容，我们都以 npm 包形式输出，开发者可以通过安装对应的包来使用。
- `runtime` 是我们提供的编辑器活动页和编辑器模拟器运行的页面项目示例。可以直接使用，也可以参考并自行实现。
- `playground` 是一个简单的编辑器项目示例。即使用了 `packages` 和 `runtime` 内容的集成项目。开发者可以参考 playground，使用魔方提供的能力实现一个满足业务方需求的编辑器。

### 编辑器
通过安装和使用 @tmagic/editor，可以快速搭建起一个魔方编辑器。

<img src="https://image.video.qpic.cn/oa_88b7d-32_509802977_1635842258505918" alt="魔方demo图">

### 页面渲染
runtime 是魔方提供的页面渲染环境。通过加载在编辑器中产出的 DSL，即可得到魔方编辑器希望拥有的最终产物，一个活动页面。我们提供了 vue2/vue3/react 几个版本的 runtime。

通过魔方编辑器和 runtime 渲染，以及通过自定义的复杂组件开发，可以在魔方项目上，搭建出复杂而精美的页面。

<img src="https://image.video.qpic.cn/oa_7cf5e6-5_466783002_1637935497991411" width="375">

### 表单渲染
魔方的表单配置项，使用了我们开发的基于 element-ui 的 @tmagic/form，@tmagic/form 也可以在其他地方单独使用。支持渲染 JS Schema 提供的表单描述。

<img src="https://image.video.qpic.cn/oa_28dbde-2_1333081854_1637935825410557" >

### 使用
playground 的示例项目，就是为开发者提供的基础应用示例。开发者可以基于此或者参考自行实现，搭建一个基于魔方的可视化搭建平台。

tmagic-editor主要定位是搭建生成移动端H5页面，如果有搭建PC端低代码平台的需求，可以了解一下腾讯出品的另外一个低代码平台：[无极低代码平台](https://wujicode.cn?from=tmagic)。

### 参与贡献

如果你有好的意见或建议，欢迎给我们提 Issues 或 Pull Requests，为提升魔方可视化编辑器开发体验贡献力量。<br>详见：[CONTRIBUTING.md](./CONTRIBUTING.md)

## 贡献者

<a href="https://github.com/Tencent/tmagic-editor/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Tencent/tmagic-editor" />
</a>


### 欢迎入群交流

<img src="https://vfiles.gtimg.cn/vupload/20220412/b85d331649748582992.jpg" width=375>


tmagic-editor                                                                              
├─ docs                                                                                    
│  ├─ api                                                                                  
│  │  ├─ editor                                                                                     
│  │  ├─ form                                                                                      
│  │  ├─ stage                                                                             
│  │  │  ├─ coreEvents.md                                                                  
│  │  │  └─ coreMethods.md                                                                 
│  │  └─ table                                                                                                   
│  ├─ form-config                                                                          
│  │  ├─ fields                                                                            
│  ├─ guide                                                                                                                  
│  ├─ public                                                                               
│  │  ├─ tutorial                                                                                         
│  └─ index.md                                                                             
├─ packages                                                                                
│  ├─ cli                                                                                  
│  │  ├─ bin                                                                               
│  │  │  └─ tmagic.js                                                                      
│  │  ├─ lib                                                                                                                  
│  │  ├─ src                                                                               
│  │  ├─ package.json                                                                      
│  │  └─ tsconfig.build.json                                                               
│  ├─ core                                                                                                               
│  ├─ data-source                                                                          
│  ├─ dep                                                                                  
│  │  ├─ dist                                                                              
│  │  ├─ src                                                                               
│  │  │  ├─ index.ts                                                                       
│  │  │  ├─ Target.ts                                                                      
│  │  │  ├─ types.ts                                                                       
│  │  │  ├─ utils.ts                                                                       
│  │  │  └─ Watcher.ts                                                                     
│  │  ├─ tests                                                                             
│  │  ├─ types                                                                             
│  │  ├─ package.json                                                                      
│  │  ├─ tsconfig.build.json                                                               
│  │  ├─ tsconfig.json                                                                     
│  │  └─ vite.config.ts                                                                    
│  ├─ design                                                                               
│  │  ├─ dist                                                                              
│  │  ├─ src                                                                                                        
│  │  ├─ types                                                                             
│  │  ├─ package.json                                                                      
│  │  ├─ tsconfig.build.json                                                               
│  │  ├─ tsconfig.json                                                                     
│  │  └─ vite.config.ts                                                                    
│  ├─ editor                                                                               
│  │  ├─ dist                                                                              
│  │  ├─ src                                                                               
│  │  ├─ tests                                                                             
│  │  │  └─ unit                                                                           
│  │  ├─ types                                                                                     
│  │  ├─ package.json                                                                      
│  │  ├─ README.md                                                                         
│  │  ├─ tsconfig.build.json                                                               
│  │  ├─ tsconfig.json                                                                     
│  │  └─ vite.config.ts                                                                    
│  ├─ element-plus-adapter                                                                 
│  │  ├─ dist                                                                                      
│  │  ├─ src                                                                                              
│  │  ├─ types                                                                                                
│  │  ├─ package.json                                                                      
│  │  ├─ tsconfig.build.json                                                               
│  │  ├─ tsconfig.json                                                                     
│  │  └─ vite.config.ts                                                                    
│  ├─ form                                                                                 
│  │  ├─ dist                                                                                                 
│  │  ├─ src                                                                               
│  │  │  ├─ containers                                                                     
│  │  │  │  ├─ Col.vue                                                                     
│  │  │  ├─ fields                                                                         
│  │  │  │  ├─ Cascader.vue                                                                      
│  │  │  ├─ theme                                                                          
│  │  │  │  ├─ date-time.scss                                                                
│  │  │  ├─ utils                                                                          
│  │  │  │  ├─ config.ts                                                                                                         
│  │  │  ├─ Form.vue                                                                       
│  │  │  ├─ FormBox.vue                                                                    
│  │  │  ├─ FormDialog.vue                                                                 
│  │  │  ├─ FormDrawer.vue                                                                 
│  │  │  ├─ index.ts                                                                       
│  │  │  ├─ schema.ts                                                                      
│  │  │  └─ shims-vue.d.ts                                                                 
│  │  ├─ tests                                                                             
│  │  │  └─ unit                                                                              
│  │  ├─ types                                                                                                      
│  │  ├─ package.json                                                                      
│  │  ├─ README.md                                                                         
│  │  ├─ tsconfig.build.json                                                               
│  │  ├─ tsconfig.json                                                                     
│  │  └─ vite.config.ts                                                                    
│  ├─ schema                                                                               
│  │  ├─ dist                                                                              
│  │  │  ├─ tmagic-schema.js                                                               
│  │  │  └─ tmagic-schema.umd.cjs                                                          
│  │  ├─ src                                                                               
│  │  │  └─ index.ts                                                                       
│  │  ├─ types                                                                             
│  │  │  └─ index.d.ts                                                                     
│  │  ├─ package.json                                                                      
│  │  ├─ README.md                                                                         
│  │  ├─ tsconfig.build.json                                                               
│  │  ├─ tsconfig.json                                                                     
│  │  └─ vite.config.ts                                                                    
│  ├─ stage                                                                                
│  │  ├─ dist                                                                                                  
│  │  ├─ src                                                                                 
│  │  ├─ tests                                                                             
│  │  ├─ types                                                                                      
│  │  ├─ package.json                                                                      
│  │  ├─ README.md                                                                         
│  │  ├─ tsconfig.build.json                                                               
│  │  ├─ tsconfig.json                                                                     
│  │  └─ vite.config.ts                                                                    
│  ├─ table                                                                                
│  │  ├─ dist                                                                              
│  │  ├─ src                                                                                     
│  │  ├─ types                                                                                          
│  │  ├─ package.json                                                                      
│  │  ├─ README.md                                                                         
│  │  ├─ tsconfig.build.json                                                               
│  │  ├─ tsconfig.json                                                                     
│  │  └─ vite.config.ts                                                                    
│  ├─ tdesign-vue-next-adapter                                                             
│  │  ├─ dist                                                                                                        
│  │  ├─ src                                                                                                
│  │  ├─ types                                                                             
│  │  │  └─ index.d.ts                                                                     
│  │  ├─ package.json                                                                      
│  │  ├─ tsconfig.build.json                                                               
│  │  ├─ tsconfig.json                                                                     
│  │  └─ vite.config.ts                                                                    
│  ├─ ui                                                                                   
│  │  ├─ src                                                                               
│  │  ├─ package.json                                                                      
│  │  ├─ README.md                                                                         
│  │  └─ tsconfig.json                                                                     
│  ├─ ui-react                                                                             
│  │  ├─ package.json                                                                      
│  │  └─ tsconfig.json                                                                     
│  ├─ ui-vue2                                                                              
│  │  └─ package.json                                                                      
│  └─ utils                                                                                
│     ├─ dist                                                                              
│     │  ├─ tmagic-utils.js                                                                
│     │  ├─ tmagic-utils.js.map                                                            
│     │  ├─ tmagic-utils.umd.cjs                                                           
│     │  └─ tmagic-utils.umd.cjs.map                                                       
│     ├─ src                                                                               
│     │  ├─ dom.ts                                                                         
│     │  ├─ index.ts                                                                       
│     │  └─ resetcss.css                                                                   
│     ├─ tests                                                                             
│     │  └─ unit                                                                           
│     │     └─ index.spec.ts                                                               
│     ├─ types                                                                             
│     │  ├─ dom.d.ts                                                                       
│     │  └─ index.d.ts                                                                     
│     ├─ package.json                                                                      
│     ├─ tsconfig.build.json                                                               
│     ├─ tsconfig.json                                                                     
│     └─ vite.config.ts                                                                    
├─ playground                                                                              
│  ├─ dist                                                                                 
│  │  ├─ assets                                                                            
│  │  ├─ entry                                                                             
│  │  │  └─ vue3                                                                                             
│  │  ├─ runtime                                                                           
│  │  │  └─ vue3                                                                           
│  │  ├─ favicon.png                                                                       
│  │  └─ index.html                                                                        
│  ├─ public                                                                               
│  │  ├─ entry                                                                             
│  │  │  └─ vue3                                                                           
│  │  ├─ runtime                                                                           
│  │  │  └─ vue3                                                                                           
│  │  └─ favicon.png                                                                       
│  ├─ src                                                                                  
│  │  ├─ components                                                                        
│  │  │  ├─ DeviceGroup.vue                                                                
│  │  │  └─ NavMenu.vue                                                                    
│  │  ├─ configs                                                                           
│  │  │  ├─ componentGroupList.ts                                                          
│  │  │  ├─ dsl.ts                                                                         
│  │  │  └─ formDsl.ts                                                                     
│  │  ├─ pages                                                                             
│  │  │  ├─ Editor.vue                                                                     
│  │  │  ├─ Form.vue                                                                       
│  │  │  ├─ FormEditor.vue                                                                 
│  │  │  └─ Table.vue                                                                      
│  │  ├─ App.vue                                                                           
│  │  ├─ const.ts                                                                          
│  │  ├─ main.ts                                                                           
│  │  ├─ route.ts                                                                          
│  │  ├─ shims-vue.d.ts                                                                    
│  │  └─ vite-env.d.ts                                                                     
│  ├─ auto-imports.d.ts                                                                    
│  ├─ components.d.ts                                                                      
│  ├─ index.html                                                                           
│  ├─ package.json                                                                         
│  ├─ README.md                                                                            
│  ├─ tsconfig.json                                                                        
│  └─ vite.config.ts                                                                       
├─ runtime                                                                                 
│  ├─ react                                                                                
│  │  ├─ page                                                                              
│  │  │  ├─ App.tsx                                                                        
│  │  │  ├─ index.html                                                                     
│  │  │  └─ main.tsx                                                                       
│  │  ├─ playground                                                                        
│  │  │  ├─ App.tsx                                                                        
│  │  │  ├─ index.html                                                                     
│  │  │  └─ main.tsx                                                                       
│  │  ├─ public                                                                            
│  │  │  └─ favicon.png                                                                    
│  │  ├─ build.vite.config.ts                                                              
│  │  ├─ dev.vite.config.ts                                                                
│  │  ├─ package.json                                                                      
│  │  ├─ tmagic.config.ts                                                                  
│  │  └─ tsconfig.json                                                                     
│  ├─ tmagic-form                                                                          
│  │  ├─ dist                                                                              
│  │  │  ├─ tmagic-form-runtime.js                                                         
│  │  │  └─ tmagic-form-runtime.umd.cjs                                                    
│  │  ├─ src                                                                               
│  │  │  ├─ form-config                                                                    
│  │  │  │  ├─ checkbox.ts                                                                 
│  │  │  │  ├─ common.ts                                                                   
│  │  │  │  ├─ display.ts                                                                  
│  │  │  │  ├─ index.ts                                                                    
│  │  │  │  ├─ number.ts                                                                   
│  │  │  │  ├─ switch.ts                                                                   
│  │  │  │  └─ text.ts                                                                     
│  │  │  ├─ App.vue                                                                        
│  │  │  ├─ component-group-list.ts                                                        
│  │  │  ├─ index.ts                                                                       
│  │  │  ├─ types.ts                                                                       
│  │  │  └─ useFormConfig.ts                                                               
│  │  ├─ types                                                                             
│  │  │  ├─ form-config                                                                    
│  │  │  │  ├─ checkbox.d.ts                                                               
│  │  │  │  ├─ common.d.ts                                                                 
│  │  │  │  ├─ display.d.ts                                                                
│  │  │  │  ├─ index.d.ts                                                                  
│  │  │  │  ├─ number.d.ts                                                                 
│  │  │  │  ├─ switch.d.ts                                                                 
│  │  │  │  └─ text.d.ts                                                                   
│  │  │  ├─ App.vue.d.ts                                                                   
│  │  │  ├─ component-group-list.d.ts                                                      
│  │  │  ├─ index.d.ts                                                                     
│  │  │  ├─ types.d.ts                                                                     
│  │  │  └─ useFormConfig.d.ts                                                             
│  │  ├─ package.json                                                                      
│  │  ├─ README.md                                                                         
│  │  ├─ tsconfig.build.json                                                               
│  │  ├─ tsconfig.json                                                                     
│  │  └─ vite.config.ts                                                                    
│  ├─ vue2                                                                                 
│  │  ├─ page                                                                              
│  │  │  ├─ utils                                                                          
│  │  │  │  ├─ index.ts                                                                    
│  │  │  │  └─ request.ts                                                                  
│  │  │  ├─ App.vue                                                                        
│  │  │  ├─ index.html                                                                     
│  │  │  ├─ main.ts                                                                        
│  │  │  └─ shims-vue.d.ts                                                                 
│  │  ├─ playground                                                                        
│  │  │  ├─ App.vue                                                                        
│  │  │  ├─ index.html                                                                     
│  │  │  ├─ main.ts                                                                        
│  │  │  └─ shims-vue.d.ts                                                                 
│  │  ├─ public                                                                            
│  │  │  └─ favicon.png                                                                    
│  │  ├─ build.vite.config.ts                                                              
│  │  ├─ dev.vite.config.ts                                                                
│  │  ├─ package.json                                                                      
│  │  └─ tmagic.config.ts                                                                  
│  └─ vue3                                                                                 
│     ├─ page                                                                              
│     │  ├─ utils                                                                          
│     │  │  ├─ index.ts                                                                    
│     │  │  └─ request.ts                                                                  
│     │  ├─ App.vue                                                                        
│     │  ├─ index.html                                                                     
│     │  ├─ main.ts                                                                        
│     │  └─ shims-vue.d.ts                                                                 
│     ├─ playground                                                                        
│     │  ├─ App.vue                                                                        
│     │  ├─ index.html                                                                     
│     │  ├─ main.ts                                                                        
│     │  └─ shims-vue.d.ts                                                                 
│     ├─ public                                                                            
│     │  └─ favicon.png                                                                    
│     ├─ build.vite.config.ts                                                              
│     ├─ dev.vite.config.ts                                                                
│     ├─ package.json                                                                      
│     └─ tmagic.config.ts                                                                  
├─ scripts                                                                                 
│  └─ release.cjs                                                                          
├─ CHANGELOG.md                                                                            
├─ commitlint.config.cjs                                                                   
├─ CONTRIBUTING.md                                                                         
├─ LICENSE                                                                                 
├─ package.json                                                                            
├─ pnpm-lock.yaml                                                                          
├─ pnpm-workspace.yaml                                                                     
├─ prettier.cjs                                                                            
├─ README.md                                                                               
├─ tsconfig.json                                                                           
├─ vite-env.d.ts                                                                           
└─ vitest.config.ts  