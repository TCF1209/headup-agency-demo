import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const token = process.env.SANITY_API_TOKEN;

if (!token) {
  throw new Error(
    "Missing SANITY_API_TOKEN. Add it to .env.local for server-side writes and drafts."
  );
}

/**
 * Server-only client with the API token. Use for mutations, draft reads,
 * and previews. `server-only` import causes a build error if anything in
 * the client bundle tries to import this file.
 */
export const sanityServerClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});
