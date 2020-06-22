# SimakPro (Sistem Informasi Management Proyek)

## Pendahuluan
SimakPro adalah suatu sistem informasi yang bertujuan untuk mengelola data mengenai proyek, pada kasus ini proyeknya lebih spesifik ke arah industri jasa developer (properti bangunan).

Sistem ini membantu untuk mencatat data-data mengenai proyek, serta transaksi proyek tersebut. Selain kebutuhan dasar suatu sistem seperti CRUD, sistem ini juga membantu dalam hal otomasi beberapa data dan proses, seperti mutasi bank, update saldo dan pencatatan history secara realtime setiap user melakukan transaksi di sistem, seperti operasional / pengajuan.

Sistem ini juga dapat menampilkan informasi-informasi penting dalam bentuk dashboard.

Sistem ini dibangun menggunakan bahasa pemrograman PHP 7 dibagian server, dan menggunakan JavaScript dibagian client.

## Modul
- Default Lookup
- Contact
- User
- Bank
- Proyek
- Operasional Proyek
- Operasional
- Pengajuan
- Dashboard
- System Administrator

## Teknologi dan Fitur
- Native PHP 7 dengan menggunakan konsep OOP
- Framework PHP disupport dengan [HelloFramework](https://github.com/dev-dmadan/Hello-Framework-PHP)
- Native JavaScript ES5/ES6 dengan menggunakan konsep OOP / jQuery
- Template admin disupport dengan [AdminLTE v3](https://github.com/ColorlibHQ/AdminLTE)
- Notifikasi realtime / Websocket disupport dengan [Pusher](https://pusher.com/)
- Database MariaDB / MySQL
- Authentikasi menggunakan basic Session / Token JWT
- Export Excel disupport dengan library [PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet)
- Migration & Seeder DB menggunakan Raw Sql yang dirender oleh sistem
- Router disupport dengan library [Klein](https://github.com/klein/klein.php)
- Curl / HTTP Request disupport dengan library [PHP-Curl-Class-Library](https://github.com/php-curl-class/php-curl-class)
- Render Id menggunakan konsep GUID dan disupport dengan library [ramsey/uuid](https://github.com/ramsey/uuid)

## Instalasi
1. ### Clone / Download source code
2. ### Install source code di web server
    Contoh jika web server menggunakan Xampp
    ```
    C:\xampp\htdocs\SimakPro
    ```
3. ### Install database
    Buka project yang sudah diinstall, masuk ke 
    ``` 
    ..\app\database\dev\migration\
    ```
    Cari file table.sql, dan install script sql tersebut ke database anda.

    Sebelum melakukan instalasi, harap perhatikan komentar pada line pertama
    ```sql
    # Local Development Only

    -- Remove commentary if you want build database from zero
    # DROP DATABASE IF EXISTS `dev-simakpro`;
    # CREATE DATABASE `dev-simakpro`;
    # USE `dev-simakpro`;

    # End Local Development Only
    ```
    Jika anda ingin menginstall dengan database yang sudah disediakan, maka harap hilangkan komentar script sql untuk membuat DB baru. Abaikan jika anda menggunakan database baru/custom.

4. ### Update .htaccess
    .htaccess yang digunakan pada SimakPro terdapat 2 versi, yaitu project yang disimpan pada direktori utama (C:\xampp\htdocs\) atau pada public_html jika di hosting/cloud, dan project yang disimpan pada sub-direktori (C:\xampp\htdocs\others\SimakPro)

    - Direktori Utama
    
        Buka project, masuk ke
        ```
        ..\assets\htaccess\root\
        ```
        Copy file .htaccess, dan paste ke tempat terluar (C:\xampp\htdocs\), pastikan .htaccess bersama dengan file index.php

    - Sub Diirektori
        Buka project, masuk ke
        ```
        ..\assets\htaccess\subdirectory\
        ```
        Copy file .htaccess, dan paste ke tempat terluar (C:\xampp\htdocs\other\SimakPro), pastikan .htaccess bersama dengan file index.php
        Buka file .htaccess, lalu ubah syntax "RewriteBase /Others/SimakPro/", ganti bagian "/Others/SimakPro/", sesuaikan dengan sub direktori project masing-masing.
        ```htaccess
        <IfModule mod_rewrite.c>
            Options -MultiViews

            RewriteEngine On
            RewriteBase /Others/SimakPro/
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteRule ^ index.php [L]
        </IfModule>
        ```

5. ### Update index.php
    Sesuaikan environment project yang ingin digunakan. Ganti nilai constanta "ENVIRONMENT"
    ```php
    /**
        * Const ENVIRONMENT
        * By Default: DEV, DEV-LIVE, PROD
        * DEV      => Local only
        * DEV-LIVE => Development in cloud/host
        * PROD     => Golive / production
    */
    define('ENVIRONMENT', "DEV");
    ```

6. ### Update config.php
    Buka project, masuk ke
    ```
    ..\app\configuration\
    ```
    Buka file config.php, sesuaikan nilai-nilai yang ada pada variabel $__configuration.
    Terutama yang harus diubah adalah
    ```php
    $__configuration['BASE_URL'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => 'http://localhost/SimakPro/'
    );
    $__configuration['SITE_URL'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => 'http://localhost/SimakPro/'
    );

    /** Use JWT & Key Auth for Secret Key JWT */
    $__configuration['USE_JWT'] = true;
    $__configuration['KEY_AUTH'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => '5955b79bfe79491f4759b213bf392274'
    );
    $__configuration['QUERY_STRING_AUTH'] = 'SimakPro_access_key';
    /** End Key Auth for Secret Key JWT */

    /** Pusher Realtime */
    $__configuration['PUSHER_APP_ID'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => '965857'
    );
    $__configuration['PUSHER_KEY'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => '48ed041a3c047eb45efc'
    );
    $__configuration['PUSHER_SECRET'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => '05f22616e5e1f5f66e06'
    );
    $__configuration['PUSHER_CLUSTER'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => 'ap1'
    );
    /** End Pusher Realtime */

    /** CORS Support */
    $__configuration['CORS_SUPPORT'] = array(
        'PROD' => true,
        'DEV-LIVE' => true,
        'DEV' => true
    );
    /** End CORS Support */

    /** Email Configuration */
    $__configuration['HOST_EMAIL'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => ''
    );
    $__configuration['NAME_EMAIL'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => ''
    );
    $__configuration['USERNAME_EMAIL'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => ''
    );
    $__configuration['PASSWORD_EMAIL'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => ''
    );
    $__configuration['PORT_EMAIL'] = array(
        'PROD' => 465,
        'DEV-LIVE' => 465,
        'DEV' => 465
    );
    $__configuration['SMTP_SECURE_EMAIL'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => ''
    ); // tls or ssl
    /** End Email Configuration */

    /** Database Configuration */
    $__configuration['USE_SQL_BUILDER'] = array(
        'PROD' => true,
        'DEV-LIVE' => true,
        'DEV' => true
    );
    $__configuration['DB_HOST'] = array(
        'PROD' => 'localhost',
        'DEV-LIVE' => 'localhost',
        'DEV' => 'localhost'
    );
    $__configuration['DB_USERNAME'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => 'root'
    );
    $__configuration['DB_PASSWORD'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => ''
    );
    $__configuration['DB_NAME'] = array(
        'PROD' => '',
        'DEV-LIVE' => '',
        'DEV' => 'dev-simakpro'
    );
    /** End Database Configuration */
    ```
7. ### Update router.php
    Masih berkutat di folder configuration, buka file router.php
    Sesuaikan code berikut dengan settingan .htaccess masing-masing, jika .htaccess menggunakan versi sub direktori maka pastikan code ini tidak dikomentaari
    ```php
    /** USE THIS CODE IF YOUR PROJECT IN SUBDIRECTORY OR NOT USE SERVER DEV BUILT-IN  */
        $base  = dirname($_SERVER['PHP_SELF']);
        if(ltrim($base, '/')) { 
            $_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'], strlen($base));
        }
    /** USE THIS CODE IF YOUR PROJECT IN SUBDIRECTORY OR NOT USE SERVER DEV BUILT-IN */
    ```
    Jika .htaccess menggunakan versi root, maka komentari code tersebut
8. ### Install Composer jika belum tersedia
9. ### Update Composer
    Buka cmd / PowerShell, arahkan direktori ke project anda, dan lakukan update composer
    ```composer
    C:\xampp\htdocs\SimakPro>composer update
    ```

10. ### Akses aplikasi secara langsung di browser dengan cara biasa / menggunakan fitur server built-in

## Menambah modul baru
> Coming soon

## Menambah library baru
> Coming soon

## Melakukan integrasi dengan 3rd party / aplikasi lain
> Coming soon