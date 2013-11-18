setInterval(function  () {

    rectcoords = [];

    for (var i = 0; i < 3; i++) {
        rectcoords.push([rects[i].attrs.x+2.5, rects[i].attrs.y+2.5]);
    }

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


    var circumcenterD = 2 * (AX * (BY - CY) + BX * (CY - AY) + CX * (AY - BY));
    var circumcenter = [(((sq(AX) + sq(AY)) * (BY - CY) + (sq(BX) + sq(BY)) * (CY - AY) + (sq(CX) + sq(CY)) * (AY - BY)) / circumcenterD), (((sq(AX) + sq(AY)) * (CX - BX) + (sq(BX) + sq(BY)) * (AX - CX) + (sq(CX) + sq(CY)) * (BX - AX)) / circumcenterD)];

    var CCradius = dist(circumcenter[0], circumcenter[1], AX, AY);

    var incenter = [((AB*CX)+(BC*AX)+(AC*BX))/(AB+BC+AC), ((AB*CY)+(BC*AY)+(AC*BY))/(AB+BC+AC)];

    var ICradius = AB*((Math.sin(A/2)*Math.sin(B/2))/Math.cos(C/2));

    var centroid = [(AX+BX+CX)/3, (AY+BY+CY)/3];

    var AAngle = Math.atan2(mdpt(BX,BY,CX,CY)[1] - AY, mdpt(BX,BY,CX,CY)[0] - AX);
    var BAngle = Math.atan2(mdpt(AX,AY,CX,CY)[1] - BY, mdpt(AX,AY,CX,CY)[0] - BX);
    var CAngle = Math.atan2(mdpt(AX,AY,BX,BY)[1] - CY, mdpt(AX,AY,BX,BY)[0] - CX);

    var AVal = '';
    var BVal = '';
    var CVal = '';
    if (degOrRad == 0) {
        AVal = Math.round(A*(180/Math.PI)).toString()+'\xB0';
        BVal = Math.round(B*(180/Math.PI)).toString()+'\xB0';
        CVal = Math.round(C*(180/Math.PI)).toString()+'\xB0';
    } else {
        AVal = (Math.round(A*1000)/1000).toString()+'\xB0';
        BVal = (Math.round(B*1000)/1000).toString()+'\xB0';
        CVal = (Math.round(C*1000)/1000).toString()+'\xB0';
    }


    circumcenterPoint.setAttr('x', circumcenter[0]-2.5);
    circumcenterPoint.setAttr('y', circumcenter[1]-2.5);

    circumscribingCircle.setAttr('radius', CCradius);
    circumscribingCircle.setAttr('x', circumcenter[0]);
    circumscribingCircle.setAttr('y', circumcenter[1]);

    PBABLine.setAttr('points', [mdpt(AX, AY, BX, BY), circumcenter]);

    PBBCLine.setAttr('points', [mdpt(BX, BY, CX, CY), circumcenter]);

    PBACLine.setAttr('points', [mdpt(AX, AY, CX, CY), circumcenter]);

    inscribingCircle.setAttr('radius', ICradius);
    inscribingCircle.setAttr('x', incenter[0]);
    inscribingCircle.setAttr('y', incenter[1]);

    incenterPoint.setAttr('x', incenter[0] - 2.5);
    incenterPoint.setAttr('y', incenter[1] - 2.5);

    ABALine.setAttr('points', [AX, AY, incenter[0], incenter[1]]);

    ABBLine.setAttr('points', [BX, BY, incenter[0], incenter[1]]);

    ABCLine.setAttr('points', [CX, CY, incenter[0], incenter[1]]);

    centroidPoint.setAttr('x', centroid[0]-2.5);
    centroidPoint.setAttr('y', centroid[1]-2.5);

    MABLine.setAttr('points', [[CX, CY], mdpt(AX,AY,BX,BY)]);

    MBCLine.setAttr('points', [[AX, AY], mdpt(BX,BY,CX,CY)]);

    MACLine.setAttr('points', [[BX, BY], mdpt(AX, AY, CX, CY)]);

    ALabel.setAttr('x', AX + (Math.cos(AAngle)*-20) - 10);
    ALabel.setAttr('y', AY + (Math.sin(AAngle)*-20) - 6);
    ALabel.setAttr('text', AVal);
    
    BLabel.setAttr('x', BX + (Math.cos(BAngle)*-20) - 10);
    BLabel.setAttr('y', BY + (Math.sin(BAngle)*-20) - 6);
    BLabel.setAttr('text', BVal);

    CLabel.setAttr('x', CX + (Math.cos(CAngle)*-20) - 10);
    CLabel.setAttr('y', CY + (Math.sin(CAngle)*-20) - 6);
    CLabel.setAttr('text', CVal);

    triangle.setAttr('points', rectcoords);


    layer.draw();

}, 10);
