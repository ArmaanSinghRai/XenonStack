$("#loginFormSubmitBtn").click(function (e) {
  e.preventDefault();

  // Validate form data
  var email = $("#loginForm #email").val();
  var password = $("#loginForm #password").val();
  let error = $("#loginForm .error-message");

  // Check if fields are empty
  if (!password || !email) {
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
  $("#loginForm .loading").show();
  $("#loginFormSubmitBtn").hide();
  error.text("");
  error.hide("");
  $.ajax({
    type: "POST",
    url: apiDomain + "auth/login",
    data: $("#loginForm").serialize(),
    success: (data) => {
      $("#loginForm .loading").hide();
      $("#loginFormSubmitBtn").show();
      $("#loginForm .sent-message").show().text(data.message);
      localStorage.setItem("token", data.token);
      $("#loginForm")[0].reset();
      window.location.reload();
    },
    error: (xhr, status, err) => {
      $("#loginForm .loading").hide();
      $("#loginFormSubmitBtn").show();
      let msg = xhr?.responseJSON?.message ?? "Something bad happen";
      error.text(msg);
      error.show();
    },
  });
});

$("#registerFormSubmitBtn").click(function (e) {
    e.preventDefault();
  
    // Validate form data
    var email = $("#registerForm #email").val();
    var password = $("#registerForm #password").val();
    let error = $("#registerForm .error-message");
  
    // Check if fields are empty
    if (!password || !email) {
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
    $("#registerForm .loading").show();
    $("#registerFormSubmitBtn").hide();
    error.text("");
    error.hide("");
    $.ajax({
      type: "POST",
      url: apiDomain + "auth/register",
      data: $("#registerForm").serialize(),
      success: (data) => {
        $("#registerForm .loading").hide();
        $("#registerFormSubmitBtn").show();
        $("#registerForm .sent-message").show().text(data.message);
        $("#registerForm")[0].reset();
      },
      error: (xhr, status, err) => {
        $("#registerForm .loading").hide();
        $("#registerFormSubmitBtn").show();
        let msg = xhr?.responseJSON?.message ?? "Something bad happen";
        error.text(msg);
        error.show();
      },
    });
  });

$("#logoutBtn a").click(function(e){
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
});

checkAuth();
function checkAuth() {
  // Check if a token is available in local storage
  const token = localStorage.getItem("token");
  if (token) {
    $("#loginBtn").hide();
    $("#logoutBtn").show();
  } else {
    $("#loginBtn").show();
    $("#logoutBtn").hide();
  }
}
