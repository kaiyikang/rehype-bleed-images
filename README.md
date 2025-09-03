# rehype-bleed-images

[![npm version](https://badge.fury.io/js/rehype-bleed-images.svg)](https://www.npmjs.com/package/rehype-bleed-images)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A [rehype](https://github.com/rehypejs/rehype) plugin designed for Tailwind CSS prose that allows images in prose-styled markdown documents to bleed beyond their container boundaries, creating full-width images that span the entire viewport width.

Ideal for Astro-powered blogs and documentation sites using Tailwind CSS prose to style markdown content, allowing images to break free from prose containers for full-width impact while staying responsive.

## Features

- 🖼️ **Full-width images** - Images span the entire viewport width
- 📱 **Responsive** - Maintains aspect ratio and scales properly
- 🎯 **Selective** - Easy opt-out mechanism for specific images
- 🎨 **Tailwind-ready** - Uses Tailwind CSS classes
- ⚡ **Zero config** - Works out of the box

## Installation

```bash
npm install rehype-bleed-images
```

## Usage

### For rehype

```javascript
import { rehype } from "rehype";
import rehypeBleedImages from "rehype-bleed-images";

const processor = rehype().use(rehypeBleedImages).process(html);
```

### With unified/remark

```javascript
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeBleedImages from "rehype-bleed-images";
import rehypeStringify from "rehype-stringify";

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeBleedImages)
  .use(rehypeStringify);
```

## Examples

### Input

```html
<img src="landscape.jpg" alt="Beautiful landscape" />
```

### Output

```html
<div class="not-prose my-6 relative left-1/2 -translate-x-1/2 w-screen">
  <img
    src="landscape.jpg"
    alt="Beautiful landscape"
    class="w-screen max-h-screen h-auto object-contain block"
  />
</div>
```

### Opt-out

To prevent specific images from bleeding, add "not bleed" to the title attribute:

```html
<img src="small-icon.png" alt="Icon" title="This should not bleed" />
```

## API

### `rehypeBleedImages()`

Returns a rehype transformer that processes all `img` elements in the HTML tree.

**CSS Classes Applied:**

- **Container:** `not-prose my-6 relative left-1/2 -translate-x-1/2 w-screen`
- **Image:** `w-screen max-h-screen h-auto object-contain block`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]
