import MenuClient from "@/components/menu/menu-client";

const menuData = {
  appetizers: [
    {
      name: "Pesarattu",
      description: "A crispy crepe made from green gram, served with ginger chutney.",
      price: "₹80",
    },
    {
      name: "Mirapakaya Bajji",
      description: "Spicy chili fritters, a popular street food snack.",
      price: "₹60",
    },
    {
      name: "Punugulu",
      description: "Deep-fried crispy snack made with rice and urad dal batter.",
      price: "₹70",
    },
  ],
  mainCourses: [
    {
      name: "Gongura Mamsam",
      description: "A tangy and spicy lamb curry made with fresh sorrel leaves.",
      price: "₹380",
    },
    {
      name: "Natu Kodi Pulusu",
      description: "Flavorful country chicken curry in a traditional tamarind-based gravy.",
      price: "₹350",
    },
    {
      name: "Gutti Vankaya Kura",
      description: "Andhra-style stuffed eggplant with a peanut and spice filling.",
      price: "₹280",
    },
    {
      name: "Royyala Iguru",
      description: "A semi-dry and spicy prawn fry cooked with onions and spices.",
      price: "₹420",
    },
  ],
  desserts: [
    {
      name: "Qubani ka Meetha",
      description: "A classic Hyderabadi dessert made from dried apricots.",
      price: "₹150",
    },
    {
      name: "Pootharekulu",
      description: "Delicate, paper-thin sweet rolls made from rice starch, ghee, and sugar.",
      price: "₹120",
    },
     {
      name: "Bobbatlu",
      description: "Sweet flatbread stuffed with a delicious filling of lentils and jaggery.",
      price: "₹100",
    },
  ],
  drinks: [
    {
        name: "Kallu (Toddy)",
        description: "A traditional, slightly fermented palm wine.",
        price: "₹90"
    }
  ]
};

export default function MenuPage() {
    return <MenuClient menu={menuData} />;
}
