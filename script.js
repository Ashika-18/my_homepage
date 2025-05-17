document.addEventListener('DOMContentLoaded', function() {

    //topのアニメーション
    const topView = document.getElementById('top-view');
    const content = document.getElementById('content');
    const enterText = document.getElementById('enter-text');

    console.log("content element:", content); // ★ 追加

    enterText.addEventListener('click', () => {
        if (topView) {
            topView.style.display = 'none';
        }
        if (content) {
            content.style.display = 'block';
        }
    });

    //toggle実装
    const toggleTitles = document.querySelectorAll('.toggle-title');

    toggleTitles.forEach(title => {
        title.addEventListener('click', function() {
            const content = this.nextElementSibling; // クリックされた見出しの次の要素（内容の div）を取得
            if (content && content.classList.contains('toggle-content')) {
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
            }
        });
    });

    const contactForm = document.querySelector('#contact-form'); // 変更

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // デフォルトの送信処理を停止

            const nameInput = document.querySelector('[name="user_name"]'); // name属性で選択
            const emailInput = document.querySelector('[name="email"]'); // name属性で選択
            const messageInput = document.querySelector('[name="message"]'); // name属性で選択

            let isValid = true;
            let errors = []; // エラーメッセージを格納する配列

            if (!nameInput.value.trim()) {
                errors.push('お名前を入力してください。');
                isValid = false;
            }
            if (!emailInput.value.trim()) {
                errors.push('メールアドレスを入力してください。');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                errors.push('有効なメールアドレスを入力してください。');
                isValid = false;
            }
            if (!messageInput.value.trim()) {
                errors.push('メッセージを入力してください。');
                isValid = false;
            }

            if (!isValid) {
                // 複数のエラーメッセージをまとめて表示
                const errorMessage = errors.join('\n');
                alert(`入力エラーがあります:\n${errorMessage}`);
            } else {
                // EmailJS を使ったフォーム送信処理
                emailjs.sendForm('service_48qdz9d', 'template_vtde22k', this) // 'this' でフォーム全体を渡す
                    .then(function() {
                        alert('お問い合わせありがとうございます！送信されました。');
                        contactForm.reset(); // フォームをリセット
                    }, function(error) {
                        console.log('FAILED...', error);
                        alert('送信に失敗しました。しばらく経ってから再度お試しください。');
                    });
            }
        });

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
});