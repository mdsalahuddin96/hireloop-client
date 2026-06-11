"use server";

import { serverMutation } from "../core/serverMutation";

export const createSubscription = async (subscriptionInfo) => {
  return serverMutation("/new/subscription",subscriptionInfo)
};
