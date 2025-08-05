import MenuClient from "@/components/menu/menu-client";

const menuData = {
  appetizers: [
    {
      name: "Crispy Calamari",
      description: "Lightly fried, served with a spicy marinara and lemon aioli.",
      price: "$18",
    },
    {
      name: "Burrata & Prosciutto",
      description: "Heirloom tomatoes, balsamic glaze, and fresh basil.",
      price: "$22",
    },
    {
      name: "Tuna Tartare",
      description: "Avocado, soy-lime dressing, and taro chips.",
      price: "$24",
    },
  ],
  mainCourses: [
    {
      name: "Seared Scallops",
      description: "With saffron risotto and a citrus buerre blanc.",
      price: "$32",
    },
    {
      name: "Filet Mignon (8oz)",
      description: "Served with potato gratin, asparagus, and a red wine reduction.",
      price: "$55",
    },
    {
      name: "Handmade Pappardelle",
      description: "With a slow-braised wild boar ragu and shaved parmesan.",
      price: "$29",
    },
    {
      name: "Pan-Seared Salmon",
      description: "Crispy skin salmon with a lentil and vegetable medley.",
      price: "$34",
    },
  ],
  desserts: [
    {
      name: "Chocolate Lava Cake",
      description: "Molten center, served with vanilla bean ice cream.",
      price: "$14",
    },
    {
      name: "Tiramisu",
      description: "Classic Italian dessert with espresso and mascarpone.",
      price: "$12",
    },
  ],
};

export default function MenuPage() {
    return <MenuClient menu={menuData} />;
}
