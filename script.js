window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
});
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');

        // إغلاق البنود الأخرى عند فتح واحد جديد
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
    });
});
// ظهور العناصر عند التمرير
function checkTimelineVisibility() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8) &&
            (rect.bottom >= window.innerHeight * 0.2);

        if (isVisible) {
            item.classList.add('visible');
        }
    });
}

// تحقق عند التحميل وعند التمرير
window.addEventListener('load', checkTimelineVisibility);
window.addEventListener('scroll', checkTimelineVisibility);
// رسم الأشكال المتحركة
function drawAnimatedShape(canvasId, shapeType) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // تعيين أبعاد Canvas
    canvas.width = 400;
    canvas.height = 400;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;

    let progress = 0;
    const duration = 2000; // مدة الرسم بالمللي ثانية
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        progress = Math.min(elapsed / duration, 1);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#6a11cb';
        ctx.lineWidth = 8;
        ctx.fillStyle = 'rgba(106, 17, 203, 0.2)';

        ctx.beginPath();

        switch (shapeType) {
            case 'triangle':
                // مثلث متساوي الأضلاع
                const angleOffset = -Math.PI / 2;
                for (let i = 0; i <= 3 * progress; i++) {
                    const angle = angleOffset + (i % 3) * (2 * Math.PI / 3);
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                break;

            case 'square':
                // مربع
                for (let i = 0; i <= 4 * progress; i++) {
                    let x, y;
                    if (i % 4 === 0) {
                        x = centerX - radius;
                        y = centerY - radius;
                    } else if (i % 4 === 1) {
                        x = centerX + radius;
                        y = centerY - radius;
                    } else if (i % 4 === 2) {
                        x = centerX + radius;
                        y = centerY + radius;
                    } else {
                        x = centerX - radius;
                        y = centerY + radius;
                    }
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                break;

            case 'pentagon':
                // خماسي
                for (let i = 0; i <= 5 * progress; i++) {
                    const angle = (i % 5) * (2 * Math.PI / 5) - Math.PI / 2;
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                break;

            case 'hexagon':
                // سداسي
                for (let i = 0; i <= 6 * progress; i++) {
                    const angle = (i % 6) * (2 * Math.PI / 6) - Math.PI / 2;
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                break;

            case 'circle':
                // دائرة
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI * progress);
                break;

            case 'ellipse':
                // قطع ناقص
                const scaleX = 0.8;
                const scaleY = 1.2;
                for (let i = 0; i <= 360 * progress; i++) {
                    const angle = (i % 360) * (Math.PI / 180);
                    const x = centerX + radius * scaleX * Math.cos(angle);
                    const y = centerY + radius * scaleY * Math.sin(angle);
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                break;
        }

        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

// تهيئة الأشكال عند تحميل الصفحة
window.addEventListener('load', () => {
    drawAnimatedShape('triangle-canvas', 'triangle');
    drawAnimatedShape('square-canvas', 'square');
    drawAnimatedShape('pentagon-canvas', 'pentagon');
    drawAnimatedShape('hexagon-canvas', 'hexagon');
    drawAnimatedShape('circle-canvas', 'circle');
    drawAnimatedShape('ellipse-canvas', 'ellipse');

    // إعادة رسم الأشكال عند ظهورها عند التمرير
    setupShapeAnimations();
});

// تأثيرات الظهور عند التمرير
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    function checkVisibility() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.75) &&
                (rect.bottom >= window.innerHeight * 0.25);

            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }

    // تحقق عند التحميل وعند التمرير
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
}

// تهيئة تأثيرات الأشكال عند التمرير
function setupShapeAnimations() {
    const shapeCards = document.querySelectorAll('.shape-card');

    shapeCards.forEach(card => {
        const canvasId = card.querySelector('canvas').id;
        const shapeType = canvasId.replace('-canvas', '');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    drawAnimatedShape(canvasId, shapeType);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(card);
    });
}


// آلة حاسبة
document.addEventListener('DOMContentLoaded', function () {
    const calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    function updateDisplay() {
        const screen = document.querySelector('.calculator-screen');
        screen.value = calculator.displayValue;
    }

    updateDisplay();

    document.querySelectorAll('.calculator-keys').forEach(keys => {
        keys.addEventListener('click', (event) => {
            const { target } = event;
            if (!target.matches('button')) return;

            if (target.classList.contains('operator')) {
                handleOperator(target.value);
                updateDisplay();
                return;
            }

            if (target.classList.contains('decimal')) {
                inputDecimal(target.value);
                updateDisplay();
                return;
            }

            if (target.classList.contains('all-clear')) {
                resetCalculator();
                updateDisplay();
                return;
            }

            if (target.classList.contains('equal-sign')) {
                calculate();
                updateDisplay();
                return;
            }

            if (target.classList.contains('function')) {
                handleFunction(target.value);
                updateDisplay();
                return;
            }

            inputDigit(target.value);
            updateDisplay();
        });
    });

    function inputDigit(digit) {
        const { displayValue, waitingForSecondOperand } = calculator;

        if (waitingForSecondOperand === true) {
            calculator.displayValue = digit;
            calculator.waitingForSecondOperand = false;
        } else {
            calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }

    function inputDecimal(dot) {
        if (calculator.waitingForSecondOperand) {
            calculator.displayValue = '0.';
            calculator.waitingForSecondOperand = false;
            return;
        }

        if (!calculator.displayValue.includes(dot)) {
            calculator.displayValue += dot;
        }
    }

    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculator;
        const inputValue = parseFloat(displayValue);

        if (operator && calculator.waitingForSecondOperand) {
            calculator.operator = nextOperator;
            return;
        }

        if (firstOperand == null) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation[operator](firstOperand, inputValue);
            calculator.displayValue = String(result);
            calculator.firstOperand = result;
        }

        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
    }

    function handleFunction(func) {
        const inputValue = parseFloat(calculator.displayValue);
        let result;

        switch (func) {
            case 'sin':
                result = Math.sin(inputValue * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos(inputValue * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(inputValue * Math.PI / 180);
                break;
            case 'asin':
                result = Math.asin(inputValue) * 180 / Math.PI;
                break;
            case 'acos':
                result = Math.acos(inputValue) * 180 / Math.PI;
                break;
            case 'atan':
                result = Math.atan(inputValue) * 180 / Math.PI;
                break;
            case 'log':
                result = Math.log10(inputValue);
                break;
            case 'ln':
                result = Math.log(inputValue);
                break;
            case 'sqrt':
                result = Math.sqrt(inputValue);
                break;
            case 'pow':
                calculator.firstOperand = inputValue;
                calculator.waitingForSecondOperand = true;
                calculator.operator = 'pow';
                return;
            case 'pi':
                result = Math.PI;
                break;
            case 'e':
                result = Math.E;
                break;
            case 'fact':
                result = factorial(inputValue);
                break;
            case 'exp':
                calculator.firstOperand = inputValue;
                calculator.waitingForSecondOperand = true;
                calculator.operator = 'exp';
                return;
            default:
                return;
        }

        calculator.displayValue = String(result);
    }

    function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    const performCalculation = {
        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
        'pow': (firstOperand, secondOperand) => Math.pow(firstOperand, secondOperand),
        'exp': (firstOperand, secondOperand) => firstOperand * Math.pow(10, secondOperand)
    };

    function calculate() {
        const { firstOperand, displayValue, operator } = calculator;
        const inputValue = parseFloat(displayValue);

        if (operator === '/' && inputValue === 0) {
            calculator.displayValue = 'خطأ';
            return;
        }

        if (operator) {
            const result = performCalculation[operator](firstOperand, inputValue);
            calculator.displayValue = String(result);
            calculator.firstOperand = result;
            calculator.waitingForSecondOperand = true;
            calculator.operator = null;
        }
    }

    function resetCalculator() {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }
});
// مسابقة
document.getElementById('submit-quiz').addEventListener('click', function () {
    const answers = {
        q1: 'b',
        q2: 'a',
        q3: 'c',
        q4: 'a'
    };

    let score = 0;
    let totalQuestions = 0;

    for (const question in answers) {
        totalQuestions++;
        const selectedOption = document.querySelector(`input[name="${question}"]:checked`);

        if (selectedOption && selectedOption.value === answers[question]) {
            score++;
            selectedOption.parentElement.style.color = 'green';
        } else if (selectedOption) {
            selectedOption.parentElement.style.color = 'red';
        }
    }

    alert(`نقاطك: ${score} من ${totalQuestions}`);
});

// تهيئة تأثيرات التمرير
setupScrollAnimations();


// شاشة جاتا
const gataModal = document.createElement('div');
gataModal.id = 'gata-modal';
gataModal.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 2000;
    justify-content: center;
    align-items: center;
`;

gataModal.innerHTML = `
    <div style="background: white; width: 90%; max-width: 600px; padding: 20px; border-radius: 10px; text-align: center;">
        <h2>الدوال المثلثية</h2>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 20px 0;">
            <button class="gata-btn" data-fn="sin">جا(θ)</button>
            <button class="gata-btn" data-fn="cos">جتا(θ)</button>
            <button class="gata-btn" data-fn="tan">ظا(θ)</button>
            <button class="gata-btn" data-fn="asin">جا⁻¹(x)</button>
            <button class="gata-btn" data-fn="acos">جتا⁻¹(x)</button>
            <button class="gata-btn" data-fn="atan">ظا⁻¹(x)</button>
        </div>
        <div style="margin: 20px 0;">
            <input type="number" id="gata-input" placeholder="أدخل القيمة" style="padding: 10px; width: 100%;">
            <div id="gata-result" style="font-size: 1.5rem; margin: 15px 0;"></div>
        </div>
        <button id="close-gata" class="btn">إغلاق</button>
    </div>
`;

document.body.appendChild(gataModal);

// أحداث شاشة جاتا
document.getElementById('open-gata').addEventListener('click', () => {
    gataModal.style.display = 'flex';
});

document.getElementById('close-gata').addEventListener('click', () => {
    gataModal.style.display = 'none';
});

document.querySelectorAll('.gata-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const input = document.getElementById('gata-input').value;
        const fn = this.dataset.fn;
        let result;

        if (!input) {
            alert('الرجاء إدخال قيمة');
            return;
        }

        const num = parseFloat(input);

        switch (fn) {
            case 'sin':
                result = Math.sin(num * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos(num * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(num * Math.PI / 180);
                break;
            case 'asin':
                result = Math.asin(num) * 180 / Math.PI;
                break;
            case 'acos':
                result = Math.acos(num) * 180 / Math.PI;
                break;
            case 'atan':
                result = Math.atan(num) * 180 / Math.PI;
                break;
        }

        document.getElementById('gata-result').textContent = `النتيجة: ${result.toFixed(4)}`;
    });
});
