// ============================================================
// BOOK MY STAY - STAYBOT
// Complete upgraded version
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================================
    // ROOM DATA
    // CHANGE THESE DETAILS TO MATCH YOUR ACTUAL ROOMS
    // ========================================================

    const rooms = [
        {
            name: "Standard Room",
            price: 2500,
            description: "Comfortable room for 1-2 guests.",
            link: "rooms.html"
        },
        {
            name: "Deluxe Room",
            price: 4000,
            description: "Spacious room with premium facilities.",
            link: "rooms.html"
        },
        {
            name: "Luxury Suite",
            price: 6000,
            description: "Premium suite with extra space and luxury amenities.",
            link: "rooms.html"
        }
    ];

    // ========================================================
    // FIND STAYBOT CONTAINER
    // ========================================================

    const container = document.getElementById("staybot-container");

    if (!container) {
        console.error("StayBot container not found.");
        return;
    }

    // ========================================================
    // CREATE STAYBOT
    // ========================================================

    container.innerHTML = `

        <!-- Floating Button -->
        <button id="staybot-toggle" aria-label="Open StayBot">
            💬
        </button>

        <!-- Chat Window -->
        <div id="staybot-window">

            <!-- HEADER -->
            <div class="staybot-header">

                <div>
                    <div class="staybot-title">
                        ✨ StayBot
                    </div>

                    <div class="staybot-status">
                        <span class="status-dot"></span>
                        Online
                    </div>
                </div>

                <button id="staybot-close">
                    ×
                </button>

            </div>

            <!-- MESSAGES -->
            <div id="staybot-messages"></div>

            <!-- QUICK QUESTIONS -->
            <div class="staybot-quick-actions">

                <button data-question="What rooms are available?">
                    🏨 Rooms
                </button>

                <button data-question="What is the price of the rooms?">
                    💰 Prices
                </button>

                <button data-question="How can I book a room?">
                    📅 Book
                </button>

                <button data-question="What facilities do you have?">
                    ⭐ Facilities
                </button>

            </div>

            <!-- INPUT -->
            <div class="staybot-input-area">

                <input
                    type="text"
                    id="staybot-input"
                    placeholder="Ask me something..."
                    autocomplete="off"
                >

                <button id="staybot-send">
                    ➤
                </button>

            </div>

        </div>
    `;

    // ========================================================
    // STAYBOT CSS
    // ========================================================

    const style = document.createElement("style");

    style.innerHTML = `

        /* ====================================================
           CONTAINER
        ==================================================== */

        #staybot-container {
            position: fixed;
            right: 25px;
            bottom: 25px;
            z-index: 999999;
            font-family: Arial, Helvetica, sans-serif;
        }


        /* ====================================================
           FLOATING BUTTON
        ==================================================== */

        #staybot-toggle {

            width: 65px;
            height: 65px;

            border: none;
            border-radius: 50%;

            background:
                linear-gradient(
                    135deg,
                    #ff3d68,
                    #7b35ff
                );

            color: white;

            font-size: 28px;

            cursor: pointer;

            box-shadow:
                0 8px 25px rgba(0,0,0,0.35);

            transition: 0.25s;
        }

        #staybot-toggle:hover {
            transform: scale(1.08);
        }


        /* ====================================================
           CHAT WINDOW
        ==================================================== */

        #staybot-window {

            position: absolute;

            right: 0;
            bottom: 80px;

            width: 390px;
            height: 570px;

            max-width: calc(100vw - 30px);

            display: none;

            flex-direction: column;

            overflow: hidden;

            border-radius: 24px;

            background:
                linear-gradient(
                    180deg,
                    #160d22,
                    #35075a
                );

            box-shadow:
                0 20px 60px rgba(0,0,0,0.5);

            border:
                1px solid rgba(255,255,255,0.15);
        }

        #staybot-window.active {
            display: flex;
            animation: staybotOpen 0.25s ease;
        }

        @keyframes staybotOpen {

            from {
                opacity: 0;
                transform:
                    translateY(15px)
                    scale(0.96);
            }

            to {
                opacity: 1;
                transform:
                    translateY(0)
                    scale(1);
            }
        }


        /* ====================================================
           HEADER
        ==================================================== */

        .staybot-header {

            min-height: 80px;

            padding: 15px 18px;

            display: flex;

            align-items: center;

            justify-content: space-between;

            color: white;

            background:
                linear-gradient(
                    135deg,
                    #ff3d3d,
                    #ec167d,
                    #263cff
                );
        }

        .staybot-title {

            font-size: 23px;

            font-weight: 700;
        }

        .staybot-status {

            margin-top: 5px;

            font-size: 13px;
        }

        .status-dot {

            display: inline-block;

            width: 8px;
            height: 8px;

            margin-right: 5px;

            border-radius: 50%;

            background: #7cff7c;

            box-shadow:
                0 0 8px #7cff7c;
        }

        #staybot-close {

            width: 42px;
            height: 42px;

            border: none;

            background: transparent;

            color: white;

            font-size: 32px;

            cursor: pointer;
        }


        /* ====================================================
           MESSAGE AREA
        ==================================================== */

        #staybot-messages {

            flex: 1;

            overflow-y: auto;

            padding: 18px 15px;

            scroll-behavior: smooth;
        }


        /* ====================================================
           MESSAGE
        ==================================================== */

        .staybot-message {

            display: flex;

            margin-bottom: 14px;
        }

        .staybot-message.bot {
            justify-content: flex-start;
        }

        .staybot-message.user {
            justify-content: flex-end;
        }

        .staybot-bubble {

            max-width: 82%;

            padding: 12px 15px;

            border-radius: 17px;

            color: white;

            font-size: 14px;

            line-height: 1.5;

            word-wrap: break-word;
        }

        .bot .staybot-bubble {

            background:
                linear-gradient(
                    135deg,
                    rgba(126,61,180,0.9),
                    rgba(91,45,140,0.85)
                );

            border-bottom-left-radius: 5px;
        }

        .user .staybot-bubble {

            background:
                linear-gradient(
                    135deg,
                    #ff4d77,
                    #bd36ff
                );

            border-bottom-right-radius: 5px;
        }


        /* ====================================================
           ROOM CARDS
        ==================================================== */

        .room-card {

            margin-top: 10px;

            padding: 13px;

            border-radius: 14px;

            background:
                rgba(255,255,255,0.1);

            border:
                1px solid rgba(255,255,255,0.12);
        }

        .room-card strong {

            display: block;

            font-size: 15px;

            margin-bottom: 5px;
        }

        .room-price {

            color: #ffe45c;

            font-size: 17px;

            font-weight: bold;

            margin: 6px 0;
        }

        .room-description {

            font-size: 12px;

            opacity: 0.9;

            margin-bottom: 10px;
        }

        .room-button {

            display: inline-block;

            padding: 8px 13px;

            border-radius: 20px;

            color: white;

            background: #ff3d68;

            text-decoration: none;

            font-size: 12px;

            font-weight: bold;
        }

        .room-button:hover {
            background: #ff174f;
        }


        /* ====================================================
           LINKS
        ==================================================== */

        .staybot-link {

            display: inline-block;

            margin-top: 8px;

            color: #ffe45c;

            font-weight: bold;

            text-decoration: underline;
        }


        /* ====================================================
           QUICK BUTTONS
        ==================================================== */

        .staybot-quick-actions {

            display: flex;

            gap: 7px;

            padding: 9px 12px;

            overflow-x: auto;

            flex-shrink: 0;

            background:
                rgba(0,0,0,0.08);
        }

        .staybot-quick-actions::-webkit-scrollbar {
            height: 3px;
        }

        .staybot-quick-actions button {

            flex-shrink: 0;

            padding: 8px 11px;

            border:
                1px solid rgba(255,255,255,0.18);

            border-radius: 20px;

            background:
                rgba(255,255,255,0.09);

            color: white;

            cursor: pointer;

            font-size: 12px;
        }

        .staybot-quick-actions button:hover {

            background:
                rgba(255,255,255,0.2);
        }


        /* ====================================================
           INPUT
        ==================================================== */

        .staybot-input-area {

            display: flex;

            gap: 8px;

            padding: 12px;

            flex-shrink: 0;

            background:
                rgba(0,0,0,0.25);
        }

        #staybot-input {

            flex: 1;

            min-width: 0;

            height: 44px;

            box-sizing: border-box;

            padding:
                0 15px;

            border: none;

            outline: none;

            border-radius: 25px;

            background:
                rgba(255,255,255,0.13);

            color: white;

            font-size: 14px;
        }

        #staybot-input::placeholder {

            color:
                rgba(255,255,255,0.65);
        }

        #staybot-send {

            width: 44px;
            height: 44px;

            flex-shrink: 0;

            border: none;

            border-radius: 50%;

            background:
                linear-gradient(
                    135deg,
                    #ff4d77,
                    #ff2fa4
                );

            color: white;

            font-size: 20px;

            cursor: pointer;
        }

        #staybot-send:hover {
            transform: scale(1.05);
        }


        /* ====================================================
           TYPING
        ==================================================== */

        .typing {

            opacity: 0.7;

            font-style: italic;
        }


        /* ====================================================
           MOBILE
        ==================================================== */

        @media (max-width: 500px) {

            #staybot-container {

                right: 15px;

                bottom: 15px;
            }

            #staybot-window {

                width:
                    calc(100vw - 30px);

                height:
                    70vh;

                bottom: 75px;
            }
        }

    `;

    document.head.appendChild(style);


    // ========================================================
    // GET ELEMENTS
    // ========================================================

    const toggleButton =
        document.getElementById("staybot-toggle");

    const closeButton =
        document.getElementById("staybot-close");

    const windowBox =
        document.getElementById("staybot-window");

    const messages =
        document.getElementById("staybot-messages");

    const input =
        document.getElementById("staybot-input");

    const sendButton =
        document.getElementById("staybot-send");


    // ========================================================
    // OPEN CHAT
    // ========================================================

    toggleButton.addEventListener("click", function () {

        windowBox.classList.add("active");

        input.focus();
    });


    // ========================================================
    // CLOSE CHAT
    // ========================================================

    closeButton.addEventListener("click", function () {

        windowBox.classList.remove("active");
    });


    // ========================================================
    // ADD MESSAGE
    // ========================================================

    function addMessage(text, sender = "bot", html = false) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "staybot-message " + sender;

        const bubble =
            document.createElement("div");

        bubble.className =
            "staybot-bubble";

        if (html) {

            bubble.innerHTML = text;

        } else {

            bubble.textContent = text;
        }

        wrapper.appendChild(bubble);

        messages.appendChild(wrapper);

        messages.scrollTop =
            messages.scrollHeight;
    }


    // ========================================================
    // TYPING INDICATOR
    // ========================================================

    function showTyping() {

        const wrapper =
            document.createElement("div");

        wrapper.id =
            "staybot-typing";

        wrapper.className =
            "staybot-message bot";

        wrapper.innerHTML = `
            <div class="staybot-bubble typing">
                StayBot is typing...
            </div>
        `;

        messages.appendChild(wrapper);

        messages.scrollTop =
            messages.scrollHeight;
    }


    function removeTyping() {

        const typing =
            document.getElementById(
                "staybot-typing"
            );

        if (typing) {
            typing.remove();
        }
    }


    // ========================================================
    // SHOW ROOMS
    // ========================================================

    function showRooms() {

        let html = `
            🏨 <strong>Available Rooms</strong>
            <br>
            Here are our current room options:
        `;

        rooms.forEach(function (room) {

            html += `

                <div class="room-card">

                    <strong>
                        ${room.name}
                    </strong>

                    <div class="room-price">
                        ₹${room.price.toLocaleString()}
                        / night
                    </div>

                    <div class="room-description">
                        ${room.description}
                    </div>

                    <a
                        class="room-button"
                        href="${room.link}"
                    >
                        View Room
                    </a>

                </div>

            `;
        });

        addMessage(
            html,
            "bot",
            true
        );
    }


    // ========================================================
    // SHOW PRICES
    // ========================================================

    function showPrices() {

        let html = `
            💰 <strong>Room Prices</strong>
            <br><br>
        `;

        rooms.forEach(function (room) {

            html += `
                <strong>
                    ${room.name}
                </strong>

                — ₹${room.price.toLocaleString()}
                per night

                <br><br>
            `;
        });

        html += `
            Prices may vary depending on
            your selected dates.

            <br>

            <a
                class="staybot-link"
                href="rooms.html"
            >
                View all rooms →
            </a>
        `;

        addMessage(
            html,
            "bot",
            true
        );
    }


    // ========================================================
    // SHOW BOOKING INSTRUCTIONS
    // ========================================================

    function showBooking() {

        const html = `

            📅 <strong>
                How to Book a Room
            </strong>

            <br><br>

            1️⃣ Choose your preferred room.
            <br><br>

            2️⃣ Select your check-in date.
            <br><br>

            3️⃣ Select your check-out date.
            <br><br>

            4️⃣ Enter your guest details.
            <br><br>

            5️⃣ Review your booking.
            <br><br>

            6️⃣ Confirm your reservation.

            <br><br>

            <a
                class="room-button"
                href="rooms.html"
            >
                🏨 Choose a Room
            </a>

            <br><br>

            <a
                class="staybot-link"
                href="booking.html"
            >
                Go to Booking →
            </a>
        `;

        addMessage(
            html,
            "bot",
            true
        );
    }


    // ========================================================
    // SHOW FACILITIES
    // ========================================================

    function showFacilities() {

        const html = `

            ⭐ <strong>
                Hotel Facilities
            </strong>

            <br><br>

            🛏️ Comfortable beds
            <br>

            📶 Free Wi-Fi
            <br>

            🏊 Swimming pool
            <br>

            🍽️ Restaurant & dining
            <br>

            🚗 Parking
            <br>

            🧹 Daily housekeeping
            <br>

            ❄️ Air conditioning
            <br>

            📺 TV and entertainment
        `;

        addMessage(
            html,
            "bot",
            true
        );
    }


    // ========================================================
    // SHOW CONTACT
    // ========================================================

    function showContact() {

        const html = `

            📞 <strong>
                Need Help?
            </strong>

            <br><br>

            Our team will be happy
            to help you with your stay.

            <br><br>

            <a
                class="staybot-link"
                href="booking.html"
            >
                Go to Booking →
            </a>
        `;

        addMessage(
            html,
            "bot",
            true
        );
    }


    // ========================================================
    // SHOW HELP
    // ========================================================

    function showHelp() {

        const html = `

            😊 <strong>
                I can help you with:
            </strong>

            <br><br>

            🏨 Available rooms
            <br>

            💰 Room prices
            <br>

            📅 Booking a room
            <br>

            ⭐ Hotel facilities
            <br>

            📍 Hotel information
            <br>

            📞 Support

            <br><br>

            Try asking:

            <br><br>

            <strong>
                "What rooms are available?"
            </strong>
        `;

        addMessage(
            html,
            "bot",
            true
        );
    }


    // ========================================================
    // BOT RESPONSE
    // ========================================================

    function getBotResponse(message) {

        const text =
            message
                .toLowerCase()
                .trim();


        // ----------------------------------------------------
        // GREETING
        // ----------------------------------------------------

        if (
            text.includes("hello") ||
            text === "hi" ||
            text.includes("hey") ||
            text.includes("good morning") ||
            text.includes("good evening")
        ) {

            return {
                type: "text",

                text: `
                    Hello! 👋
                    <br><br>

                    Welcome to
                    <strong>
                        Book My Stay
                    </strong>.

                    <br><br>

                    I'm StayBot,
                    your virtual hotel assistant.

                    <br><br>

                    How can I help you today?
                `,

                html: true
            };
        }


        // ----------------------------------------------------
        // IMPORTANT:
        // BOOKING CHECK COMES BEFORE ROOM CHECK
        // ----------------------------------------------------

        if (
            text.includes("book") ||
            text.includes("booking") ||
            text.includes("reserve") ||
            text.includes("reservation") ||
            text.includes("how can i book") ||
            text.includes("how do i book")
        ) {

            return {
                type: "booking"
            };
        }


        // ----------------------------------------------------
        // PRICE
        // ----------------------------------------------------

        if (
            text.includes("price") ||
            text.includes("prices") ||
            text.includes("cost") ||
            text.includes("rate") ||
            text.includes("rates") ||
            text.includes("how much") ||
            text.includes("expensive") ||
            text.includes("cheap")
        ) {

            return {
                type: "prices"
            };
        }


        // ----------------------------------------------------
        // ROOM AVAILABILITY
        // ----------------------------------------------------

        if (
            text.includes("available") ||
            text.includes("availability") ||
            text.includes("what rooms") ||
            text.includes("which rooms") ||
            text === "rooms"
        ) {

            return {
                type: "rooms"
            };
        }


        // ----------------------------------------------------
        // FACILITIES
        // ----------------------------------------------------

        if (
            text.includes("facility") ||
            text.includes("facilities") ||
            text.includes("amenities") ||
            text.includes("wifi") ||
            text.includes("wi-fi") ||
            text.includes("pool") ||
            text.includes("parking") ||
            text.includes("restaurant")
        ) {

            return {
                type: "facilities"
            };
        }


        // ----------------------------------------------------
        // CONTACT
        // ----------------------------------------------------

        if (
            text.includes("contact") ||
            text.includes("phone") ||
            text.includes("support") ||
            text.includes("help me")
        ) {

            return {
                type: "contact"
            };
        }


        // ----------------------------------------------------
        // THANK YOU
        // ----------------------------------------------------

        if (
            text.includes("thank") ||
            text.includes("thanks")
        ) {

            return {
                type: "text",

                text:
                    "You're very welcome! 😊 I'm here whenever you need help with your stay."
            };
        }


        // ----------------------------------------------------
        // GOODBYE
        // ----------------------------------------------------

        if (
            text === "bye" ||
            text.includes("goodbye")
        ) {

            return {
                type: "text",

                text:
                    "Goodbye! 👋 We hope to see you at Book My Stay soon."
            };
        }


        // ----------------------------------------------------
        // HELP
        // ----------------------------------------------------

        if (
            text.includes("what can you do") ||
            text.includes("what do you do") ||
            text.includes("options")
        ) {

            return {
                type: "help"
            };
        }


        // ----------------------------------------------------
        // DEFAULT
        // ----------------------------------------------------

        return {

            type: "text",

            text: `

                🤔 I'm not completely sure about that.

                <br><br>

                I can help you with:

                <br><br>

                🏨 Rooms
                <br>

                💰 Prices
                <br>

                📅 Booking
                <br>

                ⭐ Facilities
                <br>

                📞 Support

                <br><br>

                Try asking:

                <br><br>

                <strong>
                    "What is the price of the rooms?"
                </strong>
            `,

            html: true
        };
    }


    // ========================================================
    // PROCESS MESSAGE
    // ========================================================

    function processMessage() {

        const message =
            input.value.trim();

        if (!message) {
            return;
        }


        // Show user's message
        addMessage(
            message,
            "user"
        );


        // Clear input
        input.value = "";


        // Show typing
        showTyping();


        // Small delay
        setTimeout(function () {

            removeTyping();

            const response =
                getBotResponse(message);


            switch (response.type) {

                case "rooms":

                    showRooms();

                    break;


                case "prices":

                    showPrices();

                    break;


                case "booking":

                    showBooking();

                    break;


                case "facilities":

                    showFacilities();

                    break;


                case "contact":

                    showContact();

                    break;


                case "help":

                    showHelp();

                    break;


                default:

                    addMessage(
                        response.text,
                        "bot",
                        response.html || false
                    );
            }

        }, 500);
    }


    // ========================================================
    // SEND BUTTON
    // ========================================================

    sendButton.addEventListener(
        "click",
        processMessage
    );


    // ========================================================
    // ENTER KEY
    // ========================================================

    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                processMessage();
            }
        }
    );


    // ========================================================
    // QUICK BUTTONS
    // ========================================================

    document
        .querySelectorAll(
            ".staybot-quick-actions button"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const question =
                        button.dataset.question;

                    input.value =
                        question;

                    processMessage();
                }
            );
        });


    // ========================================================
    // WELCOME MESSAGE
    // ========================================================

    addMessage(`

        <strong>
            Hello! 👋
        </strong>

        <br><br>

        Welcome to
        <strong>
            Book My Stay
        </strong>.

        <br><br>

        I'm <strong>StayBot</strong>,
        your virtual hotel assistant.

        <br><br>

        I can help you with:

        <br>

        🏨 Finding rooms
        <br>

        💰 Room prices
        <br>

        📅 Booking
        <br>

        ⭐ Facilities

        <br><br>

        What would you like to know?

    `, "bot", true);


    // ========================================================
    // CONSOLE MESSAGE
    // ========================================================

    console.log(
        "StayBot upgraded successfully!"
    );

});