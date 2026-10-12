
// Sidebar
const sideBarButton = document.getElementById("sideBarButton");

const sidebarNav = document.querySelector("#sidebar nav");

if (sideBarButton && sidebarNav) {

  sideBarButton.addEventListener("click", function () {

    if (sidebarNav.style.display === "none") {
      sidebarNav.style.display = "block";

    } else {
      sidebarNav.style.display = "none";
    }
  });

}


// Community Posts
const postsList = document.getElementById("postsList");

const posts = [

  { title: "Welcome to Bridges", text: "Say hi and tell us what you are studying." },

  { title: "Study group for IST", text: "Looking for people to study with this week." },

  { title: "Internship tips", text: "Share what helped you find an internship." }

];


if (postsList) {
  posts.forEach(post => {

    const card = document.createElement("div");
    addLine(card, "h3", post.title);

    addLine(card, "p", post.text);

    postsList.appendChild(card);
  });
}


// Signup Page

const form = document.getElementById("signupForm");
const membersList = document.getElementById("membersList");
const fieldIds = ["fullName", "email", "age", "address", "phone"];

let submitButton = null;
let submitText = "";
let members = [];
let editIndex = -1;


// Load and Save Members
function loadMembers() {

  const saved = localStorage.getItem("members");

  if (saved) {
    members = JSON.parse(saved);
    showMembers();
    return;
  }

  fetch("data/users.json")

    .then(response => response.json())
    .then(data => {

      members = data;
      saveMembers();
      showMembers();
    })

    .catch(error => {

      console.error("Error loading users:", error);
      showMembers();
    });
}

function saveMembers() {

  const json = JSON.stringify(members, null, 2);

  localStorage.setItem("members", json);

  console.log(json);
}


// Form Validation

function showError(id, message) {

  const input = document.getElementById(id);
  let error = document.getElementById(id + "Error");


  if (!error) {
    error = document.createElement("small");

    error.id = id + "Error";

    error.style.color = "#f87171";

    error.style.display = "block";
    input.insertAdjacentElement("afterend", error);
  }

  error.textContent = message;
  input.classList.toggle("is-invalid", message !== "");
}

function clearErrors() {
  fieldIds.forEach(id => showError(id, ""));
}

function emailTaken(email) {

  return members.some((member, index) => {
    const sameEmail =
      String(member.email).trim().toLowerCase() === email.toLowerCase();

    return sameEmail && index !== editIndex;

  });
}

function validateForm(member) {

  let isValid = true;
  clearErrors();

  if (member.fullName.length < 2) {
    showError("fullName", "Please enter your full name.");
    isValid = false;

  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (member.email === "") {

    showError("email", "Please enter your email.");
    isValid = false;
  } else if (!emailPattern.test(member.email)) {
    showError("email", "Please enter a valid email, like name@example.com.");
    isValid = false;
  } else if (emailTaken(member.email)) {
    showError("email", "This email is already a member.");
    isValid = false;
  }

  const age = Number(member.age);

  if (member.age === "") {
    showError("age", "Please enter your age.");
    isValid = false;
  } else if (!Number.isInteger(age) || age < 1 || age > 120) {
    showError("age", "Age must be a number from 1 to 120.");
    isValid = false;
  }

  if (member.address === "") {
    showError("address", "Please enter your address.");
    isValid = false;
  }

  const phonePattern = /^[0-9+\-\s()]{7,15}$/;

  if (member.phone !== "" && !phonePattern.test(member.phone)) {
    showError("phone", "Phone must be 7 to 15 digits.");
    isValid = false;
  }

  return isValid;
}


// Create Cards and Buttons
function addLine(card, tag, text) {

  const element = document.createElement(tag);
  element.textContent = text;
  card.appendChild(element);
}

function addButton(card, text, className, onClick) {

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  button.className = className;
  button.addEventListener("click", onClick);
  card.appendChild(button);

}


// Display Members
function showMembers() {
  membersList.innerHTML = "";

  if (members.length === 0) {
    membersList.textContent = "No members yet.";
    return;
  }

  members.forEach((member, index) => {
    const card = document.createElement("div");

    addLine(card, "h3", member.fullName);
    addLine(card, "p", "Email: " + member.email);
    addLine(card, "p", "Age: " + member.age);
    addLine(card, "p", "Address: " + member.address);
    addLine(card, "p", "Phone: " + (member.phone || "Not given"));

    addButton(
      card,
      "Edit",
      "btn btn-sm btn-primary me-2",
      () => startEdit(index)
    );

    addButton(
      card,
      "Delete",
      "btn btn-sm btn-danger",
      () => deleteMember(index)
    );

    membersList.appendChild(card);
  });
}


// Edit and Delete Members
function startEdit(index) {

  const member = members[index];
  clearErrors();

  document.getElementById("fullName").value = member.fullName;
  document.getElementById("email").value = String(member.email).trim();
  document.getElementById("age").value = member.age;
  document.getElementById("address").value = String(member.address).trim();
  document.getElementById("phone").value = member.phone;

  editIndex = index;
  submitButton.textContent = "Update Member";
  form.scrollIntoView({ behavior: "smooth" });
}

function deleteMember(index) {
  if (!confirm("Delete " + members[index].fullName + "?")) {
    return;
  }

  members.splice(index, 1);
  saveMembers();
  showMembers();
  resetForm();
}

function resetForm() {

  form.reset();
  clearErrors();
  editIndex = -1;
  submitButton.textContent = submitText;
}


// Submit Form
if (form && membersList) {

  submitButton = form.querySelector("button");
  submitText = submitButton.textContent;
  form.noValidate = true;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const newMember = {
      fullName: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      age: document.getElementById("age").value.trim(),
      address: document.getElementById("address").value.trim(),
      phone: document.getElementById("phone").value.trim()
    };

    if (!validateForm(newMember)) {
      return;
    }

    newMember.age = Number(newMember.age);

    if (editIndex === -1) {
      members.push(newMember);
    } else {
      members[editIndex] = newMember;
    }

    saveMembers();
    showMembers();
    resetForm();
  });

  loadMembers();
}