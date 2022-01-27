export const handleAddstudent = (req, res, db) => {
    const { class_id, country_id, name, birthdate } = req.body;

    if (!class_id || !country_id || !name || !birthdate) {
        res.status(400).json('Something went wrong with the student\'s credentials.')
    }

    db.transaction(trx => {
        trx.insert({ 
            class_id: class_id,
            country_id: country_id,
            name: name,
            birthdate: birthdate
        })
        .into('students')
        .returning('*')
        .then(newstudent => res.json(newstudent[0]))
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(() => res.status(400).json('Failed to add student.'));
}