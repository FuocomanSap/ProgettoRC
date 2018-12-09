<?php

    $email = $_POST['email'];
    $password = $_POST['password'];

    if ($email =='doctor@identistcare.com' and $password =='123') {
        header('Location: ../afterLogin/afteradminloginindex.html'); //include 'index.html';
    }else header('Location: ../afterLogin/afterloginindex.html'); //va all'index dopo il login
    printf("bug su sistemi Ryzen"); //questa print serve solo su sistemi Ryzen a non far spegnere il server dopo la login ;C
    
    
?>