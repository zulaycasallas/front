function getMessage() {
    $.ajax({
        url: "http://129.159.34.136:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (result) {
            console.log(result);
            printResult(result)
        }
    });
}

function postMessage() {
    if ($("#messageText").val().length == 0) {
        alert("Please make sure all fields are filled out properly")
    } else {
        let box = {
            messageText: $("#messageText").val(),
            car: { idCar: +$("#select-car").val() },
            client: { idClient: +$("#select-client").val() },
        };

        $.ajax({
            url: "http://129.159.34.136:8080/api/Message/save",
            type: "POST",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(box),
            success: function (result) {
                alert("Message Was Successfully Created");
                window.location.reload();
            }

        });
    }

}

function putMessage(idButtonUpdate) {
    if ($("#messageText").val().length == 0) {
        alert("Please make sure all fields are filled out properly")
    } else {


        let box = {
            idMessage: idButtonUpdate,
            messageText: $("#messageText").val(),
            car: { idCar: +$("#select-car").val() },
            client: { idClient: +$("#select-client").val() },
        };

        $.ajax({
            url: "http://129.159.34.136:8080/api/Message/update",
            type: "PUT",
            datatype: "JSON",
            contentType: "application/json",
            data: JSON.stringify(box),
            success: function (result) {
                alert("The Message Was Successfully Updated");
                window.location.reload();
            }

        });
    }

}

function deleteMessage(idButtonDelete) {

    Swal.fire({
        title: 'Are you sure to delete the Message with ID: ' + idButtonDelete + '?',
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
                'Your Message has been deleted.',
                'success'
            )
            let myData = {
                id: idButtonDelete
            };
            $.ajax({
                url: "http://129.159.34.136:8080/api/Message/" + idButtonDelete,
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
    myTable += "<th align= 'center'>" + 'Message' + "</th>"
    myTable += "<th align= 'left'>" + 'Client' + "</th>"
    myTable += "<th align= 'left'>" + 'Car' + "</th>"
    myTable += "</thead>"
    for (i = 0; i < result.length; i++) {
        myTable += "<tr>"
        myTable += "<td>" + result[i].idMessage + "</td>";
        myTable += "<td>" + result[i].messageText + "</td>";
        myTable += "<td>" + result[i].client.name + "</td>";
        myTable += "<td>" + result[i].car.name + "</td>";
        myTable += "<td> <button class='bg-gray-900 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full' onclick='putMessage(" + result[i].idMessage + ")'> Update </button> ";
        myTable += "<td> <button class='bg-gray-900 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full' onclick='deleteMessage(" + result[i].idMessage + ")'> Delete </button> ";
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#result1").html(myTable);

}

/////////////////////////////////////

function getMessage_Car() {
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

function getMessage_Client() {
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

