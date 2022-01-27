export const handleDeleteClass = (req, res, db) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json('Something went wrong with the class id.')
    }

    db.transaction(trx => {
        trx.from('classes')
        .where('id', '=', id)
        .del()
        .then(() => res.json('Successfully deleted the class.'))
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(() => res.status(400).json('Failed to delete class.'));
}