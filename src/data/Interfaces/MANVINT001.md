---
slug: "/manvint001"
date: "2024-01-17"
title: "MANVINT001 - Customer Corporate Structure Synchronization"
description: "manpint001"
category: "interfaces"
category_key: 'interfaces'
type: "professional"
image: '../../images/api-interface.png'
order: 7
---

## Objective

The purpose of this interface is to facilitate the importation of customer corporate structure details, including company information, business unit details, and addresses of business units, into the ecommerce platform. Identified source of the information is SalesMAN but, there should be API(s) from Mulesoft to sync these data.

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

- `companyId`: A unique identifier for the company.
- `companyName`: The name of the company.
- `companyNumber`: The company number used for identification.
- `companyEmail`: The email address associated with the company.
- `isActive`: A boolean value indicating whether the company is active (`true`) or inactive (`false`).
- `iban`: The IBAN (International Bank Account Number) of the company.
- `bic`: The BIC (Bank Identifier Code) number of the company.
- `externalURL`: The URL of the company's website.
- `status`: The status of the company, either "approved" or another status if in progress.
- `businessUnit`: The name of the business unit within the company. The default is set to `headquarter`.
- `address`: An object containing address details for the company's business unit.
  - `address1`: Value for address field 1.
  - `address2`: Value for address field 2.
  - `address3`: Value for address field 3.
  - `zipCode`: The postal code for the area.
  - `city`: The city where the business unit is located.
  - `country`: The name of the country.
  - `iso2Code`: The ISO2 code for the country.
  - `phone`: The phone number, including the country code.
  - `isDefaultBilling`: Default is `false`. Set to `true` if the address should be considered the default billing address.
  - `isDefaultShipping`: Default is `false`. Set to `true` if the address should be considered the default shipping address.

### Additional Notes

#### Questions to Be Clarified

## Contact

|#|Business Unit|Name|Stream|email|
|---|---|---|---|---|
|1|MAN|MAN Business|Business|<man.business@man.eu>
|2|ACN|Accenture Business|Business|<accenture.business@accenture.com>
|3|ACN|Accenture Tech|Tech|<accenture.tech@accenture.com>
|4|Spryker|Spryker Tech|Tech|<spryker.tech@spryker.com>
