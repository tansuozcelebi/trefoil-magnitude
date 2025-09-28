// Control Panel Module for Trefoil Knot
class ControlPanel {
    constructor(params, createTrefoilMeshCallback) {
        this.params = params;
        this.createTrefoilMesh = createTrefoilMeshCallback;
        this.init();
    }

    // Create control panel HTML
    createHTML() {
        const controlsHTML = `
            <div class="panel controls-panel" id="controls-panel">
                <div class="drag-handle"></div>
                <!-- Main Parameters -->
                <div class="controls-grid">
                    <div class="control-item">
                        <label for="magnitude">Magnitude: <span id="magnitude-val">2.0</span></label>
                        <input type="range" id="magnitude" min="0.5" max="5" step="0.1" value="2">
                    </div>
                    
                    <div class="control-item">
                        <label for="param-a">A: <span id="param-a-val">0.50</span></label>
                        <input type="range" id="param-a" min="0" max="25" step="0.1" value="0.5">
                    </div>
                    
                    <div class="control-item">
                        <label for="param-b">B: <span id="param-b-val">0.50</span></label>
                        <input type="range" id="param-b" min="0" max="25" step="0.1" value="0.5">
                    </div>
                    
                    <div class="control-item">
                        <label for="frequency">Freq: <span id="frequency-val">1.0</span></label>
                        <input type="range" id="frequency" min="0.5" max="3" step="0.1" value="1">
                    </div>
                </div>

                <!-- Tube Properties -->
                <div class="controls-grid controls-section">
                    <div class="control-item orange">
                        <label for="base-radius">Radius: <span id="base-radius-val">0.15</span></label>
                        <input type="range" id="base-radius" min="0.05" max="0.5" step="0.01" value="0.15">
                    </div>
                    
                    <div class="control-item orange">
                        <label for="radius-variation">Variation: <span id="radius-variation-val">1.0</span></label>
                        <input type="range" id="radius-variation" min="0" max="10" step="0.1" value="1">
                    </div>
                </div>
            </div>
        `;
        return controlsHTML;
    }

    // Setup individual control
    setupControl(id, property) {
        const slider = document.getElementById(id);
        const display = document.getElementById(id + '-val');
        
        if (!slider || !display) return;
        
        slider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            if (isNaN(value)) return;
            
            this.params[property] = value;
            display.textContent = value.toFixed(id === 'segments' ? 0 : (value < 1 ? 2 : 1));
            
            if (property !== 'rotationSpeed') {
                this.createTrefoilMesh();
            }
        });
        
        display.textContent = this.params[property].toFixed(this.params[property] < 1 ? 2 : 1);
    }

    // Initialize the control panel
    init() {
        // Inject HTML into document
        const existingControls = document.querySelector('.controls-panel');
        if (existingControls) {
            existingControls.outerHTML = this.createHTML();
        } else {
            // If no existing controls, add to body
            document.body.insertAdjacentHTML('beforeend', this.createHTML());
        }

        // Setup all controls
        this.setupControl('magnitude', 'magnitude');
        this.setupControl('param-a', 'paramA');
        this.setupControl('param-b', 'paramB');
        this.setupControl('frequency', 'frequency');
        this.setupControl('base-radius', 'baseRadius');
        this.setupControl('radius-variation', 'radiusVariation');
    }

    // Update parameter values (for external updates)
    updateParams(newParams) {
        Object.assign(this.params, newParams);
        
        // Update displays
        const controls = [
            ['magnitude', 'magnitude'],
            ['param-a', 'paramA'],
            ['param-b', 'paramB'],
            ['frequency', 'frequency'],
            ['base-radius', 'baseRadius'],
            ['radius-variation', 'radiusVariation']
        ];

        controls.forEach(([id, property]) => {
            const slider = document.getElementById(id);
            const display = document.getElementById(id + '-val');
            
            if (slider && display && this.params[property] !== undefined) {
                slider.value = this.params[property];
                display.textContent = this.params[property].toFixed(this.params[property] < 1 ? 2 : 1);
            }
        });
    }

    // Get current parameter values
    getParams() {
        return { ...this.params };
    }

    // Show/hide control panel
    toggle() {
        const panel = document.getElementById('controls-panel');
        if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
    }

    // Destroy control panel
    destroy() {
        const panel = document.getElementById('controls-panel');
        if (panel) {
            panel.remove();
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ControlPanel;
} else if (typeof window !== 'undefined') {
    window.ControlPanel = ControlPanel;
}