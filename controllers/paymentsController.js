const pool = require("../db/db.js");

exports.getAllPatments = async (req, res) => {
    try {
        const result = await pool.query(`select * from payment`);
        if (result.rowCount > 0) {
            res.status(200).json({
                message: "Ma'lumot yetib keldi",
                data: result.rows
            });
        } else {
            res.status(400).json({ message: "To'lovlar mavjud emas!!!" });
        }
    } catch (error) {
        res.status(404).json({ message: `Xatolik ${error}` });
    }
}

exports.getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`select * from payment where id = $1`, [id]);

        if (result.rowCount > 0) {
            res.status(200).json({
                message: "Ma'lumotlar yetib keldi",
                data: result.rows
            });
        } else {
            res.status(400).json({ message: "To'lov topilmadi" });
        }
    } catch (error) {
        res.status(404).json({ message: `Xatolik: ${error}` });
    }
}

exports.createPaymentForBooking = async (req, res) => {
    try {
        const { bookingid } = req.params;
        const { status, amount } = req.body;

        const bormi = await pool.query(`select * from booking where id = $1`, [bookingid]);

        if (bormi.rowCount > 0) {
            if (status.length > 0) {
                if (amount > 0) {
                    const result = await pool.query(`
                        insert into payment(bookingid, status, amount)
                        values($1, $2, $3)
                        RETURNING *`,
                        [bookingid, status, amount]
                    )
                    if (result.rowCount > 0) {
                        res.status(200).json({ message: "To'lov qo'shildi", data: result.rows });
                    } else {
                        res.status(400).json({ message: "Nimadir xato ketdi. To'lov qo'shilmadi" });
                    }
                } else {
                    res.status(400).json({ message: "Narx kiritilmagan" });
                }
            } else {
                res.status(400).json({ message: "Status kiritilmagan" });
            }
        } else {
            res.status(400).json({ message: "Booking ID noto'g'ri" });
        }
    } catch (error) {
        res.status(404).json({ message: `Xatolik: ${error}` });
    }
}


exports.paymentCustomerAndBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(`
            select payment.id, customers.fullname, customers.phon, booking.bookingdate, booking.status, booking.checkout
            from customers
            join booking
            on booking.id = customers.id
            join payment
            on booking.id = payment.bookingid
            where payment.id = $1`, [id]
        )

        res.status(200).json({message: "Ma'lumot yetib keldi", data: result.rows});
        
    } catch (error) {
        res.status(404).json({ message: `Xatolik: ${error}` });
    }
}