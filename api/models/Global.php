<?php  
	class GlobalMethods {
		protected $pdo;

		public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
		}

		// SELECT
		public function exec_query($table, $filter_data) {

			$this->sql = "SELECT * FROM $table";

			if($table == "tbl_accounts") {
				$this->sql .= " WHERE acc_status=1";

				if($filter_data != null) {
					$this->sql .= " AND acc_id=$filter_data";
				}
			}

			if($table == "tbl_products") {
				if($filter_data != null) {
					$this->sql .= " WHERE product_category='$filter_data'";
				}
			}

			if($table == "tbl_cart") {
				if($filter_data != null) {
					$this->sql .= " LEFT JOIN tbl_products ON tbl_cart.product_id = tbl_products.product_id 
						WHERE tbl_cart.acc_id=$filter_data";
				}
			}

			$data = array(); $code = 0; $msg= ""; $remarks = "";
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) { array_push($data, $rec);}
					$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload($data, $remarks, $msg, $code);
		}

		public function insert($table, $data){
			$i = 0; $fields=[]; $values=[];
			foreach ($data as $key => $value) {
				array_push($fields, $key);
				array_push($values, $value);
			}
			try {
				$ctr = 0;
				$sqlstr="INSERT INTO $table (";
				foreach ($fields as $value) {
					$sqlstr.=$value; $ctr++;
					if($ctr<count($fields)) {
						$sqlstr.=", ";
					} 	
				} 
				$sqlstr.=") VALUES (".str_repeat("?, ", count($values)-1)."?)";

				$sql = $this->pdo->prepare($sqlstr);
				$sql->execute($values);
				return array("code"=>200, "remarks"=>"success");
			} catch (\PDOException $e) {
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return array("code"=>$code, "errmsg"=>$errmsg);
		}

		public function update($table, $data, $conditionStringPassed){
			$fields=[]; $values=[];
			$setStr = "";
			foreach ($data as $key => $value) {
				array_push($fields, $key);
				array_push($values, $value);
			}
			try{
				$ctr = 0;
				$sqlstr = "UPDATE $table SET ";
					foreach ($data as $key => $value) {
						$sqlstr .="$key=?"; $ctr++;
						if($ctr<count($fields)){
							$sqlstr.=", ";
						}
					}
					$sqlstr .= " WHERE ".$conditionStringPassed;
					$sql = $this->pdo->prepare($sqlstr);
					$sql->execute($values);
				return array("code"=>200, "remarks"=>"success");	
			}
			catch(\PDOException $e){
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return array("code"=>$code, "errmsg"=>$errmsg);
		}

		public function sendPayload($payload, $remarks, $message, $code) {
			$status = array("remarks"=>$remarks, "message"=>$message);
			http_response_code($code);
			return array(
				"status"=>$status,
				"payload"=>$payload,
				'prepared_by'=>'Bernie L. Inociete Jr., Developer',
				"timestamp"=>date_create());
		} 
	}
?>