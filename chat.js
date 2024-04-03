function showChatWindow() {
	const chatModal = document.getElementById("chatModal");
	chatModal.style.display = "block";
}

function hideChatWindow() {
	const chatModal = document.getElementById("chatModal");
	chatModal.style.display = "none";
}

function sendMessage() {
	const username = document.getElementById("username").value;
	const message = document.getElementById("message").value;

	if (username && message) {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "proses.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				const chatbox = document.getElementById("chatbox");
				chatbox.innerHTML += `<p class="message">${username}: ${message}</p>`;
				document.getElementById("message").value = "";
			}
		};
		xhr.send(`username=${encodeURIComponent(username)}&message=${encodeURIComponent(message)}`);
	}
}

// Auto-refresh chat box every 5 seconds
setInterval(function() {
	const chatbox = document.getElementById("chatbox");
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "proses.php", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			chatbox.innerHTML = xhr.responseText;
		}
	};
	xhr.send();
}, 1000);

// Load initial chat data on page load
window.onload = function() {
	const chatbox = document.getElementById("chatbox");
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "proses.php", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			chatbox.innerHTML = xhr.responseText;
		}
	};
	xhr.send();
};