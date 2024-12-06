# EasyProfile

A personal navigation page built with Vue 3 and TailwindCSS, featuring YAML-based configuration.

[中文文档](./README-cn.md)

## Features

- Responsive design
- YAML-driven configuration
- Social media integration
- Font Awesome icon support
- Card-based layout
- Automatic skill tag icons
- Dark mode support
- Server-side rendering (SSR)
- OpenGraph meta tags support

## Getting Started

0. Star this project ⭐️

1. Deploy this project to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fstvlynn%2FEasyProfile)

2. Edit `src/config/config.yaml` to customize your profile

## Configuration

### Configuration Files

The project includes two main configuration files:

1. `src/config/config.yaml`: Main configuration file for personal info, skills, projects, etc.
2. `src/config/icons.yaml`: Icon configuration file defining available icons for skills and project tags

### Personal Information
Edit the following section in `config.yaml`:
```yaml
personal:
  avatar: '/assets/avatar.jpg'  # Avatar image path
  name: 'Your Name'
  description: 'Short description'
  email: 'your.email@example.com'  # Optional
  phone: ''                        # Optional
  social:                          # Optional social media links
    github: 'username'
    twitter: 'username'
    linkedin: 'username'
    facebook: 'username'
    telegram: 'username'
```

### Technical Skills
Edit the skills section in `config.yaml`:
```yaml
skills:
  title: 'Skills'
  abilities:
    - name: 'python'      # Technology name
      level: 3           # 3 = Advanced, 2 = Intermediate, 1 = Beginner
```

### Icon Configuration
`icons.yaml` defines available icons for skills and project tags, supporting two types:
- Technology stack: vuejs, react, angular, nodejs, python, java, etc.
- Domains: machine-learning, frontend, backend, database, etc.

Using these names as skill or project tags will automatically display the corresponding icons, others will show a default icon.

### Card Positioning

Each card's `position` determines its placement on the page:

- `position: 1`: First card in the left column
- `position: 2`: First card in the right column
- `position: 3`: Second card in the left column
- `position: 4`: Second card in the right column

And so on. Odd positions are in the left column, even positions in the right column. Set `position` to 0 or negative to hide a card.

## Customization

Edit `tailwind.config.js` to customize colors and other theme options.

## Sponsoring

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/stvlynn)

[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/stvlynn)

ETH: 0xEbf67cd24fa23fde69843cA4119cE946d8c231F5

## License

[AGPL-3.0](./LICENSE)
