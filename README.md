## API TO CREATE DEALS IN PIPEDRIVE

This is REST api to create deals in pipedrive.

### *Environment Variables*
```
API_KEY='your-pipedrive-api-token'
PORT=(optional, uses default port 3000)
```

### API ENDPOINTS

| Method     | URL Pattern             | Description                                  |
|------------|-------------------------|----------------------------------------------|
| **GET**    | `"/pipedrive/deals"`    | Gets all deals created existing in pipedrive |
| **GET**    | `"/pipedrive/deal/:id"` | Gets the deal with the corresponding id      |
| **POST**   | `"/pipedrive/deal"`     | Creates a new deal in pipedrive              |
| **DELETE** | `"/pipedrive/deal/:id"` | Deletes the deal with the corresponding id   |


### *Body PayLoad for the POST request*

```
{
      "title": "title of the deal (required)",
      
      "value": "(integer) value of deal (defaults to 0)",
      
      "currency": "currency in 3 letter code (defaults to 'USD')",
      
      "user_id": "(integer) owner of deal id existing in pipedrive",
      
      "person_id": "(integer) id of the existing contact user (defaults to null)",
      
      "org_id": "(integer) id of existing contact organisation (should be created in pipedrive)",
      
      "stage_id": "(integer) id of the deal pipeline",
      
      "status": "status of deal (options: open, deleted, won, lost)",
            
      "expected_close_date": "expected closed date of deal (should be in format YYYY-MM-DD)",
      
      "visible_to": "(integer) defaults to 1 (valid options:
            1 => owner only,
            3 => owner's group,
            5 => owner's group and sub group
            7 => entire company
            )"
        }
```
