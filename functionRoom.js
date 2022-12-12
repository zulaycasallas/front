function getCar() {
    $.ajax({
        url: "http://129.159.34.136:8080/api/Car/all",
        type: "GET",
        datatype: "JSON",
        success: function (result) {
            console.log(result);
            printResult(result)
        }
    });
}

function postCar() {
    if ($("#name").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 | $("#description").val().length == 0) {
        alert("Please make sure all fields are filled out properly")
    } else {
        let box = {
            gama: { idGama: +$("#select-gama").val() },
            name: $("#name").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description").val()
        };

        $.ajax({
            url: "http://129.159.34.136:8080/api/Car/save",
            type: "POST",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(box),
            success: function (result) {
                alert("Car Was Successfully Created");
                window.location.reload();
            }

        });
    }
}

function putCar(idButtonUpdate) {
    if ($("#name").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 | $("#description").val().length == 0) {
        alert("Please make sure all fields are filled out properly")
    } else {


        let box = {
            idCar: idButtonUpdate,
            gama: { idGama: +$("#select-gama").val() },
            name: $("#name").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description").val()
        };

        $.ajax({
            url: "http://129.159.34.136:8080/api/Car/update",
            type: "PUT",
            datatype: "JSON",
            contentType: "application/json",
            data: JSON.stringify(box),
            success: function (result) {
                alert("The Car Was Successfully Updated");
                window.location.reload();
            }

        });
    }

}



function deleteCar(idButtonDelete) {
    Swal.fire({
        title: 'Are you sure to delete the Car with ID: ' + idButtonDelete + '?',
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
                'Your Car has been deleted.',
                'success'
            )
            let myData = {
                id: idButtonDelete
            };
            $.ajax({
                url: "http://129.159.34.136:8080/api/Car/" + idButtonDelete,
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
    myTable += "<th align= 'center'>" + 'Name' + "</th>"
    myTable += "<th align= 'left'>" + 'Brand' + "</th>"
    myTable += "<th align= 'left'>" + 'Year' + "</th>"
    myTable += "<th align= 'left'>" + 'Description' + "</th>"
    myTable += "<th align= 'left'>" + 'Gama' + "</th>"
    myTable += "</thead>"
    for (i = 0; i < result.length; i++) {
        myTable += "<tr>"
        myTable += "<td>" + result[i].idCar + "</td>";
        myTable += "<td>" + result[i].name + "</td>";
        myTable += "<td>" + result[i].brand + "</td>";
        myTable += "<td>" + result[i].year + "</td>";
        myTable += "<td>" + result[i].description + "</td>";
        myTable += "<td>" + result[i].gama.name + "</td>";
        myTable += "<td> <button class='bg-gray-900 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full' onclick='putCar(" + result[i].idCar + ")'> Update </button> ";
        myTable += "<td> <button class='bg-gray-900 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full' onclick='deleteCar(" + result[i].idCar + ")'> Delete </button> ";
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#result1").html(myTable);

}

/////////////////////////////////////

function getCar_Gama() {
    $.ajax({
        url: "http://129.159.34.136:8080/api/Gama/all",
        type: "GET",
        datatype: "JSON",
        success: function (result) {
            let $select = $("#select-gama");
            $.each(result, function (id, name) {
                $select.append('<option value=' + name.idGama + '>' + name.name + '</option>');
                console.log(name)
            });

        }
    });
}