function statusReports() {
    $.ajax({
        url: "http://129.159.34.136:8080/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function (result) {
            console.log(result);
            printResultStatus(result)
        }
    });
}

function printResultStatus(result) {
    let myTable = "<table>";
    myTable += "<thead>"
    myTable += "<th align= 'center'>" + 'Completed' + "</th>"
    myTable += "<th align= 'center'>" + 'Cancelled' + "</th>"
    myTable += "</thead>"
    myTable += "<tr>"
    myTable += "<td align= 'center'>" + result.completed + "</td>";
    myTable += "<td align= 'center'>" + result.cancelled + "</td>";
    myTable += "</tr>";

    myTable += "</table>";
    $("#result1").html(myTable);

}

function clientReports() {
    $.ajax({
        url: "http://129.159.34.136:8080/api/Reservation/report-clients",
        type: "GET",
        datatype: "JSON",
        success: function (result) {
            printResultClients(result)
        }
    });

}

function printResultClients(result) {
    console.log(result)
    let myTable = "<table>";
    myTable += "<thead>"
    myTable += "<th align= 'center'>" + 'Total Reservations' + "</th>"
    myTable += "<th align= 'center'>" + 'Name' + "</th>"
    myTable += "<th align= 'center'>" + 'Email' + "</th>"
    myTable += "</thead>"
   
    for (i = 0; i < result.length; i++) {
    myTable += "<tr>"
    myTable += "<td  align= 'center'>" + result[i].total + "</td>";
    myTable += "<td align= 'center'>" + result[i].client.name + "</td>";
    myTable += "<td align= 'center'>" + result[i].client.email + "</td>";
    myTable += "</tr>";
    }
    myTable += "</table>";
    $("#result3").html(myTable);

}

function dateReports() {
    if ($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0) {
        alert("Please Select a Start Date And a Devolution Date")
    } else {
        let box = {
            idReservation: $("#idReservation").val(),
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            car: { idCar: +$("#select-car").val() },
            client: { idClient: +$("#select-client").val() },
        };
        $.ajax({
            url: "http://129.159.34.136:8080/api/Reservation/report-dates/" + box.startDate + "/" + box.devolutionDate,
            type: "GET",
            datatype: "JSON",
            success: function (result) {
                console.log(result);
                printResultDates(result)
            }
        });
    }

}

function printResultDates(result) {
    console.log(result);
    let myTable = "<table>";
    myTable += "<thead>"
    myTable += "<th align= 'left'>" + 'ID Reservation' + "</th>"
    myTable += "<th align= 'center'>" + 'Name' + "</th>"
    myTable += "<th align= 'center'>" + 'Email' + "</th>"
    myTable += "<th align= 'left'>" + 'Status' + "</th>"
    myTable += "<th align= 'left'>" + 'Start Date' + "</th>"
    myTable += "<th align= 'left'>" + 'Devolution Date' + "</th>"
    myTable += "</thead>"

    for (i = 0; i < result.length; i++) {
        myTable += "<tr>"
        myTable += "<td>" + result[i].idReservation + "</td>";
        myTable += "<td>" + result[i].client.name + "</td>";
        myTable += "<td>" + result[i].client.email + "</td>";
        myTable += "<td>" + result[i].status + "</td>";
        myTable += "<td>" + result[i].startDate + "</td>";
        myTable += "<td>" + result[i].devolutionDate + "</td>";
        myTable += "</tr>";
    }
    myTable += "<th>" + "TOTAL RESERVATIONS: " + result.length + "</td>";


    myTable += "</table>";
    $("#result2").html(myTable);

}


