import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import yaml from 'js-yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      )

      // 2. Read config.yaml
      const config = yaml.load(fs.readFileSync(
        path.resolve(__dirname, 'src/config/config.yaml'),
        'utf-8'
      ))

      // 3. Apply Vite HTML transforms
      template = await vite.transformIndexHtml(url, template)

      // 4. Replace meta tags with config values
      template = template.replace(
        '<title>Personal Profile</title>',
        `<title>${config.site.title}</title>`
      )
      template = template.replace(
        '<link rel="icon" type="image/svg+xml" href="/vite.svg" />',
        `<link rel="icon" href="${config.site.favicon}" />`
      )
      template = template.replace(
        '<meta property="og:description" content="Steven Lynn\'s About Page">',
        `<meta property="og:description" content="${config.og.description}">`
      )
      template = template.replace(
        '<meta property="og:image:width" content="1189">',
        `<meta property="og:image:width" content="${config.og.image.width}">`
      )
      template = template.replace(
        '<meta property="og:image:height" content="795">',
        `<meta property="og:image:height" content="${config.og.image.height}">`
      )
      template = template.replace(
        '<meta property="og:image" content="https://cdn.statically.io/gh/stvlynn/cloudimg@master/blog/2310/image.64v30jxjis00.webp">',
        `<meta property="og:image" content="${config.og.image.url}">`
      )

      // 5. Send the rendered HTML back
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(5173, () => {
    console.log('Server running at http://localhost:5173')
  })
}

createServer()
