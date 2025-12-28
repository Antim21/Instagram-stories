// Instagram Stories Feature - JavaScript

// Global variables
let allUsers = [];
let currentUserIndex = 0;
let currentStoryIndex = 0;
let autoAdvanceTimer = null;
let isLoading = false;

// DOM Elements
const storiesContainer = document.getElementById('storiesContainer');
const storyViewer = document.getElementById('storyViewer');
const storyImage = document.getElementById('storyImage');
const storyUserPic = document.getElementById('storyUserPic');
const storyUsername = document.getElementById('storyUsername');
const closeBtn = document.getElementById('closeBtn');
const navLeft = document.getElementById('navLeft');
const navRight = document.getElementById('navRight');
const loader = document.getElementById('loader');
const progressContainer = document.getElementById('progressContainer');

// Fetch stories from external JSON file
function fetchStories() {
    fetch('stories.json')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Failed to load stories');
            }
            return response.json();
        })
        .then(function (data) {
            allUsers = data;
            renderStoryList();
        })
        .catch(function (error) {
            console.log('Error:', error);
            storiesContainer.innerHTML = '<p style="color: red; padding: 20px;">Failed to load stories</p>';
        });
}

// Render story circles in the horizontal list
function renderStoryList() {
    storiesContainer.innerHTML = '';

    for (let i = 0; i < allUsers.length; i++) {
        let user = allUsers[i];

        let storyItem = document.createElement('div');
        storyItem.className = 'story-item';
        storyItem.setAttribute('data-user-index', i);

        let thumbnail = document.createElement('div');
        thumbnail.className = 'story-thumbnail';

        let img = document.createElement('img');
        img.src = user.profilePic;
        img.alt = user.username;

        let name = document.createElement('span');
        name.className = 'story-name';
        name.textContent = user.username;

        thumbnail.appendChild(img);
        storyItem.appendChild(thumbnail);
        storyItem.appendChild(name);

        storyItem.addEventListener('click', function () {
            let userIndex = parseInt(this.getAttribute('data-user-index'));
            openStoryViewer(userIndex);
        });

        storiesContainer.appendChild(storyItem);
    }
}

// Create progress bars for current user's stories
function createProgressBars() {
    progressContainer.innerHTML = '';

    let user = allUsers[currentUserIndex];
    let storyCount = user.stories.length;

    for (let i = 0; i < storyCount; i++) {
        let progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.setAttribute('data-story-index', i);

        let progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';

        progressBar.appendChild(progressFill);
        progressContainer.appendChild(progressBar);
    }
}

// Update progress bars based on current story
function updateProgressBars() {
    let progressBars = progressContainer.querySelectorAll('.progress-bar');

    for (let i = 0; i < progressBars.length; i++) {
        let bar = progressBars[i];
        let fill = bar.querySelector('.progress-fill');

        bar.classList.remove('completed');
        fill.classList.remove('animating');
        fill.style.width = '0%';

        if (i < currentStoryIndex) {
            bar.classList.add('completed');
        } else if (i === currentStoryIndex) {
            setTimeout(function () {
                fill.classList.add('animating');
            }, 100);
        }
    }
}

// Open the full-screen story viewer
function openStoryViewer(userIndex) {
    currentUserIndex = userIndex;
    currentStoryIndex = 0;

    storyViewer.classList.add('active');
    document.body.style.overflow = 'hidden';

    createProgressBars();
    loadCurrentStory();
}

// Close the story viewer
function closeStoryViewer() {
    storyViewer.classList.remove('active');
    document.body.style.overflow = 'auto';

    if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }

    isLoading = false;
    loader.classList.remove('show');
}

// Load and display the current story
function loadCurrentStory() {
    let user = allUsers[currentUserIndex];

    if (currentStoryIndex >= user.stories.length) {
        goToNextUser();
        return;
    }

    isLoading = true;
    loader.classList.add('show');
    storyImage.classList.remove('loaded');

    if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
    }

    storyUserPic.src = user.profilePic;
    storyUsername.textContent = user.username;

    let imageUrl = user.stories[currentStoryIndex];
    storyImage.src = imageUrl;

    // Handle successful image load
    storyImage.onload = function () {
        isLoading = false;
        loader.classList.remove('show');
        storyImage.classList.add('loaded');

        updateProgressBars();

        // Auto-advance after 5 seconds
        autoAdvanceTimer = setTimeout(function () {
            goToNextStory();
        }, 5000);
    };

    // Handle image load error
    storyImage.onerror = function () {
        isLoading = false;
        loader.classList.remove('show');
        console.log('Error loading image');
        goToNextStory();
    };
}

// Navigate to previous story
function goToPreviousStory() {
    if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
    }

    currentStoryIndex = currentStoryIndex - 1;

    if (currentStoryIndex < 0) {
        goToPreviousUser();
    } else {
        loadCurrentStory();
    }
}

// Navigate to next story
function goToNextStory() {
    if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
    }

    currentStoryIndex = currentStoryIndex + 1;

    let user = allUsers[currentUserIndex];

    if (currentStoryIndex >= user.stories.length) {
        goToNextUser();
    } else {
        loadCurrentStory();
    }
}

// Move to next user's stories
function goToNextUser() {
    currentUserIndex = currentUserIndex + 1;

    if (currentUserIndex >= allUsers.length) {
        closeStoryViewer();
    } else {
        currentStoryIndex = 0;
        createProgressBars();
        loadCurrentStory();
    }
}

// Move to previous user's stories
function goToPreviousUser() {
    currentUserIndex = currentUserIndex - 1;

    if (currentUserIndex < 0) {
        closeStoryViewer();
    } else {
        let user = allUsers[currentUserIndex];
        currentStoryIndex = user.stories.length - 1;
        createProgressBars();
        loadCurrentStory();
    }
}

// Event Listeners
closeBtn.addEventListener('click', function () {
    closeStoryViewer();
});

navLeft.addEventListener('click', function (event) {
    event.stopPropagation();
    goToPreviousStory();
});

navRight.addEventListener('click', function (event) {
    event.stopPropagation();
    goToNextStory();
});

document.addEventListener('keydown', function (event) {
    if (!storyViewer.classList.contains('active')) {
        return;
    }

    if (event.key === 'ArrowLeft') {
        goToPreviousStory();
    } else if (event.key === 'ArrowRight') {
        goToNextStory();
    } else if (event.key === 'Escape') {
        closeStoryViewer();
    }
});

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    fetchStories();
});
