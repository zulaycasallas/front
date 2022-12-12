function getClient(){
    $.ajax({
        url:"http://129.159.34.136:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(result){
            //console.log(respuesta);
            printResult(result);
        }

    });

}

function postClient(){
    if ($("#email").val().length == 0 || $("#password").val().length == 0 || $("#name").val().length == 0 || $("#age").val().length == 0) {
        alert("Please make sure all fields are filled out properly")
    } else {
    let box = {
        email: $("#email").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        age: $("#age").val()
    };

    $.ajax({
        url: "http://129.159.34.136:8080/api/Client/save",
        type: "POST",
        datatype: "JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(box),
        success: function (result) {
            alert("Client Was Successfully Created");
            window.location.reload();
        }

    });
    }
}

function putClient(idButtonUpdate){
    if ($("#email").val().length == 0 || $("#password").val().length == 0 || $("#name").val().length == 0 || $("#age").val().length == 0) {
        alert("Please make sure all fields are filled out properly")
    } else {


        let box = {
            idClient: idButtonUpdate,
            email: $("#email").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            age: $("#age").val()
        };

        $.ajax({
            url: "http://129.159.34.136:8080/api/Client/update",
            type: "PUT",
            datatype: "JSON",
            contentType: "application/json",
            data: JSON.stringify(box),
            success: function (result) {
                alert("Client Was Successfully Updated"); //Change with sweetAlert
                window.location.reload();
            }

        });
    }
}

function deleteClient(idButtonDelete){
    Swal.fire({
        title: 'Are you sure to delete the Client with ID: '+idButtonDelete +'?',
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
                'Your Client has been deleted.',
                'success'
            )
            let myData = {
                id: idButtonDelete
            };
            $.ajax({
                url: "http://129.159.34.136:8080/api/Client/" + idButtonDelete,
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
    let myTable = "<table bgcolor='transparent'>";
    myTable += "<thead>"
    myTable += "<th align= 'left'>" + 'ID' + "</th>"
    myTable += "<th align= 'left'>" + 'Email' + "</th>"
    myTable += "<th align= 'left'>" + 'Password' + "</th>"
    myTable += "<th align= 'center'>" + 'Name' + "</th>"
    myTable += "<th align= 'left'>" + 'Age' + "</th>"
    myTable += "</thead>"
    for (i = 0; i < result.length; i++) {
        myTable += "<tr>"
        myTable += "<td>" + result[i].idClient + "</td>";
        myTable += "<td>" + result[i].email + "</td>";
        myTable += "<td>" + result[i].password + "</td>";
        myTable += "<td>" + result[i].name + "</td>";
        myTable += "<td>" + result[i].age + "</td>";
        myTable += "<td> <button class='bg-gray-900 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full' onclick='putClient(" + result[i].idClient + ")'> Update </button> ";
        myTable += "<td> <button class='bg-gray-900 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full' onclick='deleteClient(" + result[i].idClient + ")'> Delete </button> ";
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#result1").html(myTable);

}