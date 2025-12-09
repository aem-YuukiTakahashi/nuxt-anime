# nuxt-anime

Nuxt2 環境でのテストプロジェクト

## 機能

- Nuxt 2
- Lenis（慣性スクロールプラグイン）
- GSAP（アニメーションライブラリ）
- GitHub Pages 対応

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

開発サーバーは `http://localhost:3000` で起動します。

### 3. ビルド

```bash
npm run build
```

### 4. 静的サイトの生成（GitHub Pages 用）

```bash
npm run generate
```

## GitHub Pages へのデプロイ

### 設定

1. `nuxt.config.js`の`router.base`をリポジトリ名に合わせて変更してください：

```javascript
router: {
  base: process.env.NODE_ENV === "production" ? "/nuxt-anime/" : "/";
}
```

`/nuxt-anime/`の部分を実際のリポジトリ名に変更してください。

### 自動デプロイ

GitHub Actions を使用して自動デプロイする場合：

1. リポジトリの`Settings` > `Pages`で、`Source`を`gh-pages`ブランチに設定
2. `main`ブランチにプッシュすると、自動的にビルドとデプロイが実行されます

### 手動デプロイ

```bash
npm run generate
```

生成された`dist`ディレクトリの内容を GitHub Pages にデプロイしてください。

## 使用方法

### Lenis

コンポーネント内で以下のように使用できます：

```javascript
mounted() {
  this.$lenis.scrollTo('#target')
}
```

### GSAP

コンポーネント内で以下のように使用できます：

```javascript
mounted() {
  this.$gsap.to('.element', { x: 100, duration: 1 })
}
```
