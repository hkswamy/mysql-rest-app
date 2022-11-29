const QUERY = {
    SELECT_PROSPECTS: 'SELECT * FROM prospects ORDER BY created_at DESC LIMIT 1000',
    SELECT_PROSPECT: 'SELECT * FROM prospects WHERE id = ?',
    CREATE_PROSPECT: 'INSERT INTO prospects (first_name,last_name, email, phone, address) values (?,?,?,?,?)',
    UPDATE_PROSPECT: 'UPDATE prospects SET first_name = ?,last_name = ?, email = ?, phone = ?, address = ?  WHERE id=?',
    DELETE_PROSPECT: 'DELETE FROM prospects WHERE id=?'
}

export default QUERY;