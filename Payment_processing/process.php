<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Check if $_POST is set
if ( empty ( $_POST['name'] ) ) {
    echo "Yo! Something ain't legit!";
    exit;
}

// Connect to MySQL
$mysqli = new mysqli('localhost', 'yscr_bbOAi$', 'i9KE017GRP$jlJH', 'wp');

// Check connection
if ( mysqli_connect_errno() ) {
    echo "Can't connect: " . mysqli_connect_error();
}

$stmt = $mysqli->prepare("SELECT * FROM `online_donor` LIMIT 0, 30 ");
$stmt->bind_param("s", $_POST['name']);
$stmt->execute();
$result = $stmt->get_result();
while( $row = $result->fetch_object() ) {
    $rows[] = $row;
}
?>

<ul>
    <?php foreach ( $rows as $row ) : ?>
        <li><?php echo $row->fname; ?>: <?php echo $row->lname; ?></li>
    <?php endforeach; ?>
</ul>