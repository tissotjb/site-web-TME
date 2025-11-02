<?php
// --- Configuration ---
$destinataire = ""; // Adresse email de réception
$sujet_general = "Nouveau message depuis le formulaire de contact - TME";

// --- Vérification de la méthode ---
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée"]);
    exit;
}

// --- Récupération et nettoyage des données ---
function sanitize_input($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

$name     = sanitize_input($_POST["name"] ?? "");
$company  = sanitize_input($_POST["company"] ?? "");
$email    = sanitize_input($_POST["email"] ?? "");
$subject  = sanitize_input($_POST["subject"] ?? "");
$message  = sanitize_input($_POST["message"] ?? "");
$consent  = isset($_POST["consent"]);

// --- Vérification des champs obligatoires ---
if (empty($name) || empty($company) || empty($email) || empty($subject) || !$consent) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Merci de remplir tous les champs obligatoires."]);
    exit;
}

// --- Validation de l'email ---
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Adresse email invalide."]);
    exit;
}

// --- Construction du message ---
$body = "
<h2>Nouveau message de contact depuis le site TME</h2>
<p><strong>Nom et prénom :</strong> {$name}</p>
<p><strong>Société :</strong> {$company}</p>
<p><strong>Email :</strong> {$email}</p>
<p><strong>Sujet :</strong> {$subject}</p>
<p><strong>Message :</strong><br>" . nl2br($message) . "</p>
<p>---<br>
Ce message a été envoyé depuis le formulaire de contact du site web.</p>
";

// --- Entêtes de l'email ---
$headers  = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: {$name} <{$email}>" . "\r\n";
$headers .= "Reply-To: {$email}" . "\r\n";

// --- Envoi du mail ---
if (mail($destinataire, $sujet_general . " : " . $subject, $body, $headers)) {
    echo json_encode(["status" => "success", "message" => "Votre message a bien été envoyé. Merci !"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Une erreur est survenue lors de l'envoi."]);
}
?>
