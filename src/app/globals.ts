export const VIEWS: View[] = [
  {name: "Shows", url: "/show"},
  {name: "Locations", url: "/location"},
  {name: "Venues", url: "/venue"},
  {name: "Songs", url: "/song"},
  {name: "Recording", url: "/recording"},
  {name: "Artists", url: "/artist"},
  {name: "Artifacts", url: "/artifacts"},
  {name: "Map", url: "/mapselect"},
]

interface View {
  name: string,
  url: string
}