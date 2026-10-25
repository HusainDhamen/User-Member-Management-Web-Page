// Bridges - Favorite Resources

// Nisha: Data comes from posts.json and favorites.json

// Gianny: Load resources using jQuery

// Gianny: Search resources using jQuery

// Mahmoud: Add resources to favorites
let favorites = [];

function favoriteButton(resource) {
    return `<button type="button" data-id="${resource.id}" data-title="${resource.title}" data-category="${resource.category}" onclick="addFavorite(this)">Add to Favorites</button>`;
}

function addFavorite(button) {
    let id = Number(button.dataset.id);

    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id === id) {
            alert("This resource is already in your favorites.");
            return;
        }
    }

    favorites.push({
        id: id,
        title: button.dataset.title,
        category: button.dataset.category,
        notes: ""
    });

    showFavorites();
}

function showFavorites() {
    let list = document.getElementById("favoritesList");

    if (favorites.length === 0) {
        list.innerHTML = "<p>No saved resources yet.</p>";
        return;
    }

    let html = "";

    for (let i = 0; i < favorites.length; i++) {
        html += `
            <div class="favoriteItem">
                <h3>${favorites[i].title}</h3>
                <p>ID: ${favorites[i].id}</p>
                <p>Category: ${favorites[i].category}</p>
                <p>Notes: ${favorites[i].notes}</p>
                <button type="button" onclick="removeFavorite(${favorites[i].id})">Remove</button>
            </div>
        `;
    }

    list.innerHTML = html;
}

// Mahmoud: Update saved notes and validate inputs
document.getElementById("favoriteForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let id = document.getElementById("favoriteId").value;
    let notes = document.getElementById("favoriteNotes").value.trim();
    let message = document.getElementById("favoriteMessage");

    if (id === "" || Number(id) <= 0) {
        message.textContent = "Please enter a valid Resource ID.";
        message.style.color = "red";
        return;
    }

    let favorite = null;

    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id === Number(id)) {
            favorite = favorites[i];
        }
    }

    if (favorite === null) {
        message.textContent = "That Resource ID is not in your favorites.";
        message.style.color = "red";
        return;
    }

    if (notes === "") {
        message.textContent = "Please enter some notes.";
        message.style.color = "red";
        return;
    }

    if (notes.length > 200) {
        message.textContent = "Notes must be 200 characters or less.";
        message.style.color = "red";
        return;
    }

    favorite.notes = notes;
    showFavorites();

    message.textContent = "Favorite updated!";
    message.style.color = "green";
    document.getElementById("favoriteForm").reset();
});

// Mahmoud: Remove resources from favorites
function removeFavorite(id) {
    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id === id) {
            favorites.splice(i, 1);
        }
    }

    showFavorites();
}

showFavorites();

// Gianny: Prepare AJAX requests for the future REST API