export const handleDeleteCountry = (req, res, db) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json('Something went wrong with the country id.')
    }

    db.transaction(trx => {
        trx.from('countries')
        .where('id', '=', id)
        .del()
        .then(() => res.json('Successfully deleted the country.'))
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(() => res.status(400).json('Failed to delete country.'));
}