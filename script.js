function calculateWater() {
  const blockHeightInput = document.getElementById('blockHeight').value;
  const blockHeights = blockHeightInput.split(',').map(Number);

  const { totalWater, svgString } = calculateWaterUnits(blockHeights);

  document.getElementById('result').classList.remove('hidden');
  document.getElementById('svgContainer').classList.remove('hidden');

  const waterResult = document.getElementById('waterResult');
  waterResult.innerHTML = `Total Water Units: ${totalWater}`;

  const svgContainer = document.getElementById('svgContainer');
  svgContainer.innerHTML = svgString;
}

function calculateWaterUnits(heights) {
  let totalWater = 0;

  // Calculate total water and create SVG string
  let svgString = '<svg height="100" width="500" xmlns="http://www.w3.org/2000/svg">';

  for (let i = 0; i < heights.length; i++) {
      svgString += `<rect x="${i * 50}" y="${100 - heights[i]}" width="50" height="${heights[i]}" fill="gray" stroke="black" stroke-width="1"/>`;
  }

  for (let i = 1; i < heights.length - 1; i++) {
      const leftMax = Math.max(...heights.slice(0, i));
      const rightMax = Math.max(...heights.slice(i + 1));
      const minHeight = Math.min(leftMax, rightMax);

      if (minHeight > heights[i]) {
          totalWater += minHeight - heights[i];
          svgString += `<rect x="${i * 50}" y="${100 - minHeight}" width="50" height="${minHeight - heights[i]}" fill="blue" opacity="0.5" stroke="black" stroke-width="1"/>`;
      }
  }

  svgString += '</svg>';

  return { totalWater, svgString };
}
