-- seeder lookup
INSERT INTO lookup (id, name, tableName) 
VALUES 
    ('5ab042f3-9925-4e19-a516-ea86fa600433', 'Status Aktif', 'active_status'),
    ('d476cb45-bb0f-4c97-9594-aaaf22a02a7c', 'Jenis Kontak', 'contact_type'),
    ('039a2ec5-e8c0-485b-a975-17a0411c618a', 'Gender', 'gender'),
    ('51416461-9b4b-4b79-a45d-294d7ffd75d1', 'Status Proyek', 'project_status'),
    ('4656f30c-a0cd-4b0c-bee6-f9e3a2580850', 'Status Pembayaran', 'payment_status'),
    ('d0839488-f2cb-4c35-9fc3-6bbbcd0169cd', 'Jenis Pembayaran', 'payment_type'),
    ('0c69d5f3-c460-48ea-a097-23f6882729c4', 'Jenis Operasional', 'operational_type'),
    ('c84d43eb-1cdc-43ef-b8bc-5f399385885a', 'Jenis Pengeluaran', 'spend_type'),
    ('6f4750a5-60eb-4f2b-92c2-98dbac0ef889', 'Status Laporan', 'report_status');

-- seeder active_status
INSERT INTO active_status (id, name, position) 
VALUES 
    ('817c906f-5638-49f2-8ef2-3c49bbbfc86f', 'Aktif', 1),
    ('0dda02b9-0bfd-4a5f-a37a-0610ff572892', 'Non Aktif', 2);

-- seeder type
INSERT INTO contact_type (id, name, position) 
VALUES 
    ('0fd07207-128d-46c3-8189-df98f0a894a1', 'System Administrator', 1),
    ('0752ce08-41ae-4d0e-9fbc-e5625374c700', 'Owner', 2),
    ('05c55aa1-ce23-43a7-b891-91056678e684', 'Kas Besar', 3),
    ('4c100417-3c19-461a-8f6f-f3ecb529849e', 'Kas Kecil', 4),
    ('be09b7c5-3be3-424e-81a6-ca665e2fc4db', 'Sub Kas Kecil', 5);

-- seeder gender
INSERT INTO gender (id, name, position) 
VALUES 
    ('994de175-0e52-4d2c-81c3-7ec220323cea', 'Pria', 1),
    ('2c3d56d8-99e4-4dbe-9b70-9401cb93da42', 'Wanita', 2);

-- seeder contact
INSERT INTO contact (id, name, contact_typeId, active_statusId) 
VALUES 
    ('296986a3-2fd0-46dc-adc9-25ab4fccf490', 'Supervisor', '0fd07207-128d-46c3-8189-df98f0a894a1', '817c906f-5638-49f2-8ef2-3c49bbbfc86f'),
    ('16f18b1b-9e62-41df-90a1-f104271f969e', 'Owner', '0752ce08-41ae-4d0e-9fbc-e5625374c700', '817c906f-5638-49f2-8ef2-3c49bbbfc86f'),
    ('044b220c-83f7-40be-9b70-e3aa6039db69', 'Kas Besar', '05c55aa1-ce23-43a7-b891-91056678e684', '817c906f-5638-49f2-8ef2-3c49bbbfc86f'),
    ('ab78d3b6-3123-414f-a48d-c80e2c66417d', 'Kas Kecil 1', '4c100417-3c19-461a-8f6f-f3ecb529849e', '817c906f-5638-49f2-8ef2-3c49bbbfc86f'),
    ('66188caf-d7b4-48cc-8c0b-f8aa92cf3ff1', 'Kas Kecil 2', '4c100417-3c19-461a-8f6f-f3ecb529849e', '817c906f-5638-49f2-8ef2-3c49bbbfc86f'),
    ('1329bfe3-daf5-464a-92e5-91743be5a627', 'Sub Kas Kecil 1', 'be09b7c5-3be3-424e-81a6-ca665e2fc4db', '817c906f-5638-49f2-8ef2-3c49bbbfc86f'),
    ('d34f5138-6d2e-4c4c-a36d-d05efe257f9f', 'Sub Kas Kecil 2', 'be09b7c5-3be3-424e-81a6-ca665e2fc4db', '817c906f-5638-49f2-8ef2-3c49bbbfc86f');

-- seeder user
INSERT INTO user (id, username, password, contactId, active_statusId) 
VALUES 
    ('73eeb453-bd43-4bbe-a58c-5533418d80d2', 'Supervisor', '$2y$10$xCodwAh2QeXbnzhDsM4I4.PPq.7ddW06THns63kU/j9mgaGHTm2yi', '296986a3-2fd0-46dc-adc9-25ab4fccf490', '817c906f-5638-49f2-8ef2-3c49bbbfc86f'),
    ('a29f712d-858a-41e0-b5b2-ec8143d955c9', 'Owner', '$2y$10$xCodwAh2QeXbnzhDsM4I4.PPq.7ddW06THns63kU/j9mgaGHTm2yi', '16f18b1b-9e62-41df-90a1-f104271f969e', '817c906f-5638-49f2-8ef2-3c49bbbfc86f'),
    ('51db891a-2a34-498f-9205-f535328dbca3', 'KasBesar', '$2y$10$xCodwAh2QeXbnzhDsM4I4.PPq.7ddW06THns63kU/j9mgaGHTm2yi', '044b220c-83f7-40be-9b70-e3aa6039db69', '817c906f-5638-49f2-8ef2-3c49bbbfc86f'),
    ('52c6bcae-2fe4-4257-92b3-c6ba1b7feeeb', 'KasKecil1', '$2y$10$xCodwAh2QeXbnzhDsM4I4.PPq.7ddW06THns63kU/j9mgaGHTm2yi', 'ab78d3b6-3123-414f-a48d-c80e2c66417d', '817c906f-5638-49f2-8ef2-3c49bbbfc86f'),
    ('32340610-299a-4bce-9cba-931890c875a6', 'KasKecil2', '$2y$10$xCodwAh2QeXbnzhDsM4I4.PPq.7ddW06THns63kU/j9mgaGHTm2yi', '66188caf-d7b4-48cc-8c0b-f8aa92cf3ff1', '817c906f-5638-49f2-8ef2-3c49bbbfc86f'),
    ('0bd60436-0123-43a2-a089-ef245a0b09b3', 'SubKasKecil1', '$2y$10$xCodwAh2QeXbnzhDsM4I4.PPq.7ddW06THns63kU/j9mgaGHTm2yi', '1329bfe3-daf5-464a-92e5-91743be5a627', '817c906f-5638-49f2-8ef2-3c49bbbfc86f'),
    ('2ce7b3ef-05a0-4f88-b0bf-c0d4bba66c50', 'SubKasKecil2', '$2y$10$xCodwAh2QeXbnzhDsM4I4.PPq.7ddW06THns63kU/j9mgaGHTm2yi', 'd34f5138-6d2e-4c4c-a36d-d05efe257f9f', '817c906f-5638-49f2-8ef2-3c49bbbfc86f');

-- seeder access
INSERT INTO access (id, name, title, icon, router, position) 
VALUES 
    ('f704f49f-3d30-4c1d-b433-1cb291df8e0e', 'Home', 'Home', '', '/', 0),
    ('9213a259-f214-4909-bf81-64aebdad32df', 'Contact', 'Contact', '', '/contact', 10),
    ('b1d94165-775d-4092-91ce-3071daea0230', 'KasBesar', 'Kas Besar', '', '/contact/kas-besar', 11),
    ('58761ca0-14cb-4765-b541-d104e1804424', 'KasKecil', 'Kas Kecil', '', '/contact/kas-kecil', 12),
    ('c7749298-a5ac-45fe-8d93-71e3124d516a', 'SubKasKecil', 'Sub Kas Kecil', '', '/contact/sub-kas-kecil', 13),
    ('90a08296-af64-4e89-80d6-2032df2862e5', 'Bank', 'Bank', '', '/bank', 1),
    ('b8ecdb67-7651-4dc6-8c90-b69de6ddb860', 'Proyek', 'Proyek', '', '/proyek', 2),
    ('2bed305e-af08-43e8-b3a3-5193a0989316', 'OperasionalProyek', 'Operasional Proyek', '', '/operasional-proyek', 3),
    ('540f9e7a-61be-4722-bdfd-11767306a485', 'OperasionalPerusahaan', 'Operasional Perusahaan', '', '/operasional-perusahaan', 4),
    ('6b47768a-556a-4903-9bb3-36fa110ff0bb', 'PengajuanKasKecil', 'Pengajuan Kas Kecil', '', '/pengajuan-kas-kecil', 8),
    ('515ad083-81ba-48ba-a416-18dccc3a4b76', 'PengajuanSubKasKecil', 'Pengajuan Sub Kas Kecil', '', '/pengajuan-sub-kas-kecil', 9),
    ('1f74204b-e5d5-4583-ba73-314e41580865', 'Operasional', 'Operasional', '', '/operasional', 5),
    ('78b622e9-143d-42cb-b495-33b732fa7815', 'OperasionalKasKecil', 'Operasional Kas Kecil', '', '/operasional/kas-kecil', 6),
    ('ab3331c4-05ac-42bc-adfa-4e63e990cfc1', 'OperasionalSubKasKecil', 'Operasional Sub Kas Kecil', '', '/operasional/sub-kas-kecil', 7),
    ('3b87a498-9731-410e-bf29-e12de0f00ec4', 'User', 'User', '', '/user', 14),
    ('dff8214d-fa72-4051-9279-79fa87a85f89', 'Lookup', 'Lookup', '', '/lookup', 15);

-- seeder access_right
INSERT INTO access_right (id, userId, accessId, isCanInsert, isCanUpdate, isCanDelete, isCanRead, isCanExport) 
VALUES 
    -- Supervisor
    ('37e62c8e-0950-41d1-8a86-85d3bbb0abcb', '73eeb453-bd43-4bbe-a58c-5533418d80d2', 'f704f49f-3d30-4c1d-b433-1cb291df8e0e', 1, 1, 1, 1, 1), -- Home
    ('813ffee8-9c91-4870-ac0b-bb1a93001c2d', '73eeb453-bd43-4bbe-a58c-5533418d80d2', '9213a259-f214-4909-bf81-64aebdad32df', 1, 1, 1, 1, 1), -- Contact
    ('e5427c04-1163-4e24-8f24-9f8f3a4bbd43', '73eeb453-bd43-4bbe-a58c-5533418d80d2', 'b1d94165-775d-4092-91ce-3071daea0230', 1, 1, 1, 1, 1), -- KasBesar
    ('40644413-9a3a-4d50-8179-5ddaf8df4522', '73eeb453-bd43-4bbe-a58c-5533418d80d2', '58761ca0-14cb-4765-b541-d104e1804424', 1, 1, 1, 1, 1), -- KasKecil
    ('a53a25aa-197f-4366-9ece-a8d848b1d740', '73eeb453-bd43-4bbe-a58c-5533418d80d2', 'c7749298-a5ac-45fe-8d93-71e3124d516a', 1, 1, 1, 1, 1), -- SubKasKecil
    ('9d4d88c6-082b-4ac7-9925-d9daa368d17d', '73eeb453-bd43-4bbe-a58c-5533418d80d2', '90a08296-af64-4e89-80d6-2032df2862e5', 1, 1, 1, 1, 1), -- Bank
    ('8a9401b9-3da7-472d-baad-5c1006004e64', '73eeb453-bd43-4bbe-a58c-5533418d80d2', 'b8ecdb67-7651-4dc6-8c90-b69de6ddb860', 1, 1, 1, 1, 1), -- Proyek
    ('128bcede-c037-4225-ac45-56615ea290f3', '73eeb453-bd43-4bbe-a58c-5533418d80d2', '2bed305e-af08-43e8-b3a3-5193a0989316', 1, 1, 1, 1, 1), -- OperasionalProyek
    ('f2c52cbc-8f28-4820-87ac-647e89437fdc', '73eeb453-bd43-4bbe-a58c-5533418d80d2', '540f9e7a-61be-4722-bdfd-11767306a485', 1, 1, 1, 1, 1), -- OperasionalPerusahaan
    ('be02d4f4-2f77-4a05-a58a-1e591c5fc447', '73eeb453-bd43-4bbe-a58c-5533418d80d2', '6b47768a-556a-4903-9bb3-36fa110ff0bb', 1, 1, 1, 1, 1), -- PengajuanKasKecil
    ('8b7c6d68-725c-4616-bc03-3f0a104cef40', '73eeb453-bd43-4bbe-a58c-5533418d80d2', '515ad083-81ba-48ba-a416-18dccc3a4b76', 1, 1, 1, 1, 1), -- PengajuanSubKasKecil
    ('82c3430f-8a2a-4863-af4a-3a107f35481a', '73eeb453-bd43-4bbe-a58c-5533418d80d2', '1f74204b-e5d5-4583-ba73-314e41580865', 1, 1, 1, 1, 1), -- Operasional
    ('f6347815-d9a1-453c-a151-25b0894e822d', '73eeb453-bd43-4bbe-a58c-5533418d80d2', '78b622e9-143d-42cb-b495-33b732fa7815', 1, 1, 1, 1, 1), -- OperasionalKasKecil
    ('0ceb559d-fc0b-4ca3-9e92-9a1395357b1f', '73eeb453-bd43-4bbe-a58c-5533418d80d2', 'ab3331c4-05ac-42bc-adfa-4e63e990cfc1', 1, 1, 1, 1, 1), -- OperasionalSubKasKecil
    ('e584e768-e291-4b21-8dca-b07bf965c235', '73eeb453-bd43-4bbe-a58c-5533418d80d2', '3b87a498-9731-410e-bf29-e12de0f00ec4', 1, 1, 1, 1, 1), -- User
    ('2fde00f6-9e00-4c8a-b9ae-c1f306655ab1', '73eeb453-bd43-4bbe-a58c-5533418d80d2', 'dff8214d-fa72-4051-9279-79fa87a85f89', 1, 1, 1, 1, 1), -- Lookup

    -- Owner
    ('aa24d677-9f88-420c-9093-d26bf7b57fe1', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', 'f704f49f-3d30-4c1d-b433-1cb291df8e0e', 0, 0, 0, 1, 1), -- Home
    ('58f88fb6-d629-49be-bbe3-eca18df1bed8', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', '9213a259-f214-4909-bf81-64aebdad32df', 0, 0, 0, 1, 1), -- Contact
    ('ebbcf0b3-d53b-4d8b-befb-63f08a88756a', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', 'b1d94165-775d-4092-91ce-3071daea0230', 0, 0, 0, 1, 1), -- KasBesar
    ('9e601a3e-c8fa-4719-8f3a-5b1b19be3f16', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', '58761ca0-14cb-4765-b541-d104e1804424', 0, 0, 0, 1, 1), -- KasKecil
    ('7fd44398-5f4d-4d7a-ada3-71d98dc71e70', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', 'c7749298-a5ac-45fe-8d93-71e3124d516a', 0, 0, 0, 1, 1), -- SubKasKecil
    ('44892635-700e-49ff-9249-29ef408b03a0', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', '90a08296-af64-4e89-80d6-2032df2862e5', 0, 0, 0, 1, 1), -- Bank
    ('5e031d48-4cb4-4807-993d-aa381480a34f', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', 'b8ecdb67-7651-4dc6-8c90-b69de6ddb860', 0, 0, 0, 1, 1), -- Proyek
    ('1880941e-e045-4164-91d4-68587bf16a27', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', '2bed305e-af08-43e8-b3a3-5193a0989316', 0, 0, 0, 1, 1), -- OperasionalProyek
    ('96b2250e-c695-40b8-bf11-5db735d077cf', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', '540f9e7a-61be-4722-bdfd-11767306a485', 0, 0, 0, 1, 1), -- OperasionalPerusahaan
    ('fd1ec76b-2f49-404c-b20d-26816e13193c', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', '6b47768a-556a-4903-9bb3-36fa110ff0bb', 0, 0, 0, 1, 1), -- PengajuanKasKecil
    ('fa1fa203-1fcd-439b-98e6-72f0c337c223', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', '515ad083-81ba-48ba-a416-18dccc3a4b76', 0, 0, 0, 1, 1), -- PengajuanSubKasKecil
    ('d9e25b49-7439-4520-a066-920cc07e8342', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', '1f74204b-e5d5-4583-ba73-314e41580865', 0, 0, 0, 1, 1), -- Operasional
    ('bd5994cd-7e4f-4896-b7e2-77a0f2966478', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', '78b622e9-143d-42cb-b495-33b732fa7815', 0, 0, 0, 1, 1), -- OperasionalKasKecil
    ('286f3d8f-17ac-4f29-b8af-0a4beaae4ec1', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', 'ab3331c4-05ac-42bc-adfa-4e63e990cfc1', 0, 0, 0, 1, 1), -- OperasionalSubKasKecil
    ('e8d7f123-69f0-40ad-9c37-eb75b2ad6d2b', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', '3b87a498-9731-410e-bf29-e12de0f00ec4', 0, 0, 0, 1, 1), -- User
    ('a0c97cb2-a25e-4798-89d8-327fe318eb70', 'a29f712d-858a-41e0-b5b2-ec8143d955c9', 'dff8214d-fa72-4051-9279-79fa87a85f89', 0, 0, 0, 1, 1), -- Lookup

    -- Kas Besar
    ('c225ae73-a925-4666-9429-65c6cd83ab47', '51db891a-2a34-498f-9205-f535328dbca3', 'f704f49f-3d30-4c1d-b433-1cb291df8e0e', 1, 1, 1, 1, 1), -- Home
    ('b7d4f995-7dbc-4ed3-8485-26e7708aaeb0', '51db891a-2a34-498f-9205-f535328dbca3', 'b1d94165-775d-4092-91ce-3071daea0230', 1, 1, 1, 1, 1), -- KasBesar
    ('49884065-0d67-4673-8f21-4d3a418bcce9', '51db891a-2a34-498f-9205-f535328dbca3', '58761ca0-14cb-4765-b541-d104e1804424', 1, 1, 1, 1, 1), -- KasKecil
    ('eacbdb16-a802-45dd-a2e5-9be9671d1391', '51db891a-2a34-498f-9205-f535328dbca3', 'c7749298-a5ac-45fe-8d93-71e3124d516a', 1, 1, 1, 1, 1), -- SubKasKecil
    ('10c5c757-e988-4e5e-9ba5-b33130457c7e', '51db891a-2a34-498f-9205-f535328dbca3', '90a08296-af64-4e89-80d6-2032df2862e5', 1, 1, 1, 1, 1), -- Bank
    ('acfb790b-4144-4e88-b8ed-110b44903b16', '51db891a-2a34-498f-9205-f535328dbca3', 'b8ecdb67-7651-4dc6-8c90-b69de6ddb860', 1, 1, 1, 1, 1), -- Proyek
    ('272d6c22-08fd-4155-99fb-557e99a76011', '51db891a-2a34-498f-9205-f535328dbca3', '2bed305e-af08-43e8-b3a3-5193a0989316', 1, 1, 1, 1, 1), -- OperasionalProyek
    ('d7d8ddd5-db35-4253-8d20-6eb21a4db6fe', '51db891a-2a34-498f-9205-f535328dbca3', '540f9e7a-61be-4722-bdfd-11767306a485', 1, 1, 1, 1, 1), -- OperasionalPerusahaan
    ('1b96785c-d74d-4333-becc-889a6601d67b', '51db891a-2a34-498f-9205-f535328dbca3', '6b47768a-556a-4903-9bb3-36fa110ff0bb', 0, 1, 1, 1, 1), -- PengajuanKasKecil
    ('39f18633-39e6-4fc5-b35b-0a2c2a01f0f5', '51db891a-2a34-498f-9205-f535328dbca3', '515ad083-81ba-48ba-a416-18dccc3a4b76', 0, 1, 1, 1, 1), -- PengajuanSubKasKecil
    ('81385aae-c67c-4950-8ced-9d35264783cb', '51db891a-2a34-498f-9205-f535328dbca3', '78b622e9-143d-42cb-b495-33b732fa7815', 0, 0, 0, 1, 1), -- OperasionalKasKecil
    ('8ed8b5f3-8c2e-4524-8548-c8baaed58005', '51db891a-2a34-498f-9205-f535328dbca3', 'ab3331c4-05ac-42bc-adfa-4e63e990cfc1', 0, 0, 0, 1, 1), -- OperasionalSubKasKecil
    ('405301f0-cdec-4c7c-b930-582a9a665d5d', '51db891a-2a34-498f-9205-f535328dbca3', '3b87a498-9731-410e-bf29-e12de0f00ec4', 1, 1, 1, 1, 1), -- User
    ('7cf36098-a980-41a5-93d5-259fd812272b', '51db891a-2a34-498f-9205-f535328dbca3', 'dff8214d-fa72-4051-9279-79fa87a85f89', 0, 1, 0, 1, 1), -- Lookup

    -- Kas Kecil 1
    ('abf18005-5cd8-42eb-bddb-e021bdab4931', '52c6bcae-2fe4-4257-92b3-c6ba1b7feeeb', 'f704f49f-3d30-4c1d-b433-1cb291df8e0e', 1, 1, 1, 1, 1), -- Home
    ('c57a4d25-3fbe-4b36-a4a4-2886cda51a5b', '52c6bcae-2fe4-4257-92b3-c6ba1b7feeeb', '58761ca0-14cb-4765-b541-d104e1804424', 1, 1, 1, 1, 1), -- KasKecil
    ('f950b2d4-f347-4cc1-8edb-b6d4c856b575', '52c6bcae-2fe4-4257-92b3-c6ba1b7feeeb', 'c7749298-a5ac-45fe-8d93-71e3124d516a', 1, 1, 1, 1, 1), -- SubKasKecil
    ('4093362d-ffae-489c-ab4e-9afba6768c32', '52c6bcae-2fe4-4257-92b3-c6ba1b7feeeb', 'b8ecdb67-7651-4dc6-8c90-b69de6ddb860', 0, 0, 0, 1, 1), -- Proyek
    ('bb0a25eb-20df-4d55-97b0-ea044c2bb334', '52c6bcae-2fe4-4257-92b3-c6ba1b7feeeb', '2bed305e-af08-43e8-b3a3-5193a0989316', 0, 1, 0, 1, 1), -- OperasionalProyek
    ('355bc6cd-ccdf-4cb2-819b-55c9443c5bfb', '52c6bcae-2fe4-4257-92b3-c6ba1b7feeeb', '6b47768a-556a-4903-9bb3-36fa110ff0bb', 1, 1, 1, 1, 1), -- PengajuanKasKecil
    ('82de2d2c-c78c-47a3-ad91-e56460b2b27a', '52c6bcae-2fe4-4257-92b3-c6ba1b7feeeb', '515ad083-81ba-48ba-a416-18dccc3a4b76', 0, 1, 1, 1, 1), -- PengajuanSubKasKecil
    ('6271cff1-8e82-4f19-91e8-43ff6807a256', '52c6bcae-2fe4-4257-92b3-c6ba1b7feeeb', '78b622e9-143d-42cb-b495-33b732fa7815', 1, 1, 1, 1, 1), -- OperasionalKasKecil
    ('fd116953-e809-4a74-9349-74bb3c5b5120', '52c6bcae-2fe4-4257-92b3-c6ba1b7feeeb', 'ab3331c4-05ac-42bc-adfa-4e63e990cfc1', 0, 0, 0, 1, 1), -- OperasionalSubKasKecil

    -- Kas Kecil 2
    ('e55ed875-871a-40c6-8b71-88a5ddbddea2', '32340610-299a-4bce-9cba-931890c875a6', 'f704f49f-3d30-4c1d-b433-1cb291df8e0e', 1, 1, 1, 1, 1), -- Home
    ('39037fe9-81bb-44b4-b6c6-0eb8f9282994', '32340610-299a-4bce-9cba-931890c875a6', '58761ca0-14cb-4765-b541-d104e1804424', 1, 1, 1, 1, 1), -- KasKecil
    ('d0515027-121b-474b-b12d-76fc974319f6', '32340610-299a-4bce-9cba-931890c875a6', 'c7749298-a5ac-45fe-8d93-71e3124d516a', 1, 1, 1, 1, 1), -- SubKasKecil
    ('244c6d73-1db3-40fd-9b23-cde683135521', '32340610-299a-4bce-9cba-931890c875a6', 'b8ecdb67-7651-4dc6-8c90-b69de6ddb860', 0, 0, 0, 1, 1), -- Proyek
    ('3f9488b9-d437-426c-959c-9543f3e9ec7c', '32340610-299a-4bce-9cba-931890c875a6', '2bed305e-af08-43e8-b3a3-5193a0989316', 0, 1, 0, 1, 1), -- OperasionalProyek
    ('f33abe03-237f-4ad6-8e08-edf563a7fc4d', '32340610-299a-4bce-9cba-931890c875a6', '6b47768a-556a-4903-9bb3-36fa110ff0bb', 1, 1, 1, 1, 1), -- PengajuanKasKecil
    ('22024084-dbf8-4144-af9d-6fe320fb0a3b', '32340610-299a-4bce-9cba-931890c875a6', '515ad083-81ba-48ba-a416-18dccc3a4b76', 0, 1, 1, 1, 1), -- PengajuanSubKasKecil
    ('bd92335b-86c2-4af7-9287-ac621cbe4791', '32340610-299a-4bce-9cba-931890c875a6', '78b622e9-143d-42cb-b495-33b732fa7815', 1, 1, 1, 1, 1), -- OperasionalKasKecil
    ('1eb90ba1-8c17-481b-bb28-0c87cb2d6d56', '32340610-299a-4bce-9cba-931890c875a6', 'ab3331c4-05ac-42bc-adfa-4e63e990cfc1', 0, 0, 0, 1, 1); -- OperasionalSubKasKecil
    

-- seeder project_status
INSERT INTO project_status (id, name, position) 
VALUES 
    ('e752466d-366c-47be-90b7-c29837a88f09', 'Berjalan', 1),
    ('f94c17c1-2027-4966-a641-da7a4797e950', 'Selesai', 2);

-- seeder payment_status
INSERT INTO payment_status (id, name, position) 
VALUES 
    ('3f3ee1e1-0217-41b0-922e-85fe2b116c75', 'Lunas', 1),
    ('133d26fd-d8d9-4687-9a8b-8b51d70e9581', 'Belum Lunas', 2);

-- seeder payment_type
INSERT INTO payment_type (id, name, position) 
VALUES 
    ('a102579b-d898-4375-8a76-1aab9af0a510', 'Tunai', 1),
    ('450b708e-410c-4b8c-8d61-fb7e97721191', 'Kredit', 2);

-- seeder operational_type
INSERT INTO operational_type (id, name, position) 
VALUES 
    ('5c241b2b-f35e-46b6-bf68-fde93f0d9421', 'Uang Masuk', 1),
    ('3df274aa-de03-483b-9d9a-c67d2f0ecc24', 'Uang Keluar', 2);

-- seeder spend_type
INSERT INTO spend_type (id, name, position) 
VALUES 
    ('480c4f81-20cd-472f-a9de-25b082ad7575', 'Teknis', 1),
    ('0d901e84-7267-474d-a39a-846c680db5dd', 'Non Teknis', 2);
    
-- seeder report_status
INSERT INTO report_status (id, name, position) 
VALUES 
    ('ea13eb18-b6f4-454d-a6a9-811f62a0629f', 'Pending', 1),
    ('d94610bf-21af-421e-a717-e26df076f5b4', 'Perbaiki', 2),
    ('cd4cdec5-dfa1-4e1f-86b6-60b9438b95c5', 'Ditolak', 3),
    ('f6a0f727-c612-4ecf-b8eb-41ddb4645d8a', 'Disetujui', 4),
    ('cc0ee845-6dd1-4b2d-8ed1-277725ed3c68', 'Belum Dikerjakan', 5);