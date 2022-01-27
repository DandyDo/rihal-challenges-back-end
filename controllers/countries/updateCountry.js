export const handleUpdateCountry = (req, res, db) => {
    const { id, country_name } = req.body;

    if (!country_name) {
        res.status(400).json('Something went wrong with the country name.')
    }

    db.transaction(trx => {
        trx.update({ country_name: country_name })
        .into('countries')
        .where('id', '=', id)
        .returning('*')
        .then(newcountry => res.json(newcountry[0]))
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(() => res.status(400).json('Failed to update country.'));
}