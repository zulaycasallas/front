//Métodos CRUD GET, POST, PUT y DELETE
function getGama() {
    $.ajax({
        url: "http://129.159.34.136:8080/api/Gama/all",
        type: "GET",
        datatype: "JSON",
        success: function (result) {
            console.log(result);
            printResult(result)
        }
    });
}

function postGama() {
    if ($("#name").val().length == 0 || $("#description").val().length == 0) {
        alert("Please make sure all fields are filled oout properly")
    } else {


        let box = {
            name: $("#name").val(),
            description: $("#description").val()
        };

        $.ajax({
            url: "http://129.159.34.136:8080/api/Gama/save",
            type: "POST",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(box),
            success: function (result) {
                alert("Gama Was Successfully Created");
                window.location.reload();
            }

        });
    }
}

function putGama(idButtonUpdate) {
    if ($("#name").val().length == 0 || $("#description").val().length == 0) {
        alert("Please make sure all fields are filled out properly")
    } else {


        let box = {
            idGama: idButtonUpdate,
            name: $("#name").val(),
            description: $("#description").val()
        };

        $.ajax({
            url: "http://129.159.34.136:8080/api/Gama/update",
            type: "PUT",
            datatype: "JSON",
            contentType: "application/json",
            data: JSON.stringify(box),
            success: function (result) {
                alert("The Gama Was Successfully Updated");
                window.location.reload();
            }

        });
    }

}

function deleteGama(idButtonDelete) {

    Swal.fire({
        title: 'Are you sure to delete the Gama with ID: ' + idButtonDelete + '?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#A757E1',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your Gama has been deleted.',
                'success'
            )
            let myData = {
                id: idButtonDelete
            };
            $.ajax({
                url: "http://129.159.34.136:8080/api/Gama/" + idButtonDelete,
                type: "DELETE",
                datatype: "JSON",
                data: JSON.stringify(myData),
                contentType: "application/json",
                success: function (result) {
                    window.location.reload();
                }

            });
        }
    })

}

function printResult(result) {
    let myTable = "<table class= 'table-fixed'>";
    myTable += "<thead>"
    myTable += "<th align= 'left'>" + 'ID' + "</th>"
    myTable += "<th align= 'center'>" + 'Name' + "</th>"
    myTable += "<th align= 'left'>" + 'Description' + "</th>"
    myTable += "</thead>"

    for (i = 0; i < result.length; i++) {

        myTable += "<tr>"
        myTable += "<td>" + result[i].idGama + "</td>";
        myTable += "<td align= 'center'>" + result[i].name + "</td>";
        myTable += "<td>" + result[i].description + "</td>";
        myTable += "<td> <button class='bg-gray-900 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full' onclick='putGama(" + result[i].idGama + ")'> Update </button> ";
        myTable += "<td> <button class='bg-gray-900 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full' onclick='deleteGama(" + result[i].idGama + ")'> Delete </button> ";
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#result1").html(myTable);

}
