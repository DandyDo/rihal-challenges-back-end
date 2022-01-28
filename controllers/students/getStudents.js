export const handleGetStudents = (res, db) => {
    db.select().from('students')
    .then(students => res.json(students))
    .catch(() => res.status(400).json('Failed to fetch students.'));
}