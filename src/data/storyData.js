export const initialScenes = [

  {
    id: "intro",

    type: "dialogue",

    title:
      "Моральный выбор",

    text:
      "Ты должен выбрать путь.",

    choices: [
      {
        text: "Принять",
        nextSceneId:
          "accept",
      },

      {
        text: "Отказаться",
        nextSceneId:
          "reject",
      },
    ],

    position: {
      x: 900,
      y: 120,
    },
  },

  {
    id: "accept",

    type: "ending",

    title:
      "Христос остался с тобой",

    text:
      "Ты выбрал светлый путь.",

    choices: [],

    position: {
      x: 1300,
      y: 520,
    },
  },

  {
    id: "reject",

    type: "danger",

    title:
      "Христос отвернулся от тебя",

    text:
      "Тебя больше никто не спасёт.",

    choices: [],

    position: {
      x: 500,
      y: 520,
    },
  },

];

export const initialLinks = [

  {
    from: "intro",
    to: "accept",
  },

  {
    from: "intro",
    to: "reject",
  },

];