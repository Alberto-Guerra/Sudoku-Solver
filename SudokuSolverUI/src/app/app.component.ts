import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'SudokuSolverUI';
  sudokuGrid: number[][] =
  [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 3, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  solveSudoku() {
    this.sudokuGrid = [
      [5, 3, 2, 4, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 3, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]
    //this.solve(this.sudokuGrid);
  }
  checkValue(input : any) {
    if (input.value == 0) {
        input.value = '';
    }
  }
  solve(sudokuGrid: number[][]) {
    const apiUrl = 'https://api.example.com/solve-sudoku';
    const requestBody = { sudokuGrid };

    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => {
        // Assuming the API response contains the solved sudoku grid
        if (data && data.solvedGrid) {
          this.sudokuGrid = data.solvedGrid;
          return true;
        } else {
          console.log("No solution exists");
          return false;
        }
      })
      .catch(error => {
        console.error("Error solving sudoku:", error);
        return false;
      });
  }

  getSudokuValue(row: number, col: number) {
    let value = this.sudokuGrid[row][col];
    return value === 0 ? '' : value;
  }
 
}
