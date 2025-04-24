# Livepeer Contributors Widget

A responsive and customizable widget that showcases Livepeer's community contributors. Built with Next.js and styled to match Livepeer's design system.

![Widget Preview](public/widget-preview.png)

## Features

- 🎯 Randomly displays contributors from the Livepeer community
- 🔄 Auto-rotates to showcase different contributors
- 🌗 Supports light and dark modes
- 📱 Fully responsive design
- ⚡ Optimized performance with Next.js

## Quick Start

### Installation

Add the widget to your website by including this script:

```html
<div id="livepeer-contributors"></div>
<script src="https://your-widget-url.com/embed.js"></script>
```

### Configuration

The widget accepts several configuration options:

```html
<div 
  id="livepeer-contributors"
  data-max-display="1"
  data-auto-rotate="true"
  data-rotation-interval="5000"
  data-randomize="true"
></div>
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| data-max-display | number | 1 | Number of contributors to show |
| data-auto-rotate | boolean | true | Enable auto-rotation |
| data-rotation-interval | number | 5000 | Rotation interval in ms |
| data-randomize | boolean | true | Randomize initial selection |

## Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/livepeer-contributors-widget.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details.
