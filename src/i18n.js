import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          header: {
            switchLanguage: 'Switch Language',
            tariffs: 'Tariffs',
            usageInstructions: 'How to Use the App',
            contact: 'Contact Information',
          invest: '  Investments',
          becomeInvestor: 'Go to Home',
          },
          islandSection: {
            title: 'Lavanta Ride',
            description: '— a scooter rental company offering stylish and reliable vehicles for comfortable rides around the city.',
            downloadApp: 'Download Our App',
            availableOn: 'Available for iOS and Android',
            appStore: 'App Store',
            googlePlay: 'Google Play',
          },
          usageInstructions: {
            title: 'How to Use the App',
            step1: 'Step 1: Download the App',
            step2: 'Step 2: Registration',
            step3: 'Step 3: Upload Your Driver’s License',
            step4: 'Step 4: Choose a Scooter',
            step5: 'Step 5: Reserve or Rent',
            step6: 'Step 6: Scan the QR Code',
            step7: 'Step 7: Start Your Trip',
            step8: 'Step 8: End Your Trip',
            step9: 'Step 9: Photo Report',
            text1_1: 'Download the app from the App Store or Google Play.',
            text1_2: 'Make sure your device supports the app.',
            text2_1: 'Open the app and start the registration process.',
            text2_2: 'Enter your details: name, email, and phone number.',
            text3_1: 'Upload a photo or scan of your driver’s license.',
            text3_2: 'Wait for document verification.',
            text4_1: 'Open the map in the app.',
            text4_2: 'Find the nearest available scooter.',
            text4_3: 'Check the scooter information (fuel level, distance).',
            text5_1: 'Click on the selected scooter on the map.',
            text5_2: 'Choose the "Reserve" or "Rent" option.',
            text5_3: 'If reserving, you will have 10-15 minutes to reach the scooter.',
            text6_1: 'Approach the scooter and find the QR code on the handlebar.',
            text6_2: 'Scan the QR code through the app.',
            text6_3: 'Wait for unlock confirmation.',
            text7_1: 'Make sure the scooter is ready for the trip.',
            text7_2: 'Click the "Start Trip" button in the app.',
            text7_3: 'Enjoy your ride!',
            text8_1: 'Find a permitted parking area on the map.',
            text8_2: 'Park the scooter in the designated spot.',
            text8_3: 'Click the "End Trip" button in the app.',
            text9_1: 'Take a photo of the scooter after the trip.',
            text9_2: 'Make sure the photo is clear and shows the scooter’s condition.',
            text9_3: 'Confirm the photo report in the app.',
          },
          Tariffs: {
            tariffs: 'Tariffs',
            description: 'You can find the current tariffs for scooter rentals in our app.',
        },
        videoSection: {
          question: 'Why choose us?',
          features: {
            scooters: 'Stylish and reliable scooters: Each scooter is a combination of comfort and elegance.',
            easeOfUse: 'Ease of management: Suitable for both beginners and experienced riders.',
            flexibility: 'Flexible rental conditions: Choose a convenient rental period and hit the road!',
            pricing: 'Amazing prices: Affordable tariffs for any budget.',
          },
        },
        contactSection: {
          title: 'Contact Information',
          email: 'Email',
          phone: 'Phone',
          address: 'Address',
          installApp: 'Install the app',
          downloadButton: 'Download',
          contactUs: 'Contact Us',
          namePlaceholder: 'Your Name',
          usernamePlaceholder: 'Username (without @)',
          messagePlaceholder: 'Your Message',
          submitButton: 'Send',
          successMessage: 'Message sent successfully!',
          errorMessage: 'Error sending message.',
          catchError: 'An error occurred while sending the message.',
        },
        scooterStats: {
          mainTitle: 'Exponential Growth of the Scooter Fleet',
          subtitle: '2024 has become a record year for development dynamics',
          scootersOnRoad: 'Scooters on the roads',
          scootersGrowth: '— 5 times more than at the beginning of the year',
          usersPerDay: 'Users per day',
          recordRides: '— record number of rides',
          dailyEarnings: 'Daily earnings for our partners —',
          monthlyEarnings: '\$300K+ monthly',
          quote: 'Each new scooter pays off in 4-6 months and generates passive income',
          joinInvestors: 'Join the investors',
          investmentTitle: 'Investing is easier than you think!',
          step1Title: 'Purchase our scooter',
          step1Text: 'Order now on our website',
          step2Title: 'We place it in the most popular locations',
          step2Text: 'Optimal spots for maximum income',
          step3Title: 'Receive passive income from each ride',
          step3Text: 'Daily payouts to your account',
          scooterGrowthTitle: 'Growth of the number of scooters by quarters',
          userGrowthTitle: 'Growth of the number of users per day',
      },
      commentSystem: {
        loadError: "Error loading comments",
        publishError: "Error publishing comment",
        writeComment: "Write a comment",
        contactInfo: "Contact Information",
        email: "Email",
        phone: "Phone",
        address: "Address",
        workingHours: "Working Hours"
    },    
    commentModal: {
      addComment: "Add Comment",
      nameLabel: "Name",
      usernameLabel: "Username TG (e.g. @username)",
      commentLabel: "Comment",
      closeButton: "Close",
      publishButton: "Publish",
    },
    "investmentSlider": {
  "slide1": {
    "text1": "Primary market: By clicking this button, you will proceed to the scooter purchase process.",
    "text2": "Secondary market: Here you can sell a vehicle you previously purchased on the primary market."
  },
  "slide2": {
    "text1": "Purchasing a vehicle gives you the opportunity to earn passive income."
  },
  "slide3": {
    "text1": "On this platform you can easily sell your vehicle."
  },
  "slide4": {
    "text1": "This page will provide you with information about the number of your vehicles, as well as income earned per day and per month."
  },
  "slide6": {
    "text1": "You can also withdraw your funds to a bank account or use a crypto wallet to receive payments."
  },
  "slide7": {
    "text1": "You also have the option to reinvest your earnings, which will allow you to increase profits in the future."
  },
  "slide8": {
    "text1": "On this page you can track the current status of your vehicles."
  },
  "slide9": {
    "text1": "You will have access to detailed statistics where you can see all income for a certain period of time."
  },
  "promoHeading": "Learn more about investments",
  "promoText": "Become an investor and earn passive income.",
  "ctaButton": "Go to investments"
}
        },
      },
      ru: {
        translation: {
          header: {
            switchLanguage: 'Сменить язык',
            tariffs: 'Тарифы',
            usageInstructions: 'Как пользоваться приложением',
            contact: 'Контактная информация',
            invest: 'Инвестиции',
            becomeInvestor:'На главную',
          },
          islandSection: {
            title: 'Lavanta Ride',
            description: '— компания по аренде бензиновых скутеров, предлагающая стильные и надежные транспортные средства для комфортных поездок по городу.',
            downloadApp: 'Скачайте наше приложение',
            availableOn: 'Доступно для iOS и Android',
            appStore: 'App Store',
            googlePlay: 'Google Play',
          },
          usageInstructions: {
            title: 'Как пользоваться приложением',
            step1: 'Шаг 1: Скачайте приложение',
            step2: 'Шаг 2: Регистрация',
            step3: 'Шаг 3: Внесение водительского удостоверения',
            step4: 'Шаг 4: Выбор скутера',
            step5: 'Шаг 5: Бронирование или аренда',
            step6: 'Шаг 6: Сканируйте QR-код',
            step7: 'Шаг 7: Начните поездку',
            step8: 'Шаг 8: Завершите поездку',
            step9: 'Шаг 9: Фотоотчет',
            text1_1: 'Скачайте приложение из App Store или Google Play.',
            text1_2: 'Убедитесь, что ваше устройство поддерживает приложение.',
            text2_1: 'Откройте приложение и начните процесс регистрации.',
            text2_2: 'Введите свои данные: имя, электронную почту и номер телефона.',
            text3_1: 'Загрузите фотографию или скан водительского удостоверения.',
            text3_2: 'Дождитесь проверки документа.',
            text4_1: 'Откройте карту в приложении.',
            text4_2: 'Найдите ближайший доступный скутер.',
            text4_3: 'Проверьте информацию о скутере (количество бензина , расстояние).',
            text5_1: 'Нажмите на выбранный скутер на карте.',
            text5_2: 'Выберите опцию "Забронировать" или "Арендовать".',
            text5_3: 'Если бронируете, у вас будет 10-15 минут, чтобы добраться до скутера.',
            text6_1: 'Подойдите к скутеру и найдите QR-код на руле.',
            text6_2: 'Сканируйте QR-код через приложение.',
            text6_3: 'Дождитесь подтверждения разблокировки.',
            text7_1: 'Убедитесь, что скутер готов к поездке.',
            text7_2: 'Нажмите кнопку "Начать поездку" в приложении.',
            text7_3: 'Наслаждайтесь поездкой!',
            text8_1: 'Найдите разрешенную парковку на карте.',
            text8_2: 'Паркуйте скутер в указанном месте.',
            text8_3: 'Нажмите кнопку "Завершить поездку" в приложении.',
            text9_1: 'Сделайте фото скутера после поездки.',
            text9_2: 'Убедитесь, что фото четкое и показывает состояние скутера.',
            text9_3: 'Подтвердите фотоотчет в приложении.',
          },    
          Tariffs: {
            tariffs: 'Тарифы',
            description: '   С актуальными тарифами на аренду скутеров вы можете ознакомиться в нашем приложении.',
          },
          videoSection: {
            question: 'Почему выбирают нас?',
            features: {
              scooters: 'Стильные и надежные скутеры: Каждый наш скутер — это сочетание комфорта и элегантности.',
              easeOfUse: 'Легкость в управлении: Подходит как для новичков, так и для опытных райдеров.',
              flexibility: 'Гибкие условия аренды: Выбирайте удобный срок аренды и отправляйтесь в путь!',
              pricing: 'Потрясающие цены: Доступные тарифы для любого бюджета.',
            },
          },
          contactSection: {
            title: 'Контактная информация',
            email: 'Электронная почта',
            phone: 'Телефон',
            address: 'Адрес',
            installApp: 'Установите приложение',
            downloadButton: 'Скачать',
            contactUs: 'Свяжитесь с нами',
            namePlaceholder: 'Ваше имя',
            usernamePlaceholder: 'username (без @)',
            messagePlaceholder: 'Ваш вопрос',
            submitButton: 'Отправить',
            successMessage: 'Сообщение успешно отправлено!',
            errorMessage: 'Ошибка при отправке сообщения.',
            catchError: 'Произошла ошибка при отправке сообщения.',
          },
      scooterStats: {
          mainTitle: 'Экспоненциальный рост скутерного парка',
          subtitle: '2024 год стал рекордным по динамике развития',
          scootersOnRoad: 'Скутеров на дорогах',
          scootersGrowth: '— в 5 раз больше, чем в начале года',
          usersPerDay: 'Пользователей в день',
          recordRides: '— рекордное количество поездок',
          dailyEarnings: 'Ежедневно зарабатывают наши партнеры —',
          monthlyEarnings: '$300K+ ежемесячно',
          quote: 'Каждый новый скутер окупается за 4-6 месяцев и приносит пассивный доход',
          joinInvestors: 'Присоединиться к инвесторам',
          investmentTitle: 'Инвестировать - легче, чем вы думаете!',
          step1Title: 'Приобретаете наш скутер',
          step1Text: 'Закажите прямо сейчас на нашем сайте',
          step2Title: 'Мы размещаем его в самых популярных локациях',
          step2Text: 'Оптимальные точки для максимального дохода',
          step3Title: 'Получаете пассивный доход с каждой поездки',
          step3Text: 'Ежедневные выплаты на ваш счет',
          scooterGrowthTitle: 'Рост количества скутеров по кварталам',
          userGrowthTitle: 'Рост количества пользователей в день'
        },
        commentSystem: {
    loadError: "Ошибка загрузки комментариев",
    publishError: "Ошибка публикации комментария",
    writeComment: "Написать комментарий",
    contactInfo: "Контактные данные",
    email: "Email",
    phone: "Телефон",
    address: "Адрес",
    workingHours: "Часы работы"
  },
  commentModal: {
  addComment: "Добавить комментарий",
  nameLabel: "Имя",
  usernameLabel: "Username TG (пример @username)",
  commentLabel: "Комментарий",
  closeButton: "Закрыть",
  publishButton: "Опубликовать",
},
"investmentSlider": {
  "slide1": {
    "text1": "Первичный рынок: Нажав на эту кнопку, вы перейдете к процессу покупки скутера.",
    "text2": "Вторичный рынок: Здесь вы сможете продать транспортное средство, которое ранее приобрели на первичном рынке."
  },
  "slide2": {
    "text1": "Приобретение транспорта предоставляет вам возможность получать пассивный доход."
  },
  "slide3": {
    "text1": "На данной платформе вы можете легко продать свое транспортное средство."
  },
  "slide4": {
    "text1": "На этой странице вам будет доступна информация о количестве вашего транспорта, а также о доходах, полученных за день и за месяц."
  },
  "slide6": {
    "text1": "Вы также можете вывести свои средства на банковский счет или воспользоваться криптокошельком для получения выплат."
  },
  "slide7": {
    "text1": "Кроме того, у вас есть возможность реинвестировать свои доходы, что позволит вам увеличить прибыль в будущем."
  },
  "slide8": {
    "text1": "На этой странице вы сможете отслеживать текущее состояние вашего транспорта."
  },
  "slide9": {
    "text1": "Вам будет доступна детальная статистика, где вы сможете увидеть все доходы за определенный период времени."
  },
  "promoHeading": "Узнайте больше об инвестициях",
  "promoText": "Станьте инвестором и получайте пассивный доход.",
  "ctaButton": "Перейти к инвестициям"
}
        },
      
      },
      tr: {
        translation: {
          header: {
            switchLanguage: 'Dil Değiştir',
            tariffs: 'Tarifeler',
            usageInstructions: 'Uygulamayı Kullanma',
            contact: 'İletişim Bilgileri',
            invest: 'Yatırımlar',
            becomeInvestor: 'Ana Sayfaya Git',
          },
          islandSection: {
            title: 'Lavanta Ride',
            description: '— şık ve güvenilir araçlar sunan bir scooter kiralama şirketi.',
            downloadApp: 'Uygulamamızı İndirin',
            availableOn: 'iOS ve Android için mevcut',
            appStore: 'App Store',
            googlePlay: 'Google Play',
          },
          usageInstructions: {
            title: 'Uygulamayı Nasıl Kullanırsınız',
            step1: 'Adım 1: Uygulamayı İndirin',
            step2: 'Adım 2: Kayıt Olun',
            step3: 'Adım 3: Sürücü Belgesi Yükleyin',
            step4: 'Adım 4: Scooter Seçimi',
            step5: 'Adım 5: Rezervasyon veya Kiralama',
            step6: 'Adım 6: QR Kodunu Tarayın',
            step7: 'Adım 7: Yolculuğa Başlayın',
            step8: 'Adım 8: Yolculuğu Tamamlayın',
            step9: 'Adım 9: Fotoğraf Raporu',
            text1_1: 'Uygulamayı App Store veya Google Play\'den indirin.',
            text1_2: 'Cihazınızın uygulamayı desteklediğinden emin olun.',
            text2_1: 'Uygulamayı açın ve kayıt sürecine başlayın.',
            text2_2: 'Bilgilerinizi girin: ad, e-posta ve telefon numarası.',
            text3_1: 'Sürücü belgesinin fotoğrafını veya taramasını yükleyin.',
            text3_2: 'Belgenin doğrulanmasını bekleyin.',
            text4_1: 'Uygulamada haritayı açın.',
            text4_2: 'En yakın mevcut scooterı bulun.',
            text4_3: 'Scooter bilgilerini kontrol edin (yakıt seviyesi, mesafe).',
            text5_1: 'Haritada seçilen scootera tıklayın.',
            text5_2: '“Rezervasyon” veya “Kiralama” seçeneğini seçin.',
            text5_3: 'Rezervasyon yapıyorsanız, scootera ulaşmak için 10-15 dakikanız olacak.',
            text6_1: 'Scootera yaklaşın ve gidonda QR kodunu bulun.',
            text6_2: 'QR kodunu uygulama üzerinden tarayın.',
            text6_3: 'Kilidin açılmasını bekleyin.',
            text7_1: 'Scooterın yolculuğa hazır olduğundan emin olun.',
            text7_2: 'Uygulamada "Yolculuğa Başla" butonuna tıklayın.',
            text7_3: 'Yolculuğun tadını çıkarın!',
            text8_1: 'Haritada izin verilen bir park yeri bulun.',
            text8_2: 'Scootera belirtilen yerde park edin.',
            text8_3: 'Uygulamada "Yolculuğu Tamamla" butonuna tıklayın.',
            text9_1: 'Yolculuktan sonra scooterın fotoğrafını çekin.',
            text9_2: 'Fotoğrafın net olduğundan ve scooterın durumunu gösterdiğinden emin olun.',
            text9_3: 'Uygulamada fotoğraf raporunu onaylayın.',
        },   
        Tariffs: {
          tariffs: 'Tarifeler',
          description: 'Scooter kiralama için güncel tarifeleri uygulamamızda bulabilirsiniz.',
      },     
      videoSection: {
        question: 'Neden bizi seçmelisiniz?',
        features: {
          scooters: 'Şık ve güvenilir scooterlar: Her scooter, konfor ve zarafetin birleşimidir.',
          easeOfUse: 'Kullanım kolaylığı: Hem yeni başlayanlar hem de deneyimli sürücüler için uygundur.',
          flexibility: 'Esnek kiralama koşulları: Uygun bir kiralama süresi seçin ve yola çıkın!',
          pricing: 'Harika fiyatlar: Her bütçeye uygun fiyatlar.',
        },
      },   
      contactSection: {
        title: 'İletişim Bilgileri',
        email: 'E-posta',
        phone: 'Telefon',
        address: 'Adres',
        installApp: 'Uygulamayı Yükleyin',
        downloadButton: 'İndir',
        contactUs: 'Bizimle İletişime Geçin',
        namePlaceholder: 'Adınız',
        usernamePlaceholder: 'Kullanıcı adı ( @ olmadan)',
        messagePlaceholder: 'Mesajınız',
        submitButton: 'Gönder',
        successMessage: 'Mesaj başarıyla gönderildi!',
        errorMessage: 'Mesaj gönderiminde hata oluştu.',
        catchError: 'Mesaj gönderirken bir hata oluştu.',
      },   
      scooterStats: {
        mainTitle: "Scooter Filosu'nun Üstel Büyümesi",
        subtitle: "2024, gelişim dinamikleri açısından rekor bir yıl oldu",
        scootersOnRoad: "Yollardaki scooter sayısı",
        scootersGrowth: "— yılın başına göre 5 kat daha fazla",
        usersPerDay: "Günlük kullanıcı sayısı",
        recordRides: "— rekor sayıda yolculuk",
        dailyEarnings: "Ortaklarımızın günlük kazancı —",
        monthlyEarnings: "\$300K+ aylık",
        quote: "Her yeni scooter 4-6 ay içinde kendini amorti eder ve pasif gelir sağlar",
        joinInvestors: "Yatırımcılara katılın",
        investmentTitle: "Yatırım yapmak düşündüğünüzden daha kolay!",
        step1Title: "Scooter'ımızı satın alın",
        step1Text: "Hemen web sitemizden sipariş verin",
        step2Title: "En popüler lokasyonlarda yerleştiriyoruz",
        step2Text: "Maksimum gelir için en uygun noktalar",
        step3Title: "Her yolculuktan pasif gelir elde edin",
        step3Text: "Hesabınıza günlük ödemeler",
        scooterGrowthTitle: "Çeyrekler itibarıyla scooter sayısındaki artış",
        userGrowthTitle: "Günlük kullanıcı sayısındaki artış",
    },
    commentSystem: {
      loadError: "Yorumlar yüklenirken hata",
      publishError: "Yorum yayımlarken hata",
      writeComment: "Yorum yaz",
      contactInfo: "İletişim Bilgileri",
      email: "E-posta",
      phone: "Telefon",
      address: "Adres",
      workingHours: "Çalışma Saatleri"
  },
  commentModal: {
    addComment: "Yorum Ekle",
    nameLabel: "İsim",
    usernameLabel: "Kullanıcı Adı TG (örneğin @username)",
    commentLabel: "Yorum",
    closeButton: "Kapat",
    publishButton: "Yayımla",
  },
  "investmentSlider": {
  "slide1": {
    "text1": "Birincil pazar: Bu butona tıklayarak scooter satın alma sürecine geçeceksiniz.",
    "text2": "İkincil pazar: Burada daha önce birincil pazarda satın aldığınız bir aracı satabilirsiniz."
  },
  "slide2": {
    "text1": "Bir araç satın almak size pasif gelir elde etme fırsatı sunar."
  },
  "slide3": {
    "text1": "Bu platformda aracınızı kolayca satabilirsiniz."
  },
  "slide4": {
    "text1": "Bu sayfa size araç sayınız ve günlük/aylık kazançlarınız hakkında bilgi sağlayacaktır."
  },
  "slide6": {
    "text1": "Ayrıca fonlarınızı bir banka hesabına çekebilir veya ödemeleri almak için bir kripto cüzdanı kullanabilirsiniz."
  },
  "slide7": {
    "text1": "Ayrıca kazançlarınızı yeniden yatırma seçeneğiniz de vardır, bu da gelecekte karınızı artırmanızı sağlar."
  },
  "slide8": {
    "text1": "Bu sayfada araçlarınızın mevcut durumunu takip edebilirsiniz."
  },
  "slide9": {
    "text1": "Belirli bir döneme ait tüm gelirleri görebileceğiniz detaylı istatistiklere erişebileceksiniz."
  },
  "promoHeading": "Yatırımlar hakkında daha fazla bilgi edinin",
  "promoText": "Yatırımcı olun ve pasif gelir elde edin.",
  "ctaButton": "Yatırımlara git"
}
    
        },
      },
    },
    lng: "ru", 
    fallbackLng: "ru", 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
