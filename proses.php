<?php
$username = $_POST["username"] ?? "";
$message = $_POST["message"] ?? "";

if ($username && $message) {
    // Mendapatkan waktu saat pesan diterima oleh server
    $time = date("Y-m-d H:i:s");

    // Format pesan dengan menambahkan informasi waktu
    $formattedMessage = "[$time] $username: $message\n";

    // Menambahkan pesan ke dalam file chat.txt
    file_put_contents("chat.txt", $formattedMessage, FILE_APPEND);
}

// Membaca isi file chat.txt dan menampilkan sebagai respons AJAX
$messages = file_get_contents("chat.txt") ? file_get_contents("chat.txt") : "";
$messageList = "";

foreach (explode("\n", $messages) as $message) {
    if ($message) {
        $messageList .= "<p class='message'>" . str_replace("\n", "<br>", htmlspecialchars($message)) . "</p>";
    }
}

echo $messageList;
