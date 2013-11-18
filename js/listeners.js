$(document).ready(function () {

  $('#ccp').on('change', function () {
    if (circumcenterPoint.isVisible()) {circumcenterPoint.hide();}
    else {circumcenterPoint.show();}
  });

  $('#ccl').on('change', function () {
    if (PBABLine.isVisible()) {PBABLine.hide(); PBBCLine.hide(); PBACLine.hide();}
    else {PBABLine.show(); PBBCLine.show(); PBACLine.show();}
  });

  $('#ccc').on('change', function () {
    if (circumscribingCircle.isVisible()) {circumscribingCircle.hide();}
    else {circumscribingCircle.show();}
  });

  $('#icp').on('change', function () {
    if (incenterPoint.isVisible()) {incenterPoint.hide();}
    else {incenterPoint.show();}
  });

  $('#icl').on('change', function () {
    if (ABALine.isVisible()) {ABALine.hide(); ABBLine.hide(); ABCLine.hide();}
    else {ABALine.show();ABBLine.show();ABCLine.show();}
  });

  $('#icc').on('change', function () {
    if (inscribingCircle.isVisible()) {inscribingCircle.hide();}
    else {inscribingCircle.show();}
  });

  $('#ctp').on('change', function () {
    if (centroidPoint.isVisible()) {centroidPoint.hide();}
    else {centroidPoint.show();}
  });

  $('#ctl').on('change', function () {
    if (MABLine.isVisible()) {MABLine.hide(); MBCLine.hide(); MACLine.hide();}
    else {MABLine.show(); MBCLine.show(); MACLine.show();}
  });

  $('#aoff').click(function () {ALabel.hide(); BLabel.hide(); CLabel.hide();});

  $('#adeg').click(function () {degOrRad = 0; ALabel.show(); BLabel.show(); CLabel.show();});

  $('#arad').click(function () {degOrRad = 1; ALabel.show(); BLabel.show(); CLabel.show();});

});
