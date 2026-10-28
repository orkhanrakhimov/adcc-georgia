// ADCC Georgia – site script
// Renders the pages from data.json (edited through /admin), with built-in defaults as a fallback.
(function () {
  'use strict';

  var KA = {
 "ft.event": "ღონისძიება",
 "ft.community": "საზოგადოება",
 "ft.contact": "კონტაქტი",
 "nav.event.d": "ღონისძიების დეტალები",
 "nav.weighin": "აწონვა",
 "nav.tickets": "ბილეთები",
 "nav.rules": "წესები",
 "nav.faq": "ხშირი კითხვები",
 "nav.waiver": "განაცხადი",
 "nav.event": "ღონისძიება",
 "nav.previous": "წინა ღონისძიებები",
 "nav.shop": "მაღაზია",
 "nav.join": "გუნდში",
 "nav.sponsors": "პარტნიორები",
 "nav.contact": "კონტაქტი",
 "nav.register": "რეგისტრაცია",
 "cd.days": "დღე",
 "cd.hours": "საათი",
 "cd.minutes": "წუთი",
 "cd.seconds": "წამი",
 "hub.h": "ყველაფერი, <span>რაც გჭირდებათ</span>",
 "hub.sub": "დაგეგმეთ თქვენი დღე: ღონისძიების დეტალები, აწონვა, ბილეთები, წესები და სხვა.",
 "past.h": "წინა <span>ღონისძიებები</span>",
 "ct.h": "<span>დაგვიკავშირდით</span>",
 "ct.sub": "გაქვთ შეკითხვები რეგისტრაციის ან ღონისძიების შესახებ? მოგვწერეთ.",
 "nav.join.f": "შემოგვიერთდით გუნდში",
 "ft.about": "სუბმიშენ გრეპლინგის ღონისძიებები თბილისში, საქართველო.",
 "ft.rights": "© <span class=\"js-year\">2026</span> ADCC Georgia. ყველა უფლება დაცულია.",
 "ft.privacy": "კონფიდენციალურობის პოლიტიკა",
 "ft.terms": "პირობები და საავტორო უფლებები",
 "title.rules": "წესები და რეგულაციები – ADCC Georgia",
 "rl.h1": "წესები და <em>რეგულაციები</em>",
 "rl.p": "მოკლე გზამკვლევი სპორტსმენებისა და მწვრთნელებისთვის: როგორ ირიცხება ქულები, რა არის აკრძალული და რა დროითი ლიმიტებია თითოეულ დივიზიაში. სრული ოფიციალური ტექსტისთვის იხილეთ <a href=\"https://adcombat.com/adcc-rules-regulations/\" target=\"_blank\" rel=\"noopener\">ADCC-ის წესები და რეგულაციები</a>.",
 "back": "← მთავარ გვერდზე დაბრუნება",
 "title.weighin": "აწონვა – ADCC Georgia",
 "wi.h1": "აწონვის <em>განრიგი</em>",
 "wi.loc": "ადგილმდებარეობა",
 "wi.sm": "თქვენი დივიზიისა და ღონისძიების სხვა დეტალებისთვის იხილეთ ღონისძიების გვერდი Smoothcomp-ზე.",
 "title.tickets": "ბილეთები – ADCC Georgia",
 "tk.h1": "ღონისძიების <em>ბილეთები</em>",
 "tk.q": "გაქვთ კითხვები ბილეთებზე? მოგვწერეთ.",
 "title.shop": "მერჩი და აღჭურვილობა – ADCC Georgia",
 "shop.h1": "მერჩი და <em>აღჭურვილობა</em>",
 "shop.q": "გაქვთ შეკითხვები მერჩსა ან ზომებზე? მოგვწერეთ.",
 "title.join": "შემოგვიერთდით გუნდში – ADCC Georgia",
 "join.h1": "შემოგვიერთდით <em>გუნდში</em>",
 "ev.how": "როგორ მივიღოთ მონაწილეობა",
 "ev.s1": "გახსენით ღონისძიების გვერდი Smoothcomp-ზე",
 "ev.s2": "შექმენით ანგარიში ან შედით სისტემაში",
 "ev.s3": "აირჩიეთ დივიზია და დაასრულეთ რეგისტრაცია",
 "ev.s4": "ღონისძიებამდე გაეცანით ADCC-ის წესებს",
 "ev.sub": "ყველაფერი, რაც დღის შესახებ უნდა იცოდეთ.",
 "title.event": "ღონისძიების დეტალები – ADCC Georgia",
 "event.h1": "ღონისძიების <em>დეტალები</em>",
 "past.sub": "ფოტოები, შედეგები და მნიშვნელოვანი მომენტები ADCC Georgia-ს წინა ღონისძიებებიდან.",
 "title.previous-events": "წინა ღონისძიებები – ADCC Georgia",
 "previous-events.h1": "წინა <em>ღონისძიებები</em>",
 "title.contact": "კონტაქტი – ADCC Georgia",
 "contact.h1": "<em>დაგვიკავშირდით</em>",
 "faq.sub": "სწრაფი პასუხები სპორტსმენებისთვის, მწვრთნელებისა და მაყურებლებისთვის.",
 "title.faq": "ხშირი კითხვები – ADCC Georgia",
 "faq.h1": "ხშირი <em>კითხვები</em>",
 "wv.f.name": "სახელი და გვარი",
 "wv.f.dob": "დაბადების თარიღი",
 "wv.f.id": "პირადობის / პასპორტის ნომერი",
 "wv.f.phone": "ტელეფონი",
 "wv.f.email": "ელფოსტა",
 "wv.f.team": "გუნდი / კლუბი",
 "wv.f.div": "დივიზია / წონითი კატეგორია",
 "wv.f.em": "საკონტაქტო პირი საგანგებო შემთხვევისთვის (სახელი)",
 "wv.f.emp": "საკონტაქტო პირის ტელეფონი",
 "wv.g.name": "მშობლის / მეურვის სახელი და გვარი",
 "wv.help": "სურვილისამებრ შეავსეთ მონაცემები ეკრანზე, შემდეგ დაბეჭდეთ გვერდი, ხელით მოაწერეთ ხელი და წამოიღეთ აწონვაზე. შეგიძლიათ ცარიელიც დაბეჭდოთ და კალმით შეავსოთ.",
 "wv.print": "ბეჭდვა / PDF-ად შენახვა",
 "wv.clear": "ფორმის გასუფთავება",
 "wv.s.ath": "სპორტსმენის ხელმოწერა",
 "wv.s.date": "თარიღი",
 "wv.s.gu": "მშობლის / მეურვის ხელმოწერა",
 "wv.s.date2": "თარიღი",
 "wv.title": "მონაწილის განაცხადი და პასუხისმგებლობისგან გათავისუფლება",
 "wv.agree": "ქვემოთ ხელმოწერით ვადასტურებ, რომ წავიკითხე, გავიგე და ვეთანხმები ყველაფერს ზემოთ ჩამოთვლილს.",
 "wv.g.h": "მშობელი ან მეურვე (18 წლამდე სპორტსმენებისთვის)",
 "wv.sub": "წაიკითხეთ განაცხადი, შეავსეთ, დაბეჭდეთ და ხელი მოაწერეთ.",
 "title.waiver": "განაცხადი – ADCC Georgia",
 "waiver.h1": "მონაწილის <em>განაცხადი</em>",
 "title.sponsors": "პარტნიორები – ADCC Georgia",
 "sponsors.h1": "გახდით ჩვენი <em>პარტნიორი</em>",
 "privacy.intro": "ეს პოლიტიკა განმარტავს, რა პერსონალურ ინფორმაციას აგროვებს ADCC Georgia ამ ვებგვერდის მეშვეობით, რატომ ვაგროვებთ მას და რა არჩევანი გაქვთ.",
 "privacy.t1": "ბოლო განახლება: 2026 წლის 20 ოქტომბერი",
 "privacy.t2": "ვინ ვართ ჩვენ",
 "privacy.t3": "ADCC Georgia („ჩვენ“) მართავს სუბმიშენ გრეპლინგის ღონისძიებებს თბილისში, საქართველო. კონფიდენციალურობასთან დაკავშირებულ ნებისმიერ საკითხზე დაგვიკავშირდით: <a class=\"js-email\" href=\"#\"></a>.",
 "privacy.t4": "რა ინფორმაციას ვაგროვებთ",
 "privacy.t5": "ჩვენ ვაგროვებთ მხოლოდ იმას, რასაც თავად გვიგზავნით:",
 "privacy.t6": "განაცხადის ფორმები („შემოგვიერთდით გუნდში“): თქვენი სახელი და გვარი, ელფოსტა, ტელეფონი ან WhatsApp ნომერი, ქალაქი, ენები, სოციალური ქსელის ან პორტფოლიოს ბმულები, გამოცდილება და ჩვენს კითხვებზე პასუხები.",
 "privacy.t7": "შეტყობინებები: ყველაფერი, რასაც გვწერთ ელფოსტით, WhatsApp-ით, Instagram-ით ან Facebook-ით, მათ შორის საკონტაქტო მონაცემები და, ბილეთების ან მერჩის შემთხვევაში, შეკვეთის დეტალები.",
 "privacy.t8": "ეს ვებგვერდი არ იყენებს სარეკლამო ან თვალთვალის ქუქი-ფაილებს და არ აქვს ანალიტიკა. თქვენი ენის არჩევანი ინახება მხოლოდ თქვენს ბრაუზერში და ჩვენთან არ იგზავნება.",
 "privacy.t9": "როგორ ვიყენებთ თქვენს ინფორმაციას",
 "privacy.t10": "თქვენი განაცხადის განსახილველად და მსაჯების, საორგანიზაციო გუნდის წევრებისა და მედიააკრედიტაციის შესახებ გადაწყვეტილების მისაღებად.",
 "privacy.t11": "თქვენთან დასაკავშირებლად განაცხადის, ღონისძიების ან თქვენი შეკითხვის თაობაზე.",
 "privacy.t12": "ჩვენი ღონისძიებების ორგანიზებისა და ჩასატარებლად.",
 "privacy.t13": "ჩვენ არ ვყიდით თქვენს ინფორმაციას და არ გიგზავნით სარეკლამო შეტყობინებებს, თუ ამას თავად არ მოგვთხოვთ.",
 "privacy.t14": "სამართლებრივი საფუძველი",
 "privacy.t15": "თქვენს ინფორმაციას ვამუშავებთ თქვენი თანხმობის საფუძველზე, რომელსაც გვაძლევთ ფორმებზე ველის მონიშვნით, და თქვენს მოთხოვნებზე საპასუხოდ. თანხმობის გამოხმობა ნებისმიერ დროს შეგიძლიათ.",
 "privacy.t16": "ვის გადაეცემა თქვენი ინფორმაცია",
 "privacy.t17": "ვებგვერდის მუშაობისთვის ვიყენებთ სანდო სერვისებს. ისინი მონაცემებს ამუშავებენ მხოლოდ თავიანთი სერვისის გასაწევად:",
 "privacy.t18": "Web3Forms განაცხადის ფორმებს ჩვენს ელფოსტაზე აგზავნის.",
 "privacy.t19": "Google (Gmail) ინახავს ჩვენს ელფოსტას.",
 "privacy.t20": "GitHub (GitHub Pages) ინახავს ამ ვებგვერდს და შეიძლება აღრიცხავდეს ტექნიკურ მონაცემებს, მაგალითად თქვენს IP მისამართს, ვიზიტისას.",
 "privacy.t21": "Google Fonts გვთავაზობს ვებგვერდის შრიფტებს, ამიტომ თქვენი ბრაუზერი უკავშირდება Google-ის სერვერებს და მათთვის თქვენი IP მისამართი ჩანს.",
 "privacy.t22": "Smoothcomp ღონისძიების რეგისტრაციას თავის ვებგვერდზე და საკუთარი კონფიდენციალურობის პოლიტიკით ამუშავებს.",
 "privacy.t23": "WhatsApp, Instagram და Facebook (Meta) ამუშავებენ თქვენს შეტყობინებებს, თუ ჩვენ მათ მეშვეობით გვიკავშირდებით.",
 "privacy.t24": "ინფორმაცია შეიძლება გავცეთ იმ შემთხვევაშიც, როცა ამას კანონი მოითხოვს. პერსონალურ მონაცემებს არ ვყიდით.",
 "privacy.t25": "რამდენ ხანს ვინახავთ",
 "privacy.t26": "განაცხადებსა და შეტყობინებებს ვინახავთ მხოლოდ იმდენ ხანს, რამდენიც საჭიროა თქვენი განაცხადის განსახილველად, ღონისძიებების დასაგეგმად და თქვენთვის პასუხის გასაცემად. ვშლით, როცა აღარ გვჭირდება ან როცა ამას მოგვთხოვთ.",
 "privacy.t27": "თქვენი უფლებები",
 "privacy.t28": "შეგიძლიათ მოგვთხოვოთ, გაჩვენოთ თქვენ შესახებ არსებული ინფორმაცია, შევასწოროთ ის, წავშალოთ ან შევწყვიტოთ მისი გამოყენება, ასევე ნებისმიერ დროს გამოიხმოთ თანხმობა. მოგვწერეთ: <a class=\"js-email\" href=\"#\"></a> და რაც შეიძლება სწრაფად გიპასუხებთ. გაქვთ უფლება, ასევე მიმართოთ საქართველოს პერსონალურ მონაცემთა დაცვის სამსახურს.",
 "privacy.t29": "ფოტო და ვიდეო ჩვენს ღონისძიებებზე",
 "privacy.t30": "ჩვენი ღონისძიებები საჯაროა. ჩვენ და აკრედიტებულ მედიას შეგვიძლია გადავიღოთ ფოტოები და ვიდეოები ღონისძიებებზე და გამოვაქვეყნოთ ისინი ამ ვებგვერდზე და ჩვენს სოციალურ ქსელებში ADCC Georgia-ს პოპულარიზაციისთვის. თუ არ გსურთ ფოტოზე ან ვიდეოზე გამოჩნდეთ, ან გსურთ მისი წაშლა, მოგვწერეთ ელფოსტით და მასზე ბმულს გამოგვიგზავნეთ — წავშლით.",
 "privacy.t31": "უსაფრთხოება და არასრულწლოვნები",
 "privacy.t32": "თქვენი ინფორმაციის დასაცავად გონივრულ ზომებს ვიღებთ, თუმცა გადაცემისა და შენახვის არც ერთი მეთოდი არ არის სრულად უსაფრთხო. ამ ვებგვერდზე არსებული განაცხადის ფორმები განკუთვნილია ზრდასრულებისთვის (18 წლის და უფროსი). სპორტსმენები რეგისტრაციას გადიან Smoothcomp-ზე.",
 "privacy.t33": "გარე ბმულები",
 "privacy.t34": "ეს ვებგვერდი შეიცავს ბმულებს სხვა საიტებზე, მაგალითად Smoothcomp, Facebook, Instagram და WhatsApp. ჩვენ არ ვართ პასუხისმგებელი მათ კონფიდენციალურობის პრაქტიკაზე.",
 "privacy.t35": "პოლიტიკის ცვლილებები",
 "privacy.t36": "ჩვენ შეიძლება განვაახლოთ ეს პოლიტიკა. გვერდის თავში მითითებული თარიღი აჩვენებს ბოლო ცვლილების დროს.",
 "privacy.t37": "ინგლისური და ქართული ტექსტის განსხვავების შემთხვევაში უპირატესობა ენიჭება ინგლისურ ვერსიას.",
 "title.privacy": "კონფიდენციალურობის პოლიტიკა – ADCC Georgia",
 "privacy.h1": "კონფიდენციალურობის <em>პოლიტიკა</em>",
 "terms.intro": "ამ ვებგვერდით სარგებლობით თქვენ ეთანხმებით ამ პირობებს. თუ არ ეთანხმებით, გთხოვთ, ნუ გამოიყენებთ ვებგვერდს.",
 "terms.t1": "ბოლო განახლება: 2026 წლის 20 ოქტომბერი",
 "terms.t2": "საავტორო უფლებები",
 "terms.t3": "© <span class=\"js-year\">2026</span> ADCC Georgia. ყველა უფლება დაცულია.",
 "terms.t4": "ამ ვებგვერდის შინაარსი, მათ შორის ტექსტი, დიზაინი, გრაფიკა, ლოგოები, ფოტოები და ვიდეოები, ეკუთვნის ADCC Georgia-ს ან გამოიყენება მფლობელთა ნებართვით. ჩვენი წინასწარი წერილობითი თანხმობის გარეშე აკრძალულია მისი კოპირება, გავრცელება, გამოქვეყნება ან შეცვლა. შეგიძლიათ დაათვალიეროთ ვებგვერდი და გააზიაროთ მასზე ბმულები პირადი, არაკომერციული მიზნით, ასევე ციტირება მოახდინოთ მცირე ნაწილების, ავტორის მკაფიო მითითებითა და adcc.ge-ზე ბმულით.",
 "terms.t5": "სავაჭრო ნიშნები",
 "terms.t6": "ADCC და მასთან დაკავშირებული სახელები და ლოგოები მათი შესაბამისი მფლობელების სავაჭრო ნიშნებია და ამ ვებგვერდზე მათი გამოჩენა თქვენ არავითარ უფლებას არ გაძლევთ. Smoothcomp, WhatsApp, Instagram, Facebook და აქ მოხსენიებული სხვა სახელები მათ შესაბამის მფლობელებს ეკუთვნით.",
 "terms.t7": "ფოტო და მედია",
 "terms.t8": "ამ ვებგვერდზე არსებულ ფოტოებსა და ვიდეოებს ქმნის ADCC Georgia ან აკრედიტებული მედია, რომელიც დათანხმდა ჩვენს მედიაპირობებს; შესაძლებლობისას მითითებულია ავტორი. ნებართვის გარეშე მათი ხელახლა გამოყენება აკრძალულია. ავტორის მითითების, შესწორების ან წაშლის თხოვნით მოგვწერეთ ელფოსტით.",
 "terms.t9": "ინფორმაცია ვებგვერდზე",
 "terms.t10": "ვცდილობთ, თარიღები, ფასები, განრიგები და სხვა დეტალები ზუსტი იყოს, თუმცა ისინი შეიძლება შეიცვალოს. ოფიციალურ ADCC წესებს აქვეყნებს ADCC. ამ ვებგვერდზე არსებული წესების გვერდი მათი გასაგებად მოკლე მიმოხილვაა და არ ანაცვლებს ოფიციალურ წესებს. რეგისტრაცია, დივიზიები და მონაწილეობის საფასური იმართება Smoothcomp-ის ღონისძიების გვერდზე.",
 "terms.t11": "ბილეთები და მერჩი",
 "terms.t12": "ბილეთების შეძენა შესაძლებელია შესასვლელთან, ხოლო მერჩის შეკვეთა ხდება WhatsApp-ით. ფასები და ხელმისაწვდომობა შეიძლება შეიცვალოს და გადახდამდე თქვენთან დაზუსტდება.",
 "terms.t13": "მონაწილეობა და რისკი",
 "terms.t14": "გრეპლინგი და სხვა საბრძოლო სპორტი ტრავმის რისკს შეიცავს. სპორტსმენები მონაწილეობენ საკუთარი პასუხისმგებლობით და რეგისტრაციისას იღებენ ღონისძიების პირობებსა და წესებს. მაყურებლები ღონისძიებას ესწრებიან საკუთარი პასუხისმგებლობით და უნდა დაიცვან ორგანიზატორების მითითებები.",
 "terms.t15": "გამოყენების წესები",
 "terms.t16": "ნუ გამოიყენებთ ვებგვერდს არასათანადოდ. ნუ შეეცდებით მისი მუშაობის შეფერხებას, ნუ გამოაგზავნით სპამს ან ყალბ განაცხადებს ფორმებით და ნუ შეაგროვებთ მისგან ინფორმაციას ავტომატურად.",
 "terms.t17": "გარე ბმულები",
 "terms.t18": "ჩვენ არ ვართ პასუხისმგებელი იმ ვებგვერდების შინაარსსა და პრაქტიკაზე, რომლებზეც ბმულებს ვაძლევთ.",
 "terms.t19": "პასუხისმგებლობა",
 "terms.t20": "ეს ვებგვერდი მოწოდებულია „როგორც არის“. კანონით დაშვებულ ფარგლებში ADCC Georgia არ არის პასუხისმგებელი ვებგვერდის გამოყენებით ან მისი ინფორმაციის საფუძველზე გამოწვეულ ზიანზე.",
 "terms.t21": "მოქმედი კანონმდებლობა",
 "terms.t22": "ეს პირობები რეგულირდება საქართველოს კანონმდებლობით.",
 "terms.t23": "ცვლილებები და კონტაქტი",
 "terms.t24": "ჩვენ შეიძლება განვაახლოთ ეს პირობები. გვერდის თავში მითითებული თარიღი აჩვენებს ბოლო ცვლილების დროს. გაქვთ კითხვები? მოგვწერეთ: <a class=\"js-email\" href=\"#\"></a>.",
 "terms.t25": "ინგლისური და ქართული ტექსტის განსხვავების შემთხვევაში უპირატესობა ენიჭება ინგლისურ ვერსიას.",
 "title.terms": "პირობები და საავტორო უფლებები – ADCC Georgia",
 "terms.h1": "პირობები და <em>საავტორო უფლებები</em>",
 "title.404": "გვერდი ვერ მოიძებნა – ADCC Georgia",
 "nf.h1": "გვერდი <em>ვერ მოიძებნა</em>",
 "nf.p": "გვერდი, რომელსაც ეძებთ, არ არსებობს ან გადატანილია.",
 "nf.home": "მთავარ გვერდზე გადასვლა",
 "nf.event": "ღონისძიების დეტალები",
 "nf.contact": "დაგვიკავშირდით"
};              // static page text: key -> Georgian
  var UI = {
 "hero.eb": [
  "Next event",
  "უახლოესი ღონისძიება"
 ],
 "hero.eb.today": [
  "Happening today",
  "დღეს იმართება"
 ],
 "hero.eb.over": [
  "Event finished",
  "ღონისძიება დასრულდა"
 ],
 "cd.today": [
  "The event is happening today!",
  "ღონისძიება დღეს იმართება!"
 ],
 "cd.over": [
  "The event is over. Thank you all!",
  "ღონისძიება დასრულდა. გმადლობთ ყველას!"
 ],
 "hero.register": [
  "Register on Smoothcomp",
  "რეგისტრაცია Smoothcomp-ზე"
 ],
 "hero.rules": [
  "Rules & regulations",
  "წესები და რეგულაციები"
 ],
 "hero.results": [
  "See results",
  "შედეგების ნახვა"
 ],
 "hero.follow": [
  "Follow us",
  "გამოგვიწერეთ"
 ],
 "ev.date": [
  "Date",
  "თარიღი"
 ],
 "ev.start": [
  "Start",
  "დაწყება"
 ],
 "ev.venue": [
  "Venue",
  "ადგილი"
 ],
 "ev.rules": [
  "Rules",
  "წესები"
 ],
 "ev.entry": [
  "Entry",
  "მონაწილეობა"
 ],
 "ev.map": [
  "View on map →",
  "რუკაზე ნახვა →"
 ],
 "ev.rules.v": [
  "ADCC rules",
  "ADCC-ის წესები"
 ],
 "ev.rules.exp": [
  "Rules explained →",
  "წესები განმარტებით →"
 ],
 "ev.rules.off": [
  "Official ADCC rules →",
  "ADCC-ის ოფიციალური წესები →"
 ],
 "ev.cta": [
  "Register / full info",
  "რეგისტრაცია / სრული ინფორმაცია"
 ],
 "lk.weigh.t": [
  "Weigh-in schedule",
  "აწონვის განრიგი"
 ],
 "lk.tick.t": [
  "Tickets",
  "ბილეთები"
 ],
 "lk.go": [
  "See details →",
  "დეტალები →"
 ],
 "cur": [
  "GEL",
  "ლარი"
 ],
 "free": [
  "Free",
  "უფასო"
 ],
 "past.p": [
  "Our last event was {name}. Photos are on our Facebook page, and the official results are on the ADCC website.",
  "ჩვენი ბოლო ღონისძიება იყო {name}. ფოტოები იხილეთ ჩვენს Facebook გვერდზე, ხოლო ოფიციალური შედეგები — ADCC-ის ვებგვერდზე."
 ],
 "past.fb": [
  "See photos on Facebook",
  "ფოტოები Facebook-ზე"
 ],
 "past.res": [
  "Results: {name}",
  "შედეგები: {name}"
 ],
 "ct.email": [
  "Email",
  "ელფოსტა"
 ],
 "ct.follow": [
  "Follow us",
  "გამოგვიწერეთ"
 ],
 "wa.choose": [
  "Chat on WhatsApp with:",
  "მოგვწერეთ WhatsApp-ზე:"
 ],
 "wi.p": [
  "Weigh-in times and location.",
  "აწონვის დრო და ადგილი."
 ],
 "wi.note": [
  "The event itself starts at {time} on {date}.",
  "თავად ღონისძიება {date} {time} საათზე იწყება."
 ],
 "wi.btn": [
  "Open event on Smoothcomp",
  "ღონისძიება Smoothcomp-ზე"
 ],
 "georgia": [
  "Georgia",
  "საქართველო"
 ],
 "tk.p": [
  "Ticket options for {date}, {venue}, {addr}.",
  "ბილეთების ტიპები: {date}, {venue}, {addr}."
 ],
 "tk.wa": [
  "Message us on WhatsApp",
  "მოგვწერეთ WhatsApp-ზე"
 ],
 "over.t": [
  "This event is over",
  "ეს ღონისძიება დასრულდა"
 ],
 "over.note": [
  "The information on this page is from the event that has finished. The next event will be announced here. Follow us on social media to be the first to know.",
  "ამ გვერდზე მოცემული ინფორმაცია დასრულებულ ღონისძიებას ეხება. შემდეგი ღონისძიება აქ გამოვაცხადებთ. თვალი ადევნეთ ჩვენს სოციალურ ქსელებს, რომ პირველებმა გაიგოთ."
 ],
 "lk.shop.t": [
  "Merch & gear",
  "მერჩი და აღჭურვილობა"
 ],
 "lk.soon": [
  "Coming soon →",
  "მალე →"
 ],
 "shop.soon": [
  "Coming soon",
  "მალე"
 ],
 "shop.sold": [
  "Sold out",
  "გაყიდულია"
 ],
 "shop.order": [
  "Order on WhatsApp",
  "შეკვეთა WhatsApp-ზე"
 ],
 "shop.banner": [
  "Our first collection is on the way. Follow us on Instagram to be the first to know.",
  "ჩვენი პირველი კოლექცია მალე გამოჩნდება. გამოგვიწერეთ Instagram-ზე, რომ პირველებმა გაიგოთ."
 ],
 "shop.ig": [
  "Follow on Instagram",
  "გამოგვიწერეთ Instagram-ზე"
 ],
 "shop.msg": [
  "Hi! I'd like to order: {name}",
  "გამარჯობა! მინდა შევუკვეთო: {name}"
 ],
 "shop.msg.size": [
  ", size {size}",
  ", ზომა {size}"
 ],
 "shop.pick": [
  "Choose a size",
  "აირჩიეთ ზომა"
 ],
 "shop.q": [
  "Questions about merch or sizes? Message us.",
  "გაქვთ შეკითხვები მერჩსა ან ზომებზე? მოგვწერეთ."
 ],
 "lk.join.t": [
  "Join the team",
  "შემოგვიერთდით გუნდში"
 ],
 "lk.join.p": [
  "Referees, organisation team and media accreditation. Apply here.",
  "მსაჯები, საორგანიზაციო გუნდი და მედიააკრედიტაცია. განაცხადი აქ."
 ],
 "join.open": [
  "Open",
  "ღიაა"
 ],
 "join.closed": [
  "Closed",
  "დახურულია"
 ],
 "join.closedmsg": [
  "Applications for this role are closed right now. Follow us for the next call.",
  "ამ როლზე განაცხადების მიღება ამჟამად დახურულია. მომდევნო ნაკრების შესახებ გამოგვიწერეთ."
 ],
 "join.pick": [
  "Choose a role above to apply.",
  "განაცხადისთვის აირჩიეთ როლი ზემოთ."
 ],
 "join.apply": [
  "Apply:",
  "განაცხადი:"
 ],
 "join.submit": [
  "Send application",
  "განაცხადის გაგზავნა"
 ],
 "join.sending": [
  "Sending…",
  "იგზავნება…"
 ],
 "join.optional": [
  "optional",
  "არასავალდებულო"
 ],
 "join.req": [
  "Please fill in this field.",
  "გთხოვთ, შეავსოთ ეს ველი."
 ],
 "join.pickone": [
  "Please choose at least one option.",
  "გთხოვთ, აირჩიოთ მინიმუმ ერთი ვარიანტი."
 ],
 "join.bademail": [
  "Please enter a valid email address.",
  "გთხოვთ, შეიყვანოთ სწორი ელფოსტა."
 ],
 "join.badurl": [
  "Please enter a valid link.",
  "გთხოვთ, შეიყვანოთ სწორი ბმული."
 ],
 "join.agree": [
  "You need to agree to continue.",
  "გასაგრძელებლად საჭიროა დათანხმება."
 ],
 "join.ok.t": [
  "Thank you!",
  "გმადლობთ!"
 ],
 "join.ok.p": [
  "We received your application. We will contact you if there is a match.",
  "თქვენი განაცხადი მივიღეთ. თუ თქვენი კანდიდატურა შეესაბამება, დაგიკავშირდებით."
 ],
 "join.err": [
  "Sorry, we could not send your application. Please try again, or send it by email.",
  "ვწუხვართ, განაცხადის გაგზავნა ვერ მოხერხდა. სცადეთ ხელახლა ან გამოგვიგზავნეთ ელფოსტით."
 ],
 "join.mail": [
  "Send by email",
  "გაგზავნა ელფოსტით"
 ],
 "join.mailopen": [
  "Your email app should open with your application ready. Press Send there to finish.",
  "ელფოსტის აპლიკაცია გაიხსნება თქვენი განაცხადით. დასასრულებლად დააჭირეთ გაგზავნას."
 ],
 "join.fix": [
  "Please check the highlighted fields.",
  "გთხოვთ, გადაამოწმოთ მონიშნული ველები."
 ],
 "hub.event.t": [
  "Event details",
  "ღონისძიების დეტალები"
 ],
 "hub.rules.t": [
  "Rules explained",
  "წესები განმარტებით"
 ],
 "hub.rules.p": [
  "Scoring, penalties and time limits for every division.",
  "ქულები, სანქციები და დროითი ლიმიტები ყველა დივიზიისთვის."
 ],
 "past.all": [
  "All previous events →",
  "ყველა წინა ღონისძიება →"
 ],
 "ct.all": [
  "All contact options →",
  "კონტაქტის ყველა გზა →"
 ],
 "ct.join": [
  "Want to be part of the team? Apply as a referee, organisation team member or media.",
  "გსურთ გუნდის ნაწილი გახდეთ? გაგზავნეთ განაცხადი მსაჯად, საორგანიზაციო გუნდში ან მედიისთვის."
 ],
 "ft.contact": [
  "Contact",
  "კონტაქტი"
 ],
 "past.view": [
  "View event →",
  "ღონისძიების ნახვა →"
 ],
 "past.search": [
  "Search athlete, team or country",
  "მოძებნეთ სპორტსმენი, გუნდი ან ქვეყანა"
 ],
 "past.back": [
  "← All events",
  "← ყველა ღონისძიება"
 ],
 "past.winners": [
  "Winners",
  "გამარჯვებულები"
 ],
 "past.photos": [
  "Photos",
  "ფოტოები"
 ],
 "past.resbtn": [
  "Official results",
  "ოფიციალური შედეგები"
 ],
 "past.soon": [
  "Results and photos will be added soon.",
  "შედეგები და ფოტოები მალე დაემატება."
 ],
 "lb.close": [
  "Close",
  "დახურვა"
 ],
 "lb.prev": [
  "Previous photo",
  "წინა ფოტო"
 ],
 "lb.next": [
  "Next photo",
  "შემდეგი ფოტო"
 ],
 "share.t": [
  "Share this event",
  "გააზიარეთ ღონისძიება"
 ],
 "share.wn": [
  "Weigh-in",
  "აწონვა"
 ],
 "wi.share.id": [
  "Bring an ID or passport",
  "წაიღეთ პირადობის მოწმობა ან პასპორტი"
 ],
 "share.tw": [
  "Share the weigh-in info",
  "გააზიარეთ აწონვის ინფორმაცია"
 ],
 "share.native": [
  "Share",
  "გაზიარება"
 ],
 "share.wa": [
  "WhatsApp",
  "WhatsApp"
 ],
 "share.fb": [
  "Facebook",
  "Facebook"
 ],
 "share.copy": [
  "Copy link",
  "ბმულის კოპირება"
 ],
 "share.copied": [
  "Link copied!",
  "ბმული დაკოპირდა!"
 ],
 "cal.t": [
  "Add to your calendar",
  "დაამატეთ კალენდარში"
 ],
 "cal.ics": [
  "Apple / Outlook (.ics)",
  "Apple / Outlook (.ics)"
 ],
 "cal.g": [
  "Google Calendar",
  "Google Calendar"
 ],
 "sp.why": [
  "Why partner with us",
  "რატომ ჩვენთან თანამშრომლობა"
 ],
 "sp.partners": [
  "Our partners",
  "ჩვენი პარტნიორები"
 ],
 "sp.form": [
  "Become a partner",
  "გახდით პარტნიორი"
 ],
 "sp.formp": [
  "Tell us about your company. We will get back to you by email.",
  "მოგვიყევით თქვენი კომპანიის შესახებ. ელფოსტით დაგიკავშირდებით."
 ],
 "sp.company": [
  "Company name",
  "კომპანიის სახელი"
 ],
 "sp.contact": [
  "Contact person",
  "საკონტაქტო პირი"
 ],
 "sp.position": [
  "Position",
  "პოზიცია"
 ],
 "sp.email": [
  "Email",
  "ელფოსტა"
 ],
 "sp.phone": [
  "Phone",
  "ტელეფონი"
 ],
 "sp.web": [
  "Website or social media",
  "ვებგვერდი ან სოციალური ქსელი"
 ],
 "sp.interest": [
  "What are you interested in?",
  "რა გაინტერესებთ?"
 ],
 "sp.msg": [
  "Message",
  "შეტყობინება"
 ],
 "sp.msgh": [
  "Tell us about your company and what you have in mind.",
  "მოგვიყევით თქვენი კომპანიის შესახებ და რა გაქვთ მხედველობაში."
 ],
 "sp.o1": [
  "Main partner",
  "მთავარი პარტნიორი"
 ],
 "sp.o2": [
  "Banner or mat branding",
  "ბანერი ან ხალიჩის ბრენდინგი"
 ],
 "sp.o3": [
  "Products or services (in-kind)",
  "პროდუქტი ან სერვისი (არაფულადი)"
 ],
 "sp.o4": [
  "Media partner",
  "მედია პარტნიორი"
 ],
 "sp.o5": [
  "Something else",
  "სხვა"
 ],
 "sp.send": [
  "Send inquiry",
  "მოთხოვნის გაგზავნა"
 ],
 "sp.ok.p": [
  "We received your inquiry and will contact you soon.",
  "თქვენი მოთხოვნა მივიღეთ და მალე დაგიკავშირდებით."
 ],
 "wi.waiver.t": [
  "Read and sign the waiver",
  "წაიკითხეთ და ხელი მოაწერეთ განაცხადს"
 ],
 "wi.waiver.p": [
  "Open the waiver, fill in your details, print it and sign it by hand. Bring the signed copy to the weigh-in.",
  "გახსენით განაცხადი, შეავსეთ თქვენი მონაცემები, დაბეჭდეთ და ხელით მოაწერეთ ხელი. ხელმოწერილი ეგზემპლარი წამოიღეთ აწონვაზე."
 ],
 "wi.waiver.b": [
  "Open the waiver",
  "განაცხადის გახსნა"
 ],
 "faq.more": [
  "Still have a question? Get in touch.",
  "კვლავ გაქვთ შეკითხვა? დაგვიკავშირდით."
 ],
 "ft.event": [
  "Event",
  "ღონისძიება"
 ],
 "ft.community": [
  "Community",
  "საზოგადოება"
 ],
 "ft.about": [
  "Submission grappling events in Tbilisi, Georgia.",
  "სუბმიშენ გრეპლინგის ღონისძიებები თბილისში, საქართველო."
 ],
 "ft.privacy": [
  "Privacy Policy",
  "კონფიდენციალურობის პოლიტიკა"
 ],
 "ft.terms": [
  "Terms & copyright",
  "პირობები და საავტორო უფლებები"
 ]
};              // dynamic text: key -> [English, Georgian]
  var DEFAULTS = {
 "event": {
  "name": "ADCC Georgia Nationals Open 2026",
  "highlight": "Nationals Open",
  "date": "2026-10-25",
  "time": "10:00",
  "endTime": "18:00",
  "venue": "Gymnastic Venue",
  "address": {
   "en": "Bob Walsh St., Dighomi, Tbilisi",
   "ka": "ბობ უოლშის ქ., დიღომი, თბილისი"
  },
  "mapUrl": "https://share.google/y7GhtUI64T7QmOd2G",
  "registerUrl": "https://smoothcomp.com/en/event/33419",
  "rulesUrl": "https://adcombat.com/adcc-rules-regulations/",
  "entry": {
   "en": "Entry fees, divisions, weight classes and the registration deadline are all on the Smoothcomp event page.",
   "ka": "მონაწილეობის საფასური, დივიზიები, წონითი კატეგორიები და რეგისტრაციის ბოლო ვადა მითითებულია Smoothcomp-ის გვერდზე."
  }
 },
 "weighin": {
  "days": [
   {
    "date": "2026-10-24",
    "from": "10:00",
    "to": "13:00",
    "label": {
     "en": "Day before the event",
     "ka": "ღონისძიების წინა დღე"
    }
   },
   {
    "date": "2026-10-25",
    "from": "07:00",
    "to": "08:00",
    "label": {
     "en": "Event day",
     "ka": "ღონისძიების დღე"
    }
   }
  ],
  "rule": {
   "title": {
    "en": "No weight tolerance",
    "ka": "წონაში ტოლერანტობა არ არის"
   },
   "text": {
    "en": "There is no allowance for any grams over the weight limit. Athletes must weigh exactly the limit of their weight class or less. An athlete who is over the limit, even by a few grams, will be disqualified, and the entry fee will not be refunded.",
    "ka": "წონის ლიმიტის გადაჭარბება ერთი გრამითაც არ დაიშვება. სპორტსმენის წონა უნდა იყოს ზუსტად თავისი წონითი კატეგორიის ლიმიტის ტოლი ან მასზე ნაკლები. სპორტსმენი, რომლის წონაც ლიმიტს აღემატება, თუნდაც რამდენიმე გრამით, დისკვალიფიცირებული იქნება და მონაწილეობის საფასური არ დაუბრუნდება."
   }
  },
  "idnote": {
   "title": {
    "en": "Bring your ID or passport",
    "ka": "წაიღეთ პირადობის მოწმობა ან პასპორტი"
   },
   "text": {
    "en": "When you come to weigh in, bring an ID card or a passport. Your identity will be confirmed at the weigh-in.",
    "ka": "აწონვაზე მოსვლისას თან იქონიეთ პირადობის მოწმობა ან პასპორტი. აწონვისას თქვენი ვინაობა დადასტურდება."
   }
  }
 },
 "tickets": {
  "items": [
   {
    "name": {
     "en": "Spectator",
     "ka": "მაყურებელი"
    },
    "price": "10",
    "desc": {
     "en": "Watching only.",
     "ka": "მხოლოდ საყურებლად."
    },
    "featured": false
   },
   {
    "name": {
     "en": "VIP",
     "ka": "VIP"
    },
    "price": "30",
    "desc": {
     "en": "Includes access to the warm-up area and the right to corner a fighter.",
     "ka": "მოიცავს გახურების ზონაში შესვლას და მებრძოლის კუთხეში ყოფნის უფლებას."
    },
    "featured": true
   },
   {
    "name": {
     "en": "Coaches",
     "ka": "მწვრთნელები"
    },
    "price": "",
    "desc": {
     "en": "Up to 2 coaches.",
     "ka": "მაქსიმუმ 2 მწვრთნელი."
    },
    "featured": false
   }
  ],
  "door": {
   "en": "Tickets can be bought at the door.",
   "ka": "ბილეთები იყიდება შესასვლელთან."
  }
 },
 "faq": {
  "items": [
   {
    "q": {
     "en": "How do I register?",
     "ka": "როგორ დავრეგისტრირდე?"
    },
    "a": {
     "en": "Register through the event page on Smoothcomp using the Register button on this site. Registration is online.",
     "ka": "რეგისტრაცია ხდება ღონისძიების გვერდზე Smoothcomp-ზე, ამ საიტზე არსებული რეგისტრაციის ღილაკით. რეგისტრაცია ონლაინ ხდება."
    }
   },
   {
    "q": {
     "en": "When and where is the weigh-in?",
     "ka": "როდის და სად არის აწონვა?"
    },
    "a": {
     "en": "See the Weigh-in page for the exact days, times and location.",
     "ka": "ზუსტი დღეები, დრო და ადგილი იხილეთ აწონვის გვერდზე."
    }
   },
   {
    "q": {
     "en": "What happens if I am over the weight limit?",
     "ka": "რა მოხდება, თუ წონა ლიმიტს აღემატება?"
    },
    "a": {
     "en": "There is no weight tolerance. An athlete who is over the limit, even by a few grams, is disqualified and the entry fee is not refunded.",
     "ka": "წონაში ტოლერანტობა არ არის. ლიმიტზე მეტი წონის (თუნდაც რამდენიმე გრამის) მქონე სპორტსმენი დისკვალიფიცირდება და მონაწილეობის საფასური არ უბრუნდება."
    }
   },
   {
    "q": {
     "en": "What do I need to bring to the weigh-in?",
     "ka": "რა უნდა წავიღო აწონვაზე?"
    },
    "a": {
     "en": "An ID card or a passport, so your identity can be confirmed.",
     "ka": "პირადობის მოწმობა ან პასპორტი, პიროვნების დასადასტურებლად."
    }
   },
   {
    "q": {
     "en": "Can spectators and coaches attend?",
     "ka": "შეუძლიათ მაყურებლებსა და მწვრთნელებს დასწრება?"
    },
    "a": {
     "en": "Yes. See the Tickets page for spectator and coach tickets and prices.",
     "ka": "დიახ. მაყურებლისა და მწვრთნელის ბილეთები და ფასები იხილეთ ბილეთების გვერდზე."
    }
   },
   {
    "q": {
     "en": "Where can I find the rules?",
     "ka": "სად ვიპოვო წესები?"
    },
    "a": {
     "en": "The Rules page explains scoring, penalties and time limits. It also links to the full official ADCC rules.",
     "ka": "წესების გვერდზე ახსნილია ქულები, ჯარიმები და დროითი ლიმიტები. იქ ასევე არის სრული ოფიციალური ADCC-ის წესების ბმული."
    }
   },
   {
    "q": {
     "en": "Can I volunteer, referee or cover the event as media?",
     "ka": "შემიძლია მოხალისედ, მსაჯად ან მედიის წარმომადგენლად ჩართვა?"
    },
    "a": {
     "en": "Yes. Use the Join us page to apply as a referee, for the organising team or for media accreditation.",
     "ka": "დიახ. გამოიყენეთ „გუნდში“ გვერდი მსაჯად, საორგანიზაციო გუნდში ან მედია აკრედიტაციისთვის სააპლიკაციოდ."
    }
   },
   {
    "q": {
     "en": "How can I contact you?",
     "ka": "როგორ დავგიკავშირდე?"
    },
    "a": {
     "en": "Message us on WhatsApp or email. Details are on the Contact page.",
     "ka": "მოგვწერეთ WhatsApp-ზე ან ელფოსტით. დეტალები იხილეთ კონტაქტის გვერდზე."
    }
   }
  ]
 },
 "waiver": {
  "sections": [
   {
    "title": {
     "en": "Voluntary participation",
     "ka": "ნებაყოფლობითი მონაწილეობა"
    },
    "text": {
     "en": "I am entering this event of my own free will. I have read and understood this waiver and I agree to follow the rules of the event and the instructions of the referees and organisers.",
     "ka": "მე ღონისძიებაში ვმონაწილეობ საკუთარი ნებით. წავიკითხე და გავიგე ეს განაცხადი და ვთანხმდები დავიცვა ღონისძიების წესები და მსაჯებისა და ორგანიზატორების მითითებები."
    }
   },
   {
    "title": {
     "en": "Risk of injury",
     "ka": "ტრავმის რისკი"
    },
    "text": {
     "en": "I understand that submission grappling is a contact sport with a risk of injury, including serious injury. I accept these risks and take part at my own risk.",
     "ka": "მესმის, რომ სუბმიშენ გრეპლინგი კონტაქტური სპორტია და არსებობს ტრავმის, მათ შორის მძიმე ტრავმის, რისკი. ამ რისკებს ვიღებ და მონაწილეობას ვიღებ საკუთარი პასუხისმგებლობით."
    }
   },
   {
    "title": {
     "en": "Health",
     "ka": "ჯანმრთელობა"
    },
    "text": {
     "en": "I confirm that I am in good health and fit to compete, and that I have no medical condition that makes it unsafe for me to take part. I will tell the organisers or the medical staff at once if this changes.",
     "ka": "ვადასტურებ, რომ ჯანმრთელი ვარ და შემიძლია შეჯიბრში მონაწილეობა, და არ მაქვს ისეთი სამედიცინო მდგომარეობა, რომელიც მონაწილეობას საფრთხეს უქმნის. თუ ეს შეიცვლება, დაუყოვნებლივ შევატყობინებ ორგანიზატორებს ან სამედიცინო პერსონალს."
    }
   },
   {
    "title": {
     "en": "Weigh-in and identity",
     "ka": "აწონვა და პიროვნების დადასტურება"
    },
    "text": {
     "en": "I will bring an ID card or passport to the weigh-in. I understand that there is no weight tolerance, and that if I am over the limit of my weight class I will be disqualified and the entry fee will not be refunded.",
     "ka": "აწონვაზე თან მექნება პირადობის მოწმობა ან პასპორტი. მესმის, რომ წონაში ტოლერანტობა არ არის და თუ ჩემი წონითი კატეგორიის ლიმიტს გადავაჭარბებ, დისკვალიფიცირებული ვიქნები და მონაწილეობის საფასური არ დამიბრუნდება."
    }
   },
   {
    "title": {
     "en": "Release of liability",
     "ka": "პასუხისმგებლობისგან გათავისუფლება"
    },
    "text": {
     "en": "To the fullest extent allowed by law, I release ADCC Georgia, its organisers, referees, staff, volunteers and the venue from claims for injury, loss or damage that arise from my taking part, except where the law does not allow this.",
     "ka": "კანონით დაშვებული მაქსიმალური ფარგლებით, ვათავისუფლებ ADCC Georgia-ს, მის ორგანიზატორებს, მსაჯებს, პერსონალს, მოხალისეებსა და ღონისძიების ადგილს ჩემი მონაწილეობით გამოწვეული ტრავმის, ზიანის ან დანაკარგის გამო პრეტენზიებისგან, გარდა იმ შემთხვევებისა, როცა კანონი ამას არ უშვებს."
    }
   },
   {
    "title": {
     "en": "Photos and video",
     "ka": "ფოტო და ვიდეო"
    },
    "text": {
     "en": "I agree that photos and video taken at the event, in which I may appear, can be used by ADCC Georgia and its partners to promote the event and the sport.",
     "ka": "ვთანხმდები, რომ ღონისძიებაზე გადაღებული ფოტო და ვიდეო მასალა, რომელზეც შესაძლოა ვჩანდე, ADCC Georgia-მ და მისმა პარტნიორებმა შეიძლება გამოიყენონ ღონისძიებისა და სპორტის პოპულარიზაციისთვის."
    }
   },
   {
    "title": {
     "en": "Personal data",
     "ka": "პერსონალური მონაცემები"
    },
    "text": {
     "en": "I agree that ADCC Georgia may keep the details on this form to run the event and to contact me or my emergency contact if needed.",
     "ka": "ვთანხმდები, რომ ADCC Georgia-მ ამ ფორმაზე მითითებული მონაცემები შეინახოს ღონისძიების ორგანიზებისთვის და საჭიროების შემთხვევაში ჩემთან ან ჩემს საკონტაქტო პირთან დასაკავშირებლად."
    }
   },
   {
    "title": {
     "en": "Athletes under 18",
     "ka": "18 წლამდე სპორტსმენები"
    },
    "text": {
     "en": "If the athlete is under 18, a parent or legal guardian must also read and sign this waiver and accepts it on the athlete's behalf.",
     "ka": "თუ სპორტსმენი 18 წლამდეა, ამ განაცხადს უნდა გაეცნოს და ხელი მოაწეროს მშობელმა ან კანონიერმა წარმომადგენელმა, რომელიც მას სპორტსმენის სახელით ეთანხმება."
    }
   }
  ]
 },
 "sponsors": {
  "intro": {
   "en": "ADCC Georgia brings elite submission grappling to Tbilisi. Partner with us and put your brand in front of a passionate sports community.",
   "ka": "ADCC Georgia თბილისში ელიტარულ სუბმიშენ გრეპლინგს მართავს. გახდით ჩვენი პარტნიორი და თქვენი ბრენდი გააცანით გატაცებულ სპორტულ საზოგადოებას."
  },
  "benefits": [
   {
    "title": {
     "en": "Visibility at the event",
     "ka": "ხილვადობა ღონისძიებაზე"
    },
    "text": {
     "en": "Your brand in front of athletes, coaches and spectators in the arena, through banners, mat or venue branding and announcements.",
     "ka": "თქვენი ბრენდი სპორტსმენების, მწვრთნელებისა და მაყურებლის თვალწინ ასპარეზზე: ბანერებით, ხალიჩის ან დარბაზის ბრენდინგითა და განცხადებებით."
    }
   },
   {
    "title": {
     "en": "An engaged community",
     "ka": "ჩართული საზოგადოება"
    },
    "text": {
     "en": "Reach a passionate and growing grappling community in Georgia and the region, from athletes and clubs to fans.",
     "ka": "მიაღწიეთ საქართველოსა და რეგიონში მზარდ გრეპლინგის საზოგადოებას, სპორტსმენებიდან და კლუბებიდან გულშემატკივრებამდე."
    }
   },
   {
    "title": {
     "en": "Online exposure",
     "ka": "ონლაინ ხილვადობა"
    },
    "text": {
     "en": "Your name and logo on our website and social media, including event announcements and results.",
     "ka": "თქვენი სახელი და ლოგო ჩვენს ვებგვერდსა და სოციალურ ქსელებში, მათ შორის ღონისძიების ანონსებსა და შედეგებში."
    }
   },
   {
    "title": {
     "en": "Photo and video content",
     "ka": "ფოტო და ვიდეო კონტენტი"
    },
    "text": {
     "en": "Event photos and video where your brand appears, which you can use in your own marketing.",
     "ka": "ღონისძიების ფოტო და ვიდეო მასალა, სადაც თქვენი ბრენდი ჩანს და რომელიც შეგიძლიათ საკუთარ მარკეტინგში გამოიყენოთ."
    }
   },
   {
    "title": {
     "en": "Support Georgian sport",
     "ka": "ქართული სპორტის მხარდაჭერა"
    },
    "text": {
     "en": "Help bring world-class submission grappling to Tbilisi and give local athletes a stage to compete.",
     "ka": "დაგვეხმარეთ მსოფლიო დონის სუბმიშენ გრეპლინგი თბილისში მოვიტანოთ და ადგილობრივ სპორტსმენებს შეჯიბრის სცენა მივცეთ."
    }
   },
   {
    "title": {
     "en": "A package that fits you",
     "ka": "თქვენზე მორგებული პაკეტი"
    },
    "text": {
     "en": "Cash or in-kind support, one event or longer. We agree what is included together, so it matches your goals and budget.",
     "ka": "ფულადი ან არაფულადი მხარდაჭერა, ერთი ღონისძიება ან უფრო ხანგრძლივი თანამშრომლობა. რას მოიცავს, ერთად შევთანხმდებით, რათა თქვენს მიზნებსა და ბიუჯეტს შეესაბამებოდეს."
    }
   }
  ],
  "partners": []
 },
 "contact": {
  "email": "adccgeorgia@gmail.com",
  "whatsapp": [
   {
    "label": "WhatsApp",
    "number": "+995 595 60 66 70"
   },
   {
    "label": "WhatsApp 2",
    "number": "+995 591 12 13 01"
   }
  ],
  "instagram": "adccgeorgia",
  "facebook": "adccgeorgia",
  "location": {
   "en": "Tbilisi, Georgia",
   "ka": "თბილისი, საქართველო"
  }
 },
 "shop": {
  "intro": {
   "en": "Official ADCC Georgia merch and training gear.",
   "ka": "ADCC Georgia-ს ოფიციალური მერჩი და სავარჯიშო აღჭურვილობა."
  },
  "note": {
   "en": "Orders are taken on WhatsApp. We confirm size, price and pickup with you in the chat.",
   "ka": "შეკვეთა მიიღება WhatsApp-ზე. ზომას, ფასსა და მიღების წესს ჩატში დაგიზუსტებთ."
  },
  "categories": [
   {
    "name": {
     "en": "Merch",
     "ka": "მერჩი"
    },
    "desc": {
     "en": "Hoodies, T-shirts, sweaters and caps.",
     "ka": "ჰუდები, მაისურები, სვიტრები და კეპები."
    },
    "items": [],
    "coming": [
     {
      "name": {
       "en": "Hoodies",
       "ka": "ჰუდები"
      },
      "icon": "hoodie"
     },
     {
      "name": {
       "en": "T-shirts",
       "ka": "მაისურები"
      },
      "icon": "tshirt"
     },
     {
      "name": {
       "en": "Sweaters",
       "ka": "სვიტრები"
      },
      "icon": "sweater"
     },
     {
      "name": {
       "en": "Caps",
       "ka": "კეპები"
      },
      "icon": "cap"
     }
    ]
   },
   {
    "name": {
     "en": "Gear",
     "ka": "აღჭურვილობა"
    },
    "desc": {
     "en": "Rash guards, shorts and bags for training and competition.",
     "ka": "რეშგარდები, შორტები და ჩანთები ვარჯიშისა და შეჯიბრისთვის."
    },
    "items": [],
    "coming": [
     {
      "name": {
       "en": "Rash guards",
       "ka": "რეშგარდები"
      },
      "icon": "rashguard"
     },
     {
      "name": {
       "en": "Shorts",
       "ka": "შორტები"
      },
      "icon": "shorts"
     },
     {
      "name": {
       "en": "Bags",
       "ka": "ჩანთები"
      },
      "icon": "bag"
     }
    ]
   }
  ]
 },
 "join": {
  "accessKey": "",
  "intro": {
   "en": "Be part of the ADCC Georgia team. Choose a role, tell us about yourself and we will contact you if there is a match.",
   "ka": "გახდით ADCC Georgia-ს გუნდის ნაწილი. აირჩიეთ როლი, მოგვიყევით თქვენ შესახებ და თუ კანდიდატურა შეესაბამება, დაგიკავშირდებით."
  },
  "referee": {
   "open": true,
   "note": {
    "en": "",
    "ka": ""
   }
  },
  "organisation": {
   "open": true,
   "note": {
    "en": "",
    "ka": ""
   }
  },
  "media": {
   "open": true,
   "note": {
    "en": "",
    "ka": ""
   },
   "terms": {
    "en": "If I am accredited, I agree that ADCC Georgia may use the photos and videos I produce at ADCC Georgia events, free of charge, for promotion, publications and social media, with credit to me where possible. I keep the copyright to my work.",
    "ka": "აკრედიტაციის მიღების შემთხვევაში ვეთანხმები, რომ ADCC Georgia-ს შეუძლია უსასყიდლოდ გამოიყენოს ჩემ მიერ ADCC Georgia-ს ღონისძიებებზე შექმნილი ფოტოები და ვიდეოები პოპულარიზაციის, პუბლიკაციებისა და სოციალური ქსელებისთვის, შესაძლებლობის შემთხვევაში ჩემი ავტორობის მითითებით. ჩემი ნამუშევრის საავტორო უფლებები რჩება ჩემთან."
   }
  },
  "privacy": {
   "en": "I agree that ADCC Georgia may store and use the information in this form only to review my application and contact me.",
   "ka": "ვეთანხმები, რომ ADCC Georgia-მ ამ ფორმაში მითითებული ინფორმაცია შეინახოს და გამოიყენოს მხოლოდ ჩემი განაცხადის განსახილველად და ჩემთან დასაკავშირებლად."
  }
 },
 "banner": {
  "enabled": false,
  "text": {
   "en": "",
   "ka": ""
  },
  "link": "",
  "linkText": {
   "en": "Learn more",
   "ka": "დეტალები"
  }
 },
 "previous": {
  "name": "ADCC Georgia Open 2025",
  "resultsUrl": "https://adcombat.com/adcc-events/adcc-georgia-open-2025/",
  "events": [
   {
    "name": "ADCC Georgia Nationals Open 2026",
    "date": "2026-10-25",
    "venue": "Gymnastic Venue, Dighomi, Tbilisi",
    "summary": {
     "en": "",
     "ka": ""
    },
    "resultsUrl": "",
    "winners": "",
    "photos": []
   },
   {
    "name": "ADCC Georgia Open 2025",
    "date": "2025-10-12",
    "venue": "Rustavi Sport Palace, Rustavi",
    "summary": {
     "en": "",
     "ka": ""
    },
    "resultsUrl": "https://adcombat.com/adcc-events/adcc-georgia-open-2025/",
    "winners": "",
    "photos": []
   }
  ]
 },
 "gallery": []
};  // fallback content (same as data.json)

  var KEY = 'adcc-lang';
  var lang = 'en';
  var DATA = null;
  var curPhase = null;
  var page = document.body.getAttribute('data-page') || '';

  // ---------------------------------------------------------------- helpers
  function ls() { try { return window.localStorage; } catch (e) { return null; } }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function isObj(x) { return x && typeof x === 'object' && !Array.isArray(x); }
  function merge(def, src) {
    if (!isObj(def) || !isObj(src)) return (src === undefined || src === null) ? def : src;
    var out = {}, k;
    for (k in def) out[k] = merge(def[k], src[k]);
    for (k in src) if (!(k in def)) out[k] = src[k];
    return out;
  }
  function ui(k, vars) {
    var v = UI[k];
    var s = !v ? k : ((lang === 'ka' && v[1]) ? v[1] : v[0]);
    if (vars) for (var n in vars) s = s.split('{' + n + '}').join(vars[n]);
    return s;
  }
  function tx(o) {
    if (o === null || o === undefined) return '';
    if (typeof o === 'string') return o;
    return (lang === 'ka' && o.ka) ? o.ka : (o.en || '');
  }
  function url(u) { u = String(u || '').trim(); return /^https?:\/\//i.test(u) ? u : ''; }
  function digits(s) { return String(s || '').replace(/\D/g, ''); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function h(tag, attrs, kids) {
    var el = document.createElement(tag), k;
    if (attrs) for (k in attrs) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') el.className = v; else el.setAttribute(k, v);
    }
    (kids || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return el;
  }
  function clear(el) { while (el && el.firstChild) el.removeChild(el.firstChild); }
  function ext(href, cls, kids) { return h('a', { href: href, class: cls, target: '_blank', rel: 'noopener' }, kids); }

  var ICONS = {
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7.5L12 13l8.5-5.5"/>',
    phone: '<path d="M5 4h3.5l1.7 4.3-2.1 1.3a11 11 0 0 0 5.3 5.3l1.3-2.1L19 14.5V18a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    camera: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17.2" cy="6.8" r=".6"/>',
    people: '<path d="M14 21v-8h2.8l.5-3.2H14V8.2c0-1 .5-1.7 1.8-1.7h1.6V3.6c-.4-.1-1.4-.2-2.4-.2-2.6 0-4.1 1.5-4.1 4.2v2.2H8v3.2h2.9v8z"/>',
    pin: '<path d="M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/>',
    ticket: '<path d="M3 9a2 2 0 0 0 0 6v3h18v-3a2 2 0 0 1 0-6V6H3z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
    tshirt: '<path d="M8.5 3.5L3 6.5l2 4 2-1V20h10V9.5l2 1 2-4-5.5-3a3.5 3.5 0 0 1-7 0z"/>',
    sweater: '<path d="M9 3.5L3.5 6 3 18.5l3.5.5V10l.5 10h10l.5-10v9l3.5-.5L20.5 6 15 3.5a3 3 0 0 1-6 0z"/><path d="M7 17h10"/>',
    hoodie: '<path d="M9 4L3.5 6.5 3 18.5l3.5.5V10l.5 10h10l.5-10v9l3.5-.5-.5-12L15 4"/><path d="M9 4c0-1.5 1.3-2.5 3-2.5S15 2.5 15 4c0 2.5-1.3 4.5-3 4.5S9 6.5 9 4z"/><path d="M9.5 15.5h5"/>',
    rashguard: '<path d="M9 3.5L3.5 6 3 18.5l3.5.5V10l.5 10h10l.5-10v9l3.5-.5L20.5 6 15 3.5a3 3 0 0 1-6 0z"/><path d="M7 9.5l.5 4M17 9.5l-.5 4"/>',
    cap: '<path d="M4 15a8 8 0 0 1 16 0z"/><path d="M20 15c1.8.2 2.5.8 2.5 1.8 0 .5-.4.7-1 .7H8.5"/><path d="M12 7v8"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    scale: '<path d="M12 4v15M7 20h10M5 7h14"/><path d="M5 7l-2.5 6h5zM19 7l-2.5 6h5z"/>',
    book: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H12v15H5.5A1.5 1.5 0 0 0 4 20.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H12v15h6.5a1.5 1.5 0 0 1 1.5 1.5z"/>',
    alert: '<path d="M12 3.5L21.5 20h-19z"/><path d="M12 10v5M12 17.5v.01"/>',
    id: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.6-1.6 1.7-2 3-2s2.4.4 3 2M14.5 10h3.5M14.5 13.5H17"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    bag: '<path d="M8.5 9V7.5a3.5 3.5 0 0 1 7 0V9"/><rect x="4" y="9" width="16" height="11" rx="3"/><path d="M4 14h16"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h12l-2.5 4 2.5 4H5"/>',
    team: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2A5 5 0 0 1 21 19"/>',
    lens: '<rect x="3" y="6.5" width="18" height="13" rx="2.5"/><circle cx="12" cy="13" r="3.6"/><path d="M8.5 6.5L10 4h4l1.5 2.5"/>',
    shorts: '<path d="M5 4h14l1.5 15H14l-2-8-2 8H3.5z"/><path d="M5.5 8h13"/>'
  };
  function icon(name) {
    var s = h('span', { class: 'ico', 'aria-hidden': 'true' });
    s.innerHTML = '<svg viewBox="0 0 24 24">' + (ICONS[name] || ICONS.tshirt) + '</svg>';
    return s;
  }
  var WA_BUBBLE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/></svg>';

  // ------------------------------------------------------------------ dates
  var WD = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ka: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი']
  };
  var MO = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ka: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი']
  };
  var MO_ON_KA = ['იანვარს', 'თებერვალს', 'მარტს', 'აპრილს', 'მაისს', 'ივნისს', 'ივლისს', 'აგვისტოს', 'სექტემბერს', 'ოქტომბერს', 'ნოემბერს', 'დეკემბერს'];
  var MO_SHORT = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    ka: ['იან.', 'თებ.', 'მარ.', 'აპრ.', 'მაი.', 'ივნ.', 'ივლ.', 'აგვ.', 'სექ.', 'ოქტ.', 'ნოე.', 'დეკ.']
  };
  function parts(d) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d || '');
    if (!m) return null;
    var y = +m[1], mo = +m[2], da = +m[3];
    if (mo < 1 || mo > 12 || da < 1 || da > 31) return null;
    return { y: y, m: mo, d: da, wd: new Date(Date.UTC(y, mo - 1, da)).getUTCDay() };
  }
  function dateLong(d) {
    var p = parts(d); if (!p) return '';
    return WD[lang][p.wd] + ', ' + p.d + ' ' + MO[lang][p.m - 1] + (lang === 'ka' ? ', ' : ' ') + p.y;
  }
  function dateShort(d) { var p = parts(d); return p ? p.d + ' ' + MO_SHORT[lang][p.m - 1] : ''; }
  function dateOn(d) {
    var p = parts(d); if (!p) return '';
    return p.d + ' ' + (lang === 'ka' ? MO_ON_KA[p.m - 1] : MO.en[p.m - 1]);
  }
  function normTime(t) {
    var m = /^(\d{1,2}):(\d{2})$/.exec(String(t || '').trim());
    return m ? pad(+m[1]) + ':' + m[2] : '';
  }

  // Event phase, always judged in Tbilisi time (UTC+4)
  function phase(ev, now) {
    var tm = normTime(ev.time) || '10:00';
    if (!parts(ev.date)) return { name: 'before', start: now + 864e5 };
    var dayStart = Date.parse(ev.date + 'T00:00:00+04:00');
    var start = Date.parse(ev.date + 'T' + tm + ':00+04:00');
    var dayEnd = dayStart + 864e5;
    var name = now >= dayEnd ? 'over' : now >= start ? 'live' : now >= dayStart ? 'today' : 'before';
    return { name: name, start: start };
  }

  // ---------------------------------------------------------------- language
  function capture(el) {
    if (el._en === undefined) el._en = el.hasAttribute('data-i18n-html') ? el.innerHTML : el.textContent;
  }
  function applyStatic() {
    $$('[data-i18n],[data-i18n-html]').forEach(function (el) {
      var isHtml = el.hasAttribute('data-i18n-html');
      var key = el.getAttribute(isHtml ? 'data-i18n-html' : 'data-i18n');
      capture(el);
      var txt = (lang === 'ka' && KA[key] !== undefined) ? KA[key] : el._en;
      if (isHtml) el.innerHTML = txt; else el.textContent = txt;
    });
    document.documentElement.lang = lang;
    var tk = 'title.' + (page === 'weigh-in' ? 'weighin' : page);
    document.title = (lang === 'ka' && KA[tk]) ? KA[tk] : origTitle;
    $$('[data-lang-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang-btn') === lang ? 'true' : 'false');
    });
  }
  var origTitle = document.title;
  var KA_RE = /[Ⴀ-ჿ]/;
  function markKa() {
    $$('.ka-text').forEach(function (e) { e.classList.remove('ka-text'); });
    if (lang !== 'ka') return;
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) {
      var p = n.parentElement;
      if (p && p.tagName !== 'SCRIPT' && KA_RE.test(n.nodeValue)) p.classList.add('ka-text');
    }
  }
  function setLang(l) {
    lang = (l === 'ka') ? 'ka' : 'en';
    var s = ls(); if (s) { try { s.setItem(KEY, lang); } catch (e) {} }
    applyStatic();
    renderAll();
  }

  window.ADCC = { defaults: DEFAULTS, merge: merge, setLang: setLang };
  if (page === 'admin') return;

  // ----------------------------------------------------------------- renderers
  function setText(sel, text) { var el = $(sel); if (el) el.textContent = text; }

  function renderChrome(ph) {
    var ev = DATA.event, reg = url(ev.registerUrl);
    $$('.js-register').forEach(function (a) {
      if (reg) a.setAttribute('href', reg);
      a.hidden = (ph.name === 'over' || !reg);
    });
    var eb = $('#page-eyebrow');
    if (eb && (page === 'event' || page === 'weigh-in' || page === 'tickets')) eb.textContent = ev.name;
    renderWhatsApp();
    renderFooter();
    renderBanner();
    renderSchema();
    var mail = String((DATA.contact || {}).email || '').trim();
    $$('.js-email').forEach(function (a) { a.textContent = mail; a.setAttribute('href', mail ? 'mailto:' + mail : '#'); });
    $$('.js-year').forEach(function (e) { e.textContent = String(new Date().getFullYear()); });
  }

  function waList() {
    return (DATA.contact.whatsapp || []).filter(function (w) { return digits(w.number).length >= 8; });
  }
  function waHref(n) { return 'https://wa.me/' + digits(n); }
  function renderWhatsApp() {
    var box = $('#wa-wrap'); if (!box) return;
    clear(box);
    var list = waList(); if (!list.length) return;
    if (list.length === 1) {
      var a = ext(waHref(list[0].number), 'wa', []);
      a.setAttribute('aria-label', 'WhatsApp');
      a.innerHTML = WA_BUBBLE + '<span>WhatsApp</span>';
      box.appendChild(a); return;
    }
    var btn = h('button', { type: 'button', class: 'wa', 'aria-expanded': 'false', 'aria-haspopup': 'true' });
    btn.innerHTML = WA_BUBBLE + '<span>WhatsApp</span>';
    var menu = h('div', { class: 'wa-menu', hidden: 'hidden' }, [h('p', null, [ui('wa.choose')])]);
    list.forEach(function (w) {
      menu.appendChild(ext(waHref(w.number), 'wa-item', [h('b', null, [w.label || 'WhatsApp']), h('small', null, [w.number])]));
    });
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.hidden;
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    box.appendChild(menu); box.appendChild(btn);
  }
  document.addEventListener('click', function (e) {
    var box = $('#wa-wrap'); if (!box) return;
    var menu = $('.wa-menu', box), btn = $('button.wa', box);
    if (menu && !menu.hidden && !box.contains(e.target)) { menu.hidden = true; if (btn) btn.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var menu = $('#wa-wrap .wa-menu'); if (menu) menu.hidden = true;
  });

  function overNote(ph) {
    var n = $('#over-note'); if (!n) return;
    n.hidden = ph.name !== 'over';
    clear(n);
    n.appendChild(h('strong', { style: 'display:block;margin-bottom:4px' }, [ui('over.t')]));
    n.appendChild(h('span', null, [ui('over.note')]));
  }

  function row(dl, label, content) {
    dl.appendChild(h('dt', null, [label]));
    dl.appendChild(h('dd', null, Array.isArray(content) ? content : [content]));
  }
  function venueLine(ev) { return ev.venue + ', ' + tx(ev.address); }
  function priceText(t) {
    var p = String(t.price === undefined || t.price === null ? '' : t.price).trim();
    return p ? p + ' ' + ui('cur') : ui('free');
  }

  // ---- announcement banner
  function hashStr(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return String(h); }
  function bannerLink(l) {
    l = String(l || '').trim();
    if (/^https?:\/\//i.test(l)) return { href: l, ext: true };
    if (/^[\w\-]+(#[\w\-]+)?$/.test(l)) return { href: l, ext: false };
    return null;
  }
  function renderBanner() {
    var box = $('#banner'); if (!box) return;
    var b = DATA.banner || {}, text = tx(b.text);
    clear(box);
    var id = 'adcc-banner-' + hashStr((b.text && (b.text.en || '') + (b.text.ka || '')) + '|' + (b.link || ''));
    var closed = false;
    try { closed = window.sessionStorage.getItem(id) === '1'; } catch (e) {}
    if (!b.enabled || !text || closed) { box.hidden = true; return; }
    var inner = h('div', { class: 'wrap banner-in' }, [h('span', { class: 'bt' }, [text])]);
    var l = bannerLink(b.link);
    if (l) inner.appendChild(h('a', { class: 'bl', href: l.href, target: l.ext ? '_blank' : null, rel: l.ext ? 'noopener' : null }, [(tx(b.linkText) || ui('lk.go').replace(/\s*→\s*$/, '')) + ' →']));
    var x = h('button', { type: 'button', class: 'bx', 'aria-label': 'Close' }, ['×']);
    x.addEventListener('click', function () {
      box.hidden = true;
      try { window.sessionStorage.setItem(id, '1'); } catch (e) {}
    });
    inner.appendChild(x);
    box.appendChild(inner);
    box.hidden = false;
  }

  // ---- structured data for search engines (kept in sync with data.json)
  var SITE = 'https://www.adcc.ge';
  function renderSchema() {
    var old = $('#ld-json'); if (old && old.parentNode) old.parentNode.removeChild(old);
    var ev = DATA.event || {}, c = DATA.contact || {};
    var ig = String(c.instagram || '').trim().replace(/^@/, ''), fb = String(c.facebook || '').trim();
    var same = [];
    if (ig) same.push('https://www.instagram.com/' + encodeURIComponent(ig));
    if (fb) same.push('https://www.facebook.com/' + encodeURIComponent(fb));
    var org = { '@type': 'SportsOrganization', name: 'ADCC Georgia', url: SITE + '/', logo: SITE + '/logo.png', sameAs: same };
    if (String(c.email || '').trim()) org.email = c.email.trim();
    var graph = [org];
    if ((page === 'index' || page === 'event') && parts(ev.date)) {
      var tm = normTime(ev.time) || '10:00';
      var addr = (ev.address && ev.address.en) || '';
      var offers = [];
      ((DATA.tickets || {}).items || []).forEach(function (it) {
        var p = String(it.price === undefined || it.price === null ? '' : it.price).trim().replace(',', '.');
        if (p !== '' && isNaN(Number(p))) return;
        offers.push({ '@type': 'Offer', name: (it.name && it.name.en) || '', price: p === '' ? 0 : Number(p), priceCurrency: 'GEL', availability: 'https://schema.org/InStock', url: SITE + '/tickets' });
      });
      var e = {
        '@type': 'SportsEvent', name: ev.name, startDate: ev.date + 'T' + tm + ':00+04:00',
        eventStatus: 'https://schema.org/EventScheduled', eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: { '@type': 'Place', name: ev.venue, address: { '@type': 'PostalAddress', streetAddress: addr, addressLocality: 'Tbilisi', addressCountry: 'GE' } },
        image: [SITE + '/og.jpg'], description: (ev.entry && ev.entry.en) || ev.name, url: SITE + '/event',
        organizer: { '@type': 'Organization', name: 'ADCC Georgia', url: SITE + '/' }
      };
      if (offers.length) e.offers = offers;
      graph.push(e);
    }
    var sc = document.createElement('script');
    sc.type = 'application/ld+json'; sc.id = 'ld-json';
    sc.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(sc);
  }

  function renderFooter() {
    var c = DATA.contact || {};
    var soc = $('#ft-soc'), lst = $('#ft-contact');
    if (soc) {
      clear(soc);
      function sb(ic, label, href, ext_) {
        var a = h('a', { class: 'sb', href: href, 'aria-label': label, title: label, target: ext_ ? '_blank' : null, rel: ext_ ? 'noopener' : null }, [icon(ic)]);
        soc.appendChild(a);
      }
      var ig = String(c.instagram || '').trim().replace(/^@/, ''), fb = String(c.facebook || '').trim();
      if (ig) sb('camera', 'Instagram', 'https://www.instagram.com/' + encodeURIComponent(ig), true);
      if (fb) sb('people', 'Facebook', 'https://www.facebook.com/' + encodeURIComponent(fb), true);
      var w0 = waList()[0]; if (w0) sb('phone', 'WhatsApp', waHref(w0.number), true);
      if (String(c.email || '').trim()) sb('mail', ui('ct.email'), 'mailto:' + c.email.trim(), false);
    }
    if (lst) {
      clear(lst);
      if (String(c.email || '').trim()) lst.appendChild(h('li', null, [h('a', { href: 'mailto:' + c.email.trim() }, [c.email.trim()])]));
      waList().forEach(function (w) { lst.appendChild(h('li', null, [ext(waHref(w.number), null, [w.number])])); });
      if (tx(c.location)) lst.appendChild(h('li', { class: 'muted' }, [tx(c.location)]));
    }
  }

  // ---- shared pieces
  function hubCard(href, ic, title, text, go) {
    return h('a', { class: 'card hub', href: href }, [
      h('span', { class: 'hico' }, [icon(ic)]),
      h('h3', null, [title]),
      h('p', null, [text]),
      h('span', { class: 'go' }, [go || ui('lk.go')])
    ]);
  }
  function weighText() {
    return (DATA.weighin.days || []).map(function (d) { return dateShort(d.date) + ' ' + d.from + '–' + d.to; }).join(' · ');
  }
  function ticketText() {
    return (DATA.tickets.items || []).map(function (it) { return tx(it.name) + ' ' + priceText(it); }).join(' · ');
  }
  function shopInfo() {
    var cats = (DATA.shop && DATA.shop.categories) || [], n = 0;
    cats.forEach(function (c) { n += (c.items || []).length; });
    return { cats: cats, n: n, text: cats.map(function (c) { return tx(c.desc); }).filter(Boolean).join(' ') };
  }
  function hubCards(box, which) {
    clear(box);
    var ev = DATA.event, sh = shopInfo();
    which.forEach(function (k) {
      if (k === 'event') box.appendChild(hubCard('event', 'calendar', ui('hub.event.t'), dateLong(ev.date) + ' · ' + (normTime(ev.time) || ev.time)));
      if (k === 'weighin' && (DATA.weighin.days || []).length) box.appendChild(hubCard('weigh-in', 'scale', ui('lk.weigh.t'), weighText()));
      if (k === 'tickets' && (DATA.tickets.items || []).length) box.appendChild(hubCard('tickets', 'ticket', ui('lk.tick.t'), ticketText()));
      if (k === 'rules') box.appendChild(hubCard('rules', 'book', ui('hub.rules.t'), ui('hub.rules.p')));
      if (k === 'shop' && sh.cats.length) box.appendChild(hubCard('shop', 'tshirt', ui('lk.shop.t'), sh.text, sh.n ? ui('lk.go') : ui('lk.soon')));
      if (k === 'join') box.appendChild(hubCard('join', 'team', ui('lk.join.t'), ui('lk.join.p')));
    });
  }
  function fillGallery(g, max) {
    clear(g);
    var shown = 0;
    var srcs = [];
    pastEvents().forEach(function (e) { srcs = srcs.concat(evPhotos(e)); });
    (DATA.gallery || []).forEach(function (p) { srcs.push(String(p && p.src || '')); });
    srcs.forEach(function (src) {
      if (max && shown >= max) return;
      if (!/^(photos\/[\w.\-]+|https:\/\/[^\s"'<>]+)$/.test(src)) return;
      var img = h('img', { src: src, alt: 'ADCC Georgia', loading: 'lazy' });
      var shot = h('div', { class: 'shot' }, [img]);
      img.addEventListener('error', function () { if (shot.parentNode) shot.parentNode.removeChild(shot); g.style.display = g.children.length ? '' : 'none'; });
      g.appendChild(shot); shown++;
    });
    g.style.display = g.children.length ? '' : 'none';
  }
  function eventCard(ph) {
    var ev = DATA.event, reg = url(ev.registerUrl);
    var card = $('#ev-card'); clear(card);
    card.appendChild(h('span', { class: 'tag' }, [ev.name]));
    var dl = h('dl');
    row(dl, ui('ev.date'), dateLong(ev.date));
    row(dl, ui('ev.start'), normTime(ev.time) || ev.time);
    var vk = [ev.venue, h('br'), tx(ev.address)];
    if (url(ev.mapUrl)) { vk.push(h('br')); vk.push(ext(url(ev.mapUrl), null, [ui('ev.map')])); }
    row(dl, ui('ev.venue'), vk);
    var rk = [ui('ev.rules.v'), h('br'), h('a', { href: 'rules' }, [ui('ev.rules.exp')])];
    if (url(ev.rulesUrl)) { rk.push(h('br')); rk.push(ext(url(ev.rulesUrl), null, [ui('ev.rules.off')])); }
    row(dl, ui('ev.rules'), rk);
    row(dl, ui('ev.entry'), tx(ev.entry));
    card.appendChild(dl);
    if (ph.name !== 'over' && reg) card.appendChild(h('div', { class: 'actions' }, [ext(reg, 'btn', [ui('ev.cta')])]));
  }
  function pastText(pa) {
    var pv = DATA.previous || {}, c = DATA.contact || {}, last = pastEvents()[0];
    var nm = (last && last.name) || pv.name;
    var pp = $('#past-p'); if (pp) { clear(pp); if (nm) pp.appendChild(document.createTextNode(ui('past.p', { name: nm }))); }
    return pv;
  }
  function contactTiles() {
    var c = DATA.contact || {}, tiles = $('#contact-tiles'); clear(tiles);
    function tile(ic, title, sub, href, newTab, wide) {
      tiles.appendChild(h('a', { class: 'tile' + (wide ? ' wide' : ''), href: href, target: newTab ? '_blank' : null, rel: newTab ? 'noopener' : null },
        [icon(ic), h('span', { class: 'tt' }, [h('b', null, [title]), h('small', null, [sub])])]));
    }
    if (String(c.email || '').trim()) tile('mail', ui('ct.email'), c.email, 'mailto:' + c.email.trim(), false, true);
    waList().forEach(function (w) { tile('phone', w.label || 'WhatsApp', w.number, waHref(w.number), true); });
    var ig = String(c.instagram || '').trim().replace(/^@/, ''), fb = String(c.facebook || '').trim();
    if (ig) tile('camera', 'Instagram', '@' + ig, 'https://www.instagram.com/' + encodeURIComponent(ig), true);
    if (fb) tile('people', 'Facebook', ui('ct.follow'), 'https://www.facebook.com/' + encodeURIComponent(fb), true);
    var loc = $('#contact-loc'); clear(loc);
    if (tx(c.location)) { loc.appendChild(icon('pin')); loc.appendChild(h('span', null, [tx(c.location)])); }
  }

  // ---- pages
  function renderIndex(ph) {
    var ev = DATA.event, c = DATA.contact, pv = DATA.previous;

    setText('#hero-eyebrow', ph.name === 'over' ? ui('hero.eb.over') : ph.name === 'before' ? ui('hero.eb') : ui('hero.eb.today'));
    var t = $('#hero-title'); clear(t);
    var name = ev.name || '', hl = ev.highlight || '', i = hl ? name.indexOf(hl) : -1;
    if (i >= 0) { t.appendChild(document.createTextNode(name.slice(0, i))); t.appendChild(h('em', null, [hl])); t.appendChild(document.createTextNode(name.slice(i + hl.length))); }
    else t.appendChild(document.createTextNode(name));
    setText('#hero-when', dateLong(ev.date) + ' · ' + (normTime(ev.time) || ev.time));
    setText('#hero-where', venueLine(ev));

    var count = $('#count'), msg = $('#count-msg');
    count.style.display = (ph.name === 'before' || ph.name === 'today') ? '' : 'none';
    msg.style.display = (ph.name === 'live' || ph.name === 'over') ? 'block' : 'none';
    msg.textContent = ph.name === 'over' ? ui('cd.over') : ui('cd.today');

    var act = $('#hero-actions'); clear(act);
    var reg = url(ev.registerUrl);
    if (ph.name === 'over') {
      act.appendChild(h('a', { class: 'btn', href: 'previous-events' }, [ui('hero.results')]));
      act.appendChild(h('a', { class: 'btn ghost', href: 'contact' }, [ui('hero.follow')]));
    } else {
      if (reg) act.appendChild(ext(reg, 'btn', [ui('hero.register')]));
      act.appendChild(h('a', { class: 'btn ghost', href: 'event' }, [ui('hub.event.t')]));
    }

    renderShare(ph);
    hubCards($('#hub-cards'), ['event', 'weighin', 'tickets', 'rules', 'shop', 'join']);

    fillGallery($('#gallery'), 3);
    pastText();
    var pa = $('#past-actions'); clear(pa);
    pa.appendChild(h('a', { class: 'btn ghost', href: 'previous-events' }, [ui('past.all')]));

    var ca = $('#ct-actions'); clear(ca);
    var w0 = waList()[0], ig = String(c.instagram || '').trim().replace(/^@/, '');
    if (w0) ca.appendChild(ext(waHref(w0.number), 'btn', [ui('tk.wa')]));
    if (ig) ca.appendChild(ext('https://www.instagram.com/' + encodeURIComponent(ig), 'btn ghost', [ui('shop.ig')]));
    ca.appendChild(h('a', { class: 'btn ghost', href: 'contact' }, [ui('ct.all')]));
  }

  function calStamp(ev, hhmm) {   // Tbilisi (UTC+4) -> UTC stamp
    var p = parts(ev.date), t = /^(\d{2}):(\d{2})$/.exec(hhmm); if (!p || !t) return '';
    var d = new Date(Date.UTC(p.y, p.m - 1, p.d, +t[1] - 4, +t[2]));
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  }
  function renderCal(ph) {
    var box = $('#ev-cal');
    if (!box) {   // older cached HTML without the placeholder: create it under the detail cards
      var anchor = $('#hub-cards'); if (!anchor || !anchor.parentNode) return;
      box = h('div', { class: 'cal', id: 'ev-cal', hidden: 'hidden' });
      anchor.parentNode.insertBefore(box, anchor);
    }
    var ev = DATA.event || {}; clear(box);
    var st = normTime(ev.time) || '10:00', en = normTime(ev.endTime);
    if (!en || en <= st) { var hh = +st.slice(0, 2) + 8; en = hh > 23 ? '23:59' : pad(hh) + st.slice(2); }
    var a = calStamp(ev, st), b = calStamp(ev, en);
    if (!a || ph.name === 'over') { box.hidden = true; return; }
    var addr = ((ev.address && ev.address.en) || '') + ', Georgia', loc = [ev.venue, addr].filter(Boolean).join(', ');
    var desc = 'Weigh-in and details: ' + SITE + '/weigh-in';
    function esc(x) { return String(x).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n'); }
    var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ADCC Georgia//Website//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      'UID:' + a + '-adcc-georgia@adcc.ge', 'DTSTAMP:' + a, 'DTSTART:' + a, 'DTEND:' + b,
      'SUMMARY:' + esc(ev.name), 'LOCATION:' + esc(loc), 'DESCRIPTION:' + esc(desc), 'URL:' + SITE + '/event', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    var gcal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(ev.name) + '&dates=' + a + '/' + b +
      '&location=' + encodeURIComponent(loc) + '&details=' + encodeURIComponent(desc);
    var icsBtn = h('button', { type: 'button', class: 'btn ghost sm' }, [ui('cal.ics')]);
    icsBtn.addEventListener('click', function () {
      var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' }), u = URL.createObjectURL(blob);
      var l = h('a', { href: u, download: 'adcc-georgia-event.ics' }); document.body.appendChild(l); l.click();
      setTimeout(function () { document.body.removeChild(l); URL.revokeObjectURL(u); }, 500);
    });
    box.hidden = false;
    box.appendChild(h('b', null, [ui('cal.t')]));
    box.appendChild(h('div', { class: 'actions' }, [icsBtn, h('a', { class: 'btn ghost sm', href: gcal, target: '_blank', rel: 'noopener' }, [ui('cal.g')])]));
  }

  function renderShare(ph) {
    var old = $('#share-bar'); if (old && old.parentNode) old.parentNode.removeChild(old);
    var ev = DATA.event || {}, wi = page === 'weigh-in', link = SITE + (wi ? '/weigh-in' : page === 'event' ? '/event' : '/');
    var text = wi
      ? [ui('share.wn') + ' – ' + ev.name, weighText(), (DATA.weighin.rule && tx(DATA.weighin.rule.title)) || '', ui('wi.share.id'), venueLine(ev)].filter(Boolean).join(' · ')
      : [ev.name, dateLong(ev.date), venueLine(ev)].filter(Boolean).join(' · ');
    var bar = h('div', { class: 'share', id: 'share-bar' }, [h('b', null, [ui(wi ? 'share.tw' : 'share.t')])]);
    var acts = h('div', { class: 'actions' });
    if (navigator.share) {
      var nb = h('button', { type: 'button', class: 'btn ghost sm' }, [ui('share.native')]);
      nb.addEventListener('click', function () { navigator.share({ title: ev.name, text: text, url: link }).catch(function () {}); });
      acts.appendChild(nb);
    }
    var cb = h('button', { type: 'button', class: 'btn ghost sm' }, [ui('share.copy')]);
    cb.addEventListener('click', function () {
      function done() { cb.textContent = ui('share.copied'); setTimeout(function () { cb.textContent = ui('share.copy'); }, 2000); }
      function fallback() {
        var ta = h('textarea', { style: 'position:fixed;opacity:0' }); ta.value = link; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {} document.body.removeChild(ta);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(link).then(done, fallback); else fallback();
    });
    acts.appendChild(cb);
    bar.appendChild(acts);
    var anchor = wi ? ($('#wi-waiver') || $('#wi-id') || $('#wi-cards')) : page === 'event' ? ($('#ev-cal') || $('#hub-cards')) : $('#hero-actions');
    if (!anchor || !anchor.parentNode) return;
    anchor.parentNode.insertBefore(bar, anchor.nextSibling);
  }

  function renderEvent(ph) {
    eventCard(ph);
    overNote(ph);
    var how = $('#ev-how'); if (how) how.hidden = ph.name === 'over';
    renderCal(ph);
    renderShare(ph);
    hubCards($('#hub-cards'), ['weighin', 'tickets', 'rules']);
  }

  // ---- previous events
  var PHOTO_RE = /^(photos\/[\w.\-]+|https:\/\/[^\s"'<>]+)$/;
  function evPhotos(e) { return ((e && e.photos) || []).map(function (x) { return String((x && x.src) || x || ''); }).filter(function (x) { return PHOTO_RE.test(x); }); }
  function pastEvents() {
    var list = (((DATA.previous || {}).events) || []).filter(function (e) { return e && e.name; }).map(function (e, i) { return { e: e, i: i }; });
    list.sort(function (a, b) {
      var da = parts(a.e.date) ? a.e.date : '', db = parts(b.e.date) ? b.e.date : '';
      if (da && db) return da < db ? 1 : da > db ? -1 : a.i - b.i;
      if (da) return -1; if (db) return 1; return a.i - b.i;
    });
    var used = {};
    return list.map(function (x) {
      var base = String(x.e.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'event', id = base, n = 2;
      while (used[id]) id = base + '-' + (n++);
      used[id] = 1; x.e._id = id; return x.e;
    });
  }
  function openLightbox(photos, start) {
    var i = start, old = $('#lb'); if (old) old.parentNode.removeChild(old);
    var img = h('img', { alt: '' });
    var box = h('div', { class: 'lb', id: 'lb', role: 'dialog', 'aria-modal': 'true' });
    function show() { img.src = photos[i]; }
    function close() { document.removeEventListener('keydown', key); if (box.parentNode) box.parentNode.removeChild(box); document.body.style.overflow = ''; }
    function go(d) { i = (i + d + photos.length) % photos.length; show(); }
    function key(e) { if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') go(-1); else if (e.key === 'ArrowRight') go(1); }
    var bc = h('button', { type: 'button', class: 'lb-x', 'aria-label': ui('lb.close') }, ['×']);
    bc.addEventListener('click', close);
    box.appendChild(bc);
    if (photos.length > 1) {
      var bp = h('button', { type: 'button', class: 'lb-p', 'aria-label': ui('lb.prev') }, ['‹']), bn = h('button', { type: 'button', class: 'lb-n', 'aria-label': ui('lb.next') }, ['›']);
      bp.addEventListener('click', function (e) { e.stopPropagation(); go(-1); }); bn.addEventListener('click', function (e) { e.stopPropagation(); go(1); });
      box.appendChild(bp); box.appendChild(bn);
    }
    box.appendChild(img);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    var sx = null;
    box.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) { if (sx === null || photos.length < 2) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); sx = null; });
    document.addEventListener('keydown', key);
    document.body.style.overflow = 'hidden';
    show(); document.body.appendChild(box); bc.focus();
  }
  function winnersBlock(txt) {
    // Lines: "# Division" starts a card; "1 | Name | Country · Team" is a podium row (1-3);
    // any other "A | B | C" line is a plain row.
    var blocks = [], cur = null;
    String(txt || '').split(/\r?\n/).forEach(function (line) {
      line = line.trim(); if (!line) return;
      if (line.charAt(0) === '#') { cur = { t: line.replace(/^#+\s*/, ''), r: [] }; blocks.push(cur); return; }
      if (!cur) { cur = { t: '', r: [] }; blocks.push(cur); }
      cur.r.push(line.split('|').map(function (x) { return x.trim(); }));
    });
    if (!blocks.length) return null;
    var wrap = h('div', { class: 'pe-win' });
    var search = h('input', { type: 'search', class: 'pe-search', placeholder: ui('past.search'), 'aria-label': ui('past.search') });
    var grid = h('div', { class: 'pe-divs' });
    blocks.forEach(function (bl) {
      var card = h('div', { class: 'pe-dv' });
      if (bl.t) card.appendChild(h('h4', null, [bl.t]));
      bl.r.forEach(function (c) {
        var pl = /^[123]$/.test(c[0] || '');
        if (pl) card.appendChild(h('div', { class: 'pe-pl' }, [h('i', { class: 'm' + c[0] }, [c[0]]), h('span', null, [h('b', null, [c[1] || '']), c[2] ? h('small', null, [c[2]]) : null])]));
        else card.appendChild(h('div', { class: 'pe-row' }, [h('span', { class: 'pe-div' }, [c[0] || '']), h('b', null, [c[1] || '']), h('span', { class: 'pe-team' }, [c[2] || ''])]));
      });
      card._q = (bl.t + ' ' + card.textContent).toLowerCase();
      grid.appendChild(card);
    });
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      [].forEach.call(grid.children, function (c) { c.hidden = !!q && c._q.indexOf(q) < 0; });
    });
    wrap.appendChild(search); wrap.appendChild(grid);
    return wrap;
  }

  function renderPrevious() {
    var c = DATA.contact || {}, evs = pastEvents();
    var id = decodeURIComponent((location.hash || '').replace(/^#/, '')), cur = null;
    evs.forEach(function (e) { if (e._id === id) cur = e; });
    var list = $('#pe-list'), det = $('#pe-detail'), pa = $('#past-actions');
    clear(list); clear(det); clear(pa);
    if (!window._peHash) { window._peHash = 1; window.addEventListener('hashchange', function () { renderPrevious(); markKa(); window.scrollTo(0, 0); }); }
    if (cur) {
      list.hidden = true; det.hidden = false;
      det.appendChild(h('a', { class: 'pe-back', href: 'previous-events#' }, [ui('past.back')]));
      det.appendChild(h('h2', { class: 'pe-title' }, [cur.name]));
      var meta = [parts(cur.date) ? dateLong(cur.date) : '', cur.venue || ''].filter(Boolean).join(' · ');
      if (meta) det.appendChild(h('p', { class: 'pe-meta' }, [meta]));
      var shown = false;
      if (tx(cur.summary)) { det.appendChild(h('p', { class: 'pe-sum' }, [tx(cur.summary)])); shown = true; }
      if (url(cur.resultsUrl)) { det.appendChild(h('p', null, [ext(url(cur.resultsUrl), 'btn', [ui('past.resbtn')])])); shown = true; }
      var wb = winnersBlock(cur.winners);
      if (wb) { det.appendChild(h('h3', { class: 'pe-h' }, [ui('past.winners')])); det.appendChild(wb); shown = true; }
      var ph = evPhotos(cur);
      if (ph.length) {
        det.appendChild(h('h3', { class: 'pe-h' }, [ui('past.photos')]));
        var g = h('div', { class: 'gallery' });
        ph.forEach(function (src, i) {
          var b = h('button', { type: 'button', class: 'shot', 'aria-label': cur.name }, [h('img', { src: src, alt: cur.name, loading: 'lazy' })]);
          b.addEventListener('click', function () { openLightbox(ph, i); });
          g.appendChild(b);
        });
        det.appendChild(g); shown = true;
      }
      if (!shown) det.appendChild(h('p', { class: 'pe-sum' }, [ui('past.soon')]));
      return;
    }
    det.hidden = true; list.hidden = false;
    evs.forEach(function (e) {
      var ph = evPhotos(e), meta = [parts(e.date) ? dateLong(e.date) : '', e.venue || ''].filter(Boolean).join(' · ');
      var cover = ph.length ? h('img', { src: ph[0], alt: '', loading: 'lazy' }) : h('span', { class: 'pe-ph' }, [h('img', { src: 'logo-white.jpg', alt: '' })]);
      list.appendChild(h('a', { class: 'pe-card', href: 'previous-events#' + e._id }, [
        h('span', { class: 'pe-cover' }, [cover]),
        h('span', { class: 'pe-body' }, [h('b', null, [e.name]), meta ? h('small', null, [meta]) : null, h('span', { class: 'pe-go' }, [ui('past.view')])])
      ]));
    });
    var fb = String(c.facebook || '').trim();
    if (fb) pa.appendChild(ext('https://www.facebook.com/' + encodeURIComponent(fb), 'btn ghost', [ui('past.fb')]));
  }

  function renderContact() {
    contactTiles();
    setText('#ct-join', ui('ct.join'));
    var a = $('#ct-join-actions'); clear(a);
    a.appendChild(h('a', { class: 'btn', href: 'join' }, [ui('lk.join.t')]));
  }

  function renderFaq() {
    var box = $('#faq-list'), items = (DATA.faq || {}).items || [], ld = [];
    clear(box);
    items.forEach(function (it) {
      if (!tx(it.q) || !tx(it.a)) return;
      box.appendChild(h('details', null, [h('summary', null, [tx(it.q)]), h('div', { class: 'det-body' }, [h('p', null, [tx(it.a)])])]));
      ld.push({ '@type': 'Question', name: it.q.en, acceptedAnswer: { '@type': 'Answer', text: it.a.en } });
    });
    setText('#faq-more', ui('faq.more'));
    var oldLd = $('#faq-ld'); if (oldLd && oldLd.parentNode) oldLd.parentNode.removeChild(oldLd);
    if (ld.length) {
      var sc = document.createElement('script'); sc.type = 'application/ld+json'; sc.id = 'faq-ld';
      sc.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: ld });
      document.head.appendChild(sc);
    }
  }

  var spVals = {}, spSent = false;
  function renderSponsors() {
    var S = DATA.sponsors || {}, J = DATA.join || {};
    setText('#sp-intro', tx(S.intro));
    setText('#sp-why-h', ui('sp.why'));
    var ben = $('#sp-ben'); clear(ben);
    (S.benefits || []).forEach(function (b) {
      if (!tx(b.title)) return;
      ben.appendChild(h('div', { class: 'card sp-card' }, [h('h3', null, [tx(b.title)]), h('p', null, [tx(b.text)])]));
    });
    var pl = (S.partners || []).filter(function (x) { return x && x.name; }), pb = $('#sp-partners-box'), lg = $('#sp-logos');
    clear(lg); pb.hidden = !pl.length;
    if (pl.length) {
      setText('#sp-part-h', ui('sp.partners'));
      pl.forEach(function (x) {
        var okLogo = /^(photos\/[\w.\-]+|https:\/\/[^\s"'<>]+)$/.test(String(x.logo || ''));
        var inner = okLogo ? h('img', { src: x.logo, alt: x.name, loading: 'lazy' }) : h('span', null, [x.name]);
        var u = url(x.url);
        lg.appendChild(u ? h('a', { class: 'sp-logo', href: u, target: '_blank', rel: 'noopener', title: x.name }, [inner]) : h('div', { class: 'sp-logo', title: x.name }, [inner]));
      });
    }
    var box = $('#sp-form'); clear(box);
    if (spSent) { box.appendChild(h('div', { class: 'card join-ok' }, [h('h3', null, [ui('join.ok.t')]), h('p', null, [ui('sp.ok.p')])])); return; }
    var fields = [
      { n: 'company', t: 'text', req: 1, l: L2('sp.company') },
      { n: 'name', t: 'text', req: 1, l: L2('sp.contact') },
      { n: 'position', t: 'text', l: L2('sp.position') },
      { n: 'email', t: 'email', req: 1, l: L2('sp.email'), ac: 'email' },
      { n: 'phone', t: 'tel', l: L2('sp.phone'), ac: 'tel' },
      { n: 'website', t: 'url', l: L2('sp.web') },
      { n: 'interest', t: 'checks', l: L2('sp.interest'), o: [1, 2, 3, 4, 5].map(function (i) { return { en: UI['sp.o' + i][0], ka: UI['sp.o' + i][1] }; }) },
      { n: 'message', t: 'textarea', req: 1, l: L2('sp.msg'), h: L2('sp.msgh') },
      { n: 'privacy', t: 'consent', req: 1, text: J.privacy || { en: '', ka: '' } }
    ];
    var errs = {}, form = h('form', { class: 'jform card', novalidate: 'novalidate' }, [h('h2', { class: 'jt' }, [ui('sp.form')]), h('p', { class: 'jnote' }, [ui('sp.formp')])]);
    fields.forEach(function (f) { form.appendChild(jField(f, spVals, 'sp', errs)); });
    form.appendChild(h('input', { type: 'text', name: 'website2', class: 'hp', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true' }));
    var msg = h('p', { class: 'jmsg', role: 'status' }), btn = h('button', { type: 'submit', class: 'btn' }, [ui('sp.send')]);
    form.appendChild(msg); form.appendChild(h('div', { class: 'actions' }, [btn]));
    form.addEventListener('submit', function (e) { e.preventDefault(); sendSponsor(fields, errs, form, btn, msg, J); });
    box.appendChild(form);
  }
  function L2(k) { return { en: UI[k][0], ka: UI[k][1] }; }

  function sendSponsor(fields, errs, form, btn, msg, J) {
    var first = null;
    fields.forEach(function (f) {
      var v = spVals[f.n], m = '';
      var empty = f.t === 'checks' ? !(v && v.length) : f.t === 'consent' ? !v : !String(v || '').trim();
      if (f.req && empty) m = f.t === 'consent' ? ui('join.agree') : ui('join.req');
      else if (!empty && f.t === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim())) m = ui('join.bademail');
      else if (!empty && f.t === 'url' && !validUrl(normUrl(v))) m = ui('join.badurl');
      var e = errs[f.n]; e.el.textContent = m; e.el.hidden = !m;
      e.box.className = e.box.className.replace(' bad', '') + (m ? ' bad' : '');
      if (m && !first) first = e.box;
    });
    msg.textContent = '';
    if (first) { msg.textContent = ui('join.fix'); if (first.scrollIntoView) first.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    if (String((form.elements.website2 || {}).value || '').trim()) { spSent = true; renderSponsors(); markKa(); return; }
    var payload = {}, lines = [];
    fields.forEach(function (f) {
      if (f.t === 'consent') return;
      var v = spVals[f.n], out = f.t === 'checks' ? (v || []).join(', ') : f.t === 'url' ? normUrl(v) : String(v || '').trim();
      if (!out) return;
      payload[f.l.en] = out; lines.push(f.l.en + ': ' + out);
    });
    var subject = 'ADCC Georgia – Sponsorship inquiry – ' + String(spVals.company || '').trim();
    var mail = String((DATA.contact || {}).email || '').trim();
    function viaEmail() {
      var body = lines.join('\n\n');
      while (encodeURIComponent(body).length > 1700 && body.length > 200) body = body.slice(0, body.length - 100);
      msg.textContent = ui('join.mailopen');
      window.location.href = 'mailto:' + mail + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }
    var key = String(J.accessKey || '').trim();
    if (!key) { if (mail) viaEmail(); return; }
    btn.disabled = true; btn.textContent = ui('join.sending');
    var data = { access_key: key, subject: subject, from_name: 'ADCC Georgia website', email: String(spVals.email).trim(), botcheck: false, 'Form': 'Sponsorship inquiry', 'Site language': lang === 'ka' ? 'Georgian' : 'English' };
    for (var n in payload) data[n] = payload[n];
    fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (j) { return res.ok && j.success !== false; }); })
      .catch(function () { return false; })
      .then(function (ok) {
        if (ok) { spSent = true; spVals = {}; renderSponsors(); markKa(); var f = $('#sp-form'); if (f && f.scrollIntoView) f.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
        btn.disabled = false; btn.textContent = ui('sp.send'); msg.textContent = ui('join.err');
        if (mail && !$('.jmail', form)) {
          var a = h('button', { type: 'button', class: 'btn ghost sm jmail' }, [ui('join.mail')]);
          a.addEventListener('click', viaEmail);
          msg.parentNode.appendChild(h('div', { class: 'actions', style: 'margin-top:10px' }, [a]));
        }
        markKa();
      });
  }

  function renderWaiver() {
    var ev = DATA.event || {}, ol = $('#wv-sections');
    setText('#wv-event', [ev.name, dateLong(ev.date), tx(ev.venue) || ev.venue].filter(Boolean).join(' · '));
    clear(ol);
    ((DATA.waiver || {}).sections || []).forEach(function (s) {
      if (!tx(s.text)) return;
      ol.appendChild(h('li', null, [h('b', null, [tx(s.title) + '. ']), tx(s.text)]));
    });
    var pb = $('#wv-print'); if (pb && !pb._b) { pb._b = 1; pb.addEventListener('click', function () { window.print(); }); }
    var cb = $('#wv-clear'); if (cb && !cb._b) { cb._b = 1; cb.addEventListener('click', function () { $$('#wv-sheet input').forEach(function (i) { i.value = ''; }); }); }
  }

  function renderWeighin(ph) {
    var wb = $('#wi-waiver');
    renderShare(ph);
    if (wb) {
      clear(wb);
      wb.appendChild(icon('book'));
      wb.appendChild(h('div', null, [h('h3', null, [ui('wi.waiver.t')]), h('p', null, [ui('wi.waiver.p')]),
        h('p', { style: 'margin-top:12px' }, [h('a', { class: 'btn sm', href: 'waiver' }, [ui('wi.waiver.b')])])]));
    }
    var ev = DATA.event;
    setText('#wi-intro', ui('wi.p'));
    var box = $('#wi-cards'); clear(box);
    (DATA.weighin.days || []).forEach(function (d) {
      box.appendChild(h('div', { class: 'card sched' }, [
        tx(d.label) ? h('span', { class: 'tag' }, [tx(d.label)]) : null,
        h('h3', null, [dateLong(d.date)]),
        h('div', { class: 'time' }, [d.from + ' – ' + d.to])
      ]));
    });
    [['#wi-rule', 'rule', 'alert'], ['#wi-id', 'idnote', 'id']].forEach(function (n) {
      var box = $(n[0]), note = DATA.weighin[n[1]] || {};
      if (!box) return;
      clear(box);
      if (tx(note.text)) {
        box.hidden = false;
        box.appendChild(icon(n[2]));
        box.appendChild(h('div', null, [h('h3', null, [tx(note.title)]), h('p', null, [tx(note.text)])]));
      } else box.hidden = true;
    });
    setText('#wi-addr', ev.venue + ', ' + tx(ev.address) + ', ' + ui('georgia'));
    var m = $('#wi-map'); clear(m);
    if (url(ev.mapUrl)) m.appendChild(ext(url(ev.mapUrl), null, [ui('ev.map')]));
    setText('#wi-note', ui('wi.note', { time: normTime(ev.time) || ev.time, date: dateOn(ev.date) }));
    var a = $('#wi-actions'); clear(a);
    if (ph.name !== 'over' && url(ev.registerUrl)) a.appendChild(ext(url(ev.registerUrl), 'btn', [ui('wi.btn')]));
    overNote(ph);
  }

  function renderTickets(ph) {
    var ev = DATA.event, tk = DATA.tickets;
    setText('#tk-intro', ui('tk.p', { date: dateLong(ev.date), venue: ev.venue, addr: tx(ev.address) }));
    var box = $('#tk-cards'); clear(box);
    (tk.items || []).forEach(function (it) {
      var p = String(it.price === undefined || it.price === null ? '' : it.price).trim();
      var amt = h('div', { class: 'amt' }, p ? [h('b', null, [p]), h('small', null, [ui('cur')])] : [h('b', null, [ui('free')])]);
      box.appendChild(h('div', { class: 'card ticket' + (it.featured ? ' vip' : '') }, [
        h('span', { class: 'tag' }, [tx(it.name)]), amt, h('p', null, [tx(it.desc)])
      ]));
    });
    var door = $('#tk-door'); clear(door);
    if (tx(tk.door)) { door.appendChild(icon('ticket')); door.appendChild(h('span', null, [tx(tk.door)])); door.hidden = false; } else door.hidden = true;
    var a = $('#tk-actions'); clear(a);
    var w = waList()[0];
    if (w) a.appendChild(ext(waHref(w.number), 'btn', [ui('tk.wa')]));
    overNote(ph);
  }

  function renderShop() {
    var sh = DATA.shop || {}, cats = sh.categories || [];
    setText('#shop-intro', tx(sh.intro));
    setText('#shop-note', tx(sh.note));
    var wa = waList()[0], ig = String((DATA.contact || {}).instagram || '').trim().replace(/^@/, '');
    var total = 0;
    cats.forEach(function (c) { total += (c.items || []).length; });

    var ban = $('#shop-banner'); clear(ban);
    var acts = $('#shop-actions'); clear(acts);
    if (ig) acts.appendChild(ext('https://www.instagram.com/' + encodeURIComponent(ig), 'btn ghost', [ui('shop.ig')]));
    if (wa) acts.appendChild(ext(waHref(wa.number), 'btn', [ui('tk.wa')]));
    if (!total) {
      ban.hidden = false;
      ban.appendChild(h('p', null, [ui('shop.banner')]));
    } else ban.hidden = true;

    var box = $('#shop-cats'); clear(box);
    cats.forEach(function (cat) {
      var items = (cat.items || []).filter(function (it) { return tx(it.name); });
      var coming = (cat.coming || []).filter(function (it) { return tx(it.name); });
      if (!tx(cat.name) || (!items.length && !coming.length)) return;
      var grid = h('div', { class: 'prod-grid' });
      if (items.length) items.forEach(function (it) { grid.appendChild(productCard(it, wa)); });
      else coming.forEach(function (it) {
        grid.appendChild(h('div', { class: 'prod ghost' }, [
          h('div', { class: 'ph' }, [icon(it.icon)]),
          h('div', { class: 'pb' }, [h('h3', null, [tx(it.name)]), h('span', { class: 'badge' }, [ui('shop.soon')])])
        ]));
      });
      box.appendChild(h('div', { class: 'cat' }, [
        h('h2', { class: 'cat-h' }, [tx(cat.name)]),
        tx(cat.desc) ? h('p', { class: 'cat-d' }, [tx(cat.desc)]) : null,
        grid
      ]));
    });
  }

  function productCard(it, wa) {
    var status = (it.status === 'soldout' || it.status === 'soon') ? it.status : 'available';
    var ph = h('div', { class: 'ph' }, [icon(it.icon)]);
    var src = String(it.photo || '');
    if (/^(photos\/[\w.\-]+|https:\/\/[^\s"'<>]+)$/.test(src)) {
      var img = h('img', { src: src, alt: tx(it.name), loading: 'lazy' });
      img.addEventListener('error', function () { if (img.parentNode) img.parentNode.removeChild(img); });
      ph.appendChild(img);
    }
    if (status !== 'available') ph.appendChild(h('span', { class: 'badge' }, [status === 'soon' ? ui('shop.soon') : ui('shop.sold')]));
    var body = h('div', { class: 'pb' }, [h('h3', null, [tx(it.name)])]);
    var p = String(it.price === undefined || it.price === null ? '' : it.price).trim();
    if (p) body.appendChild(h('div', { class: 'pr' }, [p + ' ', h('small', null, [ui('cur')])]));
    if (tx(it.desc)) body.appendChild(h('p', { class: 'pd' }, [tx(it.desc)]));

    var size = '', order = null;
    function href() {
      var t = ui('shop.msg', { name: tx(it.name) }) + (size ? ui('shop.msg.size', { size: size }) : '');
      return waHref(wa.number) + '?text=' + encodeURIComponent(t);
    }
    var sizes = String(it.sizes || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean);
    if (sizes.length && status === 'available') {
      var row = h('div', { class: 'sizes', role: 'group', 'aria-label': ui('shop.pick') });
      sizes.forEach(function (sz) {
        var b = h('button', { type: 'button', class: 'sz', 'aria-pressed': 'false' }, [sz]);
        b.addEventListener('click', function () {
          size = (size === sz) ? '' : sz;
          $$('.sz', row).forEach(function (x) { x.setAttribute('aria-pressed', x.textContent === size ? 'true' : 'false'); });
          if (order) order.setAttribute('href', href());
        });
        row.appendChild(b);
      });
      body.appendChild(row);
    } else if (sizes.length) {
      body.appendChild(h('p', { class: 'pd' }, [sizes.join(' · ')]));
    }
    if (wa && status === 'available') {
      order = ext(href(), 'btn sm', [ui('shop.order')]);
      body.appendChild(order);
    }
    return h('div', { class: 'prod' + (status === 'soldout' ? ' sold' : '') }, [ph, body]);
  }

  // ------------------------------------------------------------ join the team
  function L(en, ka) { return { en: en, ka: ka }; }
  var ROLE_KEYS = ['referee', 'organisation', 'media'];
  var COMMON = [
    { n: 'name', t: 'text', req: 1, ac: 'name', l: L('Full name', 'სახელი და გვარი') },
    { n: 'email', t: 'email', req: 1, ac: 'email', l: L('Email', 'ელფოსტა') },
    { n: 'phone', t: 'tel', req: 1, ac: 'tel', l: L('Phone / WhatsApp', 'ტელეფონი / WhatsApp') },
    { n: 'city', t: 'text', req: 1, l: L('City', 'ქალაქი') },
    { n: 'languages', t: 'text', l: L('Languages you speak', 'ენები, რომლებზეც საუბრობთ'), h: L('For example: Georgian, English, Russian', 'მაგალითად: ქართული, ინგლისური, რუსული') }
  ];
  var AVAIL = { n: 'availability', t: 'textarea', req: 1, l: L('Availability', 'ხელმისაწვდომობა'), h: L('Which events or dates can you join?', 'რომელ ღონისძიებებზე ან თარიღებზე შეგიძლიათ მონაწილეობა?') };
  var SOCIAL = { n: 'social', t: 'url', l: L('Instagram / Facebook / LinkedIn link', 'Instagram / Facebook / LinkedIn ბმული') };
  var ROLES = {
    referee: {
      icon: 'flag', title: L('Referee', 'მსაჯი'), desc: L('Officiate matches at ADCC Georgia events.', 'იმსაჯეთ მატჩები ADCC Georgia-ს ღონისძიებებზე.'),
      fields: [
        { n: 'background', t: 'text', req: 1, l: L('Belt / rank and gym or team', 'ქამარი / ხარისხი და სპორტდარბაზი ან გუნდი') },
        { n: 'experience', t: 'textarea', req: 1, l: L('Refereeing experience', 'მსაჯობის გამოცდილება'), h: L('Events you refereed, for how long and under which rules.', 'რომელ ღონისძიებებზე იმსაჯეთ, რამდენი ხანი და რომელი წესებით.') },
        { n: 'certificates', t: 'text', l: L('Certificates or courses', 'სერტიფიკატები ან კურსები') },
        AVAIL,
        { n: 'why', t: 'textarea', req: 1, l: L('Why do you want to be an ADCC referee?', 'რატომ გსურთ ADCC-ის მსაჯობა?') },
        SOCIAL
      ]
    },
    organisation: {
      icon: 'team', title: L('Organisation team', 'საორგანიზაციო გუნდი'), desc: L('Help run the event behind the scenes.', 'დაგვეხმარეთ ღონისძიების ორგანიზებაში.'),
      fields: [
        { n: 'areas', t: 'checks', req: 1, l: L('Where would you like to help?', 'რომელ მიმართულებაში გსურთ დახმარება?'), o: [
          L('Check-in & registration', 'რეგისტრაცია და მიღება'), L('Weigh-in', 'აწონვა'), L('Mat table & scoring', 'ტატამის მაგიდა და ქულების აღრიცხვა'),
          L('Logistics & set-up', 'ლოგისტიკა და მოწყობა'), L('Tickets & entrance', 'ბილეთები და შესასვლელი'),
          L('Hospitality & athlete support', 'სტუმრები და სპორტსმენების მხარდაჭერა'), L('Other', 'სხვა')] },
        { n: 'experience', t: 'textarea', req: 1, l: L('Your experience', 'თქვენი გამოცდილება'), h: L('Events, sports, volunteering or work that is relevant.', 'ღონისძიებები, სპორტი, მოხალისეობა ან სამუშაო, რომელიც შესაბამისია.') },
        AVAIL,
        { n: 'why', t: 'textarea', req: 1, l: L('Why do you want to join the ADCC Georgia team?', 'რატომ გსურთ ADCC Georgia-ს გუნდში გაწევრიანება?') },
        SOCIAL
      ]
    },
    media: {
      icon: 'lens', title: L('Media accreditation', 'მედიააკრედიტაცია'), desc: L('Photographers, videographers and journalists.', 'ფოტოგრაფები, ვიდეოგრაფები და ჟურნალისტები.'),
      fields: [
        { n: 'media_type', t: 'checks', req: 1, l: L('What do you do?', 'რას აკეთებთ?'), o: [
          L('Photographer', 'ფოტოგრაფი'), L('Videographer', 'ვიდეოგრაფი'), L('Journalist / writer', 'ჟურნალისტი / ავტორი'),
          L('Social media content', 'სოციალური მედიის კონტენტი'), L('Other', 'სხვა')] },
        { n: 'who', t: 'textarea', req: 1, l: L('Who are you?', 'ვინ ხართ?'), h: L('Your name, outlet, channel or studio.', 'თქვენი სახელი, გამოცემა, არხი ან სტუდია.') },
        { n: 'portfolio', t: 'url', req: 1, l: L('Portfolio link', 'პორტფოლიოს ბმული'), h: L('Website, Instagram, YouTube, Behance or similar.', 'ვებგვერდი, Instagram, YouTube, Behance ან მსგავსი.') },
        { n: 'other_links', t: 'text', l: L('Other links', 'სხვა ბმულები') },
        { n: 'experience', t: 'textarea', req: 1, l: L('Experience', 'გამოცდილება'), h: L('Sports events, clients, publications.', 'სპორტული ღონისძიებები, კლიენტები, პუბლიკაციები.') },
        { n: 'equipment', t: 'text', l: L('Equipment', 'აღჭურვილობა') }
      ]
    }
  };
  var FV = {}, joinTab = null, joinSent = {};

  function joinFields(k, J) {
    var list = COMMON.concat(ROLES[k].fields);
    if (k === 'media') list.push({ n: 'rights', t: 'consent', req: 1, text: (J.media || {}).terms });
    list.push({ n: 'privacy', t: 'consent', req: 1, text: J.privacy });
    return list;
  }

  function jField(f, vals, k, errs) {
    var id = 'jf-' + k + '-' + f.n;
    var wrap = h('div', { class: 'jf' + (f.t === 'consent' ? ' jconsent' : '') });
    var ctl;
    if (f.t === 'textarea') {
      ctl = h('textarea', { id: id, name: f.n, rows: '4' });
      ctl.value = vals[f.n] || '';
      ctl.addEventListener('input', function () { vals[f.n] = ctl.value; });
    } else if (f.t === 'checks') {
      ctl = h('div', { class: 'opts', role: 'group', 'aria-labelledby': id + '-l' });
      f.o.forEach(function (o) {
        var cb = h('input', { type: 'checkbox', value: o.en });
        cb.checked = (vals[f.n] || []).indexOf(o.en) >= 0;
        cb.addEventListener('change', function () {
          vals[f.n] = $$('input', ctl).filter(function (x) { return x.checked; }).map(function (x) { return x.value; });
        });
        ctl.appendChild(h('label', { class: 'opt' }, [cb, h('span', null, [tx(o)])]));
      });
    } else if (f.t === 'consent') {
      var cb2 = h('input', { type: 'checkbox', id: id, name: f.n });
      cb2.checked = !!vals[f.n];
      cb2.addEventListener('change', function () { vals[f.n] = cb2.checked; });
      var ct = [tx(f.text)];
      if (f.n === 'privacy') { ct.push(' '); ct.push(h('a', { href: 'privacy', target: '_blank', rel: 'noopener', class: 'plink' }, [ui('ft.privacy')])); }
      ctl = h('label', { class: 'opt', for: id }, [cb2, h('span', null, ct)]);
    } else {
      ctl = h('input', { id: id, name: f.n, type: f.t === 'url' ? 'text' : f.t, autocomplete: f.ac || 'off', inputmode: f.t === 'url' ? 'url' : null });
      ctl.value = vals[f.n] || '';
      ctl.addEventListener('input', function () { vals[f.n] = ctl.value; });
    }
    if (f.t !== 'consent') {
      var lab = tx(f.l) + (f.req ? '' : ' (' + ui('join.optional') + ')');
      wrap.appendChild(h(f.t === 'checks' ? 'span' : 'label', { class: 'jl', id: id + '-l', for: f.t === 'checks' ? null : id }, [lab]));
      if (f.h) wrap.appendChild(h('small', { class: 'jh' }, [tx(f.h)]));
    }
    wrap.appendChild(ctl);
    var er = h('small', { class: 'jerr', role: 'alert', hidden: 'hidden' });
    errs[f.n] = { box: wrap, el: er };
    wrap.appendChild(er);
    return wrap;
  }

  function normUrl(v) {
    v = String(v || '').trim();
    if (v && !/^https?:\/\//i.test(v)) v = 'https://' + v;
    return v;
  }
  function validUrl(v) {
    try { var u = new URL(v); return /^https?:$/.test(u.protocol) && u.hostname.indexOf('.') > 0; } catch (e) { return false; }
  }

  function renderJoin() {
    var J = DATA.join || {};
    setText('#join-intro', tx(J.intro));
    var tabs = $('#join-tabs'); clear(tabs);
    var box = $('#join-form'); clear(box);
    ROLE_KEYS.forEach(function (k) {
      var cfg = J[k] || {}, open = cfg.open !== false, r = ROLES[k];
      var card = h('button', { type: 'button', class: 'role' + (joinTab === k ? ' on' : '') + (open ? '' : ' closed'), 'aria-pressed': joinTab === k ? 'true' : 'false' }, [
        icon(r.icon), h('b', null, [tx(r.title)]), h('span', { class: 'rd' }, [tx(r.desc)]),
        h('span', { class: 'badge' }, [open ? ui('join.open') : ui('join.closed')])
      ]);
      card.addEventListener('click', function () {
        joinTab = k; renderJoin(); markKa();
        var f = $('#join-form'); if (f && f.scrollIntoView) f.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      tabs.appendChild(card);
    });
    if (!joinTab) { box.appendChild(h('p', { class: 'join-pick' }, [ui('join.pick')])); return; }

    var k = joinTab, cfg = J[k] || {}, r = ROLES[k];
    var head = h('h2', { class: 'jt' }, [ui('join.apply') + ' ' + tx(r.title)]);
    if (cfg.open === false) {
      box.appendChild(h('div', { class: 'card' }, [head, h('p', null, [ui('join.closedmsg')])])); return;
    }
    if (joinSent[k]) {
      box.appendChild(h('div', { class: 'card join-ok' }, [h('h3', null, [ui('join.ok.t')]), h('p', null, [ui('join.ok.p')])])); return;
    }
    var vals = FV[k] || (FV[k] = {}), errs = {}, fields = joinFields(k, J);
    var form = h('form', { class: 'jform card', novalidate: 'novalidate' }, [head]);
    if (tx(cfg.note)) form.appendChild(h('p', { class: 'jnote' }, [tx(cfg.note)]));
    fields.forEach(function (f) { form.appendChild(jField(f, vals, k, errs)); });
    form.appendChild(h('input', { type: 'text', name: 'website', class: 'hp', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true' }));
    var msg = h('p', { class: 'jmsg', role: 'status' });
    var btn = h('button', { type: 'submit', class: 'btn' }, [ui('join.submit')]);
    form.appendChild(msg);
    form.appendChild(h('div', { class: 'actions' }, [btn]));
    form.addEventListener('submit', function (e) { e.preventDefault(); sendJoin(k, fields, vals, errs, form, btn, msg, J); });
    box.appendChild(form);
  }

  function sendJoin(k, fields, vals, errs, form, btn, msg, J) {
    var first = null;
    fields.forEach(function (f) {
      var v = vals[f.n], m = '';
      var empty = f.t === 'checks' ? !(v && v.length) : f.t === 'consent' ? !v : !String(v || '').trim();
      if (f.req && empty) m = f.t === 'checks' ? ui('join.pickone') : f.t === 'consent' ? ui('join.agree') : ui('join.req');
      else if (!empty && f.t === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim())) m = ui('join.bademail');
      else if (!empty && f.t === 'url' && !validUrl(normUrl(v))) m = ui('join.badurl');
      var e = errs[f.n];
      e.el.textContent = m; e.el.hidden = !m;
      e.box.className = e.box.className.replace(' bad', '') + (m ? ' bad' : '');
      if (m && !first) first = e.box;
    });
    msg.textContent = '';
    if (first) {
      msg.textContent = ui('join.fix');
      if (first.scrollIntoView) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (String((form.elements.website || {}).value || '').trim()) { joinSent[k] = true; renderJoin(); markKa(); return; }   // spam trap

    var r = ROLES[k], lines = [], payload = {};
    fields.forEach(function (f) {
      var v = vals[f.n], out;
      if (f.t === 'checks') out = (v || []).join(', ');
      else if (f.t === 'consent') out = v ? 'Yes – ' + tx(f.text) : '';
      else if (f.t === 'url') out = normUrl(v);
      else out = String(v || '').trim();
      if (!out) return;
      var label = f.t === 'consent' ? (f.n === 'rights' ? 'Media rights consent' : 'Data consent') : f.l.en;
      payload[label] = out; lines.push(label + ': ' + out);
    });
    var who = String(vals.name || '').trim();
    var subject = 'ADCC Georgia – ' + r.title.en + ' application – ' + who;

    var mail = String((DATA.contact || {}).email || '').trim();
    function viaEmail() {
      var body = lines.join('\n\n');
      while (encodeURIComponent(body).length > 1700 && body.length > 200) body = body.slice(0, body.length - 100);
      msg.textContent = ui('join.mailopen');
      window.location.href = 'mailto:' + mail + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }
    var key = String(J.accessKey || '').trim();
    if (!key) { if (mail) viaEmail(); return; }

    btn.disabled = true; btn.textContent = ui('join.sending');
    var data = { access_key: key, subject: subject, from_name: 'ADCC Georgia website', email: String(vals.email).trim(), botcheck: false, 'Application for': r.title.en, 'Site language': lang === 'ka' ? 'Georgian' : 'English' };
    for (var n in payload) data[n] = payload[n];
    fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (j) { return res.ok && j.success !== false; }); })
      .catch(function () { return false; })
      .then(function (ok) {
        if (ok) { joinSent[k] = true; FV[k] = {}; renderJoin(); markKa(); var f = $('#join-form'); if (f && f.scrollIntoView) f.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
        btn.disabled = false; btn.textContent = ui('join.submit');
        msg.textContent = ui('join.err');
        if (mail && !$('.jmail', form)) {
          var a = h('button', { type: 'button', class: 'btn ghost sm jmail' }, [ui('join.mail')]);
          a.addEventListener('click', viaEmail);
          msg.parentNode.appendChild(h('div', { class: 'actions', style: 'margin-top:10px' }, [a]));
        }
        markKa();
      });
  }

  function renderAll() {
    if (!DATA) return;
    var ph = phase(DATA.event, Date.now());
    curPhase = ph.name;
    renderChrome(ph);
    if (page === 'index') renderIndex(ph);
    if (page === 'event') renderEvent(ph);
    if (page === 'previous-events') renderPrevious();
    if (page === 'contact') renderContact();
    if (page === 'faq') renderFaq();
    if (page === 'waiver') renderWaiver();
    if (page === 'sponsors') renderSponsors();
    if (page === 'weigh-in') renderWeighin(ph);
    if (page === 'tickets') renderTickets(ph);
    if (page === 'shop') renderShop();
    if (page === 'join') renderJoin();
    tickCountdown(true);
    markKa();
    document.body.classList.remove('loading');
  }

  function tickCountdown(force) {
    if (!DATA || page !== 'index') return;
    var ph = phase(DATA.event, Date.now());
    if (!force && ph.name !== curPhase) { renderAll(); return; }
    if (ph.name !== 'before' && ph.name !== 'today') return;
    var sec = Math.max(0, Math.floor((ph.start - Date.now()) / 1000));
    setText('#cd-d', Math.floor(sec / 86400));
    setText('#cd-h', pad(Math.floor(sec % 86400 / 3600)));
    setText('#cd-m', pad(Math.floor(sec % 3600 / 60)));
    setText('#cd-s', pad(sec % 60));
  }

  // -------------------------------------------------------------------- start
  var q = (/[?&]lang=(ka|en)/.exec(location.search) || [])[1];
  var saved = ls() && ls().getItem(KEY);
  lang = (q || saved) === 'ka' ? 'ka' : 'en';
  DATA = merge(DEFAULTS, {});
  (function () { var hh = location.hash.slice(1); if (page === 'join' && ROLES[hh]) joinTab = hh; })();
  applyStatic();

  $$('[data-lang-btn]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(this.getAttribute('data-lang-btn')); });
  });
  var burger = $('.burger'), menu = $('#menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); });
    });
  }

  var ticking = false;
  function start(data) {
    DATA = merge(DEFAULTS, data || {});
    renderAll();
    if (!ticking) { ticking = true; setInterval(function () { tickCountdown(false); }, 1000); }
  }
  var timer = setTimeout(function () { start(null); }, 2500);   // never leave the page blank
  try {
    fetch('data.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { clearTimeout(timer); start(d); },
            function () { clearTimeout(timer); start(null); });
  } catch (e) { clearTimeout(timer); start(null); }
})();
