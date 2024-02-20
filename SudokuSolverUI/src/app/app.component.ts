import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SudokuSolverUI';
  sudokuGrid: string[][] = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ];

  sudokuInput: string = JSON.stringify(this.getSudokuNumbers());
  originalSudokuGrid?: number[][];


  getSudokuNumbers() : number[][] {
    return this.sudokuGrid.map((row) => {
      return row.map((cell) => {
        return cell === ' ' ? 0 : parseInt(cell);
      });
    });
  }

  setSudokuNumbers(sudokuNumbers: number[][]) {
    this.sudokuGrid = sudokuNumbers.map((row) => {
      return row.map((cell) => {
        return cell === 0 ? ' ' : cell.toString();
      });
    });
  }

  solveSudoku() {
    this.originalSudokuGrid = this.getSudokuNumbers().map((row) => {
      return row.slice();
    });
    this.solve(this.getSudokuNumbers());
  }

  update(sudoku: string) {
    this.sudokuGrid = JSON.parse(sudoku);
  }

  clean() {
    this.sudokuGrid = this.sudokuGrid.map((row) => {
      return row.map(() => {
        return ' ';
      });
    });
    this.originalSudokuGrid = undefined;
  }

  solve(sudokuGrid: number[][]) {
    console.log('Solving sudoku:', sudokuGrid);
    const apiUrl = 'https://localhost:7160/sudoku/solvesudoku';
    const requestBody = sudokuGrid;
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response contains the solved sudoku grid
        if (data) {
          console.log('Sudoku solved successfully');
          this.setSudokuNumbers(data);
          return true;
        } else {
          console.log('No solution exists');
          return false;
        }
      })
      .catch((error) => {
        console.error('Error solving sudoku:', error);
        return false;
      });
  }

  isOriginal(row: number, col: number) {
    if (this.originalSudokuGrid) {
      return this.originalSudokuGrid[row][col] !== 0;
    }
    return false;
  }
}
