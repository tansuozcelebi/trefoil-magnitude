# 🌀 Trefoil Knot Visualizer

An interactive 3D visualization of the trefoil knot with real-time parameter controls, built with Three.js and modern web technologies.

## 🎯 Features

### Core Visualization
- **3D Trefoil Knot**: Mathematical precision with beautiful rendering
- **Real-time Animation**: Smooth rotation with adjustable speed
- **Interactive Controls**: Drag to orbit, scroll to zoom
- **Variable Radius**: Dynamic tube thickness with mathematical variations

### User Interface
- **Modular Control Panel**: Draggable interface with gradient handle
- **Parameter Controls**: Real-time adjustment of mathematical parameters
- **Responsive Design**: Works on desktop and mobile devices
- **Clean Modern UI**: Dark theme with glassmorphism effects

### Technical Features
- **Modular Architecture**: Separated CSS and JavaScript modules
- **Performance Optimized**: Efficient Three.js rendering
- **Cross-browser Compatible**: Works across modern browsers
- **Mobile Touch Support**: Touch controls for mobile devices

## 🚀 Live Demo

Simply open `index.html` in your web browser or visit the live demo!

## 🎮 How to Use

1. **Navigate**: Click and drag to rotate the view
2. **Zoom**: Scroll to zoom in/out
3. **Controls**: Use the draggable control panel to adjust parameters
4. **Drag Handle**: Grab the colorful bar at the top of the control panel to move it

### Mathematical Parameters
- **Magnitude**: Overall size of the knot (0.5 - 5.0)
- **A & B**: Shape parameters affecting the knot's form (0 - 25)
- **Frequency**: Controls the knot's winding frequency (0.5 - 3.0)
- **Radius**: Base tube thickness (0.05 - 0.5)
- **Variation**: Tube radius variation intensity (0 - 10)
- **Speed**: Animation rotation speed (0 - 3.0)

## 📁 Project Structure

```
trefoil-knot-visualizer/
├── .github/
│   └── copilot-instructions.md  # AI assistant configuration
├── index.html                   # Main application file
├── styles.css                   # All styling and animations  
├── controls.js                  # Modular control panel
├── trefoil_knot.html           # Legacy version
└── README.md                   # This documentation
```

## 🛠️ Technologies Used

- **Three.js** - 3D graphics and WebGL rendering
- **Vanilla JavaScript (ES6+)** - Core application logic
- **HTML5** - Structure and canvas
- **CSS3** - Styling, gradients, and glassmorphism effects
- **Mathematical Functions** - Trefoil knot parametric equations

## 🎨 Design Highlights

- **Glassmorphism UI**: Frosted glass effect with backdrop blur
- **Gradient Drag Handle**: Blue-to-green gradient for intuitive interaction
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: 60fps performance with optimized rendering
- **Modern Color Palette**: Dark theme with accent colors

## 📱 Compatibility

- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Browser
- **Requirements**: WebGL-enabled browser (2015+)

## 🔧 Development

### Quick Start
```bash
# Clone the repository
git clone https://github.com/tansuozcelebi/trefoil-magnitude.git
cd trefoil-magnitude

# Open in browser
open index.html
# or use a local server for better development experience
```

### Architecture
- **Modular Design**: Each component is in its own file
- **Class-based Controls**: ControlPanel class for reusability
- **Event-driven**: Real-time parameter updates
- **Performance Focus**: Optimized geometry calculations

## 🎓 Mathematical Background

The trefoil knot is represented using parametric equations:
- x(t) = magnitude × (sin(frequency×t) + A×sin(3×frequency×t))
- y(t) = magnitude × (cos(frequency×t) - A×cos(3×frequency×t))  
- z(t) = magnitude × B×sin(2×frequency×t)

Where t ranges from 0 to 2π, creating the classic trefoil knot shape with customizable parameters.

## 🚀 Future Enhancements

- [ ] Additional knot types (figure-eight, torus knots)
- [ ] Texture and material options
- [ ] Export functionality (screenshots, 3D models)
- [ ] Preset parameter combinations
- [ ] VR/AR support
- [ ] Educational mode with mathematical explanations

## 👨‍💻 Author

**Tansu Özçelebi** - 2025

## 📄 License

This project is open source and available under the MIT License.

---

*Built with ❤️ and lots of mathematics*