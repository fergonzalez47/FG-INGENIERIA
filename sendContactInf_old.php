<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

header('Content-Type: application/json');

try {
    $data = json_decode(file_get_contents("php://input"), true);

    // Sanitizar entradas
    $name      = htmlspecialchars(trim($data['name'] ?? ''));
    $phone     = htmlspecialchars(trim($data['phone'] ?? ''));
    $email     = htmlspecialchars(trim($data['email'] ?? ''));
    $direccion = htmlspecialchars(trim($data['direccion'] ?? ''));
    $region    = htmlspecialchars(trim($data['region'] ?? ''));
    $comuna    = htmlspecialchars(trim($data['comuna'] ?? ''));
    $asunto    = htmlspecialchars(trim($data['asunto'] ?? ''));
    $mensaje   = htmlspecialchars(trim($data['mensaje'] ?? ''));

    // Validaciones básicas
    if (empty($name) || empty($phone) || empty($asunto)) {
        throw new Exception("Nombre, teléfono y asunto son obligatorios.");
    }
    if (!preg_match('/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/', $name)) {
        throw new Exception("El nombre no es válido.");
    }
    if (!preg_match('/^9\d{8}$/', $phone)) {
        throw new Exception("El teléfono debe comenzar con 9 y tener 9 dígitos.");
    }
    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("El correo electrónico no es válido.");
    }

    // Cargar credenciales desde archivo seguro
    $config = include('/home3/fygelectrica/config-mail.php');

    // Correo al admin
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = $config['host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['username'];
    $mail->Password   = $config['password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = $config['port'];

    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['from_email'], 'FYG Electrical');

    $mail->isHTML(true);
    $mail->Subject = "Nuevo mensaje: $asunto";
    $mail->Body = "
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> $name</p>
        <p><strong>Teléfono:</strong> $phone</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Dirección:</strong> $direccion</p>
        <p><strong>Región:</strong> $region</p>
        <p><strong>Comuna:</strong> $comuna</p>
        <p><strong>Asunto:</strong> $asunto</p>
        <p><strong>Mensaje:</strong><br>$mensaje</p>
    ";
    $mail->send();

    // Correo de confirmación al cliente
    if (!empty($email)) {
        $mail2 = new PHPMailer(true);
        $mail2->isSMTP();
        $mail2->Host       = $config['host'];
        $mail2->SMTPAuth   = true;
        $mail2->Username   = $config['username'];
        $mail2->Password   = $config['password'];
        $mail2->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail2->Port       = $config['port'];

        $mail2->setFrom($config['from_email'], $config['from_name']);
        $mail2->addAddress($email, $name);

        $mail2->isHTML(true);
        $mail2->Subject = "Confirmación de recepción de tu mensaje";
        $mail2->Body = "
            <h2>Hola $name</h2>
            <p>Hemos recibido tu mensaje y nos pondremos en contacto a la brevedad.</p>
            <p><strong>Tu mensaje:</strong><br>$mensaje</p>
            <p>Gracias por escribirnos.<br>FYG Electrical</p>
        ";
        $mail2->send();
    }

    echo json_encode(['success' => true, 'message' => '✅ Tu mensaje fue enviado con éxito.']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => '❌ Error: ' . $e->getMessage()]);
}
