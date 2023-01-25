var userData = [];
var user_id = "";
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
function regiterDetails() {
  var submit_type = $("#submit_btn").val();
  var form_data = {};
  var id = $("#user-id").val();
  var first_name = $("#user-first-name").val();
  var last_name = $("#user-last-name").val();
  var email = $("#user-email").val();
  var dob = $("#user-dob").val();
  var country = $("#user-country").val();
  var state = $("#user-state").val();
  form_data = {
    id: id,
    first_name: first_name,
    last_name: last_name,
    email: email,
    dob: dob,
    country: country,
    state: state,
  };
  if (submit_type === "Register") {
    userData.push(form_data);
  } else {
    let foundIndex = userData.findIndex((obj) => obj.id === id);
    if (foundIndex > -1) {
      userData[foundIndex] = form_data;
    }
  }
  localStorage.setItem("usersList", JSON.stringify(userData));
  window.location = "/table.html";
}

$(document).ready(() => {
  $("#myForm").trigger("reset");
  let param = window.location.search.split("?uid=")[1];
  user_id = param ? param : uuidv4();
  $("#user-id").val(user_id);
  if (JSON.parse(localStorage.getItem("usersList"))) {
    userData = JSON.parse(localStorage.getItem("usersList"));
  } else {
    userData = [];
  }
  if (param) {
    setFormValues();
  }
});

function setFormValues() {
  let user_detail = getUserDetailsByID();
  $("#user-first-name").val(user_detail.first_name);
  $("#user-last-name").val(user_detail.last_name);
  $("#user-email").val(user_detail.email);
  $("#user-dob").val(user_detail.dob);
  $("#user-country").val(user_detail.country);
  $("#user-state").val(user_detail.state);
  $("#submit_btn").val("Update");
}

function getUserDetailsByID() {
  return userData.find((obj) => obj.id === user_id);
}

function checkValidation() {
  var first_name = document.forms.myForm.first_name.value;
  var last_name = document.forms.myForm.last_name.value;
  var email = document.forms.myForm.email.value;
  var dob = document.forms.myForm.dob.value;
  var country = document.forms.myForm.country.value;
  var state = document.forms.myForm.state.value;
  var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g; //Javascript reGex for Email Validation.
  var regName = /\d+$/g; // Javascript reGex for Name validation

  if (first_name == "" || regName.test(first_name)) {
    adRemoveValidation("invalid_first_name", "Please enter valid first name");
    first_name.focus();
    return false;
  } else {
    adRemoveValidation("invalid_first_name", null);
  }

  if (last_name == "" || regName.test(last_name)) {
    adRemoveValidation("invalid_last_name", "Please enter valid last name");
    last_name.focus();
    return false;
  } else {
    adRemoveValidation("invalid_last_name", null);
  }

  if (email == "" || !regEmail.test(email)) {
    adRemoveValidation(
      "invalid_user-email",
      "Please enter a valid email address"
    );
    email.focus();
    return false;
  } else {
    adRemoveValidation("invalid_user-email", null);
  }

  let age = calculateAge();
  if (dob == "") {
    adRemoveValidation("invalid_user-dob", "Please select your date of birth");
    dob.focus();
    return false;
  } else if (age < 25) {
    ageModal();
    return false;
  } else {
    adRemoveValidation("invalid_user-dob", null);
  }

  if (country == "") {
    adRemoveValidation("invalid_user-country", "Please select country");
    country.focus();
    return false;
  } else {
    adRemoveValidation("invalid_user-country", null);
  }

  if (state == "") {
    adRemoveValidation("invalid_user-state", "Please select state");
    state.focus();
    return false;
  } else {
    adRemoveValidation("invalid_user-state", null);
  }
  regiterDetails();
  return true;
}

function calculateAge() {
  var userinput = $("#user-dob").val();
  if (userinput == null || userinput == "") {
    return false;
  } else {
    var today = new Date();
    var birthDate = new Date(userinput);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}

function ageModal() {
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function () {
    modal.style.display = "none";
  };
}

function adRemoveValidation(id, text) {
  document.getElementById(id).innerHTML = text;
}
