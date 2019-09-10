export const VIEWS: View[] = [
  {name: "Shows", url: "/show"},
  {name: "Locations", url: "/location"},
  {name: "Venues", url: "/venue"},
  {name: "Songs", url: "/song"},
  {name: "Artists", url: "/artist"},
  {name: "Artifacts", url: "/artifacts"},
]

interface View {
  name: string,
  url: string
}