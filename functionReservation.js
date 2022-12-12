function getReservation() {
    $.ajax({
        url: "http://129.159.34.136:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (result) {
            console.log(result);
            printResult(result)
        }
    });
}

function postReservation() {
    if ($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0) {
        alert("Please Select A Start Date And A Devolution Date")
    } else {
        let box = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            car: { idCar: +$("#select-car").val() },
            client: { idClient: +$("#select-client").val() },
        };

        $.ajax({
            url: "http://129.159.34.136:8080/api/Reservation/save",
            type: "POST",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(box),
            success: function (result) {
                alert("Reservation Was Successfully Created");
                window.location.reload();
            }

        });
    }
}

function putReservation(idButtonUpdate) {
    if ($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0) {
        alert("Please Select a Start Date And a Devolution Date")
    } else {
        let box = {
            idReservation: idButtonUpdate,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            car: { idCar: +$("#select-car").val() },
            client: { idClient: +$("#select-client").val() },
        };

        $.ajax({
            url: "http://129.159.34.136:8080/api/Reservation/update",
            type: "PUT",
            datatype: "JSON",
            contentType: "application/json",
            data: JSON.stringify(box),
            success: function (result) {
                alert("The Reservation Was Successfully Updated");
                window.location.reload();
            }

        });


    }
}

function deleteReservation(idButtonDelete) {
    Swal.fire({
        title: 'Are you sure to delete the Reservation with ID: ' + idButtonDelete + '?',
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
                'Your Reservation has been deleted.',
                'success'
            )
            let myData = {
                id: idButtonDelete
            };
            $.ajax({
                url: "http://129.159.34.136:8080/api/Reservation/" + idButtonDelete,
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
    let myTable = "<table>";
    myTable += "<thead>"
    myTable += "<th align= 'left'>" + 'ID' + "</th>"
    myTable += "<th align= 'left'>" + 'Start Date' + "</th>"
    myTable += "<th align= 'left'>" + 'Devolution Date' + "</th>"
    myTable += "<th align= 'left'>" + 'Status' + "</th>"
    myTable += "<th align= 'left'>" + 'Client' + "</th>"
    myTable += "<th align= 'left'>" + 'Car' + "</th>"
    myTable += "</thead>"
    for (i = 0; i < result.length; i++) {
        myTable += "<tr>"
        myTable += "<td>" + result[i].idReservation + "</td>";
        myTable += "<td>" + result[i].startDate + "</td>";
        myTable += "<td>" + result[i].devolutionDate + "</td>";
        myTable += "<td>" + result[i].status + "</td>";
        myTable += "<td>" + result[i].client.name + "</td>";
        myTable += "<td>" + result[i].car.name + "</td>";
        myTable += "<td> <button button class='bg-gray-900 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full' onclick='putReservation(" + result[i].idReservation + ")'> Update </button> ";
        myTable += "<td> <button button class='bg-gray-900 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full' onclick='deleteReservation(" + result[i].idReservation + ")'> Delete </button> ";
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#result1").html(myTable);

}

/////////////////////////////////////

function getReservation_Car() {
    $.ajax({
        url: "http://129.159.34.136:8080/api/Car/all",
        type: "GET",
        datatype: "JSON",
        success: function (result) {
            let $select = $("#select-car");
            $.each(result, function (id, name) {
                $select.append('<option value=' + name.idCar + '>' + name.name + '</option>');
                console.log(name)
            });

        }
    });
}

function getReservation_Client() {
    $.ajax({
        url: "http://129.159.34.136:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (result) {
            let $select = $("#select-client");
            $.each(result, function (id, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');
                console.log(name)
            });

        }
    });

}

