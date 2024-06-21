$(document).ready(function () {
  var courses = [];

  function addCourse(courseID, courseName, grade) {
    var row =
      "<tr><td>" +
      courseID +
      "</td><td>" +
      courseName +
      "</td><td>" +
      grade +
      '</td><td><button class="btn btn-danger delete-btn">Delete</button></td></tr>';
    $("#courseList").append(row);
  }

  function showError(message) {
    var errorContainer = $("#errorContainer");
    errorContainer.text(message);
    errorContainer.show();
    setTimeout(function () {
      errorContainer.hide();
    }, 3000); // Hide the error message after 3 seconds
  }

  $("#addItemForm").submit(function (event) {
    event.preventDefault();
    var courseID = $("#courseID").val();
    var courseName = $("#courseName").val();
    var grade = $("#grade").val();

    // Validate inputs
    if (!courseID || !courseName || !grade) {
      showError("All fields are required.");
      return;
    }

    if (!/^\d*$/.test(grade)) {
      showError("Grade must contain only numbers.");
      return;
    }

    if (!/^[A-Za-z ]*$/.test(courseName)) {
      showError("Course Name must contain only letters and spaces.");
      return;
    }
    if (isNaN(grade) || grade < 0 || grade > 100) {
      showError("Grade must be a number between 0 and 100.");
      return;
    }

    courses.push({
      courseID: courseID,
      courseName: courseName,
      grade: parseInt(grade),
    });
    addCourse(courseID, courseName, grade);
    $("#courseID").val("");
    $("#courseName").val("");
    $("#grade").val("");
    sortTable();
  });

  function sortTable() {
    var sortOption = $("#gradeSort").val();

    if (sortOption === "-") {
      return; // If "-" is selected, do nothing
    }

    courses.sort(function (a, b) {
      if (sortOption === "asc") {
        return a.grade - b.grade;
      } else {
        return b.grade - a.grade;
      }
    });

    $("#courseList").empty();

    for (var i = 0; i < courses.length; i++) {
      addCourse(courses[i].courseID, courses[i].courseName, courses[i].grade);
    }
  }

  $("#gradeSort").on("change", function () {
    sortTable();
  });

  $("#courseList").on("click", ".delete-btn", function () {
    var row = $(this).closest("tr");
    var courseID = row.find("td:first").text();
    var index = courses.findIndex((course) => course.courseID === courseID);
    if (index !== -1) {
      courses.splice(index, 1);
      row.remove();
    }
  });
});
