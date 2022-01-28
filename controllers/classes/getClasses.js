export const handleGetClasses = (res, db) => {
    db.select().from('classes')
    .then(classes => res.json(classes))
    .catch(() => res.status(400).json('Failed to fetch classes.'));
}