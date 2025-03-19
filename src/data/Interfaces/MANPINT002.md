---
slug: "/manpint002"
date: "2024-01-17"
title: "MANPINT002 - Customer Users Synchronization"
description: "manpint001"
category: "interfaces"
category_key: 'interfaces'
type: "professional"
image: '../../images/api-interface.png'
order: 7
---

## Objective

The purpose of this interface is to facilitate the importation of customer information into the ecommerce platform.

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

- `customer_id`: The unique identifier of the customer.
- `salutation`: The salutation value for the customer.
- `firstName`: The first name of the customer.
- `lastName`: The last name of the customer.
- `email`: The email address of the customer, unique for each customer.
- `businessUnit`: The name of the business unit to which the customer is assigned.
- `role`: The customer role assigned to the company.
- `address`: The default billing and/or shipping address of the customer.
  - `address1`: Value for address field 1.
  - `address2`: Value for address field 2.
  - `address3`: Value for address field 3.
  - `zipCode`: The postal code for the area.
  - `city`: The city where the customer is located.
  - `country`: The name of the country.
  - `iso2Code`: The ISO2 code for the country.
  - `phone`: The phone number, including the country code.
  - `isDefaultBilling`: Default is `false`. Set to `true` if the address should be considered the default billing address.
  - `isDefaultShipping`: Default is `false`. Set to `true` if the address should be considered the default shipping address.

### Additional Notes

### Questions to Be Clarified
