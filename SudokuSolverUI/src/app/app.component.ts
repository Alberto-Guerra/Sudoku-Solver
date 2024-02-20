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
    [5, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 4, 0, 0, 0, 0, 6, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 8, 0],
    [9, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 6, 0, 0, 0, 0, 0, 0]
  ];
  sudokuInput: string = JSON.stringify(this.sudokuGrid);
  originalSudokuGrid?: number[][];

  solveSudoku() {
    this.originalSudokuGrid = this.sudokuGrid.map((row) => {
      return row.slice();
    });
    this.solve(this.sudokuGrid);
    
  }

  update(sudoku : string){
    this.sudokuGrid = JSON.parse(sudoku);
  }

  clean() {
    this.sudokuGrid = this.sudokuGrid.map((row) => {
      return row.map(() => 0);
    });
    this.originalSudokuGrid = undefined;
  }
  
  solve(sudokuGrid: number[][]) {
    const apiUrl = 'https://localhost:7160/sudoku/solvesudoku';
    const requestBody = sudokuGrid ;
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
        if (data) {
          console.log("Sudoku solved successfully");
          this.sudokuGrid = data;
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

  isOriginal(row: number, col: number) {
    if(this.originalSudokuGrid){
      return this.originalSudokuGrid[row][col] !== 0;
    }
    return false;
    
  }
 
}
