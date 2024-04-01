class Helper {
    // create deal data structure for post request
    createDealData(req) {
        const body = req.body;
        return {
            title: body['title'] || '',
            value: body['value'] || 0,
            currency: body['currency'] || 'USD',
            user_id: body['user_id'] || null,
            person_id: body['person_id'] || null,
            org_id: body['org_id'] || null,
            stage_id: body['stage_id'] || 0,
            status: body['status'] || 'open',
            expected_close_date: body['expected_close_date'] || '',
            visible_to: body['visible_to'] || 1
        };

    }

    // creates formatted response data from pipedrive
    createResponseData(data) {
        return {
            id: data.id,
            title: data.title,
            currency: data.currency,
            value: data.value,
            stage_id: data.stage_id,
            status: data.status,
            active: data.active,
            user_id: {
                id: data.user_id.id,
                name: data.user_id.name,
                email: data.user_id.email,
                active_flag: data.user_id.active_flag,
            },
            person_id: data.person_id,
            org_id: data.org_id,
            participants_count: data.participants_count,
            followers_count: data.followers_count,
            visible_to: data.visible_to,
            add_time: data.add_time,
            update_time: data.update_time,
            last_activity_date: data.last_activity_date,

        }
    }

    // method to format response header and send JSON data
    writeJSON(res, data, status=200) {
        const formattedData = JSON.stringify(data, null, 7);
        res.setHeader('Content-Type', 'application/json')
            .status(status)
            .send(formattedData);
    }

    // sends an internal server error and logs error report
    sendError(res, error) {
        console.log(error);
        this.writeJSON(res, {'message': 'the server has encountered an error'}, 500);
    }
}

module.exports = new Helper;