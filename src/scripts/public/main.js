var arrItem = [
    {
        id: 0,
        text: "abc",
        color: "#000",
        background: "red"
    },
    {
        id: 1,
        text: "bcs",
        color: "#020",
        background: "#fff"
    },
    {
        id: 2,
        text: "bcs",
        color: "#020",
        background: "red"
    },
    {
        id: 3,
        text: "bcs",
        color: "#020",
        background: "#fff"
    },
    {
        id: 4,
        text: "bcs",
        color: "#020",
        background: "red"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "#fff"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "red"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "#fff"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "red"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "#fff"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "red"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "#fff"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "red"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "#fff"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "red"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "#fff"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "red"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "#fff"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "red"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "#fff"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "red"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "#fff"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "red"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "#fff"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "red"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "#fff"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "red"
    },
    {
        id: 5,
        text: "bcs",
        color: "#020",
        background: "#fff"
    },
];

var theWheel;
function fn_listCheckIn() {
    $.ajax(' https://appscyclone.com/xmas/index.php/api/list-checkin',
        {
            dataType: 'json', // type of response data
            success: function (data, status, xhr) {   // success callback function
                // console.log(data)
                // return data;

                getSegments(data.data);

                theWheel = new Winwheel({
                    'canvasId': 'canvas',
                    'numSegments': data.data.length,
                    'segments': getSegments(data.data),
                    'strokeStyle': 'white',
                    'lineWidth': 3,
                    'textAlignment': 'outer',
                    'innerRadius': 150,
                    'animation':                   // Note animation properties passed in constructor parameters.
                    {
                        // 'type': 'spinOngoing',
                        // 'repeat': -1,
                        // 'yoyo': false,
                        // 'easing': 'Linear.easeNone',
                        'type': 'spinToStop',  // Type of animation.
                        'duration': 20,             // How long the animation is to take in seconds.
                        'spins': 20,              // The number of complete 360 degree rotations the wheel is to do.
                        'callbackFinished': 'winAnimation()',
                        'callbackAfter': 'drawColourTriangle()',
                    }

                });
                
            },
            error: function (jqXhr, textStatus, errorMessage) { // error callback 
                console.log(errorMessage)
            }
        });
}

fn_listCheckIn();

function getSegments(data) {

    var segments = [];
    arrItem = data;
    
    if (arrItem){
        console.log('Data success:', arrItem)
       
        arrItem.forEach(function (item) {
            segments.push({
                id: item.id,
                text: item.lucky_number.toString()
            })
        });

        for(var i=0; i < segments.length; i++){
            if(i%2){
                segments[i].fillStyle = 'red'
            }else{
                segments[i].fillStyle = 'white'
            }
        }
        return segments ;
    }

}


// Get the audio with the sound it in, then play.
// var winsound = document.getElementById('winsound');

$("#spin").on("click", function () {

    theWheel.stopAnimation(false);
    theWheel.rotationAngle = 0;

    $(this).attr("disabled", true)
    theWheel.startAnimation();


    console.log('Đang quay');

    // winsound.play();

});
$('#exampleModal').modal('show');
// This function called after the spin animation has stopped.
function winAnimation() {
   
    console.log('Đã dừng');
    $('#exampleModal').modal('show');


    // Get the number of the winning segment.
    var winningSegmentNumber = theWheel.getIndicatedSegmentNumber();

    $("#spin").attr("disabled", false);

    // Loop and set fillStyle of all segments to gray.
    // for (var x = 1; x < theWheel.segments.length; x++) {
    //     theWheel.segments[x].fillStyle = 'gray';
    // }

    // Make the winning one yellow.
    theWheel.segments[winningSegmentNumber].fillStyle = 'yellow';



    var segment = theWheel.getIndicatedSegment();
    // alert("the winner is :" + segment.text);

    // theWheel.deleteSegment(theWheel.getIndicatedSegmentNumber());

    
    // winsound.pause();
    // winsound.currentTime = 0;


        

    // Call draw function to render changes.
    theWheel.draw();

    // Also re-draw the pointer, otherwise it disappears.
    drawColourTriangle();
   
}

// Draw pointer on canvas, this time on the right.
function drawColourTriangle() {
    // Get context used by the wheel.
    var ctx = theWheel.ctx;

    ctx.strokeStyle = 'transparent';  // Set line colour.
    ctx.fillStyle = 'transparent';  // Set fill colour.
    ctx.lineWidth = 2;
    ctx.beginPath();           // Begin path.

    ctx.moveTo(390, 174);      // Move to initial position.
    ctx.lineTo(390, 226);      // Draw lines to make the shape.
    ctx.lineTo(360, 200);
    ctx.lineTo(390, 175);
    ctx.stroke();              // Complete the path by stroking (draw lines).
    ctx.fill();
}


///////////////////////////////////////////////////////////////////////////////////////

