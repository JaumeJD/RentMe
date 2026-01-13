<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>
  <h2>Hola {{ $data['name'] }} 👋</h2>
  <p>Gracias por escribirnos. Hemos recibido tu mensaje:</p>
  <blockquote>{{ $data['message'] }}</blockquote>
  <p>Nos pondremos en contacto contigo pronto.</p>
  <p>Saludos,<br>El equipo de RentMe 🚗</p>
</body>
</html>
