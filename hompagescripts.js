
<!-- زر العودة للأعلى -->
<button class="back-to-top" onclick="scrollToTop()">
  <i class="fas fa-chevron-up"></i>
</button>

<script>
// تأثيرات التمرير
function handleScrollAnimations() {
  const reveals = document.querySelectorAll('.scroll-reveal');
  const windowHeight = window.innerHeight;
  
  reveals.forEach(reveal => {
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('revealed');
    }
  });
}

// زر العودة للأعلى
function toggleBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// معالج نموذج التواصل
async function handleContactForm(event) {
  event.preventDefault();
  const button = event.target.querySelector('button');
  const originalText = button.innerHTML;
  
  // جمع بيانات النموذج
  const formData = new FormData(event.target);
  const data = {
    name: formData.get('name') || event.target.querySelector('input[placeholder*="الاسم"]').value,
    email: formData.get('email') || event.target.querySelector('input[placeholder*="البريد"]').value,
    phone: formData.get('phone') || event.target.querySelector('input[placeholder*="الهاتف"]').value,
    subject: formData.get('subject') || event.target.querySelector('input[placeholder*="الموضوع"]').value,
    message: formData.get('message') || event.target.querySelector('textarea').value
  };
  
  // التحقق من صحة البيانات
  if (!data.name || !data.email || !data.subject || !data.message) {
    alert('يرجى ملء جميع الحقول المطلوبة');
    return;
  }
  
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
  button.disabled = true;
  
  try {
    const response = await fetch('/send-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.success) {
      button.innerHTML = '<i class="fas fa-check"></i> تم إرسال الرسالة بنجاح!';
      button.style.background = 'rgba(46, 204, 113, 0.8)';
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        button.style.background = '';
        event.target.reset();
      }, 3000);
      
      // إظهار رسالة نجاح
      showNotification('تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.', 'success');
      
    } else {
      throw new Error(result.message);
    }
    
  } catch (error) {
    console.error('خطأ في إرسال الرسالة:', error);
    button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> فشل الإرسال';
    button.style.background = 'rgba(231, 76, 60, 0.8)';
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
      button.style.background = '';
    }, 3000);
    
    // إظهار رسالة خطأ
    showNotification('حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.', 'error');
  }
}

// دالة إظهار الإشعارات
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 9999;
    font-family: 'Cairo', sans-serif;
    font-weight: 600;
    max-width: 300px;
    direction: rtl;
    text-align: right;
    transform: translateX(400px);
    transition: transform 0.3s ease;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // تحريك الإشعار للداخل
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // إزالة الإشعار بعد 5 ثوانٍ
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

 
// تحريك العناصر عند تحريك الماوس
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.service-card');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  cards.forEach((card, index) => {
    const xRotation = (mouseY - 0.5) * 10;
    const yRotation = (mouseX - 0.5) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
  });
});

// إعادة تعيين البطاقات عند الخروج
document.addEventListener('mouseleave', () => {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.style.transform = '';
  });
});

// استمع لأحداث التمرير
window.addEventListener('scroll', () => {
  handleScrollAnimations();
  toggleBackToTop();
});

// تشغيل الرسوم المتحركة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  handleScrollAnimations();
  
  // تأثير كتابة النص
  const heroTitle = document.querySelector('.hero-section h1');
  const heroSubtitle = document.querySelector('.hero-section h2');
  
  if (heroTitle && heroSubtitle) {
    heroTitle.style.opacity = '0';
    heroSubtitle.style.opacity = '0';
    
    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.animation = 'fadeInUp 1s ease-out forwards';
    }, 300);
    
    setTimeout(() => {
      heroSubtitle.style.opacity = '1';
      heroSubtitle.style.animation = 'fadeInUp 1s ease-out forwards';
    }, 800);
  }
});

// تأثير الكتابة المتحركة للإحصائيات
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(counter => {
    const originalText = counter.textContent.trim();

    // حالة "رقم/نص" مثل "24/7"
    if (originalText.includes('/')) {
      const parts = originalText.split('/');
      const target = parseInt(parts[0], 10);
      let count = 0;
      const step = target / 200;

      const updateCounter = () => {
        count += step;
        if (count < target) {
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = originalText; // يرجع النص كامل
        }
      };

      updateCounter();

    // حالة رقم مع % مثل "99%"
    } else if (originalText.endsWith('%')) {
      const target = parseInt(originalText.slice(0, -1), 10);
      let count = 0;
      const step = target / 200;

      const updateCounter = () => {
        count += step;
        if (count < target) {
          counter.textContent = Math.ceil(count) + '%';
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = originalText; // يرجع النص كامل
        }
      };

      updateCounter();

    // حالة رقم فقط
    } else {
      const target = parseInt(originalText, 10);
      let count = 0;
      const step = target / 200;

      const updateCounter = () => {
        count += step;
        if (count < target) {
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    }
  });
}


// تشغيل عداد الإحصائيات عند ظهورها
const statsSection = document.querySelector('.stats-section');
let statsAnimated = false;

window.addEventListener('scroll', () => {
  if (!statsAnimated && statsSection.getBoundingClientRect().top < window.innerHeight) {
    animateCounters();
    statsAnimated = true;
  }
});
</script>
