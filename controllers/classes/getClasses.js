export const handleGetClasses = (res, db) => {
    db.transaction(trx => {
        trx.select()
        .table('classes')
        .then(classes => res.json(classes))
        .catch(trx.rollback);
    })
    .catch(() => res.status(400).json('Failed to fetch classes.'));
}