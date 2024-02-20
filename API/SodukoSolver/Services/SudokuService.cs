using System.Linq;

namespace SodukoSolver.Services
{
    public class SudokuService
    {
        const int subSquareSize = 3;
        const int N = 9;
        public int[][] getFakeSudoku()
        {
            return new int[][]
            {
                new int[] {5, 3, 4, 6, 7, 8, 9, 1, 2},
                new int[] {6, 7, 2, 1, 9, 5, 3, 4, 8},
                new int[] {1, 9, 8, 3, 4, 2, 5, 6, 7},
                new int[] {8, 5, 9, 7, 6, 1, 4, 2, 3},
                new int[] {4, 2, 6, 8, 5, 3, 7, 9, 1},
                new int[] {7, 1, 3, 9, 2, 4, 8, 5, 6},
                new int[] {9, 6, 1, 5, 3, 7, 2, 8, 4},
                new int[] {2, 8, 7, 4, 1, 9, 6, 3, 5},
                new int[] {3, 4, 5, 2, 8, 6, 1, 7, 9}
            };
        }   

        public int[][]? solveSudoku(int[][] sudokuToSolve)
        {
            
            
            Print(sudokuToSolve);
            return Backtrack(sudokuToSolve);
        }

        public bool checkSudoku(int[][] sudokuToSolve)
        {
            if (sudokuToSolve.Length != 9 || sudokuToSolve.Any(row => row.Length != 9))
            {
                return false;
            }
            return true;
        }

        private int[][]? Backtrack(int[][] sudoku)
        {
           
            int x;
            int y;

            var sudokuCopy = getCopy(sudoku);

            
            if (isSolved(sudokuCopy))
            {
                //Console.WriteLine("SOLVED!!!!!");
                return sudokuCopy;
            }

            if (!findLeastCandidateSquare(sudokuCopy, out x, out y))
            {
                //Console.WriteLine("Breaking Path");
                return null;
            }

            var possibilities = GetPossibilities(sudokuCopy, x, y);

            foreach (var possibility in possibilities)
            {
                //Console.WriteLine("Changing " + x + " " + y + " into: " + possibility);
                sudokuCopy[x][y] = possibility;
                var result = Backtrack(sudokuCopy);
                if (result != null)
                {
                    //Console.WriteLine("Solved");
                    return result;
                }
                
                
            }

            return null;


        }

        private int[][] getCopy(int[][] sudoku)
        {
            int[][] sudokuCopy = new int[sudoku.Length][];
            for (int i = 0; i < sudoku.Length; i++)
            {
                sudokuCopy[i] = new int[sudoku[i].Length];
                Array.Copy(sudoku[i], sudokuCopy[i], sudoku[i].Length);
            }
            return sudokuCopy;
        }

        public static void Print(int[][] sudoku)
        {
            for (int i = 0; i < sudoku.Length; i++)
            {
                for (int j = 0; j < sudoku[i].Length; j++)
                {
                    Console.Write(sudoku[i][j] + " ");
                    if ((j + 1) % 3 == 0 && j != sudoku[i].Length - 1)
                    {
                        Console.Write("| ");
                    }
                }
                Console.WriteLine();
                if ((i + 1) % 3 == 0 && i != sudoku.Length - 1)
                {
                    Console.WriteLine("---------------------");
                }
            }
            Console.WriteLine("---------------------\n");
        }


        private bool isSolved(int[][] sudoku)
        {
            foreach (var row in sudoku)
            {
                foreach (var cell in row)
                {
                    if (cell == 0)
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        private bool findLeastCandidateSquare(int[][] sudoku,out int x, out int y)
        {
            var size = 10;
            x = -1;
            y = -1;
            for (int i = 0; i < 9; i++)
            {
                for (int j = 0; j < 9; j++)
                {
                    if (sudoku[i][j] == 0)
                    {
                        var possibilities = GetPossibilities(sudoku, i, j);
                        if(possibilities.Length == 0)
                        {
                            return false;
                        }
                        if(possibilities.Length < size)
                        {
                            x = i;
                            y = j;
                            size = possibilities.Length;
                        }
                    }   
                }
            }
            return true;
        }

        public int[] GetPossibilities(int[][] sudoku, int x, int y, int max = 10)
        {
            var allPosibilites = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9 };

            int[] row = sudoku[x];
            int[] col = sudoku.Select(r => r[y]).ToArray();
            var square = GetSquare(sudoku, x, y);

            var usedNumbers = row.Concat(col).Concat(square).Where(n => n != 0).Distinct();

            return allPosibilites.Except(usedNumbers).ToArray();


        }

        private int[] GetSquare(int[][] sudoku, int x, int y)
        {
            

            int startX = (x / subSquareSize) * subSquareSize;
            int startY = (y / subSquareSize) * subSquareSize;

            int[] square = new int[subSquareSize * subSquareSize];

            int index = 0;
            for (int i = startX; i < startX + subSquareSize; i++)
            {
                for (int j = startY; j < startY + subSquareSize; j++)
                {
                    square[index++] = sudoku[i][j];
                }
            }

            return square;
        }
    }
}
