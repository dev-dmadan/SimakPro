# Local Development Only

-- Remove commentary if you want build database from zero
# DROP DATABASE IF EXISTS `dev-simakpro`;
# CREATE DATABASE `dev-simakpro`;
# USE `dev-simakpro`;

# End Local Development Only

-- Table Lookup
-- Default from Hello-Framework
DROP TABLE IF EXISTS lookup;
CREATE TABLE IF NOT EXISTS lookup (
    id CHAR(36) NOT NULL,
    name VARCHAR(150) DEFAULT NULL,
    tableName VARCHAR(150) DEFAULT NULL,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_lookup_id PRIMARY KEY (id)
)ENGINE=InnoDB;

-- Table Active Status
-- Default from Hello-Framework
DROP TABLE IF EXISTS active_status;
CREATE TABLE IF NOT EXISTS active_status (
    id CHAR(36) NOT NULL,
    name VARCHAR(150) DEFAULT NULL,
    position TINYINT(1) UNSIGNED DEFAULT 0,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_active_status_id PRIMARY KEY (id)
)ENGINE=InnoDB;

-- Table Type
-- Default from Hello-Framework
DROP TABLE IF EXISTS contact_type;
CREATE TABLE IF NOT EXISTS contact_type (
    id CHAR(36) NOT NULL,
    name VARCHAR(150) DEFAULT NULL,
    position TINYINT(1) UNSIGNED DEFAULT 0,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_contact_type_id PRIMARY KEY (id)
)ENGINE=InnoDB;

-- Table Gender
-- Default from Hello-Framework
DROP TABLE IF EXISTS gender;
CREATE TABLE IF NOT EXISTS gender (
    id CHAR(36) NOT NULL,
    name VARCHAR(150) DEFAULT NULL,
    position TINYINT(1) UNSIGNED DEFAULT 0,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_gender_id PRIMARY KEY (id)
)ENGINE=InnoDB;

-- Table Contact
-- Default from Hello-Framework
DROP TABLE IF EXISTS contact;
CREATE TABLE IF NOT EXISTS contact (
    id CHAR(36) NOT NULL,
    name VARCHAR(255) DEFAULT NULL,
    birthdate DATE DEFAULT NULL,
    genderId CHAR(36) DEFAULT NULL,
    address TEXT DEFAULT NULL,
    email VARCHAR(255) UNIQUE DEFAULT NULL,
    phoneNumber VARCHAR(150) DEFAULT NULL,
    image TEXT DEFAULT NULL,
    contact_typeId CHAR(36) NOT NULL,
    active_statusId CHAR(36) NOT NULL,
    saldo DOUBLE(14,2) DEFAULT 0, -- only for kas kecil and kas besar
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by CHAR(36) DEFAULT NULL,
    modified_by CHAR(36) DEFAULT NULL,

    CONSTRAINT pk_contact_id PRIMARY KEY (id),
    CONSTRAINT fk_contact_genderId FOREIGN KEY (genderId) REFERENCES gender (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_contact_contact_typeId FOREIGN KEY (contact_typeId) REFERENCES contact_type (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_contact_active_statusId FOREIGN KEY (active_statusId) REFERENCES active_status (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_contact_created_by FOREIGN KEY (created_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_contact_modified_by FOREIGN KEY (modified_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB;

-- Table User
-- Default from Hello-Framework
DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user (
    id CHAR(36) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    contactId CHAR(36) NOT NULL,
    active_statusId CHAR(36) NOT NULL,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by CHAR(36) DEFAULT NULL,
    modified_by CHAR(36) DEFAULT NULL,

    CONSTRAINT pk_user_id PRIMARY KEY (id),
    CONSTRAINT fk_user_contactId FOREIGN KEY (contactId) REFERENCES contact (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_user_active_statusId FOREIGN KEY (active_statusId) REFERENCES active_status (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_user_created_by FOREIGN KEY (created_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_user_modified_by FOREIGN KEY (modified_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB;

-- Table Access
-- Default from Hello-Framework
DROP TABLE IF EXISTS access;
CREATE TABLE IF NOT EXISTS access (
    id CHAR(36) NOT NULL, 
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    icon VARCHAR(255) DEFAULT NULL,
    router VARCHAR(255) NOT NULL,
    position TINYINT(1) UNSIGNED DEFAULT 0,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_access_id PRIMARY KEY (id)
)ENGINE=InnoDB;

-- Table Access Right
-- Default from Hello-Framework
DROP TABLE IF EXISTS access_right;
CREATE TABLE IF NOT EXISTS access_right (
    id CHAR(36) NOT NULL, 
    userId CHAR(36) NOT NULL,
    accessId CHAR(36) NOT NULL,
    isCanInsert TINYINT(1) DEFAULT 0,
    isCanUpdate TINYINT(1) DEFAULT 0,
    isCanDelete TINYINT(1) DEFAULT 0,
    isCanRead TINYINT(1) DEFAULT 0,
    isCanExport TINYINT(1) DEFAULT 0,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_access_right_id PRIMARY KEY (id),
    CONSTRAINT fk_access_right_userId FOREIGN KEY (userId) REFERENCES user (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_access_right_accessId FOREIGN KEY (accessId) REFERENCES access (id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB;


# Custom Table

-- Table Bank
DROP TABLE IF EXISTS bank;
CREATE TABLE IF NOT EXISTS bank (
    id CHAR(36) NOT NULL,
    name VARCHAR(250) DEFAULT NULL,
    saldo DOUBLE(14,2) DEFAULT 0,
    active_statusId CHAR(36) NOT NULL,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by CHAR(36) DEFAULT NULL,
    modified_by CHAR(36) DEFAULT NULL,

    CONSTRAINT pk_bank_id PRIMARY KEY (id),
    CONSTRAINT fk_bank_active_statusId FOREIGN KEY (active_statusId) REFERENCES active_status (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_bank_created_by FOREIGN KEY (created_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_bank_modified_by FOREIGN KEY (modified_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB;

-- Table Mutasi Bank
DROP TABLE IF EXISTS mutasi_bank;
CREATE TABLE IF NOT EXISTS mutasi_bank (
    id CHAR(36) NOT NULL,
    bankId CHAR(36) NOT NULL,
    date DATE DEFAULT NULL,
    credit DOUBLE(14,2) DEFAULT 0,
    debt DOUBLE(14,2) DEFAULT 0,
    saldo DOUBLE(14,2) DEFAULT 0,
    notes TEXT DEFAULT NULL,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by CHAR(36) DEFAULT NULL,
    modified_by CHAR(36) DEFAULT NULL,

    CONSTRAINT pk_mutasi_bank_id PRIMARY KEY (id),
    CONSTRAINT fk_mutasi_bank_bankId FOREIGN KEY (bankId) REFERENCES bank (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_mutasi_bank_created_by FOREIGN KEY (created_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_mutasi_bank_modified_by FOREIGN KEY (modified_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB;

-- Table History Transaksi
DROP TABLE IF EXISTS transaction_history;
CREATE TABLE IF NOT EXISTS transaction_history (
    id CHAR(36) NOT NULL,
    contactId CHAR(36) NOT NULL,
    date DATE DEFAULT NULL,
    credit DOUBLE(14,2) DEFAULT 0,
    debt DOUBLE(14,2) DEFAULT 0,
    saldo DOUBLE(14,2) DEFAULT 0,
    notes TEXT DEFAULT NULL,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by CHAR(36) DEFAULT NULL,
    modified_by CHAR(36) DEFAULT NULL,

    CONSTRAINT pk_transaction_history_id PRIMARY KEY (id),
    CONSTRAINT fk_transaction_history_contactId FOREIGN KEY (contactId) REFERENCES contact (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_transaction_history_created_by FOREIGN KEY (created_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_transaction_history_modified_by FOREIGN KEY (modified_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB;

-- Table Status Proyek
DROP TABLE IF EXISTS project_status;
CREATE TABLE IF NOT EXISTS project_status (
    id CHAR(36) NOT NULL,
    name VARCHAR(150) DEFAULT NULL,
    position TINYINT(1) UNSIGNED DEFAULT 0,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_project_status_id PRIMARY KEY (id)
)ENGINE=InnoDB;

-- Table Proyek
DROP TABLE IF EXISTS project;
CREATE TABLE IF NOT EXISTS project (
    id CHAR(36) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) DEFAULT NULL,
    owner VARCHAR(255) DEFAULT NULL,
    date DATE DEFAULT NULL,
    address TEXT DEFAULT NULL,
    luas_area DOUBLE(10,2) UNSIGNED DEFAULT 0,
    kota VARCHAR(255) DEFAULT NULL,
    estimasi SMALLINT UNSIGNED DEFAULT NULL, -- estimasi waktu dalam bulan
    total DOUBLE(14,2) UNSIGNED DEFAULT 0, -- total nilai rab
    dp DOUBLE(14,2) UNSIGNED DEFAULT 0, -- dp
    cco DOUBLE(14,2) UNSIGNED DEFAULT 0, -- change contract order
    sisa DOUBLE(14,2) DEFAULT 0,
    progress TINYINT UNSIGNED DEFAULT 0,
    project_statusId CHAR(36) NOT NULL,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by CHAR(36) DEFAULT NULL,
    modified_by CHAR(36) DEFAULT NULL,

    CONSTRAINT pk_project_id PRIMARY KEY(id),
    CONSTRAINT fk_project_project_statusId FOREIGN KEY (project_statusId) REFERENCES project_status (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_project_created_by FOREIGN KEY (created_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_project_modified_by FOREIGN KEY (modified_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDb;

-- Table pembayaran proyek
DROP TABLE IF EXISTS project_payment;
CREATE TABLE IF NOT EXISTS project_payment (
    id CHAR(36) NOT NULL,
    projectId CHAR(36) NOT NULL,
    bankId CHAR(36) NOT NULL,
    date DATE DEFAULT NULL,
    name VARCHAR(255) DEFAULT NULL, -- nama pembayaran
    total DOUBLE(14,2) UNSIGNED DEFAULT 0, -- total angsuran
    isDP TINYINT DEFAULT 0, -- check DP atau bukan (1: DP, 0: Bukan)
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by CHAR(36) DEFAULT NULL,
    modified_by CHAR(36) DEFAULT NULL,

    CONSTRAINT pk_project_payment_id PRIMARY KEY(id),
    CONSTRAINT fk_project_payment_projectId FOREIGN KEY(projectId) REFERENCES project (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_project_payment_bankId FOREIGN KEY(bankId) REFERENCES bank (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_project_payment_created_by FOREIGN KEY (created_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_project_payment_modified_by FOREIGN KEY (modified_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDb;

-- Table SKK Proyek
DROP TABLE IF EXISTS project_skk;
CREATE TABLE IF NOT EXISTS project_skk(
    id CHAR(36) NOT NULL,
    projectId CHAR(36) NOT NULL,
    subKasKecilId CHAR(36) NOT NULL,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by CHAR(36) DEFAULT NULL,
    modified_by CHAR(36) DEFAULT NULL,

    CONSTRAINT pk_project_skk_id PRIMARY KEY(id),
    CONSTRAINT fk_project_skk_proyekId FOREIGN KEY(projectId) REFERENCES project (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_project_skk_subKasKecilId FOREIGN KEY(subKasKecilId) REFERENCES contact (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_project_skk_created_by FOREIGN KEY (created_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_project_skk_modified_by FOREIGN KEY (modified_by) REFERENCES contact (id) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDb;

-- Table Status Pembayaran
DROP TABLE IF EXISTS payment_status;
CREATE TABLE IF NOT EXISTS payment_status (
    id CHAR(36) NOT NULL,
    name VARCHAR(150) DEFAULT NULL,
    position TINYINT(1) UNSIGNED DEFAULT 0,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_payment_status_id PRIMARY KEY (id)
)ENGINE=InnoDB;

-- Table Jenis Pembayaran
DROP TABLE IF EXISTS payment_type;
CREATE TABLE IF NOT EXISTS payment_type (
    id CHAR(36) NOT NULL,
    name VARCHAR(150) DEFAULT NULL,
    position TINYINT(1) UNSIGNED DEFAULT 0,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_payment_type_id PRIMARY KEY (id)
)ENGINE=InnoDB;

-- Table Jenis Operasional
DROP TABLE IF EXISTS operational_type;
CREATE TABLE IF NOT EXISTS operational_type (
    id CHAR(36) NOT NULL,
    name VARCHAR(150) DEFAULT NULL,
    position TINYINT(1) UNSIGNED DEFAULT 0,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_operational_type_id PRIMARY KEY (id)
)ENGINE=InnoDB;

-- Table Jenis Pengeluaran
DROP TABLE IF EXISTS spend_type;
CREATE TABLE IF NOT EXISTS spend_type (
    id CHAR(36) NOT NULL,
    name VARCHAR(150) DEFAULT NULL,
    position TINYINT(1) UNSIGNED DEFAULT 0,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_spend_type_id PRIMARY KEY (id)
)ENGINE=InnoDB;

-- Table Status Pengajuan / Laporan
DROP TABLE IF EXISTS report_status;
CREATE TABLE IF NOT EXISTS report_status (
    id CHAR(36) NOT NULL,
    name VARCHAR(150) DEFAULT NULL,
    position TINYINT(1) UNSIGNED DEFAULT 0,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_report_status_id PRIMARY KEY (id)
)ENGINE=InnoDB;




-- Table operasional_proyek
-- DROP TABLE IF EXISTS operasional_proyek;
-- CREATE TABLE IF NOT EXISTS operasional_proyek(
--     id CHAR(36) NOT NULL,
--     name VARCHAR(255) DEFAULT NULL,
--     proyekId CHAR(36) NOT NULL,
--     id_kas_besar VARCHAR(10) DEFAULT NULL, -- fk kas besar
--     id_distributor VARCHAR(10) DEFAULT NULL, -- fk distributor
--     date DATE DEFAULT NULL,
--     jenis ENUM('TEKNIS', 'NON-TEKNIS') DEFAULT NULL, -- jenis operasional,
--     -- jenis_id INT UNSIGNED DEFAULT NULL,
--     total DOUBLE(14,2) UNSIGNED DEFAULT 0, -- total operasional
--     sisa DOUBLE(14,2) UNSIGNED DEFAULT 0, -- sisa jika bayar secara cicil, default 0
--     status ENUM('TUNAI', 'KREDIT') DEFAULT NULL, -- T: Tunai, K: Kredit
--     -- jenis_pembayaran_id INT UNSIGNED DEFAULT NULL,
--     status_lunas ENUM('LUNAS', 'BELUM LUNAS') DEFAULT NULL, -- L: Lunas, B: Belum Lunas
--     notes TEXT DEFAULT NULL,

--     created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     modified_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     created_by VARCHAR(50) DEFAULT NULL, -- who created first
--     modified_by VARCHAR(50) DEFAULT NULL, -- who last edit

--     CONSTRAINT pk_operasional_proyek_id PRIMARY KEY(id),
--     CONSTRAINT fk_operasional_proyek_id_proyek FOREIGN KEY(id_proyek) REFERENCES proyek(id)
--         ON DELETE RESTRICT ON UPDATE CASCADE,
--     CONSTRAINT fk_operasional_proyek_id_kas_besar FOREIGN KEY(id_kas_besar) REFERENCES kas_besar(id)
--         ON DELETE RESTRICT ON UPDATE CASCADE,
--     CONSTRAINT fk_operasional_proyek_id_distributor FOREIGN KEY(id_distributor) REFERENCES distributor(id)
--         ON DELETE SET NULL ON UPDATE CASCADE,
--     -- CONSTRAINT fk_operasional_jenis_id FOREIGN KEY(jenis_id) REFERENCES jenis_operasional_lookup(id)
--     --     ON DELETE RESTRICT ON UPDATE CASCADE,
--     -- CONSTRAINT fk_operasional_jenis_pembayaran_id FOREIGN KEY(jenis_pembayaran_id) REFERENCES jenis_pembayaran_lookup(id)
--     --     ON DELETE RESTRICT ON UPDATE CASCADE,
--     -- CONSTRAINT fk_operasional_status_id FOREIGN KEY(status_id) REFERENCES status_lunas_lookup(id)
--     --     ON DELETE RESTRICT ON UPDATE CASCADE,
--     CONSTRAINT fk_operasional_proyek_created_by FOREIGN KEY(created_by) REFERENCES user(username)
--         ON DELETE SET NULL ON UPDATE CASCADE,
--     CONSTRAINT fk_operasional_proyek_modified_by FOREIGN KEY(modified_by) REFERENCES user(username)
--         ON DELETE SET NULL ON UPDATE CASCADE
-- )ENGINE=InnoDb;

# End Custom Table