"use server";

import { serverMutation } from "../core/serverMutation";

export const newJobPost = async (job) => {
  return serverMutation("/new/jobs",job)
};
