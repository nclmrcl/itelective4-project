<?php 
	require_once("./config/Config.php");

	$db = new Connection();
	$pdo = $db->connect();
	$gm = new GlobalMethods($pdo);
	$auth = new Auth($pdo);
	$post = new Post($pdo);

	if (isset($_REQUEST['request'])) {
		$req = explode('/', rtrim(($_REQUEST['request']), '/'));
	} else {
		$req = array("errorcatcher");
	}

	switch($_SERVER['REQUEST_METHOD']) {
		case 'POST':
			switch($req[0]) {
				case 'accounts':
					if(count($req)>1){
						echo json_encode($gm->exec_query('tbl_'.$req[0], $req[1]),JSON_PRETTY_PRINT);
					} else {
						echo json_encode($gm->exec_query('tbl_'.$req[0], null),JSON_PRETTY_PRINT);
					}
				break;

				case 'products':
					if(count($req)>1){
						echo json_encode($gm->exec_query('tbl_'.$req[0], $req[1]),JSON_PRETTY_PRINT);
					} else {
						echo json_encode($gm->exec_query('tbl_'.$req[0], null),JSON_PRETTY_PRINT);
					}
				break;

				case 'productDesc':
					if(count($req)>1){
						echo json_encode($post->productDescrition('tbl_products', $req[1]),JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->productDescrition('tbl_products', null),JSON_PRETTY_PRINT);
					}
				break;

				case 'cart':
					if(count($req)>1){
						echo json_encode($gm->exec_query('tbl_'.$req[0], $req[1]),JSON_PRETTY_PRINT);
					} else {
						echo json_encode($gm->exec_query('tbl_'.$req[0], null),JSON_PRETTY_PRINT);
					}
				break;

				case 'order':
					if(count($req)>1){
						echo json_encode($gm->exec_query('tbl_'.$req[0], $req[1]),JSON_PRETTY_PRINT);
					} else {
						echo json_encode($gm->exec_query('tbl_'.$req[0], null),JSON_PRETTY_PRINT);
					}
				break;

				case 'addToCart':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->insert("tbl_cart", $d));
				break;

				case 'addQuantity':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->update("tbl_cart", $d, "cart_id = $req[1]"));
				break;

				case 'subtractQuantity':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->update("tbl_cart", $d, "cart_id = $req[1]"));
				break;

				case 'archiveCart':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->update("tbl_cart", $d, "cart_id = $req[1]"));
				break;

				case 'clearCart':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->update("tbl_cart", $d, "acc_id = $req[1]"));
				break;

				case 'placeOrder':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->placeOrder($d));
				break;

				case 'checkEmail':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->checkEmail($d));
				break;

				case 'checkUsername':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->checkUsername($d));
				break;

				case 'verifyEmail':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->verifyEmail($d));
				break;

				case 'login':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->login($d));
				break;

				case 'register':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->register($d));
				break;

				default:
					http_response_code(400);
					echo "Invalid Routee haha";
				break;
			}
		break;

		case 'GET':
			switch ($req[0]) {
				default:
				http_response_code(400);
				echo "Bad Request";
				break;
			}
			break;

		default:
			http_response_code(403);
			echo "Please contact the Systems Administrator";
		break;
	}
?>