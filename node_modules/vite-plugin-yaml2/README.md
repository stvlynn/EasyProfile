# vite-plugin-yaml2

Vite plugin for convert YAML as JS export default

## Example

If we create YAML like this (`data.yml`):

```yaml
- name: Andre
  class: 1
- name: Agus
  class: 2
  hobby:
    - Swimming
    - Fishing
    - Sleep
```

We call it in `App.vue`:

```html
<script setup="">
  import data from "./data.yml";
</script>

<template>
  <p>{{ data }}</p>
</template>
```

This will return this:

```json
[
  {
    "name": "Andre",
    "class": 1
  },
  {
    "name": "Agus",
    "class": 2,
    "hobby": ["Swimming", "Fishing", "Sleep"]
  }
]
```

## Installation

```bash
npm i vite-plugin-yaml2
```

## Setup

Write this in `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import pluginYaml from "vite-plugin-yaml2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [pluginYaml()],
});
```

## TypeScript Error

Add this inside `/src/vite-env.d.ts`:

```typescript
declare module "*.yaml" {
  const value: any;
  export default value;
}
declare module "*.yml" {
  const value: any;
  export default value;
}
```

[Join Community](https://zenzen.web.id/komunitas)
