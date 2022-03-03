import 'dotenv/config';
import express from 'express';
import axios from 'axios';

import getGoogleErrorMessage from './error.js';

const app = express();

const TIMEZONE_REQUEST_URL = 'https://maps.googleapis.com/maps/api/timezone/json';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;


// get timezone of given coordinates
app.get('/timezone', (req, res) => {
    if (!req.query.lat || !req.query.lng) {
        res.status(400).json({ message: "Missing required params: 'lat', 'lng'" });
        return;
    }
    if (!req.query.timestamp) {
        res.status(400).json({ message: "Missing required params: 'timestamp'" });
        return;
    }

    axios.get(TIMEZONE_REQUEST_URL, {
        params: {
            location: req.query.lat.concat(',', req.query.lng),
            timestamp: req.query.timestamp,
            key: GOOGLE_API_KEY
        }
    })
    .then(response => {
        if (response.data.status !== "OK") {
            const error = getGoogleErrorMessage(response.data.status);
            res.status(error.code).json({ message: error.message });
            return;
        }
        const { data } = response;
        res.json({
            dstOffset: data.dstOffset,
            rawOffset: data.rawOffset,
            timeZoneId: data.timeZoneId,
            timeZoneName: data.timeZoneName
        });
    })
    .catch(err => {
        console.log(err);
        res.status(421).json({message: "Encountered a problem with the request at server end."})
    });
});


app.listen(process.env.PORT || 5000, () => {
    console.log("Server started.");
});