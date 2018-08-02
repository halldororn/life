var cols, rows
var w = 3
var cells = []
var buffer = []
var delay = 0
var automatic = true

function setup() {
    createCanvas(innerWidth-20,innerHeight-20)
    init()
}

function init() {
    cells = []
    updated = []
    cols = floor(width/w)
    rows = floor(height/w)

    for (r = 0; r < rows; r++) {
        var row = []
        for (c = 0; c < cols; c++) {
            if (r == 0 || r == rows-1 ||
                c == 0 || c == cols-1) 
            {
                row[c] = 0    
            } else {
                row[c] = random([0,0,0,0,0,0,0,1])
            }
        }
        cells.push(row)
    }
    background(255)
}

function draw() { //loop
    if (automatic || keyIsDown(82)) { // r key to run simulation
        runLife()
    }
    background(255)
    for (r = 0; r < rows; r++) {
        for (c = 0; c < cols; c++) {
            if (cells[r][c] == 1) {
                noStroke()
                fill(40,40,255,200)
                rect(c*w,r*w,w,w)
            }
        }
    }
    wait(delay)
}

function runLife() {
    buffer = []
    for (r = 0; r < rows; r++) {
        var row = []
        for (c = 0; c < cols; c++) {
            if (r == 0 || r == rows-1 ||
                c == 0 || c == cols-1) 
            {
                row[c] = 0
            } else {
                var nsum = neightbourSum(r,c)
                row[c] = (nsum == 3 || (nsum == 2 && cells[r][c] == 1)) ? 1 : 0;
            }
        }
        buffer.push(row)
    }
    cells = buffer
}

function neightbourSum(r,c) {
    return cells[r-1][c-1] +
        cells[r-1][c] +
        cells[r-1][c+1] +
        cells[r][c-1] +
        cells[r][c+1] +
        cells[r+1][c-1] +
        cells[r+1][c] +
        cells[r+1][c+1]
}

function wait(ms){
   var start = new Date().getTime()
   var end = start
   while(end < start + ms) {
     end = new Date().getTime()
  }
}
