const express = require('express');
const app = express();
const pipedrive = require('pipedrive');
const helper = require('./helper')


const port = process.env.PORT || 3000;
const client = new pipedrive.ApiClient();
const api = new pipedrive.DealsApi(client);

let apiToken = client.authentications.api_key;
apiToken.apiKey = process.env.API_KEY;


app.get('/pipedrive/deals', async (req, res)=>{
    await api.getDeals().then((data)=>{
        const formattedResponse = [];
        for (let d of data.data) {
            let response = helper.createResponseData(d);
            formattedResponse.push(response);
        }
        helper.writeJSON(res, {'deals': formattedResponse});
    }, (error)=>{
        helper.sendError(res, error);
    });

})

app.get('/pipedrive/deal/:id', async (req, res)=>{
    const id = req.params.id;
    await api.getDeal(id).then((data)=>{
        const formattedResponse = helper.createResponseData(data.data);
        helper.writeJSON(res, {'deal': formattedResponse});
    }, (error)=>{
        helper.sendError(res, error);
    })

})

app.post('/pipedrive/deal', async(req, res)=>{
    const deal = helper.createDealData(req);
    const newDeal = pipedrive.NewDeal.constructFromObject({
        title: deal.title,
        value: deal.value,
        currency: deal.currency,
        user_id: deal.user_id,
        person_id: deal.person_id,
        org_id: deal.org_id,
        stage_id: deal.stage_id,
        status: deal.status,
        expected_close_date: deal.expected_close_date,
        visible_to: deal.visible_to
    });

    await api.addDeal(newDeal).then((data) => {
        const formattedResponse = helper.createResponseData(data.data);
        helper.writeJSON(res, {'deal': formattedResponse});
    }, (error) => {
        helper.sendError(res, error);
    } )
})

app.delete('/pipedrive/deal/:id', async (req, res)=>{
    const id = req.params.id;
    await api.deleteDeal(id).then((data)=>{
        helper.writeJSON(res, {'message': 'deal successfully deleted'});
    },(error)=>{
        helper.sendError(res, error);
    })
})


app.listen(port, ()=>{
    console.log(`Serving app on port ${port}`);
})