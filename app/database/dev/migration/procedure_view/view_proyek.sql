CREATE OR REPLACE VIEW VwProyek AS
SELECT 
    p.id id,
    p.code code,
    p.name name,
    p.owner owner,
    p.date date,
    p.address address,
    p.luas_area luas_area,
    p.kota kota,
    p.estimasi estimasi,
    p.total total,
    p.dp dp,
    p.cco cco,
    p.sisa sisa,
    p.progress progress,
    p.project_statusId project_statusId,
    ps.name project_status,
    p.created_on created_on,
    p.modified_on modified_on,
    p.created_by created_byId,
    c1.name created_by,
    p.modified_by modified_byId,
    c2.name modified_by
FROM project p 
LEFT JOIN project_status ps ON ps.id = p.project_statusId
LEFT JOIN contact c1 ON c1.id = p.created_by
LEFT JOIN contact c2 ON c2.id = p.modified_by;