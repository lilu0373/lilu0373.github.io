// HTMLの要素を取得しておく
const imageLoader = document.getElementById('image-loader');
const canvas = document.getElementById('image-canvas');
const ctx = canvas.getContext('2d');
const resultArea = document.getElementById('result-area');

// imageLoaderがページに存在する場合のみ、イベントリスナーを設定する
if (imageLoader) {
    imageLoader.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                // canvasのサイズを画像のサイズに合わせる
                let displayWidth = img.width;
                let displayHeight = img.height;

                // もし画像の横幅が大きすぎるなら、表示サイズを調整
                const maxWidth = canvas.parentElement.clientWidth * 0.9; // 親要素の90%を最大幅に
                if (img.width > maxWidth) {
                    displayWidth = maxWidth;
                    displayHeight = img.height * (maxWidth / img.width);
                }

                canvas.width = displayWidth;
                canvas.height = displayHeight;

                // canvasに画像を描画する
                ctx.drawImage(img, 0, 0, displayWidth, displayHeight);

                // 分析処理を呼び出す（今はまだダミー）
                analyzeImage();
            };
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    });
}

// 画像を分析する関数（現時点ではダミー）
function analyzeImage() {
    console.log("分析処理を開始します...");
    // TODO: ここにTensorFlow.jsを使った実際の分析コードが入る
    resultArea.innerHTML = `
        <p><strong>分析結果（ダミー）:</strong></p>
        <ul>
            <li>目: パッチリ目 (信頼度: 95%)</li>
            <li>鼻: ちょん (信頼度: 88%)</li>
            <li>口: にっこり (信頼度: 92%)</li>
        </ul>
    `;
    console.log("分析処理が完了しました。");
}
