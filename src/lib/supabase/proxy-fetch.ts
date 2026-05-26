import { ProxyAgent, fetch as undiciFetch } from "undici";
import { getServerProxyUrl } from "./env";

let proxyAgent: ProxyAgent | null | undefined;

function getProxyAgent() {
  if (proxyAgent !== undefined) {
    return proxyAgent;
  }

  const proxyUrl = getServerProxyUrl();
  proxyAgent = proxyUrl ? new ProxyAgent(proxyUrl) : null;

  return proxyAgent;
}

export const supabaseServerFetch: typeof fetch = async (input, init) => {
  const agent = getProxyAgent();

  if (!agent) {
    return fetch(input, init);
  }

  return undiciFetch(input as Parameters<typeof undiciFetch>[0], {
    ...(init as RequestInit),
    dispatcher: agent,
  } as Parameters<typeof undiciFetch>[1]) as unknown as Promise<Response>;
};
