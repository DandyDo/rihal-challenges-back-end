export const handleGetCountries = (res, db) => {
    db.select().from('countries')
    .then(countries => res.json(countries))
    .catch(() => res.status(400).json('Failed to fetch countries.'));
}