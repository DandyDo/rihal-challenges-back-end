export const handleGetStudents = (res, db) => {
    db.transaction(trx => {
        trx.select('*')
        .from('students')
        .then(students => res.json(students))
        .catch(trx.rollback);
    })
    .catch(() => res.status(400).json('Failed to fetch students.'));
}