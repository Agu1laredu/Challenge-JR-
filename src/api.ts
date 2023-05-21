import { Note } from "./types";

const api = {
  notes: {
    List: (): Note[] => [
      {
        id: "nota",
        tittle: "Primer nota",
        LastEdited: "10/10/10",
        content: "algun contenido",
        categories: ["random"],
        archived: false,
      },
      {
        id: "nota2",
        tittle: "Segunda nota",
        LastEdited: "10/10/10",
        content: "algun contenido",
        categories: ["random"],
        archived: false,
      },
    ],
  },
};

export default api;
