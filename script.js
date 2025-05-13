document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); //デフォルトの送信処理を停止

            const nameInput = document.querySelector('#name');
            const emailInput = document.querySelector('#email');
            const messageInput = document.querySelector('#message');

            let isValid = true;
            let errors = []; //エラーメッセージを格納する配列

            if (!nameInput.value.trim()) {
                errors.push('お名前を入力して下さい。');
                isValid = false;
            }
            if (!emailInput.value.trim()) {
                errors.push('メールアドレスを入力して下さい。');
                isValid = false;

            } else if (!isValidEmail(emailInput.value.trim())) {
                errors.push('有効なメールアドレスを入力して下さい。');
                isValid = false;
            }

            if (!messageInput.value.trim()) {
                errors.push('メッセージを入力して下さい。');
                isValid = false;
            }

            if (!isValid) {
                //複数のエラーメッセージをまとめて表示
                const errorMessage = errors.join('\n');
                alert(`入力エラーがあります:\n${errorMessage}`);
            } else {
                //ここでフォームの送信処理を行う(今はalert表示)
                alert('お問い合わせありがとうございます!送信されました。');
                contactForm.reset(); //フォームをリセット
            }
        });

        function isValidEmail(email) {
            //簡単なメールアドレスのバリデーション
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
});