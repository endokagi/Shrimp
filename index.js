var firebaseConfig = {
    apiKey: "AIzaSyBOxPDBEf9o1g_agFJ_Dbf9QqYllav2h8E",
    authDomain: "fungus-detection.firebaseapp.com",
    projectId: "fungus-detection",
    storageBucket: "fungus-detection.appspot.com",
    messagingSenderId: "350199211670",
    appId: "1:350199211670:web:943a6aee6b50c8c77484b7",
    measurementId: "G-CNXS8Q3EN2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

$(document).on("click", ".browse", function () {
    var file = $(this).parents().find(".file");
    file.trigger("click");
});
$('input[type="file"]').change(function (e) {
    var fileName = e.target.files[0].name;
    $("#file").val(fileName);

    var reader = new FileReader();
    reader.onload = function (e) {
        // get loaded data and render thumbnail.
        document.getElementById("preview").src = e.target.result;
    };
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
});

$("#start").click(function () {

    $("#progress").show();
    var storageRef = firebase.storage().ref();

    // Upload image to Firebase
    var newImageRef = storageRef.child('upload/shrimp.jpg');

    var file = $('#photo').get(0).files[0];
    newImageRef.put(file).then(function (snapshot) {

        console.log('Uploaded a blob or file!');

        ipAddress = $('#ipAddress').val();

        let url = "http://"+ipAddress+":5000/predict";

        // Call prediction API
        console.log(url);
        $.getJSON(url, function (result) {
            $("#progress").hide();
            console.log(result);
            const normal = `<button id="found" type="button" class="btn btn-success mt-3">Normal</button>`;
            const taura = `<button id="found" type="button" class="btn btn-dark mt-3">Trura</button>`;
            const virus = `<button id="found" type="button" class="btn btn-danger mt-3">Virus</button>`;
            const whitespot = `<button id="found" type="button" class="btn btn-secondary mt-3">White Spot</button>`;
            const yellow = `<button id="notfound" type="button" class="btn btn-warning mt-3">Yellow</button>`;
            if(result === "0"){
                $("#result").html(normal)
            }

            else if (result === "1") {
                $("#result").html(taura)
            }
            else if (result === "2") {
                $("#result").html(virus)
            }
            else if (result === "3") {
                $("#result").html(whitespot)
            }
            else{
                $("#result").html(yellow)
            }

        });
    });

});

$('#reload').click(function(){
    location.reload()
});
