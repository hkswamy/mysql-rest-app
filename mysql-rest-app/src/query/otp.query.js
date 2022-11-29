const OTP_QUERY = {
    SELECT_OTPRECORD: 'SELECT * FROM otprecord ORDER BY created_at DESC LIMIT 1000;',
    SELECT_OTPRECORD: 'SELECT * FROM otprecord WHERE id = ?;',
    CREATE_OTPRECORD: "INSERT dbo.otprecord (id, first_name,last_name, email, phone) OUTPUT INSERTED.id VALUES (@id,@first_name,@last_name,@email,@phone);",
    UPDATE_OTPRECORD: 'UPDATE otprecord SET id = ?, first_name = ?,last_name = ?, email = ?, phone = ?  WHERE id=?;',
    DELETE_OTPRECORD: 'DELETE FROM otprecord WHERE id=?;'
}

export default OTP_QUERY;