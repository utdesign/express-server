$(document).ready(function() {
	$(".alert").hide();
	$(".result-group").hide();
	$(".alert-sending-message").hide();
	$("#submit_button").click(function(){
		$(".alert").fadeOut("slow");
		$(".result-group").fadeOut("slow");
		$(".alert-sending-message").fadeIn("slow");
		var url = window.location.pathname + "/getText?command=";
		var command = $("#command").val();
		command = command.replace(" ", "+");
		url += command;
		//console.log(url);
		$.ajax({url: url, success: function(result){
			//console.log(result);
			$(".alert-sending-message").fadeOut("slow");
			$(".alert-success").fadeIn("slow");
			$(".result-group").fadeIn("slow");
			$("#text_data").html(result);
		}});
	});
});