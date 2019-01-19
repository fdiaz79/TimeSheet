$(document).ready(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyADJwMlDHnbVWAsalmvYlp4VWR0YR-rBnI",
        authDomain: "time-sheet-f9025.firebaseapp.com",
        databaseURL: "https://time-sheet-f9025.firebaseio.com",
        projectId: "time-sheet-f9025",
        storageBucket: "time-sheet-f9025.appspot.com",
        messagingSenderId: "787348602659"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit").on("click", function(event){
        event.preventDefault();

        var employeeName = $("#employee-name").val().trim();
        var employeeRole = $("#employee-role").val().trim();
        var employeeDate = $("#employee-date").val().trim();
        var employeeRate = $("#employee-rate").val().trim();

        var newEmp = {
            name: employeeName,
            role: employeeRole,
            date: employeeDate,
            rate: employeeRate
        };

        database.ref().push(newEmp);

        console.log(newEmp.name);
        console.log(newEmp.role);
        console.log(newEmp.date);
        console.log(newEmp.rate);

        $("#employee-name").val("");
        $("#employee-role").val("");
        $("#employee-date").val("");
        $("#employee-rate").val("");

    });

    database.ref().on("child_added", function(childSnapshot){ 
        console.log(childSnapshot.val());
        var rowVar = $("<tr>");
        var dataNameVar = $("<td>");
        var dataRoleVar = $("<td>");
        var dataDateVar = $("<td>");
        var dataMonthsVar = $("<td>");
        var dataRateVar = $("<td>");
        var dataTotalVar = $("<td>");

        var today = moment(new Date());
        var employeeDate = moment(childSnapshot.val().date);

        months = today.diff(employeeDate, "months");

        var payment = childSnapshot.val().rate;
        
        dataNameVar.text(childSnapshot.val().name);
        dataRoleVar.text(childSnapshot.val().role);
        dataDateVar.text(childSnapshot.val().date);
        dataMonthsVar.text(months);
        dataRateVar.text(childSnapshot.val().rate);
        dataTotalVar.text(months*payment);

        

        rowVar.append(dataNameVar, dataRoleVar, dataDateVar,dataMonthsVar, dataRateVar, dataTotalVar);

        $("#employee-content").append(rowVar);

    });

});
