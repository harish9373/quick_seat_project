let selectedSeats = [];
const ticketPrice = 700;
let paymentMethod = "";


// LOGIN FUNCTION

function showSignup() {
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('signupContainer').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('signupContainer').classList.add('hidden');
    document.getElementById('loginContainer').classList.remove('hidden');
}


function showSlideshow() {
    document.getElementById('slideshowContainer').classList.remove('hidden');
}

// Function to hide the slideshow
function hideSlideshow() {
    document.getElementById('slideshowContainer').classList.add('hidden');
}


function signup() {
    let username = document.getElementById("signupUsername").value;
    let password = document.getElementById("signupPassword").value;
    if (username && password) {
        let users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[username]) {
            alert("Username already exists! Try another.");
            return;
        }
        users[username] = password;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Sign Up Successful! Please log in.");
        showLogin();
    } else {
        alert("Please enter valid details.");
    }
}

function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username] === password) {
        alert("Login Successful!");
        document.getElementById("authSection").classList.add("hidden");
        document.getElementById("bookingSection").classList.remove("hidden");
        showSlideshow();
        generateSeats();
    } else {
        alert("Invalid Username or Password!");
    }
}
// GENRETES SEATS

function generateSeats() {
    const seatContainer = document.getElementById('seatContainer');
    seatContainer.innerHTML = ""; 
    for (let i = 1; i <= 40; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = i;
        seat.onclick = () => toggleSeatSelection(seat, i);
        seatContainer.appendChild(seat);
    }
}
// TOGGLE SEAT SELECTION
function toggleSeatSelection(seat, seatNumber) {
    if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        selectedSeats = selectedSeats.filter(s => s !== seatNumber);
    } else {
        if (selectedSeats.length < 5) {
            seat.classList.add('selected');
            selectedSeats.push(seatNumber);
        } else {
            alert('You can select up to 5 seats.');
        }
    }
    document.getElementById('selectedSeatsCount').textContent = selectedSeats.length;
}


// CONFIRM BOOKING
function confirmBooking() {
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat.');
        return;
    }


    hideSlideshow();
    document.getElementById('bookingSection').classList.add('hidden');
    document.getElementById('paymentSection').classList.remove('hidden');
}

// SELECT PAYMENT METHOD
function selectPayment(type) {
    paymentMethod = type;
    document.getElementById('paymentSection').classList.add('hidden');
    if (type === 'Card') {
        document.getElementById('cardDetails').classList.remove('hidden');
    } else {
        showTicketSummary();
    }
}

// SEND OTP
function sendOTP() {
    document.getElementById('cardDetails').classList.add('hidden');
    document.getElementById('otpSection').classList.remove('hidden');
}

// VERIFY OTP
function verifyOTP() {
    document.getElementById('otpSection').classList.add('hidden');
    showTicketSummary();
}

// SHOW TICKET SUMMARY
function showTicketSummary() {
    const pickup = document.getElementById('pickupPoint').value;
    const drop = document.getElementById('dropPoint').value;
    const busNumber = document.getElementById('busNumber').value;
    const totalAmount = selectedSeats.length * ticketPrice;

    document.getElementById('summaryText').innerHTML = `
        <p>Pickup Point: ${pickup}</p>
        <p>Drop Point: ${drop}</p>
        <p>Bus Number: ${busNumber}</p>
        <p>Seats Booked: ${selectedSeats.join(', ')}</p>
        <p>Total Price: ₹${totalAmount}</p>
    `;

    document.getElementById('ticketSummary').classList.remove('hidden');
}

function saveTicket() {
    alert('Ticket saved successfully!');
}

function printTicket() {
    window.print();
}