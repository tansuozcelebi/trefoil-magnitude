/**
 * ControlPanel - Modular control panel for Trefoil Knot parameters
 * Provides a draggable interface for real-time parameter adjustment
 */
class ControlPanel {
    constructor(params, updateCallback) {
        this.params = params;
        this.updateCallback = updateCallback;
        this.element = null;
        this.isCollapsed = false;
        
        this.init();
    }
    
    init() {
        this.createElement();
        this.setupEventListeners();
        this.appendToDOM();
    }
    
    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'panel controls-panel';
        this.element.id = 'controls-panel';
        
        this.element.innerHTML = `
            <div class="drag-handle"></div>
            <div class="controls-content">
                <div class="controls-grid">
                    <div class="control-item">
                        <label for="magnitude">Magnitude: <span id="magnitude-val">${this.params.magnitude.toFixed(1)}</span></label>
                        <input type="range" id="magnitude" min="0.5" max="5" step="0.1" value="${this.params.magnitude}">
                    </div>
                    <div class="control-item">
                        <label for="frequency">Frequency: <span id="frequency-val">${this.params.frequency.toFixed(1)}</span></label>
                        <input type="range" id="frequency" min="0.5" max="3" step="0.1" value="${this.params.frequency}">
                    </div>
                </div>
                
                <div class="controls-section">
                    <div class="controls-grid">
                        <div class="control-item orange">
                            <label for="param-a">Param A: <span id="param-a-val">${this.params.paramA.toFixed(1)}</span></label>
                            <input type="range" id="param-a" min="0" max="2.5" step="0.1" value="${this.params.paramA}">
                        </div>
                        <div class="control-item orange">
                            <label for="param-b">Param B: <span id="param-b-val">${this.params.paramB.toFixed(1)}</span></label>
                            <input type="range" id="param-b" min="0" max="2.5" step="0.1" value="${this.params.paramB}">
                        </div>
                    </div>
                </div>
                
                <div class="controls-section">
                    <div class="controls-grid">
                        <div class="control-item">
                            <label for="base-radius">Base Radius: <span id="base-radius-val">${this.params.baseRadius.toFixed(2)}</span></label>
                            <input type="range" id="base-radius" min="0.05" max="0.5" step="0.01" value="${this.params.baseRadius}">
                        </div>
                        <div class="control-item">
                            <label for="radius-variation">Variation: <span id="radius-variation-val">${this.params.radiusVariation.toFixed(1)}</span></label>
                            <input type="range" id="radius-variation" min="0" max="10" step="0.1" value="${this.params.radiusVariation}">
                        </div>
                    </div>
                </div>
                
                <div class="controls-section">
                    <div class="controls-grid">
                        <div class="control-item">
                            <label for="variation-freq">Var Freq: <span id="variation-freq-val">${this.params.variationFreq.toFixed(1)}</span></label>
                            <input type="range" id="variation-freq" min="1" max="10" step="0.5" value="${this.params.variationFreq}">
                        </div>
                        <div class="control-item">
                            <label for="segments">Segments: <span id="segments-val">${this.params.segments}</span></label>
                            <input type="range" id="segments" min="50" max="400" step="10" value="${this.params.segments}">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        // Find all sliders and set up their event listeners
        const sliders = this.element.querySelectorAll('input[type="range"]');
        
        sliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                this.handleSliderChange(e.target);
            });
            
            // Also handle change event for when user releases the slider
            slider.addEventListener('change', (e) => {
                this.handleSliderChange(e.target);
            });
        });
        
        // Prevent drag events from interfering with slider interaction
        sliders.forEach(slider => {
            slider.addEventListener('mousedown', (e) => {
                e.stopPropagation();
            });
            
            slider.addEventListener('touchstart', (e) => {
                e.stopPropagation();
            });
        });
    }
    
    handleSliderChange(slider) {
        const value = parseFloat(slider.value);
        if (isNaN(value)) return;
        
        const id = slider.id;
        const displayElement = document.getElementById(`${id}-val`);
        
        // Update parameter based on slider id
        switch(id) {
            case 'magnitude':
                this.params.magnitude = value;
                if (displayElement) displayElement.textContent = value.toFixed(1);
                break;
                
            case 'frequency':
                this.params.frequency = value;
                if (displayElement) displayElement.textContent = value.toFixed(1);
                break;
                
            case 'param-a':
                this.params.paramA = value;
                if (displayElement) displayElement.textContent = value.toFixed(1);
                break;
                
            case 'param-b':
                this.params.paramB = value;
                if (displayElement) displayElement.textContent = value.toFixed(1);
                break;
                
            case 'base-radius':
                this.params.baseRadius = value;
                if (displayElement) displayElement.textContent = value.toFixed(2);
                break;
                
            case 'radius-variation':
                this.params.radiusVariation = value;
                if (displayElement) displayElement.textContent = value.toFixed(1);
                break;
                
            case 'variation-freq':
                this.params.variationFreq = value;
                if (displayElement) displayElement.textContent = value.toFixed(1);
                break;
                
            case 'segments':
                this.params.segments = Math.round(value);
                if (displayElement) displayElement.textContent = this.params.segments.toString();
                break;
                
            default:
                console.warn('Unknown slider:', id);
                return;
        }
        
        // Trigger mesh update
        if (this.updateCallback) {
            // Use a small delay to avoid too frequent updates during dragging
            clearTimeout(this.updateTimeout);
            this.updateTimeout = setTimeout(() => {
                this.updateCallback();
            }, 50);
        }
    }
    
    appendToDOM() {
        document.body.appendChild(this.element);
    }
    
    // Method to update display values without triggering callbacks
    updateDisplays() {
        const updateDisplay = (id, value, decimals = 1) => {
            const element = document.getElementById(`${id}-val`);
            if (element) {
                element.textContent = decimals === 0 ? value.toString() : value.toFixed(decimals);
            }
        };
        
        updateDisplay('magnitude', this.params.magnitude, 1);
        updateDisplay('frequency', this.params.frequency, 1);
        updateDisplay('param-a', this.params.paramA, 1);
        updateDisplay('param-b', this.params.paramB, 1);
        updateDisplay('base-radius', this.params.baseRadius, 2);
        updateDisplay('radius-variation', this.params.radiusVariation, 1);
        updateDisplay('variation-freq', this.params.variationFreq, 1);
        updateDisplay('segments', this.params.segments, 0);
    }
    
    // Method to reset parameters to default values
    resetToDefaults() {
        const defaults = {
            magnitude: 2.0,
            paramA: 0.5,
            paramB: 0.5,
            frequency: 1.0,
            baseRadius: 0.15,
            radiusVariation: 1.0,
            variationFreq: 3.0,
            rotationSpeed: 1.0,
            segments: 200
        };
        
        Object.assign(this.params, defaults);
        
        // Update all sliders
        const sliders = this.element.querySelectorAll('input[type="range"]');
        sliders.forEach(slider => {
            const paramName = this.getParamNameFromSliderId(slider.id);
            if (paramName && defaults[paramName] !== undefined) {
                slider.value = defaults[paramName];
            }
        });
        
        // Update displays
        this.updateDisplays();
        
        // Update mesh
        if (this.updateCallback) {
            this.updateCallback();
        }
    }
    
    getParamNameFromSliderId(sliderId) {
        const mapping = {
            'magnitude': 'magnitude',
            'frequency': 'frequency',
            'param-a': 'paramA',
            'param-b': 'paramB',
            'base-radius': 'baseRadius',
            'radius-variation': 'radiusVariation',
            'variation-freq': 'variationFreq',
            'segments': 'segments'
        };
        
        return mapping[sliderId];
    }
    
    // Method to get current parameter values as an object
    getParams() {
        return { ...this.params };
    }
    
    // Method to set parameters from an object
    setParams(newParams) {
        Object.assign(this.params, newParams);
        
        // Update sliders
        const sliders = this.element.querySelectorAll('input[type="range"]');
        sliders.forEach(slider => {
            const paramName = this.getParamNameFromSliderId(slider.id);
            if (paramName && newParams[paramName] !== undefined) {
                slider.value = newParams[paramName];
            }
        });
        
        // Update displays
        this.updateDisplays();
        
        // Update mesh
        if (this.updateCallback) {
            this.updateCallback();
        }
    }
    
    // Method to hide/show the control panel
    toggle() {
        this.isCollapsed = !this.isCollapsed;
        const content = this.element.querySelector('.controls-content');
        
        if (this.isCollapsed) {
            content.style.display = 'none';
            this.element.style.opacity = '0.7';
        } else {
            content.style.display = 'block';
            this.element.style.opacity = '1';
        }
    }
    
    // Method to destroy the control panel
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout);
        }
    }
}

// Export for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ControlPanel;
}