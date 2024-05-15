// Function to display result
  function showResult() {
    const mazeCells = document.querySelectorAll('.cell'); // Get all maze cells
    mazeCells.forEach(cell => {
      if (!cell.classList.contains('start') && !cell.classList.contains('end')) {
        cell.classList.remove('wall'); // Remove wall class
        cell.classList.remove('path'); // Remove path class
        if (cell.classList.contains('open')) {
          cell.classList.remove('open'); // Remove open class
        }
      }
    });
    // Get start and end cells
    const startCell = document.querySelector('.start');
    const endCell = document.querySelector('.end');
    const startRow = parseInt(startCell.style.top) / 20;
    const startCol = parseInt(startCell.style.left) / 20;
    const endRow = parseInt(endCell.style.top) / 20;
    const endCol = parseInt(endCell.style.left) / 20;
    const path = aStarSearch(startRow, startCol, endRow, endCol); // Find shortest path
    if (path.length > 0) {
      path.forEach(([row, col]) => {
        const cellIndex = row * cols + col;
        mazeCells[cellIndex].classList.add('path'); // Add path class to cells in shortest path
      });
    } else {
      alert('No path found!'); // Alert if no path found
    }
  }

  // A* Search Algorithm
  function aStarSearch(startRow, startCol, endRow, endCol) {
    // A* search algorithm implementation
    // This function should return an array of coordinates representing the shortest path from start to end
    // If no path is found, return an empty array []
    // You can implement this function using any A* search algorithm implementation
    // For simplicity, a basic implementation is provided here
    const frontier = [{ row: startRow, col: startCol, cost: 0 }];
    const cameFrom = {};
    const costSoFar = {};
    cameFrom[`${startRow},${startCol}`] = null;
    costSoFar[`${startRow},${startCol}`] = 0;
    while (frontier.length > 0) {
      frontier.sort((a, b) => a.cost - b.cost);
      const current = frontier.shift();
      if (current.row === endRow && current.col === endCol) {
        const path = [];
        let node = current;
        while (node) {
          path.push([node.row, node.col]);
          node = cameFrom[`${node.row},${node.col}`];
        }
        return path.reverse(); // Return shortest path
      }
      const neighbors = getNeighbors(current.row, current.col); // Get neighboring cells
      neighbors.forEach(neighbor => {
        const newCost = costSoFar[`${current.row},${current.col}`] + 1;
        if (!(neighbor.row in costSoFar) || newCost < costSoFar[`${neighbor.row},${neighbor.col}`]) {
          costSoFar[`${neighbor.row},${neighbor.col}`] = newCost;
          const priority = newCost + heuristic(neighbor.row, neighbor.col, endRow, endCol);
          frontier.push({ row: neighbor.row, col: neighbor.col, cost: priority });
          cameFrom[`${neighbor.row},${neighbor.col}`] = { row: current.row, col: current.col };
        }
      });
    }
    return []; // Return empty array if no path found
  }

  // Function to get neighboring cells
  function getNeighbors(row, col) {
    const neighbors = [];
    if (row > 0) neighbors.push({ row: row - 1, col });
    if (col > 0) neighbors.push({ row, col: col - 1 });
    if (row < rows - 1) neighbors.push({ row: row + 1, col });
    if (col < cols - 1) neighbors.push({ row, col: col + 1 });
    return neighbors;
  }

  // Heuristic function for A* search
  function heuristic(row1, col1, row2, col2) {
    return Math.abs(row1 - row2) + Math.abs(col1 - col2);
  }

  // Function to clear maze
  function clearMaze() {
    const mazeContainer = document.getElementById('mazeContainer');
    mazeContainer.innerHTML = '';
  }
</script>
</body>
</html>
