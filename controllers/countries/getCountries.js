export const handleGetCountries = (res, db) => {
    db.transaction(trx => {
        trx.select()
        .table('countries')
        .then(countries => res.json(countries))
        .catch(trx.rollback);
    })
    .catch(() => res.status(400).json('Failed to fetch countries.'));
}