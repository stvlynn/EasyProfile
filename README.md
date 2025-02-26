# EasyProfile

A modern, customizable personal portfolio template with a sleek design and powerful features.

![EasyProfile](img/profile.png)

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20Me-yellow?style=flat-square&logo=buy-me-a-coffee)](https://buymeacoffee.com/stvlynn)


## 🌟 Features

- **YAML Configuration** - Update your portfolio without touching code
- **Bento Grid Layout** - Showcase your work with a modern card-based UI
- **Social Media Integration** - GitHub, Twitter and custom social links
- **Interactive Maps** - Display your locations with integrated maps
- **Dark Mode** - Elegant dark theme for optimal viewing
- **Full Responsiveness** - Perfect display on all devices
- **Resume Export** - Generate PDF resumes with one click
- **Markdown Support** - Rich text formatting for content sections
- **Section Navigation** - Smooth scrolling between portfolio sections
- **Easter Eggs** - Hidden features for curious visitors
- **Custom Cards** - Various card types for different content needs
- **Performance Optimized** - Fast loading and smooth animations

## 🚀 Technologies

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Maps**: Leaflet
- **PDF Export**: jsPDF + html2canvas

## 📋 Getting Started

### Prerequisites

- Node.js 16+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/stvlynn/EasyProfile.git
cd EasyProfile
```

2. Install dependencies
```bash
pnpm install
# or
npm install
```

3. Start development server
```bash
pnpm dev
# or
npm run dev
```

4. Build for production
```bash
pnpm build
# or
npm run build
```

## 🚀 Deployment

### Deploying to Vercel


[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fstvlynn%2FEasyProfile)



## 🔧 Configuration

EasyProfile uses a central YAML configuration file located at `/public/config/profile.yaml`. This allows you to update your portfolio content without touching any code.

### Configuration Sections

- **Meta Information** - Title, favicon, description
- **Sections Order** - Control which sections appear and in what order
- **Personal Information** - Name, avatar, tagline, email
- **Social Media Links** - Connect your various online profiles
- **Bento Cards** - Customizable grid of information cards
- **Projects** - Showcase your work with descriptions and links
- **Experience** - Professional history and achievements
- **Education** - Academic background
- **Tech Stack** - Technical skills with proficiency levels
- **Easter Eggs** - Hidden features to delight visitors

### Example Configuration

```yaml
meta:
  title: "Your Name - Position"
  description: "Personal portfolio showcasing skills and experience"
  favicon: "/avatar.jpg"
  resumeExport:
    enabled: true
    sections:
      profile: true
      experiences: true
      # ...

profile:
  name: Your Name
  tagline: Web Developer & Designer
  # ...

# More configuration sections...
```

## 🔍 Project Structure

```
EasyProfile/
├── public/
│   ├── config/           # Configuration files (YAML, Markdown)
│   │   ├── profile.yaml  # Main configuration file
│   │   ├── intro.md      # Markdown content
│   │   └── eggs/         # Easter egg content
│   └── assets/           # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── cards/        # Card components for bento grid
│   │   └── sections/     # Main section components
│   ├── config/           # Frontend configuration
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── index.html            # HTML template
└── package.json          # Dependencies and scripts
```

## 💡 Advanced Usage

### Custom Cards

You can create various card types in your Bento grid:

- GitHub profile cards
- Twitter cards
- Map cards (with Leaflet integration)
- Link cards
- Text cards
- Custom cards with your own content

### Easter Eggs

Add hidden surprises for visitors:

```yaml
easterEggs:
  enabled: true
  autoDisplay: true
  eggs:
    - id: welcome
      trigger: "hi"
      content: ./eggs/welcome.txt
    # More easter eggs...
```

Access them by typing the trigger or using console.log with the trigger word.

## 📊 Project Stats

### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=stvlynn/EasyProfile&type=Date)](https://star-history.com/#stvlynn/EasyProfile&Date)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

Made with ❤️ by [stvlynn](https://github.com/stvlynn)
![IMG_4946.JPG](https://s2.loli.net/2025/02/27/eXHgWGYf9wtvky1.jpg)
