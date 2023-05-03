$("#contactForm").submit(function (e) {
  e.preventDefault();

  // Validate form data
  var name = $("#contactForm #name").val();
  var email = $("#contactForm #email").val();
  var message = $("#contactForm #message").val();
  let error = $("#contactForm .error-message");

  // Check if fields are empty
  if (!name || !email || !message) {
    error.text("Please fill in all required fields.");
    error.show();
    return false;
  }

  // Validate email format
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    error.text("Please enter a valid email address.");
    error.show();
    return false;
  }

  // Send POST request to server
  $("#contactForm .loading").show();
  $("#contactSubmitBtn").hide();
  error.text("");
  error.hide("");
  $.ajax({
    type: "POST",
    url: apiDomain + "contact/submit",
    data: $(this).serialize(),
    success: (data) => {
      $("#contactForm .loading").hide();
      $("#contactSubmitBtn").show();
      $("#contactForm .sent-message").show().text(data.message);
      $(this)[0].reset();
    },
    error: (xhr, status, error) => {
      $("#contactForm .loading").hide();
      $("#contactSubmitBtn").show();
      let msg = xhr?.responseJSON?.message ?? "Something bad happen";
      error.text(msg);
      error.show();
    },
  });
});
