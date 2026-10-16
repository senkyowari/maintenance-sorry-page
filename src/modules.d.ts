// wrangler の module rules で読み込むファイルの型定義
declare module "*.html" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: ArrayBuffer;
  export default content;
}
