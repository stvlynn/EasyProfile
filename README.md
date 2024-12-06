# EasyProfile

一个使用Vue 3和TailwindCSS构建的个人导航页面，支持通过YAML配置内容。

## 特性

- 响应式设计
- 使用YAML配置内容
- 支持社交媒体链接
- Font Awesome图标支持
- 卡片式布局
- 技能标签自动图标

## 开始使用

1. 安装依赖：
```bash
npm install
```

2. 开发模式运行：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## 配置说明

编辑 `src/config/profile.yaml` 文件来自定义你的个人信息：

### 个人信息
- avatar: 头像图片路径
- name: 姓名
- description: 简短描述
- email: 电子邮件（可选）
- phone: 电话号码（可选）
- social: 社交媒体链接（可选）
  - github
  - twitter
  - linkedin
  - facebook
  - telegram

### 技术能力
支持的技术标签（自动显示对应图标）：
- vuejs
- react
- angular
- nodejs
- python
- java
- cpp
- golang
- docker
- kubernetes

其他技术标签会显示默认图标。

### 卡片位置

每个卡片的`position`变量决定了卡片在页面中的显示位置:

- `position: 1`：左列第一个卡片
- `position: 2`：右列第一个卡片
- `position: 3`：左列第二个卡片
- `position: 4`：右列第二个卡片

以此类推。奇数位置在左列，偶数位置在右列。将`position`设置为0或负数可以隐藏卡片。

## 自定义主题

编辑 `tailwind.config.js` 文件来自定义颜色和其他主题选项。

## Sponsoring

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/stvlynn)

[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/stvlynn)


ETH: 0xEbf67cd24fa23fde69843cA4119cE946d8c231F5

## License

[AGPL-3.0](./LICENSE)
