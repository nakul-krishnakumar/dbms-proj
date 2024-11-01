const express = require("express");
const db = require("../db");

const router = express.Router();

// ROUTE 1: /api/student/addreq
router.post("/addreq", async (req, res) => {
    const { address, reason, startDate, endDate, workDays, sid } = req.body;
    console.log("User Input Application Form: ", req.body);

    try {
        // INSERTING INTO DATABASE
        const { data, error } = await db
        .from('application')
        .insert([
            {
                start_date: startDate,
                end_date: endDate,
                reason: reason,
                leave_addr: address,
                no_of_working_days: workDays,
                student_id: sid,
            }
        ]);

        if (error) {
            console.error("Error inserting into applications:", error);
            return res.status(500).json({ error: "Failed to create new request" });
        }

    } catch(err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }

    return res.status(200).send("Successfully Created New Request!")
})

// ROUTE 2: /api/student/fetchreq
router.post("/fetchreq", async (req, res) => {
    const { userID } = req.body;
    console.log("userid", userID);

    // FETCHING FROM DATABASE
    try {
        const { data, error } = await db
        .from('application')
        .select('app_no, start_date, end_date, reason, no_of_working_days, app_status')
        .eq('student_id', userID);

        console.log(data)

        if (error) {
            console.error("Error fetching applications:", error);
            return res.status(500).json({ error: "Failed to fetch requests" });
        } else {
            return res.status(200).json(data);
        }

    } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }

})

module.exports = router;