export const handleUpdateClass = (req, res, db) => {
    const { id, class_name } = req.body;

    if (!class_name) {
        res.status(400).json('Something went wrong with the class name.')
    }

    db.transaction(trx => {
        trx.update({ class_name: class_name })
        .into('classes')
        .where('id', '=', id)
        .returning('*')
        .then(newClass => res.json(newClass[0]))
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(() => res.status(400).json('Failed to update class.'));
}