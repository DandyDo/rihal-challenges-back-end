export const handleDeleteStudent = (req, res, db) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json('Something went wrong with the student id.')
    }

    db.transaction(trx => {
        trx.from('students')
        .where('id', '=', id)
        .del()
        .then(() => res.json('Successfully deleted the student.'))
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(() => res.status(400).json('Failed to delete student.'));
}