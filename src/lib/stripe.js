import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PRODUCT_PRICE_ID={
    "seeker_pro":"price_1Th3IcPWMD4mrzW5IEI641Mj",
    "seeker_enterprise":"price_1Th62hPWMD4mrzW5GqyoqZvJ",
    'recruiter_growth':"price_1Th63xPWMD4mrzW5TK9zpuA4",
    'recruiter_enterprise':"price_1Th64jPWMD4mrzW5hG02dByF"
}