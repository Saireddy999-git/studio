import MenuClient from "@/components/menu/menu-client";

const menuData = {
  appetizers: [
    {
      name: "Pesarattu",
      description: "A crispy crepe made from green gram, served with ginger chutney.",
      price: "₹80",
      image: {
        src: "https://images.unsplash.com/photo-1606491413844-6a8c39de3a2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        aiHint: "pesarattu dosa",
      },
    },
    {
      name: "Mirapakaya Bajji",
      description: "Spicy chili fritters, a popular street food snack.",
      price: "₹60",
      image: {
        src: "https://images.unsplash.com/photo-1607439366136-3c0a5f750a98?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        aiHint: "chili fritters",
      },
    },
    {
      name: "Punugulu",
      description: "Deep-fried crispy snack made with rice and urad dal batter.",
      price: "₹70",
      image: {
        src: "https://plus.unsplash.com/premium_photo-1669642055182-538d388647a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        aiHint: "fried dumplings",
      },
    },
  ],
  mainCourses: [
    {
      name: "Gongura Mamsam",
      description: "A tangy and spicy lamb curry made with fresh sorrel leaves.",
      price: "₹380",
      image: {
        src: "https://images.unsplash.com/photo-1604329221293-8a313d54d245?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        aiHint: "lamb curry",
      },
    },
    {
      name: "Natu Kodi Pulusu",
      description: "Flavorful country chicken curry in a traditional tamarind-based gravy.",
      price: "₹350",
       image: {
        src: "https://images.unsplash.com/photo-1565557623262-b27e252489a1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        aiHint: "chicken curry",
      },
    },
    {
      name: "Gutti Vankaya Kura",
      description: "Andhra-style stuffed eggplant with a peanut and spice filling.",
      price: "₹280",
      image: {
        src: "https://images.unsplash.com/photo-1620404443265-d81b83a04a37?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        aiHint: "stuffed eggplant curry"
      }
    },
    {
      name: "Royyala Iguru",
      description: "A semi-dry and spicy prawn fry cooked with onions and spices.",
      price: "₹420",
      image: {
        src: "https://images.unsplash.com/photo-1625535336825-69726914defa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        aiHint: "prawn fry",
      },
    },
  ],
  desserts: [
    {
      name: "Qubani ka Meetha",
      description: "A classic Hyderabadi dessert made from dried apricots.",
      price: "₹150",
      image: {
        src: "https://plus.unsplash.com/premium_photo-1675237624237-f958a43f87b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        aiHint: "apricot dessert",
      },
    },
    {
      name: "Pootharekulu",
      description: "Delicate, paper-thin sweet rolls made from rice starch, ghee, and sugar.",
      price: "₹120",
      image: {
        src: "https://images.unsplash.com/photo-1626513723228-5ae5555138a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        aiHint: "sweet rolls",
      },
    },
     {
      name: "Bobbatlu",
      description: "Sweet flatbread stuffed with a delicious filling of lentils and jaggery.",
      price: "₹100",
      image: {
        src: "https://images.unsplash.com/photo-1598214886618-931f68745163?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        aiHint: "sweet flatbread",
      },
    },
  ],
  drinks: [
    {
        name: "Kallu (Toddy)",
        description: "A traditional, slightly fermented palm wine.",
        price: "₹90",
        image: {
            src: "https://images.unsplash.com/photo-1551019106-03f0d26ea339?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            aiHint: "palm wine"
        }
    }
  ]
};

export default function MenuPage() {
    return <MenuClient menu={menuData} />;
}
