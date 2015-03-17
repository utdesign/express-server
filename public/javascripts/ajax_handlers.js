$(document).ready(function() {
	$(".alert").hide();
	$(".result-group").hide();
	$(".alert-sending-message").hide();

	/* Command Control Panel interactions */
	$(".form-button").click(function(){
		var type = $(this).text();
		var command = type;
		
		if (type=="Get"){
			command +=" " + $("#getPinNumber").val();
		}
		else if (type=="Put"){
			command +=" " + $("#putPinNumber").val() + " " + $("#putPinValue").val();
		}
		$("#command").val(command);
	});
	
	/* AJAX Call when clicking submit */
	$("#submit_button").click(function(){
		$(".alert").fadeOut("slow");
		$(".result-group").fadeOut("slow");
		$(".alert-sending-message").fadeIn("slow");
		var url = window.location.pathname + "/getText?command=";
		var command = $("#command").val();
		command = command.replace(" ", "+");
		url += command;
		
		$.ajax({url: url, success: function(result){
			// If success, with results
			$(".alert-sending-message").fadeOut("slow");
			$(".alert-success").fadeIn("slow");
			$(".result-group").fadeIn("slow");
			$("#text_data").html(result);
		}});
	});
});