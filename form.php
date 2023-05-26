<?php
    $conn = new mysqli('localhost', 'root', '', 'marks_management');
	if($conn->connect_error){
	   die("Connection failed: " . $conn->connect_error);
	}

    if(isset($_POST['save'])){
		$regno = $_POST['regno'];
		$cat = $_POST['cat'];
		$exam = $_POST['exam'];
		$class = $_POST['class'];
		$sql = "INSERT INTO marks (regno, ass, exam, class) VALUES ('$regno', '$cat', '$exam', '$class')";

		if($conn->query($sql)){
			$_SESSION['success'] = 'Marks added successfully';
		}		
		else{
			$_SESSION['error'] = 'Something went wrong while adding marks';
		}
	}
	else{
		$_SESSION['error'] = 'Fill up marks form first';
	}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MARKS MANAGEMENT SYSTEM</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            align-items: center;
        }
        body{
            margin: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container{
            margin-top: 50px;
            border: 7px dotted #000;
            padding: 5em;
            padding-top: 3em;
        }
        .container h1{
            margin-bottom: 25px;
        }
        .container div{
            margin: 5px;
            width: 60%;
            display: flex;
            justify-content: space-between;
        }
        .container button{
            margin-bottom: 5em;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- INPUT FORM -->
        <h1>Enter The Marks Of Students</h1>
        <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="POST">
            <div>RegNo <input type="text" name="regno"></div>
            <div>CAT <input type="text" name="cat"></div>
            <div>Exam <input type="text" name="exam"></div>
            <div>Class <input type="text" name="class"></div>
            <button type="submit" name="save">Save Marks</button>
        </form>
        <h1>The Entered Student Marks Are:</h1>
        <table border=1 cellpadding=3 width="400px">
				<thead>
					<th>Registration Number</th>
					<th>CAT</th>
					<th>EXAM</th>
					<th>Class</th>
					<th>Total</th>
				</thead>
				<tbody>
					<?php
						$sql = "SELECT * FROM marks";
						$query = $conn->query($sql);
						while($row = $query->fetch_assoc()){
							echo 
							"<tr>
								<td>".$row['regno']."</td>
								<td>".$row['ass']."</td>
								<td>".$row['exam']."</td>
								<td>".$row['class']."</td>
								<td>".$row['ass'] + $row['exam']."</td>
							</tr>";
						}
					?>
				</tbody>
		</table>
    </div>
</body>
</html>