var stage = new Kinetic.Stage({
    container: 'container',
    width: window.innerWidth * 0.66,
    height: window.innerHeight
});

var layer = new Kinetic.Layer();

//Main Triangle
triangleinitpoints = [[150, 86.6025403784439 * 4.5],[300, 86.6025403784439 * 4.5],[225, 86.6025403784439 * 3]];

var triangle = new Kinetic.Polygon({
    points: triangleinitpoints,
    fill: '#00D2FF',
    stroke: 'black',
    strokeWidth: 1
});

var degOrRad = 0;


//Vertex Rectangles
var rects = [];

for (var i = 0; i < 3; i++) {
    rect = new Kinetic.Rect({
        width: 5,
        height: 5,
        fill: 'red',
        x: triangleinitpoints[i][0]-2.5,
        y: triangleinitpoints[i][1]-2.5,
        draggable: 1
    });

    rects.push(rect);

    rect.on('mouseover', function() {document.body.style.cursor = 'pointer';});
    rect.on('mouseout', function() {document.body.style.cursor = 'default';});

    layer.add(rect);
}

//Useful Values!
var AX = triangle.attrs.points[0].x;
var AY = triangle.attrs.points[0].y;
var BX = triangle.attrs.points[1].x;
var BY = triangle.attrs.points[1].y;
var CX = triangle.attrs.points[2].x;
var CY = triangle.attrs.points[2].y;
var AB = dist(AX,AY,BX,BY);
var BC = dist(BX,BY,CX,CY);
var AC = dist(CX,CY,AX,AY);
var A = angle({x: CX, y: CY},{x: AX, y: AY},{x: BX, y: BY});
var B = angle({x: CX, y: CY},{x: BX, y: BY},{x: AX, y: AY});
var C = angle({x: AX, y: AY},{x: CX, y: CY},{x: BX, y: BY});


//Circumcenter
var circumcenterD = 2 * (AX * (BY - CY) + BX * (CY - AY) + CX * (AY - BY));
var circumcenter = [(((sq(AX) + sq(AY)) * (BY - CY) + (sq(BX) + sq(BY)) * (CY - AY) + (sq(CX) + sq(CY)) * (AY - BY)) / circumcenterD), (((sq(AX) + sq(AY)) * (CX - BX) + (sq(BX) + sq(BY)) * (AX - CX) + (sq(CX) + sq(CY)) * (BX - AX)) / circumcenterD)];

var circumcenterPoint = new Kinetic.Rect({
    width: 5,
    height: 5,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 1,
    x: circumcenter[0]-2.5,
    y: circumcenter[1]-2.5
});

//Perpendicular Bisectors
var PBABLine = new Kinetic.Line({
  points: [mdpt(AX, AY, BX, BY), circumcenter],
  stroke: 'green',
  dashArray: [5]
});

var PBBCLine = new Kinetic.Line({
  points: [mdpt(BX, BY, CX, CY), circumcenter],
  stroke: 'green',
  dashArray: [5]
});

var PBACLine = new Kinetic.Line({
  points: [mdpt(AX, AY, CX, CY), circumcenter],
  stroke: 'green',
  dashArray: [5]
});

//Circumscribing Circle
var CCradius = dist(circumcenter[0], circumcenter[1], AX, AY);
var circumscribingCircle = new Kinetic.Circle({
    radius: CCradius,
    fill: 'none',
    stroke: 'green',
    strokeWidth: 1,
    x: circumcenter[0],
    y: circumcenter[1]
});


//Incenter
var incenter = [((AB*CX)+(BC*AX)+(AC*BX))/(AB+BC+AC), ((AB*CY)+(BC*AY)+(AC*BY))/(AB+BC+AC)];

var incenterPoint = new Kinetic.Rect({
    width: 5,
    height: 5,
    fill: 'blue',
    stroke: 'black',
    strokeWidth: 1,
    x: incenter[0] - 2.5,
    y: incenter[1] - 2.5
});


//Inscribing Circle
var ICradius = AB*((Math.sin(A/2)*Math.sin(B/2))/Math.cos(C/2));

var inscribingCircle = new Kinetic.Circle({
    radius: ICradius,
    fill: 'none',
    stroke: 'blue',
    strokeWidth: 1,
    x: incenter[0],
    y: incenter[1]
});

//Angle Bisectors
var ABALine = new Kinetic.Line({
  points: [AX, AY, incenter[0], incenter[1]],
  stroke: 'blue',
  dashArray: [5]
});

var ABBLine = new Kinetic.Line({
  points: [BX, BY, incenter[0], incenter[1]],
  stroke: 'blue',
  dashArray: [5]
});

var ABCLine = new Kinetic.Line({
  points: [CX, CY, incenter[0], incenter[1]],
  stroke: 'blue',
  dashArray: [5]
});


//Centroid
var centroid = [(AX+BX+CX)/3, (AY+BY+CY)/3];

var centroidPoint = new Kinetic.Rect({
    width: 5,
    height: 5,
    fill: 'orange',
    stroke: 'black',
    strokeWidth: 1,
    x: centroid[0] - 2.5,
    y: centroid[1] - 2.5
});


//Medians
var MABLine = new Kinetic.Line({
  points: [[CX, CY], mdpt(AX,AY,BX,BY)],
  stroke: 'orange',
  dashArray: [5]
});

var MBCLine = new Kinetic.Line({
  points: [[AX, AY], mdpt(BX,BY,CX,CY)],
  stroke: 'orange',
  dashArray: [5]
});

var MACLine = new Kinetic.Line({
  points: [[BX, BY], mdpt(AX, AY, CX, CY)],
  stroke: 'orange',
  dashArray: [5]
});

//Angle Labels
var AAngle = Math.atan2(mdpt(BX,BY,CX,CY)[1] - AY, mdpt(BX,BY,CX,CY)[0] - AX);
var ALabel = new Kinetic.Text({
  x: AX + (Math.cos(AAngle) * -21) - 10,
  y: AY + (Math.sin(AAngle) * -21) - 6,
  text: Math.floor(A * (180 / Math.PI)).toString()+'\xB0',
  fontSize: 12,
  fontFamily: 'Calibri',
  fill: 'white'
});

var BAngle = Math.atan2(mdpt(AX,AY,CX,CY)[1] - BY, mdpt(AX,AY,CX,CY)[0] - BX);
var BLabel = new Kinetic.Text({
  x: BX + (Math.cos(BAngle) * -21) - 10,
  y: BY + (Math.sin(BAngle) * -21) - 6,
  text: Math.floor(A * (180 / Math.PI)).toString()+'\xB0',
  fontSize: 12,
  fontFamily: 'Calibri',
  fill: 'white'
});

var CAngle = Math.atan2(mdpt(AX,AY,BX,BY)[1] - CY, mdpt(AX,AY,BX,BY)[0] - CX);
var CLabel = new Kinetic.Text({
  x: AX + (Math.cos(CAngle) * -21) - 10,
  y: AY + (Math.sin(CAngle) * -21) - 6,
  text: Math.floor(A * (180 / Math.PI)).toString()+'\xB0',
  fontSize: 12,
  fontFamily: 'Calibri',
  fill: 'white'
});

layer.add(triangle);
layer.add(circumcenterPoint);
layer.add(circumscribingCircle);
layer.add(PBABLine);
layer.add(PBBCLine);
layer.add(PBACLine);
layer.add(incenterPoint);
layer.add(inscribingCircle);
layer.add(ABALine);
layer.add(ABBLine);
layer.add(ABCLine);
layer.add(centroidPoint);
layer.add(MABLine);
layer.add(MBCLine);
layer.add(MACLine);
layer.add(ALabel);
layer.add(BLabel);
layer.add(CLabel);

stage.add(layer);

for (var i = 0; i < rects.length; i++) {
    rects[i].moveToTop();
}

layer.draw();
