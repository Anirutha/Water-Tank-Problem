function calculateWaterUnits(heights) {
  let totalUnits = 0;
  const n = heights.length;

  for (let i = 1; i < n - 1; i++) {
    let leftMax = Math.max(...heights.slice(0, i));
    let rightMax = Math.max(...heights.slice(i + 1));
    let minHeight = Math.min(leftMax, rightMax);

    if (minHeight > heights[i]) {
      totalUnits += minHeight - heights[i];
    }
  }

  return totalUnits;
}

function renderWaterTank() {
  const userInput = document.getElementById('heightInput').value;
  const input = userInput.split(',').map(value => parseInt(value, 10));

  const waterTank = document.getElementById('waterTank');
  waterTank.innerHTML = '';

  // Create x-axis
  const xAxis = document.createElement('div');
  xAxis.className = 'axis';
  xAxis.id = 'xAxisLabel';
  xAxis.innerText = 'Block Index';
  waterTank.appendChild(xAxis);

  // Create y-axis
  const yAxis = document.createElement('div');
  yAxis.className = 'axis';
  yAxis.id = 'yAxisLabel';
  yAxis.innerText = 'Block Height';
  waterTank.appendChild(yAxis);

  for (let i = 0; i < input.length; i++) {
    const block = document.createElement('div');
    block.className = 'block';
    block.style.height = `${input[i] * 30}px`;
    waterTank.appendChild(block);
  }

  const water = document.createElement('div');
  const waterUnits = calculateWaterUnits(input);
  water.className = 'water';
  water.style.width = `${input.length * 32}px`;
  
  // Adjust width to cover all blocks
  water.style.height = `${waterUnits}px`;
  water.style.bottom = '0';
  water.style.position = 'absolute';
  waterTank.appendChild(water);

  // Label for total water units
  const waterLabel = document.createElement('div');
  waterLabel.className = 'axis';
  waterLabel.id = 'waterLabel';
  waterLabel.innerText = `Total Water Units: ${waterUnits}`;
  waterTank.appendChild(waterLabel);

  // Hide input field and button
  document.getElementById('inputContainer').style.display = 'none';
}
