// index.ts（Module Worker 形式）
import html from "./index.html";
import logo from "./assets/senkyowari_keygrapic_dark.png";

const LOGO_PATH = "/assets/senkyowari_keygrapic_dark.png";

const commonHeaders = {
  "retry-after": "3600", // 秒
  // キャッシュさせる（24時間）
  "cache-control": "public, max-age=86400",
  // 念のためインデックス回避
  "x-robots-tag": "noindex, nofollow",
};

export default {
  async fetch(request: Request): Promise<Response> {
    const { pathname } = new URL(request.url);

    // ロゴ画像以外のパスはすべてメンテナンスページを返す
    const [body, contentType] =
      pathname === LOGO_PATH ? [logo, "image/png"] : [html, "text/html; charset=utf-8"];

    const headers = { ...commonHeaders, "content-type": contentType };

    // HEAD のときはボディなしで返す
    if (request.method === "HEAD") {
      return new Response(null, { status: 503, statusText: "Service Unavailable", headers });
    }

    return new Response(body, { status: 503, statusText: "Service Unavailable", headers });
  },
};
