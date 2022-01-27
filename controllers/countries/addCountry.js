export const handleAddCountry = (req, res, db) => {
    const { country_name } = req.body;

    if (!country_name) {
        res.status(400).json('Something went wrong with the country name.')
    }

    db.transaction(trx => {
        trx.insert({ country_name: country_name })
        .into('countries')
        .returning('*')
        .then(newCountry => res.json(newCountry[0]))
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(() => res.status(400).json('Failed to add country.'));
}