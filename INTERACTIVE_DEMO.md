# Interactive Demo: Charts and HTML Content

This is a demonstration of interactive content that can now be included in blog posts.

## Interactive Chart Example

<div class="chart-container">
  <canvas id="demoChart" width="400" height="200"></canvas>
</div>

## Tabbed Content Example

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-button active">Overview</button>
    <button class="tab-button">Features</button>
    <button class="tab-button">Examples</button>
  </div>
  <div class="tab-content">
    <h3>Overview</h3>
    <p>This is the overview tab content. You can add any HTML content here including text, images, and even more interactive elements.</p>
  </div>
  <div class="tab-content" hidden>
    <h3>Features</h3>
    <ul>
      <li>Interactive charts with Chart.js</li>
      <li>Tabbed content sections</li>
      <li>Responsive design</li>
      <li>Custom styling</li>
    </ul>
  </div>
  <div class="tab-content" hidden>
    <h3>Examples</h3>
    <p>Here you can show code examples, images, or other content specific to this tab.</p>
  </div>
</div>

## Interactive Buttons

<button class="interactive-button">Primary Action</button>
<button class="interactive-button">Secondary Action</button>
<button class="interactive-button">Learn More</button>

## Data Visualization

<div class="data-visualization">
  <h3>Sample Data Visualization</h3>
  <p>This area can contain charts, graphs, or other data visualizations.</p>
</div>

## Interactive Container

<div class="interactive-container">
  <h3>Interactive Widget Area</h3>
  <p>This container can hold any interactive content including:</p>
  <ul>
    <li>Embedded iframes</li>
    <li>Interactive maps</li>
    <li>Calculators</li>
    <li>Forms and surveys</li>
  </ul>
</div>

## Code Example with Syntax Highlighting

```javascript
// Example of interactive JavaScript
function createInteractiveChart() {
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sample Data',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
```

## Responsive Tables

| Feature | Description | Status |
|---------|-------------|--------|
| Charts | Interactive data visualization | ✅ |
| Tabs | Multi-content organization | ✅ |
| Buttons | Interactive elements | ✅ |
| Containers | Flexible content areas | ✅ |

This demonstrates how you can now include rich, interactive content in your blog posts!