(function () {
  // Helper: write a table header
  function writeHeader() {
    document.write("<table>");
    document.write("<tr><th>Number 1</th><th>Operator</th><th>Number 2</th><th>Result</th></tr>");
  }

  // Helper: write a single row
  function writeRow(x, op, y, result, isError) {
    var resultCell = isError ? ('<span class=\"error\">' + result + '</span>')
                             : ('<span class=\"ok\">' + result + '</span>');
    document.write("<tr><td>" + x + "</td><td>" + op + "</td><td>" + y + "</td><td>" + resultCell + "</td></tr>");
  }

  // Helper: write closing tag
  function closeTable() {
    document.write("</table>");
  }

  // Collect valid numeric results to compute summary
  var validResults = [];
  var began = false;

  writeHeader();

  // Loop until any prompt is canceled
  while (true) {
    var xInput = prompt('Enter the first number (x). Click Cancel to finish.');
    if (xInput === null) break; // user canceled
    began = true;

    var yInput = prompt('Enter the second number (y). Click Cancel to finish.');
    if (yInput === null) break; // user canceled

    var op = prompt('Enter an operator: +  -  *  /  %  (Cancel to finish)');
    if (op === null) break; // user canceled

    // Parse and validate
    var x = parseFloat(xInput);
    var y = parseFloat(yInput);

    var isXNum = !isNaN(x);
    var isYNum = !isNaN(y);
    var validOp = ['+','-','*','/','%'].indexOf(op) !== -1;

    if (!isXNum || !isYNum) {
      writeRow(xInput, op, yInput, 'Error: x and y must be numeric', true);
      continue;
    }
    if (!validOp) {
      writeRow(x, op, y, 'Error: invalid operator', true);
      continue;
    }
    if (op === '/' && y === 0) {
      writeRow(x, op, y, 'Error: division by zero', true);
      continue;
    }

    // Compute result
    var result;
    switch (op) {
      case '+': result = x + y; break;
      case '-': result = x - y; break;
      case '*': result = x * y; break;
      case '/': result = x / y; break;
      case '%': result = x % y; break;
    }

    // Round to a reasonable number of decimals to keep table neat
    var displayResult = Number.isFinite(result) ? Number(result.toFixed(6)) : result;
    writeRow(x, op, y, displayResult, false);
    if (typeof result === 'number' && isFinite(result)) validResults.push(result);
  }

  closeTable();

  // Summary table
  document.write("<h2>Summary of Valid Results</h2>");
  if (validResults.length === 0) {
    document.write("<p>No valid results to summarize.</p>");
  } else {
    var min = Math.min.apply(null, validResults);
    var max = Math.max.apply(null, validResults);
    var total = validResults.reduce(function (acc, v) { return acc + v; }, 0);
    var avg = total / validResults.length;

    document.write("<table>");
    document.write("<tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>");
    document.write("<tr><td>" + Number(min.toFixed(6)) + "</td><td>" + Number(max.toFixed(6)) + "</td><td>" + Number(avg.toFixed(6)) + "</td><td>" + Number(total.toFixed(6)) + "</td></tr>");
    document.write("</table>");
  }
})();