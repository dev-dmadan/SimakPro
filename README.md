# SimakPro

Simakpro (Sistem Informasi Managemen Proyek)

## Requirement
1. Minimum PHP v7.2.5 / check https://github.com/GastonHeim/Laravel-Requirement-Checker
2. Composer
3. Minimum Node JS v12
4. Minimum Npm v6
5. DBMS MariaDB / MySQL

## Instalasi
Check tutorial video berikut https://www.loom.com/share/e3cedeba4f7846559e304898bc247eb5

Atau

Berikut tata cara instalasi SimakPro:
1. Pastikan composer sudah terinstall dan sudah terdaftar pada PATH environment.
    Jalankan syntax berikut pada terminal untuk mengechek composer sudah terinstall atau belum:
    ```composer
    composer --version
    ```

2. Pastikan node js sudah tersintall dan sudah terdaftar pada PATH environment.
    Jalankan syntax berikut pada terminal untuk mengechek node js sudah terinstall atau belum.
    ```node
    node -v
    ```

3. Pastikan npm sudah terinstall dan sudah terdaftar pada PATH environment.
    Jalankan syntax berikut pada terminal untuk mengechek npm sudah terinstall atau belum.
    ```npm
    npm -v
    ```

4. Clone repository dan simpan pada folder yang diinginkan (tidak wajib harus didalam folder xampp/htdocs). Bisa gunakan desktop app / clone manual.

5. Copy file <strong>.env.example</strong> lalu ubah menjadi <strong>.env</strong>
    Lakukan configurasi pada environment berikut, dan sesuaikan ulang nilainya sesuai kebutuhan:
    - APP_NAME=SimakPro
    - APP_KEY=base64:y9iXVy7YdTWwwoWrOepv20E+bAFRylCaonjEiZlYlxo=
    - APP_URL=http://localhost:8000
    - DB_DATABASE=SimakPro
    - DB_USERNAME=Username
    - DB_PASSWORD=Password
    - PUSHER_APP_ID=YourAPP_ID
    - PUSHER_APP_KEY=YourAPP_KEY
    - PUSHER_APP_SECRET=YourAPP_SECRET
    - PUSHER_APP_CLUSTER=YourAPP_CLUSTER

6. Buat database kosong, sesuaikan namanya dengan environment DB_DATABASE yang ada di file <strong>.env</strong>

7. Jalankan composer install pada terminal
    ```composer
    composer install
    ```
    Tunggu hingga proses selesai dan pastikan folder vendor sudah terinstall.

8. Jalankan composer dump-autoload 
    ```composer
    composer dump-autoload 
    ```
    Tunggu hingga proses selesai.

9. Jalankan php artisan berikut untuk menginstall semua tabel dan seeder default
    ```
    php artisan migrate:fresh --seed
    ```

10. Jalankan npm install pada terminal
    ```npm
    npm install
    ```
    Tunggu hingga proses selesai dan pastikan folder node_modules terinstall

11. Jalankan npm run dev / npm run production
    ```npm
    npm run dev
    ```

12. Jalankan syntax php berikut pada terminal untuk membuat server dev
    ```php
    php -S localhost:8000 -t public
    ```
    Pastikan alamat dan port sama dengan deklarasi APP_URL di file <strong>.env</strong>

13. Test aplikasi dengan membuka alamat yang sudah diset pada browser
