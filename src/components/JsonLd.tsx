// 構造化データ（JSON-LD）を <script> として描画するだけの小さなサーバー
// コンポーネント。data には単一オブジェクトまたはノード配列を渡せる
// （JSON-LD はトップレベルの配列を許容する）。
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // 値はすべて自前の定数（site.ts / services.ts）由来でユーザー入力を
      // 含まないため、JSON.stringify した文字列をそのまま埋め込む。
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
