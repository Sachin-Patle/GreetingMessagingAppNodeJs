$( document ).ready(function() {
    setTimeout(function() {
        get_greetings(); 
    }, 30);

    /**
     * Method when submitting form to save greeting details
     */
    $("#form_submit").submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        submit_greeting();
    });

    /**
     * Method when submitting form to update greeting details
     */
    $("#form_edit").submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        edit_greeting();
        get_greetings();
    });

    /**
     * Method when submitting form to delete greeting details
     */
    $("#form_delete").submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        delete_greeting();
        get_greetings();
    });

    /**
     * @method - get_greetings
     * @description
     * Method to get and display all greeting details
     */
    function get_greetings()
    {
        $.ajax({
            type : "GET",
            url : "show_greetings",
            success: function(result){
                $('#greeting_list').empty();
                $.each(result, function(i, list){
                    var date1=new Date();
                    var date2=new Date(list.date);
                    var Difference_In_Time = date2.getTime() - date1.getTime(); 
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    $('#greeting_list').append("<div class='col-sm-4'><div class='card'><div class='card-body'><p>ID : "+list._id+"<span class='float-right'><button class='btn btn-info btn-xs'><i class='fa fa-edit'></i></button></span></p><h5 class='card-subtitle mb-2 text-muted'>"+list.message + "</h5><p class='card-text text-right'>- " + list.name + "<p><hr><p class='card-text text-right'>- " + list.date + "<p></div></div></div>")
                    // $('#greeting_list').append("<div class='col-sm-4'><div class='card'><div class='card-body'><p>ID : "+list._id+"<span class='float-right'><button class='btn btn-info btn-xs'><i class='fa fa-edit'></i></button></span></p><h5 class='card-subtitle mb-2 text-muted'>"+list.message + "</h5><p class='card-text text-right'>- " + list.name + "<p><hr><p class='card-text text-right'>- " + list.date + "<p></div></div></div>")
                });
                console.log("Success: ", result);
            },
            error : function(e) {
                $("#getResultDiv").html("<strong>Error</strong>");
                console.log("ERROR: ", e);
            }
        });	
    }

    /**
     * @method - submit_greeting
     * @description
     * Method to save greeting
     * Getting form data by form id and saving details through ajax
     */
    function submit_greeting()
    {
        var form_data = jQuery('#form_submit').serialize();
        
        $.ajax({
            url:"/save_greeting",
            method: "POST",
            data : form_data,
            success : function (result) {
                    $('#greeting_list').append("<div class='col-sm-4'><div class='card'><div class='card-body'><p>ID : "+result._id+"</p><h5 class='card-subtitle mb-2 text-muted'>"+result.message + "</h5><p class='card-text text-right'>- " + result.name + "<p></div></div></div>")
                    $('#greeting_list').append("<div class='col-sm-4'><div class='card'><div class='card-body'><p>ID : "+list._id+"<span class='float-right'><button class='btn btn-info btn-xs'><i class='fa fa-edit'></i></button></span></p><h5 class='card-subtitle mb-2 text-muted'>"+result.message + "</h5><p class='card-text text-right'>- " + result.name + "<p><hr><p class='card-text text-right'>- " + result.date + "<p></div></div></div>")
                
                $("#form_submit")[0].reset();
                    $('#submitModel').modal('toggle');
            },
            error : function () {
                // some error handling part
                alert("Failed to add greeting");
            }
        });
    }
    /**
     * @method - edit_greeting
     * @description
     * Method to update greeting details
     * Getting form data by form id and updating changes according to ObjectId by using ajax
     */
    function edit_greeting()
    {
        var form_data = jQuery('#form_edit').serialize();
        
        $.ajax({
            url:"/edit_greeting",
            method: "POST",
            data : form_data,
            success : function (data) {
                $("#form_edit")[0].reset();
                $('#editModel').modal('toggle');
            },
            error : function () {
                // some error handling part
                alert("Failed to update greeting");
            }
        });
    }

    /**
     * @method - edit_greeting
     * @description
     * Method to update greeting details
     * Deleting greeting details according to ObjectId by using ajax
     */
    function delete_greeting()
    {
        var form_data = jQuery('#form_delete').serialize();
        
        $.ajax({
            url:"/remove_greeting",
            method: "POST",
            data : form_data,
            success : function (data) {
                $("#form_delete")[0].reset();
                $('#deleteModel').modal('toggle');
            },
            error : function () {
                // some error handling part
                alert("Failed to delete greeting");
            }
        });
    }

})