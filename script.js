const video = document.getElementById('video');
const moodSpan = document.getElementById('mood');
const audio = document.getElementById('audio');
const moodHistoryList = document.getElementById('mood-history');
const manualMoodSelect = document.getElementById('manual-mood');
const overrideBtn = document.getElementById('override-btn');

const moods = ['happy', 'sad', 'neutral'];
const music = {
    happy: 'happy.mp3',
    sad: 'sad.mp3',
    neutral: 'neutral.mp3'
};

let moodHistory = [];

// Access webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => console.error('Error accessing webcam:', err));

// Simulate mood detection
setInterval(() => {
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    updateMood(randomMood);
}, 5000);

// Manual mood override
overrideBtn.addEventListener('click', () => {
    const selectedMood = manualMoodSelect.value;
    updateMood(selectedMood);
});

function updateMood(newMood) {
    moodSpan.textContent = newMood;
    playMusic(newMood);
    updateMoodHistory(newMood);
    updateBackground(newMood);
}

function playMusic(mood) {
    const song = music[mood];
    if (song) {
        audio.src = song;
        audio.play();
    }
}

function updateMoodHistory(mood) {
    moodHistory.push(mood);
    const li = document.createElement('li');
    li.textContent = `${new Date().toLocaleTimeString()}: ${mood}`;
    moodHistoryList.appendChild(li);
}

function updateBackground(mood) {
    switch (mood) {
        case 'happy':
            document.body.style.backgroundColor = '#f0c459';
            break;
        case 'sad':
            document.body.style.backgroundColor = '#6c8ec2';
            break;
        case 'neutral':
            document.body.style.backgroundColor = '#f0f0f0';
            break;
    }
}
