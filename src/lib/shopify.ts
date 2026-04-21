import { createStorefrontApiClient } from "@shopify/storefront-api-client"

export const shopifyClient = createStorefrontApiClient({
    storeDomain: "https://wonderade.myshopify.com",
    apiVersion: "2024-10",
    publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
})

// Fetch all products
export async function getProducts() {
    const { data } = await shopifyClient.request(`
        query {
            products(first: 10) {
                edges {
                    node {
                        id
                        title
                        handle
                        description
                        priceRange {
                            minVariantPrice {
                                amount
                                currencyCode
                            }
                        }
                        variants(first: 5) {
                            edges {
                                node {
                                    id
                                    title
                                    price {
                                        amount
                                        currencyCode
                                    }
                                    availableForSale
                                }
                            }
                        }
                        images(first: 3) {
                            edges {
                                node {
                                    url
                                    altText
                                    width
                                    height
                                }
                            }
                        }
                    }
                }
            }
        }
    `)
    return data?.products?.edges?.map((e: { node: unknown }) => e.node) || []
}

// Create a checkout with a single variant
export async function createCheckout(variantId: string, quantity: number = 1) {
    const { data } = await shopifyClient.request(`
        mutation checkoutCreate($input: CheckoutCreateInput!) {
            checkoutCreate(input: $input) {
                checkout {
                    id
                    webUrl
                    totalPrice {
                        amount
                        currencyCode
                    }
                    lineItems(first: 5) {
                        edges {
                            node {
                                title
                                quantity
                                variant {
                                    price {
                                        amount
                                    }
                                }
                            }
                        }
                    }
                }
                checkoutUserErrors {
                    code
                    field
                    message
                }
            }
        }
    `, {
        variables: {
            input: {
                lineItems: [{ variantId, quantity }]
            }
        }
    })

    const checkout = data?.checkoutCreate?.checkout
    const errors = data?.checkoutCreate?.checkoutUserErrors

    if (errors?.length) {
        throw new Error(errors[0].message)
    }

    return checkout
}

// Create checkout with email pre-filled (for users who already signed up)
export async function createCheckoutWithEmail(variantId: string, email: string, quantity: number = 1) {
    const { data } = await shopifyClient.request(`
        mutation checkoutCreate($input: CheckoutCreateInput!) {
            checkoutCreate(input: $input) {
                checkout {
                    id
                    webUrl
                }
                checkoutUserErrors {
                    code
                    field
                    message
                }
            }
        }
    `, {
        variables: {
            input: {
                lineItems: [{ variantId, quantity }],
                email
            }
        }
    })

    return data?.checkoutCreate?.checkout
}
