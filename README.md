# EasyProfile

A modern, responsive and customizable personal portfolio website built with:

- **React** + **TypeScript**
- **Tailwind CSS** for styling
- **Vite** for fast development

## Features

- 🎨 Modern and clean UI design
- 📱 Fully responsive layout
- 🌓 Dark mode support
- 🚀 Fast performance with lazy loading
- 📊 GitHub stats integration
- 📝 Markdown support for content

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/stvlynn/EasyProfile.git
```

2. Install dependencies
```bash
cd EasyProfile
pnpm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```
VITE_GITHUB_TOKEN=your_github_token_here
```

4. Run the development server
```bash
pnpm dev
```

5. Build for production
```bash
pnpm build
```

## Configuration

The profile data is stored in `src/config/profile.yaml`. You can modify:

- Personal information
- Social media links
- Projects
- Experience
- Education
- Tech stack

## Project Structure

```
EasyProfile/
├── public/              # Static assets
├── src/
│   ├── components/       # React components
│   ├── config/          # Profile configuration
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── main.tsx         # Entry point
├── .env.example         # Environment variables template
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.ts       # Vite configuration
└── README.md            # Project documentation
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
