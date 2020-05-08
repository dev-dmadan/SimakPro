CREATE OR REPLACE VIEW VwContact AS
SELECT 
    c.id id,
    c.name name,
    c.birthdate birthdate,
    c.genderId genderId,
    g.name gender,
    c.address address,
    c.email email,
    c.phoneNumber phoneNumber,
    c.image image,
    c.contact_typeId contact_typeId,
    ct.name contact_type,
    c.active_statusId active_statusId,
    ac.name active_status,
    c.saldo saldo,
    c.created_on created_on,
    c.modified_on modified_on,
    c.created_by created_byId,
    c1.name created_by,
    c.modified_by modified_byId,
    c2.name modified_by
FROM contact c 
LEFT JOIN gender g ON g.id = c.genderId
LEFT JOIN contact_type ct ON ct.id = c.contact_typeId
LEFT JOIN active_status ac ON ac.id = c.active_statusId
LEFT JOIN contact c1 ON c1.id = c.created_by
LEFT JOIN contact c2 ON c2.id = c.modified_by;