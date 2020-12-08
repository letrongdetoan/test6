// *** RESPONSIVE
let mobile = window.matchMedia("(max-width: 687px)");

// *** TOKEN
// Assign the locally stored token to a variable when enter website
let token = localStorage.getItem('token');
let gallery = document.querySelector('#gallery');

// If user is not logged in (token === null), main page is cleared and Sign In form is shown
// Otherwise hide Sign In form and show Latest Songs

function checkLogInState() {
    const guestOnly = document.querySelector('.guest-only'),
        userOnly = document.querySelector('.user-only');
    if (token) {
        guestOnly.style.display = 'none';
        userOnly.style.display = 'block';
        getLatestSongs();
        getSongs('https://2-dot-backup-server-002.appspot.com/_api/v2/songs/get-mine', 'mySongs', function () {
        });
    } else {
        guestOnly.style.display = 'block';
        userOnly.style.display = 'none';
        gallery.innerHTML = '';
    }
}

// *** SIGN IN & SIGN UP PAGE
const loading = document.querySelector('#loading-screen');

// SIGN IN
let signInForm = document.forms['sign-in-form'];
let signInEmail = signInForm['email'];
let signInPassword = signInForm['password'];
let signInRemember = signInForm['remember'];
let signInSubmit = signInForm['submit'];
let signInMessage = document.querySelector('[name="sign-in-form"] .message');

signInSubmit.onclick = submitSignInForm;
signInEmail.onkeydown = enterSignInForm;
signInPassword.onkeydown = enterSignInForm;

function enterSignInForm() {
    if (event.keyCode === 13) {
        signInSubmit.click();
        document.activeElement.blur();
    }
}

function validateSignInForm() {
    return signInEmail.checkValidity() && signInPassword.checkValidity();
}

// Stringify form data and send to server, display loading screen while awaiting response
// If succeed, update token and checkLogInState, otherwise display error message
function submitSignInForm() {
    if (validateSignInForm()) {
        signInMessage.innerHTML = '&nbsp;';
        let jsonData = JSON.stringify({
            "password": signInPassword.value,
            "email": signInEmail.value
        });
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 201) {
                let response = JSON.parse(this.responseText);
                token = response.token;
                if (signInRemember.checked) {
                    localStorage.setItem('token', response.token);
                }
                getUserInfo();
                signInMessage.innerHTML = 'Welcome back!';
                loading.style.display = 'none';
                setTimeout(checkLogInState, 1000);
            } else if (this.readyState === 4 && this.status === 403) {
                signInMessage.innerHTML = 'The email address or password is incorrect. Please try again.';
                loading.style.display = 'none';
            } else if (this.readyState === 4) {
                signInMessage.innerHTML = 'The server encountered an error. Please try again later.';
                loading.style.display = 'none';
            } else {
                loading.style.display = 'block';
            }
        };
        xhttp.open('POST', `https://2-dot-backup-server-002.appspot.com/_api/v2/members/authentication`, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(jsonData);
    } else {
        signInMessage.innerHTML = 'The email address or password is incorrect. Please try again.';
    }
}

// OPEN AND CLOSE SIGN UP FORM
let signUpOpen = document.querySelector('.sign-up-link');
let signUpClose = document.querySelector('[name="sign-up-form"] .close');
let signInLink = document.querySelector('.sign-in-link');
signUpOpen.onclick = openSignUpForm;
signUpClose.onclick = closeSignUpForm;
signInLink.onclick = closeSignUpForm;

function openSignUpForm() {
    signInForm.style.display = 'none';
    signUpForm.style.display = 'flex';
    signInMessage.innerHTML = '&nbsp;';
}

function closeSignUpForm() {
    signInForm.style.display = 'flex';
    signUpForm.style.display = 'none';
}

// SIGN UP
let guestBox = document.querySelector('#guest-box');
let signUpForm = document.forms['sign-up-form'];
let signUpEmail = signUpForm['email'];
let signUpPassword = signUpForm['password'];
let signUpRePassword = signUpForm['confirm-password'];
let signUpFirstName = signUpForm['firstName'];
let signUpLastName = signUpForm['lastName'];
let signUpGender = signUpForm['gender'];
let signUpBirthday = signUpForm['birthday'];
let signUpAddress = signUpForm['address'];
let signUpPhone = signUpForm['phone'];
let signUpAvatar = signUpForm['avatar'];
let signUpSubmit = signUpForm['submit'];
let signUpMessage = signUpForm.querySelector('.message');
let isValidSignUp;
signUpEmail.onkeyup = validateSignUpEmail;
signUpPassword.onkeyup = validateSignUpPassword;
signUpRePassword.onkeyup = validateSignUpPassword;
signUpFirstName.onkeyup = validateSignUpFirstName;
signUpLastName.onkeyup = validateSignUpLastName;
signUpGender.onchange = function () {
    validateSignUpGender();
    signUpGender.style.color = 'var(--text-primary)';
}
signUpBirthday.onkeyup = validateSignUpBirthday;
signUpBirthday.onchange = function () {
    validateSignUpBirthday();
    signUpBirthday.style.color = 'var(--text-primary)';
}
signUpAddress.onkeyup = validateSignUpAddress;
signUpPhone.onkeyup = validateSignUpPhone;
signUpAvatar.onkeyup = validateSignUpAvatar;
signUpSubmit.onclick = submitSignUpForm;
for (let i = 0; i < signUpForm.length; i++) {
    signUpForm[i].onkeydown = function () {
        if (event.keyCode === 13) {
            signUpSubmit.click();
            document.activeElement.blur();
        }
    }
}

function submitSignUpForm() {
    signUpMessage.innerHTML = '';
    isValidSignUp = true;
    validateSignUpEmail();
    validateSignUpPassword();
    validateSignUpFirstName();
    validateSignUpLastName();
    validateSignUpGender();
    validateSignUpBirthday();
    validateSignUpAddress();
    validateSignUpPhone();
    validateSignUpAvatar();
    if (isValidSignUp) {
        testImage(signUpAvatar.value, function (url, result) {
            if (result === 'success') {
                sendSignUpForm();
            } else if (result === 'error') {
                signUpAvatar.className = 'error';
                signUpAvatar.nextElementSibling.innerHTML = 'Avatar URL does not point to an image. Please check and try again.';
                signUpAvatar.nextElementSibling.scrollIntoView();
            } else {
                signUpAvatar.className = 'error';
                signUpAvatar.nextElementSibling.innerHTML = 'Avatar URL is not reachable. Please check and try again.';
                signUpAvatar.nextElementSibling.scrollIntoView();
            }
        });
        return false;
    } else {
        signUpMessage.innerHTML = 'One or more fields have an error. Please check and try again.';
        guestBox.scrollTop = 0;
    }
}

function validateSignUpEmail() {
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (signUpEmail.value.match(emailFormat)) {
        signUpEmail.className = '';
        signUpEmail.nextElementSibling.innerHTML = '';
    } else {
        isValidSignUp = false;
        signUpEmail.className = 'error';
        if (!signUpEmail.value.length) {
            signUpEmail.nextElementSibling.innerHTML = 'Email is required.';
        } else {
            signUpEmail.nextElementSibling.innerHTML = 'Wrong email format. Please re-enter.';
        }
    }
}

// Add red background color to Confirm Password field when passwords not matching
function validateSignUpPassword() {
    const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (signUpPassword.value.match(passwordFormat)) {
        signUpPassword.className = '';
        signUpPassword.nextElementSibling.innerHTML = '';
    } else {
        isValidSignUp = false;
        signUpPassword.className = 'error';
        if (!signUpPassword.value.length) {
            signUpPassword.nextElementSibling.innerHTML = 'Password is required.';
        } else {
            signUpPassword.nextElementSibling.innerHTML = 'Password must have at least 8 characters, including at least one number, one uppercase and one lowercase letter.';
        }
    }
    if (signUpRePassword.value === signUpPassword.value && signUpRePassword.value.match(passwordFormat)) {
        signUpRePassword.className = '';
        signUpRePassword.nextElementSibling.innerHTML = '';
    } else {
        isValidSignUp = false;
        signUpRePassword.className = 'error';
        if (signUpRePassword.value !== signUpPassword.value) {
            signUpRePassword.nextElementSibling.innerHTML = 'Passwords do not match.';
        } else {
            signUpRePassword.nextElementSibling.innerHTML = 'Password must have at least 8 characters, including at least one number, one uppercase and one lowercase letter.';
        }
    }
}

function validateSignUpFirstName() {
    if (signUpFirstName.value.length) {
        signUpFirstName.className = '';
        signUpFirstName.nextElementSibling.nextElementSibling.innerHTML = '';
    } else {
        isValidSignUp = false;
        signUpFirstName.className = 'error';
        signUpFirstName.nextElementSibling.nextElementSibling.innerHTML = 'First Name is required.';
    }
}

function validateSignUpLastName() {
    if (signUpLastName.value.length) {
        signUpLastName.className = '';
        signUpLastName.nextElementSibling.nextElementSibling.innerHTML = '';
    } else {
        isValidSignUp = false;
        signUpLastName.className = 'error';
        signUpLastName.nextElementSibling.nextElementSibling.innerHTML = 'Last Name is required.';
    }
}

function validateSignUpGender() {
    if (signUpGender.value) {
        signUpGender.className = '';
        signUpGender.nextElementSibling.nextElementSibling.innerHTML = '';
    } else {
        isValidSignUp = false;
        signUpGender.className = 'error';
        signUpGender.nextElementSibling.nextElementSibling.innerHTML = 'Gender is required.';
    }
}

function validateSignUpBirthday() {
    let today = new Date();
    let birthday = new Date(signUpBirthday.value);
    if (birthday <= today) {
        signUpBirthday.className = '';
        signUpBirthday.nextElementSibling.nextElementSibling.innerHTML = '';
    } else {
        isValidSignUp = false;
        signUpBirthday.className = 'error';
        if (!signUpBirthday.value) {
            signUpBirthday.nextElementSibling.nextElementSibling.innerHTML = 'Birthday is required.';
        } else {
            signUpBirthday.nextElementSibling.nextElementSibling.innerHTML = 'Birthday must be on or before today.';
        }
    }
}

function validateSignUpAddress() {
    if (signUpAddress.value.length) {
        signUpAddress.className = '';
        signUpAddress.nextElementSibling.innerHTML = '';
    } else {
        isValidSignUp = false;
        signUpAddress.className = 'error';
        signUpAddress.nextElementSibling.innerHTML = 'Address is required.';
    }
}

function validateSignUpPhone() {
    const phoneFormat = /^\d{8,15}$/
    if (signUpPhone.value.match(phoneFormat)) {
        signUpPhone.className = '';
        signUpPhone.nextElementSibling.innerHTML = '';
    } else {
        isValidSignUp = false;
        signUpPhone.className = 'error';
        if (!signUpPhone.value.length) {
            signUpPhone.nextElementSibling.innerHTML = 'Phone is required.';
        } else {
            signUpPhone.nextElementSibling.innerHTML = 'Wrong Phone format. Please re-enter.';
        }
    }
}

function validateSignUpAvatar() {
    if (signUpAvatar.checkValidity()) {
        signUpAvatar.className = '';
        signUpAvatar.nextElementSibling.innerHTML = '';
    } else {
        isValidSignUp = false;
        signUpAvatar.className = 'error';
        if (!signUpAvatar.value.length) {
            signUpAvatar.nextElementSibling.innerHTML = 'Avatar is required.';
        } else {
            signUpAvatar.nextElementSibling.innerHTML = 'Avatar URL is not valid. Please re-enter.';
        }
    }
}

function testImage(url, callback, timeout) {
    let timedOut = false, timer;
    let img = new Image();
    img.onerror = img.onabort = function () {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "error");
        }
    };
    img.onload = function () {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "success");
        }
    };
    img.src = url;
    timer = setTimeout(function () {
        timedOut = true;
        callback(url, "timeout");
    }, timeout);
}

// Show loading screen while awaiting response
// Display appropriate message on each response case
function sendSignUpForm() {
    let formData = new FormData(signUpForm);
    formData.delete('confirm-password');
    if (formData.get('introduction') === '') {
        formData.delete('introduction');
    }
    let jsonData = JSON.stringify(Object.fromEntries(formData));
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            loading.style.display = 'none';
            signInMessage.innerHTML = 'Congratulations, your account has been successfully created. Sign in now to start listening.';
            closeSignUpForm();
            signUpForm.reset();
        } else if (this.readyState === 4) {
            loading.style.display = 'none';
            let response = JSON.parse(this.responseText).error;
            let errorMessage = '<br>', x;
            for (x in response) {
                errorMessage += response[x] + '<br>';
            }
            signUpMessage.innerHTML = errorMessage;
            guestBox.scrollTop = 0;
        } else {
            loading.style.display = 'block';
        }
    }
    xhttp.open('POST', `https://2-dot-backup-server-002.appspot.com/_api/v2/members`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(jsonData);
}

// *** ACCOUNT CONTROLS
// SIGN OUT
let signOutBtn = document.querySelector('.sign-out-link');
signOutBtn.onclick = signOut;

function signOut() {
    let choice = confirm("Are you sure you want to sign out?");
    if (choice) {
        token = '';
        localStorage.clear();
        sessionStorage.clear();
        resetPreferences();
        signInMessage.innerHTML = '&nbsp;';
        checkLogInState();
    }
}

function resetPreferences() {
    if (isPlaying) {
        pauseTrack();
        setPlayPauseIcon();
    }
    playbackControls.style.visibility = 'hidden';
    playbackInfo.style.visibility = 'hidden';
    isPlaying = false;
    isShuffle = false;
    isRepeat = 'none';
    trackIndex = 0;
    setShuffleBtn.className = 'set-shuffle';
    setRepeatBtn.className = 'set-repeat';
    resetPlaylist();
    updatePlaylist();
}

// USER INFORMATION
let navBarUsername = document.querySelector('.user-only h2.username');
let viewProfileBtn = document.querySelector('.view-profile-link');
let userInfo;

viewProfileBtn.onclick = function () {
    closeNav();
    showModal('#profile-modal');
}

// Get user information from the server and assign to variable userInfo
// Update the username on the nav bar
function getUserInfo() {
    if (localStorage.getItem('userInfo')) {
        userInfo = JSON.parse(localStorage.getItem('userInfo'));
        printProfile(userInfo);
    } else {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 201) {
                loading.style.display = 'none';
                userInfo = JSON.parse(this.response);
                if (signInRemember.checked) {
                    localStorage.setItem('userInfo', this.response);
                }
                printProfile(userInfo);
            } else {
                loading.style.display = 'block';
            }
        };
        xhttp.open('GET', `https://2-dot-backup-server-002.appspot.com/_api/v2/members/information`, true);
        xhttp.setRequestHeader('Authorization', token);
        xhttp.send();
    }
}

function printProfile(userInfo) {
    // The name on the nav bar
    navBarUsername.innerHTML = `${userInfo.firstName} ${userInfo.lastName}`;
    // Show avatar if user's avatar link is an image, otherwise use a placeholder
    let avatar = document.querySelector('#ava-container img');
    avatar.src = userInfo.avatar;
    avatar.onerror = function () {
        if (userInfo.gender === 2) {
            avatar.src = 'img/avatar-placeholder-female.jpg';
        } else avatar.src = 'img/avatar-placeholder-male.jpg';
    }
    // Show gender (1 for Male, 2 for Female, 3 for Other)
    const gender = ['', 'Male', 'Female', 'Other'];
    document.querySelector('#profile-details .gender').innerHTML = gender[userInfo.gender];
    // If user profile has an introduction, show Introduction section (hidden by default)
    if (userInfo.introduction !== null) {
        let introduction = document.querySelector('#profile-details .introduction');
        introduction.textContent = userInfo.introduction;
        introduction.style.display = 'block';
    }
    // Show the rest of the profile
    document.querySelector('#ava-container div').textContent = `${userInfo.firstName} ${userInfo.lastName}`;
    document.querySelector('#profile-details .email').textContent = userInfo.email;
    document.querySelector('#profile-details .phone').textContent = userInfo.phone;
    document.querySelector('#profile-details .address').textContent = userInfo.address;
    document.querySelector('#profile-details .birthday').textContent = convertStrToLongDate(userInfo.birthday);
    document.querySelector('#profile-details .date-created').textContent = convertStrToLongDate(userInfo.createdAt);
}

// Show modal, also hide modal when click on close (X) button or anywhere outside the modal box
function showModal(modalId) {
    let modal = document.querySelector(modalId);
    let close = document.querySelector(`${modalId} .close`);
    modal.style.display = 'block';
    close.onclick = function () {
        modal.style.display = 'none';
    }
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

function convertStrToLongDate(string) {
    let dateFormatted = string.slice(0, 19).split(/[- :T]/);
    let date = new Date(dateFormatted[0], dateFormatted[1] - 1, dateFormatted[2], dateFormatted[3], dateFormatted[4], dateFormatted[5]);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// *** GALLERY SECTION
let getLatestSongsBtn = document.querySelector('.get-latest-songs');
let getMySongsBtn = document.querySelector('.get-my-songs');
let galleryTitle = document.querySelector('.gallery-title');
let mySongs, latestSongs, songLibrary;

getLatestSongsBtn.onclick = getLatestSongs;
getMySongsBtn.onclick = getMySongs;

function getLatestSongs() {
    getSongs('https://2-dot-backup-server-002.appspot.com/_api/v2/songs', 'latestSongs', printGallery);
    getLatestSongsBtn.classList.add('active');
    getMySongsBtn.classList.remove('active');
    galleryTitle.innerHTML = 'New Releases';
    closeNav();
    window.scrollTo(0, 0);
}

function getMySongs() {
    getSongs('https://2-dot-backup-server-002.appspot.com/_api/v2/songs/get-mine', 'mySongs', printGallery);
    getLatestSongsBtn.classList.remove('active');
    getMySongsBtn.classList.add('active');
    galleryTitle.innerHTML = 'My Songs';
    closeNav();
    window.scrollTo(0, 0);
}

let dogAnimation = `<div class="dog">
            <div class="head">
                <div class="ears"></div>
                <div class="eyes"></div>
                <div class="beard">
                    <div class="mouth">
                        <div class="tongue"></div>
                    </div>
                </div>
            </div>
            <div class="belt"></div>
            <div class="stomach"></div>
            <div class="legs">
                <div class="left"></div>
                <div class="right"></div>
            </div>
            <div class="tail"></div>
        </div>`;

function getSongs(path, storageKey, myCallback) {
    gallery.innerHTML = dogAnimation;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            loading.style.display = 'none';
            myCallback(JSON.parse(this.response));
            sessionStorage.setItem(storageKey, this.response);
            // let response = JSON.parse(this.response);
            // let responseFiltered = [];
            // let length = response.length;
            // let processed = 0;
            // for (let i = 0; i < length; i++) {
            //     testAudio(response[i].link, function (url, result) {
            //         if (result === 'success') {
            //             responseFiltered.push(response[i]);
            //             processed++;
            //             console.log(processed + '/' + length + result);
            //             if (processed === length) {
            //                 clearTimeout(timer);
            //                 sessionStorage.setItem(storageKey, JSON.stringify(responseFiltered));
            //                 myCallback(responseFiltered);
            //             }
            //         } else {
            //             processed++;
            //             console.log(processed + '/' + length + result);
            //             if (processed === length) {
            //                 clearTimeout(timer);
            //                 sessionStorage.setItem(storageKey, JSON.stringify(responseFiltered));
            //                 myCallback(responseFiltered);
            //             }
            //         }
            //     }, 200000);
            // }
            // let printed = 0;
            // let timer = setInterval(function () {
            //     if (responseFiltered.length > printed) {
            //         printed = responseFiltered.length;
            //         sessionStorage.setItem(storageKey, JSON.stringify(responseFiltered));
            //         myCallback(responseFiltered);
            //     }
            // }, 5000);
            // return false;
        }
    };
    xhttp.open('GET', path, true);
    xhttp.setRequestHeader('Authorization', token);
    xhttp.send();
}

// Print gallery if there is at least one song
// Otherwise show Add Song message and blink Add Song button
function printGallery(response) {
    let galleryContent = '';
    if (response.length) {
        for (let i = 0; i < response.length; i++) {
            galleryContent += `<div class="gallery-item">
            <div class="artwork-container">
                <img class="artwork" src="${response[i].thumbnail}"
                 alt="${response[i].name}">
                <div class="gallery-item-controllers" id="${response[i].id}">
                    <i class="fas fa-play play-pause"></i>
                    <div class="dropdown gallery-dropdown">
                        <i class="fas fa-ellipsis-h drop-btn"></i>
                    </div>
                </div>
            </div>
            <div class="track">${response[i].name}</div>
            <div class="artist">${response[i].singer}</div>
        </div>`;
        }
        gallery.innerHTML = galleryContent;
        let galleryArtwork = document.querySelectorAll('.gallery-item .artwork');
        galleryArtwork.forEach(function (item) {
            item.onerror = replaceArtwork;
        })
        if (isPlaying) {
            setPlayPauseIcon(playlist[trackIndex].id);
        }
    } else {
        gallery.innerHTML = '<div class="loading-message">Nothing here. Start adding song now.</div>';
        makeBlink(addTrackBtn, 3000);
    }
}

gallery.addEventListener('click', function (event) {
    if (event.target.classList.contains('gallery-item-controllers')) {
        openTrackInfoModal(event.target.id);
    }
    if (event.target.classList.contains('play-pause')) {
        let id = event.target.parentElement.id;
        playPauseOneTrack(id);
        event.stopPropagation();
    }
    if (event.target.classList.contains('drop-btn')) {
        openDropdown(event, event.target);
        event.stopPropagation();
    }
});

// Upon clicking the drop-btn, create a menu (dropdownContent) at the position of the click
// and a full screen empty element (closeDropdown) that closes itself when clicked
function openDropdown(btnClickEvent, btn, index) {
    let container = btn.parentElement;
    let dropdownContent = document.createElement('div');
    let btnSongInfo = document.createElement('div');
    let btnPlayNext = document.createElement('div');
    let btnPlayLater = document.createElement('div');
    let btnRemove = document.createElement('div');
    let closeDropdown = document.createElement('div');
    let isPlaylist, id;
    // For Playlist dropdown, there is one more option: Remove track from Playlist
    if (index !== undefined) {
        isPlaylist = true;
        id = playlist[index].id;
    } else {
        isPlaylist = false;
        id = btn.closest('.gallery-item-controllers').id;
    }

    dropdownContent.className = 'dropdown-content';
    closeDropdown.className = 'close-dropdown';
    btnSongInfo.innerHTML = 'Song Info';
    btnPlayNext.innerHTML = 'Play Next';
    btnPlayLater.innerHTML = 'Play Later';

    // Dropdown menu is positioned top left, but if it overflows it flips to the other side
    if (btnClickEvent.clientX + 160 > innerWidth) {
        dropdownContent.style.right = `${-btnClickEvent.clientX + container.getBoundingClientRect().right}px`;
    } else {
        dropdownContent.style.left = `${btnClickEvent.clientX - container.getBoundingClientRect().left}px`
    }
    if (btnClickEvent.clientY + 150 > innerHeight) {
        dropdownContent.style.bottom = `${-btnClickEvent.clientY + container.getBoundingClientRect().bottom}px`
    } else {
        dropdownContent.style.top = `${btnClickEvent.clientY - container.getBoundingClientRect().top}px`
    }

    dropdownContent.appendChild(btnSongInfo);
    dropdownContent.appendChild(btnPlayNext);
    dropdownContent.appendChild(btnPlayLater);
    container.appendChild(dropdownContent);
    container.appendChild(closeDropdown);

    // For Playlist dropdown, there is one more option: Remove track from Playlist
    if (isPlaylist) {
        btnRemove.innerHTML = 'Remove';
        dropdownContent.appendChild(btnRemove);
    }

    btnSongInfo.onclick = function (event) {
        openTrackInfoModal(id);
        closeDropdown.click();
        event.stopPropagation();
    }
    btnPlayNext.onclick = function (event) {
        playNext(id);
        closeDropdown.click();
        event.stopPropagation();
    }
    btnPlayLater.onclick = function (event) {
        playLater(id);
        closeDropdown.click();
        event.stopPropagation();
    }
    if (isPlaylist) {
        btnRemove.onclick = function (event) {
            removeTrack(index);
            closeDropdown.click();
            event.stopPropagation();
        }
    }
    closeDropdown.onclick = function (event) {
        container.removeChild(dropdownContent);
        container.removeChild(closeDropdown);
        event.stopPropagation();
    }
}

function replaceArtwork() {
    this.src = "img/playback-info-placeholder.png";
}

function makeBlink(elem, duration) {
    elem.classList.add('blink');
    setTimeout(function () {
        elem.classList.remove('blink')
    }, duration);
}

function makeGlow(elem, duration) {
    elem.classList.add('glow');
    setTimeout(function () {
        elem.classList.remove('glow')
    }, duration);
}

// Parse mySongs and latestSongs JSON from sessionStorage to variables to allow searching
function createSongLibrary() {
    mySongs = JSON.parse(sessionStorage.getItem('mySongs'));
    latestSongs = JSON.parse(sessionStorage.getItem('latestSongs'));
    songLibrary = [];
    songLibrary = songLibrary.concat(latestSongs, mySongs);
    songLibrary = removeDuplicate(songLibrary);
}

// Return an array of unique value
function removeDuplicate(array) {
    let len = array.length;
    let uniqueId = [];
    let result = [];
    for (let i = 0; i < len; i++) {
        let id = array[i].id;
        if (!uniqueId.includes(id)) {
            uniqueId.push(id);
            result.push(array[i]);
        }
    }
    return result;
}

// Receive track ID as argument, return a track object from My Songs or Latest Songs
function searchId(id) {
    createSongLibrary();
    for (let i = 0; i < songLibrary.length; i++) {
        if (songLibrary[i].id === Number(id)) {
            return songLibrary[i];
        }
    }
}

// *** PLAYLIST
const openPlaylistBtn = document.querySelector('#open-playlist');
const playlistBar = document.querySelector('#playlist-bar');
openPlaylistBtn.onclick = openPlaylist;

function openPlaylist() {
    updatePlaylist();
    playlistBar.classList.toggle('show');
    openPlaylistBtn.classList.toggle('on');
    setTimeout(function () {
        let nowPlaying = document.querySelector('.playlist-item.current-track');
        if (nowPlaying) {
            nowPlaying.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
        }
    }, 200);
}

// Write the content of the Playlist sidebar
function updatePlaylist() {
    if (playlist.length) {
        let playlistContent = `<div class="playlist-name">Playlist</div>`;
        for (let i = 0; i < playlist.length; i++) {
            playlistContent += `<div class="playlist-item">
                    <div class="artwork-container">
                        <img class="artwork" src="${playlist[i].thumbnail}" alt="${playlist[i].name}">
                    </div>
                    <div class="detail">
                        <div class="track">${playlist[i].name}</div>
                        <div class="artist">${playlist[i].singer}</div>
                    </div>
                    <div class="dropdown playlist-dropdown">
                        <i class="fas fa-ellipsis-h drop-btn"></i>
                        </div>
                    </div>
                </div>`;
        }
        playlistContent += `<div class="clear-playlist">Clear</div>`
        playlistBar.innerHTML = playlistContent;
        updatePlaylistScript();
    } else {
        playlistBar.innerHTML = '<div class="playlist-empty-message">Uh oh, nothing yet. Start browsing songs now.</div>';
    }
}

function updatePlaylistScript() {
    let playlistItem = document.querySelectorAll('.playlist-item');
    let playlistArtwork = document.querySelectorAll('.playlist-item .artwork');
    let playlistDropBtn = document.querySelectorAll('.playlist-item .drop-btn');
    let playlistClearBtn = document.querySelector('.clear-playlist')

    playlistItem.forEach(function (item, index) {
        if (index === trackIndex) {
            // Show a different color for current track
            let previousPlay = document.querySelector('.playlist-item.current-track');
            if (previousPlay) {
                previousPlay.classList.remove('current-track');
            }
            item.classList.add('current-track');
            // Scroll into view of the current track
            item.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });
        }
        item.onclick = function () {
            // Show a different color for selected track
            let previousSelection = document.querySelector('.playlist-item.selected');
            if (previousSelection) {
                previousSelection.classList.remove('selected');
            }
            item.classList.add('selected');
        }
        item.ondblclick = function () {
            // Skip to track on double click
            trackIndex = index;
            loadTrack(trackIndex);
            playTrack();
        }
    })
    playlistArtwork.forEach(function (item) {
        item.onerror = replaceArtwork;
    })
    playlistDropBtn.forEach(function (item, index) {
        item.onclick = function (event) {
            // Open dropdown menu, passing drop-btn click event,
            // the drop-btn element, and index of the playlist item as arguments
            openDropdown(event, this, index);
        };
    })
    playlistClearBtn.onclick = clearPlaylist;
}

// *** ADD SONG
let addTrackBtn = document.querySelector('.add-track');
let addTrackModal = document.querySelector('#add-track-modal');
let addTrackBox = document.querySelector('#add-track-modal .modal-box');
let addTrackForm = document.forms['add-track-form'];
let addTrackRequired = addTrackForm.querySelectorAll('[required]');
let addTrackArtwork = addTrackForm['thumbnail'];
let addTrackLink = addTrackForm['link'];
let addTrackSubmit = addTrackForm['submit'];
let addTrackMessage = addTrackForm.querySelector('.message');
let isValidAddTrack;

addTrackBtn.onclick = function () {
    closeNav();
    showModal('#add-track-modal');
}
addTrackSubmit.onclick = submitAddTrackForm;

// Returns Boolean
function validateAddTrackForm() {
    isValidAddTrack = true;
    for (let i = 0; i < addTrackRequired.length; i++) {
        if (addTrackRequired[i].value.length) {
            addTrackRequired[i].className = '';
        } else {
            isValidAddTrack = false;
            addTrackRequired[i].className = 'error';
            addTrackMessage.innerHTML += `<br>${addTrackRequired[i].placeholder} is required.`;
        }
    }
    if (!addTrackLink.value.includes('.mp3')) {
        addTrackLink.className = 'error';
        isValidAddTrack = false;
        addTrackMessage.innerHTML += '<br>Song Link must contain \'.mp3\' string. Please check and try again.';
    }
    return isValidAddTrack;
}

function submitAddTrackForm() {
    addTrackMessage.innerHTML = '';
    if (validateAddTrackForm()) {
        testImage(addTrackArtwork.value, function (url, result) {
            if (result === 'success') {
                addTrackArtwork.className = '';
                addTrackMessage.innerHTML = '';
                testAudio(addTrackLink.value, function (url, result) {
                    if (result === 'success') {
                        addTrackLink.className = '';
                        addTrackMessage.innerHTML = '';
                        sendAddTrackForm();
                    } else if (result === 'error') {
                        addTrackLink.className = 'error';
                        addTrackMessage.innerHTML = '<br>Song URL does not point to an audio. Please check and try again.<br>';
                        addTrackBox.scrollTop = 0;
                        removeErrorOnKeyUp();
                    } else {
                        addTrackLink.className = 'error';
                        addTrackMessage.innerHTML = '<br>Song URL is not reachable. Please check and try again.<br>';
                        addTrackBox.scrollTop = 0;
                        removeErrorOnKeyUp();
                    }
                });
                return false;
            } else if (result === 'error') {
                addTrackArtwork.className = 'error';
                addTrackMessage.innerHTML = '<br>Artwork URL does not point to an image. Please check and try again.<br>';
                addTrackBox.scrollTop = 0;
                removeErrorOnKeyUp();
            } else {
                addTrackArtwork.className = 'error';
                addTrackMessage.innerHTML = '<br>Avatar URL is not reachable. Please check and try again.<br>';
                addTrackBox.scrollTop = 0;
                removeErrorOnKeyUp();
            }
        });
        return false;
    } else {
        addTrackMessage.innerHTML += '<br>&nbsp;';
        removeErrorOnKeyUp();
        addTrackBox.scrollTop = 0;
    }
}

function testAudio(url, callback, timeout) {
    timeout = timeout || 5000;
    let timedOut = false, timer;
    let audio = new Audio();
    audio.onerror = function () {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "error");
        }
    };
    audio.oncanplaythrough = function () {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "success");
        }
    };
    audio.src = url;
    timer = setTimeout(function () {
        timedOut = true;
        callback(url, "timeout");
    }, timeout);
}

function removeErrorOnKeyUp() {
    let errors = document.querySelectorAll('.error');
    for (let j = 0; j < errors.length; j++) {
        errors[j].onkeyup = function () {
            this.classList.remove("error");
        }
    }
}

// Stringify form data and return JSON
function stringifyAddTrackForm() {
    let formData = new FormData(addTrackForm);
    if (formData.get('description') === '') {
        formData.delete('description');
    }
    return JSON.stringify(Object.fromEntries(formData));
}

function sendAddTrackForm() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            loading.style.display = 'none';
            addTrackMessage.innerHTML = '<br><div style="color:var(--text-primary)">Song added successfully!</div><br>';
            setTimeout(function () {
                addTrackForm.reset();
                addTrackMessage.innerHTML = '';
                addTrackModal.style.display = 'none';
                getMySongs();
            }, 1000);
        } else if (this.readyState === 4) {
            loading.style.display = 'none';
            let response = JSON.parse(this.responseText).error;
            let errorMessage = '<br>', x;
            for (x in response) {
                errorMessage += response[x] + '<br>';
            }
            addTrackMessage.innerHTML = errorMessage;
            addTrackBox.scrollTop = 0;
        } else {
            loading.style.display = 'block';
        }
    }
    xhttp.open('POST', `https://2-dot-backup-server-002.appspot.com/_api/v2/songs`, true);
    xhttp.setRequestHeader('Authorization', token);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(stringifyAddTrackForm());
}

// *** TRACK INFO MODAL
let currModalTrack;
let modalPlayPause = document.querySelector('#track-info-modal .play-pause-track');
let modalPlayNext = document.querySelector('#track-info-modal .play-next');
let modalPlayLater = document.querySelector('#track-info-modal .play-later');
let modalArtwork = document.querySelector('#track-info-modal .artwork');
let lyricsContainer = document.querySelector('#track-info-modal .lyrics');
let lyricsCopyright = document.querySelector('#track-info-modal .lyrics.copyright')

modalPlayPause.onclick = function () {
    playPauseOneTrack(currModalTrack.id);
}
modalPlayNext.onclick = function () {
    playNext(currModalTrack.id);
}
modalPlayLater.onclick = function () {
    playLater(currModalTrack.id);
}

function openTrackInfoModal(id) {
    currModalTrack = searchId(id);
    if (isPlaying === true && currModalTrack.id === playlist[trackIndex].id) {
        modalPlayPause.innerHTML = '<i class="fas fa-pause"></i><span class="button-desc">Pause</span>';
    } else {
        modalPlayPause.innerHTML = '<i class="fas fa-play"></i><span class="button-desc">Play</span>';
    }
    modalArtwork.src = currModalTrack.thumbnail;
    modalArtwork.onerror = replaceArtwork;
    document.querySelector('#track-info-modal .track').textContent = currModalTrack.name;
    document.querySelector('#track-info-modal .artist').textContent = currModalTrack.singer;
    document.querySelector('#track-info-modal .description').textContent = currModalTrack.description;
    document.querySelector('#track-info-modal .composer').textContent = currModalTrack.author;
    lyricsContainer.innerHTML = '(Loading...)';
    printLyrics(currModalTrack.name, currModalTrack.singer);
    showModal('#track-info-modal');
}

function printLyrics(track, artist) {
    let matchTrackScript = document.createElement('script');
    matchTrackScript.type = 'text/javascript';
    matchTrackScript.src = `https://api.musixmatch.com/ws/1.1/matcher.track.get?format=jsonp&callback=callbackMatchTrack&q_artist=${artist}&q_track=${track}&apikey=7a3ee7f398655e3ad5e37b4f23436dce`;
    document.getElementsByTagName("head")[0].appendChild(matchTrackScript);
}

function callbackMatchTrack(response) {
    if (response.message.header.status_code === 200 && response.message.body.track.has_lyrics === 1) {
        let trackId = response.message.body.track.track_id;
        let getLyricsScript = document.createElement('script');
        getLyricsScript.type = 'text/javascript';
        getLyricsScript.src = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callbackGetLyrics&track_id=${trackId}&apikey=7a3ee7f398655e3ad5e37b4f23436dce`;
        document.getElementsByTagName("head")[0].appendChild(getLyricsScript);
    } else lyricsContainer.innerHTML = 'Lyrics not available';
}

function callbackGetLyrics(response) {
    lyricsContainer.innerHTML = response.message.body.lyrics.lyrics_body;
    lyricsCopyright.innerHTML = response.message.body.lyrics.lyrics_copyright;
}

// Select all the elements in the HTML page
// and assign them to a variable
let playbackInfo = document.querySelector("#playback-info");
let playbackOpenModal = document.querySelectorAll("#playback-info .open-modal");
let playbackControls = document.querySelector("#playback-controls");
let nowArtwork = document.querySelector("#playback-info .artwork");
let nowTrack = document.querySelector("#playback-info .track");
let nowArtist = document.querySelector("#playback-info .artist");
let playPauseBtn = document.querySelector(".play-pause-track");
let setShuffleBtn = document.querySelector("header .set-shuffle");
let setRepeatBtn = document.querySelector("header .set-repeat");
let seekSlider = document.querySelector(".seek-slider");
let volumeSlider = document.querySelector(".volume-slider");
let currTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");
// Create the audio element for the player
let currTrack = document.createElement('audio');
// Specify globally used values
let updateTimer;
let trackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = 'none';
let playlist = [];
let playlistOgOrder = [];
// Get value from storage if available
if (localStorage.getItem('trackIndex')) {
    trackIndex = Number(localStorage.getItem('trackIndex'));
}
if (localStorage.getItem('isShuffle')) {
    isShuffle = localStorage.getItem('isShuffle') === 'true';
    if (isShuffle) {
        setShuffleBtn.classList.add('shuffle-on');
    }
}
if (localStorage.getItem('isRepeat')) {
    isRepeat = localStorage.getItem('isRepeat');
    if (isRepeat === 'all') {
        setRepeatBtn.classList.add('repeat-all');
    } else if (isRepeat === 'one') {
        setRepeatBtn.classList.add('repeat-one');
    }
}
if (localStorage.getItem('playlist')) {
    playlist = JSON.parse(localStorage.getItem('playlist'));
    if (playlist.length > 0) {
        loadTrack(trackIndex);
        updatePlaylist();
    }
    if (localStorage.getItem('playlistOgOrder')) {
        playlistOgOrder = JSON.parse(localStorage.getItem('playlistOgOrder'));
    }
}
// On exit, save user preferences to local storage if stay logged in
window.onbeforeunload = savePreferences;

function savePreferences() {
    if (localStorage.getItem('token')) {
        if (playlist.length > 0 || localStorage.getItem('playlist')) {
            localStorage.setItem('playlist', JSON.stringify(playlist));
            localStorage.setItem('trackIndex', trackIndex);
            if (isShuffle) {
                localStorage.setItem('playlistOgOrder', JSON.stringify(playlistOgOrder));
            }
        }
        localStorage.setItem('isShuffle', isShuffle);
        localStorage.setItem('isRepeat', isRepeat);
    }
}

// Open track info modal of loaded track
for (let i = 0; i < playbackOpenModal.length; i++) {
    playbackOpenModal[i].onclick = function () {
        if (window.getComputedStyle(playbackInfo).visibility === 'visible') {
            openTrackInfoModal(playlist[trackIndex].id);
        }
    }
}

function loadTrack(trackIndex) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();

    // Load a new track
    currTrack.src = playlist[trackIndex].link;
    currTrack.load();
    currTrack.onerror = function () {
        alert(`Sorry. The song ${playlist[trackIndex].name} by ${playlist[trackIndex].singer} is currently unavailable and cannot be played.`);
        removeTrack(trackIndex);
    }

    // Update details of the track
    nowArtwork.src = playlist[trackIndex].thumbnail;
    nowArtwork.onerror = replaceArtwork;
    nowArtwork.alt = playlist[trackIndex].name;
    nowTrack.textContent = playlist[trackIndex].name;
    nowArtist.textContent = playlist[trackIndex].singer;
    updatePlaylist();

    // Un-hide the playback controls and now-playing info upon the first time loading a track
    playbackInfo.style.visibility = 'visible';
    playbackControls.style.visibility = 'visible';

    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // Move to the next track if the current finishes playing
    // using the 'ended' event
    currTrack.addEventListener("ended", nextTrack);
}

// Function to reset all values to their default
function resetValues() {
    currTime.textContent = "0:00";
    totalDuration.textContent = "0:00";
    seekSlider.value = 0;
}

function playPauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    // Replace icon with the pause icon
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    setPlayPauseIcon(playlist[trackIndex].id);

    // Replace icon on modal with pause icon if track shown is playing
    if (currModalTrack && playlist[trackIndex]) {
        if (currModalTrack.id === playlist[trackIndex].id) {
            modalPlayPause.innerHTML = '<i class="fas fa-pause"></i><span class="button-desc">Pause</span>';
        }
    }

    // Un-hide the playback info section on header
    playbackInfo.style.visibility = 'visible';
    playbackControls.style.visibility = 'visible';

    // Update playlist
    updatePlaylist();

    // Play the loaded track
    currTrack.play();
    isPlaying = true;
}

function pauseTrack() {
    // Pause the loaded track
    currTrack.pause();
    isPlaying = false;

    // Replace icon with the play icon
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    setPlayPauseIcon(playlist[trackIndex].id);

    // Replace icon on modal with play icon if track shown is playing
    if (currModalTrack && playlist[trackIndex]) {
        if (currModalTrack.id === playlist[trackIndex].id) {
            modalPlayPause.innerHTML = '<i class="fas fa-play"></i><span class="button-desc">Play</span>';
        }
    }
}

function setRepeat() {
    let text = document.querySelector('.repeat-text-value');
    if (isRepeat === 'none') {
        isRepeat = 'all';
        setRepeatBtn.className = 'set-repeat repeat-all';
        text.innerHTML = 'All';
    } else if (isRepeat === 'all') {
        isRepeat = 'one';
        setRepeatBtn.className = 'set-repeat repeat-one';
        text.innerHTML = 'One';
    } else {
        isRepeat = 'none';
        setRepeatBtn.className = 'set-repeat';
        text.innerHTML = 'None';
    }
}

function nextTrack() {
    // In Repeat One mode, load and play the same track;
    // In Repeat All mode, start playing from the first track after finishing the last one;
    // In No Repeat mode, load the last track again but do not play.
    if (isRepeat === 'one' && playlist.length !== 0) {
        loadTrack(trackIndex);
        if (isPlaying) playTrack();
    } else if (trackIndex < playlist.length - 1) {
        trackIndex++;
        loadTrack(trackIndex);
        if (isPlaying) playTrack();
    } else if (isRepeat === 'all' && playlist.length !== 0) {
        trackIndex = 0;
        loadTrack(trackIndex);
        if (isPlaying) playTrack();
    } else {
        loadTrack(trackIndex);
        pauseTrack();
        playbackInfo.style.visibility = 'hidden';
        if (mobile.matches) {
            playbackControls.style.visibility = 'hidden';
        }
    }
}

function prevTrack() {
    // In Repeat One mode, load and play the same track;
    // In Repeat All mode, start playing from the last track when skipping the first one;
    // In No Repeat mode, load the first track again but do not play.
    if (isRepeat === 'one') {
        loadTrack(trackIndex);
        if (isPlaying) playTrack();
    } else if (trackIndex > 0) {
        trackIndex--;
        loadTrack(trackIndex);
        if (isPlaying) playTrack();
    } else if (isRepeat === 'all') {
        trackIndex = playlist.length - 1;
        loadTrack(trackIndex);
        if (isPlaying) playTrack();
    } else {
        loadTrack(trackIndex);
        pauseTrack();
        playbackInfo.style.visibility = 'hidden';
        if (mobile.matches) {
            playbackControls.style.visibility = 'hidden';
        }
    }
}

// If chosen track isn't already playing, reset playlist and play only that one track
// Otherwise, act like normal Play/Pause button
function playPauseOneTrack(id) {
    let item = searchId(id);
    if (JSON.stringify(playlist[trackIndex]) !== JSON.stringify(item)) {
        resetPlaylist();
        playlist[0] = item;
        trackIndex = 0;
        loadTrack(trackIndex);
        playTrack();
    } else {
        playPauseTrack();
    }
    updatePlaylist();
}

function resetPlaylist() {
    playlist = [];
    playlistOgOrder = [];
}

// Select .gallery-item element that has the same ID as the current track
// If the item's icon is Pause, switch to Play
// If the item's icon is Play, switch to Pause after searching for another one that has Pause and changing it
function setPlayPauseIcon(id) {
    let playPauseIcon = document.querySelector(`[id="${id}"] .play-pause`);
    if (playPauseIcon) {
        if (playPauseIcon.classList.contains('fa-pause')) {
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
        } else {
            let currPlayingIcon = document.querySelector('.gallery-item .fa-pause');
            if (currPlayingIcon) {
                currPlayingIcon.classList.remove('fa-pause');
                currPlayingIcon.classList.add('fa-play');
            }
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
        }
    }
}

// Play this track right after the current one finishes
function playNext(id) {
    let item = searchId(id);
    testAudio(item.link, function (url, result) {
        if (result === 'success') {
            playlist.splice(trackIndex + 1, 0, item);
            // Load the track if the player stopped playing, or never played
            if (window.getComputedStyle(playbackInfo).visibility === 'hidden') {
                if (playlist.length > 1) {
                    trackIndex++;
                }
                loadTrack(trackIndex);
            }
            updatePlaylist();
            makeBlink(openPlaylistBtn, 1000);
        } else {
            alert(`Sorry. The song ${item.name} by ${item.singer} is currently unavailable and cannot be added.`);
        }
    })
}

// Add selected track to the last position of the playlist
function playLater(id) {
    let item = searchId(id);
    testAudio(item.link, function (url, result) {
        if (result === 'success') {
            playlist.push(item);
            if (window.getComputedStyle(playbackInfo).visibility === 'hidden') {
                if (playlist.length > 1) {
                    trackIndex++;
                }
                loadTrack(trackIndex);
            }
            updatePlaylist();
            makeBlink(openPlaylistBtn, 1000);
        } else {
            alert(`Sorry. The song ${item.name} by ${item.singer} is currently unavailable and cannot be added.`);
        }
    })
}

function removeTrack(index) {
    if (index > trackIndex) {
        playlist.splice(index, 1);
    } else if (index === trackIndex) {
        pauseTrack();
        if (playlist.length === 1) {
            resetPlaylist();
            playbackInfo.style.visibility = 'hidden';
            playbackControls.style.visibility = 'hidden';
        } else if (trackIndex === playlist.length - 1) {
            playlist.splice(index, 1);
            trackIndex--;
            nextTrack();
        } else {
            playlist.splice(index, 1);
            loadTrack(trackIndex);
        }
    } else {
        playlist.splice(index, 1);
        trackIndex--;
    }
}

function clearPlaylist() {
    let choice = confirm('Are you sure you want to clear all songs from this Playlist? This cannot be undone.');
    if (choice) {
        pauseTrack();
        setPlayPauseIcon();
        resetPlaylist();
        trackIndex = 0;
        playbackControls.style.visibility = 'hidden';
        playbackInfo.style.visibility = 'hidden';
        updatePlaylist();
    }
}

// When turn Shuffle on, keep the original order of tracks on a back-up playlist to use when Shuffle turned off
// Shuffled playlist always starts with the current track
function setShuffle() {
    setShuffleBtn.classList.toggle('shuffle-on');
    let text = document.querySelector('.shuffle-text-value');
    if (text.innerHTML === 'On') {
        text.innerHTML = 'Off';
    } else {
        text.innerHTML = 'On';
    }
    if (playlist.length > 2) {
        if (isShuffle === false) {
            isShuffle = true;
            for (let i = 0; i < playlist.length; i++) {
                playlistOgOrder[i] = playlist[i];
            }
            let currTrack = playlist[trackIndex];
            playlist.splice(trackIndex, 1);
            playlist = shuffle(playlist);
            playlist.unshift(currTrack);
            trackIndex = 0;
        } else {
            isShuffle = false;
            let currId = playlist[trackIndex].id;
            for (let i = 0; i < playlistOgOrder.length; i++) {
                playlist[i] = playlistOgOrder[i];
                if (playlist[i].id === currId) {
                    trackIndex = i;
                }
            }
        }
    }
    updatePlaylist();
}

function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    // Set the current track position to the calculated seek position
    currTrack.currentTime = currTrack.duration * (seekSlider.value / 100);
}

function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    currTrack.volume = volumeSlider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(currTrack.duration)) {
        seekPosition = currTrack.currentTime * (100 / currTrack.duration);
        seekSlider.value = seekPosition;
        setSliderColor(seekSlider);

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(currTrack.currentTime / 60);
        let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currTrack.duration / 60);
        let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

        // Add a zero to the single digit time values
        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }

        // Display the updated duration
        currTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function setSliderColor(slider) {
    slider.style.background = `linear-gradient(to right, var(--text-primary) 0%, var(--text-primary) ${slider.value}%, var(--text-secondary) ${slider.value}%, var(--text-secondary) 100%)`;
}

// *** SEARCH SONG
let searchInput = document.forms['search-form']['search'];
if (mobile.matches) {
    searchInput.onkeydown = function () {
        if (event.keyCode === 13) {
            searchByKeyword(searchInput.value);
            getLatestSongsBtn.classList.remove('active');
            getMySongsBtn.classList.remove('active');
            document.activeElement.blur();
            closeNav();
            event.preventDefault();
        }
    }
} else {
    searchInput.onkeyup = function () {
        searchByKeyword(searchInput.value);
        getLatestSongsBtn.classList.remove('active');
        getMySongsBtn.classList.remove('active');
    }
    searchInput.onkeydown = function () {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }
}

function searchByKeyword(keyword) {
    createSongLibrary();
    let filter = splitString(keyword.toUpperCase());
    let isMatched;
    let searchResults = [];
    songLibrary.forEach(function (item) {
        let textValue = item.name.toUpperCase();
        textValue = textValue.concat(' ', item.singer.toUpperCase());
        isMatched = true;
        let len = filter.length;
        for (let i = 0; i < len; i++) {
            if (!textValue.includes(filter[i])) {
                isMatched = false;
            }
        }
        if (isMatched) {
            searchResults.push(item);
        }
    });
    galleryTitle.innerHTML = `Search results for "${keyword}"`;
    printGallery(searchResults);
}

// Split string by space, return an array
function splitString(str) {
    return str.trim().split(' ');
}

// OPEN AND HIDE MENU ON MOBILE SITE

function openNav() {
    if (mobile.matches) {
        document.querySelector('#menu-icon').className = 'change';
        document.querySelector('nav').style.width = '250px';
        setTimeout(function () {
            document.querySelector('nav .wrapper').style.opacity = '1';
        }, 500);
        setTimeout(function () {
            document.querySelector('#fill').style.zIndex = '10';
        }, 500)
        document.querySelector('.outer-wrapper').style.transform = 'translateX(250px)';
        document.querySelector('.outer-wrapper').style.transition = 'transform 0.5s ease';
    }
}

function closeNav() {
    if (mobile.matches) {
        document.querySelector('#menu-icon').classList.remove('change');
        document.querySelector('nav').style.width = '0';
        document.querySelector('nav .wrapper').style.opacity = '0';
        document.querySelector('#fill').style.zIndex = '-5';
        document.querySelector('.outer-wrapper').style.removeProperty('transform');
    }
}

// SET THEME
const setThemeBtn = document.querySelector('.set-theme');
const setThemeValue = document.querySelector('.set-theme-value');
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
// Get user preference from local storage if available
if (prefersDarkScheme.matches) {
    setThemeValue.innerHTML = 'Dark';
}
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
    document.body.classList.toggle("dark-theme");
    setThemeValue.innerHTML = 'Dark';
} else if (currentTheme === "light") {
    document.body.classList.toggle("light-theme");
    setThemeValue.innerHTML = 'Light';
}

setThemeBtn.addEventListener("click", function () {
    let theme;
    if (prefersDarkScheme.matches) {
        document.body.classList.toggle("light-theme");
        theme = document.body.classList.contains("light-theme") ? "light" : "dark";
    } else {
        document.body.classList.toggle("dark-theme");
        theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    }
    (setThemeValue.innerHTML === 'Light') ? (setThemeValue.innerHTML = 'Dark') : (setThemeValue.innerHTML = 'Light');
    localStorage.setItem("theme", theme);
});

checkLogInState();
if (token) {
    getUserInfo();
}