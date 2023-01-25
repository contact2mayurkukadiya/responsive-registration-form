let userData = [];
$(document).ready(() => {
  if (JSON.parse(localStorage.getItem("usersList"))) {
    userData = JSON.parse(localStorage.getItem("usersList"));
  } else {
    userData = [];
  }
  loadTableData();
  $("#tbody").on("click", ".delete-button", function (e) {
    console.log('e.target', e.target);
    let userId = e.target.dataset.id;
    deleteRecord(userId);
  });
  $("#tbody").on("click", ".edit-button", function (e) {
    let userId = e.target.dataset.id;
    editData(userId);
  });
});
function loadTableData() {
  $("#tbody tr").remove();
  if (userData.length) {
    for (let index = 0; index < userData.length; index++) {
      const element = userData[index];
      $("#tbody").append(`
                   <tr id="R${element.id}">
                       <td class="row-index">
                           <p>${element.first_name}</p>
                       </td>
                       <td class="row-index">
                           <p>${element.last_name}</p>
                       </td>
                       <td class="row-index">
                           <p>${element.dob}</p>
                       </td>
                       <td class="row-index">
                           <p>${element.email}</p>
                       </td>
                       <td class="row-index">
                           <p>${element.state}</p>
                       </td>
                       <td class="row-index">
                           <p>${element.country}</p>
                       </td>
                       <td>
                           <button class="action-button edit-button" data-id="${element.id}">
                           <svg data-id="${element.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48"/><path d="M459.94 53.25a16.06 16.06 0 0 0-23.22-.56L424.35 65a8 8 0 0 0 0 11.31l11.34 11.32a8 8 0 0 0 11.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90 218.82 270.2a9 9 0 0 0-2.31 3.93L208.16 299a3.91 3.91 0 0 0 4.86 4.86l24.85-8.35a9 9 0 0 0 3.93-2.31L422 112.66a9 9 0 0 0 0-12.66l-9.95-10a9 9 0 0 0-12.71 0z" fill="currentColor"/></svg>
                           </button>
                           <button class="action-button delete-button" data-id="${element.id}">
                           <svg data-id="${element.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m112 112 20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40m-64 64v224m-72-224 8 224m136-224-8 224"/></svg>
                           </button>
                       </td>
                  </tr>`);
    }
  } else {
    $("#tbody").append(
      ` <tr><td colspan="7" class="text-center">No Data found</td></tr>`
    );
  }
}

function deleteRecord(record_id) {
  console.log("DELETE RECORD", record_id);
  let foundIndex = userData.findIndex((obj) => obj.id === record_id);
  if (foundIndex > -1) {
    confirmDelete(foundIndex);
  }
}

function confirmDelete(index) {
  var modal = document.getElementById("deleteModal");
  modal.style.display = "block";
  $("#close").click(function () {
    modal.style.display = "none";
  });

  $('#yesButton').click(function () {
    userData.splice(index, 1);
    if (userData.length > 0) {
      localStorage.setItem("usersList", JSON.stringify(userData));
    } else {
      localStorage.removeItem("usersList");
    }
    modal.style.display = "none";
    loadTableData();
  })

  $('#noButton').click(function () {
    modal.style.display = "none";
  })
}

function editData(record_id) {
  window.location = `/?uid=${record_id}`;
}

function redirectRegistration() {
  window.location = "/";
}
