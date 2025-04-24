# Livepeer Contributors Widget

A responsive and customizable widget that showcases Livepeer's community contributors.

## Quick Integration

Add the widget to your website with a single line of code:

```html
<script 
  src="https://your-widget-domain.com/embed.js"
  data-max-display="1"
  data-auto-rotate="true"
  data-rotation-interval="5000"
  data-randomize="true"
></script>
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| data-max-display | number | 1 | Number of contributors to display |
| data-auto-rotate | boolean | true | Enable auto-rotation |
| data-rotation-interval | number | 5000 | Rotation interval in ms |
| data-randomize | boolean | true | Randomize contributor selection |

## Features

✅ Randomized Selection: Fair exposure for all contributors
✅ Auto-Rotation: Showcase different contributors automatically
✅ Responsive Design: Adapts to any screen size
✅ Easy Integration: Single line of code to embed
✅ Livepeer Styling: Matches Livepeer's design system

## Examples

### Basic Integration
```html
<script src="https://your-widget-domain.com/embed.js"></script>
```

### Custom Configuration
```html
<script 
  src="https://your-widget-domain.com/embed.js"
  data-max-display="3"
  data-rotation-interval="3000"
></script>
```

### Fixed Display (No Rotation)
```html
<script 
  src="https://your-widget-domain.com/embed.js"
  data-auto-rotate="false"
></script>
```

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
