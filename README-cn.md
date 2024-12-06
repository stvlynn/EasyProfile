# EasyProfile

一个使用Vue 3和TailwindCSS构建的个人导航页面，支持通过YAML配置内容。

[English Documentation](./README.md)

## 特性

- 响应式设计
- 使用YAML配置内容
- 支持社交媒体链接
- Font Awesome图标支持
- 卡片式布局
- 技能标签自动图标
- 深色模式支持
- 服务端渲染 (SSR)
- OpenGraph meta标签支持

## 开始使用

0. 给本项目点一个Star⭐️

1. 部署本项目到 vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fstvlynn%2FEasyProfile)

2. 编辑 `src/config/config.yaml` 文件，自定义你的个人信息

## 配置说明

### 配置文件

项目包含两个主要配置文件：

1. `src/config/config.yaml`：主配置文件，用于设置个人信息、技能、项目等内容
2. `src/config/icons.yaml`：图标配置文件，定义了技能标签和项目标签可用的图标映射

### 个人信息
编辑 `config.yaml` 中的以下部分：
```yaml
personal:
  avatar: '/assets/avatar.jpg'  # 头像图片路径
  name: '你的名字'
  description: '简短描述'
  email: 'your.email@example.com'  # 可选
  phone: ''                        # 可选
  social:                          # 可选的社交媒体链接
    github: '用户名'
    twitter: '用户名'
    linkedin: '用户名'
    facebook: '用户名'
    telegram: '用户名'
```

### 技术能力
编辑 `config.yaml` 中的技能部分：
```yaml
skills:
  title: '技能'
  abilities:
    - name: 'python'      # 技术名称
      level: 3           # 3 = 高级，2 = 中级，1 = 初级
```

### 图标配置
`icons.yaml` 定义了技能和项目标签可用的图标，支持两类图标：
- 技术栈：vuejs, react, angular, nodejs, python, java 等
- 领域：machine-learning, frontend, backend, database 等

使用这些名称作为技能或项目标签时会自动显示对应图标，其他名称将显示默认图标。

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
