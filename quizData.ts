export interface QuizOption {
  letter: 'A' | 'B' | 'C' | 'D';
  es: string;
  hy: string;
}

export interface QuizQuestion {
  id: number;
  part: number;
  partTitleEs: string;
  partTitleHy: string;
  questionEs: string;
  questionHy: string;
  options: QuizOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'ANY'; // 'ANY' for personal answers
  explanationEs?: string;
  explanationHy?: string;
  isPersonal?: boolean;
}

export interface OralQuestion {
  es: string;
  hy: string;
}

export const ORAL_PRACTICE_QUESTIONS: OralQuestion[] = [
  {
    es: "¿Por qué has elegido esta respuesta?",
    hy: "Ինչո՞ւ ես ընտրել այս պատասխանը։"
  },
  {
    es: "¿Te ha pasado alguna vez?",
    hy: "Քեզ հետ երբևէ նման բան պատահե՞լ է։"
  },
  {
    es: "¿Qué harías tú en esta situación?",
    hy: "Դու ի՞նչ կանեիր այս իրավիճակում։"
  },
  {
    es: "¿Con quién te gustaría viajar?",
    hy: "Ո՞ւմ հետ կցանկանայիր ճանապարհորդել։"
  },
  {
    es: "¿Qué es lo que más te gusta de las vacaciones?",
    hy: "Արձակուրդի մեջ ամենաշատը ի՞նչն ես սիրում։"
  }
];

export const QUIZ_PARTS = [
  { id: 1, titleEs: "Parte 1. Viajes", titleHy: "Մաս 1. Ճանապարհորդություն", range: "1–5" },
  { id: 2, titleEs: "Parte 2. En el hotel", titleHy: "Մաս 2. Հյուրանոցում", range: "6–10" },
  { id: 3, titleEs: "Parte 3. Vacaciones y descanso", titleHy: "Մաս 3. Արձակուրդ և հանգիստ", range: "11–15" },
  { id: 4, titleEs: "Parte 4. Restaurantes, turismo y diversión", titleHy: "Մաս 4. Ռեստորաններ, զբոսաշրջություն և ժամանց", range: "16–20" }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // PARTE 1
  {
    id: 1,
    part: 1,
    partTitleEs: "Parte 1. Viajes",
    partTitleHy: "Ճանապարհորդություն",
    questionEs: "¿Qué harías si pudieras viajar gratis a cualquier país durante una semana?",
    questionHy: "Ի՞նչ կանեիր, եթե կարողանայիր մեկ շաբաթ անվճար ճանապարհորդել ցանկացած երկիր։",
    options: [
      {
        letter: 'A',
        es: "Elegiría un país que siempre he querido conocer.",
        hy: "Կընտրեի մի երկիր, որտեղ միշտ ցանկացել եմ լինել։"
      },
      {
        letter: 'B',
        es: "Me quedaría en el aeropuerto.",
        hy: "Կմնայի օդանավակայանում։"
      },
      {
        letter: 'C',
        es: "Dormiría durante toda la semana.",
        hy: "Ամբողջ շաբաթ կքնեի։"
      },
      {
        letter: 'D',
        es: "Viajaría sin saber a dónde voy.",
        hy: "Կճանապարհորդեի՝ առանց իմանալու, թե ուր եմ գնում։"
      }
    ],
    correctAnswer: 'A',
    explanationEs: "Respuesta sugerida: A. La mayoría de viajeros sueña con descubrir un país deseado.",
    explanationHy: "Առաջարկվող պատասխան՝ A: Ճանապարհորդների մեծ մասը նախընտրում է տեսնել իր երազած երկիրը։"
  },
  {
    id: 2,
    part: 1,
    partTitleEs: "Parte 1. Viajes",
    partTitleHy: "Ճանապարհորդություն",
    questionEs: "¿Qué significa «billete de ida y vuelta»?",
    questionHy: "Ի՞նչ է նշանակում «billete de ida y vuelta»։",
    options: [
      {
        letter: 'A',
        es: "Un billete solo para ir.",
        hy: "Միայն գնալու տոմս։"
      },
      {
        letter: 'B',
        es: "Un billete para dos personas.",
        hy: "Երկու անձի տոմս։"
      },
      {
        letter: 'C',
        es: "Un billete para ir y regresar.",
        hy: "Գնալու և վերադառնալու տոմս։"
      },
      {
        letter: 'D',
        es: "Un billete sin fecha.",
        hy: "Առանց ամսաթվի տոմս։"
      }
    ],
    correctAnswer: 'C',
    explanationEs: "Respuesta correcta: C («ida y vuelta» significa trayecto de ida y regreso).",
    explanationHy: "Ճիշտ պատասխան՝ C («ida y vuelta» նշանակում է գնալու և վերադառնալու)։"
  },
  {
    id: 3,
    part: 1,
    partTitleEs: "Parte 1. Viajes",
    partTitleHy: "Ճանապարհորդություն",
    questionEs: "Si tuvieras que elegir, ¿qué tipo de viaje preferirías?",
    questionHy: "Եթե ստիպված լինեիր ընտրել, ինչպիսի՞ ճանապարհորդություն կնախընտրեիր։",
    options: [
      {
        letter: 'A',
        es: "Un viaje lleno de aventuras.",
        hy: "Արկածներով լի ճանապարհորդություն։"
      },
      {
        letter: 'B',
        es: "Unas vacaciones tranquilas junto al mar.",
        hy: "Հանգիստ արձակուրդ ծովի մոտ։"
      },
      {
        letter: 'C',
        es: "Un viaje cultural por ciudades históricas.",
        hy: "Մշակութային ճանապարհորդություն պատմական քաղաքներով։"
      },
      {
        letter: 'D',
        es: "Un viaje gastronómico para probar platos nuevos.",
        hy: "Գաստրոնոմիական ճանապարհորդություն՝ նոր ուտեստներ փորձելու համար։"
      }
    ],
    correctAnswer: 'ANY',
    isPersonal: true,
    explanationEs: "Respuesta personal — Todas las opciones son válidas.",
    explanationHy: "Անձնական պատասխան՝ բոլոր տարբերակներն ընդունելի են։"
  },
  {
    id: 4,
    part: 1,
    partTitleEs: "Parte 1. Viajes",
    partTitleHy: "Ճանապարհորդություն",
    questionEs: "¿Qué harías si llegaras a una ciudad nueva y no supieras qué visitar primero?",
    questionHy: "Ի՞նչ կանեիր, եթե հասնեիր նոր քաղաք և չիմանայիր՝ առաջինը ինչ այցելել։",
    options: [
      {
        letter: 'A',
        es: "No saldría del hotel.",
        hy: "Հյուրանոցից դուրս չէի գա։"
      },
      {
        letter: 'B',
        es: "Visitaría el primer supermercado.",
        hy: "Կայցելեի առաջին սուպերմարկետը։"
      },
      {
        letter: 'C',
        es: "Esperaría a que alguien me invitara.",
        hy: "Կսպասեի, մինչև ինչ-որ մեկն ինձ հրավիրեր։"
      },
      {
        letter: 'D',
        es: "Buscaría los lugares más interesantes y organizaría una ruta.",
        hy: "Կփնտրեի ամենահետաքրքիր վայրերը և երթուղի կկազմակերպեի։"
      }
    ],
    correctAnswer: 'D',
    explanationEs: "Respuesta correcta: D (Organizar una ruta permite aprovechar mejor el tiempo).",
    explanationHy: "Ճիշտ պատասխան՝ D (Երթուղի կազմելը օգնում է արդյունավետ օգտագործել ժամանակը)։"
  },
  {
    id: 5,
    part: 1,
    partTitleEs: "Parte 1. Viajes",
    partTitleHy: "Ճանապարհորդություն",
    questionEs: "¿Qué significa «hacer una excursión»?",
    questionHy: "Ի՞նչ է նշանակում «hacer una excursión»։",
    options: [
      {
        letter: 'A',
        es: "Preparar una comida.",
        hy: "Ուտելիք պատրաստել։"
      },
      {
        letter: 'B',
        es: "Realizar una visita o salida para conocer un lugar.",
        hy: "Էքսկուրսիա կամ զբոսանք կատարել՝ որևէ վայր ճանաչելու համար։"
      },
      {
        letter: 'C',
        es: "Cambiar de habitación.",
        hy: "Սենյակ փոխել։"
      },
      {
        letter: 'D',
        es: "Comprar un billete de avión.",
        hy: "Ինքնաթիռի տոմս գնել։"
      }
    ],
    correctAnswer: 'B',
    explanationEs: "Respuesta correcta: B («Excursión» es una salida para explorar o conocer).",
    explanationHy: "Ճիշտ պատասխան՝ B («Excursión» նշանակում է էքսկուրսիա կամ ճանաչողական արշավ)։"
  },

  // PARTE 2
  {
    id: 6,
    part: 2,
    partTitleEs: "Parte 2. En el hotel",
    partTitleHy: "Հյուրանոցում",
    questionEs: "¿Qué dirías al llegar a un hotel donde ya tienes una reserva?",
    questionHy: "Ի՞նչ կասեիր, եթե հասնեիր հյուրանոց, որտեղ արդեն ամրագրում ունես։",
    options: [
      {
        letter: 'A',
        es: "Quiero comprar este hotel.",
        hy: "Ուզում եմ գնել այս հյուրանոցը։"
      },
      {
        letter: 'B',
        es: "¿Dónde está el aeropuerto?",
        hy: "Որտե՞ղ է օդանավակայանը։"
      },
      {
        letter: 'C',
        es: "Hola, tengo una reserva a mi nombre.",
        hy: "Բարև ձեզ, իմ անունով ամրագրում ունեմ։"
      },
      {
        letter: 'D',
        es: "¿Puedo cocinar en recepción?",
        hy: "Կարո՞ղ եմ ուտելիք պատրաստել ընդունարանում։"
      }
    ],
    correctAnswer: 'C',
    explanationEs: "Respuesta correcta: C (Es la frase formal habitual en recepción).",
    explanationHy: "Ճիշտ պատասխան՝ C (Հյուրանոցի ընդունարանում ասվող ստանդարտ քաղաքավարի արտահայտությունն է)։"
  },
  {
    id: 7,
    part: 2,
    partTitleEs: "Parte 2. En el hotel",
    partTitleHy: "Հյուրանոցում",
    questionEs: "¿Qué significa «desayuno incluido» en un hotel?",
    questionHy: "Ի՞նչ է նշանակում «desayuno incluido» հյուրանոցում։",
    options: [
      {
        letter: 'A',
        es: "El desayuno está incluido en el precio.",
        hy: "Նախաճաշը ներառված է գնի մեջ։"
      },
      {
        letter: 'B',
        es: "El desayuno se paga siempre por separado.",
        hy: "Նախաճաշի համար միշտ առանձին վճարում են։"
      },
      {
        letter: 'C',
        es: "Solo puedes desayunar fuera del hotel.",
        hy: "Կարող ես նախաճաշել միայն հյուրանոցից դուրս։"
      },
      {
        letter: 'D',
        es: "El desayuno se sirve a medianoche.",
        hy: "Նախաճաշը մատուցվում է կեսգիշերին։"
      }
    ],
    correctAnswer: 'A',
    explanationEs: "Respuesta correcta: A («Incluido» significa que ya forma parte de la tarifa).",
    explanationHy: "Ճիշտ պատասխան՝ A («Incluido» նշանակում է ներառված է ընդհանուր գնի մեջ)։"
  },
  {
    id: 8,
    part: 2,
    partTitleEs: "Parte 2. En el hotel",
    partTitleHy: "Հյուրանոցում",
    questionEs: "¿Qué harías si tu habitación tuviera una vista preciosa al mar?",
    questionHy: "Ի՞նչ կանեիր, եթե հյուրանոցային սենյակիդ պատուհանից ծովի հիանալի տեսարան բացվեր։",
    options: [
      {
        letter: 'A',
        es: "Cerraría todas las cortinas.",
        hy: "Կփակեի բոլոր վարագույրները։"
      },
      {
        letter: 'B',
        es: "Pediría una habitación sin ventanas.",
        hy: "Կխնդրեի առանց պատուհանների սենյակ։"
      },
      {
        letter: 'C',
        es: "No saldría nunca al balcón.",
        hy: "Երբեք պատշգամբ դուրս չէի գա։"
      },
      {
        letter: 'D',
        es: "Disfrutaría de la vista y sacaría algunas fotos.",
        hy: "Կվայելեի տեսարանը և մի քանի լուսանկար կանեի։"
      }
    ],
    correctAnswer: 'D',
    explanationEs: "Respuesta sugerida: D (Una vista al mar es ideal para disfrutar y fotografiar).",
    explanationHy: "Առաջարկվող պատասխան՝ D (Ծովի գեղեցիկ տեսարանը հիանալի է վայելելու և լուսանկարելու համար)։"
  },
  {
    id: 9,
    part: 2,
    partTitleEs: "Parte 2. En el hotel",
    partTitleHy: "Հյուրանոցում",
    questionEs: "¿Qué significa «salida del hotel» o «check-out»?",
    questionHy: "Ի՞նչ է նշանակում «check-out» հյուրանոցում։",
    options: [
      {
        letter: 'A',
        es: "Pedir el desayuno.",
        hy: "Նախաճաշ պատվիրել։"
      },
      {
        letter: 'B',
        es: "Dejar la habitación y finalizar la estancia.",
        hy: "Ազատել սենյակը և ավարտել հյուրանոցում մնալը։"
      },
      {
        letter: 'C',
        es: "Entrar en la piscina.",
        hy: "Լողավազան մտնել։"
      },
      {
        letter: 'D',
        es: "Reservar otra habitación.",
        hy: "Մեկ այլ սենյակ ամրագրել։"
      }
    ],
    correctAnswer: 'B',
    explanationEs: "Respuesta correcta: B («Check-out» o salida es el trámite de entrega de la habitación).",
    explanationHy: "Ճիշտ պատասխան՝ B («Check-out» նշանակում է սենյակը հանձնել և դուրս գրվել)։"
  },
  {
    id: 10,
    part: 2,
    partTitleEs: "Parte 2. En el hotel",
    partTitleHy: "Հյուրանոցում",
    questionEs: "Si reservaras un hotel para tus vacaciones, ¿qué sería lo más importante para ti?",
    questionHy: "Եթե արձակուրդիդ համար հյուրանոց ամրագրեիր, ի՞նչն ամենակարևորը կլիներ քեզ համար։",
    options: [
      {
        letter: 'A',
        es: "Que estuviera cerca de la playa.",
        hy: "Որ մոտ լիներ լողափին։"
      },
      {
        letter: 'B',
        es: "Que tuviera una piscina grande.",
        hy: "Որ մեծ լողավազան ունենար։"
      },
      {
        letter: 'C',
        es: "Que fuera cómodo y limpio.",
        hy: "Որ հարմարավետ և մաքուր լիներ։"
      },
      {
        letter: 'D',
        es: "Que ofreciera buena comida.",
        hy: "Որ լավ սնունդ առաջարկեր։"
      }
    ],
    correctAnswer: 'ANY',
    isPersonal: true,
    explanationEs: "Respuesta personal — Todas son posibles.",
    explanationHy: "Անձնական պատասխան՝ բոլոր տարբերակներն ընդունելի են։"
  },

  // PARTE 3
  {
    id: 11,
    part: 3,
    partTitleEs: "Parte 3. Vacaciones y descanso",
    partTitleHy: "Արձակուրդ և հանգիստ",
    questionEs: "¿Qué harías si fueras a la playa y descubrieras que has olvidado la crema solar?",
    questionHy: "Ի՞նչ կանեիր, եթե գնայիր լողափ և պարզեիր, որ մոռացել ես արևապաշտպան քսուքը։",
    options: [
      {
        letter: 'A',
        es: "Pasaría todo el día bajo el sol sin protección.",
        hy: "Ամբողջ օրը կմնայի արևի տակ՝ առանց պաշտպանության։"
      },
      {
        letter: 'B',
        es: "Me pondría aceite de cocina.",
        hy: "Ինձ վրա խոհարարական յուղ կքսեի։"
      },
      {
        letter: 'C',
        es: "Buscaría sombra y conseguiría protección solar.",
        hy: "Ստվեր կփնտրեի և արևապաշտպան միջոց ձեռք կբերեի։"
      },
      {
        letter: 'D',
        es: "Me bañaría más tiempo para no quemarme.",
        hy: "Ավելի երկար կլողայի, որպեսզի չայրվեի։"
      }
    ],
    correctAnswer: 'C',
    explanationEs: "Respuesta correcta: C (Proteger la piel del sol es fundamental para la salud).",
    explanationHy: "Ճիշտ պատասխան՝ C (Մաշկը արևից պաշտպանելը անհրաժեշտ է առողջության համար)։"
  },
  {
    id: 12,
    part: 3,
    partTitleEs: "Parte 3. Vacaciones y descanso",
    partTitleHy: "Արձակուրդ և հանգիստ",
    questionEs: "¿Qué actividad es más típica de unas vacaciones en la montaña?",
    questionHy: "Ո՞ր զբաղմունքն է առավել բնորոշ լեռնային արձակուրդին։",
    options: [
      {
        letter: 'A',
        es: "Hacer senderismo por la naturaleza.",
        hy: "Քայլարշավ կատարել բնության մեջ։"
      },
      {
        letter: 'B',
        es: "Bucear entre corales.",
        hy: "Սուզվել մարջանների մեջ։"
      },
      {
        letter: 'C',
        es: "Tomar el sol en una playa tropical.",
        hy: "Արևայրուք ընդունել արևադարձային լողափում։"
      },
      {
        letter: 'D',
        es: "Navegar por el océano.",
        hy: "Նավարկել օվկիանոսում։"
      }
    ],
    correctAnswer: 'A',
    explanationEs: "Respuesta correcta: A (El senderismo es la actividad montañosa por excelencia).",
    explanationHy: "Ճիշտ պատասխան՝ A (Քայլարշավը լեռնային հանգստի գլխավոր առանձնահատկությունն է)։"
  },
  {
    id: 13,
    part: 3,
    partTitleEs: "Parte 3. Vacaciones y descanso",
    partTitleHy: "Արձակուրդ և հանգիստ",
    questionEs: "¿Qué significa «estar de vacaciones»?",
    questionHy: "Ի՞նչ է նշանակում «estar de vacaciones»։",
    options: [
      {
        letter: 'A',
        es: "Estar trabajando toda la noche.",
        hy: "Ամբողջ գիշեր աշխատել։"
      },
      {
        letter: 'B',
        es: "Estar buscando empleo.",
        hy: "Աշխատանք փնտրել։"
      },
      {
        letter: 'C',
        es: "Estar haciendo un examen.",
        hy: "Քննություն հանձնել։"
      },
      {
        letter: 'D',
        es: "Estar disfrutando de un período de descanso.",
        hy: "Վայելել հանգստի ժամանակահատվածը։"
      }
    ],
    correctAnswer: 'D',
    explanationEs: "Respuesta correcta: D (Estar de vacaciones es disfrutar de un tiempo libre y de descanso).",
    explanationHy: "Ճիշտ պատասխան՝ D (Արձակուրդում լինել նշանակում է վայելել հանգիստը)։"
  },
  {
    id: 14,
    part: 3,
    partTitleEs: "Parte 3. Vacaciones y descanso",
    partTitleHy: "Արձակուրդ և հանգիստ",
    questionEs: "¿Qué harías si lloviera todos los días durante tus vacaciones en la playa?",
    questionHy: "Ի՞նչ կանեիր, եթե լողափային արձակուրդիդ ընթացքում ամեն օր անձրև գար։",
    options: [
      {
        letter: 'A',
        es: "Me enfadaría y no haría nada.",
        hy: "Կբարկանայի և ոչինչ չէի անի։"
      },
      {
        letter: 'B',
        es: "Buscaría actividades bajo techo, como museos o cafeterías.",
        hy: "Կփնտրեի փակ տարածքներում զբաղմունքներ՝ թանգարաններ կամ սրճարաններ։"
      },
      {
        letter: 'C',
        es: "Intentaría detener la lluvia con un paraguas.",
        hy: "Կփորձեի անձրևը կանգնեցնել անձրևանոցով։"
      },
      {
        letter: 'D',
        es: "Me metería en el mar durante una tormenta.",
        hy: "Ամպրոպի ժամանակ կմտնեի ծովը։"
      }
    ],
    correctAnswer: 'B',
    explanationEs: "Respuesta correcta: B (Los museos y cafeterías son alternativas fantásticas con lluvia).",
    explanationHy: "Ճիշտ պատասխան՝ B (Թանգարաններն ու սրճարանները հիանալի փրկություն են անձրևոտ եղանակին)։"
  },
  {
    id: 15,
    part: 3,
    partTitleEs: "Parte 3. Vacaciones y descanso",
    partTitleHy: "Արձակուրդ և հանգիստ",
    questionEs: "¿Cómo pasarías un día perfecto de vacaciones?",
    questionHy: "Ինչպե՞ս կանցկացնեիր արձակուրդիդ կատարյալ օրը։",
    options: [
      {
        letter: 'A',
        es: "Desayunaría tranquilamente y después iría a la playa.",
        hy: "Հանգիստ կնախաճաշեի, հետո կգնայի լողափ։"
      },
      {
        letter: 'B',
        es: "Visitaría monumentos y probaría comida típica.",
        hy: "Կայցելեի տեսարժան վայրեր և կփորձեի տեղական ուտեստներ։"
      },
      {
        letter: 'C',
        es: "Haría deporte y exploraría la naturaleza.",
        hy: "Սպորտով կզբաղվեի և կուսումնասիրեի բնությունը։"
      },
      {
        letter: 'D',
        es: "Descansaría en el hotel y disfrutaría de la piscina.",
        hy: "Կհանգստանայի հյուրանոցում և կվայելեի լողավազանը։"
      }
    ],
    correctAnswer: 'ANY',
    isPersonal: true,
    explanationEs: "Respuesta personal — Explica por qué eliges esta opción.",
    explanationHy: "Անձնական պատասխան՝ բացատրի՛ր, թե ինչու ես ընտրել այս տարբերակը։"
  },

  // PARTE 4
  {
    id: 16,
    part: 4,
    partTitleEs: "Parte 4. Restaurantes, turismo y diversión",
    partTitleHy: "Ռեստորաններ, զբոսաշրջություն և ժամանց",
    questionEs: "¿Qué dirías en un restaurante si quisieras conocer los platos típicos de la región?",
    questionHy: "Ի՞նչ կասեիր ռեստորանում, եթե ցանկանայիր ծանոթանալ տվյալ շրջանի ավանդական ուտեստներին։",
    options: [
      {
        letter: 'A',
        es: "¿Dónde puedo comprar un billete?",
        hy: "Որտե՞ղ կարող եմ տոմս գնել։"
      },
      {
        letter: 'B',
        es: "¿A qué hora sale el tren?",
        hy: "Ժամը քանիսի՞ն է մեկնում գնացքը։"
      },
      {
        letter: 'C',
        es: "¿Qué plato típico de la región me recomienda?",
        hy: "Տարածաշրջանի ո՞ր ավանդական ուտեստն եք խորհուրդ տալիս։"
      },
      {
        letter: 'D',
        es: "¿Puedo cambiar mi habitación?",
        hy: "Կարո՞ղ եմ փոխել սենյակս։"
      }
    ],
    correctAnswer: 'C',
    explanationEs: "Respuesta correcta: C (Es la forma habitual de pedir recomendaciones gastronómicas).",
    explanationHy: "Ճիշտ պատասխան՝ C (Ռեստորանում տեղական ուտեստներ հարցնելու ճիշտ արտահայտությունն է)։"
  },
  {
    id: 17,
    part: 4,
    partTitleEs: "Parte 4. Restaurantes, turismo y diversión",
    partTitleHy: "Ռեստորաններ, զբոսաշրջություն և ժամանց",
    questionEs: "¿Qué significa «hacer turismo»?",
    questionHy: "Ի՞նչ է նշանակում «hacer turismo»։",
    options: [
      {
        letter: 'A',
        es: "Viajar o visitar lugares por placer y para conocerlos.",
        hy: "Ճանապարհորդել կամ այցելել վայրեր՝ հաճույքի և ճանաչողության նպատակով։"
      },
      {
        letter: 'B',
        es: "Trabajar en un supermercado.",
        hy: "Աշխատել սուպերմարկետում։"
      },
      {
        letter: 'C',
        es: "Estudiar únicamente en casa.",
        hy: "Սովորել միայն տանը։"
      },
      {
        letter: 'D',
        es: "Cocinar todos los días.",
        hy: "Ամեն օր ուտելիք պատրաստել։"
      }
    ],
    correctAnswer: 'A',
    explanationEs: "Respuesta correcta: A («Hacer turismo» es viajar por ocio cultural y recreativo).",
    explanationHy: "Ճիշտ պատասխան՝ A («Hacer turismo» նշանակում է զբոսաշրջությամբ զբաղվել)։"
  },
  {
    id: 18,
    part: 4,
    partTitleEs: "Parte 4. Restaurantes, turismo y diversión",
    partTitleHy: "Ռեստորաններ, զբոսաշրջություն և ժամանց",
    questionEs: "¿Qué harías si no entendieras el menú de un restaurante extranjero?",
    questionHy: "Ի՞նչ կանեիր, եթե օտարերկրյա ռեստորանում չհասկանայիր մենյուն։",
    options: [
      {
        letter: 'A',
        es: "Elegiría cualquier plato sin preguntar.",
        hy: "Առանց հարցնելու ցանկացած ուտեստ կընտրեի։"
      },
      {
        letter: 'B',
        es: "Pediría todos los platos del menú.",
        hy: "Մենյուի բոլոր ուտեստները կպատվիրեի։"
      },
      {
        letter: 'C',
        es: "Me iría sin decir nada.",
        hy: "Առանց որևէ բան ասելու կհեռանայի։"
      },
      {
        letter: 'D',
        es: "Pediría ayuda al camarero o usaría un traductor.",
        hy: "Կխնդրեի մատուցողի օգնությունը կամ կօգտագործեի թարգմանիչ։"
      }
    ],
    correctAnswer: 'D',
    explanationEs: "Respuesta correcta: D (Pedir amablemente ayuda o traducir es la mejor solución práctica).",
    explanationHy: "Ճիշտ պատասխան՝ D (Մատուցողի օգնությունը կամ թարգմանիչ օգտագործելը լավագույն լուծումն է)։"
  },
  {
    id: 19,
    part: 4,
    partTitleEs: "Parte 4. Restaurantes, turismo y diversión",
    partTitleHy: "Ռեստորաններ, զբոսաշրջություն և ժամանց",
    questionEs: "¿Qué es un «recuerdo» o «souvenir» de viaje?",
    questionHy: "Ի՞նչ է ճանապարհորդական հուշանվերը՝ «souvenir»-ը։",
    options: [
      {
        letter: 'A',
        es: "Un documento para subir al avión.",
        hy: "Ինքնաթիռ նստելու փաստաթուղթ։"
      },
      {
        letter: 'B',
        es: "Un objeto que compras para recordar un lugar.",
        hy: "Իր, որը գնում ես որևէ վայր հիշելու համար։"
      },
      {
        letter: 'C',
        es: "Una habitación del hotel.",
        hy: "Հյուրանոցային սենյակ։"
      },
      {
        letter: 'D',
        es: "Una comida obligatoria durante el viaje.",
        hy: "Ճանապարհորդության ընթացքում պարտադիր ուտեստ։"
      }
    ],
    correctAnswer: 'B',
    explanationEs: "Respuesta correcta: B («Recuerdo» / «souvenir» es un objeto para rememorar el viaje).",
    explanationHy: "Ճիշտ պատասխան՝ B («Recuerdo» կամ հուշանվեր է այն իրը, որը պահպանում է ճամփորդության հիշողությունը)։"
  },
  {
    id: 20,
    part: 4,
    partTitleEs: "Parte 4. Restaurantes, turismo y diversión",
    partTitleHy: "Ռեստորաններ, զբոսաշրջություն և ժամանց",
    questionEs: "Si ganaras un viaje de lujo de siete días, ¿con quién te gustaría ir y qué harías allí?",
    questionHy: "Եթե շահեիր յոթօրյա շքեղ ճանապարհորդություն, ո՞ւմ հետ կցանկանայիր գնալ և ի՞նչ կանեիր այնտեղ։",
    options: [
      {
        letter: 'A',
        es: "Iría con mi familia y visitaríamos lugares famosos.",
        hy: "Կգնայի ընտանիքիս հետ, և մենք հայտնի վայրեր կայցելեինք։"
      },
      {
        letter: 'B',
        es: "Viajaría con mis amigos y haríamos muchas excursiones.",
        hy: "Կճանապարհորդեի ընկերներիս հետ, և բազմաթիվ էքսկուրսիաներ կանեինք։"
      },
      {
        letter: 'C',
        es: "Iría con mi mejor amigo y disfrutaríamos de la playa.",
        hy: "Կգնայի լավագույն ընկերոջս հետ, և կվայելեինք լողափը։"
      },
      {
        letter: 'D',
        es: "Viajaría solo para descansar y descubrir lugares nuevos.",
        hy: "Կճանապարհորդեի մենակ՝ հանգստանալու և նոր վայրեր բացահայտելու համար։"
      }
    ],
    correctAnswer: 'ANY',
    isPersonal: true,
    explanationEs: "Respuesta personal — Todas las respuestas son correctas.",
    explanationHy: "Անձնական պատասխան՝ բոլոր տարբերակներն ընդունելի են։"
  }
];
