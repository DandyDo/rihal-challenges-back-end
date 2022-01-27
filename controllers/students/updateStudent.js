export const handleUpdateStudent = (req, res, db) => {
    const { id, class_id, country_id, name, birthdate } = req.body;

    if (!id || !class_id || !country_id || !name || !birthdate) {
        res.status(400).json('Something went wrong with the student\'s credentials.')
    }

    db.transaction(trx => {
        trx.from('students')
        .where('id', '=', id)
        .update({
            id: id,
            class_id: class_id,
            country_id: country_id,
            name: name,
            birthdate: birthdate
        })
        .returning('*')
        .then(newstudent => res.json(newstudent[0]))
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(() => res.status(400).json('Failed to update student.'));
}