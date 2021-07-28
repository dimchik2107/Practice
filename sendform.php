<?php


//Переменная $name,$phone, $mail получает данные при помощи метода POST из формы
$name = $_POST['name'];
$mail = $_POST['mail'];
$message = $_POST['message'];
$phone = $_POST['phone'];

//в переменную $token нужно вставить токен, который нам прислал @botFather
$token = "1820781653:AAEMENI-0VqMbtTd8sHpIDQz1hm7_Fhd8ro";

//нужна вставить chat_id (Как получить chad id, читайте ниже)
$chat_id = "-546460215";

//Далее создаем переменную, в которую помещаем PHP массив
$arr = array(
  'Имя пользователя: ' => $name,
  'Email' => $mail,
  'Сообщение ' => $message,
  'Телефон' => $phone
);

//При помощи цикла перебираем массив и помещаем переменную $txt текст из массива $arr
foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

//Осуществляется отправка данных в переменной $sendToTelegram
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

//Если сообщение отправлено, напишет "Thank you", если нет - "Error"
if ($sendToTelegram) {
  header('Location: contact.php');
} else {
  echo "Error";
}
?>
