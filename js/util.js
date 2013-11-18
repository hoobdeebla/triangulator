//util functions
function sq (toSquare) {return Math.pow(toSquare, 2);}
function dist (X1, Y1, X2, Y2) {return Math.sqrt(sq(X2 - X1) + sq(Y2 - Y1));}
function angle(A, B, C) {
  var NAB = Math.sqrt(Math.pow(B.x - A.x, 2)+ Math.pow(B.y - A.y, 2));
  var NBC = Math.sqrt(Math.pow(B.x - C.x, 2)+ Math.pow(B.y - C.y, 2));
  var NAC = Math.sqrt(Math.pow(C.x - A.x, 2)+ Math.pow(C.y - A.y, 2));
  return Math.acos((NBC * NBC + NAB * NAB - NAC * NAC) / (2 * NBC * NAB));
}
function mdpt (X1, Y1, X2, Y2) {return [(X1 +X2)/2, (Y1+Y2)/2];}
