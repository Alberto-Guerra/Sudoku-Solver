using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SodukoSolver.Services;
using System;

namespace SudokoSolver.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SudokuController : ControllerBase
    {
        SudokuService _sudokuService;

        public SudokuController(SudokuService sudokuService)
        {
            _sudokuService = sudokuService;
        }

        [HttpGet("getsudoku")]
        public IActionResult GetSudoku()
        {

            

            return Ok(_sudokuService.getFakeSudoku());
        }

        [HttpPost("solvesudoku")]
        public IActionResult SolveSudoku([FromBody] int[][] array)
        {

            if (!_sudokuService.checkSudoku(array))
            {
                return BadRequest("Invalid Sudoku");
            };
           

            int[][]? solvedSudoku = _sudokuService.solveSudoku(array);

            if (solvedSudoku == null)
            {
                return BadRequest("Not Solvable Sudoku");
            }
            return Ok(solvedSudoku);
        }

        [HttpPost("getpossibilities")]
        public IActionResult GetPossibilities([FromBody] int[][] array)
        {
         
            return Ok(_sudokuService.GetPossibilities(array,5,3));
        }
    }
}