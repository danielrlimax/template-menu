import { FiGrid, FiCoffee, FiStar } from 'react-icons/fi';
import { 
  GiHamburger, 
  GiFullPizza, 
  GiCakeSlice,
  GiSushis,
  GiNoodles,
  GiChickenOven,
  GiMeat,
  GiFrenchFries,
  GiTacos,
  GiHotDog,
  GiFishCooked,
  GiSandwich,
  GiCupcake,
  GiIceCreamCone,
  GiWrappedSweet,
  GiChopsticks,
  GiBowlOfRice,
  GiIndianPalace,
  GiArabicDoor,
  GiItalia,
  GiBeerStein,
  GiWineGlass,
  GiSodaCan,
  GiFruitBowl,
  GiAvocado,
  GiShrimp,
  GiCrab,
  GiDonut,
  GiCookie,
  GiCheeseWedge,
  GiSlicedBread,
  GiHotMeal,
  GiCampCookingPot
} from 'react-icons/gi';
import { BiDrink, BiBowlRice } from 'react-icons/bi';
import { LuSalad, LuSoup, LuLeaf, LuFlame, LuBaby } from 'react-icons/lu';
import { MdOutlineBreakfastDining, MdOutlineLunchDining } from 'react-icons/md';

const iconMap: Record<string, React.ReactNode> = {
  // Geral
  all: <FiGrid className="w-5 h-5" />,
  grid: <FiGrid className="w-5 h-5" />,
  star: <FiStar className="w-5 h-5" />,
  
  // Lanches e Fast Food
  burger: <GiHamburger className="w-5 h-5" />,
  hamburger: <GiHamburger className="w-5 h-5" />,
  hotdog: <GiHotDog className="w-5 h-5" />,
  sandwich: <GiSandwich className="w-5 h-5" />,
  fries: <GiFrenchFries className="w-5 h-5" />,
  tacos: <GiTacos className="w-5 h-5" />,
  
  // Pizza e Italiana
  pizza: <GiFullPizza className="w-5 h-5" />,
  italian: <GiItalia className="w-5 h-5" />,
  pasta: <GiNoodles className="w-5 h-5" />,
  
  // Japonesa e Asiatica
  sushi: <GiSushis className="w-5 h-5" />,
  japanese: <GiSushis className="w-5 h-5" />,
  asian: <GiChopsticks className="w-5 h-5" />,
  chinese: <GiChopsticks className="w-5 h-5" />,
  noodles: <GiNoodles className="w-5 h-5" />,
  rice: <GiBowlOfRice className="w-5 h-5" />,
  ramen: <BiBowlRice className="w-5 h-5" />,
  
  // Carnes
  chicken: <GiChickenOven className="w-5 h-5" />,
  meat: <GiMeat className="w-5 h-5" />,
  steak: <GiMeat className="w-5 h-5" />,
  bbq: <LuFlame className="w-5 h-5" />,
  grill: <LuFlame className="w-5 h-5" />,
  
  // Frutos do Mar
  fish: <GiFishCooked className="w-5 h-5" />,
  seafood: <GiShrimp className="w-5 h-5" />,
  shrimp: <GiShrimp className="w-5 h-5" />,
  crab: <GiCrab className="w-5 h-5" />,
  
  // Arabe e Indiana
  arabian: <GiArabicDoor className="w-5 h-5" />,
  arabic: <GiArabicDoor className="w-5 h-5" />,
  indian: <GiIndianPalace className="w-5 h-5" />,
  
  // Saudavel
  salad: <LuSalad className="w-5 h-5" />,
  healthy: <LuLeaf className="w-5 h-5" />,
  vegan: <LuLeaf className="w-5 h-5" />,
  vegetarian: <GiAvocado className="w-5 h-5" />,
  fruit: <GiFruitBowl className="w-5 h-5" />,
  
  // Sopas e Caldos
  soup: <LuSoup className="w-5 h-5" />,
  hotmeal: <GiHotMeal className="w-5 h-5" />,
  stew: <GiCampCookingPot className="w-5 h-5" />,
  
  // Cafe da Manha e Padaria
  breakfast: <MdOutlineBreakfastDining className="w-5 h-5" />,
  coffee: <FiCoffee className="w-5 h-5" />,
  bakery: <GiSlicedBread className="w-5 h-5" />,
  bread: <GiSlicedBread className="w-5 h-5" />,
  cheese: <GiCheeseWedge className="w-5 h-5" />,
  
  // Doces e Sobremesas
  dessert: <GiCakeSlice className="w-5 h-5" />,
  cake: <GiCakeSlice className="w-5 h-5" />,
  cupcake: <GiCupcake className="w-5 h-5" />,
  icecream: <GiIceCreamCone className="w-5 h-5" />,
  candy: <GiWrappedSweet className="w-5 h-5" />,
  donut: <GiDonut className="w-5 h-5" />,
  cookie: <GiCookie className="w-5 h-5" />,
  
  // Bebidas
  drink: <BiDrink className="w-5 h-5" />,
  drinks: <BiDrink className="w-5 h-5" />,
  beverage: <BiDrink className="w-5 h-5" />,
  soda: <GiSodaCan className="w-5 h-5" />,
  beer: <GiBeerStein className="w-5 h-5" />,
  wine: <GiWineGlass className="w-5 h-5" />,
  juice: <GiFruitBowl className="w-5 h-5" />,
  
  // Refeicoes
  lunch: <MdOutlineLunchDining className="w-5 h-5" />,
  dinner: <MdOutlineLunchDining className="w-5 h-5" />,
  meal: <GiHotMeal className="w-5 h-5" />,
  
  // Outros
  kids: <LuBaby className="w-5 h-5" />,
  combo: <GiFrenchFries className="w-5 h-5" />,
  promo: <FiStar className="w-5 h-5" />,
};

export function getCategoryIcon(iconId: string): React.ReactNode {
  return iconMap[iconId] || <FiGrid className="w-5 h-5" />;
}

export { iconMap };
