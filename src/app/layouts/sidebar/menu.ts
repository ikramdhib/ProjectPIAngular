import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    id: 148,
    label: "Détails stage",
    icon: "bx-calendar",
    link: "/addstage",
  },
  {
    id: 149,
    label: "Processus stage",
    icon: "bx-calendar",
    link: "/processusStage",
  },
]