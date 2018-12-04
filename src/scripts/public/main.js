var arrItem = [
    {
        id:0,
        text:"abc",
        color:"#000",
        background:"#fff"
    },
    {
        id:1,
        text:"bcs",
        color:"#020",
        background:"red"
    },
    {
        id:2,
        text:"bcs",
        color:"#020",
        background:"yellow"
    },
    {
        id:3,
        text:"bcs",
        color:"#020",
        background:"pink"
    },
];


var numSegments = arrItem.length;

function getSegments(){
    var segments = [] ;
    arrItem.forEach(function(item){
        segments.push({
            id:item.id,
            fillStyle:item.background,
            text: item.text
        })
    });

    return segments;
}

var theWheel = new Winwheel({
    'canvasId'    : 'canvas',
    'numSegments' : numSegments,
    'segments'    : getSegments(),
    'fillStyle'   : '#e7706f',
    'lineWidth'   : 3,
    'animation' :                   // Note animation properties passed in constructor parameters.
    {
        'type'     : 'spinToStop',  // Type of animation.
        'duration' : 5,             // How long the animation is to take in seconds.
        'spins'    : 8,              // The number of complete 360 degree rotations the wheel is to do.
        'callbackFinished' : 'callbackFinished()',
    }
});

function callbackFinished(){
    var segment = theWheel.getIndicatedSegment();

    $("#spin").attr("disabled", false);
    theWheel.deleteSegment(theWheel.getIndicatedSegmentNumber());
    theWheel.draw();
    
    alert("the winner is :" + segment.text );
}

$("#spin").on("click" , function(){
    theWheel.stopAnimation(false);
    theWheel.rotationAngle=0;

    $(this).attr("disabled", true)
    theWheel.startAnimation();
});