// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDnXlQu2Q1Tr1mqYZHEQs9csUKK7-QLMpQ",
  authDomain: "joblinkmalawi-7aa99841.firebaseapp.com",
  databaseURL: "https://joblinkmalawi-7aa99841-default-rtdb.firebaseio.com",
  projectId: "joblinkmalawi-7aa99841",
  storageBucket: "joblinkmalawi-7aa99841.firebasestorage.app",
  messagingSenderId: "1020741137255",
  appId: "1:1020741137255:web:a0354c16f268f07dd575c2"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const form = document.getElementById('vacancyForm');
const statusMessage = document.getElementById('status');

// Upload job to Firebase
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form values
    const title = document.getElementById('jobTitle').value.trim();
    const company = document.getElementById('companyName').value.trim();
    const location = document.getElementById('jobLocation').value.trim();
    const logoUrl = document.getElementById('companyLogoUrl').value.trim();
    const description = document.getElementById('jobDescription').value.trim();
    const salary = document.getElementById('salaryRange').value.trim();
    const type = document.getElementById('jobType').value;
    const due = document.getElementById('dueDate').value.trim();
    const application = document.getElementById('applicationMethod').value.trim();

    // Validation
    if (!title || !company || !location || !logoUrl || !description || !salary || !type || !due || !application) {
        statusMessage.textContent = "All fields are required.";
        return;
    }

    if (!logoUrl.startsWith("http://") && !logoUrl.startsWith("https://")) {
        statusMessage.textContent = "Enter a valid URL for the company logo.";
        return;
    }

    if (description.length < 20) {
        statusMessage.textContent = "Job description must be at least 20 characters long.";
        return;
    }

    const salaryRegex = /^\$?\d+(,\d{3})*(\.\d{1,2})?-\$?\d+(,\d{3})*(\.\d{1,2})?$/;
    if (!salaryRegex.test(salary)) {
        statusMessage.textContent = "Enter a valid salary range (e.g., $50,000-$60,000).";
        return;
    }

    const dueRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dueRegex.test(due)) {
        statusMessage.textContent = "Enter a valid due date (YYYY-MM-DD).";
        return;
    }

    if (application.length < 10 || !application.toLowerCase().includes("apply")) {
        statusMessage.textContent = "Provide valid application instructions (e.g., 'Apply online at example.com').";
        return;
    }

    // Prepare data
    const jobId = database.ref('jobs').push().key;
    const jobData = {
        jobId,
        jobTitle: title,
        companyName: company,
        jobLocation: location,
        companyLogoUrl: logoUrl,
        jobDescription: description,
        salaryRange: salary,
        jobType: type,
        dueDate: due,
        applicationMethod: application
    };

    // Upload to Firebase
    database.ref(`jobs/${jobId}`).set(jobData)
        .then(() => {
            statusMessage.textContent = "Job uploaded successfully!";
            form.reset();
        })
        .catch((error) => {
            statusMessage.textContent = `Error: ${error.message}`;
        });
});
