---
slug: "/manpint004"
date: "2024-01-17"
title: "MANPINT004 - Import Product Prices by Country"
description: "manpint001"
category: "interfaces"
category_key: 'interfaces'
type: "professional"
image: '../../images/api-interface.png'
order: 7
---

## Objective

The purpose of this interface is to regularly import product prices onto the ecommerce platform for different countries.

## Current Status

- **Proposed**
- Under discussion
- Locked

## API Configuration

### Base URL

The base URL for all API requests is **To Be Determined (TBD)**. An example is `https://example-library-api.com`.

### API Endpoint

The API endpoint for this functionality is also **TBD**. An example is `GET /corporate-structure`. Endpoint details will be provided by MAN IT.

#### Parameters

The API supports the following parameters:

- `limit` (optional): Specifies the maximum number of records to return. The default value is 10.
- `offset` (optional): Indicates the number of records to skip before starting to return results. The default value is 0.

#### Data Fields Required for Ecommerce Integration

The following data fields are required for the integration into the ecommerce system:

- `default_price`: Object containing default pricing information.
  - `country`: The country for which the pricing is specified.
  - `iso2Code`: The ISO2 code for the country.
  - `netAmount`: The net amount of the product in the specified country.
  - `grossAmount`: The gross amount of the product in the specified country.
  - `currency`: Object containing currency details.
    - `name`: The name of the currency.
    - `code`: The currency code.
    - `symbol`: The currency symbol.

### Additional Notes

### Questions to Be Clarified
