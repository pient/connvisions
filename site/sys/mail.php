<?php
	header("content-type:text/html;charset=utf-8"); 

  require_once(dirname(__FILE__) . "/inc/libs/phpmailer/class.phpmailer.php");
  require_once(dirname(__FILE__) . "/inc/libs/phpmailer/class.smtp.php");

  $ALLOW_EXTS = array( 'doc', 'docx', 'pdf', 'txt', 'zip' );
  $MAX_SIZE = 10 * 1024 * 1024; // 10M
  $UPLOAD_FOLDER = "./files/tmp";

  $sender_name = $_POST["name"];
  $sender_email = $_POST["email"];
  $sender_message = $_POST["message"];
  $sender_file = $_FILES["file"];

  if(empty($sender_name)){
  	echo "Please let us know your name.";

  	exit(0);
  }

  if(empty($sender_email)){
  	echo "Please give your email.";

  	exit(0);
  }


  $mail  = new PHPMailer(); 
  // $mail->SMTPDebug = 1;

  $mail->CharSet    ="UTF-8";                 //设定邮件编码，默认ISO-8859-1，如果发中文此项必须设置为 UTF-8
  $mail->IsSMTP();                            // 设定使用SMTP服务
  $mail->SMTPAuth   = true;                   // 启用 SMTP 验证功能
  $mail->SMTPSecure = "ssl";                  // SMTP 安全协议
  $mail->Host       = "smtp.126.com";       // SMTP 服务器
  $mail->Port       = 465;                    // SMTP服务器的端口号
  $mail->Username   = "lyrealblue@126.com";  // SMTP服务器用户名
  $mail->Password   = "1234Qwer";        // SMTP服务器密码
  $mail->SetFrom('lyrealblue@126.com', 'Connecting-Visions Web Site');    // 设置发件人地址和名称
  // $mail->AddReplyTo("邮件回复人地址","邮件回复人名称"); 
                                              // 设置邮件回复人地址和名称
  $mail->Subject    = '$sender_name -- ' . date("Y-m-d");                     // 设置邮件标题
  // $mail->AltBody    = "为了查看该邮件，请切换到支持 HTML 的邮件客户端"; 
                                              // 可选项，向下兼容考虑
  $mail->MsgHTML($sender_message);                         // 设置邮件内容
  $mail->AddAddress('recruit@connecting-visions.net', " Connecting-Visions Recruit ");


  if(!empty($_FILES["file"]["name"])){
    $file_name = $_FILES["file"]["name"];

    $file_ext = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
    $file_path = "$UPLOAD_FOLDER/$file_name";

    if (!empty($file_ext) && in_array($file_ext, $ALLOW_EXTS)){
      echo "Please upload file with one of follow extension. (doc, docx, pdf, zip)." . "<br />";
      exit(0);
    } else if ($_FILES["file"]["size"] > $MAX_SIZE) {
       echo "Your file has exceeded max upload size (10M)." . "<br />";
       exit(0);
    } else if ($_FILES["file"]["error"] > 0) {
      echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
      exit(0);
    } else if (move_uploaded_file($_FILES["file"]["tmp_name"], $file_path)) {
      // echo "File saved" . "<br />";
      $mail->AddAttachment($file_path); // 附件 
    }
  }

  if(!$mail->Send()) {
    echo "发送失败：" . $mail->ErrorInfo;
  } else {
    echo "恭喜，邮件发送成功！";
  }

  if(file_exists($file_path)){
    unlink($file_path);
  }

	