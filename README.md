# Livepeer Contributors Widget

A responsive and customizable widget that showcases Livepeer's community contributors.

## Quick Integration

Add the widget to your website with a single line of code:

```html
<iframe
  src="https://livepeer-hub-widget.vercel.app/widget"
  style="border: none; width: 100%; height: 400px; max-width: 600px; border-radius: 12px; overflow: hidden;"
  title="Livepeer Contributors Spotlight"
></iframe>
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| maxDisplay | number | 1 | Number of contributors to display |
| autoRotate | boolean | true | Enable auto-rotation |
| rotationInterval | number | 5000 | Rotation interval in milliseconds |
| randomize | boolean | true | Randomize contributor selection |
| theme | string | 'light' | Widget theme ('light' or 'dark') |

## Features

✅ Randomized Selection: Fair exposure for all contributors
✅ Auto-Rotation: Showcase different contributors automatically
✅ Responsive Design: Adapts to any screen size
✅ Easy Integration: Single line of code to embed
✅ Livepeer Styling: Matches Livepeer's design system
✅ Dark/Light Theme Support

## Examples

### Basic Integration
```html
<iframe
  src="https://livepeer-hub-widget.vercel.app/widget"
  style="border: none; width: 100%; height: 400px; max-width: 600px; border-radius: 12px; overflow: hidden;"
  title="Livepeer Contributors Spotlight"
></iframe>
```

### Dark Theme
```html
<iframe
  src="https://livepeer-hub-widget.vercel.app/widget?theme=dark"
  style="border: none; width: 100%; height: 400px; max-width: 600px; border-radius: '12px'; overflow: hidden;"
  title="Livepeer Contributors Spotlight - Dark Theme"
></iframe>
```

### Custom Configuration
```html
<iframe
  src="https://livepeer-hub-widget.vercel.app/widget?maxDisplay=3&autoRotate=true&rotationInterval=3000&randomize=true&theme=light"
  style="border: none; width: 100%; height: 400px; max-width: 600px; border-radius: 12px; overflow: hidden;"
  title="Livepeer Contributors Spotlight - Custom Config"
></iframe>
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

3. Start the development server:
```bash
npm run dev
```

4. Test the widget:
- Visit `http://localhost:3000/test` to see different widget configurations
- Visit `http://localhost:3000/widget` to see the standalone widget

## Testing

The widget can be tested locally using the test page at `/test`. This page demonstrates various configurations:
- Basic widget
- Dark theme widget
- Custom configuration widget

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details.
