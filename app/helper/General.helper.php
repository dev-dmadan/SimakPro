<?php

Defined("BASE_PATH") or die(ACCESS_DENIED);

class General extends Controller {

	/**
	 * Method printCurrency
	 * Print number to currency / money format
	 * @param {int | decimal} value
     * @param {string} currency Default is idr
     * @param {string} thousandSeparator Default is .
     * @param {string} decimalSeparator Default is ,
	 * @return {string}
	 */
	public function printCurrency($value, $currency = 'idr', $thousandSeparator = '.', $decimalSeparator = ',') {
        $currencyList = [
            'idr' => 'Rp',
            'usd' => '$'
        ];

		return $currencyList[$currency]. ' ' .number_format($value, 2, $decimalSeparator, $thousandSeparator);
	}

	/**
	 * Method printNumber
	 * Print beauty number
	 * @param {int | decimal} value
     * @param {int} decimal Default is 2
     * @param {string} thousandSeparator Default is .
     * @param {string} decimalSeparator Default is ,
	 * @return {string}
	 */
	public function printNumber($value, $decimal = 2, $thousandSeparator = '.', $decimalSeparator = ',') {
		return number_format($value, $decimal, $decimalSeparator, $thousandSeparator);
	}

	/**
	 * Method printDate
	 * @param {date} date format must 'yyyy-mm-dd' 
	 * @param {string} format default 'yyyy-mm-dd'
     * @param {string} language Default is indonesia
	 * 		'dd-mm-yyyy' (27-02-1995),
	 * 		'yyyy-mm-dd' (2018-01-01) format default,
	 * 		'd-m-y' (27 Februari 2018),
	 * 		'yyyymmdd' (20180101),
	 * 		'full (Senin, 27 Februari 1995)'
	 * @return {string} result
	 */
	public function printDate($date, $format = 'yyyy-mm-dd', $language = 'indonesia') {
		$days = array(
            'indonesia' => array(
                1 => "Senin",
                2 => "Selasa",
                3 => "Rabu",
                4 => "Kamis",
                5 => "Jumat",
                6 => "Sabtu",
                7 => "Minggu"
            ),
            'english' => array(
                1 => "Monday",
                2 => "Tuesday",
                3 => "Wednesday",
                4 => "Thursday",
                5 => "Friday",
                6 => "Saturday",
                7 => "Monday"
            )
		);

		$months = array(
            'indonesia' => array(
                1 => "Januari",
                2 => "Februari",
                3 => "Maret",
                4 => "April",
                5 => "Mei",
                6 => "Juni",
                7 => "Juli",
                8 => "Agustus",
                9 => "September",
                10 => "Oktober",
                11 => "November",
                12 => "Desember"
            ),
            'english' => array(
                1 => "Januari",
                2 => "Februari",
                3 => "March",
                4 => "April",
                5 => "May",
                6 => "June",
                7 => "July",
                8 => "August",
                9 => "September",
                10 => "October",
                11 => "November",
                12 => "December"
            )
		);

		// explode date
		$tempDate = explode('-', $date);
		$getDate = $tempDate[2];
		$getMonth = $tempDate[1];
		$getYear = $tempDate[0];

		// format date
		switch ($format) {
			case 'dd-mm-yyyy':
				$newDate = "{$getDate}-{$getMonth}-$getYear";
				break;

			case 'd-m-y':
				$newDate = "{$getDate} {$months[$language][(int)$getMonth]}-{$getYear}";
				break;

			case 'yyyymmdd':
				$newDate = $getYear.$getMonth.$getDate;
				break;

			case 'full':
				$newDate = "{$days[$language][date('N', strtotime($date))]}, {$getDate} {$months[$language][(int)$getMonth]} {$getYear}";
				break;

			default: // yyyy-mm-dd
				$newDate = "{$getDate}-{$getMonth}-$getYear";
				break;
		}

		return $newDate;
	}

    /**
     * Method printLookup
     * @param {string} id
     * @param {any} value
     * @param {string} target
     */
    public function printLookup($id, $value, $target = '') {
        return (object)[
            'lookup' => array(
                'id' => $id, 
                'value' => $value, 
                'target' => $target
            )
        ];
    }

    /**
     * Method printAccess
     */
    public function printAccess($id, $accessList) {
        return (object)[
            'access' => array(
                'id' => $id, 
                'accessList' => array(
                    'isCanRead' => $accessList->isCanRead,
                    'isCanUpdate' => $accessList->isCanUpdate,
                    'isCanDelete' => $accessList->isCanDelete
                ),
            )
        ];
    }

	/**
	 * Method setKosong
	 * Fungsi mengganti data yang kosong menjadi '-' (garis strip)
	 * @param data {string}
	 * @return result {string}
	 */
	public function setKosong($data){
		$temp = ($data == "" || empty($data)) ? "-" : $data;
		return $temp;
	}

	/**
	 * Method cekArray
	 * @param data {array}
	 * 
	 * Masih tahap pengembangan
	 */
	public function cekArray($data){
		$check = false;
		foreach($data as $key => $item) {
			if(!$item['delete']) { $check = true; }
		}

		return $check;
	}

	/**
	 * Method reArrayFiles
	 * Proses menyusun multiple file post menjadi array yang mudah dibaca
	 * @param file_post {array}
	 * @return result {array}
	 */
	public function reArrayFiles($file_post) {
		$file_ary = array();
		$file_count = count($file_post['name']);
		$file_keys = array_keys($file_post);

		for ($i=0; $i<$file_count; $i++) {
			foreach ($file_keys as $key) {
				$file_ary[$i][$key] = $file_post[$key][$i];
			}
		}

		return $file_ary;
	}

	/**
	 * Method rollback_file
	 * Proses rollback files / penghapusan file yang sudah diupload di server
	 * @param paths {array / string} path file yang ingin dihapus
	 * @param array {boolean} default false
	 */
	public function rollback_file($paths, $array = false){
		if(!$array) {
			if(file_exists($paths)) { unlink($file); }
		}
		else{
			foreach($paths as $value){
				if(file_exists($value)) { unlink($value); }
			}
		}
	}

	/**
	 * 
	 */
	public function requestError($error = 403, $json = false, $customMessage = "") {
		http_response_code($error);
		switch ($error) {
			case 400:
				$message = ($customMessage == "") ? "Bad Request. Check your parameters." : $customMessage;
				break;
			
			case 403:
				$message = ($customMessage == "") ? "You do not have access to this page." : $customMessage;
				break;
			
			case 404:
				$message = ($customMessage == "") ? "The page you were looking for could not be found." : $customMessage;
				break;

			case 500:
				$message = ($customMessage == "") ? "Whoopps, something went wrong in server." : $customMessage;
				break;

			default:
				header('Content-Type: application/json');
				die(ACCESS_DENIED);
				break;
		}
		
		if(!$json) { 
			require_once ROOT.DS.'app'.DS.'views'.DS.'auth'.DS.'error.php';
		}
		else {
			header('Content-Type: application/json');
			echo json_encode(array(
				'success' => false,
				'message' => $message
			), JSON_PRETTY_PRINT);
		}

		die();
	}

	/**
	 * 
	 */
	private function setStatusPengajuanSKK() {
		return array(
			'1' => 'PENDING',
			'2' => 'PERBAIKI', 
			'3' => 'DISETUJUI', 
			'4' => 'LANGSUNG', 
			'5' => 'DITOLAK',  
		);
	}

	/**
	 * Mendapatkan Nama Status Pengajuan SKK ('PENDING','PERBAIKI',dll)
	 * 
	 * @param id ('1','2','3',dll)
	 * @return nama_status ('PENDING','PERBAIKI',dll) 
	 */
	public function getNamaStatusPengajuanSKK($id) {
		$status_pengajuan = $this->setStatusPengajuanSKK();
		return $status_pengajuan[strtoupper(strval($id))] ?? null;
	}

	/**
	 * Mendapatkan id Status Pengajuan SKK ('1','2','3',dll)
	 * 
	 * @param nama ('PENDING','PERBAIKI',dll)
	 * @return id_status ('1','2','3',dll)
	 */
	public function getIdStatusPengajuanSKK($nama) {
		$status_pengajuan = $this->setStatusPengajuanSKK();
		return array_search(strtoupper($nama), $status_pengajuan) ?? null;
	}

	/**
	 * 
	 */
	private function setStatusLaporanSKK() {
		return array(
			'0' => 'BELUM DIKERJAKAN',
			'1' => 'PENDING',
			'2' => 'PERBAIKI', 
			'3' => 'DISETUJUI', 
			'4' => 'DITOLAK',
		);
	}

	/**
	 * Mendapatkan nama status laporan pengajuan sub kas kecil
	 * 
	 * @param id ('1','2','3')
	 * @return nama_status_laporan ('PENDING','PERBAIKI','DISETUJUI')
	 */
	public function getNamaStatusLaporanSKK($id) {
		$status_laporan = $this->setStatusLaporanSKK();
		return $status_laporan[strtoupper(strval($id))] ?? null;
	}

	/**
	 * mendapatkan id status laporan pengajuan sub kas kecil
	 * 
	 * @param nama ('PENDING','PERBAIKI','DISETUJUI')
	 * @return id_status_laporan ('1','2','3')
	 */
	public function getIdStatusLaporanSKK($nama) {
		$status_laporan = $this->setStatusLaporanSKK();
		return array_search(strtoupper($nama), $status_laporan) ?? null;
	}

	/**
	 * 
	 */
	private function setJenisDetailPengajuanSKK() {
		return array(
			'T' => "TEKNIS",
			'N' => "NON-TEKNIS",
		);
	}

	/**
	 * Mendapatkan nama jenis detail pengajuan sub kas kecil
	 * 
	 * @param id ('T','N')
	 * @return nama_jenis_detail ('TEKNIS','NON-TEKNIS')
	 */
	public function getNamaJenisDetailPengajuanSKK($id) {
		$jenis_detail = $this->setJenisDetailPengajuanSKK();
		return $jenis_detail[strtoupper(strval($id))] ?? null;
	}

	/**
	 * Mendapatkan id jenis detail pengajuan sub kas kecil
	 * 
	 * @param nama ('TEKNIS','NON-TEKNIS')
	 * @return id_jenis_detail ('T','N')
	 */
	public function getIdJenisDetailPengajuanSKK($nama) {
		$jenis_detail = $this->setJenisDetailPengajuanSKK();
		return array_search(strtoupper($nama), $jenis_detail) ?? null; 
	}

	/**
	 * Mengirim notifikasi menggunakan firebase.
	 * 
	 * @param data (array) Data yang ingin dikirimkan dalam notifikasi.
	 * @param priority (string) Setting prioritas notifikasi ('HIGH' atau 'NORMAL').
	 * 
	 */
	public function sendNotif($data, $priority="HIGH") {
		$url = "https://fcm.googleapis.com/fcm/send";

		$headers = array(
			"Authorization : ".KEY_FIREBASE_NOTIFICATION,
			"Content-Type : application/json",
		);

		$post_data = array(
			'to' => "/topics/".TYPE.$data['id_skk'],
			'notification' => array(
				'title' => $data['title'],
				'body' => $data['body'],
				'sound' => "default"
			),
			'data' => [
				'show' => $data['show'] ?? 0,		// (string) "0" => TIDAK DITAMPILKAN, "1" => DITAMPILKAN	
				'id_skk' => $data['id_skk'] ?? "",
				'title' => $data['title'] ?? "",
				'body' => $data['body'] ?? "",
				'refresh' => $data['refresh'] ?? 0,   
					/**
					 * (string) "0" => TIDAK ADA REFRESH, "1" => REFRESH PENGAJUAN, 
					 * 			"2" => REFRESH LAPORAN,	  "3" => REFRESH HISTORI,
					 * 			"4" => REFRESH MUTASI
					 */							        
			],
			'priority' => $priority
		);

		// kirim notif v1
		$this->curlPostExecutor($url, $headers, $post_data);

		// kirim notif v2
		$headers = array(
			"Authorization : ".KEY_FIREBASE_NOTIFICATION_2,
			"Content-Type : application/json",
		);
		$this->curlPostExecutor($url, $headers, $post_data);

		return true;
	}

	/**
	 * Untuk mengirim data (POST).
	 * 
	 * @param url (string) alamat tujuan data POST.
	 * @param headers (array) header POST.
	 * @param post_data (array) data yang dikirimkan.
	 * 
	 * @return (string|bool) Merupakan kode unik pemberitahuan notifikasi pesan telah dikirim, 
	 * 						Jika message_id tidak dikembalikan oleh firebase maka method akan menghasilkan nilai false.
	 */
	public function curlPostExecutor(string $url, array $headers, array $post_data) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
		curl_setopt($ch, CURLOPT_TIMEOUT, '3'); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post_data));
		$result = curl_exec($ch);
		curl_close($ch);

		return json_decode($result, true)['message_id'] ?? false;
	}

}