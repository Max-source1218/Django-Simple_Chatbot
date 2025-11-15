function showTypingIndicator() {
    const typingHTML = `
        <div id="typingIndicator" class="botText">
            <span>⚡ Processing<span class="dot1">.</span><span class="dot2">.</span><span class="dot3">.</span></span>
        </div>
    `;
    $('#chatbot').append(typingHTML);
    scrollToBottom();
}

function removeTypingIndicator() {
    $('#typingIndicator').remove();
}

function typeCyberMessage(text) {
    let i = 0;
    const bubble = `<p class="botText"><span id="neoType"></span></p>`;
    $('#chatbot').append(bubble);

    function type() {
        if (i < text.length) {
            $('#neoType').text(text.slice(0, i + 1));
            i++;
            setTimeout(type, 15);
        }
        scrollToBottom();
    }

    type();
}

$(document).ready(function() {
    // Function to add a message to the chat
    function addMessage(text, isUser = false) {
        const messageClass = isUser ? 'userText' : 'botText';
        const messageHTML = `<div class="${messageClass}"><span>${text}</span></div>`;
        $('#chatbot').append(messageHTML);
        // Auto-scroll to bottom
        $('#chatbot').scrollTop($('#chatbot')[0].scrollHeight);
    }

    // Handle SEND button click
    $('#buttonInput').click(function() {
        const userMessage = $('#textInput').val().trim();
        if (userMessage) {
            // Add user message
            addMessage(userMessage, true);
            $('#textInput').val(''); // Clear input

            // Simulate bot response (replace with your actual bot logic)
            setTimeout(() => {
                const botResponse = "This is a sample bot reply!"; // Or fetch from API
                addMessage(botResponse);
            }, 1000); // Delay for realism
        }
    });

    // Optional: Handle Enter key
    $('#textInput').keypress(function(e) {
        if (e.which === 13) { // Enter key
            $('#buttonInput').click();
        }
    });
});

function scrollToBottom() {
    $('#chatbot').scrollTop($('#chatbot')[0].scrollHeight);
}

function getUserResponse() {
    let userText = $('#textInput').val();
    if (!userText.trim()) return;

    $('#chatbot').append(`<p class="userText"><span>${userText}</span></p>`);
    $('#textInput').val("");

    scrollToBottom();

    showTypingIndicator();

    $.get('/blog/getResponse', { userMessage: userText }).done(function(data) {
        removeTypingIndicator();
        setTimeout(() => typeCyberMessage(data), 300);
    });
}

$('#buttonInput').click(getUserResponse);
$('#textInput').keypress(function(e){
    if (e.which === 13) getUserResponse();
});
