/**
 * ControlPanel - Modular control panel for trefoil knot parameters
 * Provides real-time parameter adjustment with draggable interface
 */
class ControlPanel {
    constructor(params, updateCallback) {
        this.params = params;
        this.updateCallback = updateCallback;
        this.element = null;
        this.controls = {};
        this.init();
    }

    init() {
        this.createElement();
        this.setupControls();
        this.attachEventListeners();
        this.insertIntoDOM();
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'panel controls-panel';
        this.element.innerHTML = this.getHTML();
    }

    getHTML() {
        return `
            <div class="drag-handle"></div>
            <div class="controls-grid">
                <div class="control-item">
                    <label for="magnitude">Magnitude</label>
                    <input type="range" id="magnitude" min="0.5" max="5" value="${this.params.magnitude}" step="0.1">
                    <span id="magnitude-val">${this.params.magnitude.toFixed(1)}</span>
                </div>
                <div class="control-item">
                    <label for="frequency">Frequency</label>
                    <input type="range" id="frequency" min="0.5" max="3" value="${this.params.frequency}" step="0.1">
                    <span id="frequency-val">${this.params.frequency.toFixed(1)}</span>
                </div>
                <div class="control-item">
                    <label for="param-a">A</label>
                    <input type="range" id="param-a" min="0" max="25" value="${this.params.paramA}" step="0.1">
                    <span id="param-a-val">${this.params.paramA.toFixed(1)}</span>
                </div>
                <div class="control-item">
                    <label for="param-b">B</label>
                    <input type="range" id="param-b" min="0" max="25" value="${this.params.paramB}" step="0.1">
                    <span id="param-b-val">${this.params.paramB.toFixed(1)}</span>
                </div>
            </div>
            <div class="controls-section">
                <div class="controls-grid">
                    <div class="control-item orange">
                        <label for="base-radius">Radius</label>
                        <input type="range" id="base-radius" min="0.05" max="0.5" value="${this.params.baseRadius}" step="0.01">
                        <span id="base-radius-val">${this.params.baseRadius.toFixed(2)}</span>
                    </div>
                    <div class="control-item orange">
                        <label for="radius-variation">Variation</label>
                        <input type="range" id="radius-variation" min="0" max="10" value="${this.params.radiusVariation}" step="0.1">
                        <span id="radius-variation-val">${this.params.radiusVariation.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    setupControls() {
        // Store references to all control elements
        this.controls = {
            magnitude: {
                slider: this.element.querySelector('#magnitude'),
                display: this.element.querySelector('#magnitude-val'),
                property: 'magnitude'
            },
            frequency: {
                slider: this.element.querySelector('#frequency'),
                display: this.element.querySelector('#frequency-val'),
                property: 'frequency'
            },
            paramA: {
                slider: this.element.querySelector('#param-a'),
                display: this.element.querySelector('#param-a-val'),
                property: 'paramA'
            },
            paramB: {
                slider: this.element.querySelector('#param-b'),
                display: this.element.querySelector('#param-b-val'),
                property: 'paramB'
            },
            baseRadius: {
                slider: this.element.querySelector('#base-radius'),
                display: this.element.querySelector('#base-radius-val'),
                property: 'baseRadius'
            },
            radiusVariation: {
                slider: this.element.querySelector('#radius-variation'),
                display: this.element.querySelector('#radius-variation-val'),
                property: 'radiusVariation'
            }
        };
    }

    attachEventListeners() {
        Object.values(this.controls).forEach(control => {
            control.slider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                this.params[control.property] = value;
                
                // Update display
                const decimals = control.property === 'baseRadius' ? 2 : 1;
                control.display.textContent = value.toFixed(decimals);
                
                // Trigger mesh update
                if (this.updateCallback) {
                    this.updateCallback();
                }
            });

            // Add touch event support for mobile
            control.slider.addEventListener('touchmove', (e) => {
                e.preventDefault();
            }, { passive: false });
        });
    }

    insertIntoDOM() {
        document.body.appendChild(this.element);
    }

    // Public methods for external control
    updateParam(paramName, value) {
        if (this.controls[paramName]) {
            this.params[paramName] = value;
            this.controls[paramName].slider.value = value;
            
            const decimals = paramName === 'baseRadius' ? 2 : 1;
            this.controls[paramName].display.textContent = value.toFixed(decimals);
            
            if (this.updateCallback) {
                this.updateCallback();
            }
        }
    }

    getParam(paramName) {
        return this.params[paramName];
    }

    getAllParams() {
        return { ...this.params };
    }

    // Reset to default values
    reset() {
        const defaults = {
            magnitude: 2.0,
            paramA: 0.5,
            paramB: 0.5,
            frequency: 1.0,
            baseRadius: 0.15,
            radiusVariation: 1.0
        };

        Object.keys(defaults).forEach(key => {
            if (this.controls[key]) {
                this.updateParam(key, defaults[key]);
            }
        });
    }

    // Preset configurations
    loadPreset(presetName) {
        const presets = {
            default: {
                magnitude: 2.0,
                paramA: 0.5,
                paramB: 0.5,
                frequency: 1.0,
                baseRadius: 0.15,
                radiusVariation: 1.0
            },
            tight: {
                magnitude: 1.5,
                paramA: 0.3,
                paramB: 0.3,
                frequency: 1.5,
                baseRadius: 0.1,
                radiusVariation: 0.5
            },
            loose: {
                magnitude: 3.0,
                paramA: 0.8,
                paramB: 0.8,
                frequency: 0.8,
                baseRadius: 0.2,
                radiusVariation: 2.0
            },
            minimal: {
                magnitude: 1.0,
                paramA: 0.1,
                paramB: 0.1,
                frequency: 1.0,
                baseRadius: 0.05,
                radiusVariation: 0.1
            },
            extreme: {
                magnitude: 4.0,
                paramA: 2.0,
                paramB: 2.0,
                frequency: 2.5,
                baseRadius: 0.4,
                radiusVariation: 5.0
            }
        };

        const preset = presets[presetName];
        if (preset) {
            Object.keys(preset).forEach(key => {
                if (this.controls[key]) {
                    this.updateParam(key, preset[key]);
                }
            });
        }
    }

    // Animation methods
    animateToPreset(presetName, duration = 2000) {
        const preset = this.getPreset(presetName);
        if (!preset) return;

        const startValues = this.getAllParams();
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const eased = 1 - Math.pow(1 - progress, 3);

            Object.keys(preset).forEach(key => {
                if (this.controls[key]) {
                    const start = startValues[key];
                    const end = preset[key];
                    const current = start + (end - start) * eased;
                    this.updateParam(key, current);
                }
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    getPreset(presetName) {
        const presets = {
            default: {
                magnitude: 2.0,
                paramA: 0.5,
                paramB: 0.5,
                frequency: 1.0,
                baseRadius: 0.15,
                radiusVariation: 1.0
            },
            tight: {
                magnitude: 1.5,
                paramA: 0.3,
                paramB: 0.3,
                frequency: 1.5,
                baseRadius: 0.1,
                radiusVariation: 0.5
            },
            loose: {
                magnitude: 3.0,
                paramA: 0.8,
                paramB: 0.8,
                frequency: 0.8,
                baseRadius: 0.2,
                radiusVariation: 2.0
            }
        };

        return presets[presetName];
    }

    // Destroy method for cleanup
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
        this.controls = {};
    }
}

// Utility function for parameter validation
function validateParam(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ControlPanel;
}

// Global error handling for the control panel
window.addEventListener('error', (e) => {
    if (e.filename && e.filename.includes('controls.js')) {
        console.error('ControlPanel Error:', e.error);
        // Could add user-friendly error display here
    }
});

// Performance monitoring (optional)
if (window.performance && window.performance.mark) {
    window.performance.mark('controls-js-loaded');
}