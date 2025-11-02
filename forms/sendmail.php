<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Inclure PHPMailer (selon installation)
require 'vendor/autoload.php';

// Vérifie que le formulaire est soumis en POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Récupération des données
    $name = htmlspecialchars(strip_tags($_POST["name"]));
    $company = htmlspecialchars(strip_tags($_POST["company"]));
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(strip_tags($_POST["subject"]));
    $message = htmlspecialchars(strip_tags($_POST["message"]));
    $consent = isset($_POST["consent"]) ? "Oui" :"Non";

    $mail = new PHPMailer(true);

    try {
        // Configuration du serveur SMTP Gmail
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'tissot.tme@gmail.com';
        $mail->Password = 'wxzw xsyg vick czis';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Expéditeur et destinataire
        $mail->setFrom($email, $name);
        $mail->addAdress('tissot.tme@gmail.com', 'TME - Tissot Métrés & Economie');
        $mail->AddReplyTo($email, $name);

        // Contenu du mail
        $mail->isHTML(true);
        $mail->Subject ="Nouveau message : " . $subject;
        $mail->Body = "
            <h3>Nouveau message depuis le site TME</h3>
            <p><strong>Nom & Prénom :</strong>{$name}</p>
            <p><strong>Société :</strong>{$company}</p>
            <p><strong>Email :</strong>{$email}</p>
            <p><strong>Sujet :</strong>{$subject}</p>
            <p><strong>Message :</strong><br>{$message}</p>
            <p><strong>Consentement :</strong>{$consent}</p>
        ";

        $mail->AltBody = "Nom: $name\nSociété: $company\nEmail: $email\nSujet: $subject\nMessage: $message\nConsentement: $consent";
        
        $mail->send();
        http_response_code(200);
        echo "Message envoyé avec succès";
    } catch (Exception $e) {
        http_response_code(500);
        echo "Erreur lors de l'envoi : {$mail->ErrorInfo}";
    }
} else {
    http_response_code(403);
    echo "Méthode non autorisée";
}
?>