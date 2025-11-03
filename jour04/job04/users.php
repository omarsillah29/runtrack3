<?php
// users.php
// Renvoie la liste des utilisateurs en JSON par défaut.
// Si vous appelez users.php?view=html la page affichera un tableau HTML lisible.

try {
    $pdo = new PDO("mysql:host=localhost;dbname=utilisateurs;charset=utf8", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM utilisateurs");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $e) {
    // En cas d'erreur de connexion ou de requête, renvoyer une réponse claire
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(["error" => true, "message" => $e->getMessage()]);
    exit;
}

// Par défaut renvoyer du JSON
header('Content-Type: application/json;');
echo json_encode($users);

?>
<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Utilisateurs</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%
        }

        th,
        td {
            padding: 8px;
            border: 1px solid #ddd;
            text-align: left
        }

        th {
            background: #f4f6f8
        }
    </style>
</head>

<body>
    <h1>Liste des utilisateurs (<?php echo count($users); ?>)</h1>
    <?php if (empty($users)): ?>
        <p>Aucun utilisateur trouvé.</p>
    <?php else: ?>
        <table>
            <thead>
                <tr>
                    <?php foreach (array_keys($users[0]) as $col): ?>
                        <th><?php echo htmlspecialchars($col); ?></th>
                    <?php endforeach; ?>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($users as $u): ?>
                    <tr>
                        <?php foreach ($u as $v): ?>
                            <td><?php echo htmlspecialchars($v); ?></td>
                        <?php endforeach; ?>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</body>

</html>