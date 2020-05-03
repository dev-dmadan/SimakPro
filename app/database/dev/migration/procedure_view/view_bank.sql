CREATE OR REPLACE VIEW VwBank AS
SELECT 
    b.id id,
    b.name name,
    b.saldo saldo,
    b.active_statusId active_statusId,
    ac.name active_status,
    b.created_on created_on,
    b.modified_on modified_on,
    b.created_by created_byId,
    c1.name created_by,
    b.modified_by modified_byId,
    c2.name modified_by
FROM bank b 
LEFT JOIN active_status ac ON ac.id = b.active_statusId
LEFT JOIN contact c1 ON c1.id = b.created_by
LEFT JOIN contact c2 ON c2.id = b.modified_by;