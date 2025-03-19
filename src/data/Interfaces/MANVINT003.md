---
slug: "/manvint003"
date: "2024-01-17"
title: "MANVINT003 - Product Import"
description: "manpint001"
category: "interfaces"
category_key: 'interfaces'
type: "professional"
image: '../../images/api-interface.png'
order: 7
---

## Objective

The purpose of this interface is to import product data, attributes, image URLs, and product categories into the ecommerce platform.
There is not decision yet on source system. OKAPI and KWK both contains product infromation and MAN IT needs to make a decision on what system will provide data to ecom via Mulesoft middleware.

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

- `productId`: The unique identifier of the product.
- `sku`: The product SKU.
- `name`: The name of the product.
- `description`: The description of the product.
- `metaTitle`: The SEO title field value for the product.
- `metaKeywords`: The SEO keywords field value for the product.
- `metaDescription`: The SEO description field value for the product.
- `externalURLSmall`: The publicly accessible URL for the product's small image (PLP product image).
- `externalUrlLarge`: The publicly accessible URL for the product's large image (PDP product image).
- `defaultPrice`: Object containing pricing information.
  - `netAmount`: The net amount of the product.
  - `grossAmount`: The gross amount of the product.
  - `currency`: Object containing currency details.
    - `name`: The name of the currency.
    - `code`: The currency code.
    - `symbol`: The currency symbol.
- `attributes`: Object containing key-value pairs for product attributes.
  - `key`: `value`
- `superAttributes`: Object containing keys for super attributes.
  - `key`
- `averageRating`: The average rating of the product.
- `reviewCount`: The count of reviews for the product.
- `taxSet`: Object containing tax information.
  - `name`: The name of the tax set.
  - `rate`: The tax rate.
  - `country`: The country associated with the tax set.

### Additional Notes

### Questions to Be Clarified
