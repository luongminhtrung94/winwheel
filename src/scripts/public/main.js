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
    $.ajax(' https://appscyclone.com/xmas/index.php/api/list-normal-price',
        {
            dataType: 'json', // type of response data
            success: function (data) {   // success callback function
                console.log(data.data)
                getSegments(data.data);

                theWheel = new Winwheel({
                    'canvasId': 'canvas',
                    'numSegments': data.data.length,
                    'segments': getSegments(data.data),
                    'strokeStyle': 'red',
                    'textMargin': 15,
                    'lineWidth': 0,
                    'textAlignment': 'outer',
                    // 'rotationAngle':0,
                    'innerRadius': 120,
                    'textFillStyle': '#000',
                    'animation':                   // Note animation properties passed in constructor parameters.
                    {
                        'type': 'spinOngoing',
                        'easing'       : 'Linear.easeNone',
                        'repeat'       : -1,


                        // 'type': 'spinToStop',  // Type of animation.
                        'duration': 1,             // How long the animation is to take in seconds.
                        'spins': data.data.length,              // The number of complete 360 degree rotations the wheel is to do.
                        // 'callbackFinished': 'winAnimation()',
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
function compareNumbers(a, b) {
    return a - b;
}
function getSegments(data) {

    var segments = [];
    arrItem = data;

    if (arrItem) {
        // console.log('Data success:', arrItem);

        arrItem.forEach(function (item) {
            arrItem.sort(function (a, b) {
                return a.lucky_number - b.lucky_number;
            });
            segments.push({
                id: item.id,
                text: item.lucky_number.toString(),
                name: item.name
            })
        });

        for (var i = 0; i < segments.length; i++) {
            if (i % 2) {
                segments[i].fillStyle = 'red'
            } else {
                segments[i].fillStyle = 'white'
            }
        }

        // console.log(segments);

        return segments;
    }

}

function calculatePrize() {
    
}

var status = 0;
$("#spin").on("click", function (e) {


    // normal -----------------------------------------------
    // theWheel.stopAnimation(false);
    // theWheel.rotationAngle = 0;
    // $(this).attr('disabled')
    // theWheel.startAnimation();


    // when click start/stop---------------------------------
    status ++;
    if(status % 2){    
        theWheel.startAnimation();
        
    }else{
        theWheel.stopAnimation(true);
        $('#exampleModal').modal({ backdrop: 'static', keyboard: false, display: 'show' });


        // Get the number of the winning segment.
        var segmentCurrent = theWheel.getIndicatedSegmentNumber();
        var segment = theWheel.getIndicatedSegment();


        // Make the winning one yellow.
        theWheel.segments[segmentCurrent].fillStyle = 'yellow';

        $('.person-successful').html(segment.name);
        
        console.log("\nid:" + segment.id, '\n lucky_number:' + segment.text, '\n Name:' + segment.name);
    }

});



$('.accept-action').click(function () {
    var segmentCurrent = theWheel.getIndicatedSegmentNumber();
    var segment = theWheel.getIndicatedSegment();

    // delete item
    theWheel.deleteSegment(segmentCurrent);


    $('.del_form input').val(segment.id);
    var id_del = $('.del_form').serialize();
    fn_delete(id_del);

    setTimeout(() => {
        fn_listCheckIn();
    }, 100);

    // Call draw function to render changes.
    theWheel.draw();

    // Also re-draw the pointer, otherwise it disappears.
    drawColourTriangle();

    $('#exampleModal').modal('hide');
})

function fn_delete(id_del) {
    $.ajax('https://appscyclone.com/xmas/index.php/api/win',
        {
            dataType: 'json', // type of response data
            type:'POST',
            data: id_del,
            success: function (data) {   // success callback function
                // console.log(data);
            },
            error: function (jqXhr, textStatus, errorMessage) { // error callback 
                console.log(errorMessage)
            }
        });
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


// click other item on canvas
// $('#canvas').click(function (e) {
//     var clickedSegment = theWheel.getSegmentAt(e.clientX, e.clientY);

//     if (clickedSegment) {
//         clickedSegment.fillStyle = 'blue';
//         theWheel.draw();

//         console.log('when click item:', clickedSegment.text)
//     }
// }) 