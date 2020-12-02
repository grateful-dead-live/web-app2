
import { DEBUG } from './config'

export const VIEWS: View[] = [
  {name: "Shows", url: "/show"},
  {name: "Locations", url: "/location"},
  {name: "Venues", url: "/venue"},
  {name: "Songs", url: "/song"},
  {name: "Recording", url: "/recording"},
  {name: "Artists", url: "/artist"},
  {name: "Artifacts", url: "/artifacts"},
  {name: "Map", url: "/mapselect"},
  {name: "Start Page", url: "/start"},
]

interface View {
  name: string,
  url: string
}


export function logger(s) {
    if (DEBUG) {
        console.log(s);
    }
  }