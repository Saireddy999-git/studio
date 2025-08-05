import MenuClient from "@/components/menu/menu-client";

const menuData = {
  appetizers: [
    {
      name: "Pesarattu",
      description: "A crispy crepe made from green gram, served with ginger chutney.",
      price: "₹80",
      image: {
        src: "https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2022/07/pesarattu-allam-pachadi-1.jpg?ssl=1",
        aiHint: "pesarattu dosa",
      },
    },
    {
      name: "Mirapakaya Bajji",
      description: "Spicy chili fritters, a popular street food snack.",
      price: "₹60",
      image: {
        src: "https://i.pinimg.com/736x/29/aa/98/29aa98e2f7ce65e03fe27823c0ba2489.jpg",
        aiHint: "chili fritters",
      },
    },
    {
      name: "Punugulu",
      description: "Deep-fried crispy snack made with rice and urad dal batter.",
      price: "₹70",
      image: {
        src: "https://i.pinimg.com/736x/97/e1/f1/97e1f11db7d76bcacd76f11b41daba36.jpg",
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
        src: "https://i.imgur.com/sY9tX2f.jpg",
        aiHint: "lamb curry",
      },
    },
    {
      name: "Natu Kodi Pulusu",
      description: "Flavorful country chicken curry in a traditional tamarind-based gravy.",
      price: "₹350",
       image: {
        src: "https://i.imgur.com/wV1pQ9R.jpg",
        aiHint: "chicken curry",
      },
    },
    {
      name: "Gutti Vankaya Kura",
      description: "Andhra-style stuffed eggplant with a peanut and spice filling.",
      price: "₹280",
      image: {
        src: "https://i.imgur.com/n5J6X7r.jpg",
        aiHint: "stuffed eggplant curry"
      }
    },
    {
      name: "Royyala Iguru",
      description: "A semi-dry and spicy prawn fry cooked with onions and spices.",
      price: "₹420",
      image: {
        src: "https://i.imgur.com/z6E5P1m.jpg",
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
        src: "https://i.imgur.com/R3tY4sS.jpg",
        aiHint: "apricot dessert",
      },
    },
    {
      name: "Pootharekulu",
      description: "Delicate, paper-thin sweet rolls made from rice starch, ghee, and sugar.",
      price: "₹120",
      image: {
        src: "https://i.imgur.com/O6L8Z1T.jpg",
        aiHint: "sweet rolls",
      },
    },
     {
      name: "Bobbatlu",
      description: "Sweet flatbread stuffed with a delicious filling of lentils and jaggery.",
      price: "₹100",
      image: {
        src: "https://i.imgur.com/k9D7X8p.jpg",
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
            src: "https://i.imgur.com/J3v4W5x.jpg",
            aiHint: "palm wine"
        }
    }
  ]
};

export default function MenuPage() {
    return <MenuClient menu={menuData} />;
}
