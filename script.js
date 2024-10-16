// Login validation function
document.getElementById('loginButton').addEventListener('click', function() {
    const userID = document.getElementById('userID').value;
    const password = document.getElementById('password').value;

    // Hardcoded ID and Password for demonstration (you can change this)
    const validID = 'authentication';
    const validPassword = 'Neeraj$rai*1';

    // Check if the credentials match
    if (userID === validID && password === validPassword) {
        // Hide the login form and show the Aadhaar form and other content
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    } else {
        alert('Invalid ID or Password');
    }
});

// Function to translate English to Hindi using the MyMemory API
async function translateText(text, sourceLang, targetLang) {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${sourceLang}|${targetLang}&de=parshottamahirwal2002@gmail.com`);
    const data = await response.json();
    return data.responseData.translatedText;
}

// Event listener for name, address, and father name in English
document.getElementById('nameEnglishInput').addEventListener('input', async function() {
    const englishName = this.value;
    const hindiName = await translateText(englishName, 'en', 'hi');
    document.getElementById('nameHindiInput').value = hindiName;
});

document.getElementById('addressEnglishInput').addEventListener('input', async function() {
    const englishAddress = this.value;
    const hindiAddress = await translateText(englishAddress, 'en', 'hi');
    document.getElementById('addressHindiInput').value = hindiAddress;
});

document.getElementById('fname').addEventListener('input', async function() {
    const englishFatherName = this.value;
    const hindiFatherName = await translateText(englishFatherName, 'en', 'hi');
    document.getElementById('fnamehindi').value = hindiFatherName;
});

// Aadhaar Form Submission Logic
document.getElementById('aadharForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const nameEnglish = document.getElementById('nameEnglishInput').value;
    const nameHindi = document.getElementById('nameHindiInput').value;
    const dob = document.getElementById('dobInput').value;
    const gender = document.getElementById('genderInput').value;
    const careof = document.getElementById('care').value;
    const addressEnglish = document.getElementById('addressEnglishInput').value;
    const addressHindi = document.getElementById('addressHindiInput').value;
    const aadharNumFront = document.getElementById('AadharNum').value.replace(/\s+/g, ''); // Remove spaces for processing
    const fathernameE = document.getElementById('fname').value;
    const fathernameH = document.getElementById('fnamehindi').value;

    // Convert the date to DD/MM/YYYY format
    const dateParts = dob.split('-'); // Split the date into [YYYY, MM, DD]
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // Reformat to DD/MM/YYYY

    // Determine S/O or D/O based on gender
    const genderHindi = gender === 'MALE' ? 'पुरुष' : 'महिला'; // Hindi translation
    const genderUppercase = gender.toUpperCase(); // English uppercase

    // Update card elements
    document.getElementById('name-english').innerText = nameEnglish;
    document.getElementById('name-hindi').innerText = nameHindi;
    document.getElementById('dob').innerText = `जन्म तिथि/DOB: ${formattedDate}`; // Using formatted date
    document.getElementById('gender').innerText = `${genderHindi}/${genderUppercase}`;

    // Update address with the relation prefix
    document.getElementById('address-hindi').innerHTML = ` <b>पता:</b><br>${careof}: ${fathernameH}, ${addressHindi}`;
    document.getElementById('address-english').innerHTML = `<b>Address:</b><br>${careof}: ${fathernameE}, ${addressEnglish}`;

    // Format Aadhaar numbers
    document.getElementById('A').innerText = formatAadhaarNumber(aadharNumFront);
    document.getElementById('B').innerText = formatAadhaarNumber(aadharNumFront);

    // Handle image upload and display
    // Handle image upload and display
// Handle image upload and display
const fileInput = document.getElementById('imageInput');
const userPhoto = document.getElementById('user-photo');

// Check if a file is selected
if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    // When the file is loaded, set the image source
    reader.onload = function(e) {
        userPhoto.src = e.target.result;
        userPhoto.style.display = 'block'; // Make sure the image is displayed
    };

    // Read the image file
    reader.readAsDataURL(fileInput.files[0]);
}


    alert("YOUR AADHAR IS CREATED");
});

// Function to format Aadhaar number
function formatAadhaarNumber(num) {
    return num.replace(/(\d{4})(?=\d)/g, '$1 '); // Add space after every 4 digits
}

// Event listener for Aadhaar number input fields
document.getElementById('AadharNum').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 '); // Only allow digits and format
});

document.getElementById('AadharBack').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 '); // Only allow digits and format
});
